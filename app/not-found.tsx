import Link from "next/link";
import { Container } from "@/components/shared/Container";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center">
      <Container className="flex flex-col items-start gap-6 py-20">
        <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
          404
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
          This page has not been made yet.
        </h1>
        <p className="max-w-lg text-muted-foreground">
          Head back to the homepage or reach us on WhatsApp if you were looking for
          something specific.
        </p>
        <Link
          href="/"
          className="inline-flex items-center rounded-full border border-border px-5 py-2 text-sm hover:bg-muted"
        >
          Back home
        </Link>
      </Container>
    </div>
  );
}
