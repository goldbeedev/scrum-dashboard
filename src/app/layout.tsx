import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { JSX } from "react";
import { ConditionalNavbar } from "./components/ConditionalNavbar";
import { Analytics } from "@vercel/analytics/react";
import { ThemeProvider } from "./components/ThemeProvider";

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Scrum Dashboard - Your All-in-One Agile Ceremony Platform",
  description: "Transform your agile ceremonies with Scrum Dashboard. Streamline Planning Poker, Retros, and Refinements with Jira and Slack integration.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    // can use "data-theme" tag for themeing.
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`} data-theme="scrum-dark">
      <UserProvider>
        <ThemeProvider>
          <body className="min-h-screen bg-base-100 text-base-content">
            <ConditionalNavbar />
            {children}
            <Analytics />
          </body>
        </ThemeProvider>
      </UserProvider>
    </html>
  );
}
