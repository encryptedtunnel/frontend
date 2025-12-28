import { useEffect, useState } from "react";
import CryptoService from "../services/cryptoService";
import authService from "../services/authService";

const useEncryption = (participant_username) => {
  const [sharedKey, setSharedKey] = useState();
  const [ready, setReady] = useState(false);
  const setupSharedKey = async () => {
    if (!participant_username) return;
    const result = await authService.fetchPK(participant_username);
    const otherPubKey = JSON.parse(result.data);
    setSharedKey(await CryptoService.deriveSharedKey(otherPubKey));
    setReady(true);
  };

  const encrypt = async (msg) => {
    
    if (!sharedKey) {
      await setupSharedKey()
    };
    return CryptoService.encryptMessage(sharedKey, msg);
  };

  const decrypt = async (cipher) => {

    if (!sharedKey){ 
      await setupSharedKey()
    }
    return CryptoService.decryptMessage(sharedKey, cipher);
  };
  useEffect(() => {
    setupSharedKey()    
  }, [participant_username]);
  return { encrypt, decrypt, ready };
};

export default useEncryption;
