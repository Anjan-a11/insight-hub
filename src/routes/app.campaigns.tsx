import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus, Copy, Pencil, Trash2, FlaskConical, Tag, ChevronDown,
  MoreHorizontal, Columns3, AlignJustify, Download, LayoutGrid,
  Megaphone, MousePointerClick, MessageSquare, Filter as FilterIcon,
  Users, ShoppingBag, X, ArrowUpDown, Eye, Image as ImageIcon,
} from "lucide-react";
import { campaigns, formatMoney } from "@/lib/mockData";
import type { Campaign } from "@/lib/mockData";

export const Route = createFileRoute("/app/campaigns")({
  component: Campaigns,
  head: () => ({ meta: [{ title: "Campaigns — mybookEarn" }] }),
});

function DeliveryToggle({ active, onChange }: { active: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onChange(!active); }}
      className={`fb-toggle ${active ? "on" : "off"}`}
    />
  );
}

function DeliveryDot({ active }: { active: boolean }) {
  return (
    <span className="flex items-center gap-1.5 text-sm">
      <motion.span
        animate={{ scale: active ? [1, 1.3, 1] : 1 }}
        transition={{ duration: 0.4 }}
        className={`h-2 w-2 rounded-full ${active ? "bg-[#42b72a]" : "bg-gray-400"}`}
      />
      <span className={active ? "text-gray-800" : "text-gray-400"}>{active ? "Active" : "Off"}</span>
    </span>
  );
}

const OBJ_META = {
  Awareness:       { icon: Megaphone,         desc: "Build brand awareness and reach.",                    goodFor: ["Video views", "Reach", "Brand awareness"] },
  Traffic:         { icon: MousePointerClick,  desc: "Send people to a destination.",                      goodFor: ["Website visits", "Link clicks", "Landing page views"] },
  Engagement:      { icon: MessageSquare,      desc: "Get more messages, video views or post engagement.", goodFor: ["Post engagement", "Video views", "Messages"] },
  Leads:           { icon: FilterIcon,         desc: "Collect leads for your business or brand.",          goodFor: ["Website and instant forms", "Instant forms", "Messenger, Instagram and WhatsApp", "Conversions", "Calls"] },
  "App Promotion": { icon: Users,              desc: "Get more installs or engagement for your app.",      goodFor: ["App installs", "App events"] },
  Sales:           { icon: ShoppingBag,        desc: "Find people likely to purchase your product.",       goodFor: ["Conversions", "Catalogue sales", "Messenger"] },
} as const;
type Objective = keyof typeof OBJ_META;

