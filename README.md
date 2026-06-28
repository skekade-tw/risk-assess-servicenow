# Risk Assessment — ServiceNow app

Hosts the **Risk Assessment** feature of `tw-portal` inside a ServiceNow UI Page.
The React app is built once in `tw-portal` as a self-contained library and bundled
here by the ServiceNow SDK, so ServiceNow serves it natively (CSP-safe). Users sign
in to Trustwise through an **OAuth popup** and the browser calls the Trustwise API
directly — no server-side proxy, no machine-to-machine credentials.

## Codebase at a glance

This repo is a thin **ServiceNow Fluent app** (workflow-as-code, scope `x_2058331_risk`).
It contains almost no app logic — its job is to wrap a prebuilt React bundle in two
ServiceNow UI Pages and deploy them.

```
src/
  client/
    index.html              UI Page HTML; injects window._env_ then loads main.tsx
    main.tsx                mounts the prebuilt app (mountRiskAssessment)
    popup.html              OAuth popup-callback UI Page HTML
    popup-main.tsx          runs the OAuth callback (runPopupCallback)
    risk-assessment.js      ⟵ BUILD ARTIFACT from tw-portal (do not edit; ~4MB)
    risk-assessment.css     ⟵ BUILD ARTIFACT from tw-portal (do not edit)
    risk-assessment.d.ts    hand-written types for the two library exports
  fluent/
    ui-pages/*.now.ts       Fluent metadata declaring the two `direct: true` UI Pages
    generated/keys.ts       SDK-generated explicit-ID registry (do not hand-edit)
now.prebuild.mjs            SDK build hook: rollup-bundles src/client into .jsdbx assets
now.dev.mjs                 SDK watch-build hook (npm run dev)
now.config.json            scope / scopeId / app name
scripts/sync-bundle.mjs     copies the bundle from ../tw-portal into src/client
```

## Architecture

```
tw-portal                                  risk-assess-servicenow (this repo)
─────────────────────────────             ───────────────────────────────────
npm run build:servicenow                   npm run sync   (copies the 2 files)
  → dist-servicenow/risk-assessment.js  ─▶   src/client/risk-assessment.js
  → dist-servicenow/risk-assessment.css ─▶   src/client/risk-assessment.css
                                           npm run build  (SDK bundles src/client)
                                             → main.jsdbx served at
                                               /uxasset/externals/x_2058331_risk/
                                           npm run deploy (now-sdk install)
```

- `src/client/main.tsx` imports `mountRiskAssessment()` from the prebuilt library and mounts it.
- `src/client/index.html` injects `window._env_` (API URL + OIDC config) **before** the bundle.
- `src/client/popup.html` + `popup-main.tsx` are the OAuth popup callback page.
- `src/fluent/ui-pages/*.now.ts` declare the two `direct: true` UI Pages.

## 1. Build the library in tw-portal

The React UI is **not** developed in this repo. In `../tw-portal`, the
`build:servicenow` script produces a self-contained library (everything bundled,
hash routing, ServiceNow mode flags on) under `dist-servicenow/`:

```bash
cd ../tw-portal
npm run build:servicenow
#   → dist-servicenow/risk-assessment.js    (the whole React app + deps as one library)
#   → dist-servicenow/risk-assessment.css
```

It exports exactly two entry points that this repo consumes:
`mountRiskAssessment(rootEl)` and `runPopupCallback()`.

## 2. Import the bundle here (sync)

`npm run sync` copies those two files into `src/client/`:

```bash
cd ../risk-assess-servicenow
npm run sync
```

- Source defaults to `../tw-portal/dist-servicenow`. Override with `TW_PORTAL_DIST`,
  e.g. `TW_PORTAL_DIST=/abs/path/dist-servicenow npm run sync` (also settable in `.env`).
- `src/client/risk-assessment.{js,css}` are **build artifacts** — never edit them by
  hand. Re-run `sync` whenever the tw-portal feature changes.

## 3. Authenticate to your ServiceNow instance (one-time per machine)

The SDK stores instance credentials under a named alias:

