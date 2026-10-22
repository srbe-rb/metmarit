# metmarit.nl

Static site built with Eleventy, hosted on Cloudflare Pages.

- Build command: `npx @11ty/eleventy` · output folder: `_site`
- Marit edits Schrijven, Werk en ervaring and Wie is Marit? via Pages CMS (`.pages.yml`).
- Other pages live in `src/*.njk`; shared layout in `src/_includes/base.njk`; contact details in `src/_data/site.json`.

## Preview and launch

- `src/_data/site.json` has `"preview": true`. While true, every page carries `noindex` and `robots.txt` blocks all crawlers, so the temporary pages.dev address stays out of Google.
- At launch on metmarit.nl: set `"preview": false`, commit, and Cloudflare rebuilds.
