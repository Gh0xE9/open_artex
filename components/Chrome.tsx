"use client";

import Link from "next/link";
import { useI18n } from "@/components/LangProvider";

const REPO = "https://github.com/Gh0xE9/open_artex";

export function LangSwitch() {
  const { lang, c, setLang } = useI18n();
  return (
    <div className="lang-switch" role="group" aria-label={c.langSwitch.label}>
      <button type="button" data-on={lang === "en"} onClick={() => setLang("en")}>
        {c.langSwitch.en}
      </button>
      <button type="button" data-on={lang === "zh"} onClick={() => setLang("zh")}>
        {c.langSwitch.zh}
      </button>
    </div>
  );
}

export function NoticeBar() {
  const { c } = useI18n();
  return (
    <div className="notice">
      <div className="wrap notice-inner">
        <span className="notice-tag">{c.notice.tag}</span>
        <span className="notice-text">{c.notice.text}</span>
        <Link href="/about#disclaimer" className="notice-more">
          {c.notice.more}
        </Link>
      </div>
    </div>
  );
}

export function SiteHeader() {
  const { c } = useI18n();
  return (
    <header className="masthead">
      <div className="wrap masthead-inner">
        <Link href="/" className="brand">
          <span className="brand-mark">{c.brand.mark}</span>
          <span className="brand-text">
            <span className="brand-cn">{c.brand.title}</span>
            <span className="brand-short">{c.brand.short}</span>
            <span className="brand-en">{c.brand.sub}</span>
          </span>
        </Link>
        <nav className="nav">
          <span className="nav-meta">{c.nav.est}</span>
          <Link href="/#registry" className="nav-hide-sm">
            {c.nav.registry}
          </Link>
          <Link href="/about">{c.nav.rules}</Link>
          <Link href="/about#submit" className="nav-hide-sm">
            {c.nav.submit}
          </Link>
          <a href={REPO} target="_blank" rel="noreferrer">
            {c.nav.github}
          </a>
          <LangSwitch />
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { c } = useI18n();
  return (
    <footer className="foot">
      <div className="wrap foot-inner">
        <div className="foot-col">
          <b>{c.footer.disclaimerTitle}</b>
          {c.footer.disclaimer.pre}
          <a href={`${REPO}/issues/new`} target="_blank" rel="noreferrer">
            {c.footer.disclaimer.link}
          </a>
          {c.footer.disclaimer.post}
        </div>
        <div className="foot-col">
          <b>{c.footer.upstreamTitle}</b>
          {c.footer.upstream}
        </div>
        <div className="foot-col" style={{ maxWidth: 220 }}>
          <b>{c.footer.indexTitle}</b>
          <a href={`${REPO}/blob/main/PR.md`} target="_blank" rel="noreferrer">
            {c.footer.guide}
          </a>
          <br />
          <Link href="/about">{c.footer.rules}</Link>
          <br />
          <a href="https://github.com/BaaRai/ARTEX" target="_blank" rel="noreferrer">
            {c.footer.mirror}
          </a>
        </div>
      </div>
    </footer>
  );
}
