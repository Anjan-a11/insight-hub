import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { Field, Input, PrimaryButton } from "@/components/ui-bits";
import { Loader } from "@/components/Loader";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/sign-in")({
  component: SignIn,
  head: () => ({ meta: [{ title: "Sign in — mybookEarn" }] }),
});

function SignIn() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!email || !password) return setErr("Enter your email and password.");
    setLoading(true);
    try {
      await login(email, password);
      navigate({ to: "/app" });
    } catch {
      setErr("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Welcome back" subtitle="Sign in to your mybookEarn workspace.">
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Email">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
        </Field>
        <Field label="Password">
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
        </Field>
        <div className="flex items-center justify-between text-xs">
          <label className="inline-flex items-center gap-2 text-muted-foreground">
            <input type="checkbox" className="rounded" /> Remember me
          </label>
          <Link to="/forgot-password" className="text-primary font-semibold hover:underline">
            Forgot password?
          </Link>
        </div>
        {err && <p className="text-xs text-destructive">{err}</p>}
        <PrimaryButton type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader size={22} /> : "Sign in"}
        </PrimaryButton>
        <p className="text-center text-sm text-muted-foreground">
          New here?{" "}
          <Link to="/sign-up" className="text-primary font-semibold hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}

export function AuthShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2" style={{ background: "var(--gradient-hero)" }}>
      <div className="hidden lg:flex flex-col justify-between p-10">
        <Logo />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="clay p-8 max-w-md"
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground">Today</p>
          <p className="text-3xl font-bold text-primary mt-2">$18,240</p>
          <p className="text-xs text-muted-foreground mt-1">spent · 3.4% CTR · 8 active campaigns</p>
          <div className="mt-6 flex items-end gap-1 h-20">
            {[40, 60, 55, 78, 66, 88, 72, 95, 80, 100].map((h, i) => (
              <motion.span
                key={i}
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ delay: 0.2 + i * 0.05 }}
                className="flex-1 rounded-t"
                style={{ background: "var(--gradient-primary)" }}
              />
            ))}
          </div>
        </motion.div>
        <p className="text-xs text-muted-foreground">© mybookEarn · Your time, your money</p>
      </div>
      <div className="flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="clay w-full max-w-md p-8"
        >
          <div className="lg:hidden mb-6">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold text-primary">{title}</h1>
          {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          <div className="mt-6">{children}</div>
        </motion.div>
      </div>
    </div>
  );
}
