---
id: bwc-command-initref
source:
  upstream: >-
    https://github.com/davepoon/buildwithclaude/blob/main/plugins/all-commands/commands/initref.md
description: >-
  Build reference documentation by creating markdown files and updating
  CLAUDE.md
category: context-loading-priming
allowed-tools: 'Read, Write, LS, Glob'
---

Build the reference docs. Run /summarize on files to get summaries, don't read too many file contents to avoid burning usage. Read important files directly.

Create reference markdown files in `/ref` directory.

Update `CLAUDE.md` file with pointers to important documentation files.
