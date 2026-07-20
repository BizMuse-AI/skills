<p align="center">
  <a href="https://bizmuse.ai"><img src="https://bizmuse.ai/logo.png" width="84" alt="BizMuse AI"></a>
</p>

<h1 align="center">BizMuse Skills</h1>

<p align="center">Official agent workflows for creating complete AI music videos with BizMuse.</p>

<p align="center">
  <a href="https://bizmuse.ai"><img src="https://img.shields.io/badge/product-bizmuse.ai-111111" alt="BizMuse AI"></a>
  <a href="https://bizmuse.ai/skill"><img src="https://img.shields.io/badge/docs-agent_skill-22c55e" alt="Agent Skill documentation"></a>
  <a href="https://www.skills.sh/bizmuse-ai/skills/bizmuse-music-video"><img src="https://skills.sh/b/BizMuse-AI/skills" alt="skills.sh installs"></a>
  <a href="https://github.com/BizMuse-AI/skills/actions/workflows/validate.yml"><img src="https://github.com/BizMuse-AI/skills/actions/workflows/validate.yml/badge.svg" alt="Validation"></a>
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License">
</p>

Official skills from [BizMuse AI](https://bizmuse.ai), designed for OpenClaw, Claude Code, Cursor, Codex, Windsurf, and other agents that support the open `SKILL.md` format.

The repository is the source of truth for every skill. The same versioned files are installable through [skills.sh](https://www.skills.sh/bizmuse-ai/skills/bizmuse-music-video) and published to [ClawHub](https://clawhub.ai/bizmuse-ai/skills/bizmuse-music-video).

- **ClawHub catalog:** `Creative`, `Productivity`
- **Topics:** `music-video`, `ai-video`, `video-generation`

## Available Skills

| Skill | What it does | Requires |
|---|---|---|
| [bizmuse-music-video](skills/bizmuse-music-video/) | Creates single-track or batch AI music videos, monitors generation tasks, and downloads completed video and cover files | `bizmuse-cli`, a BizMuse API key, and generation credits |

## Install

### OpenClaw and ClawHub

```bash
openclaw skills install @bizmuse-ai/bizmuse-music-video
```

### skills.sh and Compatible Agent Runtimes

Install the skill directly from the public GitHub source with the `skills` CLI:

```bash
npx skills add BizMuse-AI/skills --skill bizmuse-music-video
```

Inspect available skills:

```bash
npx skills add BizMuse-AI/skills --list
```

Install all BizMuse skills:

```bash
npx skills add BizMuse-AI/skills --all
```

Then install and authenticate the CLI outside your AI conversation:

```bash
npm install -g bizmuse-cli
bizmuse auth set-api-key <key>
```

Create a key at [bizmuse.ai/settings/apikeys](https://bizmuse.ai/settings/apikeys).

## What The Skill Supports

- Local MP3, WAV, M4A, or AAC audio, or a direct public audio URL.
- One to seven local or public JPG, JPEG, PNG, or WebP reference images.
- Vertical (`9:16`), landscape (`16:9`), and square (`1:1`) delivery.
- `540p`, `720p`, and `1080p` output.
- Storytelling, singing, dancing, and abstract creative modes.
- Single-track generation and bounded-concurrency directory batches.
- Explicit task monitoring and optional video and cover downloads.

The skill intentionally exposes only the BizMuse `one-click-ai-mv` workflow. It does not claim unrelated models or capabilities that are not available through the published CLI.

## Example

```bash
bizmuse mv run \
  --audio "song.mp3" \
  --image "artist.jpg" "stage.jpg" \
  --prompt "Night performance in Tokyo with neon reflections and cinematic camera movement" \
  --ratio 9:16 \
  --resolution 720p \
  --content-mode storytelling \
  --json
```

Generation is asynchronous. Keep the returned task ID, check its status, and request the result only after the task succeeds.

## Principles

- **Truthful contracts:** skills describe only capabilities available in the current CLI and API.
- **Secrets stay local:** agents never ask users to paste API keys into chat.
- **Progress is explicit:** asynchronous generation returns a task ID before it returns media.
- **Portable by default:** instructions use the open skill format rather than one agent's private extension.

## Release Process

Validate the repository before publishing:

```bash
node scripts/validate-skills.mjs
npx --yes skills add . --list
```

Publish a ClawHub release from the version declared in `SKILL.md`:

```bash
node scripts/publish-clawhub.mjs bizmuse-music-video \
  --changelog "Describe the user-visible changes"
```

The publisher reads the version from `SKILL.md`, reads owner, catalog, and source metadata from `clawhub.json`, requires a clean Git commit, and performs a dry run first. It never accepts a token as a command-line argument; authenticate separately with the official ClawHub CLI.

## Contributing

Each skill lives under `skills/<name>/` and owns its instructions, references, scripts, UI metadata, and version. See [CONTRIBUTING.md](CONTRIBUTING.md) before proposing a new workflow.

## Links

- [BizMuse AI](https://bizmuse.ai)
- [Agent Skill documentation](https://bizmuse.ai/skill)
- [skills.sh catalog](https://www.skills.sh/bizmuse-ai/skills/bizmuse-music-video)
- [CLI documentation](https://bizmuse.ai/cli)
- [MCP documentation](https://bizmuse.ai/mcp)
- [ClawHub listing](https://clawhub.ai/bizmuse-ai/skills/bizmuse-music-video)
- [Source code](https://github.com/BizMuse-AI/skills)
- [CLI package](https://www.npmjs.com/package/bizmuse-cli)
- [MCP package](https://www.npmjs.com/package/bizmuse-mcp)

## License

[MIT](LICENSE) © BizMuse AI
