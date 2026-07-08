import { createFileRoute } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { Plus, Search, Filter, ChevronDown, Image as ImageIcon, Video, Layers, Camera, X, Trash2, Pencil, Check, Eye } from "lucide-react";
import { ClayCard, PageHeader, StatusPill, Input } from "@/components/ui-bits";
import { ads as initialAds, adSets, formatMoney, type Ad } from "@/lib/mockData";

export const Route = createFileRoute("/app/ads")({
  component: Ads,
  head: () => ({ meta: [{ title: "Ads — mybookEarn" }] }),
});

const FORMAT_ICONS = { Image: ImageIcon, Video, Carousel: Layers, Story: Camera } as const;
const FORMAT_COLORS: Record<string, string> = { Image: "#00008B", Video: "#42b72a", Carousel: "#7A7DD1", Story: "#fa3e3e" };
const FORMATS = ["Image", "Video", "Carousel", "Story"] as const;
const HEADLINES = ["Discover your next favourite book", "Earn rewards while you read", "Join 2M+ readers today", "Unlock exclusive author content"];
const CTAS = ["Learn More", "Sign Up", "Shop Now", "Download"];

function DeliveryToggle({ active, onChange }: { active: boolean; onChange: (v: boolean) => void }) {
  return (
    <button onClick={(e) => { e.stopPropagation(); onChange(!active); }} className={`fb-toggle ${active ? "on" : "off"}`} />
  );
}

