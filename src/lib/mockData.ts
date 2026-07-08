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
  impressions: number;
  clicks: number;
  ctr: number;
  costPerResult: number;
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

export const campaigns: Campaign[] = [
  { id: "c_1", name: "Summer Book Launch", status: "Active", objective: "Awareness", budget: 12000, spend: 8420, reach: 340000, impressions: 620000, clicks: 14200, ctr: 2.29, results: 1840, costPerResult: 4.58, startDate: "2026-06-01" },
  { id: "c_2", name: "Holiday Rewards Drive", status: "Active", objective: "Traffic", budget: 18000, spend: 14300, reach: 510000, impressions: 890000, clicks: 21000, ctr: 2.36, results: 2100, costPerResult: 6.81, startDate: "2026-05-15" },
  { id: "c_3", name: "Referral Boost Q3", status: "Active", objective: "Engagement", budget: 8000, spend: 5600, reach: 210000, impressions: 380000, clicks: 9400, ctr: 2.47, results: 940, costPerResult: 5.96, startDate: "2026-06-10" },
  { id: "c_4", name: "Author Spotlight Series", status: "Paused", objective: "Leads", budget: 6000, spend: 3200, reach: 98000, impressions: 175000, clicks: 4100, ctr: 2.34, results: 410, costPerResult: 7.80, startDate: "2026-04-20" },
  { id: "c_5", name: "Reader Loyalty Push", status: "Draft", objective: "App Promotion", budget: 5000, spend: 0, reach: 0, impressions: 0, clicks: 0, ctr: 0, results: 0, costPerResult: 0, startDate: "2026-07-01" },
  { id: "c_6", name: "New User Onboarding", status: "Completed", objective: "Sales", budget: 10000, spend: 9800, reach: 420000, impressions: 760000, clicks: 18200, ctr: 2.39, results: 1820, costPerResult: 5.38, startDate: "2026-03-01" },
  { id: "c_7", name: "Weekend Flash Sale", status: "Active", objective: "Awareness", budget: 3000, spend: 2100, reach: 88000, impressions: 160000, clicks: 3800, ctr: 2.38, results: 380, costPerResult: 5.53, startDate: "2026-06-20" },
  { id: "c_8", name: "Premium Upgrade Funnel", status: "Paused", objective: "Traffic", budget: 15000, spend: 7400, reach: 280000, impressions: 510000, clicks: 12000, ctr: 2.35, results: 1200, costPerResult: 6.17, startDate: "2026-05-01" },
];

