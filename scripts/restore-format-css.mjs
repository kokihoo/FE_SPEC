import { readFileSync, writeFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const url =
  'https://raw.githubusercontent.com/qiuguangyi123/encode-fe-spec/master/docs/coding/css.md'
const source = join(root, 'docs/code/css.md.source')
const target = join(root, 'docs/code/css.md')

const res = await fetch(url)
if (!res.ok) throw new Error(`fetch failed: ${res.status}`)
writeFileSync(source, Buffer.from(await res.arrayBuffer()))

execFileSync(process.execPath, ['scripts/format-css-like-html.mjs', source], {
  cwd: root,
  stdio: 'inherit',
})

writeFileSync(target, readFileSync(source, 'utf8'), 'utf8')
console.log('wrote', target)
