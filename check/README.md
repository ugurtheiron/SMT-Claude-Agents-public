# Library audit prompts

Markdown prompts for [Claude Code](https://claude.com/claude-code) that audit
the library. No executable code — each file tells Claude Code what to inspect
under `library/` and how to report findings.

## How to run

From the repo root, in a Claude Code session:

```bash
claude -p "$(cat check/check-frontmatter.md)"
```

Or, inside an interactive session, paste the file's contents into the prompt.

## Prompts

| File                        | What it checks                                        |
|-----------------------------|-------------------------------------------------------|
| `check-frontmatter.md`      | Required YAML fields present on every EN resource     |
| `check-translations.md`     | EN ↔ TR slug parity; surfaces untranslated items      |
| `check-duplicates.md`       | Duplicate `name` or `id` collisions                   |
| `check-slug-format.md`      | Slug is kebab-case; folder/file name matches `id`     |
| `check-links.md`            | `homepage` / `repoUrl` URL format (syntactic)         |

## Output expectations

Each prompt asks Claude Code to produce a report like:

```
✓ 423 files scanned
✗ 3 issues found

library/en/agents/foo.md
  - missing required field: description

library/en/skills/bar/SKILL.md
  - id "bwc-skill-baz" does not match folder name "bar"
```

**A successful audit reports 0 issues.**

## When to run

- Before opening a PR that changes `library/`.
- When the `validate.yml` workflow fails on a PR — run locally to iterate
  faster than waiting for CI.
- Periodically (monthly) on `main` to catch drift from contributed PRs.

## Adding a new check

New prompts are welcome. Keep them focused on **one concern**, write them in
the same imperative voice as the existing files, and add a row to the table
above.
