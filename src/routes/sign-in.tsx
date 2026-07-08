import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import SignInBackground from "@/components/background/SignInBackground";

export const Route = createFileRoute("/sign-in")({
  component: SignIn,
  head: () => ({ meta: [{ title: "Sign in — mybookEarn" }] }),
});

/* ─────────────────────────────────────────────
   SHARED: Animated Illustration Background
───────────────────────────────────────────── */
export function AdsBg() {
  const bars = [38, 55, 42, 70, 58, 82, 66, 90, 74, 95];
  const pie  = [
    { pct: 0.42, color: "#00008B", label: "42%" },
    { pct: 0.28, color: "#3333cc", label: "28%" },
    { pct: 0.30, color: "#e8e8f5", label: "30%" },
  ];

  // pie arc helper
  function arc(cx: number, cy: number, r: number, start: number, end: number) {
    const s = { x: cx + r * Math.cos(start), y: cy + r * Math.sin(start) };
    const e = { x: cx + r * Math.cos(end),   y: cy + r * Math.sin(end)   };
    const large = end - start > Math.PI ? 1 : 0;
    return `M ${cx} ${cy} L ${s.x} ${s.y} A ${r} ${r} 0 ${large} 1 ${e.x} ${e.y} Z`;
  }

  let pieAngle = -Math.PI / 2;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">

      {/* ── Gradient base ── */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(135deg, #00008B 0%, #1a1aaa 40%, #0000cc 70%, #00008B 100%)"
      }} />

      {/* ── Dot grid ── */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.5" fill="white" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dots)" />
      </svg>

      {/* ── Glowing orbs ── */}
      {[
        { x: "8%",  y: "12%", s: 320, dur: 8  },
        { x: "72%", y: "60%", s: 280, dur: 11 },
        { x: "55%", y: "5%",  s: 200, dur: 14 },
        { x: "85%", y: "15%", s: 180, dur: 9  },
        { x: "5%",  y: "70%", s: 240, dur: 12 },
      ].map((o, i) => (
        <motion.div key={i}
          className="absolute rounded-full"
          style={{ width: o.s, height: o.s, left: o.x, top: o.y,
            background: "radial-gradient(circle, rgba(255,255,255,0.12) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: o.dur, repeat: Infinity, ease: "easeInOut", delay: i * 1.2 }}
        />
      ))}

      {/* ── Floating orbit rings ── */}
      {[
        { cx: "15%", cy: "20%", r: 90,  dur: 20, delay: 0   },
        { cx: "80%", cy: "75%", r: 120, dur: 25, delay: 3   },
        { cx: "70%", cy: "15%", r: 70,  dur: 18, delay: 1.5 },
      ].map((ring, i) => (
        <motion.div key={i}
          className="absolute rounded-full border border-white/10"
          style={{ width: ring.r * 2, height: ring.r * 2,
            left: `calc(${ring.cx} - ${ring.r}px)`,
            top:  `calc(${ring.cy} - ${ring.r}px)` }}
          animate={{ rotate: 360 }}
          transition={{ duration: ring.dur, repeat: Infinity, ease: "linear", delay: ring.delay }}
        >
          <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/40" />
        </motion.div>
      ))}

      {/* ── Dashboard card: Bar chart ── */}
      <motion.div
        className="absolute bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 w-56"
        style={{ left: "4%", top: "8%" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.7 }}
      >
        <p className="text-white/50 text-[9px] uppercase tracking-widest mb-1">Campaign Reach</p>
        <p className="text-white font-bold text-2xl mb-3">2.4M</p>
        <div className="flex items-end gap-1 h-14">
          {bars.map((h, i) => (
            <motion.div key={i}
              className="flex-1 rounded-t-sm"
              style={{ background: "linear-gradient(to top, #ffffff40, #ffffff90)" }}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.5 + i * 0.06, duration: 0.5, ease: "easeOut" }}
            />
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-white/40 text-[8px]">Jan</span>
          <span className="text-white/40 text-[8px]">Oct</span>
        </div>
      </motion.div>

      {/* ── Metric pill: CTR ── */}
      <motion.div
        className="absolute bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3"
        style={{ left: "4%", top: "46%" }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M2 12 L5 8 L8 10 L11 5 L14 7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div>
          <p className="text-white/50 text-[9px] uppercase tracking-widest">CTR</p>
          <motion.p className="text-white font-bold text-lg leading-none"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
            3.42%
          </motion.p>
        </div>
        <motion.span className="text-[10px] font-semibold text-green-300 bg-green-400/20 px-1.5 py-0.5 rounded-full"
          animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }}>
          ↑ 12%
        </motion.span>
      </motion.div>

      {/* ── Metric pill: ROAS ── */}
      <motion.div
        className="absolute bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 flex items-center gap-3"
        style={{ left: "4%", top: "60%" }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.75, duration: 0.6 }}
      >
        <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="6" stroke="white" strokeWidth="1.5"/>
            <path d="M8 5v3l2 2" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
          </svg>
        </div>
        <div>
          <p className="text-white/50 text-[9px] uppercase tracking-widest">Avg. ROAS</p>
          <p className="text-white font-bold text-lg leading-none">4.8×</p>
        </div>
        <motion.span className="text-[10px] font-semibold text-green-300 bg-green-400/20 px-1.5 py-0.5 rounded-full"
          animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 2.5, repeat: Infinity }}>
          ↑ 8%
        </motion.span>
      </motion.div>

      {/* ── Pie chart card ── */}
      <motion.div
        className="absolute bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 w-48"
        style={{ right: "4%", top: "8%" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7 }}
      >
        <p className="text-white/50 text-[9px] uppercase tracking-widest mb-3">Audience Split</p>
        <svg width="100%" viewBox="0 0 100 100">
          {pie.map((slice, i) => {
            const start = pieAngle;
            const end   = pieAngle + slice.pct * 2 * Math.PI;
            pieAngle    = end;
            return (
              <motion.path key={i} d={arc(50, 50, 38, start, end)} fill={slice.color}
                initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.15, duration: 0.4 }}
                style={{ transformOrigin: "50px 50px" }}
              />
            );
          })}
          <circle cx="50" cy="50" r="22" fill="rgba(255,255,255,0.08)" />
          <text x="50" y="54" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">42%</text>
        </svg>
        <div className="flex flex-col gap-1 mt-2">
          {[["#00008B","Returning"],["#3333cc","New"],["#e8e8f5","Others"]].map(([c,l]) => (
            <div key={l} className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full" style={{ background: c }} />
              <span className="text-white/50 text-[9px]">{l}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Active campaigns card ── */}
      <motion.div
        className="absolute bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-4 w-52"
        style={{ right: "4%", top: "46%" }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.55, duration: 0.7 }}
      >
        <p className="text-white/50 text-[9px] uppercase tracking-widest mb-3">Active Campaigns</p>
        {[
          { name: "Summer Launch", pct: 82 },
          { name: "Referral Boost", pct: 61 },
          { name: "Author Spotlight", pct: 44 },
        ].map((c, i) => (
          <div key={c.name} className="mb-2.5">
            <div className="flex justify-between mb-1">
              <span className="text-white/70 text-[10px]">{c.name}</span>
              <span className="text-white/50 text-[10px]">{c.pct}%</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div className="h-full rounded-full"
                style={{ background: "linear-gradient(90deg, #ffffff80, #ffffffcc)" }}
                initial={{ width: 0 }}
                animate={{ width: `${c.pct}%` }}
                transition={{ delay: 0.9 + i * 0.15, duration: 0.7, ease: "easeOut" }}
              />
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── Floating tag pills ── */}
      {[
        { label: "📊 Analytics",   x: "30%", y: "6%",  delay: 1.0 },
        { label: "🎯 Targeting",   x: "58%", y: "88%", delay: 1.2 },
        { label: "💰 Budget",      x: "28%", y: "88%", delay: 1.4 },
        { label: "📈 Growth",      x: "60%", y: "6%",  delay: 1.1 },
      ].map((p) => (
        <motion.div key={p.label}
          className="absolute bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-3 py-1.5"
          style={{ left: p.x, top: p.y }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1, y: [0, -6, 0] }}
          transition={{ delay: p.delay, duration: 0.5,
            y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: p.delay } }}
        >
          <span className="text-white/80 text-[11px] font-medium whitespace-nowrap">{p.label}</span>
        </motion.div>
      ))}

      {/* ── Animated connection lines ── */}
      <svg className="absolute inset-0 w-full h-full opacity-10" style={{ zIndex: 0 }}>
        {[
          "M 15% 30% Q 35% 50% 50% 50%",
          "M 85% 30% Q 65% 50% 50% 50%",
          "M 15% 55% Q 30% 50% 50% 50%",
          "M 85% 60% Q 70% 55% 50% 50%",
        ].map((d, i) => (
          <motion.path key={i} d={d} fill="none" stroke="white" strokeWidth="1"
            strokeDasharray="4 4"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ delay: 1.2 + i * 0.2, duration: 1, ease: "easeOut" }}
          />
        ))}
      </svg>

      {/* ── Central pulsing node ── */}
      <motion.div
        className="absolute rounded-full border-2 border-white/30"
        style={{ width: 16, height: 16, left: "calc(50% - 8px)", top: "calc(50% - 8px)" }}
        animate={{ scale: [1, 1.8, 1], opacity: [1, 0.3, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute w-3 h-3 rounded-full bg-white/60"
        style={{ left: "calc(50% - 6px)", top: "calc(50% - 6px)" }} />

    </div>
  );
}

/* ─────────────────────────────────────────────
   SHARED: Liquid Button
───────────────────────────────────────────── */
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
          Signing in…
        </span>
      ) : children}
    </motion.button>
  );
}

