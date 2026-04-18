import type { Metadata } from "next";
import { SmoothScrollProvider } from "@/components/animations/SmoothScrollProvider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { FlyToCartOverlay } from "@/components/products/FlyToCartOverlay";
import { BackToTop } from "@/components/shared/BackToTop";
import { Cursor } from "@/components/shared/Cursor";
import { GrainOverlay } from "@/components/shared/GrainOverlay";
import { bodyFont } from "@/lib/fonts";
import { siteConfig } from "@/lib/data/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
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
      suppressHydrationWarning
      className={`${bodyFont.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          forcedTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            {children}
            <BackToTop />
          </SmoothScrollProvider>
          <GrainOverlay />
          <Cursor />
          <FlyToCartOverlay />
          <Toaster position="bottom-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
