# Salanki Astrology

A website for Salanki Astrology, offering Vedic Jyotisha consultations: birth chart (Janma Kundli) readings, marriage matching, career and finance guidance, muhurtha selection, remedies and Prashna. Visitors can browse the services, explore the twelve Rashis on an interactive wheel, and request a consultation with their birth details through a booking form.

## Tech

- [TanStack Start](https://tanstack.com/start) + React 19, file-based routes
- Tailwind CSS 4 (theme tokens in `src/styles.css`)
- Netlify Forms for consultation requests (no backend code or API keys)
- Netlify Image CDN to serve resized WebP versions of the artwork in `public/img/`

## Running locally

```bash
npm install
netlify dev        # or: npm run dev (form submissions only work under Netlify)
npm test
```

## Editing content

- `src/data/site.ts`: name, tagline, astrologer, languages, consultation modes, the how-it-works steps
- `src/data/services.ts`: the consultations shown on the home page and at `/services/<id>`
- `src/data/rashis.ts`: the Rashi explorer content

Booking requests show up in the Netlify dashboard under **Forms → consultation-booking**. You can add email notifications there.

## Possible next steps

- Add contact details (phone/WhatsApp, address) and consultation fees
- Real photos and a biography of the astrologer
- Kannada and Hindi versions of the site
