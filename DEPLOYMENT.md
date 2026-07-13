# Deploying Risk Assessment to the vendor instance (`ven09311`)

Deploys the prebuilt **Risk Assessment** Fluent app into the existing scoped app
**"Trustwise Risk Assess"** on the vendor ServiceNow instance.

## Target (this deployment)

| Item | Value |
|---|---|
| Instance | `https://ven09311.service-now.com` |
| App | Trustwise Risk Assess |
| Scope | `x_trwi_trustwise_0` |
| App sys_id (scopeId) | `2123d8713bc2c31014e55ae136e45aa1` |
| Main UI Page | `https://ven09311.service-now.com/x_trwi_trustwise_0_risk_assessment.do` |
| Popup callback | `https://ven09311.service-now.com/x_trwi_trustwise_0_popup_callback.do` |
| Trustwise env | **stage** (`api.tw-stage` / `auth.tw-stage`) |
| Keycloak client | `servicenow-integration` |

> The repo was **retargeted** from the original PDI scope `x_2058331_risk` to this app's scope
> `x_trwi_trustwise_0`. Do **not** deploy via Studio "Import from Source Control" — that produced the
> earlier error. Use `now-sdk install` (`npm run deploy`).

---

## What was already changed in the repo (retarget — done)

| File | Change |
|---|---|
| `now.config.json` | `scope` → `x_trwi_trustwise_0`, `scopeId` → `2123d8713bc2c31014e55ae136e45aa1`, `name` → `Trustwise Risk Assess` |
| `src/fluent/ui-pages/risk-assessment.now.ts` | `endpoint` → `x_trwi_trustwise_0_risk_assessment.do` |
| `src/fluent/ui-pages/popup-callback.now.ts` | `endpoint` → `x_trwi_trustwise_0_popup_callback.do` |
| `src/fluent/generated/keys.ts` | regenerated under new scope (deleted + `npm run build`) |
| `src/client/index.html` + `popup.html` | `_env_`: client id `servicenow-integration`, stage API/authority, popup redirect → `x_trwi_trustwise_0_popup_callback.do` on `ven09311` |

`_env_` (identical in both HTML files):
```js
VITE_API_URL:          "https://api.tw-stage.trustwise.ai"
VITE_OIDC_AUTHORITY:   "https://auth.tw-stage.trustwise.ai/realms/trustwise"   // verify realm name
VITE_OIDC_CLIENT_ID:   "servicenow-integration"
VITE_OIDC_SCOPE:       "openid profile email"
VITE_POPUP_REDIRECT_URI:"https://ven09311.service-now.com/x_trwi_trustwise_0_popup_callback.do"
```

---

## 1. Authenticate `now-sdk` to the vendor instance

The vendor `admin` account has **MFA**, so basic auth must be added **interactively** (you type the
6-digit code). CI/env-var and piped auth cannot pass MFA.

```bash
npx now-sdk auth --add https://ven09311.service-now.com --type basic --alias risk-vendor
#   Username: admin
#   Password: <password>
#   MFA code: <6 digits>

npx now-sdk auth --use risk-vendor
npx now-sdk auth --list        # confirm risk-vendor = default = Yes
```

Switch back to the PDI later with `npx now-sdk auth --use admin`.

> **MFA basic auth issues a session token that can expire.** If a later deploy fails with an auth
> error, re-run the `auth --add` above. To avoid this entirely, use OAuth client_credentials
> (Appendix A) — no MFA, no expiry surprise.

---

## 2. Build & deploy

```bash
npm install        # first time only
npm run build      # SDK bundles src/client → .jsdbx assets, regenerates keys.ts
npm run deploy     # now-sdk install → installs into Trustwise Risk Assess (x_trwi_trustwise_0)
```

Open: `https://ven09311.service-now.com/x_trwi_trustwise_0_risk_assessment.do`

The page + React app load. **Sign-in fails until Section 3 is done.**

---

## 3. Enable login — Keycloak + CORS (manual)

On the Keycloak `servicenow-integration` client:

1. **Valid Redirect URIs** — must be the **new** scope endpoint (the previously registered
   `x_2058331_risk_popup_callback.do` is the OLD scope and will be rejected):
   ```
   https://ven09311.service-now.com/x_trwi_trustwise_0_popup_callback.do
   ```
2. **Web Origins** — `https://ven09311.service-now.com` (already set ✓).

On the **Trustwise stage API / ingress** — allow CORS from `https://ven09311.service-now.com`:
- `Access-Control-Allow-Origin: https://ven09311.service-now.com`
- allow `Authorization` + `Content-Type` headers
- handle preflight `OPTIONS`

No rebuild needed for Keycloak/CORS changes. If any `VITE_*` value changes, re-run
`npm run build && npm run deploy`.

---

## Quick reference

```bash
# 1. auth (interactive — enter MFA code)
npx now-sdk auth --add https://ven09311.service-now.com --type basic --alias risk-vendor
npx now-sdk auth --use risk-vendor

# 2. deploy
npm run build
npm run deploy
# open https://ven09311.service-now.com/x_trwi_trustwise_0_risk_assessment.do
```

---

## Troubleshooting

| Symptom | Cause / fix |
|---|---|
| `Your account requires Multi-factor authentication` on `auth --add` | Run `auth --add` interactively and enter the 6-digit code; or use OAuth (Appendix A). |
| Deploy fails with auth error after previously working | MFA session token expired — re-run `auth --add`. |
| App page loads, login popup errors / redirect_uri mismatch | Keycloak redirect URI still old scope — set it to `x_trwi_trustwise_0_popup_callback.do` (Section 3). |
| CORS error calling Trustwise API | stage API not allowing `https://ven09311.service-now.com` origin (Section 3). |
| Deploy hits wrong instance | `npx now-sdk auth --list`; fix with `--use risk-vendor`. |
| Studio git import fails | Expected — use `now-sdk install` (`npm run deploy`), not Studio source-control import. |

---

## Appendix A — OAuth client_credentials (MFA-free, recommended long-term)

Avoids MFA and token expiry. One-time setup on `ven09311`:

1. **System OAuth → Application Registry → New → "Create an OAuth API endpoint for external
   clients"**. Name `now-sdk-cli`, **Public Client = false**, **Grant type** includes **Client
   Credentials**. Save → note **Client ID** + **Client Secret**.
2. sys_property `glide.oauth.inbound.client.credential.grant_type.enabled` = `true` (create if
   missing; type `true|false`). Ref KB1645212.
3. Map an **OAuth Application User** with `admin` role and **Identity Type = Human**.

Deploy with env vars (only affects `now-sdk install`; `build` needs no auth):
```bash
export SN_SDK_NODE_ENV=SN_SDK_CI_INSTALL
export SN_SDK_AUTH_TYPE=oauth
export SN_SDK_INSTANCE_URL=https://ven09311.service-now.com
export SN_SDK_OAUTH_CLIENT_ID=...
export SN_SDK_OAUTH_CLIENT_SECRET=...

npm run build
npm run deploy
```

---

## Appendix B — retargeting to a different app/scope later

If deploying to yet another instance/app, change in lockstep: `now.config.json` (`scope`,
`scopeId`, `name`), both `*.now.ts` `endpoint` strings, delete + rebuild `keys.ts`, both HTML
`VITE_POPUP_REDIRECT_URI` + `_env_`, and the Keycloak redirect URI. Get the target app's scope and
sys_id from **Studio → app Settings** and **System Applications → My Company Applications**.
