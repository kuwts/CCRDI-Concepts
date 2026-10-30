# Questions for the project owner

Decisions only you can make, logged while building unattended. Each one has the choice made in
the meantime (the safest reasonable one); none of them is hard to undo.

1. **Contact details labels.** content.md has the label "Email" (form fields) but none for phone
   or address. The Contact page shows "Email" as a label and the phone and address placeholders
   without labels. Approve "Phone" and "Address" as labels?
2. **Contact form placeholders.** *Answered: visible labels.* The fields now show content.md's
   names (Name, Email, Organization, Message) as visible labels, with the placeholders kept as
   hints, and the theme's job-form `*` marker on the required fields (hidden from screen
   readers, which announce "required" from the field itself).
3. **Thank-you and 404 text.** Heading, message and page title are placeholders; the button
   reuses "Return Home" (content.md 404 label). Approve "Return Home" on the thank-you page?
4. **Brand page links.** The Our Brands cards now link to the new brand pages with "Learn More"
   (content.md button label), instead of the website / Contact links. The Award's website link
   moved to its brand page sidebar. OK?
5. **Main menu.** "Our Brands" stays a single link; the three brand pages are reached from it
   (and the footer). Make it a dropdown with the three brands instead?
6. **Careers thank-you page.** /thank-you/application (the theme's job application
   confirmation) is not in the sitemap and is not linked anywhere; it still has theme demo copy.
   It is on the cleanup list rather than deleted (no theme files deleted without approval).
7. **Award process copy.** The Award brand page quotes ccaward.com's own description of how
   winners are chosen and its four process steps (sources in gaps.md). Confirm the client is
   happy for that copy to appear on the CCC site as well.
8. **Brand page headings.** Body headings on the Award and Marketing pages use their §2 core
   messages ("Recognizing businesses that earn consumer trust", "Helping award-winning
   businesses tell their story and grow"); CCRDI uses its §7 hero heading "Data That Builds
   Better Businesses". OK as headings?
9. **Social links in structured data.** *Answered: removed from the structured data, kept as
   footer links (gaps.md).* The footer now links to Consumer Choice Award's official
   social accounts (from ccaward.com). The homepage's Organization structured data lists the
   site's social links as `sameAs`, so search engines are told those are Consumer Choice
   Canada's profiles. Keep that, or leave them out of `sameAs` until CCC has its own accounts?
10. **Winners directory scope.** "Find a Trusted Business" goes to the full directory
    (https://ccaward.com/award-winners/, Canada and USA). Use the Canada-only page instead?
11. **Truncated instruction.** The last request ended at "Footer"; it was read as the audit's
    footer email fix (a placeholder is now plain text, not a broken mailto: link). Say if
    something else was meant.

12. **Site domain (`baseURL`).** *Answered: consumerchoicecanada.com.* `baseURL` is now
    `https://consumerchoicecanada.com`; canonical URLs, `og:url`, share image URLs, the XML
    sitemap, robots.txt, structured data and breadcrumbs all follow it.
13. **More Consumer Choice Marketing copy (for the client).** The Consumer Choice Marketing page
    is the thinnest on the site: framework sections 1 to 13 give it only a core message, a
    one-liner, a relationship line and a tagline, and its service list ("Digital marketing",
    "Content", "Brand amplification", "Reputation") comes from the draft notes and is still
    unconfirmed. To fill the page out, please supply:
    - **Services:** what Consumer Choice Marketing offers award winners, with a short
      description of each
    - **Approach:** how it works with a business, from recognition to campaign
    - **Results:** outcomes it can point to (real figures or examples only, with permission
      to publish them)
    - **Testimonials:** quotes from businesses it has worked with, to replace the placeholders
