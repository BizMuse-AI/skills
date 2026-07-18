#!/bin/bash
# [INPUT]: Depends on bizmuse-cli plus positional audio, prompt, image, and optional ratio arguments.
# [OUTPUT]: Submits one BizMuse music-video task and returns the CLI response.
# [POS]: bizmuse-music-video deterministic submission helper; business behavior stays in the CLI.
# [PROTOCOL]: 变更时更新此头部，然后检查 AGENTS.md

AUDIO="$1"
PROMPT="$2"
IMAGE="$3"
RATIO="${4:-9:16}"

if [ -z "$AUDIO" ] || [ -z "$PROMPT" ] || [ -z "$IMAGE" ]; then
  echo "Usage: ./generate-mv.sh <audio> <prompt> <image> [ratio]"
  exit 1
fi

echo "Submitting BizMuse AI MV task"
bizmuse mv run \
  --audio "$AUDIO" \
  --image "$IMAGE" \
  --prompt "$PROMPT" \
  --ratio "$RATIO"
