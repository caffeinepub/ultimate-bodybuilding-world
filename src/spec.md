# Specification

## Summary
**Goal:** Make the Google Business Profile link easy to find and strengthen local SEO by adding LocalBusiness structured data.

**Planned changes:**
- Add a visible, English-labeled Google Business Profile link in the site Footer that opens in a new tab with `rel="noopener noreferrer"` and matches the existing black/gold luxury styling.
- Add a visible, English-labeled Google Business Profile link on the Contact page that opens in a new tab with `rel="noopener noreferrer"` and matches the existing black/gold luxury styling.
- Add LocalBusiness (or SportsActivityLocation/HealthClub) JSON-LD structured data in `frontend/index.html` including the business name, on-site address, the published phone number from `frontend/src/constants/contact.ts`, and the provided Google Business Profile URL.

**User-visible outcome:** Visitors can click a clearly labeled Google Business Profile link from the Footer and Contact page, and the site includes LocalBusiness structured data referencing the same profile for improved local SEO signals.
