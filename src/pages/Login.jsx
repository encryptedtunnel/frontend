import Logo from "../components/Logo";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import PrimaryButton from "../components/PrimaryButton";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import authService from "../services/authService";

const LoginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .nonempty(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(LoginSchema),
  });

  const nav = useNavigate();
  const [searchParams] = useSearchParams();
  const toastConfigError = {
    position: "bottom-center",
    theme: "dark",
    type: "error",
  };

  const onError = (errors) => {
    Object.values(errors).map((err) => {
      toast(err.message, toastConfigError);
    });
  };
  const onSubmit = async (data) => {
    try {
      await authService.login(data.username, data.password);
      toast("Signed in", { ...toastConfigError, type: "success" });
      const redirectUrl = searchParams.get("redirect");
      setTimeout(() => {
        if (redirectUrl) {
          nav(redirectUrl);
        } else {
          nav("/inbox");
        }
      }, 2000);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        if (err.response) {
          toast(err.response.data.detail, toastConfigError);
        } else if (err.request) {
          toast(
            "Network error. Please check your connection.",
            toastConfigError
          );
        } else {
          toast("An unexpected error occurred.", toastConfigError);
        }
      } else {
        console.error(err);
        toast("An unexpected error occurred.", toastConfigError);
      }
    }
  };
  return (
    <main className="min-h-screen flex items-center justify-center bg-bg-dark p-6">
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
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
          {...register("username")}
        />

        <PasswordField
          label="Password"
          placeholder="Enter your password"
          {...register("password")}
        />

        <PrimaryButton type="submit">Sign In</PrimaryButton>

        <p className="text-center text-text-muted text-base">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-primary font-semibold">
            Sign Up
          </Link>
        </p>
      </form>
      <ToastContainer draggable />
    </main>
  );
}
