"use client";

import Link from "next/link";
import { useI18n } from "@/components/LangProvider";

export default function NotFound() {
  const { c } = useI18n();
  const t = c.notFound;

  return (
    <div className="wrap">
      <div className="crumb">
        <Link href="/">{c.cert.home}</Link>
        <span className="sep">/</span>
        <span>404</span>
      </div>
      <div style={{ padding: "56px 0 96px", maxWidth: 560 }}>
        <div className="section-kicker">{t.kicker}</div>
        <h1 className="section-title" style={{ fontSize: 36, marginBottom: 12 }}>
          {t.title}
        </h1>
        <p style={{ fontSize: 12.5, lineHeight: 1.9, color: "var(--ink-soft)" }}>{t.body}</p>
        <div style={{ display: "flex", gap: 10, marginTop: 20, flexWrap: "wrap" }}>
          <Link className="btn btn-primary" href="/#registry">
            {t.back}
          </Link>
          <Link className="btn" href="/about#submit">
            {t.submit}
          </Link>
        </div>
      </div>
    </div>
  );
}
