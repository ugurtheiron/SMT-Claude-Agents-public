# Check: Translation parity (EN ↔ TR)

Audit the Turkish translation coverage of the library. This is a **read-only**
check.

## Scope

- EN source files:
  - `content/en/skills/<slug>/SKILL.md`
  - `content/en/agents/<slug>.md`
  - `content/en/commands/<slug>.md`
  - `content/en/hooks/<slug>.md`
- TR translation files:
  - `content/tr/skills/<slug>.md`
  - `content/tr/agents/<slug>.md`
  - `content/tr/commands/<slug>.md`
  - `content/tr/hooks/<slug>.md`

Note: TR uses a **flat filename per skill** (not a folder). TR skill at
`content/tr/skills/<slug>.md` corresponds to EN skill at
`content/en/skills/<slug>/SKILL.md`.

## What to check

For each resource type:

1. Build the set of EN slugs.
2. Build the set of TR slugs.
3. Report:
   - **Missing TR** — slugs in EN but not in TR.
   - **Orphaned TR** — slugs in TR but not in EN (likely a rename or typo).

4. For every TR file that exists, validate its frontmatter has non-empty
   `name` and `description` strings. No other fields required.

MCP servers are not translated (slug-less bulk JSON) — skip them.

## Reporting

Produce a per-type report:

```
agents: 120 EN / 98 TR
  missing TR (22):
    - foo-agent
    - bar-agent
    ...
  orphaned TR (1):
    - old-name-agent

skills: 203 EN / 201 TR
  missing TR (2):
    - new-skill-1
    - new-skill-2
  orphaned TR: none
```

End with a total summary:

```
✗ 24 resources missing TR translations
✗ 1 orphaned TR file
```

or if clean:

```
✓ Full EN ↔ TR parity (<N> resources each side).
```

Do not create or edit files. Report only.
