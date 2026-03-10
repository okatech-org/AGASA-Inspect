import type { Metadata, Viewport } from "next";
import "./globals.css";
import { DemoProvider } from "@/lib/demo";

export const metadata: Metadata = {
  title: "AGASA-Inspect",
  description: "Application d'inspection sanitaire et phytosanitaire — DICSP",
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#17253f",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" translate="no">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased min-h-screen flex flex-col">
        <DemoProvider>
          {children}
        </DemoProvider>
      </body>
    </html>
  );
}
