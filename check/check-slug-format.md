# Check: Slug format and id/path consistency

Verify every resource's slug follows repo conventions and that the frontmatter
`id` field matches the file's path. This is a **read-only** check.

## Scope

Scan every markdown file under `library/en/`:
- `library/en/skills/<slug>/SKILL.md`
- `library/en/agents/<slug>.md`
- `library/en/commands/<slug>.md`
- `library/en/hooks/<slug>.md`

Also check `library/tr/<type>/<slug>.md`.

## Rules

1. **Slug format.** The slug portion of the path must match:

   ```
   ^[a-z0-9][a-z0-9-]*$
   ```

   No uppercase, no underscores, no spaces, no leading/trailing hyphens,
   doesn't start with a digit-only prefix that clashes with reserved names.

2. **`id` must be present** in frontmatter and match one of:

   - `bwc-<type>-<slug>` (seeded from buildwithclaude — keep stable)
   - `smt-<type>-<slug>` (newly added in this repo)

   where `<type>` ∈ `{skill, agent, command, hook, mcp-server}` and `<slug>`
   equals the folder or filename slug.

3. **Type/path consistency.** The `<type>` segment of `id` must match the
   folder (`skills/` → `skill`, `agents/` → `agent`, `commands/` → `command`,
   `hooks/` → `hook`).

4. **TR mirror.** If a TR file exists at `library/tr/<type>/<slug>.md`, the
   EN file at the corresponding path must also exist (reuse logic from
   `check-translations.md` if helpful, but here focus only on the format).

## Reporting

One line per violation:

```
library/en/agents/Foo_Bar.md
  - slug "Foo_Bar" is not kebab-case
  - id "bwc-agent-foo-bar" does not match filename "Foo_Bar"
```

End with:

```
✓ <N> files scanned
✗ <M> slug/id violations
```

or if clean:

```
✓ All <N> slugs valid and id/path consistent.
```

Do not rename or edit anything. Report only.
