/**
 * Copies the prebuilt Risk Assessment library from tw-portal into src/client/.
 *
 *   1. (in tw-portal)  npm run build:servicenow   → dist-servicenow/risk-assessment.{js,css}
 *   2. (here)          npm run sync               → src/client/risk-assessment.{js,css}
 *   3. (here)          npm run build && npm run deploy
 *
 * Override the source dir with TW_PORTAL_DIST, e.g.
 *   TW_PORTAL_DIST=/abs/path/dist-servicenow npm run sync
 */
import { existsSync, copyFileSync, mkdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const repoRoot = resolve(here, '..')
const srcDir = process.env.TW_PORTAL_DIST
    ? resolve(process.env.TW_PORTAL_DIST)
    : resolve(repoRoot, '..', 'tw-portal', 'dist-servicenow')
const destDir = join(repoRoot, 'src', 'client')

const files = ['risk-assessment.js', 'risk-assessment.css']

if (!existsSync(srcDir)) {
    console.error(`[sync] Source dir not found: ${srcDir}`)
    console.error('[sync] Run "npm run build:servicenow" in tw-portal first.')
    process.exit(1)
}

mkdirSync(destDir, { recursive: true })
for (const file of files) {
    const from = join(srcDir, file)
    const to = join(destDir, file)
    if (!existsSync(from)) {
        console.error(`[sync] Missing ${from}`)
        process.exit(1)
    }
    copyFileSync(from, to)
    console.log(`[sync] ${file} → src/client/`)
}
console.log('[sync] Done. Next: npm run build && npm run deploy')
