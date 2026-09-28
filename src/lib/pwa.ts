/**
 * Service-worker cleanup only — registration is intentionally gone.
 *
 * The generated worker never reached production: vite-plugin-pwa resolves
 * `swDest` from its `outDir` option, which vite.config.ts points at
 * `.output/public`, so `/sw.js` was never part of the deployed build (it 404s
 * on preemie.vercel.app) while `manifest.webmanifest` still ships as a Vite
 * asset. Registering a worker that cannot load is worse than registering none,
 * so any previously-registered worker is unregistered on load instead.
 *
 * Re-enabling offline support requires fixing vite.config.ts (VitePWA `outDir`)
 * first — and the on-page "Works offline" copy that depends on it.
 */

export function unregisterServiceWorkers() {
  if (typeof window === "undefined" || !("serviceWorker" in navigator)) return;

  void navigator.serviceWorker
    .getRegistrations()
    .then((regs) => Promise.allSettled(regs.map((r) => r.unregister())))
    .catch(() => undefined);
}
