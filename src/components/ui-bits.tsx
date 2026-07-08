import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function ClayCard({
  children, className = "", delay = 0,
}: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2, boxShadow: "0 8px 24px rgba(24,119,242,0.10)" }}
      className={`bg-white rounded-2xl border border-[#dddfe2] p-5 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active:    "bg-green-50 text-[#42b72a]",
    Paused:    "bg-yellow-50 text-yellow-600",
    Draft:     "bg-gray-100 text-gray-500",
    Completed: "bg-blue-50 text-[#00008B]",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${map[status] || map.Draft}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

export function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap items-end justify-between gap-4 mb-6"
    >
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-primary">{title}</h1>
        {subtitle && <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>}
      </div>
      {action}
    </motion.div>
  );
}

export function PrimaryButton({
  children, onClick, type = "button", className = "", disabled,
}: { children: ReactNode; onClick?: () => void; type?: "button"|"submit"; className?: string; disabled?: boolean }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`btn-liquid bg-gradient-to-r from-[#00008B] to-[#2929a3] text-white px-5 py-2.5 text-sm font-semibold rounded-xl shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </motion.button>
  );
}

export function GhostButton({ children, onClick, className = "" }: { children: ReactNode; onClick?: () => void; className?: string }) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`border border-[#dddfe2] bg-white hover:bg-[#f0f2f5] text-gray-700 px-4 py-2 text-sm font-semibold rounded-xl transition ${className}`}
    >
      {children}
    </motion.button>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

export function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className={`w-full bg-[#f0f2f5] border border-transparent focus:border-[#00008B] focus:bg-white rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00008B]/20 transition-all ${props.className || ""}`}
    />
  );
}
