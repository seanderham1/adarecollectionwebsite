# SEO post-deploy verification

Run after deploying to production (`theadarecollection.com`).

## Crawl & index

- [ ] Confirm new URLs return 200: `/ryder-cup-packages`, `/corporate-hospitality`, `/services`
- [ ] `https://theadarecollection.com/sitemap.xml` lists all static routes + 12 property URLs
- [ ] Google Search Console → Sitemaps → submit `https://theadarecollection.com/sitemap.xml`
- [ ] Request indexing for homepage and one new landing page (URL Inspection)

## Rich results

- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results): homepage (Organization/WebSite)
- [ ] Rich Results Test: one property URL (LodgingBusiness + VacationRental)
- [ ] Rich Results Test: `/faq` (FAQPage)
- [ ] Rich Results Test: `/contact` (LocalBusiness)

## On-page sanity

- [ ] View source on prerendered routes: canonical and `og:url` match public URL
- [ ] No contradictory copy (flights sold on `/services` vs FAQ)
- [ ] Mobile check: footer links to packages, corporate, services

## Monitoring (ongoing)

- [ ] GSC → Performance: track focus keywords per property (see `seo-property-focus.ts`)
- [ ] Monitor CTR and enquiry conversions, not rankings alone
- [ ] Quarterly: refresh on-page copy if GSC shows new query variants