export const adSets: AdSet[] = [
  { id: "as_1",  name: "Ad Set 1 — Broad",     campaign: "Summer Book Launch",      status: "Active",    audience: "Book lovers 25-44",    placement: "Feed",    budget: 2000, spend: 1400, reach: 62000,  impressions: 112000, clicks: 2560, ctr: 2.29, costPerResult: 4.58 },
  { id: "as_2",  name: "Ad Set 2 — Interest",  campaign: "Holiday Rewards Drive",   status: "Active",    audience: "Readers US",           placement: "Reels",   budget: 3500, spend: 2800, reach: 98000,  impressions: 176000, clicks: 4150, ctr: 2.36, costPerResult: 6.81 },
  { id: "as_3",  name: "Ad Set 3 — Retarget",  campaign: "Referral Boost Q3",       status: "Active",    audience: "App visitors 30d",     placement: "Stories", budget: 1800, spend: 1200, reach: 41000,  impressions: 74000,  clicks: 1830, ctr: 2.47, costPerResult: 5.96 },
  { id: "as_4",  name: "Ad Set 4 — Lookalike", campaign: "Author Spotlight Series", status: "Paused",    audience: "LAL 1% purchasers",    placement: "Search",  budget: 2500, spend: 1600, reach: 54000,  impressions: 97000,  clicks: 2270, ctr: 2.34, costPerResult: 7.80 },
  { id: "as_5",  name: "Ad Set 5 — Broad",     campaign: "Reader Loyalty Push",     status: "Draft",     audience: "Book lovers 25-44",    placement: "Feed",    budget: 1200, spend: 0,    reach: 0,      impressions: 0,      clicks: 0,    ctr: 0,    costPerResult: 0 },
  { id: "as_6",  name: "Ad Set 6 — Interest",  campaign: "New User Onboarding",     status: "Completed", audience: "Readers US",           placement: "Reels",   budget: 3000, spend: 2950, reach: 110000, impressions: 198000, clicks: 4730, ctr: 2.39, costPerResult: 5.38 },
  { id: "as_7",  name: "Ad Set 7 — Retarget",  campaign: "Weekend Flash Sale",      status: "Active",    audience: "App visitors 30d",     placement: "Stories", budget: 900,  spend: 620,  reach: 22000,  impressions: 39600,  clicks: 940,  ctr: 2.38, costPerResult: 5.53 },
  { id: "as_8",  name: "Ad Set 8 — Lookalike", campaign: "Premium Upgrade Funnel",  status: "Paused",    audience: "LAL 1% purchasers",    placement: "Search",  budget: 4000, spend: 1800, reach: 68000,  impressions: 122000, clicks: 2870, ctr: 2.35, costPerResult: 6.17 },
  { id: "as_9",  name: "Ad Set 9 — Broad",     campaign: "Summer Book Launch",      status: "Active",    audience: "Book lovers 25-44",    placement: "Feed",    budget: 2200, spend: 1550, reach: 71000,  impressions: 127800, clicks: 3010, ctr: 2.36, costPerResult: 4.70 },
  { id: "as_10", name: "Ad Set 10 — Interest", campaign: "Holiday Rewards Drive",   status: "Active",    audience: "Readers US",           placement: "Reels",   budget: 3800, spend: 3100, reach: 105000, impressions: 189000, clicks: 4460, ctr: 2.36, costPerResult: 6.50 },
  { id: "as_11", name: "Ad Set 11 — Retarget", campaign: "Referral Boost Q3",       status: "Active",    audience: "App visitors 30d",     placement: "Stories", budget: 1600, spend: 1100, reach: 38000,  impressions: 68400,  clicks: 1690, ctr: 2.47, costPerResult: 5.80 },
  { id: "as_12", name: "Ad Set 12 — Lookalike",campaign: "Author Spotlight Series", status: "Paused",    audience: "LAL 1% purchasers",    placement: "Search",  budget: 2800, spend: 1400, reach: 49000,  impressions: 88200,  clicks: 2060, ctr: 2.34, costPerResult: 7.50 },
];

export const ads: Ad[] = [
  { id: "ad_1",  name: "Creative A1",  adSet: adSets[0].name,  status: "Active",    format: "Image",    ctr: 2.41, spend: 820,  results: 164 },
  { id: "ad_2",  name: "Creative B2",  adSet: adSets[1].name,  status: "Active",    format: "Video",    ctr: 3.12, spend: 1400, results: 280 },
  { id: "ad_3",  name: "Creative C3",  adSet: adSets[2].name,  status: "Active",    format: "Carousel", ctr: 1.98, spend: 600,  results: 120 },
  { id: "ad_4",  name: "Creative D4",  adSet: adSets[3].name,  status: "Paused",    format: "Story",    ctr: 2.75, spend: 950,  results: 190 },
  { id: "ad_5",  name: "Creative E5",  adSet: adSets[4].name,  status: "Draft",     format: "Image",    ctr: 0,    spend: 0,    results: 0 },
  { id: "ad_6",  name: "Creative F6",  adSet: adSets[5].name,  status: "Completed", format: "Video",    ctr: 2.88, spend: 2100, results: 420 },
  { id: "ad_7",  name: "Creative G7",  adSet: adSets[6].name,  status: "Active",    format: "Carousel", ctr: 2.20, spend: 480,  results: 96 },
  { id: "ad_8",  name: "Creative H8",  adSet: adSets[7].name,  status: "Paused",    format: "Story",    ctr: 1.65, spend: 720,  results: 144 },
  { id: "ad_9",  name: "Creative I9",  adSet: adSets[8].name,  status: "Active",    format: "Image",    ctr: 2.55, spend: 910,  results: 182 },
  { id: "ad_10", name: "Creative J10", adSet: adSets[9].name,  status: "Active",    format: "Video",    ctr: 3.40, spend: 1650, results: 330 },
  { id: "ad_11", name: "Creative K11", adSet: adSets[10].name, status: "Active",    format: "Carousel", ctr: 2.10, spend: 540,  results: 108 },
  { id: "ad_12", name: "Creative L12", adSet: adSets[11].name, status: "Paused",    format: "Story",    ctr: 1.80, spend: 680,  results: 136 },
  { id: "ad_13", name: "Creative M13", adSet: adSets[0].name,  status: "Active",    format: "Image",    ctr: 2.62, spend: 870,  results: 174 },
  { id: "ad_14", name: "Creative N14", adSet: adSets[1].name,  status: "Active",    format: "Video",    ctr: 3.05, spend: 1320, results: 264 },
  { id: "ad_15", name: "Creative O15", adSet: adSets[2].name,  status: "Active",    format: "Carousel", ctr: 2.30, spend: 590,  results: 118 },
  { id: "ad_16", name: "Creative P16", adSet: adSets[3].name,  status: "Paused",    format: "Story",    ctr: 1.92, spend: 760,  results: 152 },
];

