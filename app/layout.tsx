import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
const REPO = "https://github.com/Gh0xE9/open_artex";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "ARTEX 二开认证中心 — ARTEX 衍生项目登记册",
    template: "%s — ARTEX 二开认证中心",
  },
  description:
    "ARTEX 上游删除后，源码以二次开发的形式散落在数十个仓库里。这里把它们全部登记在册，按改动深度授予 Ⅰ—Ⅴ 级认证。",
  keywords: ["ARTEX", "二开", "二次开发", "AI 渗透测试", "AGPL-3.0", "开源治理"],
  openGraph: {
    title: "ARTEX 二开认证中心",
    description: "凡基于 ARTEX 源码的二次开发，均可在此获得一枚编号。认证不代表认可。",
    type: "website",
    locale: "zh_CN",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <header className="masthead">
          <div className="wrap masthead-inner">
            <Link href="/" className="brand">
              <span className="brand-mark">证</span>
              <span className="brand-text">
                <span className="brand-cn">ARTEX 二开认证中心</span>
                <span className="brand-en">Derivative Registry</span>
              </span>
            </Link>
            <nav className="nav">
              <span className="nav-meta">EST. 2026 · AGPL-3.0</span>
              <Link href="/#registry" className="nav-hide-sm">
                登记册
              </Link>
              <Link href="/about">认证规则</Link>
              <Link href="/about#submit" className="nav-hide-sm">
                提交项目
              </Link>
              <a href={REPO} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </nav>
          </div>
        </header>

        <main>{children}</main>

        <footer className="foot">
          <div className="wrap" style={{ display: "flex", gap: 40, flexWrap: "wrap", justifyContent: "space-between" }}>
            <div className="foot-col">
              <b>免责声明</b>
              本站为社区公开信息登记，只收录公开仓库及其自述文本，不构成法律意见、安全评估或对任何项目的背书。认证编号是登记序号，不具备任何资质效力。若你是项目方并要求更正或下架，请
              <a href={`${REPO}/issues/new`} target="_blank" rel="noreferrer">
                提交 Issue
              </a>
              。
            </div>
            <div className="foot-col">
              <b>关于上游</b>
              ARTEX 由 Autumn-27 以 AGPL-3.0 发布，上游仓库已于 2026 年 10 月从 GitHub 删除。本站不托管、不分发任何源码，仅索引公开链接。
            </div>
            <div className="foot-col" style={{ maxWidth: 220 }}>
              <b>目录</b>
              <a href={`${REPO}/blob/main/PR.md`} target="_blank" rel="noreferrer">
                PR.md · 提交规范
              </a>
              <br />
              <Link href="/about">认证规则与分级</Link>
              <br />
              <a href="https://github.com/BaaRai/ARTEX" target="_blank" rel="noreferrer">
                上游镜像 BaaRai/ARTEX
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
