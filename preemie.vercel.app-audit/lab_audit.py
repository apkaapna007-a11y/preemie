#!/usr/bin/env python3
"""Lab audit: performance payload + visual/mobile usability for a set of URLs.

Run with the SEO skill venv python (playwright + chromium available).
Not part of the bundled allowlist, so it is invoked directly.
"""
from __future__ import annotations

import json
import sys
import re

sys.stdout.reconfigure(encoding="utf-8")

from playwright.sync_api import sync_playwright

URLS = [
    ("home", "https://preemie.vercel.app/"),
    ("adjusted-age-calculator", "https://preemie.vercel.app/adjusted-age-calculator"),
    ("premature-baby-milestones", "https://preemie.vercel.app/premature-baby-milestones"),
    ("red-flags", "https://preemie.vercel.app/red-flags"),
]

PERF_OBSERVER = """
window.__lcp = [];
window.__cls = 0;
window.__inp = [];
new PerformanceObserver((l) => {
  for (const e of l.getEntries()) {
    window.__lcp.push({
      size: e.size,
      startTime: Math.round(e.startTime),
      tag: e.element ? (e.element.tagName + '.' + (e.element.className||'').toString().slice(0,80)) : null,
      url: e.url || null,
      id: e.element && e.element.id ? e.element.id : null,
    });
  }
}).observe({type: 'largest-contentful-paint', buffered: true});
new PerformanceObserver((l) => {
  for (const e of l.getEntries()) { if (!e.hadRecentInput) window.__cls += e.value; }
}).observe({type: 'layout-shift', buffered: true});
new PerformanceObserver((l) => {
  for (const e of l.getEntries()) { window.__inp.push({d: Math.round(e.duration), t: (e.interactionId||0)}); }
}).observe({type:'event', durationThreshold: 16, buffered: true});
"""

