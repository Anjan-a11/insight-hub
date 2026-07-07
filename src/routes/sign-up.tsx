import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Field, Input, PrimaryButton } from "@/components/ui-bits";
import { Loader } from "@/components/Loader";
import { useAuth } from "@/hooks/useAuth";
import { AuthShell } from "./sign-in";

export const Route = createFileRoute("/sign-up")({
  component: SignUp,
  head: () => ({ meta: [{ title: "Create your account — mybookEarn" }] }),
});

function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!name || !email || password.length < 6) return setErr("Fill all fields (password 6+ chars).");
    setLoading(true);
    try {
      await signup(name, email, password);
      navigate({ to: "/app" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthShell title="Create your account" subtitle="Start planning campaigns in minutes.">
      <form onSubmit={onSubmit} className="space-y-4">
        <Field label="Full name">
          <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Reader" />
        </Field>
        <Field label="Work email">
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
        </Field>
        <Field label="Password">
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="At least 6 characters" />
        </Field>
        {err && <p className="text-xs text-destructive">{err}</p>}
        <PrimaryButton type="submit" className="w-full" disabled={loading}>
          {loading ? <Loader size={22} /> : "Create account"}
        </PrimaryButton>
        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/sign-in" className="text-primary font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
}
