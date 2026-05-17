import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar"; 
import { BranchProvider } from "@/context/BranchContext"; // <-- IMPORTED THE CONTEXT PROVIDER

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wit Studio | Premium Car Care Telangana",
  description: "Multi-branch premium car detailing network serving Siddipet, Karimnagar, and Hanamkonda.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#050505] text-white antialiased`}>
        {/* WRAPPED NATIVELY TO SYNC NAVBAR AND DASHBOARD STATES TOGETHER */}
        <BranchProvider>
          <Navbar />
          {children}
        </BranchProvider>
      </body>
    </html>
  );
}