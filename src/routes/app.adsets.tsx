import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Plus, Search, Filter, ChevronDown, X, Copy, Trash2, Pencil, Check } from "lucide-react";
import { ClayCard, PageHeader, StatusPill, Input } from "@/components/ui-bits";
import { adSets as initialAdSets, campaigns, formatMoney, formatNumber, type AdSet } from "@/lib/mockData";

export const Route = createFileRoute("/app/adsets")({
  component: AdSets,
  head: () => ({ meta: [{ title: "Ad Sets — mybookEarn" }] }),
});

function DeliveryToggle({ active, onChange }: { active: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onChange(!active); }}
      className={`fb-toggle ${active ? "on" : "off"}`}
    />
  );
}

const PLACEMENTS = ["Feed", "Reels", "Stories", "Search", "Marketplace"];
const AUDIENCES = ["Book lovers 25-44", "Readers US", "App visitors 30d", "LAL 1% purchasers"];

function NewAdSetModal({ onClose, onSave }: { onClose: () => void; onSave: (a: AdSet) => void }) {
  const [form, setForm] = useState({ name: "", campaign: campaigns[0].name, audience: AUDIENCES[0], placement: PLACEMENTS[0], budget: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim() || !form.budget) return;
    onSave({ id: `as_${Date.now()}`, name: form.name.trim(), campaign: form.campaign, status: "Draft", audience: form.audience, placement: form.placement, budget: Number(form.budget), spend: 0, reach: 0, impressions: 0, clicks: 0, ctr: 0, costPerResult: 0 });
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#dddfe2]">
          <h2 className="text-base font-semibold text-gray-900">Create new ad set</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition"><X className="h-5 w-5" /></button>
        </div>
        <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Ad set name *</label>
            <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Broad — Feed" required />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Campaign</label>
            <select value={form.campaign} onChange={(e) => setForm((f) => ({ ...f, campaign: e.target.value }))} className="w-full border border-[#dddfe2] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00008B]/40">
              {campaigns.map((c) => <option key={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Audience</label>
              <select value={form.audience} onChange={(e) => setForm((f) => ({ ...f, audience: e.target.value }))} className="w-full border border-[#dddfe2] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00008B]/40">
                {AUDIENCES.map((a) => <option key={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Placement</label>
              <select value={form.placement} onChange={(e) => setForm((f) => ({ ...f, placement: e.target.value }))} className="w-full border border-[#dddfe2] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00008B]/40">
                {PLACEMENTS.map((p) => <option key={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1">Daily budget ($) *</label>
            <Input type="number" min="1" value={form.budget} onChange={(e) => setForm((f) => ({ ...f, budget: e.target.value }))} placeholder="e.g. 2000" required />
          </div>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="border border-[#dddfe2] bg-white text-gray-700 text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#f0f2f5] transition">Cancel</button>
            <button type="submit" className="bg-[#00008B] hover:bg-[#00006B] text-white text-sm font-semibold px-4 py-2 rounded-md transition">Create ad set</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DetailDrawer({ adSet, onClose }: { adSet: AdSet; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="w-full max-w-sm bg-white h-full shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#dddfe2]">
          <h3 className="font-semibold text-gray-900 text-sm truncate">{adSet.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Budget", value: formatMoney(adSet.budget) },
              { label: "Spent", value: formatMoney(adSet.spend) },
              { label: "Reach", value: formatNumber(adSet.reach) },
              { label: "Impressions", value: formatNumber(adSet.impressions) },
              { label: "Clicks", value: formatNumber(adSet.clicks) },
              { label: "CTR", value: adSet.ctr ? adSet.ctr.toFixed(2) + "%" : "—" },
              { label: "Cost / Result", value: adSet.costPerResult ? formatMoney(adSet.costPerResult) : "—" },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#f0f2f5] rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-gray-900">{value}</p>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2 border-b border-[#f0f2f5]">
              <span className="text-gray-500">Campaign</span>
              <span className="font-medium text-gray-800 text-right max-w-[180px] truncate">{adSet.campaign}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#f0f2f5]">
              <span className="text-gray-500">Audience</span>
              <span className="font-medium text-gray-800">{adSet.audience}</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#f0f2f5]">
              <span className="text-gray-500">Placement</span>
              <span className="font-medium text-gray-800">{adSet.placement}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Status</span>
              <StatusPill status={adSet.status} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InlineEdit({ value, onSave }: { value: string; onSave: (v: string) => void }) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  function start(e: React.MouseEvent) {
    e.stopPropagation();
    setEditing(true);
    setTimeout(() => inputRef.current?.focus(), 0);
  }

  function save(e: React.MouseEvent | React.KeyboardEvent) {
    e.stopPropagation();
    if (val.trim()) onSave(val.trim());
    setEditing(false);
  }

  if (editing) {
    return (
      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          value={val}
          onChange={(e) => setVal(e.target.value)}
          onKeyDown={(e) => { if (e.key === "Enter") save(e); if (e.key === "Escape") setEditing(false); }}
          className="border border-[#00008B] rounded px-2 py-0.5 text-sm text-gray-900 focus:outline-none w-44"
        />
        <button onClick={save} className="text-[#00008B] hover:text-[#00006B]"><Check className="h-4 w-4" /></button>
        <button onClick={(e) => { e.stopPropagation(); setEditing(false); }} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 group">
      <span className="font-medium text-gray-900">{value}</span>
      <button onClick={start} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-[#00008B] transition">
        <Pencil className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function AdSets() {
  const [adSetList, setAdSetList] = useState<AdSet[]>(initialAdSets);
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [drawer, setDrawer] = useState<AdSet | null>(null);
  const [delivery, setDelivery] = useState<Record<string, boolean>>(
    Object.fromEntries(initialAdSets.map((a) => [a.id, a.status === "Active"]))
  );

  const list = adSetList.filter((a) => a.name.toLowerCase().includes(q.toLowerCase()));
  const allSelected = list.length > 0 && list.every((a) => selected.has(a.id));

  function handleNewAdSet(a: AdSet) {
    setAdSetList((prev) => [a, ...prev]);
    setDelivery((d) => ({ ...d, [a.id]: false }));
  }

  function toggleAll() {
    if (allSelected) setSelected((s) => { const n = new Set(s); list.forEach((a) => n.delete(a.id)); return n; });
    else setSelected((s) => { const n = new Set(s); list.forEach((a) => n.add(a.id)); return n; });
  }

  function toggleOne(id: string) {
    setSelected((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  function duplicateOne(e: React.MouseEvent, a: AdSet) {
    e.stopPropagation();
    const copy: AdSet = { ...a, id: `as_${Date.now()}`, name: `${a.name} (copy)`, status: "Draft", spend: 0, reach: 0, impressions: 0, clicks: 0, ctr: 0, costPerResult: 0 };
    setAdSetList((prev) => { const idx = prev.findIndex((x) => x.id === a.id); const next = [...prev]; next.splice(idx + 1, 0, copy); return next; });
    setDelivery((d) => ({ ...d, [copy.id]: false }));
  }

  function deleteOne(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    setAdSetList((prev) => prev.filter((a) => a.id !== id));
    setSelected((s) => { const n = new Set(s); n.delete(id); return n; });
  }

  function bulkDuplicate() {
    const copies: AdSet[] = [];
    const newDelivery: Record<string, boolean> = {};
    adSetList.forEach((a) => {
      if (selected.has(a.id)) {
        const copy: AdSet = { ...a, id: `as_${Date.now()}_${Math.random()}`, name: `${a.name} (copy)`, status: "Draft", spend: 0, reach: 0, impressions: 0, clicks: 0, ctr: 0, costPerResult: 0 };
        copies.push(copy);
        newDelivery[copy.id] = false;
      }
    });
    setAdSetList((prev) => [...prev, ...copies]);
    setDelivery((d) => ({ ...d, ...newDelivery }));
    setSelected(new Set());
  }

  function bulkDelete() {
    setAdSetList((prev) => prev.filter((a) => !selected.has(a.id)));
    setSelected(new Set());
  }

  return (
    <>
      {showModal && <NewAdSetModal onClose={() => setShowModal(false)} onSave={handleNewAdSet} />}
      {drawer && <DetailDrawer adSet={drawer} onClose={() => setDrawer(null)} />}

      <PageHeader
        title="Ad Sets"
        subtitle="Targeting, placement, and budget groups."
        action={
          <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 bg-[#00008B] hover:bg-[#00006B] text-white text-sm font-semibold px-4 py-2 rounded-md transition">
            <Plus className="h-4 w-4" /> New ad set
          </button>
        }
      />

      <ClayCard>
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ad sets" className="pl-9" />
          </div>
          <button className="flex items-center gap-1.5 border border-[#dddfe2] bg-white hover:bg-[#f0f2f5] text-gray-700 text-sm font-medium px-3 py-2 rounded-md transition">
            <Filter className="h-3.5 w-3.5" /> Filters
          </button>
          <div className="relative">
            <select className="appearance-none bg-white border border-[#dddfe2] rounded-md pl-3 pr-8 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00008B]/40 cursor-pointer">
              <option>Last 14 days</option>
              <option>Last 30 days</option>
              <option>This month</option>
            </select>
            <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {selected.size > 0 && (
          <div className="fb-bulk-bar">
            <span className="text-sm font-semibold text-[#00008B]">{selected.size} selected</span>
            <button onClick={() => { setDelivery((d) => { const n = { ...d }; selected.forEach((id) => { n[id] = true; }); return n; }); setSelected(new Set()); }} className="bg-[#00008B] text-white text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-[#00006B] transition">Activate</button>
            <button onClick={() => { setDelivery((d) => { const n = { ...d }; selected.forEach((id) => { n[id] = false; }); return n; }); setSelected(new Set()); }} className="border border-[#dddfe2] bg-white text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-[#f0f2f5] transition">Pause</button>
            <button onClick={bulkDuplicate} className="flex items-center gap-1 border border-[#dddfe2] bg-white text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-[#f0f2f5] transition"><Copy className="h-3.5 w-3.5" /> Duplicate</button>
            <button onClick={bulkDelete} className="flex items-center gap-1 border border-red-200 bg-white text-red-500 text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-red-50 transition"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[900px]">
            <thead>
              <tr className="border-b border-[#dddfe2]">
                <th className="py-3 pr-3 w-8"><input type="checkbox" checked={allSelected} onChange={toggleAll} className="h-4 w-4 rounded border-gray-300 accent-[#00008B] cursor-pointer" /></th>
                <th className="text-left py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Delivery</th>
                <th className="text-left py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Ad set name</th>
                <th className="text-left py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                <th className="text-left py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Campaign</th>
                <th className="text-left py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Audience</th>
                <th className="text-left py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Placement</th>
                <th className="text-right py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Budget</th>
                <th className="text-right py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Spent</th>
                <th className="text-right py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Reach</th>
                <th className="py-3 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {list.map((a) => {
                const isSelected = selected.has(a.id);
                const isOn = delivery[a.id];
                return (
                  <tr
                    key={a.id}
                    onClick={() => setDrawer(a)}
                    className={`border-b border-[#f0f2f5] cursor-pointer transition ${isSelected ? "bg-[#e7f3ff]" : "hover:bg-[#f7f8fa]"}`}
                  >
                    <td className="py-3 pr-3"><input type="checkbox" checked={isSelected} onChange={() => toggleOne(a.id)} onClick={(e) => e.stopPropagation()} className="h-4 w-4 rounded border-gray-300 accent-[#00008B] cursor-pointer" /></td>
                    <td className="py-3"><DeliveryToggle active={isOn} onChange={(v) => setDelivery((d) => ({ ...d, [a.id]: v }))} /></td>
                    <td className="py-3">
                      <InlineEdit value={a.name} onSave={(v) => setAdSetList((prev) => prev.map((x) => x.id === a.id ? { ...x, name: v } : x))} />
                    </td>
                    <td className="py-3"><StatusPill status={isOn ? "Active" : "Paused"} /></td>
                    <td className="py-3 text-gray-500 text-xs max-w-[140px] truncate">{a.campaign}</td>
                    <td className="py-3"><span className="bg-[#e7f3ff] text-[#00008B] text-xs font-medium px-2 py-0.5 rounded-full">{a.audience}</span></td>
                    <td className="py-3"><span className="bg-[#f0f2f5] text-gray-600 text-xs font-medium px-2 py-0.5 rounded-full">{a.placement}</span></td>
                    <td className="py-3 text-right text-gray-700">{formatMoney(a.budget)}</td>
                    <td className="py-3 text-right font-semibold text-gray-900">{formatMoney(a.spend)}</td>
                    <td className="py-3 text-right text-[#00008B] font-semibold">{formatNumber(a.reach)}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-1 justify-end" onClick={(e) => e.stopPropagation()}>
                        <button onClick={(e) => duplicateOne(e, a)} title="Duplicate" className="p-1.5 rounded hover:bg-[#e7f3ff] text-gray-400 hover:text-[#00008B] transition"><Copy className="h-3.5 w-3.5" /></button>
                        <button onClick={(e) => deleteOne(e, a.id)} title="Delete" className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {list.length === 0 && (
                <tr><td colSpan={11} className="py-12 text-center text-gray-400 text-sm">No ad sets found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </ClayCard>
    </>
  );
}
