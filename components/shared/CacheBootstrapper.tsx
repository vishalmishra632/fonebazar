"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const WELCOMED_KEY = "fb-welcomed";

const ROUTES_TO_PREFETCH = [
  "/services",
  "/products",
  "/about",
  "/our-store",
  "/contact",
  "/refund-return",
  "/privacy-policy",
  "/terms-conditions",
  "/products/3d-printing",
  "/products/laser-engraving",
  "/products/resin-art",
  "/products/t-shirt-printing",
  "/products/decal-printing",
];

// Registers the service worker, warms the page cache during idle, and shows
// a one-time "your browser is prepared" toast after the cache has populated.
// Every call is gated on production + feature-availability — dev server and
// browsers without SW support get a no-op.
export function CacheBootstrapper() {
  const router = useRouter();

  useEffect(() => {
    if (typeof window === "undefined") return;

    const isProd = process.env.NODE_ENV === "production";
    const supportsSW = "serviceWorker" in navigator;
    const idle =
      (window as Window & { requestIdleCallback?: typeof requestIdleCallback })
        .requestIdleCallback ??
      ((cb: IdleRequestCallback) => window.setTimeout(() => cb({ didTimeout: false, timeRemaining: () => 0 } as IdleDeadline), 1));

    if (isProd && supportsSW) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .catch(() => {
          // Safari private mode, CSP restrictions, etc. — fail silently.
        });
    }

    const prefetchHandle = idle(
      () => {
        ROUTES_TO_PREFETCH.forEach((route, index) => {
          idle(() => router.prefetch(route), {
            timeout: 1800 + index * 250,
          });
        });
      },
      { timeout: 3500 },
    );

    let welcomeHandle: number | undefined;
    const alreadyWelcomed =
      typeof localStorage !== "undefined" &&
      localStorage.getItem(WELCOMED_KEY) === "1";

    if (!alreadyWelcomed) {
      welcomeHandle = window.setTimeout(() => {
        toast("Ready for next time.", {
          description:
            "We’ve prepared your browser so the site loads instantly on your next visit.",
          duration: 5000,
        });
        try {
          localStorage.setItem(WELCOMED_KEY, "1");
        } catch {
          // Ignore localStorage errors (private mode, quota exceeded).
        }
      }, 6200);
    }

    return () => {
      const cancelIdle = (
        window as Window & { cancelIdleCallback?: typeof cancelIdleCallback }
      ).cancelIdleCallback;
      if (cancelIdle && typeof prefetchHandle === "number") {
        cancelIdle(prefetchHandle);
      }
      if (welcomeHandle) window.clearTimeout(welcomeHandle);
    };
  }, [router]);

  return null;
}
