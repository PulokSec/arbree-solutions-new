import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AnalyticsHead, AnalyticsBody } from "@/components/analytics/AnalyticsScripts";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Arbree Solutions | Scale Your Tech Team With Dedicated Experts",
  description:
    "Software Development, Resource Augmentation, QA, DevOps and Mobile Solutions that seamlessly integrate with your business and accelerate product delivery.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        <AnalyticsHead />
      </head>
      <body className="min-h-full flex flex-col bg-white font-sans text-[#121212]">
        <AnalyticsBody />
        {children}
      </body>
    </html>
  );
}
