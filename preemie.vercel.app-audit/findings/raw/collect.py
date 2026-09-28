"""Collect structured signals from all sitemap URLs for GEO/SXO audit."""
import json, re, sys, urllib.request, html
from bs4 import BeautifulSoup

BASE = "https://preemie.vercel.app"
URLS = [
    "/", "/adjusted-age-calculator", "/pma-calculator", "/preemie-weight-gain",
    "/preemie-vaccines", "/late-preterm-baby", "/nicu-follow-up-schedule",
    "/when-can-my-preemie-start-solids", "/adjusted-age-vs-chronological-age",
    "/premature-baby-milestones", "/how-to-calculate-corrected-age",
    "/when-to-stop-correcting", "/red-flags", "/methodology", "/about", "/privacy",
]

def get(path):
    req = urllib.request.Request(BASE + path, headers={"User-Agent": "Mozilla/5.0 (compatible; SEOAudit/1.0)"})
    with urllib.request.urlopen(req, timeout=40) as r:
        return r.read().decode("utf-8", "replace"), dict(r.headers)

out = {}
for p in URLS:
    try:
        doc, hdrs = get(p)
    except Exception as e:
        out[p] = {"error": str(e)}
        continue
    soup = BeautifulSoup(doc, "html.parser")
    ld = []
    for s in soup.find_all("script", type="application/ld+json"):
        try:
            data = json.loads(s.string or "")
        except Exception:
            ld.append({"parse_error": True, "len": len(s.string or "")})
            continue
        if isinstance(data, list):
            ld.extend(data)
        elif isinstance(data, dict):
            if "@graph" in data:
                ld.extend(data["@graph"])
            else:
                ld.append(data)
    types = []
    for d in ld:
        t = d.get("@type")
        types.append(t if isinstance(t, str) else str(t))
    # collect author/reviewer/signals
    def grab(d, *keys):
        res = []
        if isinstance(d, dict):
            for k in keys:
                if k in d and isinstance(d[k], str):
                    res.append(d[k])
            for v in d.values():
                res.extend(grab(v, *keys))
        elif isinstance(d, list):
            for v in d:
                res.extend(grab(v, *keys))
        return res
    heads = [(h.name, h.get_text(" ", strip=True)[:160]) for h in soup.find_all(["h1", "h2", "h3"])]
    body = soup.find("body") or soup
    for tag in body.find_all(["script", "style", "noscript"]):
        tag.decompose()
    text = re.sub(r"\s+", " ", body.get_text(" ", strip=True))
    links = [a.get("href", "") for a in soup.find_all("a", href=True)]
    out[p] = {
        "title": (soup.title.get_text(strip=True) if soup.title else None),
        "meta_desc": (soup.find("meta", attrs={"name": "description"}).get("content") if soup.find("meta", attrs={"name": "description"}) else None),
        "robots": (soup.find("meta", attrs={"name": "robots"}).get("content") if soup.find("meta", attrs={"name": "robots"}) else None),
        "canonical": (soup.find("link", rel="canonical").get("href") if soup.find("link", rel="canonical") else None),
        "h1s": [h.get_text(" ", strip=True) for h in soup.find_all("h1")],
        "headings": heads,
        "og": {k[-1]: v for k, v in [(m.get("property") or m.get("name"), m.get("content")) for m in soup.find_all("meta", attrs={"property": re.compile("^og:")})] },
        "ld_types": types,
        "ld_names": grab(ld, "name", "headline", "alternateName"),
        "ld_urls": sorted(set(grab(ld, "url", "mainEntityOfPage"))),
        "ld_images": sorted(set(grab(ld, "image", "logo"))),
        "text_len": len(text),
        "text": text,
        "headings_flat": [f"{a}|{b}" for a, b in heads],
        "internal_links": sorted(set(l for l in links if l.startswith("/"))),
        "has_review_line": bool(re.search(r"[Rr]eviewed by|Last reviewed|Last clinical review", text)),
        "review_snips": re.findall(r"[^.]{0,90}(?:Reviewed by|reviewed by|Last reviewed|Last clinical review)[^.]{0,90}\.", text)[:4],
        "citation_marks": len(re.findall(r"\b(AAP|WHO|CDC|NIH|NICE|Cochrane|Lancet|Pediatrics|PubMed|PMC\d+|DOI|et al\.?|20\d\d)\b", text)),
        "years": sorted(set(re.findall(r"\b(?:19|20)\d\d\b", text)))[:30],
        "headers": {k: v for k, v in hdrs.items()},
    }

with open(sys.argv[1], "w", encoding="utf-8") as f:
    json.dump(out, f, ensure_ascii=False, indent=1)
print("done", len(out))
