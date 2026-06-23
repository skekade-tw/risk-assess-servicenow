# Risk Assessment — ServiceNow app

Hosts the **Risk Assessment** feature of `tw-portal` inside a ServiceNow UI Page.
The React app is built once in `tw-portal` as a self-contained library and bundled
here by the ServiceNow SDK, so ServiceNow serves it natively (CSP-safe). Users sign
in to Trustwise through an **OAuth popup** and the browser calls the Trustwise API
directly — no server-side proxy, no machine-to-machine credentials.

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

## Build & deploy

```bash
# 1. In tw-portal: build the library
cd ../tw-portal && npm run build:servicenow

# 2. Here: sync, build, deploy
cd ../risk-assess-servicenow
npm install        # first time only
npm run sync       # copies risk-assessment.{js,css} from tw-portal
npm run build      # SDK bundles src/client → .jsdbx assets
npm run deploy     # now-sdk install onto the authenticated instance
```

The app then lives at `https://<instance>/x_2058331_risk_risk_assessment.do`.

## Configuration (per environment)

Edit `window._env_` in **both** `src/client/index.html` and `src/client/popup.html`
(keep them identical). All values are public — the user authenticates via the popup.

| Key | Meaning |
|---|---|
| `VITE_API_URL` | Trustwise API base the browser calls directly |
| `VITE_OIDC_AUTHORITY` | Keycloak realm URL |
| `VITE_OIDC_CLIENT_ID` | OAuth client id |
| `VITE_OIDC_SCOPE` | requested scopes |
| `VITE_POPUP_REDIRECT_URI` | the deployed `…_popup_callback.do` URL |

## External setup (one-time, outside this repo)

These are required for the popup login and direct API calls to work:

1. **Keycloak (Trustwise IdP)** — on the OAuth client:
   - Add `https://<instance>/x_2058331_risk_popup_callback.do` to **Valid Redirect URIs**.
   - Add `https://<instance>` to **Web Origins** (enables token-endpoint CORS).
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
- Routing is hash-based (`#/risk-assessment/...`), so refresh/deep-link work inside
  the UI Page without server rewrite rules.
