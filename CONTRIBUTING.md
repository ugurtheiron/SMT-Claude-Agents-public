# Contributing

Thanks for adding to the library! Every resource is a single markdown file with
YAML frontmatter. Keep it simple; the scraper is strict but forgiving if you
follow the spec below.

## File layout

| Type         | Path                                      |
|--------------|-------------------------------------------|
| Skill        | `library/en/skills/<slug>/SKILL.md`       |
| Agent        | `library/en/agents/<slug>.md`             |
| Command      | `library/en/commands/<slug>.md`           |
| Hook         | `library/en/hooks/<slug>.md`              |
| MCP server   | entry inside `library/en/mcp-servers.json`|

`<slug>` must be **kebab-case** and match `^[a-z0-9][a-z0-9-]*$`.

## Frontmatter (English source)

Required for all markdown resources:

```yaml
---
id: smt-<type>-<slug>       # stable ID. Seeded items keep their bwc-* ID.
name: "Human-readable title"
description: "One-sentence summary, ≤ 400 chars."
category: "security"          # single category slug, lowercase
tags: [security, code-review] # optional, ≤ 12 entries
author: "Your name or org"
---
```

Optional (recommended when known):

```yaml
homepage: "https://example.com/…"
repoUrl: "https://github.com/…"
installCmd: "npx skills add …"
license: "MIT"
source:
  upstream: "https://github.com/davepoon/buildwithclaude/blob/main/<path>"
```

### Type-specific fields

| Type    | Extra frontmatter fields                                    |
|---------|-------------------------------------------------------------|
| hook    | `event`, `matcher`, `language`, `version`                   |
| agent   | `tools`                                                     |
| command | `argumentHint`, `allowedTools`, `model`                     |
| skill   | `allowedTools`, `model`                                     |

## Turkish translations

Translations live in a **parallel tree** at `library/tr/<type>/<slug>.md`.
Only `name` and `description` are translated; everything else is shared with
the English source.

```yaml
---
name: "Türkçe başlık"
description: "Tek cümlelik Türkçe özet."
---
```

The body of the TR file is **empty** — we don't translate the full markdown
body, only the card/detail headline strings.

## MCP servers

`library/en/mcp-servers.json` is a single JSON array. Each entry uses the same
shape as the upstream `davepoon/buildwithclaude` MCP catalog. Fields:

- `name` (required, becomes the slug)
- `display_name`, `description`, `vendor`, `category`, `tags`
- `sources.official`, `sources.github`
- `claude_mcp_add_command`, `docker_mcp_command`
- `installation_methods[]`, `environment_variables[]`
- `verification.status` (set to `"verified"` to mark as verified)
- `badges[]` (include `"featured"` to feature on the directory)

## Before opening a PR

Open this folder in Claude Code and run the audit prompts:

```
claude -p "$(cat check/check-frontmatter.md)"
claude -p "$(cat check/check-slug-format.md)"
claude -p "$(cat check/check-duplicates.md)"
```

If your change adds a resource, also run `check-translations.md` to flag the
newly missing TR translation (optional but appreciated).

All checks must pass before merge.
