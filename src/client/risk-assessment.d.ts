/**
 * Types for the prebuilt Risk Assessment library.
 *
 * The actual `risk-assessment.js` / `risk-assessment.css` are produced by
 * `npm run build:servicenow` in the tw-portal repo and copied here by
 * `npm run sync` (see scripts/sync-bundle.mjs). This declaration lets the SDK's
 * TypeScript build resolve the `./risk-assessment` import.
 */
declare module './risk-assessment' {
  /** Mount the Risk Assessment app into the given root element. */
  export function mountRiskAssessment(rootEl: HTMLElement): void;
  /** Complete an OAuth popup sign-in (call from the popup-callback page). */
  export function runPopupCallback(): Promise<void>;
}

declare module '*.css';
