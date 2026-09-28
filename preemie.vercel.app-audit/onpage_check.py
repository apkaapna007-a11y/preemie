"""On-page SEO extraction across all sitemap URLs.

Emits onpage.json next to this script: per-URL title/description lengths,
H1/H2 structure, OG/Twitter tags, canonical, robots, viewport, lang,
internal link count and heading-level skips.
"""

import json
import re
import sys
from urllib.parse import urljoin, urlparse

import requests
from bs4 import BeautifulSoup

BASE = "https://preemie.vercel.app"
SITEMAP = BASE + "/sitemap.xml"
UA = "Mozilla/5.0 (compatible; ClaudeSEOAudit/1.0)"

NS = {"sm": "http://www.sitemaps.org/schemas/sitemap/0.9"}


def sitemap_urls() -> list[str]:
    xml = requests.get(SITEMAP, timeout=30, headers={"User-Agent": UA}).text
    soup = BeautifulSoup(xml, "xml")
    return [loc.text.strip() for loc in soup.find_all("loc")]


def get(url: str):
    r = requests.get(url, timeout=30, headers={"User-Agent": UA}, allow_redirects=True)
    return r


def meta(soup: BeautifulSoup, attr: str, key: str) -> str | None:
    tag = soup.find("meta", attrs={attr: key})
    return tag.get("content", "").strip() if tag else None


def analyse(url: str, html: str, status: int) -> dict:
    soup = BeautifulSoup(html, "html.parser")
    title = (soup.title.get_text(strip=True) if soup.title else "") or ""
    md = meta(soup, "name", "description") or ""
    robots = meta(soup, "name", "robots") or ""
    canon = soup.find("link", rel="canonical")
    h1s = [h.get_text(" ", strip=True) for h in soup.find_all("h1")]
    headings = [int(h.name[1]) for h in soup.find_all(re.compile(r"^h[1-6]$"))]
    skips = []
    prev = 0
    for lvl in headings:
        if prev and lvl > prev + 1:
            skips.append(f"h{prev}->h{lvl}")
        prev = lvl

    internal = set()
    for a in soup.find_all("a", href=True):
        href = a["href"].strip()
        if href.startswith("#") or href.startswith("mailto:") or href.startswith("tel:"):
            continue
        absu = urljoin(url, href)
        if urlparse(absu).netloc == urlparse(BASE).netloc:
            internal.add(absu.split("#")[0])

    viewport = meta(soup, "name", "viewport") is not None
    lang = soup.html.get("lang") if soup.html else None

    return {
        "url": url,
        "status": status,
        "title": title,
        "title_len": len(title),
        "title_over_60": len(title) > 60,
        "description": md,
        "desc_len": len(md),
        "desc_over_160": len(md) > 160,
        "desc_short": 0 < len(md) < 120,
        "h1_count": len(h1s),
        "h1": h1s[:2],
        "h2_count": len(soup.find_all("h2")),
        "heading_skips": skips[:5],
        "canonical": canon.get("href") if canon else None,
        "robots": robots,
        "og_title": meta(soup, "property", "og:title"),
        "og_desc": meta(soup, "property", "og:description"),
        "og_image": meta(soup, "property", "og:image"),
        "og_url": meta(soup, "property", "og:url"),
        "og_type": meta(soup, "property", "og:type"),
        "tw_card": meta(soup, "name", "twitter:card"),
        "tw_image": meta(soup, "name", "twitter:image"),
        "viewport": viewport,
        "lang": lang,
        "jsonld_blocks": len(soup.find_all("script", type="application/ld+json")),
        "internal_links": len(internal),
        "word_count": len(soup.get_text(" ", strip=True).split()),
    }


def main() -> int:
    out = {"pages": [], "errors": []}
    for url in sitemap_urls():
        try:
            r = get(url)
            out["pages"].append(analyse(url, r.text, r.status_code))
        except Exception as exc:  # noqa: BLE001 - report, don't abort the crawl
            out["errors"].append({"url": url, "error": str(exc)})

    pages = out["pages"]
    out["totals"] = {
        "pages": len(pages),
        "all_200": all(p["status"] == 200 for p in pages),
        "titles_over_60": sum(p["title_over_60"] for p in pages),
        "descs_over_160": sum(p["desc_over_160"] for p in pages),
        "descs_short": sum(p["desc_short"] for p in pages),
        "missing_h1": sum(1 for p in pages if p["h1_count"] != 1),
        "missing_og": sum(1 for p in pages if not (p["og_title"] and p["og_desc"] and p["og_image"])),
        "missing_tw": sum(1 for p in pages if not p["tw_card"]),
        "missing_canonical": sum(1 for p in pages if not p["canonical"]),
        "missing_viewport": sum(1 for p in pages if not p["viewport"]),
        "heading_skips": sum(1 for p in pages if p["heading_skips"]),
        "min_words": min((p["word_count"] for p in pages), default=0),
        "median_words": sorted(p["word_count"] for p in pages)[len(pages) // 2] if pages else 0,
        "total_internal_links": sum(p["internal_links"] for p in pages),
    }

    here = sys.argv[0].rsplit("\\", 1)[0]
    dest = here + "\\onpage.json"
    with open(dest, "w", encoding="utf-8") as fh:
        json.dump(out, fh, indent=2, ensure_ascii=False)
    print(json.dumps(out["totals"], indent=2))
    print(f"written: {dest}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
