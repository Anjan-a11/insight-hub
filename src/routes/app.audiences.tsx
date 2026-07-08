import { createFileRoute } from "@tanstack/react-router";
import { Plus, Users, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { ClayCard, Field, GhostButton, Input, PageHeader, PrimaryButton } from "@/components/ui-bits";
import { audiences as initialAudiences, formatNumber, type Audience } from "@/lib/mockData";

export const Route = createFileRoute("/app/audiences")({
  component: Audiences,
  head: () => ({ meta: [{ title: "Audiences — mybookEarn" }] }),
});

function Audiences() {
  const [audiences, setAudiences] = useState<Audience[]>(initialAudiences);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", type: "Custom" as Audience["type"], size: "120000" });
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = form.name.trim();

    if (!name) {
      setMessage("Please give the audience a name before creating it.");
      return;
    }

    const createdAudience: Audience = {
      id: `a-${Date.now()}`,
      name,
      size: Number(form.size) || 0,
      type: form.type,
      updated: "Just now",
    };

    setAudiences((prev) => [createdAudience, ...prev]);
    setForm({ name: "", type: "Custom", size: "120000" });
    setMessage(`Audience “${name}” created successfully.`);
    setIsOpen(false);
  }

  return (
    <>
      <PageHeader
        title="Audiences"
        subtitle="Custom, saved and lookalike audiences."
        action={
          <PrimaryButton onClick={() => setIsOpen(true)}>
            <Plus className="inline h-4 w-4 mr-1.5" /> New audience
          </PrimaryButton>
        }
      />

      {message ? (
        <div className="mb-4 rounded-xl border border-[#d7f3df] bg-[#f4fff7] px-4 py-3 text-sm text-[#2e7d32]">
          {message}
        </div>
      ) : null}

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

      {isOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/45 px-4 py-6">
          <div className="w-full max-w-2xl rounded-3xl border border-[#dddfe2] bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#00008B]">New audience</p>
                <h2 className="mt-1 text-2xl font-semibold text-[#1c1e21]">Create a custom audience</h2>
                <p className="mt-2 text-sm text-[#65676b]">Define the audience name, type, and estimated size for your next campaign.</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-gray-500 transition hover:bg-[#f0f2f5]"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Field label="Audience name">
                <Input
                  value={form.name}
                  onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))}
                  placeholder="Example: High intent readers"
                />
              </Field>

              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Audience type">
                  <select
                    value={form.type}
                    onChange={(event) => setForm((prev) => ({ ...prev, type: event.target.value as Audience["type"] }))}
                    className="w-full rounded-xl border border-[#dddfe2] bg-[#f0f2f5] px-4 py-2.5 text-sm text-gray-800 focus:border-[#00008B] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00008B]/20"
                  >
                    <option value="Custom">Custom</option>
                    <option value="Saved">Saved</option>
                    <option value="Lookalike">Lookalike</option>
                  </select>
                </Field>

                <Field label="Estimated size">
                  <Input
                    type="number"
                    min="0"
                    value={form.size}
                    onChange={(event) => setForm((prev) => ({ ...prev, size: event.target.value }))}
                    placeholder="120000"
                  />
                </Field>
              </div>

              <div className="rounded-2xl border border-[#e8e8f5] bg-[#f8f9ff] p-4 text-sm text-[#4b5563]">
                This creates a new audience entry in your workspace so you can use it in campaigns and ad sets right away.
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <GhostButton onClick={() => setIsOpen(false)}>Cancel</GhostButton>
                <PrimaryButton type="submit">Create audience</PrimaryButton>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}
