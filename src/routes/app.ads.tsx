import { createFileRoute } from "@tanstack/react-router";
import { Plus, Image as ImageIcon, Video, Layers, Camera } from "lucide-react";
import { ClayCard, PageHeader, PrimaryButton, StatusPill } from "@/components/ui-bits";
import { ads, formatMoney } from "@/lib/mockData";

const icons = {
  Image: ImageIcon, Video, Carousel: Layers, Story: Camera,
} as const;

export const Route = createFileRoute("/app/ads")({
  component: Ads,
  head: () => ({ meta: [{ title: "Ads — mybookEarn" }] }),
});

function Ads() {
  return (
    <>
      <PageHeader
        title="Ads"
        subtitle="Every creative in flight."
        action={<PrimaryButton><Plus className="inline h-4 w-4 mr-1.5" /> New ad</PrimaryButton>}
      />
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {ads.map((a, i) => {
          const Icon = icons[a.format];
          return (
            <ClayCard key={a.id} delay={i * 0.02}>
              <div
                className="aspect-video rounded-xl mb-3 grid place-items-center"
                style={{ background: "var(--gradient-primary)" }}
              >
                <Icon className="h-8 w-8 text-white/90" />
              </div>
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm truncate">{a.name}</p>
                <StatusPill status={a.status} />
              </div>
              <p className="text-xs text-muted-foreground truncate mt-0.5">{a.adSet}</p>
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-muted-foreground">CTR <b className="text-primary">{a.ctr}%</b></span>
                <span className="text-muted-foreground">Spend <b className="text-primary">{formatMoney(a.spend)}</b></span>
              </div>
            </ClayCard>
          );
        })}
      </div>
    </>
  );
}
