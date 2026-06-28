/**
 * Types for the prebuilt Risk Assessment library.
 *
 * The actual `risk-assessment.js` / `risk-assessment.css` are produced by
 * `npm run build:servicenow` in the tw-portal repo and copied here by
 * `npm run sync` (see scripts/sync-bundle.mjs). TypeScript resolves the
 * `./risk-assessment` import to this declaration; the bundler resolves it to the
 * sibling `.js` at build time.
 */
export function mountRiskAssessment(rootEl: HTMLElement): void
export function runPopupCallback(): Promise<void>
