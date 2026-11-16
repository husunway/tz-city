# Palace Walk (宫苑回廊 · 实景漫步)

A first-person walkthrough of a Gaussian-splat scene generated with World Labs Marble.
Plain static files: no build step, no server code.

## Contents

| File | Size | Purpose |
| --- | --- | --- |
| `index.html` | 5 KB | The page: start screen, viewpoint buttons, settings |
| `app.js` | 3.3 MB | Renderer (three.js + Spark), walking, collision, touch controls |
| `assets/world.spz` | 61 MB | High-quality scene, 4.32 million splats (default on desktop) |
| `assets/world_lite.spz` | 21 MB | Light scene, 1.5 million splats (default on phones) |
| `assets/collider.glb` | 1.7 MB | Invisible collision mesh: floors, walls, stairs |

## Add it to your website

1. Copy the whole `palace-walk` folder into your site's public/static folder,
   for example so it is served at `https://your-site.com/palace-walk/`.
   - Plain HTML site: put it next to your other pages.
   - Next.js, Vite, Astro and similar: put it inside `public/`.
2. Link to it: `<a href="/palace-walk/">Walk the palace corridor</a>`
3. Or embed it in another page:

   ```html
   <iframe src="/palace-walk/" style="width:100%;aspect-ratio:16/9;border:0"
           allow="fullscreen" allowfullscreen></iframe>
   ```

   Mouse-look uses pointer lock, which works inside a same-site iframe. Visitors can also drag to look around.

## Notes

- It must be served over http(s). Opening `index.html` directly from disk (`file://`) will not load the scene.
  To test locally, run `npx serve palace-walk` and open the address it prints.
- Hosting size limits: `world.spz` is 61 MB. Static hosts with a per-file limit below that (for example
  GitHub without Git LFS, which caps files at 100 MB but warns above 50 MB) may need it moved elsewhere.
  To host the scene files on a CDN or storage bucket, change one line in `index.html`:
  `window.PALACE_ASSETS = "https://your-cdn.example.com/palace/";` (the server must allow cross-origin requests).
- To serve only the light version, delete `assets/world.spz`; then always open the page as `/palace-walk/#lite`.
- Quality is chosen automatically (phones: light, desktop: high). Visitors can switch on the start screen,
  or you can force it with `#lite` or `#hq` at the end of the link.
- Viewpoints are listed in `index.html` under `window.PALACE_VIEWS` (x, z in metres, yaw in radians) and can be edited.
- Third-party code bundled in `app.js`: three.js (MIT), Spark by World Labs (MIT), three-mesh-bvh (MIT).
  Check World Labs' terms for your plan before using the generated scene commercially.
