import { Link, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Megaphone,
  Layers,
  Image as ImageIcon,
  Users,
  BarChart3,
  Bell,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { useAuth } from "@/hooks/useAuth";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };

const items: NavItem[] = [
  { to: "/app", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/app/campaigns", label: "Campaigns", icon: Megaphone },
  { to: "/app/adsets", label: "Ad Sets", icon: Layers },
  { to: "/app/ads", label: "Ads", icon: ImageIcon },
  { to: "/app/audiences", label: "Audiences", icon: Users },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/notifications", label: "Notifications", icon: Bell },
  { to: "/app/profile", label: "Profile", icon: User },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const { logout, session } = useAuth();

  const nav = (
    <nav className="flex h-full flex-col">
      {/* Logo area */}
      <div className="px-4 py-4 border-b border-[#dddfe2]">
        <Logo />
      </div>

      {/* Account info pill */}
      <div className="mx-3 mt-3 mb-1 px-3 py-2.5 rounded-lg bg-[#e7f3ff] border border-[#00008B]/20">
        <p className="text-[10px] uppercase tracking-widest text-[#00008B] font-semibold">Ad Account</p>
        <p className="text-sm font-semibold text-gray-800 truncate mt-0.5">{session?.name || "mybookEarn"}</p>
        <p className="text-xs text-gray-500 truncate">{session?.email}</p>
      </div>

      {/* Nav items */}
      <div className="flex-1 px-2 py-2 space-y-0.5 overflow-y-auto">
        {items.map((item) => {
          const active = item.exact
            ? pathname === item.to
            : pathname === item.to || pathname.startsWith(item.to + "/");
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all group ${
                active
                  ? "bg-[#e7f3ff] text-[#00008B]"
                  : "text-gray-700 hover:bg-[#f0f2f5] hover:text-gray-900"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-4 w-4 shrink-0 ${active ? "text-[#00008B]" : "text-gray-500 group-hover:text-gray-700"}`} />
                <span>{item.label}</span>
              </div>
              {active && <ChevronRight className="h-3.5 w-3.5 text-[#00008B]" />}
            </Link>
          );
        })}
      </div>

      {/* Sign out */}
      <div className="p-3 border-t border-[#dddfe2]">
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-[#f0f2f5] hover:text-gray-900 transition"
        >
          <LogOut className="h-4 w-4 text-gray-500" />
          Sign out
        </button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-white border-b border-[#dddfe2] shadow-sm">
        <Logo />
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg hover:bg-[#f0f2f5] transition"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5 text-gray-700" />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-60 shrink-0 sticky top-[56px] h-[calc(100vh-56px)] border-r border-[#dddfe2] bg-white overflow-y-auto">
        {nav}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute left-0 top-0 h-full w-64 bg-white shadow-xl">
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 p-2 rounded-lg hover:bg-[#f0f2f5]"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            {nav}
          </aside>
        </div>
      )}
    </>
  );
}
