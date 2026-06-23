/**
 * OAuth popup-callback entry.
 *
 * The IdP (Keycloak) redirects the popup window here after sign-in. We call into
 * the prebuilt library, which posts the result back to the opener and closes the
 * popup. No React mount.
 */
import { runPopupCallback } from './risk-assessment'

runPopupCallback().catch((err) => {
    // eslint-disable-next-line no-console
    console.error('[risk-assess] popup callback failed', err)
})
