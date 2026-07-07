import { createFileRoute } from "@tanstack/react-router";
import { ClayCard, PageHeader, Field, Input, PrimaryButton } from "@/components/ui-bits";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

export const Route = createFileRoute("/app/profile")({
  component: Profile,
  head: () => ({ meta: [{ title: "Profile — mybookEarn" }] }),
});

function Profile() {
  const { session } = useAuth();
  const [name, setName] = useState(session?.name || "");
  const [email] = useState(session?.email || "");
  const [company, setCompany] = useState("mybookEarn Inc.");
  const [saved, setSaved] = useState(false);

  return (
    <>
      <PageHeader title="Profile" subtitle="Your workspace identity." />
      <div className="grid lg:grid-cols-3 gap-4">
        <ClayCard>
          <div className="flex flex-col items-center text-center">
            <div className="h-24 w-24 rounded-full clay-primary grid place-items-center text-4xl font-black">
              {(name || "U").charAt(0).toUpperCase()}
            </div>
            <p className="mt-4 font-semibold text-lg">{name || "Marketer"}</p>
            <p className="text-sm text-muted-foreground">{email}</p>
            <div className="mt-4 grid grid-cols-3 gap-2 w-full">
              <div className="clay-sm p-2">
                <p className="text-[10px] uppercase text-muted-foreground">Campaigns</p>
                <p className="font-bold text-primary">8</p>
              </div>
              <div className="clay-sm p-2">
                <p className="text-[10px] uppercase text-muted-foreground">Ads</p>
                <p className="font-bold text-primary">42</p>
              </div>
              <div className="clay-sm p-2">
                <p className="text-[10px] uppercase text-muted-foreground">Since</p>
                <p className="font-bold text-primary">'26</p>
              </div>
            </div>
          </div>
        </ClayCard>

        <ClayCard className="lg:col-span-2">
          <p className="font-semibold">Personal information</p>
          <form
            className="mt-4 grid md:grid-cols-2 gap-4"
            onSubmit={(e) => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2000); }}
          >
            <Field label="Full name"><Input value={name} onChange={(e) => setName(e.target.value)} /></Field>
            <Field label="Email"><Input value={email} disabled /></Field>
            <Field label="Company"><Input value={company} onChange={(e) => setCompany(e.target.value)} /></Field>
            <Field label="Time zone"><Input defaultValue="UTC−05:00 (Eastern)" /></Field>
            <div className="md:col-span-2 flex items-center justify-end gap-3">
              {saved && <span className="text-xs text-[oklch(0.5_0.14_155)] font-semibold">Saved ✓</span>}
              <PrimaryButton type="submit">Save changes</PrimaryButton>
            </div>
          </form>
        </ClayCard>
      </div>
    </>
  );
}
