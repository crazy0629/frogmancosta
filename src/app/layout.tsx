import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Brand Life Co - Performance Brand Scaling",
  description: "Professional performance brand scaling solutions",
  keywords: ["brand scaling", "performance marketing", "business growth"],
  authors: [{ name: "Brand Life Co" }],
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {children}
      </body>
    </html>
  );
}