import '@servicenow/sdk/global'
import { UiPage } from '@servicenow/sdk/core'
import popupCallbackPage from '../../client/popup.html'

// Stable callback URL for the OAuth popup. Must be registered as a Valid
// Redirect URI on the Keycloak client (see README) and matches
// VITE_POPUP_REDIRECT_URI in the UI Page env scripts.
UiPage({
    $id: Now.ID['risk-assessment-popup-callback'],
    endpoint: 'x_trwi_trustwise_0_popup_callback.do',
    description: 'Trustwise Risk Assessment — OAuth popup callback',
    category: 'general',
    html: popupCallbackPage,
    direct: true,
})
