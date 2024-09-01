import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const links = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/tracking', label: 'Tracking' },
  { href: '/analytics', label: 'Analytics' },
]

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar links={links} />
        {children}
        </body>
    </html>
  );
}
