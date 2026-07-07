import { Link, useRouterState } from "@tanstack/react-router";
import { motion } from "framer-motion";
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
} from "lucide-react";
import { useState } from "react";
import { Logo } from "./Logo";
import { useAuth } from "@/hooks/useAuth";

const items = [
  { to: "/app", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/app/campaigns", label: "Campaigns", icon: Megaphone },
  { to: "/app/adsets", label: "Ad Sets", icon: Layers },
  { to: "/app/ads", label: "Ads", icon: ImageIcon },
  { to: "/app/audiences", label: "Audiences", icon: Users },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/notifications", label: "Notifications", icon: Bell },
  { to: "/app/profile", label: "Profile", icon: User },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

export function Sidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const { logout, session } = useAuth();

  const nav = (
    <nav className="flex h-full flex-col gap-1 p-4">
      <div className="mb-6 px-2">
        <Logo />
      </div>
      <div className="flex-1 space-y-1">
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
              className={`relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                active
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-primary hover:bg-sidebar-accent"
              }`}
            >
              {active && (
                <motion.div
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-xl clay-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon className="relative z-10 h-4 w-4" />
              <span className="relative z-10">{item.label}</span>
            </Link>
          );
        })}
      </div>
      <div className="mt-4 rounded-2xl clay-sm p-3">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-9 w-9 rounded-full clay-primary grid place-items-center text-sm font-bold">
            {(session?.name || "U").charAt(0).toUpperCase()}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{session?.name}</p>
            <p className="text-xs text-muted-foreground truncate">{session?.email}</p>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs font-semibold text-primary hover:bg-accent transition-colors"
        >
          <LogOut className="h-3.5 w-3.5" /> Sign out
        </button>
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur border-b">
        <Logo />
        <button
          onClick={() => setOpen(true)}
          className="p-2 rounded-lg clay-sm"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-64 shrink-0 sticky top-0 h-screen border-r border-sidebar-border bg-sidebar">
        {nav}
      </aside>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-primary/40 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            className="absolute left-0 top-0 h-full w-72 bg-sidebar shadow-xl"
          >
            <button
              onClick={() => setOpen(false)}
              className="absolute right-3 top-3 p-2 rounded-lg"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
            {nav}
          </motion.aside>
        </div>
      )}
    </>
  );
}
