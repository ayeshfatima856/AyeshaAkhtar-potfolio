import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const sora = Space_Grotesk({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ayeshaakhtar.dev"),
  title: {
    default: "Ayesha Akhtar — Graphic Designer · Social Media Manager · Digital Marketer",
    template: "%s | Ayesha Akhtar",
  },
  description:
    "Creative portfolio of Ayesha Akhtar: graphic design, social media management, digital marketing creatives and website design that turn attention into growth for brands across industries.",
  keywords: [
    "Ayesha Akhtar",
    "graphic designer",
    "social media manager",
    "digital marketer",
    "website designer",
    "portfolio",
    "Meta ads creatives",
    "brand identity",
  ],
  authors: [{ name: "Ayesha Akhtar" }],
  creator: "Ayesha Akhtar",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: "/favicon.svg",
  },
  openGraph: {
    title: "Ayesha Akhtar — Graphic Designer · Social Media Manager · Digital Marketer",
    description:
      "Creative designs. Powerful brands. Digital experiences that convert. Explore brand work, ad creatives, campaigns and websites.",
    siteName: "Ayesha Akhtar — Creative Portfolio",
    type: "website",
    images: [{ url: "/images/site/og-banner.png", width: 1440, height: 720 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ayesha Akhtar — Creative Designer & Digital Marketer",
    description: "Creative designs. Powerful brands. Digital experiences that convert.",
    images: ["/images/site/og-banner.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#111827",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${sora.variable} ${inter.variable} ${jetbrains.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
