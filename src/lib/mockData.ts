export type Status = "Active" | "Paused" | "Draft" | "Completed";
export type Objective =
  | "Awareness"
  | "Traffic"
  | "Engagement"
  | "Leads"
  | "App Promotion"
  | "Sales";

export interface Campaign {
  id: string;
  name: string;
  status: Status;
  objective: Objective;
  budget: number;
  spend: number;
  reach: number;
  impressions: number;
  clicks: number;
  ctr: number;
  results: number;
  costPerResult: number;
  startDate: string;
}

export interface AdSet {
  id: string;
  name: string;
  campaign: string;
  status: Status;
  audience: string;
  placement: string;
  budget: number;
  spend: number;
  reach: number;
}

export interface Ad {
  id: string;
  name: string;
  adSet: string;
  status: Status;
  format: "Image" | "Video" | "Carousel" | "Story";
  ctr: number;
  spend: number;
  results: number;
}

export interface Audience {
  id: string;
  name: string;
  size: number;
  type: "Custom" | "Lookalike" | "Saved";
  updated: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  tone: "info" | "success" | "warning" | "danger";
}

const rand = (min: number, max: number) => Math.round(min + Math.random() * (max - min));

const objectives: Objective[] = ["Awareness", "Traffic", "Engagement", "Leads", "App Promotion", "Sales"];
const statuses: Status[] = ["Active", "Active", "Active", "Paused", "Draft", "Completed"];
const names = [
  "Summer Book Launch",
  "Holiday Rewards Drive",
  "Referral Boost Q3",
  "Author Spotlight Series",
  "Reader Loyalty Push",
  "New User Onboarding",
  "Weekend Flash Sale",
  "Premium Upgrade Funnel",
];

export const campaigns: Campaign[] = names.map((n, i) => {
  const spend = rand(1200, 18000);
  const impressions = rand(50000, 900000);
  const clicks = rand(800, 24000);
  const results = rand(50, 2400);
  return {
    id: `c_${i + 1}`,
    name: n,
    status: statuses[i % statuses.length],
    objective: objectives[i % objectives.length],
    budget: rand(2000, 25000),
    spend,
    reach: rand(20000, 700000),
    impressions,
    clicks,
    ctr: +(clicks / impressions * 100).toFixed(2),
    results,
    costPerResult: +(spend / results).toFixed(2),
    startDate: new Date(Date.now() - rand(2, 90) * 864e5).toISOString().slice(0, 10),
  };
});

export const adSets: AdSet[] = Array.from({ length: 12 }).map((_, i) => ({
  id: `as_${i + 1}`,
  name: `Ad Set ${i + 1} — ${["Broad", "Interest", "Retarget", "Lookalike"][i % 4]}`,
  campaign: campaigns[i % campaigns.length].name,
  status: statuses[i % statuses.length],
  audience: ["Book lovers 25-44", "Readers US", "App visitors 30d", "LAL 1% purchasers"][i % 4],
  placement: ["Feed", "Reels", "Stories", "Search"][i % 4],
  budget: rand(200, 4000),
  spend: rand(120, 3200),
  reach: rand(4000, 120000),
}));

export const ads: Ad[] = Array.from({ length: 16 }).map((_, i) => ({
  id: `ad_${i + 1}`,
  name: `Creative ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
  adSet: adSets[i % adSets.length].name,
  status: statuses[i % statuses.length],
  format: (["Image", "Video", "Carousel", "Story"] as const)[i % 4],
  ctr: +(Math.random() * 4 + 0.3).toFixed(2),
  spend: rand(50, 2400),
  results: rand(5, 400),
}));

export const audiences: Audience[] = [
  { id: "a1", name: "Website Visitors 30d", size: 128_400, type: "Custom", updated: "2h ago" },
  { id: "a2", name: "App Users LAL 1%", size: 2_400_000, type: "Lookalike", updated: "1d ago" },
  { id: "a3", name: "Purchasers 180d", size: 42_100, type: "Custom", updated: "5h ago" },
  { id: "a4", name: "Book Lovers — US", size: 3_800_000, type: "Saved", updated: "3d ago" },
  { id: "a5", name: "Newsletter Subs", size: 84_900, type: "Custom", updated: "12h ago" },
  { id: "a6", name: "High-value LAL 2%", size: 4_100_000, type: "Lookalike", updated: "2d ago" },
];

export const notifications: Notification[] = [
  { id: "n1", title: "Campaign approved", body: "Summer Book Launch is now delivering.", time: "5m", read: false, tone: "success" },
  { id: "n2", title: "Budget 80% spent", body: "Holiday Rewards Drive reached 80% of daily budget.", time: "1h", read: false, tone: "warning" },
  { id: "n3", title: "New audience insight", body: "LAL 1% purchasers is outperforming by 34%.", time: "3h", read: true, tone: "info" },
  { id: "n4", title: "Payment method expiring", body: "Update your card ending 4242 before Aug 30.", time: "1d", read: false, tone: "danger" },
  { id: "n5", title: "Weekly report ready", body: "Your performance summary is available.", time: "2d", read: true, tone: "info" },
];

export const performanceSeries = Array.from({ length: 14 }).map((_, i) => ({
  day: `D${i + 1}`,
  spend: rand(400, 2200),
  reach: rand(8000, 40000),
  clicks: rand(200, 1600),
  results: rand(20, 240),
}));

export const objectiveBreakdown = objectives.map((o) => ({
  name: o,
  value: rand(8, 40),
}));

export const summary = {
  reach: campaigns.reduce((a, c) => a + c.reach, 0),
  impressions: campaigns.reduce((a, c) => a + c.impressions, 0),
  spend: campaigns.reduce((a, c) => a + c.spend, 0),
  results: campaigns.reduce((a, c) => a + c.results, 0),
  activeCampaigns: campaigns.filter((c) => c.status === "Active").length,
};

export const formatNumber = (n: number) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
};
export const formatMoney = (n: number) =>
  "$" + n.toLocaleString(undefined, { maximumFractionDigits: 0 });
