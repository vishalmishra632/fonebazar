import Link from "next/link";
import { Container } from "@/components/shared/Container";
import { siteConfig } from "@/lib/data/site";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          {siteConfig.name}
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <Link href="/services" className="hover:text-foreground">
            Services
          </Link>
          <Link href="/products" className="hover:text-foreground">
            Products
          </Link>
          <Link href="/about" className="hover:text-foreground">
            About
          </Link>
          <Link href="/contact" className="hover:text-foreground">
            Contact
          </Link>
        </nav>
      </Container>
    </header>
  );
}
