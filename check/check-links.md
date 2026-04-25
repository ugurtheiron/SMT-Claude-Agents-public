# Check: Link format

Audit the `homepage`, `repoUrl`, and `source.upstream` URLs in resource
frontmatter. Syntactic check only — does not make network requests.

This is a **read-only** check.

## Scope

Every markdown file under `content/en/`:
- `content/en/skills/**/SKILL.md`
- `content/en/agents/*.md`
- `content/en/commands/*.md`
- `content/en/hooks/*.md`

Plus every entry in `content/en/mcp-servers.json`.

## Rules

For every URL-bearing field (`homepage`, `repoUrl`, `source.upstream`, and the
MCP `sources.official` / `sources.github` fields):

1. If the field is present, it must be a **non-empty string**.
2. It must start with `http://` or `https://`.
3. It must not contain whitespace.
4. It must contain at least one `.` after the scheme (basic domain shape).

Empty / missing URL fields are fine — they're optional.

GitHub-specific soft checks (flag as warnings, not errors):

- If a `repoUrl` looks like `github.com/<owner>/<repo>` but uses `http://`
  instead of `https://`, warn.
- If a `source.upstream` URL doesn't point at a file path on
  `github.com/davepoon/buildwithclaude`, warn — this field is specifically for
  upstream attribution.

## Reporting

Two sections:

```
Errors:
  content/en/agents/foo.md
    - homepage: malformed URL "htps://example.com"
  content/en/mcp-servers.json [entry "acme"]
    - sources.github: missing scheme

Warnings:
  content/en/skills/bar/SKILL.md
    - repoUrl uses http:// instead of https://
```

End with:

```
✓ <N> URLs scanned across <K> files
✗ <E> errors, <W> warnings
```

or

```
✓ All <N> URLs well-formed.
```

Do not modify files. Report only. An optional follow-up prompt could check
live reachability via `WebFetch`, but that's out of scope here.
