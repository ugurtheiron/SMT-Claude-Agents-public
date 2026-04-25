# SMT Claude Agents — Public Library

Open source catalogue of **skills, subagents, commands, hooks, and MCP servers**
for [Claude Code](https://claude.com/claude-code). Powers the [SafeMate AI Hub
directory](https://safemateai.com/directory).

This repo is the **source of truth** for the library. Each resource lives as a
single markdown file with YAML frontmatter. A scraper at the consuming site
pulls this repo on a schedule and syncs Firestore, from which the public
directory UI renders.

## Repository layout

```
content/
  en/                         SOURCE OF TRUTH — English metadata + body
    skills/<slug>/SKILL.md
    agents/<slug>.md
    commands/<slug>.md
    hooks/<slug>.md
    mcp-servers.json          Bulk file (MCP servers have no body)
  tr/                         Turkish translations (name + description only)
    skills/<slug>.md
    agents/<slug>.md
    commands/<slug>.md
    hooks/<slug>.md
check/                        Claude Code audit prompts
```

See [CONTRIBUTING.md](./CONTRIBUTING.md) for the full frontmatter spec and PR
workflow.

## Quick contribution flow

1. Fork the repo.
2. Add your resource under `content/en/<type>/<slug>/...`.
3. (Optional) Add a Turkish translation at `content/tr/<type>/<slug>.md`.
4. Run the checks locally — open this folder in [Claude Code](https://claude.com/claude-code) and run the prompts under `check/` (see `check/README.md`).
5. Open a PR. The `validate` workflow will re-run the checks.

## Running the library checks

The `check/` folder contains markdown prompts for Claude Code. From the repo
root, start a Claude Code session and point it at a check file:

```
claude -p "$(cat check/check-frontmatter.md)"
```

Each prompt tells Claude Code exactly what to look for and returns a pass/fail
report. No code execution — just structured inspection of `content/`.

## Credits

This library was **seeded from [davepoon/buildwithclaude](https://github.com/davepoon/buildwithclaude)**
(MIT). The original markdown bodies, frontmatter, and MCP server definitions
from that project form the initial catalogue. The upstream copyright is
preserved in [LICENSE](./LICENSE) and each seeded file carries a
`source.upstream` reference back to the original path on davepoon's repo.

Many thanks to [@davepoon](https://github.com/davepoon) and the
buildwithclaude community.

## License

MIT — see [LICENSE](./LICENSE).
