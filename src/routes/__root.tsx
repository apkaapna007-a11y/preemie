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
import { unregisterServiceWorkers } from "../lib/pwa";

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
  head: ({ match }) => {
    // A 404 must not inherit the homepage's index directive or canonical-ish
    // og:url. `globalNotFound` is set on the root match when the NotFound
    // route rendered; `status` covers explicit notFound() throws.
    const isNotFound = match.globalNotFound === true || match.status === "notFound";

    if (isNotFound) {
      return {
        meta: [
          { title: "Page not found | AdjustedAge" },
          { name: "robots", content: "noindex, nofollow" },
          { property: "og:title", content: "Page not found | AdjustedAge" },
          { property: "og:type", content: "website" },
          {
            name: "twitter:title",
            content: "Page not found | AdjustedAge",
          },
        ],
        links: [
          { rel: "icon", type: "image/png", href: "/favicon.png" },
          { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        ],
      };
    }

    return {
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
        { property: "og:image", content: "https://preemie.vercel.app/og/og-home.png" },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:locale", content: "en_US" },
        { property: "og:site_name", content: "AdjustedAge" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: "AdjustedAge — Corrected Age Tool for Premature Babies" },
        {
          name: "twitter:description",
          content:
            "Corrected age, milestones and follow-up tracking for NICU graduates, reviewed by Dr. Zeeshan Islam.",
        },
        { name: "twitter:site", content: "@AdjustedAge" },
        { name: "twitter:creator", content: "@AdjustedAge" },
        { name: "twitter:image", content: "https://preemie.vercel.app/og/og-home.png" },
        { name: "twitter:image:alt", content: "AdjustedAge corrected age calculator" },
        { property: "og:image:alt", content: "AdjustedAge corrected age calculator" },
        { name: "application-name", content: "AdjustedAge" },
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
        { rel: "icon", type: "image/png", href: "/favicon.png" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "manifest", href: "/manifest.webmanifest" },
      ],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "AdjustedAge",
            alternateName: "Adjusted Age Calculator",
            url: "https://preemie.vercel.app",
            description: "Corrected age calculator and preemie follow-up tool for NICU graduates.",
            inLanguage: "en",
            image: "https://preemie.vercel.app/og/og-brand.png",
            publisher: { "@id": "https://preemie.vercel.app/#organization" },
            author: {
              "@id": "https://preemie.vercel.app/about#drzeeshan",
            },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "@id": "https://preemie.vercel.app/#organization",
            name: "AdjustedAge",
            alternateName: "Adjusted Age Calculator",
            url: "https://preemie.vercel.app/",
            logo: {
              "@type": "ImageObject",
              url: "https://preemie.vercel.app/icon-512.png",
              width: 512,
              height: 512,
            },
            image: "https://preemie.vercel.app/og/og-brand.png",
            description: "Corrected age calculator and preemie follow-up tool for NICU graduates.",
            sameAs: ["https://preemie.vercel.app/"],
            founder: { "@id": "https://preemie.vercel.app/about#drzeeshan" },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Physician",
            "@id": "https://preemie.vercel.app/about#drzeeshan",
            name: "Dr. Zeeshan Islam",
            honorificPrefix: "Dr.",
            honorificSuffix: "MBBS, MCPS (Pediatrics)",
            jobTitle: "Consultant Paediatrician",
            medicalSpecialty: "Pediatric",
            identifier: {
              "@type": "PropertyValue",
              propertyID: "Gravatar",
              value: "50c92b77e1d7a4a9ee98b970f50188f88806b7b02c9c8e5004ee52a1ff4c861c",
            },
            url: "https://preemie.vercel.app/about",
            image: {
              "@type": "ImageObject",
              url: "https://preemie.vercel.app/dr-zeeshan-islam.png",
              width: 709,
              height: 585,
            },
            alternateName: "Dr Zee",
            sameAs: [
              "https://drzeeshanislam.blog",
              "https://www.linkedin.com/in/dr-zeeshan-islam-b81b0b373",
              "https://drzeewrites.com",
            ],
            description:
              "Dr. Zeeshan Islam is the author and clinical reviewer of AdjustedAge. He is a pediatrician, medical writer and digital health creator focused on evidence-based child health and preterm infant developmental follow-up.",
            knowsAbout: [
              "Pediatrics",
              "Neonatology",
              "Preterm infant follow-up",
              "Developmental surveillance",
              "Corrected age",
            ],
            hasCredential: [
              {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "degree",
                name: "MBBS (Bachelor of Medicine, Bachelor of Surgery)",
              },
              {
                "@type": "EducationalOccupationalCredential",
                credentialCategory: "postgraduate certification",
                name: "MCPS in Paediatrics, College of Physicians and Surgeons Pakistan",
              },
            ],
            worksFor: { "@id": "https://preemie.vercel.app/#organization" },
            inLanguage: "en",
            address: {
              "@type": "PostalAddress",
              addressCountry: "PK",
            },
          }),
        },
      ],
    };
  },

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
    unregisterServiceWorkers();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
    </QueryClientProvider>
  );
}
