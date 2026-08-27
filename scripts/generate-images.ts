/**
 * Regenerates public/images/optimized/ from the real source photos in
 * assets-source/images/original/ (kept OUT of public/ so they're never shipped to production —
 * see audit item #10). Produces honestly-labeled responsive WebP tiers (the filename's width
 * always matches the file's real pixel width — no upscaling, no mislabeling) plus a manifest
 * (src/data/imageManifest.json) that OptimizedImage.tsx reads to build accurate srcset/width/
 * height attributes.
 *
 * Run via `npm run generate:images` (also runs automatically before `npm run build`).
 * Requires the `sharp` dev dependency (native binary, prebuilt for common platforms).
 */
import sharp from 'sharp'
import { readdirSync, mkdirSync, readFileSync, writeFileSync, existsSync } from 'node:fs'
import { join, extname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = fileURLToPath(new URL('..', import.meta.url))
const SRC_DIR = join(ROOT, 'assets-source/images/original')
const OUT_DIR = join(ROOT, 'public/images/optimized')
const SRC_TREE_DIR = join(ROOT, 'src')
const MANIFEST_PATH = join(ROOT, 'src/data/imageManifest.json')

/** Standard responsive tiers (mobile / tablet / desktop), per audit item #8. Never upscaled
 *  past the source's real width, and the source's own native width is always included as the
 *  top tier when it falls under 1200 — see the width-selection logic below. */
const STANDARD_WIDTHS = [480, 768, 1200] as const
// quality 72 / effort 6 (max compression effort) tested against the heaviest source photo in
// this set (a noisy phone-camera construction shot) — see the audit-fix report for the
// before/after numbers. This is close to the practical floor for photographic WebP without
// visible banding/blur; going materially lower did not meaningfully change file size for that
// image (it's dominated by real photographic detail/grain, not a wasteful encode setting).
const QUALITY = 72
const EFFORT = 6

interface ManifestEntry {
  width: number
  height: number
  variants: { width: number; file: string }[]
}

function collectReferencedStems(): Set<string> {
  const stems = new Set<string>()
  const files: string[] = []
  const walk = (dir: string) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (entry.isDirectory()) walk(join(dir, entry.name))
      else if (/\.(ts|tsx)$/.test(entry.name)) files.push(join(dir, entry.name))
    }
  }
  walk(SRC_TREE_DIR)
  const allSource = files.map((f) => readFileSync(f, 'utf8')).join('\n')
  for (const file of readdirSync(SRC_DIR)) {
    const stem = basename(file, extname(file))
    if (allSource.includes(stem)) stems.add(stem)
  }
  return stems
}

/**
 * True when public/images/optimized/ + the manifest already contain a usable build (CASE B
 * fallback below): the manifest parses, isn't empty, and every file it references actually
 * exists on disk. A production checkout (e.g. Hostinger deploy) that only has the committed
 * `public/` output and not the dev-only `assets-source/` tree hits this path — see DEPLOYMENT.md
 * "Regenerating images" and the build-safety note this fallback exists for.
 */
function hasValidOptimizedFallback(): boolean {
  if (!existsSync(MANIFEST_PATH) || !existsSync(OUT_DIR)) return false
  let manifest: Record<string, ManifestEntry>
  try {
    manifest = JSON.parse(readFileSync(MANIFEST_PATH, 'utf8'))
  } catch {
    return false
  }
  const stems = Object.keys(manifest)
  if (stems.length === 0) return false
  return stems.every((stem) =>
    manifest[stem].variants.every((v) => existsSync(join(OUT_DIR, v.file))),
  )
}

async function main() {
  if (!existsSync(SRC_DIR)) {
    // CASE B: no dev-only source photos in this checkout, but a valid optimized build is
    // already committed in public/images/optimized/ + src/data/imageManifest.json — skip
    // regeneration and let the build continue instead of failing it (see build-safety notes).
    if (hasValidOptimizedFallback()) {
      console.log(
        `[generate-images] Source directory not found (${SRC_DIR}) — skipping regeneration and ` +
          `using the existing optimized images already committed in public/images/optimized/ ` +
          `and src/data/imageManifest.json.`,
      )
      return
    }
    // CASE C: neither a source to generate from, nor a valid existing optimized build — this
    // is a real failure, not something to paper over with empty/fake folders.
    console.error(
      `[generate-images] Source directory not found: ${SRC_DIR}\n` +
        `[generate-images] No valid fallback found either (public/images/optimized/ and/or ` +
        `src/data/imageManifest.json are missing, empty, or incomplete). Cannot proceed.`,
    )
    process.exit(1)
  }
  // CASE A: real source photos are present — generate normally.
  mkdirSync(OUT_DIR, { recursive: true })

  const referenced = collectReferencedStems()
  const files = readdirSync(SRC_DIR).filter((f) => /\.jpe?g$/i.test(f))
  const manifest: Record<string, ManifestEntry> = {}
  let skipped = 0

  for (const file of files) {
    const stem = basename(file, extname(file))
    if (!referenced.has(stem)) {
      skipped++
      continue // Unused source (e.g. a known CDN duplicate) — don't ship it, don't process it.
    }

    const srcPath = join(SRC_DIR, file)
    const image = sharp(srcPath).rotate() // normalize EXIF orientation before reading dimensions
    const meta = await image.metadata()
    const nativeWidth = meta.width ?? STANDARD_WIDTHS[0]
    const nativeHeight = meta.height ?? nativeWidth

    const cap = Math.min(nativeWidth, 1200)
    const widths = new Set<number>([...STANDARD_WIDTHS.filter((w) => w <= cap), cap])

    const variants: { width: number; file: string }[] = []
    for (const w of [...widths].sort((a, b) => a - b)) {
      const outFile = `${stem}-${w}.webp`
      await sharp(srcPath)
        .rotate()
        .resize({ width: w, withoutEnlargement: true })
        .webp({ quality: QUALITY, effort: EFFORT })
        .toFile(join(OUT_DIR, outFile))
      variants.push({ width: w, file: outFile })
    }

    // Height scaled to match the recorded nativeWidth (post EXIF-rotation) so width/height
    // attributes always describe the correct intrinsic aspect ratio.
    manifest[stem] = { width: nativeWidth, height: nativeHeight, variants }
    console.log(`[generate-images] ✓ ${stem} (${nativeWidth}x${nativeHeight}) → ${variants.map((v) => v.width).join(', ')}w`)
  }

  writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2) + '\n')
  console.log(
    `[generate-images] Done: ${Object.keys(manifest).length} referenced images processed, ${skipped} unreferenced source file(s) skipped (not shipped).`,
  )
}

main().catch((err) => {
  console.error('[generate-images] Failed:', err)
  process.exit(1)
})
