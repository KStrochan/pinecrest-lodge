# Pinecrest Lodge

Demo website for Pinecrest Lodge, a mountain lodge I made up for my portfolio. The business, people and prices are fictional; the code is real.

A small mountain lodge with cabins, a sauna and trails starting at the door.

## Status

In progress. The groundwork is done: brand colors and fonts, the contact form with Telegram delivery, metadata, tests and a Lighthouse check. The pages below are next.

Pages:

- [ ] Home
- [ ] Cabins (4 types)
- [ ] Things to do
- [ ] Gallery
- [ ] Booking
- [ ] Contact

Features:

- [ ] Availability calendar backed by a typed set of dates, with a booking request
- [ ] Gallery with a lightbox

## Design

Immersive: full-screen photography, deep forest green, warm sand and slow transitions.

| Token | Value |
| --- | --- |
| bg | `#1E2A22` |
| surface | `#26352B` |
| fg | `#E8DCC4` |
| muted | `#BDB4A0` |
| border | `#3A4A3F` |
| accent | `#E8DCC4` |
| on accent | `#1E2A22` |
| link | `#E8DCC4` |
| error | `#FF8A80` |
| radius | `4px` |

Headings use Playfair Display, body text uses Jost. Both are self-hosted from `app/fonts` through `next/font/local`.

## Stack

- Next.js 16 (App Router), React 19
- TypeScript in strict mode
- Tailwind CSS 4
- zod for form validation
- Vitest and Testing Library
- Lighthouse CI

## Getting started

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open http://localhost:3000.

| Command | What it does |
| --- | --- |
| `npm run dev` | Development server |
| `npm run build` | Production build |
| `npm run check` | Type check, lint and tests |
| `npm run lighthouse` | Builds the site, runs Lighthouse five times on mobile and fails if the median score in any category drops below 95 or the median LCP goes above 2.5 s |

## Contact form

Enquiries go to a Telegram chat. Copy `.env.example` to `.env.local` and fill in `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID`. Without them the form runs in demo mode and tells the visitor that nothing was sent.

## Deploying

Import the repository in Vercel and add the two Telegram variables if the form should deliver leads. Update `url` in `content/site.ts` once the site has its final domain.

## Credits

Fonts are licensed under the SIL Open Font License; the license texts are in `app/fonts`. Photos will come from Unsplash and are credited in the site footer.

## License

Code: MIT
