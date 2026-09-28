#!/usr/bin/env python3
"""Throttled lab run: Slow-4G network + 4x CPU, mobile viewport.

Produces LCP / TBT / CLS estimates under simulated mid-tier conditions.
These are LAB SIMULATIONS, not field data.
"""
from __future__ import annotations
import json, sys
sys.stdout.reconfigure(encoding="utf-8")
from playwright.sync_api import sync_playwright

URLS = [
    ("home", "https://preemie.vercel.app/"),
    ("adjusted-age-calculator", "https://preemie.vercel.app/adjusted-age-calculator"),
    ("premature-baby-milestones", "https://preemie.vercel.app/premature-baby-milestones"),
    ("red-flags", "https://preemie.vercel.app/red-flags"),
]

INIT = r"""
window.__lcp = null; window.__cls = 0; window.__tbt = 0; window.__lt = []; window.__ev = [];
new PerformanceObserver(l => { for (const e of l.getEntries()) window.__lcp = {t: Math.round(e.startTime), size: e.size, tag: e.element ? e.element.tagName + '.' + String(e.element.className).slice(0,50) : null, url: e.url}; })
  .observe({type:'largest-contentful-paint', buffered:true});
new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__cls += e.value; })
  .observe({type:'layout-shift', buffered:true});
new PerformanceObserver(l => { for (const e of l.getEntries()) { window.__lt.push({t: Math.round(e.startTime), d: Math.round(e.duration)}); if (e.duration > 50) window.__tbt += e.duration - 50; } })
  .observe({type:'longtask', buffered:true});
new PerformanceObserver(l => { for (const e of l.getEntries()) window.__ev.push({n: e.name, d: Math.round(e.duration), t: Math.round(e.startTime), id: e.interactionId}); })
  .observe({type:'event', durationThreshold: 16, buffered:true});
"""

NET = {"downloadThroughput": (1.6 * 1024 * 1024) / 8, "uploadThroughput": (750 * 1024) / 8, "latency": 150}


def run(p, name, url, cpu, throttle_net, interact):
    b = p.chromium.launch(headless=True)
    ctx = b.new_context(viewport={"width": 375, "height": 812}, device_scale_factor=2, is_mobile=True, has_touch=True)
    pg = ctx.new_page()
    cdp = ctx.new_cdp_session(pg)
    cdp.send("Emulation.setCPUThrottlingRate", {"rate": cpu})
    if throttle_net:
        cdp.send("Network.enable")
        cdp.send("Network.emulateNetworkConditions", {"offline": False, **NET})
    pg.add_init_script(INIT)
    pg.goto(url, wait_until="load", timeout=120000)
    pg.wait_for_timeout(6000)
    interacted = []
    if interact:
        # tap the primary controls and type, mimicking real INP interactions
        try:
            for sel in ["input", "button"]:
                els = pg.query_selector_all(sel)
                for el in els[:4]:
                    try:
                        el.scroll_into_view_if_needed(timeout=3000)
                        el.click(timeout=3000)
                        pg.wait_for_timeout(300)
                        interacted.append(sel)
                    except Exception:
                        pass
            pg.keyboard.type("2024-01-01", delay=60)
        except Exception:
            pass
        pg.wait_for_timeout(2000)
    data = pg.evaluate("""() => ({
        lcp: window.__lcp, cls: Math.round(window.__cls*10000)/10000, tbt: Math.round(window.__tbt),
        lt: window.__lt.sort((a,b)=>b.d-a.d).slice(0,5),
        ev: window.__ev.filter(e=>e.d>=50).sort((a,b)=>b.d-a.d).slice(0,6),
        nav: (()=>{const n=performance.getEntriesByType('navigation')[0]||{}; return {ttfb: Math.round(n.responseStart||0), dcl: Math.round(n.domContentLoadedEventEnd||0), load: Math.round(n.loadEventEnd||0)};})(),
        totalTransfer: Math.round(performance.getEntriesByType('resource').reduce((a,r)=>a+(r.transferSize||0),0)/1024),
        reqCount: performance.getEntriesByType('resource').length,
    })""")
    b.close()
    return {"name": name, "url": url, "cpu": cpu, "net": "slow-4g" if throttle_net else "none", "interacted": interacted, **data}


def main():
    res = []
    with sync_playwright() as p:
        for name, url in URLS:
            print("...", name, flush=True)
            try:
                res.append(run(p, name, url, 4, True, name in ("home", "adjusted-age-calculator")))
                res.append(run(p, name, url, 1, False, False))
            except Exception as e:
                res.append({"name": name, "error": repr(e)})
    print(json.dumps(res, indent=2))


if __name__ == "__main__":
    main()
