import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  Coins,
  Wallet,
  TrendingUp,
  Users,
  Link2,
  Gift,
  BarChart3,
} from "lucide-react";
import "./SignInBackground.css";

const COLORS = {
  primary: "#00008B",
  dark: "#00006B",
  mid: "#3333cc",
  light: "#6666dd",
  white: "#FFFFFF",
};

const floatY = (duration = 5, delay = 0) => ({
  animate: { y: [-10, 10, -10] },
  transition: { duration, repeat: Infinity, ease: "easeInOut", delay },
});

const walkX = (distance, duration, reverse = false) => ({
  animate: { x: reverse ? [distance, -distance, distance] : [-distance, distance, -distance] },
  transition: { duration, repeat: Infinity, ease: "linear" },
});

function Person({ skin = "#FCD9B6", shirt = COLORS.primary, children, className = "" }) {
  return (
    <g className={className}>
      <ellipse cx="55" cy="130" rx="48" ry="12" fill="#1E40AF" opacity="0.35" />
      <rect x="30" y="70" width="50" height="58" rx="12" fill={shirt} />
      <circle cx="55" cy="48" r="22" fill={skin} />
      <rect x="18" y="88" width="18" height="42" rx="8" fill="#1D4ED8" />
      <rect x="74" y="88" width="18" height="42" rx="8" fill="#1D4ED8" />
      {children}
    </g>
  );
}

function Coin({ x, y, size = 18, delay = 0 }) {
  return (
    <motion.div
      className="signin-bg__coin"
      style={{ left: x, width: size, height: size, fontSize: size * 0.65 }}
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: -1100, opacity: [0, 1, 1, 0], rotate: 360 }}
      transition={{ duration: 14, repeat: Infinity, delay, ease: "linear" }}
    >
      ₹
    </motion.div>
  );
}

function AnalyticsCard({ title, value, style, delay = 0 }) {
  return (
    <motion.div
      className="signin-bg__card"
      style={style}
      {...floatY(5 + delay * 0.5, delay)}
    >
      <h4>{value}</h4>
      <p>{title}</p>
    </motion.div>
  );
}

function IconBadge({ icon: Icon, style, delay = 0 }) {
  return (
    <motion.div className="signin-bg__icon-badge" style={style} {...floatY(4.5, delay)}>
      <Icon size={26} strokeWidth={1.8} />
    </motion.div>
  );
}

