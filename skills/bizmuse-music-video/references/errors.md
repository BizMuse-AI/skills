# Error Handling

| Signal | Action |
|---|---|
| `Not authenticated` | Ask the user to configure a BizMuse API key locally. |
| Unsupported extension | Request a supported audio or image format. |
| File exceeds upload limit | Ask the user to compress or shorten the source. |
| Insufficient credits | Link to `https://bizmuse.ai/pricing`. |
| Task remains pending | Return the task ID and explain how to resume polling. |
| Provider failure | Return the provider message without inventing a completed result. |

Do not retry authentication or billing failures automatically. For transient task queries, wait 30 seconds before retrying.
