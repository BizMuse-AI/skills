/**
 * [INPUT]: 依赖目标 Skill 的 SKILL.md 版本、clawhub.json 目录元数据、Git 提交状态与官方 CLI 本地授权。
 * [OUTPUT]: 对外提供绑定 owner/slug/catalog/provenance、先 dry-run 再正式发布的 ClawHub 源码发布命令。
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

function runGit(args) {
  const result = spawnSync('git', args, {
    cwd: process.cwd(),
    encoding: 'utf8',
  });

  if (result.error) fail(result.error.message);
  if (result.status !== 0) fail(result.stderr.trim() || `git ${args.join(' ')} failed`);
  return result.stdout.trim();
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
const catalog = JSON.parse(readFileSync(resolve(skillDirectory, 'clawhub.json'), 'utf8'));
const frontmatter = skillSource.match(/^---\n([\s\S]*?)\n---/);
if (!frontmatter) fail('SKILL.md must start with YAML frontmatter');

const declaredName = frontmatter[1].match(/^name:\s*([^\s]+)\s*$/m)?.[1];
const version = frontmatter[1].match(/^version:\s*([^\s]+)\s*$/m)?.[1];
if (declaredName !== slug) fail(`frontmatter name must match ${slug}`);
if (!version || !/^\d+\.\d+\.\d+$/.test(version)) fail('frontmatter version must use semantic versioning');
if (catalog.slug !== slug) fail(`clawhub.json slug must match ${slug}`);
if (!catalog.owner || !catalog.displayName) fail('clawhub.json requires owner and displayName');
if (!Array.isArray(catalog.categories) || catalog.categories.length === 0) {
  fail('clawhub.json requires at least one category');
}
if (!Array.isArray(catalog.topics) || catalog.topics.length === 0) {
  fail('clawhub.json requires at least one topic');
}
if (!catalog.sourceRepo || !catalog.sourceRef) {
  fail('clawhub.json requires sourceRepo and sourceRef');
}

if (runGit(['status', '--porcelain'])) {
  fail('commit and push repository changes before publishing to ClawHub');
}
const sourceCommit = runGit(['rev-parse', 'HEAD']);

const publishArgs = [
  'publish',
  skillDirectory,
  '--owner',
  catalog.owner,
  '--slug',
  catalog.slug,
  '--name',
  catalog.displayName,
  '--version',
  version,
  '--changelog',
  changelog,
  '--categories',
  catalog.categories.join(','),
  '--topics',
  catalog.topics.join(','),
  '--source-repo',
  catalog.sourceRepo,
  '--source-commit',
  sourceCommit,
  '--source-ref',
  catalog.sourceRef,
  '--source-path',
  `skills/${slug}`,
];

runClawHub([...publishArgs, '--dry-run']);
if (!dryRunOnly) runClawHub(publishArgs);
