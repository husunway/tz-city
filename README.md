# TZ City

A Next.js site, protected by a username and password, that shows a three.js scene after you sign in. It's ready to deploy to Vercel.

## How it works

- `middleware.ts` sends any visitor without a valid session to `/login`.
- `/api/login` checks the credentials against environment variables and sets a signed, httpOnly session cookie (valid for 12 hours).
- `/scene` serves `protected/scene.html`, the three.js page. The file lives outside `public/`, so it can't be fetched without signing in. The route also checks the session itself.
- The home page shows `/scene` full-screen, with a logout button.

## Using your own three.js file

Replace `protected/scene.html` with your file. If it loads other local files (models, textures, JS), add routes for them or load them from a CDN. Anything in `public/` is also behind the middleware login.

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

1. Push this folder to a GitHub, GitLab or Bitbucket repo and import it at vercel.com/new. Or run `npx vercel` from this folder.
2. In **Project → Settings → Environment Variables**, add `AUTH_USERNAME`, `AUTH_PASSWORD` and `AUTH_SECRET`.
3. Deploy, or redeploy if you added the variables after the first deploy.
