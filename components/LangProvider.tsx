"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { copy, type Copy, type Lang } from "@/lib/copy";

type Ctx = { lang: Lang; c: Copy; setLang: (l: Lang) => void };

const LangCtx = createContext<Ctx | null>(null);

const STORAGE_KEY = "artex-lang";
const DEFAULT_LANG: Lang = "en";

function isLang(v: unknown): v is Lang {
  return v === "en" || v === "zh";
}

/**
 * 站点默认英文（也是静态产物里的语言），切换结果记在 localStorage，
 * 也接受 ?lang=zh 深链。首屏为英文，客户端挂载后再切换，避免 SSR 抖动。
 */
export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Lang>(DEFAULT_LANG);

  useEffect(() => {
    let next: Lang = DEFAULT_LANG;

    const query = new URLSearchParams(window.location.search).get("lang");
    if (isLang(query)) {
      next = query;
      try {
        window.localStorage.setItem(STORAGE_KEY, query);
      } catch {
        /* 隐私模式下忽略 */
      }
    } else {
      try {
        const saved = window.localStorage.getItem(STORAGE_KEY);
        if (isLang(saved)) next = saved;
      } catch {
        /* ignore */
      }
    }

    document.documentElement.lang = copy[next].htmlLang;
    if (next !== DEFAULT_LANG) setLangState(next);
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    document.documentElement.lang = copy[l].htmlLang;
    try {
      window.localStorage.setItem(STORAGE_KEY, l);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<Ctx>(() => ({ lang, c: copy[lang], setLang }), [lang, setLang]);

  return <LangCtx.Provider value={value}>{children}</LangCtx.Provider>;
}

export function useI18n(): Ctx {
  const v = useContext(LangCtx);
  if (!v) throw new Error("useI18n must be used inside <LangProvider>");
  return v;
}
