import Logo from "../components/Logo";
import PrimaryButton from "../components/PrimaryButton";
import SecondaryButton from "../components/SecondaryButton";
import { useNavigate } from "react-router-dom";
import React from 'react'
import {Link} from "react-router-dom";

export default function Welcome() {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center p-6 bg-bg-dark">
      <div className="w-full max-w-md flex flex-col items-center text-center">

        <Logo />

        <h1 className="text-white font-bold text-3xl mt-6">
          Connect with your friends
        </h1>

        <p className="text-text-muted text-base mt-2 max-w-xs">
          Simple, fast, and secure messaging to stay in touch with everyone.
        </p>

        <div className="flex flex-col gap-3 w-full px-4 py-8">
          <Link to="/signup">
           <PrimaryButton>Create Account</PrimaryButton>
          </Link>
          <Link to="/login">
          <SecondaryButton>Log In</SecondaryButton>
          </Link>
        </div>

      </div>
    </main>
  );
}