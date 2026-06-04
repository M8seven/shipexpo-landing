# ShipExpo — Punto di ripresa

Ultimo aggiornamento: 2026-06-04 (sessione notturna, ~05:00).

Questo file e' l'appunto da cui ripartire. Due cose distinte:
il **sito** (landing, questo repo) e il **prodotto** (boilerplate, repo separato).

---

## TL;DR — da dove riprendo

1. Creare il prodotto su **Lemon Squeezy** ($99 one-time) e copiare il **Checkout URL**. (azione utente)
2. Collegare quell'URL ai bottoni "Get ShipExpo $99" della landing (ora sono placeholder `#cta`).
3. Ripristinare il rispetto di `prefers-reduced-motion` nella landing (ora forzato OFF per la preview).
4. Decidere strategia merge/push del branch prodotto `fix/launch-readiness` (commit `1b02c17`, non pushato).
5. Smoke test del prodotto su device reale (Apple login, chat streaming, IAP RevenueCat).
6. Marketing: post su Reddit + X (bozze gia' pronte).

---

## SITO (landing) — questo repo

- Path: `~/Hub/dev/web_site/shipexpo/`
- Repo: `github.com/M8seven/shipexpo-landing` (PUBLIC — e' solo la landing, NON il prodotto)
- Live: https://m8seven.github.io/shipexpo-landing/
- Stack: Astro static + CSS scritto a mano (NO Tailwind) + GSAP/ScrollTrigger + Lenis (3 CDN `is:inline`).
- Deploy: GitHub Pages via `.github/workflows/deploy.yml` (withastro/action@v3, Node 22). Ogni push su `main` ribuilda e pubblica.
- Stato git: PULITO, tutto pushato. Ultimo commit funzionale: `b090c4c`.

### Cosa e' fatto
- Direzione visiva B (terminal dark, dev-premium), animazioni scroll reversibili.
- Responsive: desktop/tablet invariati; mobile ottimizzato.
- Risolti i bug mobile di "ridimensionamento mentre scrolli" (vedi sotto).

### TODO landing (pre-lancio)
- **Checkout**: i bottoni "Get ShipExpo $99" puntano a `#cta` (placeholder). Sostituire con il Checkout URL di Lemon Squeezy in `src/pages/index.astro`.
- **Reduce motion**: in `src/pages/index.astro` lo script ha `var prefersReduced = false; // PREVIEW` e un `if (true) {` che forzano le animazioni ANCHE con "Riduci movimento" attivo su macOS (serviva per la preview, perche' l'utente ha Reduce Motion ON). Prima del lancio ripristinare il rispetto reale della preferenza.
- Opzionale: dominio custom al posto di `github.io`.

### Trappola da ricordare (cache Safari)
Safari iOS/macOS cachea l'HTML in modo aggressivo: dopo un deploy si vede ancora la versione vecchia. Verificare SEMPRE in **finestra privata** o svuotando i dati del sito prima di concludere che un fix non funziona. Per conferma "fix live": `curl` dell'URL, estrarre il bundle `_astro/*.css`, `grep` della proprieta'. (Memory: `reference_mobile_scroll_resize_fixes`.)

### Fix mobile applicati (commit b090c4c e precedenti)
1. `html { -webkit-text-size-adjust:100%; text-size-adjust:100% }` — stop font-boosting.
2. clamp(...vw...) mobile -> px FISSI su titoli/stat (i vw si ricalcolano quando la barra URL si comprime). Desktop resta clamp vw.
3. `will-change: transform` -> `auto` (no jitter compositing su touch).
4. hero `min-height: 100svh` invece di `100vh` (la barra browser non fa piu' "ballare" il layout).
5. terminale ad altezza fissa (non si ridimensiona quando il loop di typing riparte).
6. reveal su touch via IntersectionObserver (Lenis syncTouch off -> ScrollTrigger non aggiorna su touch).

### Pitch (per chi chiede "cosa fa")
Boilerplate Expo + Node per lanciare un'app AI in giorni invece che mesi: auth (Apple/Google/magic-link), pagamenti in-app (RevenueCat), chat AI in streaming e sistema di quota gia' cablati. $99 una tantum.

---

## PRODOTTO (boilerplate) — repo separato

- Path: `~/Hub/dev/shipexpo/`
- Repo: `github.com/M8seven/shipexpo` (privato, e' il prodotto venduto)
- Stack: Expo SDK 54 + Express 5 / PostgreSQL. Auth JWT v2, RevenueCat IAP, OpenAI streaming, quota.
- Branch: `fix/launch-readiness` — commit `1b02c17` "fix: launch readiness..." **NON pushato** (1 avanti su origin/main).
- File spurio non tracciato: `.antigravityignore` (ignorabile / da rimuovere).

### Cosa e' fatto
13+ bug reali sistemati in 3 round di audit (8 blocker + 5 re-verify), inclusi:
- contratti rotti client/server (`chat.ts`, `streaming.ts`, `authApi.ts`, `rewards.ts`)
- mount route backend (`app.use('/v1', purchaseRoutes)` in `server.js`)
- webhook RevenueCat nuovo (`backend/routes/revenuecatRoutes.js`) + `quotaManager.setTier`
- sync tier pagamento, LICENSE commerciale, `.env.example`, docs onesti
- `FREE_DAILY_QUERY_LIMIT` 10 -> 3

### TODO prodotto
- Decidere merge: `fix/launch-readiness` -> `main` e push (per ora committato in locale, non pushato — aspettavo conferma).
- Smoke test su device reale: Apple login, chat streaming, acquisto IAP sandbox.

---

## Stato generale (riepilogo onesto)
- Prodotto: sistemato e auditato, commit locale pronto.
- Sito: live, responsive, bug mobile chiusi.
- Mancano per incassare: checkout Lemon Squeezy collegato + ripristino reduce-motion + push prodotto + smoke test + marketing.
