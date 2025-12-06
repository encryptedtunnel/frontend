import { useId } from "react";

export default function InputField({
  label,
  icon = null,
  type = "text",
  placeholder = "",
  ...props
}) {
  const id = useId();

  return (
    <div className="flex flex-col gap-1 w-full">
      {label && (
        <label htmlFor={id} className="text-sm text-text-muted">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-text-muted text-xl">
            {icon}
          </span>
        )}

        <input
          id={id}
          type={type}
          placeholder={placeholder}
          className={`w-full h-12 rounded-lg bg-bg-card text-white 
            focus:outline-none focus:ring-2 focus:ring-primary
            ${icon ? "pl-12 pr-4" : "px-4"}`
          }
          {...props}
        />
      </div>
    </div>
  );
}