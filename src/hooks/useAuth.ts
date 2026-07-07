import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";

const KEY = "mybookearn.session";

export interface Session {
  email: string;
  name: string;
  loggedInAt: number;
}

function read(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function useAuth() {
  const [session, setSession] = useState<Session | null>(() => read());
  const navigate = useNavigate();

  useEffect(() => {
    const onStorage = () => setSession(read());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const login = useCallback(
    async (email: string, _password: string) => {
      await new Promise((r) => setTimeout(r, 700));
      const s: Session = {
        email,
        name: email.split("@")[0].replace(/[^a-z]/gi, " ").trim() || "Marketer",
        loggedInAt: Date.now(),
      };
      localStorage.setItem(KEY, JSON.stringify(s));
      setSession(s);
      return s;
    },
    []
  );

  const signup = useCallback(async (name: string, email: string, _password: string) => {
    await new Promise((r) => setTimeout(r, 800));
    const s: Session = { email, name: name || "Marketer", loggedInAt: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(s));
    setSession(s);
    return s;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(KEY);
    setSession(null);
    navigate({ to: "/" });
  }, [navigate]);

  return { session, isAuthed: !!session, login, signup, logout };
}
