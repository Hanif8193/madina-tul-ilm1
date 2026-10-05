"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { DICTS, DIRECTIONS, type Dict, type Lang } from "@/lib/i18n";

type LanguageContextValue = {
  lang: Lang;
  dir: "ltr" | "rtl";
  t: Dict;
  setLang: (lang: Lang) => void;
  toggle: () => void;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = "mti-lang";

function isLang(value: string | null): value is Lang {
  return value === "en" || value === "ur";
}

// The active language lives in localStorage, so it is treated as an external
// store rather than React state. useSyncExternalStore lets React restore the
// saved preference without a setState-in-effect cascade: the server (and the
// hydration render) uses getServerSnapshot, and React swaps in the client
// snapshot once hydration finishes — same visible result as restoring in an
// effect, without the cascading render.
function readStoredLang(): Lang {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLang(stored) ? stored : "en";
  } catch {
    // Private-mode / storage-disabled browsers fall back to English.
    return "en";
  }
}

function getServerLang(): Lang {
  return "en";
}

const subscribers = new Set<() => void>();

function subscribe(onStoreChange: () => void) {
  subscribers.add(onStoreChange);
  // Keep other tabs in sync.
  window.addEventListener("storage", onStoreChange);
  return () => {
    subscribers.delete(onStoreChange);
    window.removeEventListener("storage", onStoreChange);
  };
}

function persistLang(next: Lang) {
  window.localStorage.setItem(STORAGE_KEY, next);
  subscribers.forEach((onStoreChange) => onStoreChange());
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const lang = useSyncExternalStore(subscribe, readStoredLang, getServerLang);

  // Keep <html> in sync with the active language (RTL flip lives here).
  // Persistence happens in persistLang, so no extra localStorage write.
  useEffect(() => {
    const root = document.documentElement;
    root.lang = lang;
    root.dir = DIRECTIONS[lang];
  }, [lang]);

  const setLang = useCallback((next: Lang) => persistLang(next), []);
  const toggle = useCallback(
    () => persistLang(lang === "en" ? "ur" : "en"),
    [lang],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, dir: DIRECTIONS[lang], t: DICTS[lang], setLang, toggle }),
    [lang, setLang, toggle],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLang must be used inside <LanguageProvider>");
  }
  return ctx;
}
