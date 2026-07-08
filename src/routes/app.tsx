import { createFileRoute, Outlet, useNavigate, Link, useRouterState } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader } from "@/components/Loader";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard, Megaphone, Layers, Image as ImageIcon, Users,
  BarChart3, Bell, User, Settings, LogOut, Menu, X, CreditCard,
} from "lucide-react";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; exact?: boolean };
const navItems: NavItem[] = [
  { to: "/app",               label: "Overview",      icon: LayoutDashboard, exact: true },
  { to: "/app/campaigns",     label: "Campaigns",     icon: Megaphone },
  { to: "/app/adsets",        label: "Ad Sets",       icon: Layers },
  { to: "/app/ads",           label: "Ads",           icon: ImageIcon },
  { to: "/app/audiences",     label: "Audiences",     icon: Users },
  { to: "/app/analytics",     label: "Analytics",     icon: BarChart3 },
  { to: "/app/billing",       label: "Billing",       icon: CreditCard },
  { to: "/app/notifications", label: "Notifications", icon: Bell },
  { to: "/app/profile",       label: "Profile",       icon: User },
  { to: "/app/settings",      label: "Settings",      icon: Settings },
];

/* ── Icon Sidebar ─────────────────────────────────────────────────────────── */
function IconSidebar() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  function SidebarContent({ inDrawer = false }: { inDrawer?: boolean }) {
    return (
      <div className="flex flex-col h-full py-3 gap-0.5 overflow-hidden">
        {navItems.map((item, i) => {
          const active = item.exact
            ? pathname === item.to
            : pathname === item.to || pathname.startsWith(item.to + "/");
          const Icon = item.icon;
          return (
            <motion.div
              key={item.to}
              initial={false}
            >
              <Link
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className={`relative flex items-center gap-3 mx-2 px-2.5 py-2.5 rounded-xl transition-all duration-200 ${
                  active ? "sidebar-icon-active" : "text-gray-400 hover:bg-[#f0f2f5] hover:text-gray-700"
                }`}
              >
                {active && (
                  <motion.div
                    layoutId="sidebar-pill"
                    className="absolute inset-0 rounded-xl sidebar-icon-active"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <Icon className="relative z-10 h-5 w-5 shrink-0" />
                <AnimatePresence>
                  {(expanded || inDrawer) && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.1 }}
                      className="relative z-10 text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
              </Link>
            </motion.div>
          );
        })}

        <div className="mt-auto">
          <button
            onClick={logout}
            className={`flex items-center gap-3 mx-2 px-2.5 py-2.5 rounded-xl w-[calc(100%-16px)] text-gray-400 hover:bg-red-50 hover:text-red-500 transition-all duration-200`}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            <AnimatePresence>
              {(expanded || inDrawer) && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  className="text-sm font-medium whitespace-nowrap overflow-hidden"
                >
                  Sign out
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Mobile hamburger */}
      <button
        className="lg:hidden fixed top-3 left-3 z-50 p-2 bg-white rounded-xl border border-[#dddfe2] shadow-sm"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="h-5 w-5 text-gray-700" />
      </button>

      {/* Desktop: hover-to-expand rail */}
      <motion.aside
        className="hidden lg:flex flex-col shrink-0 sticky top-0 h-[calc(100vh-52px)] border-r border-[#dddfe2] bg-white overflow-hidden z-30"
        animate={{ width: expanded ? 220 : 60 }}
        transition={{ type: "tween", duration: 0.15, ease: "easeOut" }}
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
      >
        <SidebarContent />
      </motion.aside>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-40">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -220 }}
              animate={{ x: 0 }}
              exit={{ x: -220 }}
              transition={{ type: "spring", stiffness: 400, damping: 32 }}
              className="absolute left-0 top-0 h-full w-[200px] bg-white border-r border-[#dddfe2] shadow-xl"
            >
              <button className="absolute right-2 top-2 p-1 hover:bg-[#f0f2f5] rounded-lg" onClick={() => setMobileOpen(false)}>
                <X className="h-4 w-4 text-gray-400" />
              </button>
              <SidebarContent inDrawer />
            </motion.aside>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ── Top Bar ──────────────────────────────────────────────────────────────── */
function TopBar() {
  const { session } = useAuth();

  return (
    <div className="fb-topbar">
      <Link to="/app" className="hidden lg:block shrink-0 mr-2">
        <img src="/logo1.png" alt="mybookEarn" className="h-35 w-50 object-contain" />
      </Link>

      <div className="flex items-center gap-1.5 ml-auto">
        <motion.button
          whileHover={{ scale: 1.08 }}
          className="h-8 w-8 rounded-full bg-gradient-to-br from-[#00008B] to-[#2929a3] grid place-items-center text-white text-xs font-bold shadow-md shadow-indigo-200"
        >
          {(session?.name || "M").charAt(0).toUpperCase()}
        </motion.button>
      </div>
    </div>
  );
}

/* ── App Layout ───────────────────────────────────────────────────────────── */
function AppLayout() {
  const { isAuthed } = useAuth();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setChecked(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!checked) return;
    if (!isAuthed) {
      navigate({ to: "/sign-in" });
    } else {
      const t = setTimeout(() => setReady(true), 200);
      return () => clearTimeout(t);
    }
  }, [checked, isAuthed, navigate]);

  if (!checked || !isAuthed || !ready) return <Loader fullscreen label="Loading workspace" />;

  return (
    <div className="min-h-screen flex flex-col bg-[#f0f2f5]">
      <TopBar />
      <div className="flex flex-1 min-h-0">
        <IconSidebar />
        <main className="flex-1 min-w-0 overflow-auto">
          <motion.div
            key="main-content"
            className="page-enter w-full px-4 py-4 md:px-6 md:py-6 lg:px-8 lg:py-8"
          >
            <Outlet />
          </motion.div>
        </main>
      </div>
    </div>
  );
}