```bash
# Interactive (prompts for username/password):
npx now-sdk auth --add https://dev350360.service-now.com --type basic --alias risk-dev

# Make it the default credential used by build/deploy:
npx now-sdk auth --use risk-dev

# Inspect / remove:
npx now-sdk auth --list
npx now-sdk auth --delete risk-dev
```

`--type oauth` is also supported. Credentials are stored by the SDK outside this repo.

## 4. Build & deploy

```bash
npm install        # first time only
npm run sync       # copies risk-assessment.{js,css} from tw-portal (step 2)
npm run build      # SDK bundles src/client → .jsdbx lib assets (see now.prebuild.mjs)
npm run deploy     # now-sdk install onto the authenticated instance
```

| Command | Underlying | Purpose |
|---|---|---|
| `npm run sync` | `scripts/sync-bundle.mjs` | copy the prebuilt bundle from tw-portal |
| `npm run build` | `now-sdk build` | bundle `src/client` into installable app files |
| `npm run deploy` | `now-sdk install` | install/update the app on the instance |
| `npm run dev` | `now-sdk run dev` | watch-build (`now.dev.mjs`) |
| `npm run transform` | `now-sdk transform` | XML records → Fluent source |
| `npm run types` | `now-sdk dependencies` | pull dependency type defs |

## 5. View the app on the instance

The app deploys two `direct: true` UI Pages. The main one lives at:

```
https://<instance>/x_2058331_risk_risk_assessment.do
e.g. https://dev350360.service-now.com/x_2058331_risk_risk_assessment.do
```

To find it from the ServiceNow UI:

1. Open the deployment link above (or your instance home).
2. In the **All / Application** navigator filter, search **UI Pages**
   (System UI → UI Pages).
3. Open **`risk_assessment`** (endpoint `x_2058331_risk_risk_assessment.do`).
4. Click **Try it** — the page opens and the React app loads.

## Configuration (per environment)

Edit `window._env_` in **both** `src/client/index.html` and `src/client/popup.html`
(keep them identical), then re-run `npm run build && npm run deploy`. All values are
public — the user authenticates via the popup.

| Key | Meaning |
|---|---|
| `VITE_API_URL` | Trustwise API base the browser calls directly |
| `VITE_OIDC_AUTHORITY` | Keycloak realm URL |
| `VITE_OIDC_CLIENT_ID` | OAuth client id |
| `VITE_OIDC_SCOPE` | requested scopes |
| `VITE_POPUP_REDIRECT_URI` | the deployed `…_popup_callback.do` URL |

## Login flow & Keycloak setup (one-time, outside this repo)

Login is browser-side only: clicking sign-in opens an **OAuth popup** to Keycloak;
after sign-in the IdP redirects the popup to `…_popup_callback.do`, which posts the
token back to the opener and closes. The browser then calls the Trustwise API directly
with the bearer token. For this to work:

1. **Keycloak (Trustwise IdP)** — on the OAuth client (`VITE_OIDC_CLIENT_ID`):
   - Add `https://<instance>/x_2058331_risk_popup_callback.do` to **Valid Redirect URIs**
     (must exactly match `VITE_POPUP_REDIRECT_URI`).
   - Add `https://<instance>` to **Web Origins** (enables token-endpoint CORS).
   - Do this for **each** ServiceNow instance you deploy to.
2. **Trustwise API / ingress** — allow **CORS** from `https://<instance>`:
   `Access-Control-Allow-Origin`, allow `Authorization` + `Content-Type` headers,
   and handle preflight `OPTIONS`.

## Scope

Included: full Risk Assessment workflow — list, create (incl. vendor magic-link
creation), and the assessment workspace (questionnaire, submissions, report, decision).

Excluded: post-decision **agent onboarding** (gated out via `servicenowMode` in
tw-portal, since it depends on the portal's projects/agents surface).

## Notes

- `src/client/risk-assessment.{js,css}` are build artifacts copied by `npm run sync`.
  Re-run `sync` whenever the tw-portal feature changes.
- `editableSourceCodeOnInstance` is disabled in `now.prebuild.mjs` because the ~4MB
  bundle trips the on-instance max-file-size limit (on-instance source editing isn't
  useful for a prebuilt bundle anyway).
- Routing is hash-based (`#/risk-assessment/...`), so refresh/deep-link work inside
  the UI Page without server rewrite rules.
