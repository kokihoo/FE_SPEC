import { readFileSync, writeFileSync } from 'node:fs'

const path = process.argv[2] ?? 'docs/code/css.md'
let lines = readFileSync(path, 'utf8').split(/\r?\n/).map((l) => l.replace(/\r$/, ''))

if (lines[0] === '---') {
  const end = lines.indexOf('---', 1)
  if (end > 0) lines = lines.slice(end + 1)
}

const ruleRe = /^- (\d+(?:\.\d+)*\.)【(强制|推荐|参考)】(.*)$/
const h2Re = /^## (\d+)\.\s*(.+)$/
const h3Re = /^### (\d+\.\d+)\.\s*(.+)$/

function normalizeHeading(line) {
  const h2 = line.match(h2Re)
  if (h2) return `## ${h2[2]}`
  const h3 = line.match(h3Re)
  if (h3) return `### ${h3[2]}`
  return line
}

function isRuleLine(line) {
  return ruleRe.test(line)
}

function isSectionBoundary(line) {
  return /^#{1,2} /.test(line) || /^### /.test(line)
}

function dedentBodyLine(line) {
  if (/^  ```/.test(line)) return line
  if (/^  - /.test(line)) return line.slice(2)
  if (/^  >/.test(line)) return line.slice(2)
  if (/^  \d+\./.test(line)) return line.trimStart()
  if (/^  \|/.test(line)) return line.slice(2)
  if (/^  [^\s]/.test(line)) return line.slice(2)
  return line
}

function flushRule(out, tag, num, rest, bodyLines) {
  const title = `${num}${rest.startsWith(' ') ? '' : ' '}${rest}`.trimEnd()
  if (tag === '强制' || tag === '推荐') {
    out.push(`::: ${tag}`)
    out.push(title)
    out.push(':::')
  } else {
    out.push(`${num}【参考】${rest}`.trimEnd())
  }
  out.push('')
  for (const bl of bodyLines) {
    out.push(dedentBodyLine(bl))
  }
  out.push('')
}

const out = []
let i = 0
let lastWasH3 = false

while (i < lines.length) {
  const line = lines[i]

  if (isRuleLine(line)) {
    const [, num, tag, rest] = line.match(ruleRe)
    const bodyLines = []
    i++
    while (i < lines.length) {
      const next = lines[i]
      if (isRuleLine(next) || isSectionBoundary(next)) break
      bodyLines.push(next)
      i++
    }
    flushRule(out, tag, num, rest, bodyLines)
    continue
  }

  const normalized = normalizeHeading(line)
  if (normalized !== line && /^### /.test(normalized)) {
    if (out.length > 0 && out[out.length - 1] !== '' && out[out.length - 1] !== '---') {
      out.push('---')
      out.push('')
    }
    out.push(normalized)
    out.push('')
    lastWasH3 = true
    i++
    continue
  }

  if (normalized !== line && /^## /.test(normalized)) {
    if (out.length > 0 && out[out.length - 1] !== '---') {
      out.push('---')
      out.push('')
    }
    out.push(normalized)
    out.push('')
    i++
    continue
  }

  if (line === '详细规则如下：') {
    out.push(line)
    out.push('')
    i++
    continue
  }

  out.push(line)
  i++
}

// collapse 3+ blank lines to 2
const compact = []
for (let j = 0; j < out.length; j++) {
  if (out[j] === '' && out[j + 1] === '' && out[j + 2] === '') continue
  compact.push(out[j])
}

while (compact.length && compact[0] === '') compact.shift()

writeFileSync(path, `${compact.join('\n')}\n`, 'utf8')
console.log(`formatted ${path}: ${lines.length} -> ${compact.length} lines`)
