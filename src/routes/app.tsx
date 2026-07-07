import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Loader } from "@/components/Loader";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

function AppLayout() {
  const { isAuthed } = useAuth();
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!isAuthed) {
      navigate({ to: "/sign-in" });
    } else {
      const t = setTimeout(() => setReady(true), 250);
      return () => clearTimeout(t);
    }
  }, [isAuthed, navigate]);

  if (!isAuthed || !ready) return <Loader fullscreen label="Loading workspace" />;

  return (
    <div className="min-h-screen flex" style={{ background: "var(--gradient-hero)" }}>
      <Sidebar />
      <main className="flex-1 min-w-0">
        <div className="max-w-7xl mx-auto p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
