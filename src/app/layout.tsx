import type { Metadata, Viewport } from "next";
import { getAllContent } from "@/lib/content";
import "./globals.css";

const { site } = getAllContent();

export const metadata: Metadata = {
  title: "Aylesim",
  description: site.description,
  metadataBase: new URL(site.origin),
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          crossOrigin="anonymous"
          href="https://fonts.gstatic.com"
          rel="preconnect"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter+Tight:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        <aside aria-label="Site notice" className="construction-notice">
          <p>
            <strong>Under construction</strong>
            <span>You might notice weird things here.</span>
          </p>
        </aside>
      </body>
    </html>
  );
}
