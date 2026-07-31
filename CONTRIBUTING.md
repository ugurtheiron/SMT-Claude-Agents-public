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
| Team         | `library/en/teams/<slug>.md`              |
| Bundle       | `library/en/bundles/<slug>.md`            |
| MCP server   | entry inside `library/en/mcp-servers.json`|

`<slug>` must be **kebab-case** and match `^[a-z0-9][a-z0-9-]*$`.
(Two seeded `bwc-*` commands contain underscores; that legacy exception is
grandfathered — new `smt-*` items must be kebab-case.)

## Frontmatter (English source)

Required for all markdown resources:

```yaml
---
id: smt-<type>-<slug>         # stable ID. Seeded items keep their bwc-* ID.
description: "One-sentence summary, ≤ 400 chars."
category: "security"          # single category slug, lowercase
---
```

Recommended:

```yaml
name: "Human-readable title"  # optional — the slug is prettified when absent
tags: [security, code-review] # ≤ 12 entries
author: "Your name or org"    # or { name: ..., url: ... }
requires:                     # dependency labels (see below)
  - mcp:github
  - connection:slack
```

Optional (when known):

```yaml
homepage: "https://example.com/…"
installCmd: "npx skills add …"
license: "MIT"
stars: 12345                  # upstream star count (bundles/teams only)
source:
  upstream: "https://github.com/davepoon/buildwithclaude/blob/main/<path>"
```

### `requires` dependency labels

Declare what a resource needs with prefixed labels, format
`^(mcp|plugin|connection|tool):[a-z0-9][a-z0-9._-]*$`:

| Prefix | Meaning | Example |
| --- | --- | --- |
| `mcp:` | An MCP server must be registered | `mcp:github` |
| `plugin:` | A Claude Code plugin must be installed | `plugin:firebase` |
| `connection:` | An external account / API key | `connection:slack` |
| `tool:` | A local CLI tool | `tool:docker` |

(A legacy object form `requires: { mcp: [...], env: [...], bins: [...] }`
is still accepted and flattened by the scraper — prefer the flat list.)

### Type-specific fields

| Type    | Extra frontmatter fields                                    |
|---------|-------------------------------------------------------------|
| hook    | `event` (required), `matcher`, `language`, `version`        |
| agent   | `tools`                                                     |
| command | `argumentHint`, `allowedTools`, `model`                     |
| skill   | `allowedTools`, `model`                                     |
| team    | `members` (required, list of resource ids), `plugin`        |
| bundle  | `homepage` (required), `kind`, `itemTypes`                  |

### Teams

A team is a curated set of existing library resources that work together:

```yaml
---
id: smt-team-<slug>
name: My Review Team
description: "What the team does, ≤ 400 chars."
category: quality-security
members:                      # must resolve to existing library ids
  - bwc-agent-code-reviewer
  - bwc-skill-mcp-builder
requires:
  - mcp:github
plugin: my-review-team        # plugin dir name; defaults to the slug
---
Body: mission, member roles table, orchestration pattern, example prompt.
```

After adding or changing a team, regenerate the plugin marketplace:

```
npm run build:plugins
```

This rewrites `plugins/<plugin>/` (agent/skill copies + plugin.json) and
`.claude-plugin/marketplace.json`. Commit the generated files with your PR —
CI fails if they drift. Never edit them by hand.

### Bundles

Bundles are pointers to famous external catalogues, marketplaces and
registries (awesome lists, MCP registries, plugin marketplaces):

```yaml
---
id: smt-bundle-<slug>
name: Awesome MCP Servers
description: "…"
category: collection          # marketplace | collection | registry
kind: collection              # same enum; mirrored into bundleMeta
itemTypes: [mcp-server]       # what the catalogue contains
homepage: https://github.com/punkpeye/awesome-mcp-servers
installCmd: '/plugin marketplace add owner/repo'   # only if installable
stars: 91658
---
Short editorial body: what it is, what it contains, when to reach for it.
```

## Turkish translations

Translations live in a **parallel tree** at `library/tr/<type>/<slug>.md`.
Only `name` and `description` are translated; everything else is shared with
the English source. Required for every resource (CI enforces parity).

```yaml
---
name: "Türkçe başlık"
description: "Tek cümlelik Türkçe özet."
---
```

The body of the TR file is **empty** — we don't translate the full markdown
body, only the card/detail headline strings.

## MCP servers

`library/en/mcp-servers.json` is a JSON object of shape
`{ "servers": [ ... ] }`. Every entry **must** carry a stable `id`
(`bwc-mcp-server-*` for seeded entries, `smt-mcp-server-*` for new ones).
Fields per entry:

- `id` (required, stable), `name` (required, becomes the slug)
- `display_name`, `description`, `vendor`, `category`, `tags`
- `sources.official`, `sources.github`
- `claude_mcp_add_command`, `docker_mcp_command`, `docker_mcp_available`
- `installation_methods[] { type, command }`
- `environment_variables[] { name, required, description }`
- `verification.status` (set to `"verified"` to mark as verified)
- `badges[]` (include `"featured"` to feature on the directory)
- `requires[]` (dependency labels, same format as markdown resources)

TR overrides live in `library/tr/mcp-servers.json`, keyed by `id` (preferred)
or server name, with `{ "name": ..., "description": ... }` values.

## Before opening a PR

```
npm install          # once
npm run validate     # frontmatter, ids, parity, teams, marketplace
npm run check:plugins
```

CI ([.github/workflows/validate.yml](.github/workflows/validate.yml)) runs
the same two commands and must pass before merge.

For deeper editorial review you can additionally run the Claude Code audit
prompts under `check/`:

```
claude -p "$(cat check/check-frontmatter.md)"
claude -p "$(cat check/check-duplicates.md)"
```
