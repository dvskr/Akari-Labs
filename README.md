# akarilabs.io

The site of Akari Labs: one page that shows every product we build and run, from the job boards and the
job search inside ChatGPT and Claude to Tetsu, the workout app.

## How the page is put together

- `src/app/page.tsx` renders the page's markup (`src/app/akari-markup.ts`) on the server.
- `src/app/akari.css` is its stylesheet; `src/app/globals.css` is the small base under it.
- `public/akari/site.js` runs after hydration: the ring of clay islands, the rope control, the boards trail,
  the chat demo, the phones and the contact form.
- `public/assets/` holds the pictures: the islands (`n-*` and their light layers `e-*`), the board
  screenshots, the rope and beads, clouds and textures.
- `src/app/api/contact/route.ts` checks a note from the form and saves it to the Supabase table `messages`
  (`supabase/migrations/001_create_messages.sql`), with a Discord notification when `DISCORD_WEBHOOK` is set.

## Environment

See `.env.example`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and optionally
`SUPABASE_SERVICE_ROLE_KEY` and `DISCORD_WEBHOOK`. Never commit real values.

## Run it

```bash
npm install
npm run dev
```
