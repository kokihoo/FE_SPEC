import { readFileSync, writeFileSync } from 'node:fs'

const path = process.argv[2]
if (!path) {
  console.error('Usage: node format-headings-like-html.mjs <path-to.md>')
  process.exit(1)
}

let lines = readFileSync(path, 'utf8').split(/\r?\n/).map((l) => l.replace(/\r$/, ''))

if (lines[0] === '---') {
  const end = lines.indexOf('---', 1)
  if (end > 0) lines = lines.slice(end + 1)
}

const h2Re = /^## (\d+)\.\s*(.+)$/
const h3Re = /^### (\d+\.\d+)\.\s*(.+)$/
const h4Re = /^#### (\d+(?:\.\d+)+)\.\s*(.+)$/

function normalizeHeading(line) {
  const h2 = line.match(h2Re)
  if (h2) return `## ${h2[2]}`
  const h3 = line.match(h3Re)
  if (h3) return `### ${h3[2]}`
  const h4 = line.match(h4Re)
  if (h4) return `#### ${h4[2]}`
  return line
}

function isNormalizedHeading(line, level) {
  if (level === 2) return /^## /.test(line) && !h2Re.test(line)
  if (level === 3) return /^### /.test(line) && !h3Re.test(line)
  if (level === 4) return /^#### /.test(line) && !h4Re.test(line)
  return false
}

function fixBrokenFences(src) {
  const out = []
  let i = 0
  while (i < src.length) {
    const line = src[i]
    if (line.trim() === '````') {
      out.push('```')
      i++
      continue
    }
    if (line.trim() === '````markdown' || line.trim() === '````md') {
      out.push(line.replace('````', '```'))
      i++
      continue
    }
    out.push(line)
    i++
  }
  return out
}

lines = fixBrokenFences(lines)

const out = []
let i = 0

while (i < lines.length) {
  const line = lines[i]
  const normalized = normalizeHeading(line)

  if (normalized !== line) {
    const level = line.startsWith('####') ? 4 : line.startsWith('###') ? 3 : 2
    const last = out[out.length - 1]
    const needsSep =
      out.length > 0 &&
      last !== '---' &&
      (level === 2 || (last !== '' && last !== undefined))
    if (needsSep) {
      out.push('---')
      out.push('')
    }
    out.push(normalized)
    out.push('')
    i++
    continue
  }

  out.push(line)
  i++
}

const compact = []
for (let j = 0; j < out.length; j++) {
  if (out[j] === '' && out[j + 1] === '' && out[j + 2] === '') continue
  compact.push(out[j])
}

while (compact.length && compact[0] === '') compact.shift()

writeFileSync(path, `${compact.join('\n')}\n`, 'utf8')
console.log(`formatted headings in ${path}: ${lines.length} -> ${compact.length} lines`)
