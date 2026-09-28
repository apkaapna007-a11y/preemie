#!/usr/bin/env python3
"""Focused check: webfont loading + layout-shift sources (CLS attribution)."""
from __future__ import annotations
import json, sys
sys.stdout.reconfigure(encoding="utf-8")
from playwright.sync_api import sync_playwright

URLS = [
    ("home", "https://preemie.vercel.app/"),
    ("premature-baby-milestones", "https://preemie.vercel.app/premature-baby-milestones"),
]

INIT = r"""
window.__shifts = [];
new PerformanceObserver((l) => {
  for (const e of l.getEntries()) {
    if (e.hadRecentInput) continue;
    const srcs = (e.sources||[]).map(s => {
      const n = s.node;
      return {
        node: n ? (n.nodeName + (n.className ? '.' + String(n.className).slice(0,60) : '')) : null,
        prev: s.previousRect ? [Math.round(s.previousRect.x),Math.round(s.previousRect.y),Math.round(s.previousRect.width),Math.round(s.previousRect.height)] : null,
        cur: s.currentRect ? [Math.round(s.currentRect.x),Math.round(s.currentRect.y),Math.round(s.currentRect.width),Math.round(s.currentRect.height)] : null,
      };
    });
    window.__shifts.push({t: Math.round(e.startTime), v: Math.round(e.value*10000)/10000, srcs});
  }
}).observe({type:'layout-shift', buffered:true});
"""

FONTS = r"""
() => {
  const faces = [];
  document.fonts.forEach(f => faces.push({family: f.family, weight: f.weight, style: f.style, status: f.status}));
  const res = performance.getEntriesByType('resource')
    .filter(r => /fonts\.(googleapis|gstatic)\.com/.test(r.name))
    .map(r => ({name: r.name.slice(0,110), size: r.transferSize, start: Math.round(r.startTime), dur: Math.round(r.duration)}));
  return {
    status: document.fonts.status,
    newsreader: document.fonts.check('16px Newsreader'),
    publicsans: document.fonts.check('16px "Public Sans"'),
    h1font: getComputedStyle(document.querySelector('h1')).fontFamily,
    bodyfont: getComputedStyle(document.body).fontFamily,
    faces, requests: res,
  };
}
"""

HEADERS = r"""
async () => {
  const urls = performance.getEntriesByType('resource').map(r=>r.name);
  const out = [];
  for (const u of urls.filter(u=>/assets\/.*\.(js|css)$/.test(u)).slice(0,4)) {
    try { const r = await fetch(u, {method:'HEAD'}); out.push({u: u.split('/').pop(), cc: r.headers.get('cache-control'), etag: r.headers.get('etag'), age: r.headers.get('age'), cp: r.headers.get('content-encoding'), len: r.headers.get('content-length')}); } catch(e){ out.push({u, err: String(e)}); }
  }
  try { const r = await fetch(location.href, {method:'HEAD'}); out.push({u:'document', cc: r.headers.get('cache-control'), age: r.headers.get('age')}); } catch(e){}
  return out;
}
"""


def main():
    out = {}
    with sync_playwright() as p:
        for name, url in URLS:
            b = p.chromium.launch(headless=True)
            ctx = b.new_context(viewport={"width": 1440, "height": 900})
            pg = ctx.new_page()
            pg.add_init_script(INIT)
            pg.goto(url, wait_until="load", timeout=60000)
            pg.wait_for_timeout(6000)
            item = {"fonts": pg.evaluate(FONTS), "shifts": pg.evaluate("window.__shifts")}
            try:
                item["headers"] = pg.evaluate(HEADERS)
            except Exception as e:
                item["headers"] = repr(e)
            out[name] = item
            ctx.close(); b.close()
    print(json.dumps(out, indent=2))


if __name__ == "__main__":
    main()