VISUAL_JS = r"""
() => {
  const vw = window.innerWidth, vh = window.innerHeight;
  const out = {
    vw, vh,
    scrollW: document.documentElement.scrollWidth,
    scrollH: document.documentElement.scrollHeight,
    hScroll: document.documentElement.scrollWidth > window.innerWidth + 1,
    interstitials: [],
    smallTargets: [],
    aboveFold: {h1: null, h2s: [], cta: [], textBlocks: 0, jsonld: 0, imgs: []},
    contrast: [],
    smallText: [],
    bodyFont: parseFloat(getComputedStyle(document.body).fontSize),
    docLang: document.documentElement.lang,
  };
  const abs = (el) => { const r = el.getBoundingClientRect(); return {x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height)}; };
  const visible = (el) => { const r = el.getBoundingClientRect(); const s = getComputedStyle(el);
    return r.width>0 && r.height>0 && s.visibility!=='hidden' && s.display!=='none' && parseFloat(s.opacity)>0.05; };

  // --- fixed/sticky overlays that could be interstitials
  for (const el of document.querySelectorAll('body *')) {
    const s = getComputedStyle(el);
    if (s.position !== 'fixed' && s.position !== 'absolute') continue;
    const r = el.getBoundingClientRect();
    if (r.width < vw*0.8 || r.height < vh*0.6) continue;
    const txt = (el.innerText||'').trim().slice(0,120);
    const bg = s.backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)' || txt) {
      out.interstitials.push({tag: el.tagName, cls: (el.className||'').toString().slice(0,60), pos: s.position, box: abs(el), z: s.zIndex, text: txt});
    }
  }

  // --- tap targets
  const sel = 'a[href], button, input, select, textarea, [role=button], [role=link], summary';
  for (const el of document.querySelectorAll(sel)) {
    if (!visible(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.top > vh * 1.5) continue;   // only near-viewport content matters here
    const s = Math.min(r.width, r.height);
    if (s > 0 && s < 44) {
      out.smallTargets.push({tag: el.tagName, txt: (el.innerText||el.getAttribute('aria-label')||el.type||'').trim().slice(0,50), w: Math.round(r.width), h: Math.round(r.height), y: Math.round(r.y)});
    }
  }

  // --- above the fold
  const h1 = document.querySelector('h1');
  if (h1 && visible(h1)) out.aboveFold.h1 = {text: h1.innerText.trim().slice(0,140), box: abs(h1)};
  for (const h2 of document.querySelectorAll('h2')) {
    if (visible(h2) && h2.getBoundingClientRect().top < vh) out.aboveFold.h2s.push(h2.innerText.trim().slice(0,90));
  }
  for (const el of document.querySelectorAll('a[href], button')) {
    if (!visible(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.top < vh && r.height >= 36) out.aboveFold.cta.push({txt:(el.innerText||'').trim().slice(0,50), y: Math.round(r.y)});
  }
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  let n;
  while ((n = walker.nextNode())) {
    const t = n.textContent.trim();
    if (!t) continue;
    const el = n.parentElement;
    if (!el || ['SCRIPT','STYLE','NOSCRIPT'].includes(el.tagName)) continue;
    const r = el.getBoundingClientRect();
    if (r.top < vh && r.bottom > 0 && t.length > 25) out.aboveFold.textBlocks++;
  }
  out.aboveFold.jsonld = document.querySelectorAll('script[type="application/ld+json"]').length;
  for (const img of document.querySelectorAll('img')) {
    if (!visible(img)) continue;
    const r = img.getBoundingClientRect();
    if (r.top < vh) out.aboveFold.imgs.push({src: img.currentSrc.split('/').pop(), disp: Math.round(r.width)+'x'+Math.round(r.height), nat: img.naturalWidth+'x'+img.naturalHeight, y: Math.round(r.y)});
  }

  // --- contrast + small text for visible text nodes
  const parseC = (c) => { const m = c.match(/rgba?\(([^)]+)\)/); if(!m) return null;
    const p = m[1].split(',').map(x=>parseFloat(x)); return {r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}; };
  const bgOf = (el) => {
    let cur = el;
    while (cur && cur !== document.documentElement) {
      const c = parseC(getComputedStyle(cur).backgroundColor);
      if (c && c.a > 0.6) return c;
      cur = cur.parentElement;
    }
    return {r:255,g:255,b:255,a:1};
  };
  const lum = (c) => { const f = (v)=>{v/=255; return v<=0.03928? v/12.92 : Math.pow((v+0.055)/1.055,2.4);};
    return 0.2126*f(c.r)+0.7152*f(c.g)+0.0722*f(c.b); };
  const ratio = (a,b) => { const l1=lum(a), l2=lum(b); const hi=Math.max(l1,l2), lo=Math.min(l1,l2); return (hi+0.05)/(lo+0.05); };
  const seen = new Set();
  const w2 = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
  while ((n = w2.nextNode())) {
    const t = n.textContent.trim();
    if (t.length < 3) continue;
    const el = n.parentElement;
    if (!el || ['SCRIPT','STYLE','NOSCRIPT'].includes(el.tagName)) continue;
    const r = el.getBoundingClientRect();
    if (r.top > vh*1.2 || r.bottom < 0 || !visible(el)) continue;
    const s = getComputedStyle(el);
    const fg = parseC(s.color); if (!fg) continue;
    const bg = bgOf(el);
    const eff = fg.a < 1 ? {r: fg.r*fg.a+bg.r*(1-fg.a), g: fg.g*fg.a+bg.g*(1-fg.a), b: fg.b*fg.a+bg.b*(1-fg.a)} : fg;
    const cr = ratio(eff, bg);
    const size = parseFloat(s.fontSize);
    const bold = parseInt(s.fontWeight,10) >= 700;
    const large = size >= 24 || (size >= 18.66 && bold);
    const need = large ? 3.0 : 4.5;
    const key = s.color+'|'+JSON.stringify(bg)+'|'+size;
    if (cr < need) {
      if (!seen.has(key)) {
        seen.add(key);
        out.contrast.push({text: t.slice(0,60), color: s.color, bg: `rgb(${Math.round(bg.r)},${Math.round(bg.g)},${Math.round(bg.b)})`, size, ratio: Math.round(cr*100)/100, need});
      }
    }
    if (size < 14) out.smallText.push({text: t.slice(0,50), size, color: s.color});
  }
  out.smallText = out.smallText.slice(0, 10);
  out.contrast = out.contrast.slice(0, 15);
  out.smallTargets = out.smallTargets.slice(0, 25);
  return out;
}
"""

