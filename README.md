# Promise Day ✨

A cute, whimsical web app for you and your person to share promises in a single room. Create or join with a 6-character code; add promises as “Her” or “Him”; they sync in realtime.

## Tech Stack

- **Next.js 16** (App Router) + React 19
- **Tailwind CSS 4** + custom CSS (see `reference.html` for design system)
- **Firebase**: Anonymous Auth, Firestore (realtime), Analytics
- **Fonts**: Chewy, Nunito, Sniglet (Google Fonts)

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Environment variables

Copy `.env.example` to `.env.local` and fill in your Firebase config (or use the existing `.env.local` if present):

```bash
cp .env.example .env.local
```

Required: `NEXT_PUBLIC_FIREBASE_*` keys from [Firebase Console](https://console.firebase.google.com) (project **promiseday**). Enable **Anonymous Authentication** and **Firestore**.

### 3. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Create a room, share the code, add promises.

## Project Structure

| Path | Purpose |
|------|--------|
| `src/app/page.tsx` | Landing: Create Room / Join Room |
| `src/app/[roomId]/page.tsx` | Room page: tabs, promise list, cloud input |
| `src/app/components/` | LandingDecor, RoomDecor, CloudInput, PromiseCard |
| `src/lib/firebase.ts` | Auth, Firestore, room code, realtime subscription |
| `reference.html` | Design reference (styling, cloud, cards) |
| `instructions.md` | Build guidelines for AI / contributors |
| `agents.md` | Context for AI agents (Cursor, etc.) |

## Documentation

- **`instructions.md`** – Step-by-step build process, reference checklist, and UX/error-handling guidelines. Use when adding features or fixing bugs.
- **`agents.md`** – Project context for AI assistants: tech stack, conventions, key paths, and “done” checklist.
- **`reference.html`** – Single source of truth for styling (CSS variables, cloud input, promise cards, fonts, animations).

## Deploy (Vercel)

- Repo is connected to Vercel; push to `main` to deploy.
- In [Vercel → Project → Settings → Environment Variables](https://vercel.com/docs/projects/environment-variables), add all `NEXT_PUBLIC_FIREBASE_*` vars for Production (and Preview if needed), then redeploy.

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run start` — Run production server locally
- `npm run lint` — Run ESLint
