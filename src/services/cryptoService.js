import { get, set } from "idb-keyval";
import { success } from "zod";

class CryptoService {
  static PRIVATE_KEY_ID = "ecdh_private_key";
  static PUBLIC_KEY_ID = "ecdh_public_key";

  static async generateKeyPair() {
    const keyPair = await crypto.subtle.generateKey(
      {
        name: "ECDH",
        namedCurve: "P-256",
      },
      false,
      ["deriveKey"]
    );

    await set(this.PRIVATE_KEY_ID, keyPair.privateKey);

    const publicKeyJwk = await crypto.subtle.exportKey(
      "jwk",
      keyPair.publicKey
    );

    await set(this.PUBLIC_KEY_ID, publicKeyJwk);

    return publicKeyJwk;
  }

  static async initKeys() {
    const privateKey = await get(this.PRIVATE_KEY_ID);
    const publicKey = await get(this.PUBLIC_KEY_ID);

    if (privateKey && publicKey) {
      return JSON.stringify(publicKey);
    }
    return JSON.stringify(await this.generateKeyPair());
  }

  static async importPublicKey(jwk) {
    return await crypto.subtle.importKey(
      "jwk",
      jwk,
      {
        name: "ECDH",
        namedCurve: "P-256",
      },
      true,
      []
    );
  }

  static async deriveSharedKey(otherUserPublicKeyJwk) {
    const privateKey = await get(this.PRIVATE_KEY_ID);
    if (!privateKey) throw new Error("Private key not found");

    const otherPublicKey = await this.importPublicKey(otherUserPublicKeyJwk);

    return await crypto.subtle.deriveKey(
      {
        name: "ECDH",
        public: otherPublicKey,
      },
      privateKey,
      {
        name: "AES-GCM",
        length: 256,
      },
      false, // ❗ shared key non-extractable
      ["encrypt", "decrypt"]
    );
  }

  static async encryptMessage(sharedKey, plaintext) {
    const iv = crypto.getRandomValues(new Uint8Array(12));

    const encrypted = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv,
      },
      sharedKey,
      new TextEncoder().encode(plaintext)
    );

    return {
      iv: Array.from(iv),
      data: Array.from(new Uint8Array(encrypted)),
    };
  }
  static async decryptMessage(sharedKey, payload) {
    try {
      const iv = new Uint8Array(payload.iv);
      const data = new Uint8Array(payload.data);

      const decrypted = await crypto.subtle.decrypt(
        {
          name: "AES-GCM",
          iv,
        },
        sharedKey,
        data
      );

      return {
        msg: new TextDecoder().decode(decrypted),
        succuss: true,
        detail: null
      }
    } catch (error) {
      console.log(error)
      return {
        msg: null,
        success: false,
        detail: error
      }
    }
  }
}

export default CryptoService;
