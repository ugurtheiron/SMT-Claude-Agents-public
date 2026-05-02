# Check: Duplicates

Find duplicate resources in the library. This is a **read-only** check.

## Scope

Scan every markdown file under `library/en/`:
- `library/en/skills/**/SKILL.md`
- `library/en/agents/*.md`
- `library/en/commands/*.md`
- `library/en/hooks/*.md`

Plus the MCP array in `library/en/mcp-servers.json`.

## What counts as a duplicate

Report any of the following:

1. **Duplicate `id` frontmatter value** — two files sharing the same `id`.
   This is a hard error; IDs are the Firestore doc key and must be unique.
2. **Duplicate slug within a type** — two files at the same resolved slug
   inside the same type folder. Shouldn't be possible at the filesystem level,
   but the slug baked into frontmatter/path might drift.
3. **Near-duplicate `name`** — two files whose `name` frontmatter, when
   lowercased and stripped of punctuation, is identical. Flag these as
   *suspected* duplicates — they may be intentional (e.g. different vendors
   providing the same tool), but they often indicate the same resource
   imported from two upstream sources.
4. **MCP servers**: same logic applied to the `name` field in each array entry.

## Reporting

Group findings by class:

```
Hard duplicates (same id):
  - id "bwc-agent-foo" appears in:
      library/en/agents/foo.md
      library/en/agents/foo-v2.md

Suspected name collisions (same normalized name):
  - "Code Reviewer":
      library/en/agents/code-reviewer.md
      library/en/skills/code-reviewer/SKILL.md
```

End with:

```
✗ <N> hard duplicates
✗ <M> suspected name collisions
```

or

```
✓ No duplicates found across <K> resources.
```

Do not fix anything. Report only.

## Note for reviewers

Hard duplicates must be resolved before merging. Suspected name collisions
require a judgement call — if both resources are legitimate (different
authors, different installs), leave them and annotate in the PR description.
