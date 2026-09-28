import json, sys, re, urllib.request
from bs4 import BeautifulSoup

BASE = "https://preemie.vercel.app"
URLS = ["/", "/adjusted-age-calculator", "/pma-calculator", "/preemie-weight-gain",
    "/preemie-vaccines", "/late-preterm-baby", "/nicu-follow-up-schedule",
    "/when-can-my-preemie-start-solids", "/adjusted-age-vs-chronological-age",
    "/premature-baby-milestones", "/how-to-calculate-corrected-age",
    "/when-to-stop-correcting", "/red-flags", "/methodology", "/about", "/privacy"]

def get(p):
    req = urllib.request.Request(BASE + p, headers={"User-Agent": "Mozilla/5.0 SEOAudit/1.0"})
    return urllib.request.urlopen(req, timeout=40).read().decode("utf-8", "replace")

rows = []
domains = {}
for p in URLS:
    doc = get(p)
    soup = BeautifulSoup(doc, "html.parser")
    og = {}
    for m in soup.find_all("meta"):
        prop = m.get("property")
        if prop and prop.startswith("og:"):
            og[prop] = m.get("content")
    lds = []
    for s in soup.find_all("script", type="application/ld+json"):
        try:
            d = json.loads(s.string or "")
        except Exception:
            continue
        lds.extend(d if isinstance(d, list) else ([*d["@graph"]] if isinstance(d, dict) and "@graph" in d else [d]))
    def walk(o, path=""):
        if isinstance(o, dict):
            for k, v in o.items():
                yield from walk(v, path + "." + k)
        elif isinstance(o, list):
            for i, v in enumerate(o):
                yield from walk(v, path + "[]")
        elif isinstance(o, str):
            yield path, o
    urls, domains_on_page = set(), set()
    for path, val in walk(lds):
        if val.startswith("http"):
            urls.add(val)
            m = re.match(r"https?://([^/]+)", val)
            if m: domains_on_page.add(m.group(1))
    for u in (og.get("og:url"), soup.find("link", rel="canonical") and soup.find("link", rel="canonical").get("href")):
        if u:
            urls.add(u)
            m = re.match(r"https?://([^/]+)", u)
            if m: domains_on_page.add(m.group(1))
    text = soup.get_text(" ", strip=True)
    ext = sorted(set(re.findall(r"https?://[^\s\"'<>()]+", doc)))
    ext_domains = sorted(set(re.match(r"https?://([^/]+)", e).group(1) for e in ext if re.match(r"https?://([^/]+)", e)))
    ldstr = json.dumps(lds)
    rows.append({
        "p": p,
        "title": soup.title.get_text(strip=True) if soup.title else None,
        "og:url": og.get("og:url"),
        "og:site_name": og.get("og:site_name"),
        "og:type": og.get("og:type"),
        "og:image": og.get("og:image"),
        "canonical": soup.find("link", rel="canonical").get("href") if soup.find("link", rel="canonical") else None,
        "ld_domains": sorted(domains_on_page),
        "ext_domains": ext_domains,
        "has_dateModified": "dateModified" in ldstr,
        "has_datePublished": "datePublished" in ldstr,
        "has_sameAs": "sameAs" in ldstr,
        "has_reviewedBy": "reviewedBy" in ldstr,
        "has_author": '"author"' in ldstr or '"Author"' in ldstr,
        "mentions_drzeewrites": "drzeewrites" in doc.lower(),
        "mentions_drzeeshanislam_blog": "drzeeshanislam.blog" in doc.lower(),
        "brand_in_title": "AdjustedAge" in (soup.title.get_text() or ""),
        "ld_person_names": sorted(set(re.findall(r'"(?:name|alternateName)":"(Dr\.[^"]{0,60})"', ldstr))),
        "ld_org": sorted(set(re.findall(r'"@type":"Organization".{0,400}?"name":"([^"]+)"', ldstr))),
        "dateModified_vals": sorted(set(re.findall(r'"dateModified":"([^"]+)"', ldstr))),
        "datePublished_vals": sorted(set(re.findall(r'"datePublished":"([^"]+)"', ldstr))),
        "publisher_vals": sorted(set(re.findall(r'"publisher":\{?"?@?type?":?[^,]{0,40}', ldstr)))[:3],
    })

print(json.dumps(rows, ensure_ascii=False, indent=1))
