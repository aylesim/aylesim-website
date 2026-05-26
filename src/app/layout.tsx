import type { Metadata, Viewport } from "next";
import { siteDescription } from "@/lib/site";
import { SITE_BG } from "@/lib/theme";
import "./globals.css";

export const metadata: Metadata = {
  title: "Aylesim",
  description: siteDescription,
  metadataBase: new URL("https://aylesim.com"),
};

export const viewport: Viewport = {
  themeColor: SITE_BG,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ "--bg": SITE_BG, backgroundColor: SITE_BG }}>
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          crossOrigin="anonymous"
          href="https://fonts.gstatic.com"
          rel="preconnect"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&family=IBM+Plex+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-dvh bg-bg antialiased">{children}</body>
    </html>
  );
}
