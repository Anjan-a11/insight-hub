import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Bell, CheckCircle2, AlertTriangle, Info, AlertOctagon } from "lucide-react";
import { ClayCard, PageHeader, GhostButton } from "@/components/ui-bits";
import { notifications as seed } from "@/lib/mockData";

export const Route = createFileRoute("/app/notifications")({
  component: Notifications,
  head: () => ({ meta: [{ title: "Notifications — mybookEarn" }] }),
});

const iconMap = {
  info: Info, success: CheckCircle2, warning: AlertTriangle, danger: AlertOctagon,
};
const toneColor = {
  info: "text-primary", success: "text-[oklch(0.5_0.14_155)]",
  warning: "text-[oklch(0.55_0.15_75)]", danger: "text-destructive",
};

function Notifications() {
  const [items, setItems] = useState(seed);
  return (
    <>
      <PageHeader
        title="Notifications"
        subtitle="Alerts, approvals and reports."
        action={<GhostButton onClick={() => setItems(items.map(i => ({ ...i, read: true })))}>Mark all read</GhostButton>}
      />
      <ClayCard>
        <div className="divide-y divide-border/60">
          {items.map((n) => {
            const Icon = iconMap[n.tone];
            return (
              <div key={n.id} className={`flex gap-4 py-4 first:pt-0 last:pb-0 ${n.read ? "opacity-70" : ""}`}>
                <div className={`p-2.5 rounded-xl clay-sm shrink-0 ${toneColor[n.tone]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold">{n.title}</p>
                    <span className="text-xs text-muted-foreground shrink-0">{n.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{n.body}</p>
                </div>
                {!n.read && <span className="h-2 w-2 rounded-full bg-primary mt-2" />}
              </div>
            );
          })}
          {items.length === 0 && (
            <div className="py-12 text-center text-muted-foreground text-sm">
              <Bell className="h-8 w-8 mx-auto opacity-40" />
              <p className="mt-2">You're all caught up.</p>
            </div>
          )}
        </div>
      </ClayCard>
    </>
  );
}
