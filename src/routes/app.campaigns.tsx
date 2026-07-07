import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus, Search, Filter } from "lucide-react";
import { ClayCard, PageHeader, PrimaryButton, StatusPill, Input, GhostButton } from "@/components/ui-bits";
import { campaigns, formatMoney, formatNumber } from "@/lib/mockData";

export const Route = createFileRoute("/app/campaigns")({
  component: Campaigns,
  head: () => ({ meta: [{ title: "Campaigns — mybookEarn" }] }),
});

function Campaigns() {
  const [q, setQ] = useState("");
  const [status, setStatus] = useState<string>("All");
  const list = campaigns.filter(
    (c) =>
      (status === "All" || c.status === status) &&
      c.name.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <PageHeader
        title="Campaigns"
        subtitle="All campaigns across your workspace."
        action={<PrimaryButton><Plus className="inline h-4 w-4 mr-1.5" /> Create campaign</PrimaryButton>}
      />

      <ClayCard>
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search campaigns" className="pl-9" />
          </div>
          <div className="flex gap-1.5">
            {["All", "Active", "Paused", "Draft", "Completed"].map((s) => (
              <button
                key={s}
                onClick={() => setStatus(s)}
                className={`px-3 py-2 text-xs font-semibold rounded-lg transition ${
                  status === s ? "clay-primary" : "clay-sm text-primary"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
          <GhostButton><Filter className="inline h-3.5 w-3.5 mr-1" /> Filters</GhostButton>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead className="text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="text-left py-2">Campaign</th>
                <th className="text-left py-2">Status</th>
                <th className="text-left py-2">Objective</th>
                <th className="text-right py-2">Budget</th>
                <th className="text-right py-2">Spend</th>
                <th className="text-right py-2">Reach</th>
                <th className="text-right py-2">CTR</th>
                <th className="text-right py-2">Results</th>
              </tr>
            </thead>
            <tbody>
              {list.map((c) => (
                <tr key={c.id} className="border-t border-border/60 hover:bg-accent/40 transition">
                  <td className="py-3 font-medium">{c.name}<div className="text-xs text-muted-foreground">Started {c.startDate}</div></td>
                  <td><StatusPill status={c.status} /></td>
                  <td>{c.objective}</td>
                  <td className="text-right">{formatMoney(c.budget)}</td>
                  <td className="text-right">{formatMoney(c.spend)}</td>
                  <td className="text-right">{formatNumber(c.reach)}</td>
                  <td className="text-right">{c.ctr}%</td>
                  <td className="text-right font-semibold text-primary">{c.results}</td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr><td colSpan={8} className="py-10 text-center text-muted-foreground text-sm">No campaigns match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </ClayCard>
    </>
  );
}
