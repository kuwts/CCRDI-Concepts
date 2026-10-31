# Cleanup list (CCRDI)

Files that could be deleted in the cleanup phase. **Nothing has been deleted.** Delete only
after the project owner approves this list, then follow THEME_CATALOG.md "Removing a page
cleanly"; after each step run `npx astro check`, `npm run build` and a link check. Git history
keeps everything in any case.

Theme demo pages, content, components, media and packages: unchanged from the Consumer Choice
Canada project; see ccc-archive/cleanup-list.md (dev only, never in a production build).

## Consumer Choice Canada leftovers
Taken off the CCRDI site (phase 7 of the conversion plan) but kept as files until approved.
Updated as the conversion goes on.

| Item | Files | Notes |
|---|---|---|
| Our Brands page | `src/pages/our-brands.astro`, `src/content/brands/` | family of brands moves to Home, About and the footer |
| Brand pages | `src/pages/our-brands/[slug].astro`, `src/content/brand-pages/` | the CCRDI entry's template and copy are reused for /core-services first |
| 40 Years page | `src/pages/40-years.astro`, `src/content/anniversary/` | |
| For Businesses page | `src/pages/for-businesses.astro`, `src/content/businesses/` | |
| 40-year seal | `src/components/ccc/AnniversarySeal.astro` | after it's off Home and the footer |
| Press releases | `src/content/data/press-releases.json` | Consumer Choice Award's releases; the collection and `getPressReleases()` stay |
| CCC placeholder media | `src/assets/images/placeholders/` and `src/assets/videos/placeholders/` files no longer used | listed by file once the CCRDI pages are built |
| Unused logos | `src/assets/images/brands/ccc-logo.webp`, `ccm-logo.webp` | client originals; trimmed copies are used |
| Theme share image | `public/images/ogimage.png` | the theme's screenshot, not referenced |
| Source Serif 4 | `@fontsource-variable/source-serif-4` (package.json) | after the heading font changes |
| Brand specimen data | `src/dev-pages/brand/palette.json` | once the chosen palette is in site.config.json, point the specimen at `brand.colors` or remove the specimen pages (`src/dev-pages/brand/`, dev only) |
