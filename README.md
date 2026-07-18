<p align="center">
  <a href="https://bizmuse.ai"><img src="https://bizmuse.ai/logo.png" width="84" alt="BizMuse AI"></a>
</p>

<h1 align="center">BizMuse Skills</h1>

<p align="center">Open workflows for creating music and music videos with AI agents.</p>

<p align="center">
  <a href="https://bizmuse.ai"><img src="https://img.shields.io/badge/product-bizmuse.ai-111111" alt="BizMuse AI"></a>
  <a href="https://github.com/BizMuse-AI/skills/actions/workflows/validate.yml"><img src="https://github.com/BizMuse-AI/skills/actions/workflows/validate.yml/badge.svg" alt="Validation"></a>
  <img src="https://img.shields.io/badge/license-MIT-blue" alt="MIT License">
</p>

Official skills from [BizMuse AI](https://bizmuse.ai), designed for Claude Code, Cursor, Codex, Windsurf, and other agents that support the open `SKILL.md` format.

## Available Skills

| Skill | What it does | Requires |
|---|---|---|
| [bizmuse-music-video](skills/bizmuse-music-video/) | Creates one or a directory batch of tracked AI music videos and can download completed results | `bizmuse-cli` and a BizMuse API key |

## Install

Install one skill:

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

## Principles

- **Truthful contracts:** skills describe only capabilities available in the current CLI and API.
- **Secrets stay local:** agents never ask users to paste API keys into chat.
- **Progress is explicit:** asynchronous generation returns a task ID before it returns media.
- **Portable by default:** instructions use the open skill format rather than one agent's private extension.

## Contributing

Each skill lives under `skills/<name>/` and owns its instructions, references, scripts, UI metadata, and version. See [CONTRIBUTING.md](CONTRIBUTING.md) before proposing a new workflow.

## Links

- [BizMuse AI](https://bizmuse.ai)
- [Agent tools](https://bizmuse.ai/mcp)
- [CLI package](https://www.npmjs.com/package/bizmuse-cli)
- [MCP package](https://www.npmjs.com/package/bizmuse-mcp)

## License

[MIT](LICENSE) © BizMuse AI