NO_JS_JS = r"""
() => {
  const txt = (document.body.innerText || '').replace(/\s+/g,' ').trim();
  return {
    textLen: txt.length,
    h1: (document.querySelector('h1')||{}).innerText || null,
    h2count: document.querySelectorAll('h2').length,
    jsonld: document.querySelectorAll('script[type="application/ld+json"]').length,
    imgs: document.querySelectorAll('img').length,
    inputs: document.querySelectorAll('input,select,textarea').length,
    forms: document.querySelectorAll('form').length,
    mainTextSample: txt.slice(0, 300),
    visible: getComputedStyle(document.body).visibility,
  };
}
"""

RESOURCE_JS = r"""
() => {
  const nav = performance.getEntriesByType('navigation')[0] || {};
  const res = performance.getEntriesByType('resource').map(r => ({
    name: r.name,
    type: r.initiatorType,
    size: r.transferSize,
    encoded: r.encodedBodySize,
    dur: Math.round(r.duration),
    start: Math.round(r.startTime),
  }));
  const docs = res.filter(r => r.type === 'other' && r.name.split('?')[0].endsWith('.html'));
  return {nav: {ttfb: Math.round(nav.responseStart||0), dcl: Math.round(nav.domContentLoadedEventEnd||0), load: Math.round(nav.loadEventEnd||0), transfer: nav.transferSize, encoded: nav.decodedBodySize}, res};
}
"""