/* ─────────────────────────────────────────────
   SHARED: Floating Label Input
───────────────────────────────────────────── */
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

/* ─────────────────────────────────────────────
   SIGN IN
───────────────────────────────────────────── */
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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <SignInBackground />

      <motion.div
        initial={{ opacity: 0, y: 28, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-sm mx-4"
      >
        {/* Logo */}
        <motion.div className="flex justify-center mb-6"
          initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}>
          <img src="/logo1.png" alt="mybookEarn" className="h-14 object-contain brightness-0 invert drop-shadow-xl" />
        </motion.div>

        {/* Card — glassmorphism over animated background */}
        <div className="bg-white/15 backdrop-blur-2xl rounded-2xl shadow-2xl border border-white/30 p-7">
          <h2 className="text-2xl font-bold text-white mb-1 text-center">Welcome back</h2>
          <p className="text-sm text-white/75 mb-6 text-center">Sign in to your Ads Manager account.</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <FloatingInput label="Email or phone number" type="email" value={email} onChange={setEmail} />
            <FloatingInput label="Password" type="password" value={password} onChange={setPassword} />

            <AnimatePresence>
              {err && (
                <motion.p initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }}
                  className="text-xs text-red-500 bg-red-50 border border-red-200 rounded-lg px-3 py-2"
                >{err}</motion.p>
              )}
            </AnimatePresence>

            <LiquidButton type="submit" disabled={loading} loading={loading}
              className="w-full bg-[#00008B] hover:bg-[#00006B] text-white font-bold py-3 rounded-xl text-sm transition-colors"
            >Log in</LiquidButton>

            <div className="text-center">
              <Link to="/forgot-password" className="text-white/90 text-sm hover:underline">
                Forgot password?
              </Link>
            </div>

            <div className="flex items-center gap-3">
              <hr className="flex-1 border-white/25" />
              <span className="text-xs text-white/50">or</span>
              <hr className="flex-1 border-white/25" />
            </div>

            <LiquidButton type="button"
              className="w-full bg-[#42b72a] hover:bg-[#36a420] text-white font-bold py-3 rounded-xl text-sm transition-colors"
              onClick={() => navigate({ to: "/sign-up" })}
            >Create new account</LiquidButton>
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

/* ─────────────────────────────────────────────
   AUTH SHELL (forgot-password)
───────────────────────────────────────────── */
export function AuthShell({ children, title, subtitle }: {
  children: React.ReactNode; title?: string; subtitle?: string;
}) {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <SignInBackground />
      <div className="relative z-10 w-full max-w-sm mx-4">
        <div className="flex justify-center mb-6">
          <img src="/logo1.png" alt="mybookEarn" className="h-14 object-contain brightness-0 invert drop-shadow-xl" />
        </div>
        {title && <p className="text-white text-center text-lg font-semibold mb-1">{title}</p>}
        {subtitle && <p className="text-white/60 text-center text-sm mb-5">{subtitle}</p>}
        <div className="bg-white rounded-2xl shadow-2xl border border-white/80 p-7">{children}</div>
        <p className="text-xs text-white/50 text-center mt-5">© mybookEarn · Your time, your money</p>
      </div>
    </div>
  );
}
