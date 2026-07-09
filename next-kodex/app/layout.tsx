import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "KODEX. | Technical Archives",
    template: "%s | KODEX.",
  },
  description:
    "A specialized collection of technical insights, creative logic, and architectural patterns for the next generation of web engineers.",
  keywords: [
    "web engineering",
    "software architecture",
    "technical blog",
    "programming",
    "next.js",
    "blogging",
    "blogging platform",
  ],
  authors: [{ name: "Dipesh Thapa" }],
  openGraph: {
    title: "KODEX. | Technical Archives",
    description:
      "A specialized collection of technical insights, creative logic, and architectural patterns for the next generation of web engineers.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "KODEX. | Technical Archives",
    description:
      "A specialized collection of technical insights, creative logic, and architectural patterns.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-brand/80 selection:text-background">
        {children}
      </body>
    </html>
  );
}
