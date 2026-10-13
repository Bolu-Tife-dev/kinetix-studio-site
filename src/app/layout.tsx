import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SITE_URL } from "@/lib/downloads";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Kinetix Studio — AI-powered open-source video editor",
    template: "%s · Kinetix Studio",
  },
  description:
    "Automate high-impact edits with AI precision. Beat-synced AMV and gaming edits, a local REST API for your AI agents, and zero subscription watermarks.",
  keywords: [
    "video editor",
    "AMV editor",
    "AI video editing",
    "beat sync",
    "open source",
    "local REST API",
    "gaming edits",
  ],
  authors: [{ name: "Kinetix Studio contributors" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Kinetix Studio",
    title: "Kinetix Studio — AI-powered open-source video editor",
    description:
      "Automate high-impact edits with AI precision. Beat-synced AMV edits, a local API for AI agents, and zero watermarks.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kinetix Studio — AI-powered open-source video editor",
    description:
      "Beat-synced AMV edits, a local API for AI agents, and zero watermarks.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#09090b",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${GeistSans.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-void text-bright">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-volt focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
