import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Rocket, BarChart3, Users, Target, Sparkles, ArrowRight, Check, TrendingUp, Megaphone, PieChart, Layers, DollarSign, BookOpen, HelpCircle, ChevronDown } from "lucide-react";
import { ClayCard } from "@/components/ui-bits";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "mybookEarn Ads Manager — Your time, your money" },
      { name: "description", content: "Launch, manage and measure high-performing ad campaigns." },
    ],
  }),
});

/* ── Dropdown data ── */
const NAV_ITEMS = [
  {
    label: "Features",
    items: [
      { icon: Megaphone,  title: "Campaign Manager",   desc: "Create & manage ad campaigns" },
      { icon: PieChart,   title: "Analytics",          desc: "Real-time performance insights" },
      { icon: Users,      title: "Audience Builder",   desc: "Custom & lookalike audiences" },
      { icon: Layers,     title: "Ad Sets",            desc: "Organise creatives & budgets" },
    ],
  },
  {
    label: "How it works",
    items: [
      { icon: BookOpen,   title: "Getting Started",    desc: "Launch your first campaign in minutes" },
      { icon: Target,     title: "Targeting",          desc: "Reach the right audience" },
      { icon: BarChart3,  title: "Optimisation",       desc: "Auto-tune bids & budgets" },
      { icon: TrendingUp, title: "Reporting",          desc: "Export & schedule reports" },
    ],
  },
  {
    label: "Pricing",
    items: [
      { icon: DollarSign, title: "Free Plan",          desc: "Up to 3 active campaigns" },
      { icon: Rocket,     title: "Growth",             desc: "Unlimited campaigns & audiences" },
      { icon: Layers,     title: "Business",           desc: "Team seats & priority support" },
      { icon: HelpCircle, title: "Compare plans",      desc: "See full feature breakdown" },
    ],
  },
];

