import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ClayCard, PageHeader, Field, Input, PrimaryButton, GhostButton } from "@/components/ui-bits";

export const Route = createFileRoute("/app/settings")({
  component: Settings,
  head: () => ({ meta: [{ title: "Settings — mybookEarn" }] }),
});

function Toggle({ label, description, defaultOn = false }: { label: string; description: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <p className="font-semibold text-sm">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`relative h-6 w-11 rounded-full transition ${on ? "clay-primary" : "clay-inset"}`}
      >
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
      </button>
    </div>
  );
}

function Settings() {
  return (
    <>
      <PageHeader title="Settings" subtitle="Preferences, billing and security." />

      <div className="grid lg:grid-cols-2 gap-4">
        <ClayCard>
          <p className="font-semibold mb-2">Notifications</p>
          <div className="divide-y divide-border/60">
            <Toggle label="Email digest" description="Weekly performance summary." defaultOn />
            <Toggle label="Campaign alerts" description="When a campaign changes status." defaultOn />
            <Toggle label="Budget warnings" description="Notify at 80% of daily budget." defaultOn />
            <Toggle label="Product updates" description="Occasional feature news." />
          </div>
        </ClayCard>

        <ClayCard>
          <p className="font-semibold mb-2">Security</p>
          <Field label="Current password"><Input type="password" placeholder="••••••••" /></Field>
          <div className="mt-3"><Field label="New password"><Input type="password" placeholder="At least 8 characters" /></Field></div>
          <div className="mt-4 flex justify-end"><PrimaryButton>Update password</PrimaryButton></div>
          <div className="mt-6 border-t border-border/60 pt-4">
            <Toggle label="Two-factor authentication" description="Require a code at sign-in." />
          </div>
        </ClayCard>

        <ClayCard>
          <p className="font-semibold mb-2">Billing</p>
          <div className="clay-inset p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-muted-foreground">Current plan</p>
              <p className="font-bold text-lg text-primary">Growth · $49/mo</p>
            </div>
            <GhostButton>Manage</GhostButton>
          </div>
          <div className="mt-4 text-sm">
            <div className="flex justify-between py-2 border-b border-border/60"><span>Payment method</span><span className="text-muted-foreground">Visa •• 4242</span></div>
            <div className="flex justify-between py-2 border-b border-border/60"><span>Next invoice</span><span className="text-muted-foreground">Aug 12, 2026</span></div>
            <div className="flex justify-between py-2"><span>Billing email</span><span className="text-muted-foreground">billing@mybookearn.com</span></div>
          </div>
        </ClayCard>

        <ClayCard>
          <p className="font-semibold mb-2">Appearance</p>
          <p className="text-sm text-muted-foreground">Choose how mybookEarn looks in your browser.</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {["Light", "Dark", "System"].map((t, i) => (
              <button key={t} className={`clay-sm p-4 text-sm font-semibold text-primary ${i === 0 ? "ring-2 ring-primary/40" : ""}`}>{t}</button>
            ))}
          </div>
          <div className="mt-6 border-t border-border/60 pt-4 text-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-destructive">Delete workspace</p>
                <p className="text-xs text-muted-foreground">This action is permanent.</p>
              </div>
              <button className="clay-sm px-4 py-2 text-xs font-semibold text-destructive">Delete</button>
            </div>
          </div>
        </ClayCard>
      </div>
    </>
  );
}
