import { Toaster } from "@/shared/components/ui/sonner";
import { Spinner } from "@/shared/components/ui/spinner";
import { InputHTMLAttributes } from "react";

export function CardAuth({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <Toaster />
      {children}
    </div>
  );
}
export function CardContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl">
      {children}
    </div>
  );
}
export function CardHeader({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-2 mb-8">{children}</div>;
}
export function CardForm({
  children,
  onSubmit,
}: {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
}) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {children}
    </form>
  );
}
type CardInputProps = InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  label?: string;
};

export function CardInput({
  error,
  className,
  label,
  id,
  ...props
}: CardInputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-sm text-zinc-400" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        {...props}
        className={`w-full bg-zinc-800 border text-white px-4 py-3 rounded-xl outline-none transition-all
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500/30"
              : "border-zinc-700 focus:border-blue-500 focus:ring-blue-500/30"
          }
          ${className ?? ""}
        `}
      />

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}
export function CardButtonSubmit({
  loading,
  message,
}: {
  loading: boolean;
  message?: string;
}) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-[5px] disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? (
        <Spinner className="size-4 animate-spin mx-auto" />
      ) : (
        (message ?? "Login")
      )}
    </button>
  );
}
