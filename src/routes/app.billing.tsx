import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Download, HelpCircle, CreditCard, Building2, Smartphone,
  Plus, AlertCircle, CheckCircle, Clock, ChevronDown, Filter,
} from "lucide-react";
import { ClayCard, PageHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/app/billing")({
  component: Billing,
  head: () => ({ meta: [{ title: "Billing & Payments — mybookEarn" }] }),
});

/* ── Add Funds Modal ─────────────────────────────────────────────────────── */
function AddFundsModal({ onClose }: { onClose: () => void }) {
  const [preset, setPreset] = useState<"a" | "b" | "other">("a");
  const [amount, setAmount] = useState("24,780.00");
  const [payMethod, setPayMethod] = useState<"card" | "upi" | "netbanking">("netbanking");

  function selectPreset(p: "a" | "b" | "other") {
    setPreset(p);
    if (p === "a") setAmount("24,780.00");
    if (p === "b") setAmount("49,560.00");
    if (p === "other") setAmount("");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#dddfe2]">
          <h2 className="text-lg font-bold text-gray-900">Add funds</h2>
          <button onClick={onClose} className="p-1 hover:bg-[#f0f2f5] rounded-full transition">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          <div>
            <p className="text-base font-bold text-gray-900 mb-1">Choose amount</p>
            <p className="text-sm text-gray-500 mb-3">
              Choose an amount to add to your available funds. We'll deduct from your total as your ads run.
            </p>
            <div className="flex gap-2 mb-3">
              {(["a", "b", "other"] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => selectPreset(p)}
                  className={`px-4 py-2 rounded-md text-sm font-semibold border transition ${
                    preset === p ? "bg-[#00008B] text-white border-[#00008B]" : "border-[#dddfe2] text-gray-700 hover:bg-[#f0f2f5]"
                  }`}
                >
                  {p === "a" ? "₹ 24,780.00" : p === "b" ? "₹ 49,560.00" : "Other"}
                </button>
              ))}
            </div>
            <div className="border border-[#dddfe2] rounded-lg px-4 py-3 focus-within:ring-2 focus-within:ring-[#00008B]/40">
              <p className="text-xs text-gray-400 mb-1">Amount</p>
              <div className="flex items-center gap-1">
                <span className="text-gray-700 font-medium">₹</span>
                <input
                  value={amount}
                  onChange={(e) => { setAmount(e.target.value); setPreset("other"); }}
                  className="flex-1 text-gray-900 font-medium focus:outline-none text-sm"
                  placeholder="0.00"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Amount needed to cover your next 7 days of ad spending plus estimated tax, based on campaign budgets.
            </p>
          </div>

          <div>
            <p className="text-base font-bold text-gray-900 mb-3">Add payment method</p>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-700">Debit or credit card</span>
                  <div className="flex gap-1">
                    <span className="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">VISA</span>
                    <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">MC</span>
                    <span className="bg-blue-400 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">RuPay</span>
                  </div>
                </div>
                <input type="radio" name="paymethod" checked={payMethod === "card"} onChange={() => setPayMethod("card")} className="h-4 w-4 accent-[#00008B]" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <Smartphone className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-700">UPI</span>
                  <div className="flex gap-1">
                    <span className="bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">PhonePe</span>
                    <span className="bg-green-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">GPay</span>
                    <span className="bg-purple-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">Paytm</span>
                  </div>
                </div>
                <input type="radio" name="paymethod" checked={payMethod === "upi"} onChange={() => setPayMethod("upi")} className="h-4 w-4 accent-[#00008B]" />
              </label>
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-700">Net Banking</span>
                </div>
                <input type="radio" name="paymethod" checked={payMethod === "netbanking"} onChange={() => setPayMethod("netbanking")} className="h-4 w-4 accent-[#00008B]" />
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end px-6 py-4 border-t border-[#dddfe2]">
          <button
            onClick={onClose}
            className="bg-[#00008B] hover:bg-[#00006B] text-white text-sm font-semibold px-8 py-2.5 rounded-full transition"
          >
            Next
          </button>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Add Payment Method Modal ────────────────────────────────────────────── */
function AddPaymentMethodModal({ onClose }: { onClose: () => void }) {
  const [type, setType] = useState<"card" | "upi" | "netbanking">("card");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-xl shadow-2xl w-full max-w-md mx-4"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#dddfe2]">
          <h2 className="text-lg font-bold text-gray-900">Add payment method</h2>
          <button onClick={onClose} className="p-1 hover:bg-[#f0f2f5] rounded-full transition"><X className="h-5 w-5 text-gray-500" /></button>
        </div>
        <div className="px-6 py-5 space-y-4">
          <div className="flex gap-2">
            {(["card", "upi", "netbanking"] as const).map((t) => (
              <button key={t} onClick={() => setType(t)}
                className={`flex-1 py-2 rounded-lg text-sm font-semibold border transition ${type === t ? "bg-[#00008B] text-white border-[#00008B]" : "border-[#dddfe2] text-gray-600 hover:bg-[#f0f2f5]"}`}>
                {t === "card" ? "Card" : t === "upi" ? "UPI" : "Net Banking"}
              </button>
            ))}
          </div>
          {type === "card" && (
            <div className="space-y-3">
              <input placeholder="Card number" className="w-full border border-[#dddfe2] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00008B]/30" />
              <div className="grid grid-cols-2 gap-3">
                <input placeholder="MM / YY" className="border border-[#dddfe2] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00008B]/30" />
                <input placeholder="CVV" className="border border-[#dddfe2] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00008B]/30" />
              </div>
              <input placeholder="Name on card" className="w-full border border-[#dddfe2] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00008B]/30" />
            </div>
          )}
          {type === "upi" && (
            <input placeholder="Enter UPI ID (e.g. name@upi)" className="w-full border border-[#dddfe2] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00008B]/30" />
          )}
          {type === "netbanking" && (
            <div className="relative">
              <select className="w-full border border-[#dddfe2] rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#00008B]/30 appearance-none">
                <option>Select your bank</option>
                <option>State Bank of India</option>
                <option>HDFC Bank</option>
                <option>ICICI Bank</option>
                <option>Axis Bank</option>
                <option>Kotak Mahindra Bank</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
          )}
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-[#dddfe2]">
          <button onClick={onClose} className="px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-[#f0f2f5] rounded-lg transition">Cancel</button>
          <button onClick={onClose} className="bg-[#00008B] hover:bg-[#00006B] text-white text-sm font-semibold px-6 py-2 rounded-lg transition">Save</button>
        </div>
      </motion.div>
    </div>
  );
}

/* ── Billing Page ────────────────────────────────────────────────────────── */
const ACTIVITY = [
  { date: "6 Jul 2026",  desc: "Prepaid balance", amount: "₹ 7,262.32", status: "Paid" },
  { date: "29 Jun 2026", desc: "Prepaid balance", amount: "₹ 4,775.00", status: "Paid" },
  { date: "22 Jun 2026", desc: "Prepaid balance", amount: "₹ 3,200.00", status: "Paid" },
  { date: "15 Jun 2026", desc: "Prepaid balance", amount: "₹ 2,890.00", status: "Paid" },
  { date: "8 Jun 2026",  desc: "Prepaid balance", amount: "₹ 1,540.00", status: "Paid" },
  { date: "1 Jun 2026",  desc: "Prepaid balance", amount: "₹ 980.00",   status: "Paid" },
  { date: "25 May 2026", desc: "Prepaid balance", amount: "₹ 500.00",   status: "Pending" },
  { date: "18 May 2026", desc: "Prepaid balance", amount: "₹ 2,100.00", status: "Failed" },
];

function StatusBadge({ status }: { status: string }) {
  if (status === "Paid") return (
    <span className="inline-flex items-center gap-1 text-xs bg-[#e7f3ff] text-[#00008B] font-semibold px-2 py-0.5 rounded-full">
      <CheckCircle className="h-3 w-3" /> Paid
    </span>
  );
  if (status === "Pending") return (
    <span className="inline-flex items-center gap-1 text-xs bg-yellow-50 text-yellow-700 font-semibold px-2 py-0.5 rounded-full">
      <Clock className="h-3 w-3" /> Pending
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1 text-xs bg-red-50 text-red-600 font-semibold px-2 py-0.5 rounded-full">
      <AlertCircle className="h-3 w-3" /> Failed
    </span>
  );
}

function Billing() {
  const [tab, setTab] = useState<"settings" | "activity">("settings");
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [showAddMethod, setShowAddMethod] = useState(false);
  const [filterStatus, setFilterStatus] = useState("All");

  const filtered = filterStatus === "All" ? ACTIVITY : ACTIVITY.filter((r) => r.status === filterStatus);

  return (
    <>
      <PageHeader title="Billing & payments" subtitle="Manage your ad account funds, payment methods and transaction history." />

      {/* Tab bar */}
      <div className="px-6 mb-4">
        <div className="flex gap-0 border-b border-[#dddfe2]">
          {(["settings", "activity"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition -mb-px ${
                tab === t ? "border-[#00008B] text-[#00008B]" : "border-transparent text-gray-500 hover:text-gray-800"
              }`}
            >
              {t === "settings" ? "Payment settings" : "Payment activity"}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {tab === "settings" ? (
          <motion.div key="settings" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="px-6 pb-6">
            <div className="grid md:grid-cols-3 gap-6">

              {/* Available funds */}
              <ClayCard>
                <p className="text-sm font-semibold text-gray-700 mb-3">Available funds</p>
                <p className="text-4xl font-bold text-gray-900">₹ 789.70</p>
                <button
                  onClick={() => setShowAddFunds(true)}
                  className="mt-4 flex items-center gap-2 bg-[#00008B] hover:bg-[#00006B] text-white text-sm font-semibold px-4 py-2 rounded-md transition"
                >
                  <Plus className="h-4 w-4" /> Add funds
                </button>
                <div className="mt-5 space-y-2 text-xs text-gray-500 border-t border-[#f0f2f5] pt-4">
                  <p className="font-semibold text-gray-700 text-sm">How you'll pay</p>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#42b72a]" />
                    Available funds
                  </div>
                  <p className="text-gray-400">We'll deduct funds as your ads run.</p>
                  <p>• Daily spending limit: <span className="text-gray-700 font-medium">₹ 5,000</span></p>
                  <p>• Your projected spend: <span className="text-gray-700 font-medium">₹ 3,540/day</span></p>
                </div>
              </ClayCard>

              {/* Payment method */}
              <ClayCard>
                <p className="text-sm font-semibold text-gray-700 mb-3">Payment method</p>
                <div className="border border-dashed border-[#dddfe2] rounded-lg p-4 text-sm text-gray-400 text-center">
                  No payment method added yet.
                </div>
                <button
                  onClick={() => setShowAddMethod(true)}
                  className="mt-3 flex items-center gap-1.5 text-sm text-[#00008B] font-semibold hover:underline"
                >
                  <Plus className="h-4 w-4" /> Add payment method
                </button>
                <div className="mt-5 border-t border-[#f0f2f5] pt-4 space-y-2">
                  <p className="text-sm font-semibold text-gray-700">Accepted methods</p>
                  <div className="flex flex-wrap gap-1.5">
                    {["VISA", "Mastercard", "RuPay", "UPI", "Net Banking"].map((m) => (
                      <span key={m} className="text-xs border border-[#dddfe2] rounded px-2 py-0.5 text-gray-500">{m}</span>
                    ))}
                  </div>
                </div>
              </ClayCard>

              {/* Payment history + Help */}
              <ClayCard>
                <p className="text-sm font-semibold text-gray-700 mb-3">Payment history</p>
                <button className="flex items-center gap-1.5 text-sm text-[#00008B] hover:underline">
                  <Download className="h-3.5 w-3.5" /> Download last receipt
                </button>
                <button className="mt-2 flex items-center gap-1.5 text-sm text-[#00008B] hover:underline">
                  <Download className="h-3.5 w-3.5" /> Download all receipts
                </button>

                <div className="mt-5 border-t border-[#f0f2f5] pt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-3">Help Centre</p>
                  <div className="space-y-2 text-sm text-[#00008B]">
                    {[
                      "Troubleshoot billing and payments",
                      "How ads billing works",
                      "What to do if your payment fails",
                      "Open Help Centre",
                    ].map((t) => (
                      <button key={t} className="flex items-center gap-1.5 hover:underline w-full text-left">
                        <HelpCircle className="h-3.5 w-3.5 shrink-0" /> {t}
                      </button>
                    ))}
                  </div>
                </div>
              </ClayCard>

              {/* Billing threshold */}
              <ClayCard className="md:col-span-3">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm font-semibold text-gray-700">Billing threshold</p>
                  <button className="text-xs text-[#00008B] font-semibold hover:underline">Edit</button>
                </div>
                <div className="flex items-center gap-4">
                  <div className="flex-1 bg-[#f0f2f5] rounded-full h-2.5 overflow-hidden">
                    <div className="bg-[#00008B] h-full rounded-full" style={{ width: "16%" }} />
                  </div>
                  <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">₹ 789.70 / ₹ 5,000</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  You'll be charged when your ad costs reach ₹ 5,000 or at the end of each month, whichever comes first.
                </p>
              </ClayCard>
            </div>
          </motion.div>
        ) : (
          <motion.div key="activity" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} className="px-6 pb-6">
            <ClayCard>
              {/* Filter bar */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-500">Filter by status:</span>
                  {["All", "Paid", "Pending", "Failed"].map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilterStatus(s)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition ${
                        filterStatus === s ? "bg-[#00008B] text-white" : "bg-[#f0f2f5] text-gray-600 hover:bg-[#e4e6ea]"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <button className="flex items-center gap-1.5 text-sm text-[#00008B] hover:underline">
                  <Download className="h-3.5 w-3.5" /> Export
                </button>
              </div>

              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#dddfe2]">
                    <th className="text-left py-2 text-xs font-semibold text-gray-500">Date</th>
                    <th className="text-left py-2 text-xs font-semibold text-gray-500">Description</th>
                    <th className="text-right py-2 text-xs font-semibold text-gray-500">Amount</th>
                    <th className="text-right py-2 text-xs font-semibold text-gray-500">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((row, i) => (
                    <tr key={i} className="border-b border-[#f0f2f5] hover:bg-[#f7f8fa] transition-colors">
                      <td className="py-3 text-gray-600">{row.date}</td>
                      <td className="py-3 text-gray-700">{row.desc}</td>
                      <td className="py-3 text-right text-gray-900 font-medium">{row.amount}</td>
                      <td className="py-3 text-right"><StatusBadge status={row.status} /></td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr><td colSpan={4} className="py-8 text-center text-sm text-gray-400">No transactions found.</td></tr>
                  )}
                </tbody>
              </table>
            </ClayCard>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showAddFunds && <AddFundsModal onClose={() => setShowAddFunds(false)} />}
        {showAddMethod && <AddPaymentMethodModal onClose={() => setShowAddMethod(false)} />}
      </AnimatePresence>
    </>
  );
}
