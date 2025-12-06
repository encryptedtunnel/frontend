import { useState } from "react";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import PrimaryButton from "../components/PrimaryButton";
import { Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({
    identifier: "",
    password: "",
  });

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log("Login Data:", form);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-bg-dark p-6">
      <form 
        onSubmit={onSubmit} 
        className="w-full max-w-md flex flex-col gap-6"
      >
        <div className="flex justify-center mt-4 mb-2">
          <Logo />
        </div>

        <h1 className="text-white text-3xl font-bold text-center mb-4">
          Welcome Back!
        </h1>

        <InputField
          label="Username"
          icon="person"
          placeholder="Enter your username"
          name="identifier"
          value={form.identifier}
          onChange={onChange}
        />

        <PasswordField
          label="Password"
          placeholder="Enter your password"
          name="password"
          value={form.password}
          onChange={onChange}
        />

        <PrimaryButton type="submit">Sign In</PrimaryButton>

        <p className="text-center text-text-muted text-base">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-primary font-semibold">
            Sign Up
          </Link>
        </p>
      </form>
    </main>
  );
}