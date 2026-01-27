import type { Metadata } from "next";
import Link from "next/link";
import { UI_TEXT } from "@/constants/uiText";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: UI_TEXT.appName,
  description: "判断支援ツールMVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <header style={{ borderBottom: "1px solid #ddd" }}>
          <div
            style={{
              maxWidth: 720,
              margin: "0 auto",
              padding: "12px 16px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div style={{ fontWeight: 800 }}>{UI_TEXT.appName}</div>
            <nav style={{ display: "flex", gap: 12 }}>
              <Link href="/decision/new" style={{ color: "#2563eb", textDecoration: "underline" }}>
                {UI_TEXT.nav.newDecision}
              </Link>
              <Link href="/decision/logs" style={{ color: "#2563eb", textDecoration: "underline" }}>
                {UI_TEXT.nav.logs}
              </Link>
            </nav>
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}