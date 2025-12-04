export default function InputField({ label, type = "text", ...props }) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm text-text-muted">{label}</label>
      <input
        type={type}
        className="w-full h-12 px-4 rounded-[var(--radius-lg)] bg-bg-card text-white focus:outline-none focus:ring-2 focus:ring-primary"
        {...props}
      />
    </div>
  );
}