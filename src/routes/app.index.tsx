import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight, DollarSign, Eye, MousePointerClick, Target,
  Plus, TrendingUp, AlertCircle, CheckCircle2, Zap,
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";
import {
  campaigns, performanceSeries, objectiveBreakdown, summary,
  formatNumber, formatMoney,
} from "@/lib/mockData";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Overview — mybookEarn" }] }),
});

const pieColors = ["#00008B", "#2929a3", "#7AB8F5", "#A8D1F8", "#42b72a", "#f7b928"];

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.07, type: "spring" as const, stiffness: 260, damping: 22 } }),
};

function StatCard({ icon: Icon, label, value, delta, color, i }: any) {
  return (
    <motion.div
      custom={i}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -3, boxShadow: "0 12px 32px rgba(24,119,242,0.13)" }}
      className="bg-white rounded-2xl p-5 border border-[#dddfe2] cursor-default"
    >
      <div className="flex items-start justify-between">
        <div className="p-2.5 rounded-xl" style={{ background: `${color}18` }}>
          <Icon className="h-4 w-4" style={{ color }} />
        </div>
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.07 + 0.3 }}
          className="text-xs font-semibold text-[#42b72a] inline-flex items-center gap-0.5 bg-green-50 px-2 py-0.5 rounded-full"
        >
          <ArrowUpRight className="h-3 w-3" /> {delta}
        </motion.span>
      </div>
      <p className="mt-4 text-xs uppercase tracking-widest text-gray-400">{label}</p>
      <motion.p
        className="mt-1 text-2xl font-bold text-gray-900"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: i * 0.07 + 0.2 }}
      >
        {value}
      </motion.p>
    </motion.div>
  );
}

