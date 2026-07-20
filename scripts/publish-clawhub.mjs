/**
 * [INPUT]: 依赖目标 Skill 的 SKILL.md 版本声明、官方 clawhub CLI 的本地授权状态和发布参数。
 * [OUTPUT]: 对外提供先 dry-run 再正式发布的 ClawHub 源码发布命令，拒绝从命令行接收 token。
 * [POS]: scripts 的公开发布入口，与 validate-skills.mjs 共同保证 GitHub 源码和 ClawHub 版本同源。
 * [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md
 */

import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

function fail(message) {
  console.error(`Error: ${message}`);
  process.exit(1);
}

function readOption(args, name) {
  const index = args.indexOf(name);
  if (index === -1) return undefined;
  const value = args[index + 1];
  if (!value || value.startsWith('--')) fail(`${name} requires a value`);
  return value;
}

function runClawHub(args) {
  const result = spawnSync('npx', ['--yes', 'clawhub@latest', ...args], {
    cwd: process.cwd(),
    stdio: 'inherit',
  });

  if (result.error) fail(result.error.message);
  if (result.status !== 0) process.exit(result.status ?? 1);
}

const args = process.argv.slice(2);
const slug = args[0];
const changelog = readOption(args, '--changelog');
const dryRunOnly = args.includes('--dry-run');

if (!slug || slug.startsWith('--')) {
  fail('usage: node scripts/publish-clawhub.mjs <skill-slug> --changelog <text> [--dry-run]');
}
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) fail('skill slug must use kebab-case');
if (!changelog) fail('--changelog is required');

const skillDirectory = resolve('skills', slug);
const skillSource = readFileSync(resolve(skillDirectory, 'SKILL.md'), 'utf8');
const frontmatter = skillSource.match(/^---\n([\s\S]*?)\n---/);
if (!frontmatter) fail('SKILL.md must start with YAML frontmatter');

const declaredName = frontmatter[1].match(/^name:\s*([^\s]+)\s*$/m)?.[1];
const version = frontmatter[1].match(/^version:\s*([^\s]+)\s*$/m)?.[1];
if (declaredName !== slug) fail(`frontmatter name must match ${slug}`);
if (!version || !/^\d+\.\d+\.\d+$/.test(version)) fail('frontmatter version must use semantic versioning');

const publishArgs = [
  'publish',
  skillDirectory,
  '--version',
  version,
  '--changelog',
  changelog,
];

runClawHub([...publishArgs, '--dry-run']);
if (!dryRunOnly) runClawHub(publishArgs);
