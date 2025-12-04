import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import PrimaryButton from "../components/PrimaryButton";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-bg-dark p-6">
      <div className="w-full max-w-md flex flex-col gap-6">

        <h1 className="text-white text-3xl font-bold text-center">
          Create Account
        </h1>

        <InputField label="Username" placeholder="Enter username" />
        <InputField label="Email" type="email" placeholder="Enter email" />
        <PasswordField label="Password" placeholder="Enter password" />

        <PrimaryButton>Create Account</PrimaryButton>

        <p className="text-center text-text-muted text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-primary underline">
            Log In
          </Link>
        </p>

      </div>
    </main>
  );
}