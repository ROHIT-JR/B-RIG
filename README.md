# B-RIG — Blockchain Research Interest Group

Official site of B-RIG at TIFAC-CORE in Cyber Security, Amrita Vishwa Vidyapeetham,
Coimbatore. Also hosts the announcement page for **BlockCatalyst 2026**, a 24-hour
inter-college blockchain hackathon on **19–20 December 2026**.

Live: https://rohit-jr.github.io/B-RIG/

No build step, no framework, no dependencies. Plain HTML, hand-written CSS and vanilla
JS, so next year's committee can maintain it with a text editor.

## Structure

| File | What it is |
|---|---|
| `index.html` | Club homepage — who we are, what we work on, upcoming events |
| `blockcatalyst.html` | The event page. Genesis gate plus the block chain |
| `assets/js/home.js` | Homepage countdown and scroll reveal |
| `assets/js/main.js` | Event page. **All event content lives here** |
| `assets/css/style.css` | Every style for both pages |

## Editing the event

Almost everything is data, not markup. Open `assets/js/main.js` and edit the block at
the top:

| Constant | What it does |
|---|---|
| `FORM_URL` | Registration/interest form. Falls back to Instagram while empty. |
| `SHOW_GATE` | `true` shows the genesis gate. **Set to `false` after launch.** |
| `COMMITMENTS` | SHA-256 digests of the problem statements. Shows "sealed" while empty. |
| `COMMIT_DATE` | Date shown while commitments are pending. |

Verticals, timeline entries and pending blocks are the `VERTICALS`, `TIMELINE` and
`PENDING` arrays in the same file. Add or remove array entries; the page re-renders itself.

## Design system

Monochrome by design — there is no accent hue. Emphasis comes from ink weight, serif
display type and whitespace. Two colour tokens do the work an accent normally would:

- `--ink` `#2B2A27` — CTAs, brand, active nav, state tags
- `--ink-soft` `#45433E` — links and the confirmed state

**Serif floor: 19px.** Instrument Serif is a display face; below ~19px its hairlines go
muddy on 1x displays. Any heading smaller than that reverts to Inter 500 — see the
`SERIF FLOOR` rule in `style.css`. If you add a small heading, add it to that selector
list rather than letting it inherit serif.

The only colour on the site is the institutional logos, which sit on white chips so they
read as official marks rather than stray palette.

## Launching

The event page opens on a locked "awaiting genesis" screen. Pressing **Mine the genesis
block** reveals the chain and stores that state in `localStorage`. Append `?live` to the
URL to bypass it. Once announced, set `SHOW_GATE = false`.

To see the gate again after mining it:

```js
localStorage.removeItem('bc26-genesis'); localStorage.removeItem('bc26-ts'); location.reload();
```

## Running locally

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Do **not** open the files with `file://` — `crypto.subtle`
is unavailable outside a secure context, and the hash chain silently falls back to a
non-cryptographic stub.

## Deploying

Settings → Pages → Deploy from a branch → `main` → `/ (root)`.

`.nojekyll` is present so `assets/` is served as-is. All paths are relative, so the
`/B-RIG/` project subpath works without configuration.

## Still to add

- [ ] `assets/img/og-cover.png` (1200×630) — without it, shared links preview as a grey box
- [ ] Problem statement commitments (`COMMITMENTS`)
- [ ] Club email, once available
- [ ] Set `SHOW_GATE = false` after the launch
