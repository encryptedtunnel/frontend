import { useState } from "react";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import PrimaryButton from "../components/PrimaryButton";

export default function SignUp() {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    password: "",
    confirm: "",
  });

  const [error, setError] = useState("");

  const onChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => {
      const updated = { ...prev, [name]: value };
      if (updated.password && updated.confirm && updated.password !== updated.confirm) {
        setError("Passwords do not match!");
      } else {
        setError("");
      }

      return updated;
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (error) return;
    console.log(form);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-bg-dark p-6">
      <form onSubmit={onSubmit} className="w-full max-w-md flex flex-col gap-6">
        <div className="flex justify-center mt-2">
          <Logo />
        </div>

        <h1 className="text-white text-2xl font-bold text-center">Create Account</h1>
        <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal pb-8 text-center">Connect with
        your friends and family in seconds.</p>

        <InputField
          label="Full Name"
          icon="person"
          placeholder="Enter your full name"
          name="fullName"
          value={form.fullName}
          onChange={onChange}
        />

        <InputField
          label="Username"
          icon="alternate_email"
          placeholder="@username"
          name="username"
          value={form.username}
          onChange={onChange}
        />

        <PasswordField
          label="Password"
          placeholder="Enter password"
          name="password"
          value={form.password}
          onChange={onChange}
        />

        <PasswordField
          label="Confirm Password"
          placeholder="Confirm your password"
          name="confirm"
          value={form.confirm}
          onChange={onChange}
        />

        {error && <p className="text-red-500 text-sm -mt-2">{error}</p>}

        <PrimaryButton type="submit">Create Account</PrimaryButton>
        <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal  text-center">Already have
        an account? <a class="font-bold text-primary hover:underline" href="/Login">Log In</a>
        </p>
      </form>
    </main>
  );
}