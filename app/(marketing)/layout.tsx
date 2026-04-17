import type { ReactNode } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { PageShell } from "@/components/layout/PageShell";

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <PageShell>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </PageShell>
  );
}
