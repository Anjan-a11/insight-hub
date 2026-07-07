import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function ClayCard({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`clay p-5 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function StatusPill({ status }: { status: string }) {
  const map: Record<string, string> = {
    Active: "bg-[oklch(0.94_0.08_155)] text-[oklch(0.35_0.14_155)]",
    Paused: "bg-[oklch(0.94_0.06_75)] text-[oklch(0.4_0.15_75)]",
    Draft: "bg-muted text-muted-foreground",
    Completed: "bg-accent text-primary",
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
  children,
  onClick,
  type = "button",
  className = "",
  disabled,
}: {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`clay-primary px-5 py-2.5 text-sm font-semibold hover:brightness-110 active:scale-[0.98] transition disabled:opacity-60 disabled:cursor-not-allowed ${className}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  className = "",
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`clay-sm px-4 py-2 text-sm font-semibold text-primary hover:brightness-105 active:scale-[0.98] transition ${className}`}
    >
      {children}
    </button>
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
      className={`w-full clay-inset px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-primary/40 ${props.className || ""}`}
    />
  );
}