function CreateCampaignModal({ onClose, onCreate }: { onClose: () => void; onCreate: (campaign: Campaign) => void }) {
  const [tab, setTab] = useState<"campaign" | "adset">("campaign");
  const [selected, setSelected] = useState<Objective>("Leads");
  const meta = OBJ_META[selected];
  const Icon = meta.icon;

  // Ad set / ad quick form state
  const [adName, setAdName] = useState("");
  const [adType, setAdType] = useState<"adset" | "ad">("adset");
  const [campaignName, setCampaignName] = useState("New campaign");
  const [budget, setBudget] = useState("5000");

  function handleCreate() {
    const name = tab === "campaign"
      ? campaignName.trim() || "Untitled campaign"
      : (adName.trim() || (adType === "adset" ? "New ad set" : "New ad"));

    onCreate({
      id: `c_${Date.now()}`,
      name,
      status: "Draft" as const,
      objective: selected,
      budget: Number(budget) || 0,
      spend: 0,
      reach: 0,
      impressions: 0,
      clicks: 0,
      ctr: 0,
      results: 0,
      costPerResult: 0,
      startDate: new Date().toISOString().slice(0, 10),
    });
    onClose();
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 20 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] flex flex-col overflow-hidden"
      >
        {/* Tabs */}
        <div className="flex items-center border-b border-[#dddfe2] px-6 pt-4">
          <button
            onClick={() => setTab("campaign")}
            className={`text-sm font-semibold pb-3 mr-6 border-b-2 transition-colors ${
              tab === "campaign" ? "text-[#00008B] border-[#00008B]" : "text-gray-400 border-transparent hover:text-gray-700"
            }`}
          >
            Create new campaign
          </button>
          <button
            onClick={() => setTab("adset")}
            className={`text-sm font-semibold pb-3 border-b-2 transition-colors ${
              tab === "adset" ? "text-[#00008B] border-[#00008B]" : "text-gray-400 border-transparent hover:text-gray-700"
            }`}
          >
            New ad set or ad
          </button>
          <button onClick={onClose} className="ml-auto mb-3 p-1.5 hover:bg-[#f0f2f5] rounded-full transition">
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {tab === "campaign" ? (
            <motion.div
              key="campaign"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              className="flex flex-1 overflow-hidden"
            >
              {/* Objective list */}
              <div className="w-64 border-r border-[#dddfe2] overflow-y-auto py-3">
                <p className="text-sm font-semibold text-gray-800 px-5 mb-2">Choose a campaign objective</p>
                {(Object.keys(OBJ_META) as Objective[]).map((obj) => {
                  const OIcon = OBJ_META[obj].icon;
                  const isActive = selected === obj;
                  return (
                    <motion.button
                      key={obj}
                      onClick={() => setSelected(obj)}
                      whileHover={{ x: 2 }}
                      className={`w-full flex items-center gap-3 px-5 py-2.5 text-sm transition-colors ${
                        isActive ? "bg-[#e8e8f5] text-[#00008B]" : "text-gray-700 hover:bg-[#f7f8fa]"
                      }`}
                    >
                      <div className={`p-1.5 rounded-lg transition-colors ${isActive ? "bg-[#00008B]" : "bg-[#f0f2f5]"}`}>
                        <OIcon className={`h-4 w-4 ${isActive ? "text-white" : "text-gray-500"}`} />
                      </div>
                      <span className="flex-1 text-left">{obj}</span>
                      <div className={`h-4 w-4 rounded-full border-2 transition-all flex items-center justify-center ${
                        isActive ? "border-[#00008B] bg-[#00008B]" : "border-gray-300"
                      }`}>
                        {isActive && <span className="h-2 w-2 rounded-full bg-white" />}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
              {/* Detail panel */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.18 }}
                  className="flex-1 p-6 overflow-y-auto"
                >
                  <div className="flex items-start gap-4">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-br from-orange-100 to-orange-200 grid place-items-center shrink-0">
                      <Icon className="h-10 w-10 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-lg font-bold text-gray-900">{selected}</p>
                      <p className="text-sm text-gray-500 mt-1">{meta.desc}</p>
                    </div>
                  </div>
                  <div className="mt-5 space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Campaign name</label>
                      <input
                        value={campaignName}
                        onChange={(e) => setCampaignName(e.target.value)}
                        placeholder="My next campaign"
                        className="w-full border border-[#dddfe2] rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00008B]/30 focus:border-[#00008B] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Budget</label>
                      <input
                        type="number"
                        min="0"
                        value={budget}
                        onChange={(e) => setBudget(e.target.value)}
                        placeholder="5000"
                        className="w-full border border-[#dddfe2] rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00008B]/30 focus:border-[#00008B] transition-all"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-800 mb-2">Good for:</p>
                      <div className="flex flex-wrap gap-2">
                        {meta.goodFor.map((g, i) => (
                          <motion.span
                            key={g}
                            initial={{ opacity: 0, scale: 0.85 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.05 }}
                            className="border border-[#dddfe2] rounded-full px-3 py-1 text-xs text-gray-700 hover:border-[#00008B] hover:text-[#00008B] transition-colors cursor-default"
                          >
                            {g}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          ) : (
            <motion.div
              key="adset"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex-1 p-6 overflow-y-auto space-y-5"
            >
              <p className="text-sm font-semibold text-gray-800">What would you like to create?</p>
              <div className="grid grid-cols-2 gap-3">
                {(["adset", "ad"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setAdType(t)}
                    className={`flex flex-col items-center gap-3 p-5 rounded-xl border-2 transition-all ${
                      adType === t
                        ? "border-[#00008B] bg-[#e8e8f5]"
                        : "border-[#dddfe2] hover:border-[#00008B]/40 hover:bg-[#f7f8fa]"
                    }`}
                  >
                    <div className={`p-3 rounded-xl ${
                      adType === t ? "bg-[#00008B]" : "bg-[#f0f2f5]"
                    }`}>
                      {t === "adset"
                        ? <Layers className={`h-6 w-6 ${adType === t ? "text-white" : "text-gray-500"}`} />
                        : <ImageIcon className={`h-6 w-6 ${adType === t ? "text-white" : "text-gray-500"}`} />
                      }
                    </div>
                    <div className="text-center">
                      <p className={`text-sm font-semibold ${
                        adType === t ? "text-[#00008B]" : "text-gray-700"
                      }`}>
                        {t === "adset" ? "New Ad Set" : "New Ad"}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {t === "adset" ? "Targeting & budget group" : "Creative & copy"}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                  {adType === "adset" ? "Ad set name" : "Ad name"}
                </label>
                <input
                  value={adName}
                  onChange={(e) => setAdName(e.target.value)}
                  placeholder={adType === "adset" ? "e.g. Book Lovers 25-44 — Feed" : "e.g. Creative A — Image"}
                  className="w-full border border-[#dddfe2] rounded-xl px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#00008B]/30 focus:border-[#00008B] transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">Campaign</label>
                <select className="w-full border border-[#dddfe2] rounded-xl px-4 py-2.5 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#00008B]/30 focus:border-[#00008B] transition-all bg-white">
                  {campaigns.map((c) => (
                    <option key={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#dddfe2]">
          <button className="text-sm text-[#00008B] hover:underline">About campaign objectives</button>
          <div className="flex gap-3">
            <button onClick={onClose} className="border border-[#dddfe2] bg-white hover:bg-[#f0f2f5] text-gray-700 text-sm font-semibold px-5 py-2 rounded-lg transition">
              Cancel
            </button>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleCreate}
              className="btn-liquid bg-gradient-to-r from-[#00008B] to-[#2929a3] text-white text-sm font-semibold px-5 py-2 rounded-lg shadow-md shadow-indigo-200 transition"
            >
              Create
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function Campaigns() {
  const [viewTab, setViewTab] = useState<"all"|"delivery"|"actions"|"active">("all");
  const [subTab, setSubTab]   = useState<"campaigns"|"adsets"|"ads">("campaigns");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [campaignItems, setCampaignItems] = useState<Campaign[]>(campaigns);
  const [delivery, setDelivery] = useState<Record<string, boolean>>(
    Object.fromEntries(campaigns.map((c) => [c.id, c.status === "Active"]))
  );
  const [showCreate, setShowCreate] = useState(false);
  const [searchQ, setSearchQ] = useState("");
  const [message, setMessage] = useState("");
  const [viewComposerOpen, setViewComposerOpen] = useState(false);
  const [viewDraft, setViewDraft] = useState("Q3 growth");
  const [savedViews, setSavedViews] = useState(["All campaigns"]);

  const list: Campaign[] = campaignItems.filter((c) => {
    if (viewTab === "delivery" || viewTab === "active") return delivery[c.id];
    if (searchQ) return c.name.toLowerCase().includes(searchQ.toLowerCase());
    return true;
  });

  const allSelected = list.length > 0 && list.every((c) => selected.has(c.id));
  function toggleAll() {
    if (allSelected) setSelected((s) => { const n = new Set(s); list.forEach((c) => n.delete(c.id)); return n; });
    else setSelected((s) => { const n = new Set(s); list.forEach((c) => n.add(c.id)); return n; });
  }
  function toggleOne(id: string) {
    setSelected((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  }

  const selCount = selected.size;

  function handleCreateCampaign(campaign: Campaign) {
    setCampaignItems((prev) => [campaign, ...prev]);
    setMessage(`Created “${campaign.name}” and added it to your workspace.`);
    setSelected(new Set());
  }

  function handleDuplicateSelected() {
    const ids = [...selected];
    if (!ids.length) return;
    const duplicates = ids.flatMap((id) => {
      const item = campaignItems.find((c) => c.id === id);
      if (!item) return [];
      return [{ ...item, id: `c_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`, name: `Copy of ${item.name}` }];
    });
    setCampaignItems((prev) => [...duplicates, ...prev]);
    setSelected(new Set());
    setMessage(`Duplicated ${duplicates.length} campaign${duplicates.length > 1 ? "s" : ""}.`);
  }

  function handleDeleteSelected() {
    if (!selected.size) return;
    setCampaignItems((prev) => prev.filter((c) => !selected.has(c.id)));
    setSelected(new Set());
    setMessage(`Removed ${selected.size} selected campaign${selected.size > 1 ? "s" : ""}.`);
  }

  function handleEditSelected() {
    const ids = [...selected];
    if (ids.length !== 1) return;
    const current = campaignItems.find((c) => c.id === ids[0]);
    if (!current) return;
    const nextName = window.prompt("Edit campaign name", current.name);
    if (!nextName || !nextName.trim()) return;
    setCampaignItems((prev) => prev.map((c) => c.id === current.id ? { ...c, name: nextName.trim() } : c));
    setSelected(new Set());
    setMessage(`Updated “${nextName.trim()}”.`);
  }

  function handleAbTest() {
    if (!selected.size) return;
    setMessage(`A/B test plan prepared for ${selected.size} selected campaign${selected.size > 1 ? "s" : ""}.`);
  }

  function saveCurrentView() {
    const name = viewDraft.trim();
    if (!name) return;
    setSavedViews((prev) => [name, ...prev.filter((item) => item !== name)]);
    setViewComposerOpen(false);
    setViewDraft("");
    setMessage(`Saved view “${name}”.`);
  }

  const viewTabs = [
    { key: "all",      label: "All ads",     icon: LayoutGrid },
    { key: "delivery", label: "Had delivery", icon: Eye },
    { key: "actions",  label: "Actions",      icon: Tag },
    { key: "active",   label: "Active ads",   icon: Megaphone },
  ] as const;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl border border-[#dddfe2] overflow-hidden shadow-sm"
    >
      {/* View tabs */}
      <div className="flex items-center border-b border-[#dddfe2] px-4 gap-0.5 overflow-x-auto">
        {viewTabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            onClick={() => setViewTab(key)}
            className={`relative flex items-center gap-1.5 px-3 py-3 text-sm font-medium whitespace-nowrap transition-colors ${
              viewTab === key ? "text-[#00008B]" : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <Icon className="h-4 w-4" /> {label}
            {viewTab === key && (
              <motion.div layoutId="view-tab-line" className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00008B] rounded-t" />
            )}
          </button>
        ))}
        <button className="flex items-center gap-1 px-3 py-3 text-sm text-gray-400 hover:text-gray-700 whitespace-nowrap">
          <Plus className="h-3.5 w-3.5" /> See more
        </button>
        <div className="ml-auto flex items-center gap-2 py-2 shrink-0">
          <button
            onClick={() => {
              setViewDraft("");
              setViewComposerOpen(true);
            }}
            className="border border-[#dddfe2] bg-white hover:bg-[#f0f2f5] text-gray-700 text-sm font-medium px-3 py-1.5 rounded-lg transition"
          >
            Create a view
          </button>
          <button className="border border-[#dddfe2] bg-white hover:bg-[#f0f2f5] p-1.5 rounded-lg transition">
            <AlignJustify className="h-4 w-4 text-gray-500" />
          </button>
        </div>
      </div>

      {savedViews.length > 0 ? (
        <div className="flex flex-wrap gap-2 border-b border-[#dddfe2] px-4 py-3">
          {savedViews.map((view) => (
            <button
              key={view}
              onClick={() => setMessage(`Viewing “${view}”.`)}
              className="rounded-full border border-[#dddfe2] bg-[#f8f9ff] px-3 py-1 text-xs font-semibold text-[#00008B]"
            >
              {view}
            </button>
          ))}
        </div>
      ) : null}

      {message ? (
        <div className="border-b border-[#dddfe2] px-4 py-3 text-sm text-[#2e7d32] bg-[#f4fff7]">
          {message}
        </div>
      ) : null}

      {/* Search */}
      <div className="px-4 py-2 border-b border-[#dddfe2]">
        <input
          value={searchQ}
          onChange={(e) => setSearchQ(e.target.value)}
          placeholder="Search to filter by: name, ID or metrics"
          className="w-full text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none py-1 bg-transparent"
        />
      </div>

      {/* Sub-tabs + date range */}
      <div className="flex items-center px-4 py-2 border-b border-[#dddfe2] gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          {(["campaigns","adsets","ads"] as const).map((tab) => {
            const labels = { campaigns: "Campaigns", adsets: selCount > 0 ? `Ad sets for ${selCount} Campaign` : "Ad sets", ads: selCount > 0 ? `Ads for ${selCount} Campaign` : "Ads" };
            const icons  = { campaigns: Megaphone, adsets: LayoutGrid, ads: ImageIcon };
            const Icon   = icons[tab];
            const isActive = subTab === tab;
            return (
              <motion.button
                key={tab}
                onClick={() => setSubTab(tab)}
                whileTap={{ scale: 0.96 }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-semibold transition-all ${
                  isActive ? "bg-[#00008B] text-white shadow-md shadow-indigo-200" : "border border-[#dddfe2] text-gray-700 hover:bg-[#f0f2f5]"
                }`}
              >
                <Icon className="h-3.5 w-3.5" />
                {labels[tab]}
                {isActive && selCount > 0 && tab === "campaigns" && (
                  <span className="flex items-center gap-1 bg-white text-[#00008B] text-xs font-bold px-1.5 py-0.5 rounded ml-1">
                    {selCount}
                    <button onClick={(e) => { e.stopPropagation(); setSelected(new Set()); }}>
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                )}
              </motion.button>
            );
          })}
        </div>
        <button className="ml-auto flex items-center gap-1.5 border border-[#dddfe2] bg-white hover:bg-[#f0f2f5] text-gray-600 text-xs font-medium px-3 py-1.5 rounded-lg transition">
          📅 Last 30 days: 6 Jun 2026 - 5 Jul 2026 <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
        </button>
      </div>

      {/* Action toolbar */}
      <div className="flex items-center px-4 py-2 border-b border-[#dddfe2] gap-2 flex-wrap">
        <motion.button
          whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
          onClick={() => setShowCreate(true)}
          className="btn-liquid flex items-center gap-1.5 bg-gradient-to-r from-[#42b72a] to-[#36a420] text-white text-sm font-semibold px-3 py-1.5 rounded-lg shadow-md shadow-green-200 transition"
        >
          <Plus className="h-4 w-4" /> Create
        </motion.button>

        <div className="flex items-center border border-[#dddfe2] rounded-lg overflow-hidden">
          <button onClick={handleDuplicateSelected} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 hover:bg-[#f0f2f5] transition border-r border-[#dddfe2]">
            <Copy className="h-3.5 w-3.5" /> Duplicate
          </button>
          <button className="px-2 py-1.5 hover:bg-[#f0f2f5] transition">
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>
        </div>

        <div className="flex items-center border border-[#dddfe2] rounded-lg overflow-hidden">
          <button onClick={handleEditSelected} className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-700 hover:bg-[#f0f2f5] transition border-r border-[#dddfe2]">
            <Pencil className="h-3.5 w-3.5" /> Edit
          </button>
          <button className="px-2 py-1.5 hover:bg-[#f0f2f5] transition">
            <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
          </button>
        </div>

        <button onClick={handleDeleteSelected} className="border border-[#dddfe2] rounded-lg p-1.5 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition">
          <Trash2 className="h-4 w-4 text-gray-500" />
        </button>
        <button onClick={handleAbTest} className="flex items-center gap-1.5 border border-[#dddfe2] rounded-lg px-3 py-1.5 text-sm text-gray-700 hover:bg-[#f0f2f5] transition">
          <FlaskConical className="h-3.5 w-3.5" /> A/B test
        </button>
        <button className="border border-[#dddfe2] rounded-lg p-1.5 hover:bg-[#f0f2f5] transition">
          <Tag className="h-4 w-4 text-gray-500" />
        </button>
        <div className="flex items-center border border-[#dddfe2] rounded-lg overflow-hidden">
          <button className="px-3 py-1.5 text-sm text-gray-700 hover:bg-[#f0f2f5] transition border-r border-[#dddfe2]">More</button>
          <button className="px-2 py-1.5 hover:bg-[#f0f2f5] transition"><ChevronDown className="h-3.5 w-3.5 text-gray-400" /></button>
        </div>

        <div className="ml-auto flex items-center gap-2">
          {[
            { label: "Columns: Performance", icon: Columns3 },
            { label: "Breakdown",            icon: AlignJustify },
          ].map(({ label, icon: Icon }) => (
            <button key={label} className="flex items-center gap-1.5 border border-[#dddfe2] bg-white hover:bg-[#f0f2f5] text-gray-700 text-sm font-medium px-3 py-1.5 rounded-lg transition">
              <Icon className="h-3.5 w-3.5" /> {label} <ChevronDown className="h-3.5 w-3.5 text-gray-400" />
            </button>
          ))}
          {[MoreHorizontal, Download].map((Icon, i) => (
            <button key={i} className="border border-[#dddfe2] bg-white hover:bg-[#f0f2f5] p-1.5 rounded-lg transition">
              <Icon className="h-4 w-4 text-gray-500" />
            </button>
          ))}
        </div>
      </div>

      {message ? (
        <div className="mx-4 mt-3 rounded-xl border border-[#d7f3df] bg-[#f4fff7] px-4 py-3 text-sm text-[#2e7d32]">
          {message}
        </div>
      ) : null}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[1050px]">
          <thead>
            <tr className="border-b border-[#dddfe2] bg-[#fafbfc]">
              <th className="py-3 pl-4 pr-2 w-8">
                <input type="checkbox" checked={allSelected} onChange={toggleAll} className="h-4 w-4 rounded border-gray-300 accent-[#00008B] cursor-pointer" />
              </th>
              <th className="py-3 pr-2 w-14 text-left text-xs font-semibold text-gray-500">
                <div className="flex items-center gap-1">Off... <ArrowUpDown className="h-3 w-3" /></div>
              </th>
              <th className="text-left py-3 pr-4 text-xs font-semibold text-gray-500 min-w-[200px]">
                <div className="flex items-center gap-1">Campaign <ArrowUpDown className="h-3 w-3" /></div>
              </th>
              <th className="text-left py-3 pr-4 text-xs font-semibold text-[#00008B] min-w-[120px]">
                <div className="flex items-center gap-1">Delivery <ChevronDown className="h-3 w-3" /></div>
              </th>
              <th className="text-left py-3 pr-4 text-xs font-semibold text-gray-500 min-w-[100px]">
                <div className="flex items-center gap-1">Actions <ChevronDown className="h-3 w-3" /></div>
              </th>
              <th className="text-right py-3 pr-4 text-xs font-semibold text-gray-500 min-w-[100px]">
                <div className="flex items-center justify-end gap-1">Results <ArrowUpDown className="h-3 w-3" /></div>
              </th>
              <th className="text-right py-3 pr-4 text-xs font-semibold text-gray-500 min-w-[110px]">
                <div className="flex items-center justify-end gap-1">Cost per result <ArrowUpDown className="h-3 w-3" /></div>
              </th>
              <th className="text-right py-3 pr-4 text-xs font-semibold text-gray-500 min-w-[100px]">
                <div className="flex items-center justify-end gap-1">Budget <ArrowUpDown className="h-3 w-3" /></div>
              </th>
              <th className="text-right py-3 pr-4 text-xs font-semibold text-gray-500 min-w-[110px]">
                <div className="flex items-center justify-end gap-1">Amount spent <ArrowUpDown className="h-3 w-3" /></div>
              </th>
            </tr>
          </thead>
          <tbody>
            <AnimatePresence>
              {list.map((c, i) => {
                const isSelected = selected.has(c.id);
                const isOn = delivery[c.id];
                return (
                  <motion.tr
                    key={c.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: i * 0.03 }}
                    className={`border-b border-[#f0f2f5] transition-colors ${isSelected ? "bg-[#e7f3ff]" : "hover:bg-[#f7f8fa]"}`}
                  >
                    <td className="py-3 pl-4 pr-2">
                      <input type="checkbox" checked={isSelected} onChange={() => toggleOne(c.id)} className="h-4 w-4 rounded border-gray-300 accent-[#00008B] cursor-pointer" />
                    </td>
                    <td className="py-3 pr-2">
                      <DeliveryToggle active={isOn} onChange={(v) => setDelivery((d) => ({ ...d, [c.id]: v }))} />
                    </td>
                    <td className="py-3 pr-4">
                      <button className="text-[#00008B] font-medium hover:underline text-left">{c.name}</button>
                    </td>
                    <td className="py-3 pr-4"><DeliveryDot active={isOn} /></td>
                    <td className="py-3 pr-4 text-gray-400 text-sm">—</td>
                    <td className="py-3 pr-4 text-right">
                      {c.results > 0 ? (
                        <div>
                          <div className="font-semibold text-gray-900">{c.results}</div>
                          <div className="text-xs text-gray-400">{c.objective}</div>
                        </div>
                      ) : <span className="text-gray-400">—</span>}
                    </td>
                    <td className="py-3 pr-4 text-right">
                      {c.costPerResult > 0 ? (
                        <div>
                          <div className="text-gray-900">{formatMoney(c.costPerResult)}</div>
                          <div className="text-xs text-gray-400">Per {c.objective.toLowerCase()}</div>
                        </div>
                      ) : <span className="text-gray-400">—</span>}
                    </td>
                    <td className="py-3 pr-4 text-right">
                      {c.budget > 0 ? (
                        <div>
                          <div className="text-gray-900">{formatMoney(c.budget)}</div>
                          <div className="text-xs text-gray-400">Daily</div>
                        </div>
                      ) : <span className="text-gray-400 text-xs">Using ad set bu...</span>}
                    </td>
                    <td className="py-3 pr-4 text-right font-semibold text-gray-900">{formatMoney(c.spend)}</td>
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-3 border-t border-[#dddfe2] bg-[#fafbfc] text-xs text-gray-500">
        <span>Results from <b className="text-gray-700">{list.length}</b> campaigns <span className="cursor-help">ℹ</span></span>
        <div className="flex gap-6">
          <span>{list.reduce((a, c) => a + c.results, 0)} actions total</span>
          <span>Total: <b className="text-gray-700">{formatMoney(list.reduce((a, c) => a + c.spend, 0))}</b></span>
        </div>
      </div>

      <AnimatePresence>
        {showCreate && <CreateCampaignModal onClose={() => setShowCreate(false)} onCreate={handleCreateCampaign} />}
      {viewComposerOpen ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 px-4">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md rounded-2xl border border-[#dddfe2] bg-white p-5 shadow-2xl">
            <p className="text-sm font-semibold text-[#00008B]">Create a view</p>
            <p className="mt-1 text-sm text-gray-500">Save the current campaign filter as a reusable view.</p>
            <input
              value={viewDraft}
              onChange={(e) => setViewDraft(e.target.value)}
              placeholder="e.g. High-value accounts"
              className="mt-4 w-full rounded-xl border border-[#dddfe2] px-3 py-2 text-sm focus:border-[#00008B] focus:outline-none focus:ring-2 focus:ring-[#00008B]/20"
            />
            <div className="mt-4 flex justify-end gap-2">
              <button onClick={() => setViewComposerOpen(false)} className="rounded-lg border border-[#dddfe2] px-3 py-2 text-sm font-semibold text-gray-600">Cancel</button>
              <button onClick={saveCurrentView} className="rounded-lg bg-[#00008B] px-3 py-2 text-sm font-semibold text-white">Save view</button>
            </div>
          </motion.div>
        </div>
      ) : null}
      </AnimatePresence>
    </motion.div>
  );
}