export const audiences: Audience[] = [
  { id: "a1", name: "Website Visitors 30d", size: 128_400, type: "Custom",    updated: "2h ago" },
  { id: "a2", name: "App Users LAL 1%",     size: 2_400_000, type: "Lookalike", updated: "1d ago" },
  { id: "a3", name: "Purchasers 180d",      size: 42_100,  type: "Custom",    updated: "5h ago" },
  { id: "a4", name: "Book Lovers — US",     size: 3_800_000, type: "Saved",     updated: "3d ago" },
  { id: "a5", name: "Newsletter Subs",      size: 84_900,  type: "Custom",    updated: "12h ago" },
  { id: "a6", name: "High-value LAL 2%",    size: 4_100_000, type: "Lookalike", updated: "2d ago" },
];

export const notifications: Notification[] = [
  { id: "n1", title: "Campaign approved",       body: "Summer Book Launch is now delivering.",                  time: "5m", read: false, tone: "success" },
  { id: "n2", title: "Budget 80% spent",        body: "Holiday Rewards Drive reached 80% of daily budget.",    time: "1h", read: false, tone: "warning" },
  { id: "n3", title: "New audience insight",    body: "LAL 1% purchasers is outperforming by 34%.",            time: "3h", read: true,  tone: "info" },
  { id: "n4", title: "Payment method expiring", body: "Update your card ending 4242 before Aug 30.",           time: "1d", read: false, tone: "danger" },
  { id: "n5", title: "Weekly report ready",     body: "Your performance summary is available.",                time: "2d", read: true,  tone: "info" },
];

export const performanceSeries = [
  { day: "D1",  spend: 820,  reach: 18200, clicks: 420,  results: 42 },
  { day: "D2",  spend: 940,  reach: 21000, clicks: 510,  results: 51 },
  { day: "D3",  spend: 760,  reach: 16800, clicks: 380,  results: 38 },
  { day: "D4",  spend: 1100, reach: 24500, clicks: 620,  results: 62 },
  { day: "D5",  spend: 1340, reach: 29800, clicks: 780,  results: 78 },
  { day: "D6",  spend: 980,  reach: 21800, clicks: 490,  results: 49 },
  { day: "D7",  spend: 1560, reach: 34600, clicks: 920,  results: 92 },
  { day: "D8",  spend: 1280, reach: 28400, clicks: 710,  results: 71 },
  { day: "D9",  spend: 1720, reach: 38200, clicks: 1040, results: 104 },
  { day: "D10", spend: 1450, reach: 32200, clicks: 860,  results: 86 },
  { day: "D11", spend: 1900, reach: 42200, clicks: 1180, results: 118 },
  { day: "D12", spend: 1640, reach: 36400, clicks: 980,  results: 98 },
  { day: "D13", spend: 2100, reach: 46600, clicks: 1340, results: 134 },
  { day: "D14", spend: 1820, reach: 40400, clicks: 1100, results: 110 },
];

export const objectiveBreakdown = [
  { name: "Awareness",      value: 28 },
  { name: "Traffic",        value: 35 },
  { name: "Engagement",     value: 18 },
  { name: "Leads",          value: 12 },
  { name: "App Promotion",  value: 22 },
  { name: "Sales",          value: 30 },
];

export const summary = {
  reach:            campaigns.reduce((a, c) => a + c.reach, 0),
  impressions:      campaigns.reduce((a, c) => a + c.impressions, 0),
  spend:            campaigns.reduce((a, c) => a + c.spend, 0),
  results:          campaigns.reduce((a, c) => a + c.results, 0),
  activeCampaigns:  campaigns.filter((c) => c.status === "Active").length,
};

export const formatNumber = (n: number) => {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return String(n);
};

export const formatMoney = (n: number) =>
  "$" + n.toLocaleString("en-US", { maximumFractionDigits: 0 });
