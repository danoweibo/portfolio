import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/navbar";
import {
  bushmanFont,
  dmFont,
  gravesFont,
  grotaFont,
  passionFont,
  jakartaFont,
  tiktokFont,
  playfairFont,
} from "@/lib/fonts";
import { LenisProvider } from "@/providers/lenis";
import type { Metadata } from "next";
import "./globals.css";

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
      className={`${bushmanFont.variable} ${dmFont.variable} ${gravesFont.variable} ${grotaFont.variable} ${passionFont.variable} ${jakartaFont.variable} ${tiktokFont.variable} ${playfairFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <LenisProvider>
          <Navbar />
          {children}
        </LenisProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  );
}
