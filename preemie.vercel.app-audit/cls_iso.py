#!/usr/bin/env python3
"""Isolate CLS cause: normal vs fonts-blocked, plus resource timing log."""
from __future__ import annotations
import json, sys
sys.stdout.reconfigure(encoding="utf-8")
from playwright.sync_api import sync_playwright

INIT = r"""
window.__shifts = [];
new PerformanceObserver((l) => {
  for (const e of l.getEntries()) { if (!e.hadRecentInput) window.__shifts.push({t: Math.round(e.startTime), v: Math.round(e.value*10000)/10000, n: (e.sources||[]).map(s=>s.node?s.node.nodeName+'.'+String(s.node.className||'').slice(0,40):null).slice(0,4)}); }
}).observe({type:'layout-shift', buffered:true});
window.__marks = {};
document.addEventListener('DOMContentLoaded', () => window.__marks.dcl = performance.now());
window.addEventListener('load', () => window.__marks.load = performance.now());
"""


def run(url, block_fonts, name):
    with sync_playwright() as p:
        b = p.chromium.launch(headless=True)
        ctx = b.new_context(viewport={"width": 1440, "height": 900})
        pg = ctx.new_page()
        pg.add_init_script(INIT)
        if block_fonts:
            pg.route("**/*", lambda r: r.abort() if r.request.resource_type == "font" or "fonts.googleapis" in r.request.url else r.continue_())
        pg.goto(url, wait_until="load", timeout=60000)
        pg.wait_for_timeout(7000)
        info = pg.evaluate("""() => ({
            shifts: window.__shifts, marks: window.__marks,
            cls: Math.round(performance.getEntriesByType('layout-shift').filter(e=>!e.hadRecentInput).reduce((a,e)=>a+e.value,0)*10000)/10000,
            h1font: getComputedStyle(document.querySelector('h1')).fontFamily,
            h1w: Math.round(document.querySelector('h1').getBoundingClientRect().width),
            nav: (()=>{const n=document.querySelector('nav'); return n? Math.round(n.getBoundingClientRect().width):null})(),
            fontsStatus: document.fonts.status,
            woff: performance.getEntriesByType('resource').filter(r=>/woff|gstatic/.test(r.name)).map(r=>r.name.slice(-60)),
        })""")
        print(f"--- {name} (block_fonts={block_fonts})")
        print(json.dumps(info, indent=2)[:3000])
        ctx.close(); b.close()


if __name__ == "__main__":
    url = sys.argv[1] if len(sys.argv) > 1 else "https://preemie.vercel.app/"
    run(url, False, "normal")
    run(url, True, "fonts-blocked")
