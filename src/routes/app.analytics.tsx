import { createFileRoute } from "@tanstack/react-router";
import {
  LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
  BarChart, Bar,
} from "recharts";
import { ClayCard, PageHeader } from "@/components/ui-bits";
import { performanceSeries, objectiveBreakdown, summary, formatMoney, formatNumber } from "@/lib/mockData";

export const Route = createFileRoute("/app/analytics")({
  component: Analytics,
  head: () => ({ meta: [{ title: "Analytics — mybookEarn" }] }),
});

function Analytics() {
  const stats = [
    { label: "Reach", value: formatNumber(summary.reach) },
    { label: "Impressions", value: formatNumber(summary.impressions) },
    { label: "Spend", value: formatMoney(summary.spend) },
    { label: "Results", value: formatNumber(summary.results) },
  ];
  return (
    <>
      <PageHeader title="Analytics" subtitle="Deep dive into performance." />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <ClayCard key={s.label} delay={i * 0.05}>
            <p className="text-xs uppercase tracking-widest text-muted-foreground">{s.label}</p>
            <p className="text-2xl font-bold text-primary mt-1">{s.value}</p>
          </ClayCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-4">
        <ClayCard>
          <p className="text-sm font-semibold">Results trend</p>
          <div className="h-72 mt-2">
            <ResponsiveContainer>
              <LineChart data={performanceSeries}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="day" stroke="#8b8ea8" fontSize={11} />
                <YAxis stroke="#8b8ea8" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none" }} />
                <Line type="monotone" dataKey="results" stroke="#2E3192" strokeWidth={2.5} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="clicks" stroke="#7A7DD1" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </ClayCard>
        <ClayCard>
          <p className="text-sm font-semibold">Objective mix</p>
          <div className="h-72 mt-2">
            <ResponsiveContainer>
              <BarChart data={objectiveBreakdown}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.06)" />
                <XAxis dataKey="name" stroke="#8b8ea8" fontSize={11} />
                <YAxis stroke="#8b8ea8" fontSize={11} />
                <Tooltip contentStyle={{ borderRadius: 12, border: "none" }} />
                <Bar dataKey="value" fill="#2E3192" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </ClayCard>
      </div>
    </>
  );
}
