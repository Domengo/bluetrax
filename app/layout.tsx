import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav";
import { Analytics } from "@vercel/analytics/react"

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard for BlueTrax",
};

const links = [
  { href: '/', label: 'Dashboard' },
  { href: '/tracking', label: 'Tracking' },
  { href: '/analytics', label: 'Analytics' },
]

const trackingOptions = [
  { value: "shipments", label: "Shipments" },
  { value: "inventory", label: "Inventory" },
  { value: "assets", label: "Assets" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar links={links} trackingOptions={trackingOptions}/>
        <Analytics/>
        {children}
        </body>
    </html>
  );
}
