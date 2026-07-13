# WagyuRanch.com — Content Extraction Notes

Extraction of the vintage WagyuRanch.com site (18-page GoDaddy Website Builder crawl) plus the 2019 Semen Catalog PDF into clean, structured content for the modern rebuild. Nothing was invented; the vintage firsthand voice was preserved and all conflicts with the fact-checked `breed_history.md` (WagyuTank) are flagged rather than silently "corrected."

## What was produced

### Education hub — `content/education/`
- **`what-wagyu-means.md`** (~1,000 words) — the four Japanese breeds; Black vs. Akaushi as distinct breeds; the strains (Tajima, Kedaka, Fujiyoshi/Itozakura, Shimane, Tottori, Okayama); Youhou-vs-Kedaka Tottori distinction; why strains still drive pedigrees.
- **`import-history.md`** (~2,300 words) — merged & de-duplicated 1976 + 1990s black and Akaushi import story, with a clear "What the record documents" vs. "Firsthand recollection" split, a year-by-year timeline (tagged Record/Oral) for charting, and 8 inline `<!-- FACTCHECK -->` flags.
- **`country-context.md`** — cleaned Australia / US / Canada / Scotland sections.
- All three carry YAML frontmatter (title, description, order).

### Hero-animal narratives — `content/animals/`
- `tajimax.md`, `kenhanafuji.md`, `big-al.md`, `wcc-chubby-buddy.md`, `polled-genetics.md` (Die Hard / Bruce Willis / G.I. Jane). Each has frontmatter (name, reg_no, breed, tagline, hero_photo hint, youtube_ids), full preserved narrative, a structured 3-gen pedigree JSON block, and pricing.

### Seed data — `backend/app/seed/data/`
- **`semen.json`** — 23 full semen offerings (all featured catalog bulls + website bulls) with 3-gen pedigrees, pricing ladders, CSS/export status, SCD/carrier, strain notes; plus `_price_list` of 39 quick-quote bulls from catalog pages 20-21.
- **`embryos.json`** — 26 numbered lots (dam×sire, location code, qty, price, EU-eligibility, status) + `_discount_tiers`.
- **`donors.json`** — 7 pedigree-dense donor cows (Mizukura 17W, ESF Yasufuku II N 0624 0, ESF Fukutsuru 068-42-68, WCC Delicious, Coates E208, Nanashi, UKB MS Homare Shige M30E).
- **`herd_bulls.json`** — ESF Barr Sanjirou 4P 042-147 with pedigree + narrative.
- **`pregnancies.json`** — 12 private-treaty pregnancy lots.
- **`cattle_for_sale.json`** — general-availability blurb, herd goals, bull-lease program (page was thin, as expected).
- **`image_manifest.json`** — 55 unique `/_images/*.jpg` mapped to pages, subject guess, suggested filename, alt text, and archive-existence (all 55 confirmed present in the archive).

## Top factual flags (vintage vs. WagyuTank `breed_history.md`)

1. **Mazda "Emperor gift to the Governor of Hawaii" legend.** The 2019 catalog and multiple site pages repeat that Mazda was a gift from Emperor Hirohito to the Governor of Hawaii and "the only 100% Tottori bull to ever leave Japan." `breed_history.md` documents the imperial-gift-to-Hawaii story as **folklore not supported by the primary record** — the 1976 import was a commercial purchase by Morris Whitney. Flagged in `import-history.md` and in the affected `semen.json` records; vintage voice preserved.

2. **Who selected the Akaushi, and the Akiko/"parking-lot straw" story.** `breed_history.md` (Bruce Hemingson's account) credits Hemingson with hand-picking the Akaushi and centers the drama on **Akiko** coming up open and being bred with a **$5,000 parking-lot straw of Dai 10 Mitsumaru** in a clandestine midnight breeding. The WagyuRanch account (told by **Yukio Kurosawatsu's son / Ken Kurosawatsu of Wagyu Sekai**) credits **Yukio** with the selection (Bruce alongside), names **Dai 8 Marunami** — *not* Akiko — as the "prefectural gem," and tells the in-quarantine breeding soberly. Both agree Big Al resulted (and his pedigree, sire Dai 10 Mitsumaru × dam Akiko, fits both). Two genuine firsthand accounts — neither overwritten.