function NewAdModal({ onClose, onSave }: { onClose: () => void; onSave: (a: Ad) => void }) {
  const [form, setForm] = useState({ name: "", adSet: adSets[0].name, format: "Image" as typeof FORMATS[number], headline: HEADLINES[0], cta: CTAS[0] });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave({ id: `ad_${Date.now()}`, name: form.name.trim(), adSet: form.adSet, status: "Draft", format: form.format, ctr: 0, spend: 0, results: 0 });
    onClose();
  }

  const color = FORMAT_COLORS[form.format];
  const Icon = FORMAT_ICONS[form.format];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4 flex" onClick={(e) => e.stopPropagation()}>
        {/* Form */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#dddfe2]">
            <h2 className="text-base font-semibold text-gray-900">Create new ad</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
          </div>
          <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Ad name *</label>
              <Input value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="e.g. Summer Hero Image" required />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Ad set</label>
              <select value={form.adSet} onChange={(e) => setForm((f) => ({ ...f, adSet: e.target.value }))} className="w-full border border-[#dddfe2] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00008B]/40">
                {adSets.map((a) => <option key={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-2">Format</label>
              <div className="grid grid-cols-4 gap-2">
                {FORMATS.map((fmt) => {
                  const FmtIcon = FORMAT_ICONS[fmt];
                  const c = FORMAT_COLORS[fmt];
                  return (
                    <button key={fmt} type="button" onClick={() => setForm((f) => ({ ...f, format: fmt }))}
                      className={`flex flex-col items-center gap-1 py-2 rounded-lg border-2 text-xs font-medium transition ${form.format === fmt ? "border-[#00008B] bg-[#e7f3ff] text-[#00008B]" : "border-[#dddfe2] text-gray-500 hover:border-gray-300"}`}>
                      <FmtIcon className="h-4 w-4" style={{ color: form.format === fmt ? c : undefined }} />
                      {fmt}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Headline</label>
              <select value={form.headline} onChange={(e) => setForm((f) => ({ ...f, headline: e.target.value }))} className="w-full border border-[#dddfe2] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00008B]/40">
                {HEADLINES.map((h) => <option key={h}>{h}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1">Call to action</label>
              <select value={form.cta} onChange={(e) => setForm((f) => ({ ...f, cta: e.target.value }))} className="w-full border border-[#dddfe2] rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#00008B]/40">
                {CTAS.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={onClose} className="border border-[#dddfe2] bg-white text-gray-700 text-sm font-semibold px-4 py-2 rounded-md hover:bg-[#f0f2f5] transition">Cancel</button>
              <button type="submit" className="bg-[#00008B] hover:bg-[#00006B] text-white text-sm font-semibold px-4 py-2 rounded-md transition">Create ad</button>
            </div>
          </form>
        </div>
        {/* Live preview */}
        <div className="w-48 shrink-0 bg-[#f0f2f5] rounded-r-xl p-4 flex flex-col gap-3 border-l border-[#dddfe2]">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Preview</p>
          <div className="bg-white rounded-xl overflow-hidden shadow-sm">
            <div className="h-24 grid place-items-center" style={{ background: `${color}18` }}>
              <Icon className="h-10 w-10" style={{ color }} />
            </div>
            <div className="p-2">
              <p className="text-xs font-semibold text-gray-900 leading-tight line-clamp-2">{form.headline}</p>
              <button className="mt-2 w-full text-xs font-semibold py-1 rounded" style={{ background: color, color: "#fff" }}>{form.cta}</button>
            </div>
          </div>
          <p className="text-[10px] text-gray-400 text-center">Sponsored · mybookEarn</p>
        </div>
      </div>
    </div>
  );
}

function PreviewPanel({ ad, onClose }: { ad: Ad; onClose: () => void }) {
  const color = FORMAT_COLORS[ad.format];
  const Icon = FORMAT_ICONS[ad.format];
  return (
    <div className="fixed inset-0 z-50 flex justify-end" onClick={onClose}>
      <div className="w-full max-w-xs bg-white h-full shadow-2xl flex flex-col" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-5 py-4 border-b border-[#dddfe2]">
          <h3 className="font-semibold text-gray-900 text-sm truncate">{ad.name}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X className="h-5 w-5" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Creative mock */}
          <div className="bg-white rounded-xl overflow-hidden border border-[#dddfe2] shadow-sm">
            <div className="h-40 grid place-items-center" style={{ background: `${color}18` }}>
              <Icon className="h-16 w-16" style={{ color }} />
            </div>
            <div className="p-3">
              <p className="text-xs text-gray-400 mb-1">Sponsored · mybookEarn</p>
              <p className="text-sm font-semibold text-gray-900">Discover your next favourite book</p>
              <button className="mt-2 w-full text-xs font-semibold py-1.5 rounded-md" style={{ background: color, color: "#fff" }}>Learn More</button>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "CTR", value: ad.ctr ? ad.ctr.toFixed(2) + "%" : "—" },
              { label: "Spent", value: formatMoney(ad.spend) },
              { label: "Results", value: String(ad.results) },
              { label: "Format", value: ad.format },
            ].map(({ label, value }) => (
              <div key={label} className="bg-[#f0f2f5] rounded-xl p-3">
                <p className="text-xs text-gray-500 mb-0.5">{label}</p>
                <p className="text-sm font-semibold text-gray-900">{value}</p>
              </div>
            ))}
          </div>
          <div className="text-sm space-y-2">
            <div className="flex justify-between py-2 border-b border-[#f0f2f5]">
              <span className="text-gray-500">Ad set</span>
              <span className="font-medium text-gray-800 text-right max-w-[160px] truncate">{ad.adSet}</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-gray-500">Status</span>
              <StatusPill status={ad.status} />
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

  function start(e: React.MouseEvent) { e.stopPropagation(); setEditing(true); setTimeout(() => inputRef.current?.focus(), 0); }
  function save(e: React.MouseEvent | React.KeyboardEvent) { e.stopPropagation(); if (val.trim()) onSave(val.trim()); setEditing(false); }

  if (editing) {
    return (
      <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
        <input ref={inputRef} value={val} onChange={(e) => setVal(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") save(e); if (e.key === "Escape") setEditing(false); }} className="border border-[#00008B] rounded px-2 py-0.5 text-sm text-gray-900 focus:outline-none w-40" />
        <button onClick={save} className="text-[#00008B] hover:text-[#00006B]"><Check className="h-4 w-4" /></button>
        <button onClick={(e) => { e.stopPropagation(); setEditing(false); }} className="text-gray-400 hover:text-gray-600"><X className="h-4 w-4" /></button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1.5 group">
      <span className="font-medium text-gray-900">{value}</span>
      <button onClick={start} className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-[#00008B] transition"><Pencil className="h-3.5 w-3.5" /></button>
    </div>
  );
}

function Ads() {
  const [adList, setAdList] = useState<Ad[]>(initialAds);
  const [q, setQ] = useState("");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState<Ad | null>(null);
  const [delivery, setDelivery] = useState<Record<string, boolean>>(
    Object.fromEntries(initialAds.map((a) => [a.id, a.status === "Active"]))
  );

  const list = adList.filter((a) => a.name.toLowerCase().includes(q.toLowerCase()));
  const allSelected = list.length > 0 && list.every((a) => selected.has(a.id));

  function toggleAll() {
    if (allSelected) setSelected((s) => { const n = new Set(s); list.forEach((a) => n.delete(a.id)); return n; });
    else setSelected((s) => { const n = new Set(s); list.forEach((a) => n.add(a.id)); return n; });
  }

  function toggleOne(id: string) {
    setSelected((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  function deleteOne(e: React.MouseEvent, id: string) {
    e.stopPropagation();
    setAdList((prev) => prev.filter((a) => a.id !== id));
    setSelected((s) => { const n = new Set(s); n.delete(id); return n; });
    if (preview?.id === id) setPreview(null);
  }

  function bulkDelete() {
    setAdList((prev) => prev.filter((a) => !selected.has(a.id)));
    setSelected(new Set());
    if (preview && selected.has(preview.id)) setPreview(null);
  }

  return (
    <>
      {showModal && <NewAdModal onClose={() => setShowModal(false)} onSave={(a) => { setAdList((prev) => [a, ...prev]); setDelivery((d) => ({ ...d, [a.id]: false })); }} />}
      {preview && <PreviewPanel ad={preview} onClose={() => setPreview(null)} />}

      <PageHeader
        title="Ads"
        subtitle="Every creative in flight."
        action={
          <button onClick={() => setShowModal(true)} className="flex items-center gap-1.5 bg-[#00008B] hover:bg-[#00006B] text-white text-sm font-semibold px-4 py-2 rounded-md transition">
            <Plus className="h-4 w-4" /> New ad
          </button>
        }
      />

      <ClayCard>
        <div className="flex flex-wrap gap-3 items-center mb-4">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search ads" className="pl-9" />
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
            <button onClick={bulkDelete} className="flex items-center gap-1 border border-red-200 bg-white text-red-500 text-xs font-semibold px-3 py-1.5 rounded-md hover:bg-red-50 transition"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-sm min-w-[800px]">
            <thead>
              <tr className="border-b border-[#dddfe2]">
                <th className="py-3 pr-3 w-8"><input type="checkbox" checked={allSelected} onChange={toggleAll} className="h-4 w-4 rounded border-gray-300 accent-[#00008B] cursor-pointer" /></th>
                <th className="text-left py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Delivery</th>
                <th className="text-left py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Ad name</th>
                <th className="text-left py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Status</th>
                <th className="text-left py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Format</th>
                <th className="text-left py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Ad set</th>
                <th className="text-right py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">CTR</th>
                <th className="text-right py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Amount spent</th>
                <th className="text-right py-3 text-xs font-semibold uppercase tracking-wider text-gray-500">Results</th>
                <th className="py-3 w-16"></th>
              </tr>
            </thead>
            <tbody>
              {list.map((a) => {
                const isSelected = selected.has(a.id);
                const isOn = delivery[a.id];
                const Icon = FORMAT_ICONS[a.format];
                const color = FORMAT_COLORS[a.format];
                return (
                  <tr key={a.id} onClick={() => toggleOne(a.id)} className={`border-b border-[#f0f2f5] cursor-pointer transition ${isSelected ? "bg-[#e7f3ff]" : "hover:bg-[#f7f8fa]"}`}>
                    <td className="py-3 pr-3"><input type="checkbox" checked={isSelected} onChange={() => toggleOne(a.id)} onClick={(e) => e.stopPropagation()} className="h-4 w-4 rounded border-gray-300 accent-[#00008B] cursor-pointer" /></td>
                    <td className="py-3"><DeliveryToggle active={isOn} onChange={(v) => setDelivery((d) => ({ ...d, [a.id]: v }))} /></td>
                    <td className="py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-16 rounded-lg grid place-items-center shrink-0" style={{ background: `${color}18` }}>
                          <Icon className="h-5 w-5" style={{ color }} />
                        </div>
                        <InlineEdit value={a.name} onSave={(v) => setAdList((prev) => prev.map((x) => x.id === a.id ? { ...x, name: v } : x))} />
                      </div>
                    </td>
                    <td className="py-3"><StatusPill status={isOn ? "Active" : "Paused"} /></td>
                    <td className="py-3"><span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: `${color}18`, color }}>{a.format}</span></td>
                    <td className="py-3 text-xs text-gray-500 max-w-[160px] truncate">{a.adSet}</td>
                    <td className="py-3 text-right text-gray-700">{a.ctr ? a.ctr + "%" : "—"}</td>
                    <td className="py-3 text-right font-semibold text-gray-900">{formatMoney(a.spend)}</td>
                    <td className="py-3 text-right font-semibold text-[#00008B]">{a.results}</td>
                    <td className="py-3">
                      <div className="flex items-center gap-1 justify-end" onClick={(e) => e.stopPropagation()}>
                        <button onClick={(e) => { e.stopPropagation(); setPreview(a); }} title="Preview" className="p-1.5 rounded hover:bg-[#e7f3ff] text-gray-400 hover:text-[#00008B] transition"><Eye className="h-3.5 w-3.5" /></button>
                        <button onClick={(e) => deleteOne(e, a.id)} title="Delete" className="p-1.5 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition"><Trash2 className="h-3.5 w-3.5" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {list.length === 0 && (
                <tr><td colSpan={10} className="py-12 text-center text-gray-400 text-sm">No ads found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </ClayCard>
    </>
  );
}
