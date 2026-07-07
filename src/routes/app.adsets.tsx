import { createFileRoute } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { ClayCard, PageHeader, PrimaryButton, StatusPill } from "@/components/ui-bits";
import { adSets, formatMoney, formatNumber } from "@/lib/mockData";

export const Route = createFileRoute("/app/adsets")({
  component: AdSets,
  head: () => ({ meta: [{ title: "Ad Sets — mybookEarn" }] }),
});

function AdSets() {
  return (
    <>
      <PageHeader
        title="Ad Sets"
        subtitle="Targeting, placement, and budget groups."
        action={<PrimaryButton><Plus className="inline h-4 w-4 mr-1.5" /> New ad set</PrimaryButton>}
      />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {adSets.map((a, i) => (
          <ClayCard key={a.id} delay={i * 0.03}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">{a.campaign}</p>
                <p className="font-semibold mt-0.5">{a.name}</p>
              </div>
              <StatusPill status={a.status} />
            </div>
            <div className="grid grid-cols-3 gap-3 mt-4 text-sm">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Budget</p>
                <p className="font-semibold text-primary">{formatMoney(a.budget)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Spend</p>
                <p className="font-semibold">{formatMoney(a.spend)}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Reach</p>
                <p className="font-semibold">{formatNumber(a.reach)}</p>
              </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs">
              <span className="clay-sm px-2.5 py-1 text-primary">{a.audience}</span>
              <span className="clay-sm px-2.5 py-1 text-primary">{a.placement}</span>
            </div>
          </ClayCard>
        ))}
      </div>
    </>
  );
}
