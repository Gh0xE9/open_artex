"use client";

import { useState } from "react";
import { useI18n } from "@/components/LangProvider";

export function CopyBox({ value }: { value: string }) {
  const { c } = useI18n();
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const el = document.createElement("textarea");
      el.value = value;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <div className="code-box" style={{ display: "flex", gap: 12, alignItems: "center" }}>
      <span style={{ flex: 1, minWidth: 0 }}>{value}</span>
      <button
        type="button"
        onClick={copy}
        className="btn"
        style={{ padding: "3px 8px", fontSize: 10, flex: "none" }}
      >
        {copied ? c.cert.copiedBtn : c.cert.copyBtn}
      </button>
    </div>
  );
}
