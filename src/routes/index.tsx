import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  Rocket,
  BarChart3,
  Users,
  Target,
  Sparkles,
  ArrowRight,
  Check,
} from "lucide-react";
import { Logo } from "@/components/Logo";
import { ClayCard } from "@/components/ui-bits";

export const Route = createFileRoute("/")({
  component: Landing,
  head: () => ({
    meta: [
      { title: "mybookEarn Ads Manager — Your time, your money" },
      { name: "description", content: "Launch, manage and measure high-performing ad campaigns from one clean claymorphic dashboard." },
    ],
  }),
});

function Landing() {
  return (
    <div className="min-h-screen" style={{ background: "var(--gradient-hero)" }}>
      {/* Nav */}
      <header className="max-w-7xl mx-auto flex items-center justify-between px-6 py-5">
        <Logo />
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
          <a href="#features" className="hover:text-primary">Features</a>
          <a href="#how" className="hover:text-primary">How it works</a>
          <a href="#pricing" className="hover:text-primary">Pricing</a>
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/sign-in" className="clay-sm px-4 py-2 text-sm font-semibold text-primary">
            Sign in
          </Link>
          <Link to="/sign-up" className="clay-primary px-4 py-2 text-sm font-semibold">
            Get started
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-flex items-center gap-2 clay-sm px-3 py-1.5 text-xs font-semibold text-primary mb-6">
            <Sparkles className="h-3.5 w-3.5" /> New — Smart Audience Builder
          </span>
          <h1 className="text-5xl md:text-6xl font-bold leading-[1.05] text-primary">
            Turn attention into <span className="gradient-text">earnings</span>.
          </h1>
          <p className="mt-5 text-lg text-muted-foreground max-w-xl">
            mybookEarn Ads Manager gives you a beautiful, calm surface for the
            entire ad lifecycle — plan, launch, optimize and report without the noise.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/sign-up" className="clay-primary px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
              Start free <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/app" className="clay-sm px-6 py-3 text-sm font-semibold text-primary">
              Live demo
            </Link>
          </div>
          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {["No credit card", "Cancel anytime", "SOC-2 ready"].map((t) => (
              <li key={t} className="inline-flex items-center gap-1.5">
                <Check className="h-4 w-4 text-primary" /> {t}
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Bento preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="grid grid-cols-6 gap-4"
        >
          <ClayCard className="col-span-4">
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Reach</p>
            <p className="text-4xl font-bold text-primary mt-1">2.4M</p>
            <div className="mt-4 flex items-end gap-1 h-16">
              {[30, 50, 40, 70, 55, 80, 65, 90, 72, 95].map((h, i) => (
                <motion.span
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                  className="flex-1 rounded-t"
                  style={{ background: "var(--gradient-primary)" }}
                />
              ))}
            </div>
          </ClayCard>
          <ClayCard className="col-span-2" delay={0.1}>
            <Target className="h-6 w-6 text-primary" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2">CTR</p>
            <p className="text-3xl font-bold text-primary mt-1">3.42%</p>
          </ClayCard>
          <ClayCard className="col-span-2" delay={0.15}>
            <Users className="h-6 w-6 text-primary" />
            <p className="text-xs uppercase tracking-widest text-muted-foreground mt-2">Audiences</p>
            <p className="text-3xl font-bold text-primary mt-1">18</p>
          </ClayCard>
          <ClayCard className="col-span-4" delay={0.2}>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">Active campaigns</p>
            <div className="mt-3 space-y-2">
              {["Summer Book Launch", "Referral Boost Q3", "Author Spotlight"].map((n, i) => (
                <div key={n} className="flex items-center justify-between text-sm">
                  <span className="font-medium">{n}</span>
                  <span className="text-xs text-muted-foreground">${(12400 - i * 3100).toLocaleString()}</span>
                </div>
              ))}
            </div>
          </ClayCard>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-primary">Everything you need. Nothing you don't.</h2>
          <p className="mt-3 text-muted-foreground">A modern surface for modern marketers.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Rocket, title: "Launch fast", body: "Guided flows for campaigns, ad sets and creatives — with sensible defaults." },
            { icon: BarChart3, title: "Real insights", body: "Live performance, cost-per-result and reach trends without spreadsheet gymnastics." },
            { icon: Users, title: "Smart audiences", body: "Build custom, saved and lookalike audiences with a beautifully simple UI." },
          ].map((f, i) => (
            <ClayCard key={f.title} delay={i * 0.08}>
              <f.icon className="h-8 w-8 text-primary" />
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{f.body}</p>
            </ClayCard>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="pricing" className="max-w-4xl mx-auto px-6 pb-24">
        <ClayCard className="text-center py-14">
          <h3 className="text-3xl md:text-4xl font-bold text-primary">Ready to earn from every impression?</h3>
          <p className="mt-3 text-muted-foreground">Start free. Upgrade only when you scale.</p>
          <Link to="/sign-up" className="mt-6 inline-flex clay-primary px-6 py-3 text-sm font-semibold">
            Create your account
          </Link>
        </ClayCard>
      </section>

      <footer className="border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} mybookEarn · Your time, your money
      </footer>
    </div>
  );
}
