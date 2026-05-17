import { readFileSync, writeFileSync } from 'node:fs';

const path = process.argv[2] ?? 'docs/code/html.md';
const lines = readFileSync(path, 'utf8').split(/\r?\n/);
const out = [];
let i = 0;

function isContinuation(line) {
  if (!line.trim()) return false;
  if (/^#{1,6}\s/.test(line)) return false;
  if (/^\s*```/.test(line)) return false;
  if (/^::: /.test(line)) return false;
  if (line.startsWith('>')) return false;
  if (/^>-\s/.test(line)) return false;
  return /^ {2,}\S/.test(line) && !/^\s+```/.test(line);
}

while (i < lines.length) {
  const line = lines[i].replace(/\r$/, '');
  const m = line.match(/^>-\s*(.*?)\*\*\[(推荐|强制)\]\*\*(.*)$/);
  if (m) {
    const kind = m[2];
    const body = (m[1] + m[3]).trim();
    const bodyLines = body ? [body] : [];
    let j = i + 1;
    while (j < lines.length && isContinuation(lines[j])) {
      bodyLines.push(lines[j].trim());
      j++;
    }
    out.push(`::: ${kind}`);
    out.push(...bodyLines);
    out.push(':::');
    out.push('');
    i = j;
    continue;
  }
  if (/^::: (推荐|强制)$/.test(line)) {
    out.push(line);
    i++;
    while (i < lines.length && lines[i].trim() !== ':::') {
      out.push(lines[i]);
      i++;
    }
    if (i < lines.length) {
      out.push(lines[i]);
      i++;
    }
    continue;
  }
  out.push(line);
  i++;
}

writeFileSync(path, out.join('\n'), 'utf8');
console.log(`converted ${path}, ${lines.length} -> ${out.length} lines`);
