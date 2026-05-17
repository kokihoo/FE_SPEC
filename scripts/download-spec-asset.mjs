import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const name = process.argv[2] ?? 'typescript.svg'
const url =
  process.argv[3] ??
  `https://raw.githubusercontent.com/qiuguangyi123/encode-fe-spec/master/docs/coding/img/${name}`
const out = join(root, 'docs/code/img', name)

mkdirSync(join(root, 'docs/code/img'), { recursive: true })

for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    writeFileSync(out, buf)
    console.log(`saved ${out} (${buf.length} bytes)`)
    process.exit(0)
  } catch (err) {
    console.warn(`attempt ${attempt} failed:`, err.message)
    await new Promise((r) => setTimeout(r, 2000 * attempt))
  }
}
process.exit(1)
