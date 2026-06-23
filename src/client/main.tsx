/**
 * Risk Assessment UI Page entry.
 *
 * Imports the prebuilt Risk Assessment library (built in tw-portal via
 * `build:servicenow`, copied here by `npm run sync`) and mounts it. All app
 * logic, providers, routing and OIDC popup auth live inside the library.
 */
import { mountRiskAssessment } from './risk-assessment'
import './risk-assessment.css'

const rootElement = document.getElementById('root')
if (rootElement) {
    mountRiskAssessment(rootElement)
}
