import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Field, Input, PrimaryButton } from "@/components/ui-bits";
import { Loader } from "@/components/Loader";
import { AuthShell } from "./sign-in";
import { CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/forgot-password")({
  component: Forgot,
  head: () => ({ meta: [{ title: "Reset password — mybookEarn" }] }),
});

function Forgot() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
  }

  return (
    <AuthShell title="Reset your password" subtitle="We'll email you a magic reset link.">
      {sent ? (
        <div className="text-center py-6">
          <CheckCircle2 className="h-12 w-12 mx-auto text-primary" />
          <p className="mt-4 font-semibold">Check your inbox</p>
          <p className="text-sm text-muted-foreground mt-1">
            If <span className="text-primary">{email}</span> matches an account, you'll get a link shortly.
          </p>
          <Link to="/sign-in" className="mt-6 inline-flex clay-sm px-5 py-2.5 text-sm font-semibold text-primary">
            Back to sign in
          </Link>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="space-y-4">
          <Field label="Email">
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
          </Field>
          <PrimaryButton type="submit" className="w-full" disabled={loading || !email}>
            {loading ? <Loader size={22} /> : "Send reset link"}
          </PrimaryButton>
          <p className="text-center text-sm text-muted-foreground">
            Remembered it?{" "}
            <Link to="/sign-in" className="text-primary font-semibold hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      )}
    </AuthShell>
  );
}
