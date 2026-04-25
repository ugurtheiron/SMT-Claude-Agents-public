# Check: Frontmatter completeness

Audit every English resource file under `content/en/` for required YAML
frontmatter fields. This is a **read-only** check — do not edit any files.

## Scope

Scan these paths with Glob:
- `content/en/skills/**/SKILL.md`
- `content/en/agents/*.md`
- `content/en/commands/*.md`
- `content/en/hooks/*.md`

Also validate `content/en/mcp-servers.json` as a JSON array.

## Required fields (all markdown resources)

Every file must have YAML frontmatter (fenced by `---`) containing **non-empty**
string values for:

- `id` — starts with a type prefix (`bwc-<type>-<slug>` or `smt-<type>-<slug>`)
- `name`
- `description`
- `category`
- `author`

Optional but validate when present:

- `tags` — must be an array, ≤ 12 entries
- `homepage` — must start with `http://` or `https://`
- `repoUrl` — must start with `http://` or `https://`
- `license` — string

## Type-specific required fields

| Type    | Extra required fields                                    |
|---------|----------------------------------------------------------|
| skill   | (none beyond base)                                       |
| agent   | (none beyond base)                                       |
| command | (none beyond base)                                       |
| hook    | `event` must be present (non-empty string)               |

(Type-specific fields like `tools`, `allowedTools`, `matcher` are optional.)

## MCP servers (`content/en/mcp-servers.json`)

Each entry in the array must have:

- `name` — required, becomes the slug
- `description` — required, non-empty

## Reporting

Read each file, parse the frontmatter (everything between the first pair of
`---` delimiters), and for any file with one or more violations, emit one line
per violation:

```
content/en/<path>
  - <field>: <reason>
```

End with a summary:

```
✓ <N> files scanned
✗ <M> issues in <K> files
```

If `M` is 0, report:

```
✓ <N> files scanned
✓ All required frontmatter fields present.
```

Do not fix anything. Do not propose fixes. Just report.
