# Specification

## Summary
**Goal:** Add a simple, user-facing “Copy Link” action so users can copy and share the current page URL.

**Planned changes:**
- Add a globally discoverable “Copy Link” control in the header or footer that works on desktop and mobile.
- Implement copy-to-clipboard behavior that copies `window.location.href`.
- Show an English success confirmation (“Link copied”) and an error message if copying fails (“Could not copy link”), styled to match the existing black/gold luxury theme without breaking responsive layout.

**User-visible outcome:** Users can tap/click “Copy Link” to copy the current page link and share it, with clear success/error feedback.
