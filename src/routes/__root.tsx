import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { registerServiceWorker } from "../lib/pwa";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "AdjustedAge — Corrected Age Tool for Premature Babies" },
      {
        name: "description",
        content:
          "Corrected age, milestones and follow-up tracking for NICU graduates, reviewed by Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics).",
      },
      { name: "author", content: "Dr. Zeeshan Islam, MBBS, MCPS (Pediatrics)" },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "AdjustedAge — Corrected Age Tool for Premature Babies" },
      {
        property: "og:description",
        content:
          "Corrected age, milestones and follow-up tracking for NICU graduates, reviewed by a consultant paediatrician.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://preemie.vercel.app/" },
      { property: "og:image", content: "https://preemie.vercel.app/favicon.png" },
      { property: "og:locale", content: "en_US" },
      { property: "og:site_name", content: "AdjustedAge" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@AdjustedAge" },
      { name: "twitter:creator", content: "@AdjustedAge" },
      { name: "twitter:image", content: "https://preemie.vercel.app/favicon.png" },
      { name: "twitter:image:alt", content: "AdjustedAge corrected age calculator" },
      { property: "og:image:alt", content: "AdjustedAge corrected age calculator" },
      { name: "theme-color", content: "#14606e" },
      { name: "apple-mobile-web-app-capable", content: "yes" },
      { name: "apple-mobile-web-app-title", content: "AdjustedAge" },
      { name: "apple-mobile-web-app-status-bar-style", content: "default" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Newsreader:opsz,wght@6..72,400;6..72,500;6..72,600&family=Public+Sans:wght@400;500;600&display=swap",
      },
      { rel: "icon", type: "image/png", href: "/favicon.png" },
      { rel: "apple-touch-icon", href: "/icons/icon-192.png" },
      { rel: "manifest", href: "/manifest.webmanifest" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "AdjustedAge",
          url: "https://preemie.vercel.app",
          description: "Corrected age calculator and preemie follow-up tool for NICU graduates.",
          publisher: {
            "@type": "Organization",
            name: "AdjustedAge",
            logo: {
              "@type": "ImageObject",
              url: "https://preemie.vercel.app/favicon.png",
            },
          },
          author: {
            "@id": "https://preemie.vercel.app/about#drzeeshan",
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Physician",
          "@id": "https://preemie.vercel.app/about#drzeeshan",
          name: "Dr. Zeeshan Islam",
          honorificSuffix: "MBBS, MCPS (Pediatrics)",
          jobTitle: "Consultant Paediatrician",
          medicalSpecialty: "Pediatrics",
          url: "https://preemie.vercel.app/about",
          image: "https://preemie.vercel.app/favicon.png",
          description:
            "Dr. Zeeshan Islam is a Consultant Paediatrician specializing in neonatal follow-up and corrected age development.",
          address: {
            "@type": "PostalAddress",
            addressCountry: "PK",
          },
        }),
      },
    ],
  }),

  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    registerServiceWorker();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
