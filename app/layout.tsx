import type { Metadata } from "next";
import { Navbar } from "@/components/navbar";
import { LenisProvider } from "@/providers/lenis";
import { Analytics } from "@vercel/analytics/next";
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
  title: "Daniel Oweibo — Fullstack Platform Developer",
  description:
    "Fullstack developer obsessed with building platforms and scaling infrastructure. React, Next.js, Golang, Node.js and more.",
  openGraph: {
    title: "Daniel Oweibo — Fullstack Platform Developer",
    description:
      "Fullstack developer obsessed with building platforms and scaling infrastructure.",
    url: "https://danieloweibo.com",
    siteName: "Daniel Oweibo",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Daniel Oweibo — Fullstack Platform Developer",
    creator: "@danoweibo",
  },
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
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
      <body className="min-h-full flex flex-col">
        <LenisProvider>
          <Navbar />
          {children}
        </LenisProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
