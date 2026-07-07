import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  ArrowUpRight, DollarSign, Eye, MousePointerClick, Target, Sparkles,
} from "lucide-react";
import {
  AreaChart, Area, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
  BarChart, Bar, PieChart, Pie, Cell,
} from "recharts";
import { ClayCard, PageHeader, PrimaryButton, StatusPill } from "@/components/ui-bits";
import {
  campaigns, performanceSeries, objectiveBreakdown, summary,
  formatNumber, formatMoney,
} from "@/lib/mockData";

export const Route = createFileRoute("/app/")({
  component: Dashboard,
  head: () => ({ meta: [{ title: "Dashboard — mybookEarn" }] }),
});

const pieColors = ["#2E3192", "#4F52B5", "#7A7DD1", "#A6A8E3", "#C8C9EE", "#E1E2F6"];

function Stat({ icon: Icon, label, value, delta }: any) {
  return (
    <ClayCard>
      <div className="flex items-start justify-between">
        <div className="p-2.5 rounded-xl clay-primary"><Icon className="h-4 w-4" /></div>
        <span className="text-xs font-semibold text-[oklch(0.5_0.14_155)] inline-flex items-center gap-0.5">
          <ArrowUpRight className="h-3 w-3" /> {delta}
        </span>
      </div>
      <p className="mt-4 text-xs uppercase tracking-widest text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-bold text-primary">{value}</p>
    </ClayCard>
  );
}

function Dashboard() {
  const top = [...campaigns].sort((a, b) => b.results - a.results).slice(0, 5);
  return (
    <>
      <PageHeader
        title="Dashboard"
        subtitle="Your last 14 days at a glance."
        action={<PrimaryButton><Sparkles className="inline h-4 w-4 mr-1.5" /> New campaign</PrimaryButton>}
      />

      {/* Bento */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Stat icon={Eye} label="Reach" value={formatNumber(summary.reach)} delta="+12%" />
        <Stat icon={MousePointerClick} label="Impressions" value={formatNumber(summary.impressions)} delta="+8%" />
        <Stat icon={DollarSign} label="Spend" value={formatMoney(summary.spend)} delta="+4%" />
        <Stat icon={Target} label="Results" value={formatNumber(summary.results)} delta="+18%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 mt-4">
        <ClayCard className="lg:col-span-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold">Performance</p>
              <p className="text-xs text-muted-foreground">Spend & clicks, last 14 days</p>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer>
              <AreaChart data={performanceSeries}>
                <defs>
                  <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#2E3192" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#2E3192" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="g2" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#7A7DD1" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#7A7DD1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="day" stroke="#8b8ea8" fontSize={11} />
                <YAxis stroke="#8b8ea8" fontSize={11} />
                <Tooltip
                  contentStyle={{ borderRadius: 12, border: "none", boxShadow: "0 8px 24px rgba(46,49,146,0.15)" }}
                />
                <Area type="monotone" dataKey="spend" stroke="#2E3192" fill="url(#g1)" strokeWidth={2} />
                <Area type="monotone" dataKey="clicks" stroke="#7A7DD1" fill="url(#g2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ClayCard>

        <ClayCard className="lg:col-span-2">
          <p className="text-sm font-semibold">By objective</p>
          <p className="text-xs text-muted-foreground">Share of spend</p>
          <div className="h-64">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={objectiveBreakdown} dataKey="value" innerRadius={45} outerRadius={80} paddingAngle={3}>
                  {objectiveBreakdown.map((_, i) => (
                    <Cell key={i} fill={pieColors[i % pieColors.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, border: "none" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ClayCard>

        <ClayCard className="lg:col-span-3">
          <p className="text-sm font-semibold mb-3">Top campaigns</p>
          <div className="space-y-3">
            {top.map((c, i) => (
              <motion.div
                key={c.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between clay-sm p-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold truncate">{c.name}</p>
                  <p className="text-xs text-muted-foreground">{c.objective}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-primary">{formatMoney(c.spend)}</p>
                  <p className="text-xs text-muted-foreground">{c.results} results</p>
                </div>
              </motion.div>
            ))}
          </div>
        </ClayCard>

        <ClayCard className="lg:col-span-3">
          <p className="text-sm font-semibold">Daily reach</p>
          <div className="h-56 mt-2">
            <ResponsiveContainer>
              <BarChart data={performanceSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="day" stroke="#8b8ea8" fontSize={11} />
                <YAxis stroke="#8b8ea8" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none" }} />
                <Bar dataKey="reach" fill="#2E3192" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ClayCard>
      </div>

      {/* Active campaign snapshot */}
      <ClayCard className="mt-4">
        <div className="flex items-center justify-between mb-3">
          <p className="text-sm font-semibold">Active campaigns</p>
          <span className="text-xs text-muted-foreground">{summary.activeCampaigns} live</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Status</th>
                <th className="text-right py-2">Spend</th>
                <th className="text-right py-2">CTR</th>
                <th className="text-right py-2">Cost/Result</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.filter(c => c.status === "Active").map((c) => (
                <tr key={c.id} className="border-t border-border/60">
                  <td className="py-3 font-medium">{c.name}</td>
                  <td><StatusPill status={c.status} /></td>
                  <td className="text-right">{formatMoney(c.spend)}</td>
                  <td className="text-right">{c.ctr}%</td>
                  <td className="text-right">{formatMoney(c.costPerResult)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ClayCard>
    </>
  );
}
