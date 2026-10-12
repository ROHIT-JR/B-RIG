# Design review — B-RIG club site + BlockCatalyst 2026

**Date:** 2026-10-12
**Genre:** decision (approve / revise / reject the current theme)
**Reviewed:** `index.html`, `blockcatalyst.html` at localhost:8731
**Corpus:** 24 live technical/crypto sites (see `sources/01_inspo_crypto_corpus.md`)

---

## Verdict

**Approve the structure. Revise the palette. Add one security-native layer.**

Not a redo. The hard, original part of this design is already right, and the measured corpus
backs that up. Two specific things are wrong and both are cheap to fix.

---

## Hypotheses, tested

**H1 — "The light/mono/warm theme is a safe, derivative choice."**
→ **REFUTED.** Measured across 24 technical sites: display face is grotesk-sans 75% of the
time; mono is 8%. Light paper is 54%, warm accent is 21%. Light + mono + warm is the
intersection of three minority positions. The archive flags arweave.org — the one site that
lands in exactly that intersection — as a statistical *outlier*. B-RIG is not following the
category; it is taking the same contrarian position Arweave took, independently.

**H2 — "Block-as-section with a real SHA-256 chain is a gimmick."**
→ **REFUTED, with a caveat.** Every strong site in the corpus has what the archive calls a
SIGNATURE — one non-decorative idea that organises the page (Arweave's numbered index tabs,
Blockstream's broken cyan ring, Uniswap's widget-as-hero). B-RIG's signature is the chain, and
it is structural rather than applied, which is rarer and better. Caveat: it is currently
*invisible*. The hash footer reads `hash 0xa42c2ccd…b89719` in 11px grey and nothing tells the
reader it is real. An unexplained signature is indistinguishable from decoration.

**H3 — "The teal/orange pairing is the weakest element."**
→ **CONFIRMED.** Of the 8 accent anchors measured across the corpus — `#6a5bc1` `#348ce1`
`#04c6ed` `#04c3fb` `#3c54f4` `#cea78b` `#868278` `#7f7f7f` — not one is a deep teal-green.
The mint `#0F6E56` and the chrome `#EDF2F0` are outside the category's accent distribution
entirely. Worse, the page currently runs **two** accents (orange `#C2410C` for CTAs and
headline numerals, mint `#0F6E56` for CONFIRMED tags and links). Arweave runs exactly one
accent on exactly two elements and is more confident for it.

**H4 — "The site reads as cybersecurity as well as blockchain."**
→ **UNDER-DETERMINED / mostly no.** It reads as a block explorer. There is nothing in the
visual language that signals TIFAC-CORE in Cyber Security — no adversarial framing, no
verification affordance, nothing that says "we break things." The homepage headline says
"then try to break them" and the design never follows through.

---

## What I would approve as-is

1. **The block macrostructure.** Sections as blocks with height, state tag and a hash footer.
   This is the "specimen"/"index-first" family — Arweave's register, done with a stronger
   organising metaphor.
2. **The mempool / PENDING cards.** Turning unfinalised fee, prizes and jury into dashed
   `PENDING` blocks with reveal dates is the single best decision on the site. It converts a
   weakness into the thing that makes the page feel alive. No corpus site does this.
3. **The mono-for-chrome, sans-for-prose split.** JetBrains Mono on metadata, Inter on body.
   Highlight.xyz runs the same pair. Correct.
4. **The genesis gate.** Gives the launch ceremony a physical action. Keep for launch, then
   `SHOW_GATE = false`.
5. **The voice.** "We would rather say 'not yet' than put a number up and change it later."
   That sentence is worth more than any gradient.

---

## What I would send back

### R1 — Collapse to one accent (highest impact, ~20 min)
Drop the mint to a *neutral state colour* and let orange be the only chromatic voice. Teal
survives only in the B-RIG logo. Concretely: `CONFIRMED` tags, links and `--mint` usages move
to near-black or `--dim`; orange stays on CTAs, the `2026` numeral, `PENDING`, and the active
nav underline. Arweave's rule: *accent appears on the active item and its underline, nowhere
else.*

### R2 — Make the hash chain legible (highest conceptual payoff)
Right now the chain is a footnote. One line of copy under the hero — "every section below is
hashed into the one above it; open your console and check" — plus making the hash footer
clickable to reveal the full digest turns a decoration into a demonstration. This is also the
answer to H4: *verification is the cybersecurity gesture.*

### R3 — Add the adversarial layer (the TIFAC-CORE signal)
One new block on the event page, `BLOCK #00X · ADVERSARIAL`, styled as the chain's inverse —
dark surface, orange on near-black, the only dark band on the site. Content: what the jury will
try to break in your submission. This gives the security half of the club a visual identity,
makes the page rhythm non-monotonous, and borrows Blockstream's dark/accent register for one
section instead of the whole site.

### R4 — Minor
- Add `assets/img/og-cover.png` (1200×630). Shares currently preview as a grey box.
- Hero must be complete inside ~1280×800. The event page hero currently is; the homepage hero
  pushes the event card below the fold. Tighten the lede to two lines.
- Commit-reveal: publish the 7 statement digests now, reveal 14 Nov. This is R2 taken to its
  conclusion and is the most on-brand thing the site could do.

---

## Why not a dark cyberpunk theme

It was considered and rejected. Dark is only 21% of the measured corpus, and the terminal-green
/ neon-on-black CTF look is the most imitated aesthetic in student security events — it is the
*derivative* option, not the creative one. A light paper ledger that runs one orange and proves
its own integrity is the harder and more distinctive position. Use dark as a single accent
band (R3), not as the canvas.

---

## Confidence

- H1, H3: **high** — backed by measured distributions over 24 production sites.
- H2: **medium** — signature-element reasoning is corpus-wide pattern, not a controlled test.
- H4: **medium-low** — a design judgement, not a measurement. Flagged as such.

Single-source risk: the corpus is one archive. The CTF/hackathon-specific search returned no
usable primary design references (see sources), so the "dark cyberpunk is derivative" claim
rests on category knowledge rather than a measured sample. Treat R3 as the weakest-evidenced
recommendation of the four.
