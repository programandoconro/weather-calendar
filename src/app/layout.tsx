import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather Calendar",
  description: "Get weather forecasts for the next 5 days",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <meta httpEquiv="refresh" content="60" />

      <body className={inter.className}>{children}</body>
    </html>
  );
}
