# SPACEDEV – Space Development Consulting Limited

Static site for Space Development Consulting Limited. Built with [Eleventy](https://www.11ty.dev/) (local build); output is plain HTML/CSS/JS for upload to any shared hosting.

## Local setup

```bash
npm install
```

## Build (local)

Generate the site into the `dist/` folder:

```bash
npm run build
```

Output: **`dist/`** – static files ready to upload (index.html, css/, js/, assets/).

## Preview locally

```bash
npm run serve
```

Opens http://localhost:8080 with live reload.

## Upload to shared hosting

1. Run **`npm run build`** on your machine.
2. Upload the **contents** of the `dist/` folder to your web root (e.g. `public_html/` or `www/`) via FTP, SFTP, or your host’s file manager.
   - Upload: `dist/index.html`, `dist/css/`, `dist/js/`, `dist/assets/`.
   - Do **not** upload the `src/` folder or `node_modules/`; the host only needs what’s in `dist/`.

## Editing the site

- **Pages:** `src/*.njk` (e.g. `src/index.njk`).
- **Layout:** `src/_includes/layouts/base.njk`.
- **Header / footer:** `src/_includes/partials/header.njk`, `src/_includes/partials/footer.njk`.
- **Site data (nav, footer links, clients, address, etc.):** `src/_data/site.json`.

After changes, run **`npm run build`** again and re-upload the updated files from `dist/`.
