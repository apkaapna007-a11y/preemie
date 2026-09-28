import json, sys, re, collections
d = json.load(open(sys.argv[1], encoding="utf-8"))
for p, v in d.items():
    if "error" in v:
        print(p, "ERROR", v["error"]); continue
    print("=" * 70)
    print(p)
    print("  title:", v["title"])
    print("  desc :", v["meta_desc"])
    print("  canon:", v["canonical"], "| robots:", v["robots"])
    print("  h1   :", v["h1s"])
    print("  ogurl:", v["og"].get("og:url"), "| sitename:", v["og"].get("og:site_name"), "| ogtitle:", v["og"].get("og:title"))
    print("  ld   :", v["ld_types"])
    print("  imgs :", v["ld_images"][:4])
    print("  textlen:", v["text_len"], "| citations:", v["citation_marks"], "| years:", v["years"])
    print("  review:", v["has_review_line"], v["review_snips"][:2])
    print("  h2/h3:", [h for h in v["headings_flat"] if h.startswith("h2") or h.startswith("h3")][:14])
