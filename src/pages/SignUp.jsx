import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import PasswordField from "../components/PasswordField";
import PrimaryButton from "../components/PrimaryButton";
import { z } from "zod"
import { ToastContainer, toast } from "react-toastify";
import authService from "../services/authService";
import CryptoService from "../services/cryptoService";

const SignupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters long").nonempty(),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  password2: z.string(),
  display_name: z.string()
}).superRefine(({ password, password2 }, ctx) => {
  if (password2 !== password) {
    ctx.addIssue({
      code: "custom",
      message: "The passwords did not match",
      path: ['password2']
    })
  }
})

export default function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: zodResolver(SignupSchema)
  })


  const navigate = useNavigate();
  const toastConfig = {
    position: "bottom-center",
    theme: "dark",
    type: "error",
  }

  const onError = (errors) => {
    console.log(errors)
    Object.values(errors).map((err) => {
      toast(err.message, toastConfig)
    })
  }

  const onSubmit = async (data) => {
      const publicKey = await CryptoService.initKeys()
      const result = await authService.signup(data.username, data.display_name, data.password, publicKey)
      if (result.success){
        toast("Signed up", { ...toastConfig, type: "success" });
        setTimeout(() => { navigate("/login") }, 2000)
      } else{
        toast(result.message, toastConfig);
      }

    
  }


  return (
    <main className="min-h-screen flex items-center justify-center bg-bg-dark p-6">
      <form onSubmit={handleSubmit(onSubmit, onError)} className="w-full max-w-md flex flex-col gap-6">
        <div className="flex justify-center mt-2">
          <Logo />
        </div>

        <h1 className="text-white text-2xl font-bold text-center">Create Account</h1>
        <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal pb-8 text-center">Connect with
        your friends and family in seconds.</p>

        <InputField
          label="Display Name"
          icon="person"
          placeholder="Enter your Display Name"
          {...register("display_name")}
        />

        <InputField
          label="Username"
          icon="alternate_email"
          placeholder="@username"
          {...register("username")}

        />

        <PasswordField
          label="Password"
          placeholder="Enter password"
          {...register("password")}
        />

        <PasswordField
          label="Confirm Password"
          placeholder="Confirm your password"
          name="confirm"
          {...register("password2")}
        />

        <PrimaryButton type="submit">Create Account</PrimaryButton>
        <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal  text-center">Already have
        an account? <a className="font-bold text-primary hover:underline" href="/Login">Log In</a>
        </p>
      </form>
      <ToastContainer draggable />
    </main>
  );
}