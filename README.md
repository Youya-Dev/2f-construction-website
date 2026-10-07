# 2F Construction website

A static multi-page site. Edit files in `src/`, then run `node build.mjs` to regenerate `site/`, which is the folder you deploy (Netlify, Vercel or Cloudflare Pages; no other dependencies).

- `src/layout.html`: header, menu and footer shared by every page
- `src/pages/`: one file per page (home, services, the three trade pages, our work, about, FAQs, contact)
- `src/partials/`: sections reused on several pages (quote banner, reviews, areas, process, benefits)
- `src/styles.css`: colours and fonts are the tokens at the top

## Placeholders to replace before launch

- **Logo**: `src/assets/logo.svg` is a temporary mark.
- **Colours and font**: tokens at the top of `src/styles.css`.
- **Phone**: 0115 496 0123 is an Ofcom fictional number. Search `496 0123`.
- **Email**: `hello@example.co.uk`.
- **Photos**: every green hatched panel (`.ph`) is an image slot, labelled with the photo it needs.
- **Reviews and stats**: marked "Sample review" / "Placeholder figures".
- **Team, about story, insurance, accreditations, payment and guarantee FAQs, company number**: marked as placeholders on the page.
- **Quote form**: not connected. See the TODO in `src/script.js` (Formspree or Netlify Forms are the easy options).
