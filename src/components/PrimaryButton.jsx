export default function PrimaryButton({ children, ...props }) {
  return (
    <button
      {...props}
      className="btn-primary"
    >
      {children}
    </button>
  );
}