def audit(page_name: str, url: str, p) -> dict:
    out = {"name": page_name, "url": url}

    # ---------- desktop perf run ----------
    ctx = p.chromium.launch(headless=True).new_context(viewport={"width": 1440, "height": 900})
    page = ctx.new_page()
    page.add_init_script(PERF_OBSERVER)
    page.goto(url, wait_until="load", timeout=60000)
    page.wait_for_timeout(4000)
    # collect load-time metrics first, then do a small interaction (typing only,
    # so we never navigate away) to observe INP-relevant long tasks.
    lcp_at_load = page.evaluate("window.__lcp")
    cls_at_load = page.evaluate("window.__cls")
    try:
        inputs = page.query_selector_all("input:visible, input")
        if inputs:
            inputs[0].click(timeout=1500)
            page.keyboard.type("31", delay=40)
            page.wait_for_timeout(400)
            page.keyboard.press("Tab")
    except Exception:
        pass
    page.wait_for_timeout(1500)
    perf = page.evaluate(RESOURCE_JS)
    lcp = page.evaluate("window.__lcp")
    cls = page.evaluate("window.__cls")
    res = perf["res"]

    def tot(pred):
        return sum(r["size"] or 0 for r in res if pred(r))

    by = {
        "js": tot(lambda r: r["name"].split("?")[0].endswith((".js", ".mjs"))),
        "css": tot(lambda r: r["name"].split("?")[0].endswith(".css")),
        "font": tot(lambda r: r["name"].split("?")[0].endswith((".woff2", ".woff", ".ttf", ".otf")) or "font" in r["name"] or r["type"] == "link" and "font" in r["name"]),
        "img": tot(lambda r: r["type"] in ("img", "image") or r["name"].split("?")[0].endswith((".png", ".webp", ".jpg", ".jpeg", ".avif", ".svg", ".ico"))),
        "doc": tot(lambda r: r["type"] == "other"),
    }
    counts = {
        "js": len([r for r in res if r["name"].split("?")[0].endswith((".js", ".mjs"))]),
        "css": len([r for r in res if r["name"].split("?")[0].endswith(".css")]),
        "font": len([r for r in res if r["name"].split("?")[0].endswith((".woff2", ".woff")) or "fonts.gstatic" in r["name"]]),
        "img": len([r for r in res if r["type"] in ("img", "image")]),
    }
    # image detail
    imgs = []
    for el in page.query_selector_all("img"):
        d = page.evaluate("""(el) => { const r = el.getBoundingClientRect(); return {
            src: el.getAttribute('src'), current: el.currentSrc, nat: el.naturalWidth+'x'+el.naturalHeight,
            disp: Math.round(r.width)+'x'+Math.round(r.height), loading: el.getAttribute('loading'),
            fetchp: el.getAttribute('fetchpriority')||el.getAttribute('fetchPriority'),
            wh: (el.getAttribute('width')||'-')+'x'+(el.getAttribute('height')||'-'),
            picture: !!el.closest('picture'), alt: (el.getAttribute('alt')||'').slice(0,40)
        }; }""", el)
        d["bytes_transferred"] = next((r["size"] for r in res if r["name"] == d["current"]), None)
        imgs.append(d)

    out["perf"] = {
        "nav": perf["nav"],
        "lcp": lcp[-3:] if lcp else [],
        "lcp_at_load": lcp_at_load[-3:] if lcp_at_load else [],
        "cls": round(cls, 4),
        "cls_at_load": round(cls_at_load or 0, 4),
        "bytes_by_type": by,
        "counts": counts,
        "total_transfer": sum(r["size"] or 0 for r in res),
        "resources": sorted(res, key=lambda r: -(r["size"] or 0))[:25],
        "images": imgs,
        "long_tasks_slowest": sorted([r for r in res if r["name"].split('?')[0].endswith('.js')], key=lambda r: -r["dur"])[:8],
    }

    # ---------- mobile visual run ----------
    mctx = p.chromium.launch(headless=True).new_context(viewport={"width": 375, "height": 812}, device_scale_factor=2, is_mobile=True, has_touch=True)
    mp = mctx.new_page()
    mp.add_init_script(PERF_OBSERVER)
    mp.goto(url, wait_until="load", timeout=60000)
    mp.wait_for_timeout(2500)
    out["mobile"] = mp.evaluate(VISUAL_JS)
    out["mobile"]["lcp"] = mp.evaluate("window.__lcp")[-3:]
    out["mobile"]["cls"] = round(mp.evaluate("window.__cls") or 0, 4)
    # screenshots: above-fold only (full page already captured by capture_screenshot)
    out["mobile"]["dialogs"] = mp.evaluate("() => Array.from(document.querySelectorAll('dialog,[role=dialog],[aria-modal=true]')).map(d=>({t:(d.innerText||'').slice(0,80), open: d.open||d.getAttribute('aria-hidden')}))")
    mctx.close()

    # ---------- desktop above-fold visual ----------
    out["desktop_visual"] = page.evaluate(VISUAL_JS)
    out["desktop_visual"]["dialogs"] = page.evaluate("() => Array.from(document.querySelectorAll('dialog,[role=dialog],[aria-modal=true]')).map(d=>({t:(d.innerText||'').slice(0,80), open: d.open||d.getAttribute('aria-hidden')}))")
    page.close()
    ctx.close()

    # ---------- JS disabled ----------
    nj = p.chromium.launch(headless=True).new_context(viewport={"width": 1440, "height": 900}, java_script_enabled=False)
    np = nj.new_page()
    np.goto(url, wait_until="load", timeout=60000)
    np.wait_for_timeout(1500)
    out["nojs"] = np.evaluate(NO_JS_JS)
    np.close()
    nj.close()

    return out


def main():
    results = []
    with sync_playwright() as p:
        for name, url in URLS:
            print(f"... {name}", flush=True)
            try:
                results.append(audit(name, url, p))
            except Exception as e:
                results.append({"name": name, "url": url, "error": repr(e)})
    with open(sys.argv[1], "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2)
    print("written", sys.argv[1])


if __name__ == "__main__":
    main()
