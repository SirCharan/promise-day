# Agents.md – Promise Day

Context for AI agents (e.g. Cursor) working on this repo.

## What This Project Is

- **Promise Day**: A shared “promise board” for two people (Her/Him). One room per 6-character code; promises sync in realtime via Firestore.
- **Design**: Whimsical, cute UX—cream background, floating hearts/stars, cloud-shaped input, polaroid-style promise cards. Match this vibe in all UI work.

## Must-Read Files

1. **`instructions.md`** – Core process for building: think step-by-step, reference `reference.html`, cute UX, error handling, final checklist. Follow it when adding features or fixing bugs.
2. **`reference.html`** – Single source of truth for styling: CSS variables (`--bg-cream`, `--shadow-hard`, etc.), cloud input (with `::before`/`::after` bubbles), promise card layout, pill selectors, fonts (Chewy, Nunito, Sniglet), animations (`floaty`). Copy styling from here; don’t invent new patterns without aligning with this file.

## Tech Stack (Stick To It)

- **Next.js 16** (App Router), **React 19**
- **Tailwind** + custom CSS variables from `reference.html`
- **Firebase**: Anonymous Auth, Firestore (`rooms/{roomId}/promises`), Analytics (optional). Realtime via `onSnapshot`.
- **Data**: `owner: "her" | "him"`, `text`, `createdAt`; room code = 6-char uppercase.

## Conventions

- **New UI**: Match reference.html (clouds, polaroid cards, press effects, floating decor). Use existing CSS variables and `font-[family-name:var(--font-chewy)]` etc.
- **Errors**: User-facing messages should be cute and friendly (e.g. “Oops, the clouds are hiding! Try again 💕”).
- **Optimistic UI**: When adding a promise, show the card immediately, then sync with Firestore.
- **PWA / mobile**: Viewport no zoom, mobile-first; `manifest.json` and meta are already set up.
- **Env**: All Firebase config via `NEXT_PUBLIC_FIREBASE_*` in `.env.local` (and Vercel env vars in production).

## Key Paths

- Landing: `src/app/page.tsx`
- Room: `src/app/[roomId]/page.tsx`
- Firebase helpers: `src/lib/firebase.ts`
- Shared components: `src/app/components/` (LandingDecor, RoomDecor, CloudInput, PromiseCard)
- Global styles / variables: `src/app/globals.css`
- Design reference: `reference.html` (root)

## Before Saying “Done”

Per `instructions.md`: confirm realtime sync, cute animations, room codes, and that everything matches the reference.html vibe.
