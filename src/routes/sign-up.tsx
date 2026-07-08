import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import SignInBackground from "@/components/background/SignInBackground";

export const Route = createFileRoute("/sign-up")({
  component: SignUp,
  head: () => ({ meta: [{ title: "Create account — mybookEarn" }] }),
});

function LiquidButton({ children, className = "", loading = false, ...props }:
  React.ButtonHTMLAttributes<HTMLButtonElement> & { loading?: boolean }) {
  const ref = useRef<HTMLButtonElement>(null);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);
  function addRipple(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = ref.current!.getBoundingClientRect();
    const id = Date.now();
    setRipples((r) => [...r, { x: e.clientX - rect.left, y: e.clientY - rect.top, id }]);
    setTimeout(() => setRipples((r) => r.filter((rp) => rp.id !== id)), 600);
  }
  return (
    <motion.button ref={ref as React.Ref<HTMLButtonElement>}
      whileTap={{ scale: 0.97 }} whileHover={{ scale: 1.02 }}
      onClick={addRipple}
      className={`relative overflow-hidden ${className}`}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {ripples.map((rp) => (
        <span key={rp.id} className="absolute rounded-full bg-white/30 animate-ping"
          style={{ left: rp.x - 20, top: rp.y - 20, width: 40, height: 40, animationDuration: "0.6s" }} />
      ))}
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <motion.span className="block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
            animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.7, ease: "linear" }} />
          Creating…
        </span>
      ) : children}
    </motion.button>
  );
}

function FloatingInput({ label, type = "text", value, onChange }: {
  label: string; type?: string; value: string; onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  return (
    <div className="relative">
      <input type={type} value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="w-full border border-[#00008B]/30 rounded-xl px-3 pt-5 pb-2 text-sm bg-white focus:outline-none focus:border-[#00008B] focus:ring-2 focus:ring-[#00008B]/20 transition-all text-[#1c1e21]"
      />
      <motion.label
        animate={{ top: active ? 6 : 14, fontSize: active ? "10px" : "14px", color: focused ? "#00008B" : "#90949c" }}
        transition={{ duration: 0.15 }}
        className="absolute left-3 pointer-events-none font-normal"
        style={{ top: 14, fontSize: 14, color: "#90949c" }}
      >{label}</motion.label>
    </div>
  );
}

function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    if (!name || !email || password.length < 6) return setErr("Fill all fields (password min 6 chars).");
    if (password !== confirm) return setErr("Passwords do not match.");
    setLoading(true);
    try {
      await signup(name, email, password);
      navigate({ to: "/app" });
    } catch {
      setErr("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <SignInBackground />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-sm mx-4 py-6"
      >
        {/* Logo */}
        <motion.div className="flex justify-center mb-6"
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}>
          <img src="/logo1.png" alt="mybookEarn" className="h-14 object-contain brightness-0 invert drop-shadow-xl" />
        </motion.div>

        {/* Card — glassmorphism matching sign-in */}
        <div className="bg-white/15 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30 p-7">
          <h2 className="text-2xl font-bold text-white mb-1 text-center">Create your account</h2>
          <p className="text-sm text-white/75 mb-6 text-center">Start planning campaigns in minutes. Free forever.</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <FloatingInput label="Full name" value={name} onChange={setName} />
            <FloatingInput label="Work email" type="email" value={email} onChange={setEmail} />
            <FloatingInput label="Password (min 6 characters)" type="password" value={password} onChange={setPassword} />
            <FloatingInput label="Confirm password" type="password" value={confirm} onChange={setConfirm} />

            <AnimatePresence>
              {err && (
                <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
                >{err}</motion.p>
              )}
            </AnimatePresence>

            <LiquidButton type="submit" disabled={loading} loading={loading}
              className="w-full bg-[#00008B] hover:bg-[#00006B] text-white font-bold py-3 rounded-xl text-sm transition-colors"
            >Create account</LiquidButton>

            <div className="flex justify-center gap-5 pt-1">
              {["No credit card", "Cancel anytime", "SOC-2 ready"].map((t) => (
                <span key={t} className="flex items-center gap-1 text-[11px] text-white/70">
                  <span className="text-[#42b72a] font-bold">✓</span> {t}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <hr className="flex-1 border-white/25" />
              <span className="text-xs text-white/50">or</span>
              <hr className="flex-1 border-white/25" />
            </div>

            <p className="text-center text-sm text-white/75">
              Already have an account?{" "}
              <Link to="/sign-in" className="text-white font-semibold hover:underline">Sign in</Link>
            </p>
          </form>
        </div>

        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          className="text-xs text-white/50 text-center mt-5">
          © mybookEarn · Your time, your money
        </motion.p>
      </motion.div>
    </div>
  );
}
