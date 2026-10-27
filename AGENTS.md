# Salanki Astrology: agent notes

A marketing and booking site for a Vedic astrology (Jyotisha) practice. It started from the TanStack Start marketing template. It has no accounts, payments or database, and booking requests go through Netlify Forms.

## Layout

- `src/routes/__root.tsx`: document shell, meta tags, Google Fonts (Cormorant Garamond + Hind), fixed `.sky` backdrop, shared header and footer
- `src/routes/index.tsx` → `src/components/HomePage.tsx`: hero, services grid, Rashi wheel explorer, steps, about, booking form
- `src/routes/services/$serviceId.tsx` → `src/components/ServicePage.tsx`: service detail with booking form preselected; unknown IDs throw `notFound()`
- `src/components/SiteChrome.tsx`: header/footer. Nav uses `/#section` anchors so it works from any page
- `src/components/BookingForm.tsx`: the controlled service select, AJAX submission, and pending/error/success states
- `src/data/`: all copy and content (`site.ts`, `services.ts`, `rashis.ts`). Edit content here, not in the components
- `public/__forms.html`: static Netlify Forms registration
- `public/img/`: AI-generated artwork. Always reference it through `/.netlify/images?url=/img/<file>&w=<n>&fm=webp`

## Conventions and decisions

- Theme colours and fonts are Tailwind 4 `@theme` tokens in `src/styles.css` (`night`, `ink`, `dusk`, `gold`, `saffron`, `parchment`, `umber`). Shared classes are `.action`, `.action-ghost`, `.eyebrow`, `.ornament`, `.form-input`, `.form-label`, `.rise`, `.slow-turn`, and the animations respect `prefers-reduced-motion`.
- Service IDs are URL slugs, and lookup is exact match.
- **Forms:** the form POSTs URL-encoded data to `/__forms.html`, because in SSR a POST to `/` hits the server function. Every field name in `BookingForm.tsx` must also appear in `public/__forms.html`, and a test enforces this. The success check rejects responses that still contain `data-netlify`, so an unprocessed local preview isn't mistaken for delivery.
- Birth date and place are not required for Prashna, which doesn't need birth details.
- No prices or contact numbers are shown, because none were given. Add them to `site.ts` / `services.ts` when they're known.
- Keep TypeScript on 6, because the Netlify adapter's build tooling needs it. The build doesn't type-check, so run `npm run typecheck` after dev/build has generated `routeTree.gen.ts`.
