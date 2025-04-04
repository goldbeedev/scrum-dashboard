import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from 'next/font/google';
import "./globals.css";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { JSX } from "react";
import { ConditionalNavbar } from "./components/ConditionalNavbar";
import { Analytics } from "@vercel/analytics/react";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    // can use "data-theme" tag for themeing.
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`} data-theme="light">
      <UserProvider>
        <body className="min-h-screen bg-base-100">
          <ConditionalNavbar />
          {children}
          <Analytics />
        </body>
      </UserProvider>
    </html>
  );
}
