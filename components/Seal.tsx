"use client";

import { useI18n } from "@/components/LangProvider";

const RED = "#a5322a";

export function Seal({
  size = 96,
  roman,
  label,
}: {
  size?: number;
  roman?: string;
  label?: string;
}) {
  const { lang } = useI18n();
  const isZh = lang === "zh";

  return (
    <svg
      className="seal-svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={
        isZh
          ? `ARTEX 二开认证${roman ? ` ${roman} 级 ${label ?? ""}` : ""}`
          : `ARTEX derivative certificate${roman ? `, tier ${roman} ${label ?? ""}` : ""}`
      }
    >
      <rect x="3" y="3" width="94" height="94" rx="2" fill="none" stroke={RED} strokeWidth="2.4" />
      <rect x="9.5" y="9.5" width="81" height="81" rx="1" fill="none" stroke={RED} strokeWidth="0.8" />

      {isZh ? (
        <g
          fill={RED}
          fontFamily="'PingFang SC', 'Microsoft YaHei', -apple-system, sans-serif"
          fontSize="23"
          fontWeight="700"
          textAnchor="middle"
        >
          <text x="70" y="40">二</text>
          <text x="70" y="72">开</text>
          <text x="30" y="40">认</text>
          <text x="30" y="72">证</text>
        </g>
      ) : (
        <g fill={RED} textAnchor="middle">
          <text
            x="50"
            y="27"
            fontFamily="ui-monospace, Menlo, Consolas, monospace"
            fontSize="8.5"
            letterSpacing="2.2"
            fontWeight="600"
          >
            ARTEX
          </text>
          <text
            x="50"
            y="63"
            fontFamily="-apple-system, 'Segoe UI', Arial, sans-serif"
            fontSize="33"
            fontWeight="700"
            letterSpacing="-0.5"
          >
            2K
          </text>
          <text
            x="50"
            y="82"
            fontFamily="ui-monospace, Menlo, Consolas, monospace"
            fontSize="6.6"
            letterSpacing="1.1"
          >
            DERIVATIVE
          </text>
        </g>
      )}
    </svg>
  );
}
