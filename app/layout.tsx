import type { Metadata } from "next";
import { LangProvider } from "@/components/LangProvider";
import { NoticeBar, SiteFooter, SiteHeader } from "@/components/Chrome";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "ARTEX Derivative Registry — an unofficial ledger of ARTEX forks",
    template: "%s — ARTEX Derivative Registry",
  },
  description:
    "After the ARTEX upstream was deleted, the source kept spreading as forks, mirrors and reskins. Every public one we could find is catalogued here and graded Ⅰ–Ⅴ by how far it drifted.",
  keywords: [
    "ARTEX",
    "derivative",
    "secondary development",
    "AGPL-3.0",
    "open source governance",
    "AI pentest",
  ],
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: "ARTEX Derivative Registry",
    description:
      "An unofficial ledger of every ARTEX fork we could find. A certificate is not an endorsement.",
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "ARTEX Derivative Registry",
  },
  twitter: {
    card: "summary",
    title: "ARTEX Derivative Registry",
    description: "An unofficial ledger of every ARTEX fork we could find.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LangProvider>
          <NoticeBar />
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
        </LangProvider>
      </body>
    </html>
  );
}