function NavDropdown({ label, items }: typeof NAV_ITEMS[0]) {
  const [open, setOpen] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function enter() {
    if (timer.current) clearTimeout(timer.current);
    setOpen(true);
  }
  function leave() {
    timer.current = setTimeout(() => setOpen(false), 120);
  }

  return (
    <div className="relative" onMouseEnter={enter} onMouseLeave={leave}>
      <button className={`flex items-center gap-1 px-1 py-1 text-sm font-medium transition-colors ${
        open ? "text-[#00008B]" : "text-[#65676b] hover:text-[#00008B]"
      }`}>
        {label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-white rounded-2xl border border-[#dddfe2] shadow-xl z-50 p-2"
          >
            {/* Arrow */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-2 overflow-hidden">
              <div className="w-3 h-3 bg-white border-l border-t border-[#dddfe2] rotate-45 mx-auto translate-y-1" />
            </div>
            {items.map((item) => (
              <motion.a
                key={item.title}
                href="#"
                whileHover={{ backgroundColor: "#f0f2f5", x: 2 }}
                transition={{ duration: 0.12 }}
                className="flex items-start gap-3 px-3 py-2.5 rounded-xl group"
              >
                <div className="h-8 w-8 rounded-lg bg-[#e8e8f5] flex items-center justify-center flex-shrink-0 group-hover:bg-[#00008B] transition-colors">
                  <item.icon className="h-4 w-4 text-[#00008B] group-hover:text-white transition-colors" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[#1c1e21]">{item.title}</p>
                  <p className="text-xs text-[#65676b] mt-0.5">{item.desc}</p>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-[#f0f2f5]">

      {/* ── Navbar ── */}
      <motion.header
        initial={{ y: -56, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="sticky top-0 z-50 bg-white border-b border-[#dddfe2] shadow-sm"
      >
        <div className="w-full flex items-center justify-between px-6 h-14">
          <div className="flex items-center gap-2">
            <img src="/logo1.png" alt="mybookEarn Ads Manager logo" className="h-35 w-50 object-contain shrink-0" />
          </div>
          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((n) => <NavDropdown key={n.label} {...n} />)}
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/sign-in" className="px-4 py-2 text-sm font-semibold text-[#00008B] hover:bg-[#f0f2f5] rounded-lg transition-colors">
              Sign in
            </Link>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/sign-up" className="clay-primary px-4 py-2 text-sm font-semibold">
                Get started
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.header>

      {/* ── Hero ── */}
      <section className="w-full px-6 pt-16 pb-20 grid lg:grid-cols-2 gap-14 items-center">
        {/* Left text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            className="inline-flex items-center gap-2 bg-white border border-[#dddfe2] shadow-sm px-3 py-1.5 text-xs font-semibold text-[#00008B] rounded-full mb-6"
          >
            <Sparkles className="h-3.5 w-3.5" /> New — Smart Audience Builder
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="text-5xl md:text-6xl font-bold leading-[1.05] text-[#00008B]"
          >
            Turn attention into{" "}
            <span className="gradient-text">earnings</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.32, duration: 0.5 }}
            className="mt-5 text-lg text-[#65676b] leading-relaxed"
          >
            mybookEarn Ads Manager gives you a beautiful, calm surface for the entire ad lifecycle — plan, launch, optimize and report without the noise.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.42 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
              <Link to="/sign-up" className="clay-primary px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
                Start free <ArrowRight className="h-4 w-4" />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/app" className="bg-white border border-[#dddfe2] shadow-sm px-6 py-3 text-sm font-semibold text-[#00008B] rounded-xl inline-flex items-center gap-2 hover:bg-[#f0f2f5] transition-colors">
                Live demo
              </Link>
            </motion.div>
          </motion.div>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.55 }}
            className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#65676b]"
          >
            {["No credit card", "Cancel anytime", "SOC-2 ready"].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-[#42b72a]" /> {t}
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Right — dashboard bento preview */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.65, delay: 0.1, ease: "easeOut" }}
          className="grid grid-cols-6 gap-3"
        >
          <ClayCard className="col-span-4">
            <p className="text-xs uppercase tracking-widest text-[#65676b]">Reach</p>
            <p className="text-4xl font-bold text-[#00008B] mt-1">2.4M</p>
            <div className="mt-4 flex items-end gap-1 h-16">
              {[30, 50, 40, 70, 55, 80, 65, 90, 72, 95].map((h, i) => (
                <motion.span
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.4 + i * 0.05, duration: 0.5 }}
                  className="flex-1 rounded-t"
                  style={{ background: "var(--gradient-primary)" }}
                />
              ))}
            </div>
          </ClayCard>
          <ClayCard className="col-span-2" delay={0.1}>
            <Target className="h-5 w-5 text-[#00008B]" />
            <p className="text-xs uppercase tracking-widest text-[#65676b] mt-2">CTR</p>
            <p className="text-3xl font-bold text-[#00008B] mt-1">3.42%</p>
          </ClayCard>
          <ClayCard className="col-span-2" delay={0.15}>
            <Users className="h-5 w-5 text-[#00008B]" />
            <p className="text-xs uppercase tracking-widest text-[#65676b] mt-2">Audiences</p>
            <p className="text-3xl font-bold text-[#00008B] mt-1">18</p>
          </ClayCard>
          <ClayCard className="col-span-4" delay={0.2}>
            <p className="text-xs uppercase tracking-widest text-[#65676b]">Active campaigns</p>
            <div className="mt-3 space-y-2">
              {[["Summer Book Launch", "$12,400"], ["Referral Boost Q3", "$9,300"], ["Author Spotlight", "$6,200"]].map(([n, v]) => (
                <div key={n} className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[#1c1e21]">{n}</span>
                  <span className="text-xs text-[#65676b]">{v}</span>
                </div>
              ))}
            </div>
          </ClayCard>
        </motion.div>
      </section>

      {/* ── Features ── */}
      <section id="features" className="bg-white border-y border-[#dddfe2] py-20">
        <div className="w-full px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#00008B]">Everything you need. Nothing you don't.</h2>
            <p className="mt-3 text-[#65676b]">A modern surface for modern marketers.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Rocket, title: "Launch fast", body: "Guided flows for campaigns, ad sets and creatives — with sensible defaults." },
              { icon: BarChart3, title: "Real insights", body: "Live performance, cost-per-result and reach trends without spreadsheet gymnastics." },
              { icon: Users, title: "Smart audiences", body: "Build custom, saved and lookalike audiences with a beautifully simple UI." },
            ].map((f, i) => (
              <ClayCard key={f.title} delay={i * 0.1}>
                <div className="h-10 w-10 rounded-xl bg-[#e8e8f5] flex items-center justify-center mb-4">
                  <f.icon className="h-5 w-5 text-[#00008B]" />
                </div>
                <h3 className="text-lg font-semibold text-[#1c1e21]">{f.title}</h3>
                <p className="mt-1.5 text-sm text-[#65676b]">{f.body}</p>
              </ClayCard>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip ── */}
      <section id="how" className="w-full px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: TrendingUp, label: "Avg. ROAS", value: "4.8×" },
            { icon: BarChart3, label: "Campaigns run", value: "120K+" },
            { icon: Users, label: "Active advertisers", value: "18K" },
            { icon: Target, label: "Avg. CTR", value: "3.4%" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              className="bg-white rounded-2xl border border-[#dddfe2] p-5 text-center shadow-sm"
            >
              <s.icon className="h-6 w-6 text-[#00008B] mx-auto mb-2" />
              <p className="text-3xl font-bold text-[#00008B]">{s.value}</p>
              <p className="text-xs text-[#65676b] mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section id="pricing" className="w-full px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl border border-[#dddfe2] shadow-sm text-center py-14 px-8"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-[#00008B]">Ready to earn from every impression?</h3>
          <p className="mt-3 text-[#65676b]">Start free. Upgrade only when you scale.</p>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="inline-block mt-6">
            <Link to="/sign-up" className="clay-primary px-8 py-3 text-sm font-semibold inline-flex items-center gap-2">
              Create your account <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <footer className="border-t border-[#dddfe2] py-6 text-center text-xs text-[#65676b]">
        © {new Date().getFullYear()} mybookEarn · Your time, your money
      </footer>
    </div>
  );
}