export default function SignInBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 48 }, (_, i) => ({
        id: i,
        left: `${4 + Math.random() * 92}%`,
        top: `${4 + Math.random() * 92}%`,
        size: 2 + Math.random() * 2.5,
        delay: Math.random() * 10,
        duration: 8 + Math.random() * 12,
      })),
    [],
  );

  return (
    <div className="signin-bg" aria-hidden="true">
      {/* Gradient base */}
      <div className="signin-bg__gradient" />

      {/* Soft geometric shapes */}
      <svg className="signin-bg__geo" viewBox="0 0 1920 1080" preserveAspectRatio="xMidYMid slice">
        <circle cx="180" cy="140" r="90" fill={COLORS.white} opacity="0.08" />
        <circle cx="1680" cy="920" r="120" fill={COLORS.cyan} opacity="0.15" />
        <polygon points="1720,180 1780,220 1720,260 1660,220" fill={COLORS.white} opacity="0.1" />
        <polygon points="120,880 180,920 120,960 60,920" fill={COLORS.light} opacity="0.12" />
        <rect x="1580" y="420" width="80" height="80" rx="16" transform="rotate(15 1620 460)" fill={COLORS.white} opacity="0.06" />
        <ellipse cx="960" cy="540" rx="280" ry="320" fill={COLORS.white} opacity="0.04" />
      </svg>

      {/* Glow blobs */}
      <motion.div
        className="signin-bg__blob signin-bg__blob--1"
        animate={{ x: [-40, 50, -40], y: [-30, 40, -30] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="signin-bg__blob signin-bg__blob--2"
        animate={{ x: [40, -30, 40], y: [20, -50, 20] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="signin-bg__blob signin-bg__blob--3"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Particles */}
      <div className="signin-bg__particles">
        {particles.map((p) => (
          <span
            key={p.id}
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              animationDuration: `${p.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Center safe area — kept empty for glass sign-in form */}
      <div className="signin-bg__center-safe" />

      {/* ── LEFT: Digital board + writer ── */}
      <motion.div
        className="signin-bg__scene signin-bg__scene--left-top"
        initial={{ opacity: 0, x: -60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.div
          className="signin-bg__digital-board"
          animate={{ rotate: [-0.8, 0.8, -0.8] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="signin-bg__board-screen">
            <motion.h2
              className="signin-bg__board-title"
              initial={{ clipPath: "inset(0 100% 0 0)" }}
              animate={{ clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 0)", "inset(0 100% 0 0)"] }}
              transition={{ duration: 8, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            >
              MybookEarn
            </motion.h2>
            <span>Grow • Earn • Refer</span>
            <motion.div
              className="signin-bg__board-stroke"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: [0, 1, 1, 0] }}
              transition={{ duration: 8, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>

        <motion.div className="signin-bg__character" {...walkX(24, 14)}>
          <svg viewBox="0 0 110 145" width="110" height="145">
            <Person shirt={COLORS.primary}>
              <rect x="78" y="52" width="36" height="8" rx="4" fill={COLORS.white} opacity="0.9" transform="rotate(-20 96 56)" />
            </Person>
          </svg>
        </motion.div>
      </motion.div>

      {/* ── LEFT BOTTOM: Seller / presenter ── */}
      <motion.div
        className="signin-bg__scene signin-bg__scene--left-bottom"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.2 }}
      >
        <motion.div className="signin-bg__character" {...walkX(20, 16, true)}>
          <svg viewBox="0 0 130 145" width="120" height="145">
            <Person shirt={COLORS.blue}>
              <rect x="70" y="58" width="32" height="22" rx="6" fill={COLORS.white} opacity="0.9" />
              <path d="M76 68 L88 68 L82 76 Z" fill={COLORS.primary} />
            </Person>
          </svg>
        </motion.div>
        <motion.div
          className="signin-bg__label-pill"
          animate={{ opacity: [0.65, 1, 0.65] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <TrendingUp size={16} />
          <span>Presenting MybookEarn</span>
        </motion.div>
      </motion.div>

      {/* ── RIGHT: Tablet earnings ── */}
      <motion.div
        className="signin-bg__scene signin-bg__scene--right-top"
        initial={{ opacity: 0, x: 60 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.15 }}
      >
        <motion.div className="signin-bg__character" {...floatY(4)}>
          <svg viewBox="0 0 130 145" width="120" height="145">
            <Person shirt={COLORS.primary}>
              <rect x="72" y="58" width="44" height="56" rx="8" fill={COLORS.white} opacity="0.95" />
              <text x="94" y="84" textAnchor="middle" fill={COLORS.primary} fontSize="11" fontWeight="700">₹52K</text>
              <path d="M82 94 L88 88 L94 92 L102 82" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" fill="none" />
            </Person>
          </svg>
        </motion.div>
      </motion.div>

      {/* ── RIGHT BOTTOM: Referral sharing ── */}
      <motion.div
        className="signin-bg__scene signin-bg__scene--right-bottom"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.25 }}
      >
        <motion.div className="signin-bg__character" {...walkX(18, 13)}>
          <svg viewBox="0 0 130 145" width="120" height="145">
            <Person shirt={COLORS.light}>
              <circle cx="92" cy="68" r="10" fill={COLORS.white} opacity="0.9" />
              <circle cx="108" cy="84" r="10" fill={COLORS.white} opacity="0.75" />
              <path d="M98 72 C104 78 110 84 116 90" stroke={COLORS.white} strokeWidth="2" strokeLinecap="round" fill="none" />
            </Person>
          </svg>
        </motion.div>
        <motion.div className="signin-bg__label-pill signin-bg__label-pill--right" {...floatY(5.5, 0.3)}>
          <Link2 size={16} />
          <span>Sharing referral links</span>
        </motion.div>
      </motion.div>

      {/* Floating coins */}
      {[8, 14, 22, 30, 68, 76, 84, 92].map((left, i) => (
        <Coin key={i} x={`${left}%`} delay={i * 1.4} size={i % 2 === 0 ? 20 : 16} />
      ))}

      {/* Analytics cards — edges only */}
      <AnalyticsCard title="Total Earnings" value="₹45,230" style={{ top: "18%", left: "4%" }} delay={0} />
      <AnalyticsCard title="Growth" value="+234%" style={{ top: "12%", right: "5%" }} delay={0.4} />
      <AnalyticsCard title="Referrals" value="1200+" style={{ bottom: "10%", left: "6%" }} delay={0.8} />
      <AnalyticsCard title="Rewards" value="+120" style={{ bottom: "14%", right: "6%" }} delay={1.2} />

      {/* Icon badges */}
      <IconBadge icon={Coins} style={{ top: "8%", left: "22%" }} delay={0.2} />
      <IconBadge icon={Wallet} style={{ top: "22%", right: "18%" }} delay={0.5} />
      <IconBadge icon={BarChart3} style={{ bottom: "22%", left: "18%" }} delay={0.7} />
      <IconBadge icon={Users} style={{ bottom: "8%", right: "22%" }} delay={1} />
      <IconBadge icon={Gift} style={{ top: "42%", left: "2%" }} delay={0.3} />

      {/* Pulsing growth arrows */}
      {[
        { style: { bottom: "18%", right: "14%" }, delay: 0 },
        { style: { top: "28%", left: "16%" }, delay: 1.2 },
      ].map(({ style, delay }, i) => (
        <motion.div
          key={i}
          className="signin-bg__growth-arrow"
          style={style}
          animate={{ scale: [1, 1.15, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2.5, repeat: Infinity, delay }}
        >
          <TrendingUp size={32} strokeWidth={2.5} />
        </motion.div>
      ))}

      {/* Bottom marketing strip */}
      <motion.div
        className="signin-bg__footer-tag"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <span>People actively marketing &amp; promoting</span>
        <strong>MybookEarn</strong>
      </motion.div>
    </div>
  );
}
