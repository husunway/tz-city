# TZ City

A Next.js site, protected by a username and password, that shows the Palace Walk three.js scene after you sign in. It's ready to deploy to Vercel.

## How it works

- `middleware.ts` sends any visitor without a valid session to `/login`. This covers every page and every file in `public/`, including the scene files.
- `/api/login` checks the credentials against environment variables and sets a signed, httpOnly session cookie (valid for 12 hours).
- The home page shows `public/palace-walk/index.html` full-screen, with a logout button.
- Scene files live in `public/palace-walk/` (see its own README). `world.spz` is 61 MB and `world_lite.spz` is 21 MB.

## Environment variables

| Name            | Purpose                                  |
| --------------- | ---------------------------------------- |
| `AUTH_USERNAME` | Login username                           |
| `AUTH_PASSWORD` | Login password                           |
| `AUTH_SECRET`   | Long random string for signing sessions  |

Changing `AUTH_PASSWORD` or `AUTH_SECRET` logs out every existing session.

## Run locally

```bash
cp .env.example .env.local   # then edit the values
npm install
npm run dev
```

## Deploy to Vercel

1. Import the GitHub repo at vercel.com/new.
2. In **Project → Settings → Environment Variables**, add `AUTH_USERNAME`, `AUTH_PASSWORD` and `AUTH_SECRET`.
3. Deploy, or redeploy if you added the variables after the first deploy.
