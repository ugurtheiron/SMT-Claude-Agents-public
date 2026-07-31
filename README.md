# SMT Claude Agents — Public Library

Open source catalogue of **skills, subagents, multi-agent teams, commands,
hooks, MCP servers and ecosystem bundles** for
[Claude Code](https://claude.com/claude-code). Powers the
[SafeMate AI Hub directory](https://safemateai.com/directory) — and doubles
as an installable **Claude Code plugin marketplace**.

```
/plugin marketplace add ugurtheiron/SMT-Claude-Agents-public
/plugin install full-stack-dev-team@safemate-agents
```

This repo is the **source of truth** for the library. Each resource lives as a
single markdown file with YAML frontmatter. A scraper at the consuming site
pulls this repo on a schedule and syncs Firestore, from which the public
directory UI renders.

## Repository layout

```
library/
  en/                         SOURCE OF TRUTH — English metadata + body
    skills/<slug>/SKILL.md
    agents/<slug>.md
    commands/<slug>.md
    hooks/<slug>.md
    teams/<slug>.md           Multi-agent teams (members + requires + workflow)
    bundles/<slug>.md         Famous external catalogues/marketplaces
    mcp-servers.json          Bulk file — { "servers": [...] } rich array
  tr/                         Turkish translations (name + description only)
    skills/<slug>.md          (flat — no nested folder on the TR side)
    agents/<slug>.md
    commands/<slug>.md
    hooks/<slug>.md
    teams/<slug>.md
    bundles/<slug>.md
    mcp-servers.json          Keyed by id or server name
.claude-plugin/
  marketplace.json            GENERATED — plugin marketplace catalogue
plugins/<team-slug>/          GENERATED — one Claude Code plugin per team
scripts/
  validate.mjs                Structural validation (run: npm run validate)
  build-plugins.mjs           Regenerates plugins/ + marketplace.json from teams
check/                        Claude Code audit prompts (optional, deeper review)
```

**Never edit `plugins/` or `.claude-plugin/marketplace.json` by hand** — they
are generated from `library/en/teams/`. Run `npm run build:plugins` after
changing a team.

## Multi-agent teams

Teams are curated sets of subagents and skills that work together on one
workflow (full-stack delivery, security audits, research, DevOps/SRE, content,
podcast production and more). Each team:

- is defined in `library/en/teams/<slug>.md` with a `members:` list of
  resource ids and a `requires:` list of dependency labels,
- is published as an installable plugin under `plugins/<slug>/`,
- documents its orchestration pattern (pipeline, fan-out + synthesis,
  verifier gates) in the body.

## `requires` dependency labels

Resources declare what they need with prefixed labels:

| Prefix | Meaning | Example |
| --- | --- | --- |
| `mcp:` | An MCP server must be registered | `mcp:github` |
| `plugin:` | A Claude Code plugin must be installed | `plugin:firebase` |
| `connection:` | An external account / API key | `connection:slack` |
| `tool:` | A local CLI tool | `tool:docker` |

The directory UI turns these into a "required connections" filter facet.

## Quick contribution flow

1. Fork the repo.
2. Add your resource under `library/en/<type>/...` (see
   [CONTRIBUTING.md](./CONTRIBUTING.md) for the frontmatter spec).
3. Add a Turkish translation at `library/tr/<type>/<slug>.md`.
4. Run `npm install` once, then `npm run validate` (and
   `npm run build:plugins` if you touched a team).
5. Open a PR. The [`validate` workflow](.github/workflows/validate.yml)
   re-runs the same checks.

## Validation

```
npm install
npm run validate        # frontmatter, ids, EN↔TR parity, teams, marketplace
npm run check:plugins   # generated plugins/ in sync with teams
```

The `check/` folder additionally contains markdown prompts for Claude Code
that do deeper editorial review (duplicates, link quality). From the repo
root: `claude -p "$(cat check/check-frontmatter.md)"`.

## Credits

This library was **seeded from [davepoon/buildwithclaude](https://github.com/davepoon/buildwithclaude)**
(MIT). The original markdown bodies, frontmatter, and MCP server definitions
from that project form the initial catalogue. The upstream copyright is
preserved in [LICENSE](./LICENSE) and each seeded file carries a
`source.upstream` reference back to the original path on davepoon's repo.
Seeded resources keep their stable `bwc-*` ids; new contributions use `smt-*`.

Many thanks to [@davepoon](https://github.com/davepoon) and the
buildwithclaude community.

## License

MIT — see [LICENSE](./LICENSE).