3. **Mazda's strain: Youhou-line Tottori vs. Kedaka Tottori.** WagyuRanch is emphatic Mazda is a pure **Youhou-line** Tottori (no "Kedaka" bull in his pedigree); `breed_history.md` calls him "Tottori (Kedaka)." Both agree on Tottori; the sub-line differs.

4. **Kenhanafuji strain composition — reconciles.** Vintage variously says "75% Fujiyoshi / 25% Kedaka," "75% Shimane / 25% Kedaka," and "100% Kedaka × Shimane, zero Tajima." These agree with `breed_history.md` (≈¾ Fujiyoshi, ¼ Kedaka, no Tajima) because Fujiyoshi is a Shimane-centered strain. Noted as reconciliation, not conflict. Name spelling: "Hemmingsen" (vintage) vs. "Hemingson" (breed_history) — same man.

5. **Founder counts consistent.** Vintage "only 22 red/Akaushi exported" and "18 by the Woods (1994)" match `breed_history.md`'s 22 Akaushi. Vintage's "24 original import bulls" is a different (AI-sire) count than the 221-animal total and is noted as such, not treated as a contradiction.

## Contact-info ambiguity (unresolved by design)

- **Vintage site (`contact-us.html`):** WagyuRanch.com, **1324 Brayton Road, Fort Ann, NY 12827**; Grant Whitmer III; Cell 801-259-9358; Skype grant.whitmer.
- **2019 catalog (back page):** Grant Whitmer, **Box 962, Lehi, UT 84043**; 801-259-9358; info@wagyuranch.com; FB @WagyuRanch.com, Twitter @wagyuranch, Instagram @wagyu_ranch.

Both are preserved verbatim in the data; **not resolved** — pick the correct current address before launch.

## Thin / missing data & minor source quirks

- **Cattle-for-sale** and **more-info** pages are essentially blurbs (more-info = "Content coming soon"); captured as-is.
- **Tsunami 51B pedigree conflict:** the catalog pedigree table prints 51B's dam as "UKB MS J84 / 84-156E," but the shared photo caption and `semen.html` both indicate **Mizutani 607E** (Kenhanafuji × Heatherkura) is dam of 51B, 52B **and** 54B. `semen.json` follows Mizutani 607E and notes the discrepancy.
- **Itozakahana 52B tattoo:** catalog prints "10X" (Kikuyasu 10X's tattoo) — an apparent copy-paste error; recorded as **52B** in `semen.json`.
- **Tajimax sire spelling:** catalog prints "WESTHOLME HIRASHIGETAYASU ZZ78"; website + price list give "Z278" (FB8376). "ZZ78" is a typo; **Z278** used, noted.
- **Coates E208 Houston scan** (backfat 0.35 / marble 6.32 Choice / REA 13.25) sits ambiguously on `donors.html`; attributed to Coates E208 with an explicit uncertainty note.
- **Image/video-to-record mapping:** the flat WSB markup does not tie individual gallery images or several YouTube IDs to specific animals; those are recorded at page level (in `_meta`) rather than force-attributed. 13 of 55 images (home-page gallery) could not be individually identified.
- **Quantity-discount window** on embryos was "good through February 2017" — a vintage promo date, preserved but obviously stale.

## Sources
- Vintage crawl: `wagyuranch/_source/wr-crawl/` (18 HTML pages).
- 2019 Semen Catalog PDF: `~/Downloads/Wagyu Semen Catalog.pdf` (24 pages).
- Fact-check reference: `wagyutank/backend/app/seed/data/breed_history.md` + `foundation_bulls_enriched.json` / `foundation_cows_enriched.json`.
- Archived images: `wagyuranch-archive/live-site/_images/` (all 55 referenced files confirmed present).