function Dashboard() {
  const top = [...campaigns].sort((a, b) => b.results - a.results).slice(0, 5);
  const active = campaigns.filter((c) => c.status === "Active");
  const totalBudget = campaigns.reduce((a, c) => a + c.budget, 0);
  const spendPct = Math.min(Math.round((summary.spend / totalBudget) * 100), 100);

  return (
    <div className="space-y-4 px-4 md:px-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-wrap items-center justify-between gap-3"
      >
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Overview</h1>
          <p className="text-sm text-gray-400 mt-0.5">{summary.activeCampaigns} active campaigns · Last 14 days</p>
        </div>
        <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
          <Link
            to="/app/campaigns"
            className="btn-liquid flex items-center gap-1.5 bg-gradient-to-r from-[#00008B] to-[#2929a3] text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-md shadow-indigo-200 hover:shadow-indigo-300 transition-all"
          >
            <Plus className="h-4 w-4" /> Create campaign
          </Link>
        </motion.div>
      </motion.div>

      {/* Account spending card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="bg-white rounded-2xl p-5 border border-[#dddfe2]"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-widest">Account spending</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{formatMoney(summary.spend)}</p>
            <p className="text-xs text-gray-400 mt-0.5">of {formatMoney(totalBudget)} total budget</p>
          </div>
          <div className="flex-1 min-w-[200px] max-w-sm">
            <div className="flex justify-between text-xs text-gray-500 mb-2">
              <span>Spend progress</span>
              <span className="font-semibold text-[#00008B]">{spendPct}%</span>
            </div>
            <div className="h-2.5 bg-[#f0f2f5] rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-[#00008B] to-[#2929a3]"
                initial={{ width: 0 }}
                animate={{ width: `${spendPct}%` }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
              />
            </div>
          </div>
          <div className="flex gap-6">
            {[
              { label: "Active", value: summary.activeCampaigns, color: "#42b72a" },
              { label: "Paused", value: campaigns.filter(c => c.status === "Paused").length, color: "#bcc0c4" },
              { label: "Draft",  value: campaigns.filter(c => c.status === "Draft").length,  color: "#f7b928" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 + i * 0.08 }}
                className="text-center"
              >
                <p className="text-xs text-gray-400">{s.label}</p>
                <p className="text-xl font-bold" style={{ color: s.color }}>{s.value}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard i={0} icon={Eye}              label="Reach"        value={formatNumber(summary.reach)}       delta="+12%" color="#00008B" />
        <StatCard i={1} icon={MousePointerClick} label="Impressions"  value={formatNumber(summary.impressions)} delta="+8%"  color="#7AB8F5" />
        <StatCard i={2} icon={DollarSign}        label="Amount spent" value={formatMoney(summary.spend)}        delta="+4%"  color="#42b72a" />
        <StatCard i={3} icon={Target}            label="Results"      value={formatNumber(summary.results)}     delta="+18%" color="#fa3e3e" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
          className="lg:col-span-4 bg-white rounded-2xl p-5 border border-[#dddfe2]"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm font-semibold text-gray-900">Performance over time</p>
              <p className="text-xs text-gray-400">Spend &amp; clicks · last 14 days</p>
            </div>
            <TrendingUp className="h-4 w-4 text-[#00008B]" />
          </div>
          <div className="h-60">
            <ResponsiveContainer>
              <AreaChart data={performanceSeries}>
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#00008B" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#00008B" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#42b72a" stopOpacity={0.25} />
                    <stop offset="100%" stopColor="#42b72a" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={11} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #dddfe2", boxShadow: "0 8px 24px rgba(0,0,0,0.08)", fontSize: 12 }} />
                <Area type="monotone" dataKey="spend"  stroke="#00008B" fill="url(#g1)" strokeWidth={2.5} dot={false} />
                <Area type="monotone" dataKey="clicks" stroke="#42b72a" fill="url(#g2)" strokeWidth={2}   dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="lg:col-span-2 bg-white rounded-2xl p-5 border border-[#dddfe2]"
        >
          <p className="text-sm font-semibold text-gray-900">By objective</p>
          <p className="text-xs text-gray-400 mb-2">Share of spend</p>
          <div className="h-60">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={objectiveBreakdown} dataKey="value" innerRadius={48} outerRadius={82} paddingAngle={3}>
                  {objectiveBreakdown.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #dddfe2", fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top campaigns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          className="lg:col-span-3 bg-white rounded-2xl p-5 border border-[#dddfe2]"
        >
          <div className="flex items-center gap-2 mb-3">
            <Zap className="h-4 w-4 text-[#f7b928]" />
            <p className="text-sm font-semibold text-gray-900">Top campaigns</p>
          </div>
          <div className="space-y-2">
            {top.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45 + i * 0.06 }}
                whileHover={{ x: 3 }}
                className="flex items-center justify-between p-3 rounded-xl bg-[#f7f8fa] hover:bg-[#f0f2f5] transition-colors cursor-default"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{c.name}</p>
                  <p className="text-xs text-gray-400">{c.objective}</p>
                </div>
                <div className="text-right shrink-0 ml-3">
                  <p className="text-sm font-bold text-[#00008B]">{formatMoney(c.spend)}</p>
                  <p className="text-xs text-gray-400">{c.results} results</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Daily reach bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}
          className="lg:col-span-3 bg-white rounded-2xl p-5 border border-[#dddfe2]"
        >
          <p className="text-sm font-semibold text-gray-900 mb-3">Daily reach</p>
          <div className="h-52">
            <ResponsiveContainer>
              <BarChart data={performanceSeries} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" />
                <XAxis dataKey="day" stroke="#9ca3af" fontSize={11} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #dddfe2", fontSize: 12 }} />
                <Bar dataKey="reach" fill="#00008B" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Active campaigns table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl border border-[#dddfe2] overflow-hidden"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#f0f2f5]">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-[#42b72a]" />
            <p className="text-sm font-semibold text-gray-900">Active campaigns</p>
            <span className="text-xs bg-[#e7f3ff] text-[#00008B] font-semibold px-2 py-0.5 rounded-full">{summary.activeCampaigns} live</span>
          </div>
          <Link to="/app/campaigns" className="text-xs text-[#00008B] font-semibold hover:underline">View all →</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#f0f2f5]">
                {["Campaign", "Status", "Amount spent", "CTR", "Cost/result"].map((h, i) => (
                  <th key={h} className={`py-2.5 px-5 text-xs font-semibold uppercase tracking-wider text-gray-400 ${i > 1 ? "text-right" : "text-left"}`}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {active.map((c, i) => (
                <motion.tr
                  key={c.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.55 + i * 0.04 }}
                  className="border-b border-[#f7f8fa] hover:bg-[#f7f8fa] transition-colors"
                >
                  <td className="py-3 px-5 font-medium text-gray-900">{c.name}</td>
                  <td className="py-3 px-5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-[#42b72a] bg-green-50 px-2.5 py-0.5 rounded-full">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#42b72a]" /> Active
                    </span>
                  </td>
                  <td className="py-3 px-5 text-right text-gray-700">{formatMoney(c.spend)}</td>
                  <td className="py-3 px-5 text-right text-gray-700">{c.ctr}%</td>
                  <td className="py-3 px-5 text-right font-semibold text-[#00008B]">{formatMoney(c.costPerResult)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Alerts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55 }}
        className="bg-white rounded-2xl p-5 border border-[#dddfe2]"
      >
        <div className="flex items-center gap-2 mb-3">
          <AlertCircle className="h-4 w-4 text-[#fa3e3e]" />
          <p className="text-sm font-semibold text-gray-900">Account alerts</p>
        </div>
        <div className="space-y-2">
          {[
            { bg: "bg-red-50", border: "border-red-100", icon: "text-[#fa3e3e]", title: "Payment method expiring", body: "Update your card ending 4242 before Aug 30 to avoid campaign interruption." },
            { bg: "bg-yellow-50", border: "border-yellow-100", icon: "text-yellow-500", title: "Budget 80% spent", body: "Holiday Rewards Drive has reached 80% of its daily budget." },
          ].map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.06 }}
              className={`flex items-start gap-3 p-3 rounded-xl ${a.bg} border ${a.border}`}
            >
              <AlertCircle className={`h-4 w-4 ${a.icon} mt-0.5 shrink-0`} />
              <div>
                <p className="text-sm font-semibold text-gray-800">{a.title}</p>
                <p className="text-xs text-gray-500 mt-0.5">{a.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
