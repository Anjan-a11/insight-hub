import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ClayCard, PageHeader, Field, Input, PrimaryButton } from "@/components/ui-bits";
import { X, Download, HelpCircle, CreditCard, Building2, Smartphone } from "lucide-react";

export const Route = createFileRoute("/app/settings")({
  component: Settings,
  head: () => ({ meta: [{ title: "Settings — mybookEarn" }] }),
});

// ── Add Funds Modal ───────────────────────────────────────────────────────────
function AddFundsModal({ onClose, onSuccess }: { onClose: () => void; onSuccess: (message: string) => void }) {
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
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#dddfe2]">
          <h2 className="text-lg font-bold text-gray-900">Add funds</h2>
          <button onClick={onClose} className="p-1 hover:bg-[#f0f2f5] rounded-full transition">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="px-6 py-5 space-y-5">
          {/* Choose amount */}
          <div>
            <p className="text-base font-bold text-gray-900 mb-1">Choose amount</p>
            <p className="text-sm text-gray-500 mb-3">
              Choose an amount to add to your available funds. We'll deduct from your total as your ads run.
            </p>
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => selectPreset("a")}
                className={`px-4 py-2 rounded-md text-sm font-semibold border transition ${
                  preset === "a" ? "bg-[#00008B] text-white border-[#00008B]" : "border-[#dddfe2] text-gray-700 hover:bg-[#f0f2f5]"
                }`}
              >
                ₹ 24,780.00
              </button>
              <button
                onClick={() => selectPreset("b")}
                className={`px-4 py-2 rounded-md text-sm font-semibold border transition ${
                  preset === "b" ? "bg-[#00008B] text-white border-[#00008B]" : "border-[#dddfe2] text-gray-700 hover:bg-[#f0f2f5]"
                }`}
              >
                ₹ 49,560.00
              </button>
              <button
                onClick={() => selectPreset("other")}
                className={`px-4 py-2 rounded-md text-sm font-semibold border transition ${
                  preset === "other" ? "bg-[#00008B] text-white border-[#00008B]" : "border-[#dddfe2] text-gray-700 hover:bg-[#f0f2f5]"
                }`}
              >
                Other
              </button>
            </div>

            {/* Amount input */}
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

          {/* Add payment method */}
          <div>
            <p className="text-base font-bold text-gray-900 mb-3">Add payment method</p>
            <div className="space-y-3">
              {/* Debit/Credit card */}
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
                <input
                  type="radio"
                  name="paymethod"
                  checked={payMethod === "card"}
                  onChange={() => setPayMethod("card")}
                  className="h-4 w-4 accent-[#00008B]"
                />
              </label>

              {/* UPI */}
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
                <input
                  type="radio"
                  name="paymethod"
                  checked={payMethod === "upi"}
                  onChange={() => setPayMethod("upi")}
                  className="h-4 w-4 accent-[#00008B]"
                />
              </label>

              {/* Net Banking */}
              <label className="flex items-center justify-between cursor-pointer">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-gray-500" />
                  <span className="text-sm text-gray-700">Net Banking</span>
                </div>
                <input
                  type="radio"
                  name="paymethod"
                  checked={payMethod === "netbanking"}
                  onChange={() => setPayMethod("netbanking")}
                  className="h-4 w-4 accent-[#00008B]"
                />
              </label>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end px-6 py-4 border-t border-[#dddfe2]">
          <button
            onClick={() => {
              onSuccess(`Funds added successfully using ${payMethod === "card" ? "your card" : payMethod === "upi" ? "UPI" : "net banking"}.`);
              onClose();
            }}
            className="bg-[#00008B] hover:bg-[#00006B] text-white text-sm font-semibold px-8 py-2.5 rounded-full transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Toggle ────────────────────────────────────────────────────────────────────
function Toggle({ label, description, defaultOn = false }: { label: string; description: string; defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div className="flex items-start justify-between gap-4 py-3">
      <div>
        <p className="font-semibold text-sm">{label}</p>
        <p className="text-xs text-gray-400 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => setOn(!on)}
        className={`fb-toggle ${on ? "on" : "off"} shrink-0`}
      />
    </div>
  );
}

// ── Settings page ─────────────────────────────────────────────────────────────
function Settings() {
  const [showAddFunds, setShowAddFunds] = useState(false);
  const [billingTab, setBillingTab] = useState<"settings" | "activity">("settings");
  const [notice, setNotice] = useState("");
  const [paymentMethodAdded, setPaymentMethodAdded] = useState(false);

  return (
    <>
      <PageHeader title="Settings" subtitle="Preferences, billing and security." />

      {notice ? (
        <div className="mb-4 rounded-xl border border-[#d7f3df] bg-[#f4fff7] px-4 py-3 text-sm text-[#2e7d32]">
          {notice}
        </div>
      ) : null}

      <div className="grid lg:grid-cols-2 gap-4">
        {/* Notifications */}
        <ClayCard>
          <p className="font-semibold mb-2 text-gray-900">Notifications</p>
          <div className="divide-y divide-[#f0f2f5]">
            <Toggle label="Email digest" description="Weekly performance summary." defaultOn />
            <Toggle label="Campaign alerts" description="When a campaign changes status." defaultOn />
            <Toggle label="Budget warnings" description="Notify at 80% of daily budget." defaultOn />
            <Toggle label="Product updates" description="Occasional feature news." />
          </div>
        </ClayCard>

        {/* Security */}
        <ClayCard>
          <p className="font-semibold mb-3 text-gray-900">Security</p>
          <Field label="Current password"><Input type="password" placeholder="••••••••" /></Field>
          <div className="mt-3"><Field label="New password"><Input type="password" placeholder="At least 8 characters" /></Field></div>
          <div className="mt-4 flex justify-end"><PrimaryButton onClick={() => setNotice("Password updated successfully.")}>Update password</PrimaryButton></div>
          <div className="mt-4 border-t border-[#f0f2f5] pt-4">
            <Toggle label="Two-factor authentication" description="Require a code at sign-in." />
          </div>
        </ClayCard>

        {/* Billing & Payments — FB style */}
        <ClayCard className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <p className="font-bold text-gray-900 text-base">Billing &amp; payments</p>
              <div className="flex gap-1 border-b border-[#dddfe2]">
                <button
                  onClick={() => setBillingTab("settings")}
                  className={`px-3 py-2 text-sm font-medium border-b-2 transition ${billingTab === "settings" ? "border-[#00008B] text-[#00008B]" : "border-transparent text-gray-500 hover:text-gray-800"}`}
                >
                  Payment settings
                </button>
                <button
                  onClick={() => setBillingTab("activity")}
                  className={`px-3 py-2 text-sm font-medium border-b-2 transition ${billingTab === "activity" ? "border-[#00008B] text-[#00008B]" : "border-transparent text-gray-500 hover:text-gray-800"}`}
                >
                  Payment activity
                </button>
              </div>
            </div>
            <span className="text-xs text-gray-400 font-mono">205089202898...</span>
          </div>

          {billingTab === "settings" ? (
            <div className="grid md:grid-cols-3 gap-6">
              {/* Available funds */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Available funds</p>
                <p className="text-3xl font-bold text-gray-900">₹ 789.70</p>
                <button
                  onClick={() => setShowAddFunds(true)}
                  className="mt-3 bg-[#00008B] hover:bg-[#00006B] text-white text-sm font-semibold px-4 py-2 rounded-md transition"
                >
                  Add funds
                </button>
                <div className="mt-4 space-y-2 text-xs text-gray-500">
                  <p className="font-semibold text-gray-700">How you'll pay</p>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-[#42b72a]" />
                    Available funds
                  </div>
                  <p className="text-gray-400">We'll deduct funds as your ads run.</p>
                  <p>• Daily spending limit: <span className="text-gray-700 font-medium">₹ 5,000</span></p>
                  <p>• Your projected spend: <span className="text-gray-700 font-medium">₹ 3,540/day</span></p>
                </div>
              </div>

              {/* Payment method */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Payment method</p>
                <div className="border border-[#dddfe2] rounded-lg p-3 text-sm text-gray-500">
                  {paymentMethodAdded ? "Visa ending in 4242 • Primary payment method" : "You haven't added a payment method yet."}
                </div>
                <button
                  onClick={() => {
                    setPaymentMethodAdded(true);
                    setNotice("Payment method added successfully.");
                  }}
                  className="mt-3 text-sm text-[#00008B] font-semibold hover:underline"
                >
                  {paymentMethodAdded ? "+ Update payment method" : "+ Add payment method"}
                </button>
              </div>

              {/* Payment history */}
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">Payment history</p>
                <button
                  onClick={() => {
                    const blob = new Blob(["Receipt for mybookEarn Ads Manager\nDate: 8 Jul 2026\nAmount: ₹ 7,262.32\nStatus: Paid"], { type: "text/plain;charset=utf-8" });
                    const url = URL.createObjectURL(blob);
                    const link = document.createElement("a");
                    link.href = url;
                    link.download = "mybookearn-receipt.txt";
                    link.click();
                    URL.revokeObjectURL(url);
                    setNotice("Receipt downloaded successfully.");
                  }}
                  className="flex items-center gap-1.5 text-sm text-[#00008B] hover:underline"
                >
                  <Download className="h-3.5 w-3.5" /> Download last receipt
                </button>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Help Centre</p>
                  <div className="space-y-1.5 text-sm text-[#00008B]">
                    {["Troubleshoot billing and payments", "How ads billing works", "What to do if your payment fails", "Open Help Centre"].map((t) => (
                      <button key={t} className="flex items-center gap-1.5 hover:underline w-full text-left">
                        <HelpCircle className="h-3.5 w-3.5 shrink-0" /> {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Payment activity tab */
            <div>
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
                  {[
                    { date: "6 Jul 2026", desc: "Prepaid balance", amount: "₹ 7,262.32", status: "Paid" },
                    { date: "29 Jun 2026", desc: "Prepaid balance", amount: "₹ 4,775.00", status: "Paid" },
                    { date: "22 Jun 2026", desc: "Prepaid balance", amount: "₹ 3,200.00", status: "Paid" },
                  ].map((row) => (
                    <tr key={row.date} className="border-b border-[#f0f2f5] hover:bg-[#f7f8fa]">
                      <td className="py-3 text-gray-700">{row.date}</td>
                      <td className="py-3 text-gray-700">{row.desc}</td>
                      <td className="py-3 text-right text-gray-900 font-medium">{row.amount}</td>
                      <td className="py-3 text-right">
                        <span className="text-xs bg-[#e7f3ff] text-[#00008B] font-semibold px-2 py-0.5 rounded-full">{row.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </ClayCard>

        {/* Appearance */}
        <ClayCard>
          <p className="font-semibold mb-2 text-gray-900">Appearance</p>
          <p className="text-sm text-gray-400">Choose how mybookEarn looks in your browser.</p>
          <div className="mt-4 grid grid-cols-3 gap-3">
            {["Light", "Dark", "System"].map((t, i) => (
              <button key={t} className={`border rounded-lg p-4 text-sm font-semibold text-gray-700 hover:bg-[#f0f2f5] transition ${i === 0 ? "border-[#00008B] text-[#00008B]" : "border-[#dddfe2]"}`}>{t}</button>
            ))}
          </div>
        </ClayCard>
      </div>

      {showAddFunds && <AddFundsModal onClose={() => setShowAddFunds(false)} onSuccess={setNotice} />}
    </>
  );
}
