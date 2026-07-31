type ToastProps = {
  message: string;
  isError: boolean;
  visible: boolean;
};

export function Toast({ message, isError, visible }: ToastProps) {
  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2.5 rounded-lg font-semibold text-sm text-guac-accent-ink transition-all duration-200 pointer-events-none z-50 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
      }`}
      style={{ backgroundColor: isError ? "var(--color-guac-danger)" : "var(--color-guac-accent)" }}
    >
      {message}
    </div>
  );
}
