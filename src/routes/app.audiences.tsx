import { createFileRoute } from "@tanstack/react-router";
import { Plus, Users } from "lucide-react";
import { ClayCard, PageHeader, PrimaryButton } from "@/components/ui-bits";
import { audiences, formatNumber } from "@/lib/mockData";

export const Route = createFileRoute("/app/audiences")({
  component: Audiences,
  head: () => ({ meta: [{ title: "Audiences — mybookEarn" }] }),
});

function Audiences() {
  return (
    <>
      <PageHeader
        title="Audiences"
        subtitle="Custom, saved and lookalike audiences."
        action={<PrimaryButton><Plus className="inline h-4 w-4 mr-1.5" /> New audience</PrimaryButton>}
      />
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
        {audiences.map((a, i) => (
          <ClayCard key={a.id} delay={i * 0.05}>
            <div className="flex items-center justify-between">
              <div className="p-2.5 rounded-xl clay-primary"><Users className="h-4 w-4" /></div>
              <span className="text-xs font-semibold clay-sm px-2.5 py-1 text-primary">{a.type}</span>
            </div>
            <p className="mt-4 font-semibold">{a.name}</p>
            <p className="text-xs text-muted-foreground">Updated {a.updated}</p>
            <div className="mt-4 flex items-end justify-between">
              <div>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Est. size</p>
                <p className="text-2xl font-bold text-primary">{formatNumber(a.size)}</p>
              </div>
              <button className="clay-sm px-3 py-1.5 text-xs font-semibold text-primary">Use</button>
            </div>
          </ClayCard>
        ))}
      </div>
    </>
  );
}
