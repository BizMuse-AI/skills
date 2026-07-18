# Setup

## Inputs

- Audio: local MP3, WAV, M4A, AAC, OGG, or FLAC file; or a direct public audio URL.
- Images: 1-7 local JPG, JPEG, PNG, or WebP files; or direct public image URLs.
- Platform pages are not media URLs. Export or download the audio before submission.

## Authentication

Create a key at `https://bizmuse.ai/settings/apikeys`, then configure it outside chat:

```bash
bizmuse auth set-api-key <key>
```

The CLI stores its configuration in the operating system's standard application config directory.
