#!/usr/bin/env node
/**
 * Captures the ArchDiagram animation as a transparent-background animated GIF.
 *
 * Prerequisites:
 *   npm install -D playwright && npx playwright install chromium
 *   brew install gifski
 *
 * Usage (from /website):
 *   npm run capture-gif
 */

import { spawn, execSync } from 'child_process'
import { promises as fs } from 'fs'
import { createRequire } from 'module'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const websiteDir = path.resolve(__dirname, '..')
const framesDir = path.join(websiteDir, 'gif-frames')
const outputGif = path.join(websiteDir, 'hero-arch.gif')

// ── Preflight checks ──────────────────────────────────────────────────────────

function checkPlaywright() {
  try {
    createRequire(import.meta.url).resolve('playwright')
    return true
  } catch {
    return false
  }
}

function checkGifski() {
  try {
    execSync('gifski --version', { stdio: 'ignore' })
    return true
  } catch {
    return false
  }
}

const missingPlaywright = !checkPlaywright()
const missingGifski = !checkGifski()

if (missingPlaywright || missingGifski) {
  console.error('\n❌ Missing dependencies:\n')
  if (missingPlaywright) {
    console.error('  Install Playwright:')
    console.error('    npm install -D playwright')
    console.error('    npx playwright install chromium\n')
  }
  if (missingGifski) {
    console.error('  Install gifski:')
    console.error('    brew install gifski\n')
  }
  process.exit(1)
}

const { chromium } = await import('playwright')

// ── Start dev server ──────────────────────────────────────────────────────────

const PORT = 3099 // Use a dedicated port to avoid conflicts
const BASE_URL = `http://localhost:${PORT}`

console.log(`Starting Next.js dev server on port ${PORT}…`)
const server = spawn('npm', ['run', 'dev', '--', '-p', String(PORT)], {
  cwd: websiteDir,
  stdio: ['ignore', 'pipe', 'pipe'],
})

server.stderr.on('data', () => {}) // suppress

async function waitForServer(url, timeoutMs = 30_000) {
  const deadline = Date.now() + timeoutMs
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url)
      if (res.status < 500) return
    } catch { /* not ready yet */ }
    await new Promise(r => setTimeout(r, 500))
  }
  throw new Error(`Server at ${url} did not become ready within ${timeoutMs}ms`)
}

function killServer() {
  try { server.kill('SIGTERM') } catch {}
}

process.on('SIGINT', () => { killServer(); process.exit(1) })
process.on('exit', killServer)

// ── Capture frames ────────────────────────────────────────────────────────────

const FPS = 10
const DURATION_S = 9.6          // slightly more than one 9-second cycle
const FRAME_COUNT = Math.round(FPS * DURATION_S)  // 96 frames
const FRAME_INTERVAL_MS = 1000 / FPS               // 100ms

let realFps = FPS

try {
  await waitForServer(`${BASE_URL}/gif-export`)
  console.log('Server ready. Launching browser…')

  await fs.rm(framesDir, { recursive: true, force: true })
  await fs.mkdir(framesDir, { recursive: true })

  const browser = await chromium.launch()
  const page = await browser.newPage({
    viewport: { width: 592, height: 520 },
    deviceScaleFactor: 2,
  })

  await page.goto(`${BASE_URL}/gif-export`, { waitUntil: 'networkidle' })

  // Brief pause so React state and SVG animateMotion have kicked off
  await page.waitForTimeout(300)

  // Measure actual content height and resize viewport to fit snugly
  const contentHeight = await page.evaluate(() => {
    const el = document.querySelector('.arch-wrap')
    return el ? Math.ceil(el.getBoundingClientRect().bottom) + 24 : 520
  })
  await page.setViewportSize({ width: 592, height: contentHeight })

  console.log(`Capturing ${FRAME_COUNT} frames at target ${FPS} fps (${DURATION_S}s)…`)

  const captureStart = Date.now()
  for (let i = 0; i < FRAME_COUNT; i++) {
    const buf = await page.screenshot({ type: 'png' })
    const framePath = path.join(framesDir, `frame_${String(i).padStart(3, '0')}.png`)
    await fs.writeFile(framePath, buf)
    process.stdout.write(`\r  Frame ${i + 1}/${FRAME_COUNT}`)
    if (i < FRAME_COUNT - 1) await page.waitForTimeout(FRAME_INTERVAL_MS)
  }
  const captureElapsedMs = Date.now() - captureStart
  realFps = (FRAME_COUNT * 1000) / captureElapsedMs
  console.log(`\nFrames captured in ${(captureElapsedMs / 1000).toFixed(2)}s — real rate ${realFps.toFixed(2)} fps.`)

  await browser.close()
} finally {
  killServer()
}

// ── Stitch GIF with gifski ────────────────────────────────────────────────────

console.log(`Creating GIF with gifski at ${realFps.toFixed(2)} fps (so playback matches real animation speed)…`)
execSync(
  `gifski --fps ${realFps.toFixed(2)} --width 1120 --quality 90 -o "${outputGif}" "${framesDir}"/frame_*.png`,
  { stdio: 'inherit', shell: true }
)

await fs.rm(framesDir, { recursive: true, force: true })

console.log(`\n✅  GIF saved to: ${outputGif}`)
