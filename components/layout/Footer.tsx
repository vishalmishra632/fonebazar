import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { siteConfig } from "@/lib/data/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/60 py-12">
      <Container className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-muted-foreground">
          © {year} {siteConfig.name}. Crafted with care.
        </p>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <Link href="/privacy" className="hover:text-foreground">
            Privacy
          </Link>
          <Link href="/terms" className="hover:text-foreground">
            Terms
          </Link>
          <Link href="/refund" className="hover:text-foreground">
            Refund
          </Link>
        </div>
      </Container>
    </footer>
  );
}
