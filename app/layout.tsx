import { Analytics } from "@vercel/analytics/next";
import { Navbar } from "@/components/navbar";
import { grotaFont, jakartaFont, tiktokFont, momoFont } from "@/lib/fonts";
import { siteMetadata } from "@/lib/metadata";
import { LenisProvider } from "@/providers/lenis";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = siteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${momoFont.variable} ${grotaFont.variable} ${jakartaFont.variable} ${tiktokFont.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Daniel Oweibo",
              url: "https://dvnlcorp.com",
              jobTitle: "Fullstack Platform Developer",
              sameAs: [
                "https://linkedin.com/in/danoweibo",
                "https://github.com/danoweibo",
              ],
            }),
          }}
        />
      </head>
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
