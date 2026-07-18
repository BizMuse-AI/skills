#!/usr/bin/env node
/**
 * [INPUT]: Depends on repository skill directories and their SKILL.md frontmatter.
 * [OUTPUT]: Exits non-zero when discovery metadata or required safety guidance is missing.
 * [POS]: Repository-wide deterministic quality gate used locally and in GitHub Actions.
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */

import { readdir, readFile, stat } from 'node:fs/promises';

const root = new URL('../skills/', import.meta.url);
const entries = await readdir(root);
const skillNames = [];
const failures = [];

for (const entry of entries.sort()) {
  const directory = new URL(`${entry}/`, root);
  if (!(await stat(directory)).isDirectory()) continue;
  skillNames.push(entry);

  const skillPath = new URL('SKILL.md', directory);
  const content = await readFile(skillPath, 'utf8').catch(() => '');
  const frontmatter = content.match(/^---\n([\s\S]*?)\n---/u)?.[1] ?? '';

  for (const key of ['name:', 'version:', 'description:']) {
    if (!frontmatter.includes(key)) failures.push(`${entry}: missing ${key}`);
  }
  if (!content.includes('Never ask the user to paste an API key into chat')) {
    failures.push(`${entry}: missing credential safety rule`);
  }
  if (!content.includes('[references/')) {
    failures.push(`${entry}: no progressive-disclosure reference links`);
  }
}

if (failures.length > 0) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`Validated ${skillNames.length} BizMuse skill(s): ${skillNames.join(', ')}`);
