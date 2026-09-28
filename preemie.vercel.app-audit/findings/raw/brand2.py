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

lines = []
for p in URLS:
    doc = get(p)
    soup = BeautifulSoup(doc, "html.parser")
    metas = {}
    for m in soup.find_all("meta"):
        k = m.get("property") or m.get("name")
        if k:
            metas.setdefault(k, m.get("content"))
    lds = []
    for s in soup.find_all("script", type="application/ld+json"):
        try:
            d = json.loads(s.string or "")
        except Exception as e:
            lines.append(f"{p} LD-PARSE-ERROR {e}")
            continue
        lds.extend(d if isinstance(d, list) else ([*d["@graph"]] if isinstance(d, dict) and "@graph" in d else [d]))
    types = [d.get("@type") for d in lds if isinstance(d, dict)]
    def find(o, key, acc=None):
        acc = acc if acc is not None else []
        if isinstance(o, dict):
            for k, v in o.items():
                if k == key:
                    acc.append(v)
                find(v, key, acc)
        elif isinstance(o, list):
            for v in o:
                find(v, key, acc)
        return acc
    def flat(o, key):
        vals = []
        for v in find(o, key):
            if isinstance(v, str):
                vals.append(v)
            elif isinstance(v, dict):
                vals.append({kk: vv for kk, vv in v.items() if kk in ("name", "@type", "url", "identifier", "image", "logo", "sameAs", "jobTitle", "description", "value", "width", "height", "caption", "contentSize", "encodingFormat")})
            elif isinstance(v, list):
                vals.append(v)
        return vals
    lines.append("=" * 60)
    lines.append(p)
    lines.append("  ld types: %s" % types)
    lines.append("  headline: %s" % flat(lds, "headline"))
    lines.append("  author: %s" % json.dumps(flat(lds, "author"), ensure_ascii=False)[:600])
    lines.append("  reviewedBy: %s" % json.dumps(flat(lds, "reviewedBy"), ensure_ascii=False)[:600])
    lines.append("  publisher: %s" % json.dumps(flat(lds, "publisher"), ensure_ascii=False)[:400])
    lines.append("  datePublished: %s dateModified: %s lastReviewed: %s" % (flat(lds, "datePublished"), flat(lds, "dateModified"), flat(lds, "lastReviewed")))
    lines.append("  sameAs: %s" % flat(lds, "sameAs"))
    lines.append("  image: %s" % json.dumps(flat(lds, "image"), ensure_ascii=False)[:300])
    lines.append("  mainEntity/about: %s" % json.dumps(flat(lds, "about"), ensure_ascii=False)[:300])
    lines.append("  og: published=%s modified=%s image=%s site_name=%s type=%s" % (
        metas.get("article:published_time"), metas.get("article:modified_time"), metas.get("og:image"), metas.get("og:site_name"), metas.get("og:type")))
    lines.append("  twitter:image=%s card=%s" % (metas.get("twitter:image"), metas.get("twitter:card")))
    lines.append("  inLanguage/format: %s" % flat(lds, "inLanguage"))
    lines.append("  vocab size: %d blocks, bytes=%d" % (len(lds), len(json.dumps(lds))))

out = "\n".join(lines)
open(sys.argv[1], "w", encoding="utf-8").write(out)
print("ok")
