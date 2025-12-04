import { useState } from "react";

export default function PasswordField({ label, ...props }) {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1 w-full relative">
      <label className="text-sm text-text-muted">{label}</label>

      <input
        type={show ? "text" : "password"}
        className="w-full h-12 px-4 pr-12 rounded-[var(--radius-lg)] bg-bg-card text-white focus:outline-none focus:ring-2 focus:ring-primary"
        {...props}
      />

      <span
        className="material-symbols-outlined absolute right-4 top-[45px] -translate-y-1/2 text-text-muted cursor-pointer select-none"
        onClick={() => setShow(!show)}
      >
        {show ? "visibility" : "visibility_off"}
      </span>
    </div>
  );
}