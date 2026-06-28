# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A **ServiceNow Fluent application** (workflow-as-code, TypeScript, scope `x_2058331_risk`,
app name "Risk Assessment") whose only job is to **host a prebuilt React app inside ServiceNow
UI Pages**. The React app itself is NOT developed here — it is built in a sibling repo,
`../tw-portal`, as a self-contained library and copied in as a build artifact. ServiceNow then
serves it natively (CSP-safe). Users authenticate to Trustwise via an OAuth popup and the browser
calls the Trustwise API directly — there is no server-side code or proxy in this repo.

See `README.md` for the full architecture, per-environment config, and the one-time external
Keycloak/CORS setup.

## Build & deploy pipeline

The three steps are ordered and must run in sequence:

```bash
npm run sync     # copy risk-assessment.{js,css} from ../tw-portal/dist-servicenow into src/client/
npm run build    # now-sdk build → rollup-bundles src/client into .jsdbx lib assets (see now.prebuild.mjs)
npm run deploy   # now-sdk install → deploys onto the authenticated instance
```

- `npm run sync` requires `../tw-portal` to have run `npm run build:servicenow` first. Override the
  source dir with `TW_PORTAL_DIST=/abs/path npm run sync`.
- `npm run dev` (`now-sdk run dev`) runs the watch build via `now.dev.mjs`.
- `npm run transform` / `npm run types` wrap `now-sdk transform` / `now-sdk dependencies`.
- There is no test suite, linter, or server-side runtime in this repo.

## Layout & what's safe to edit

- `src/client/risk-assessment.{js,css}` — **build artifacts, do NOT edit.** They are overwritten by
  `npm run sync`. To change app behavior, edit `../tw-portal` and re-sync. `risk-assessment.d.ts`
  hand-declares the library's two exports (`mountRiskAssessment`, `runPopupCallback`).
- `src/client/main.tsx`, `popup-main.tsx` — thin UI-Page entry points that call into the prebuilt
  library. `main.tsx` mounts the app; `popup-main.tsx` runs the OAuth popup callback.
- `src/client/index.html`, `popup.html` — the two UI Pages' HTML. Each injects `window._env_`
  (API URL + OIDC config) in an inline script that **must** run before the bundle. All values are
  public (no secrets). **Keep `_env_` identical in both files** and update it per environment.
- `src/fluent/ui-pages/*.now.ts` — Fluent metadata declaring the two `direct: true` UI Pages
  (`x_2058331_risk_risk_assessment.do` and `x_2058331_risk_popup_callback.do`). `.now.ts` files are
  ServiceNow metadata, not bundled client code.
- `src/fluent/generated/keys.ts` — **generated** explicit-ID registry; let the SDK manage it.
- `now.prebuild.mjs` / `now.dev.mjs` — SDK build hooks (rollup via `@servicenow/isomorphic-rollup`).
  `editableSourceCodeOnInstance` is disabled in prebuild because the ~4MB bundle trips the
  on-instance max-file-size limit.
- `now.config.json` — scope, scopeId, app name, and server tsconfig path.
- `dist/`, `target/`, `.now/` — build output, gitignored.

## Conventions

- Routing inside the app is hash-based (`#/risk-assessment/...`) so deep-links/refresh work inside
  the UI Page without server rewrites.
- Deployed entry point: `https://<instance>/x_2058331_risk_risk_assessment.do`.
