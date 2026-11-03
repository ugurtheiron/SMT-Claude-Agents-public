# Security Policy

## Supported versions

This library has no versioned releases. Only the latest commit on `main` is supported, including the plugin bundles generated from it under `plugins/`.

## Reporting a vulnerability

Please **do not** open a public issue for a security problem.

Report it privately through GitHub:

1. Open the [Security tab](https://github.com/ugurtheiron/SMT-Claude-Agents-public/security) of this repository.
2. Choose **Report a vulnerability** and describe the problem. See GitHub's guide on [privately reporting a security vulnerability](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability).

If that button is not available, open a public issue that says only that you have a security report and ask for a private channel. Do not include details in the issue.

A useful report names the affected resource (its path under `library/` or `plugins/`, or the script), the steps to reproduce in Claude Code, and the impact you expect. You can expect a first reply within a week. This is a personal project, so please be patient.

## Scope

In scope: content and code in this repository, for example:

- an agent, skill, command or hook whose instructions or embedded shell commands can leak secrets, delete or overwrite data without asking, or send data to an unexpected destination;
- text in a resource that tries to override the user's instructions (prompt injection);
- the build and validation scripts in `scripts/` and the npm dependencies they use;
- a secret committed to the repository by mistake.

Out of scope: vulnerabilities in Claude Code itself, and in third-party MCP servers listed in `library/en/mcp-servers.json` or upstream projects credited in [THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md). Please report those to their maintainers.

## Using the resources safely

Hooks and commands run shell commands on your machine with your permissions. Read a resource before you install it, and keep API keys in environment variables or a local `.env` file, never inside a resource file.
