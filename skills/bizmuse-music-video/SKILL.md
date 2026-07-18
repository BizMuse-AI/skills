---
name: bizmuse-music-video
version: 1.1.0
description: |
  Create one or a directory batch of complete BizMuse AI music videos from local audio or direct public audio URLs and 1-7 reference images. Guides creative direction, submits tasks through bizmuse-cli, polls safely, and returns or downloads video and cover results. Use when users ask to make an AI MV, music video, beat-synced video, batch MV, 歌曲 MV, 批量 MV, 卡点视频, or 音乐视频.
allowed-tools:
  - Bash(command -v bizmuse)
  - Bash(bizmuse *)
  - Bash(npm install -g bizmuse-cli)
---

# BizMuse Music Video

Turn a finished song and visual references into a complete AI music video through [BizMuse](https://bizmuse.ai). Keep the user focused on creative direction while the skill handles upload, submission, and task tracking.

## Safety Rules

- Never ask the user to paste an API key into chat. Direct them to configure it locally.
- Never claim a platform page URL is a direct audio URL. Suno, YouTube, Udio, and SoundCloud pages must first be exported or downloaded as audio.
- Never claim generation succeeded until `bizmuse task result` returns video data.
- Do not log, repeat, or store credentials in project files.

## Prerequisites

Check the CLI:

```bash
command -v bizmuse
```

If missing, ask permission before installing it:

```bash
npm install -g bizmuse-cli
```

If authentication is missing, direct the user to create a key at [bizmuse.ai/settings/apikeys](https://bizmuse.ai/settings/apikeys) and configure it in their own terminal:

```bash
bizmuse auth set-api-key <key>
```

See [references/setup.md](references/setup.md) for supported inputs and authentication recovery.

## Workflow

1. Collect one local audio path or direct public audio URL.
2. Collect 1-7 local image paths or direct public image URLs.
3. Ask for creative direction: subject, setting, era, motion, palette, and mood.
4. Confirm aspect ratio: `9:16`, `16:9`, or `1:1`.
5. Submit with JSON output and retain the returned task ID.
6. Poll status every 30 seconds. Stop after 30 minutes and return the task ID if it is still running.
7. Fetch the result only after status is `success`; return the video URL, cover URL, and task ID.

```bash
bizmuse mv run \
  --audio "song.mp3" \
  --image "artist.jpg" \
  --prompt "1980s Tokyo nightlife, neon reflections, cinematic movement" \
  --ratio 9:16 \
  --resolution 720p \
  --json
```

```bash
bizmuse task status <task-id> --json
bizmuse task result <task-id> --json
```

For multi-image examples, repeat values after `--image`:

```bash
bizmuse mv run --audio song.mp3 --image face.jpg wardrobe.jpg stage.jpg --prompt "live performance" --json
```

## Batch Workflow

Use batch only when the user supplies a directory of separate audio files and wants the same creative direction and reference images applied to each one. Confirm the directory, output directory, shared references, and concurrency (`1-5`) before submitting:

```bash
bizmuse mv batch \
  --dir "./songs" \
  --image "artist.jpg" "stage.jpg" \
  --prompt "live performance, cinematic camera movement" \
  --concurrency 2 \
  --output "./bizmuse-output" \
  --json
```

Return the saved manifest path and summarize submitted versus failed entries. Do not claim that a submitted task has finished; inspect individual task IDs before reporting final media.

When the user explicitly wants local files, download a successful result without buffering the video in the Agent conversation:

```bash
bizmuse task result <task-id> --download "./bizmuse-output" --json
```

## Result

Return a compact summary in the user's language:

- Task ID
- Final status
- Video URL
- Cover URL
- Any provider error that still needs action
- Manifest path and per-file submission failures for a batch

Use [references/prompts.md](references/prompts.md) when the user needs creative direction, [references/models.md](references/models.md) for supported controls, and [references/errors.md](references/errors.md) when a command fails.
