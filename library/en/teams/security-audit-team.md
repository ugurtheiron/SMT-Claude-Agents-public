---
id: smt-team-security-audit-team
name: Security Audit Team
description: >-
  Parallel read-only auditors for codebase, API surface and MCP
  configuration, a log-mining detective, and an independent verifier that
  kills false positives — producing a severity-ranked remediation report.
category: quality-security
tags:
  - team
  - security
  - audit
  - owasp
  - code-review
platforms:
  - claude-code
members:
  - bwc-agent-security-auditor
  - bwc-agent-api-security-audit
  - bwc-agent-mcp-security-auditor
  - bwc-agent-error-detective
  - bwc-agent-code-reviewer
requires:
  - mcp:github
plugin: security-audit-team
author: SafeMate AI Hub
verified: true
---

## Mission

Audit a repository the way a professional engagement would: independent
parallel sweeps, evidence-verified findings, one ranked report. The team
uses **parallel fan-out with a verification gate** — three auditors sweep
different surfaces simultaneously, and every claimed vulnerability is
re-verified against the actual code before it reaches you.

## Members

| Agent | Role |
| --- | --- |
| `security-auditor` | Codebase sweep: OWASP top-10, secrets, authz, dependency risk |
| `api-security-audit` | Endpoints, auth flows, input validation, rate limiting |
| `mcp-security-auditor` | MCP server configs, tool permissions, transport security |
| `error-detective` | Mines production logs and stack traces for exploit indicators |
| `code-reviewer` | Independently verifies each finding to eliminate false positives |

## How the team works

1. The audit surface is scoped, then three auditors fan out in parallel, each in its own context.
2. `error-detective` works the logs separately so raw log volume never floods the session.
3. All findings return as structured lists; `code-reviewer` re-verifies every claim against the code.
4. You receive one severity-ranked report with concrete remediations and file/line references.

## Example prompt

> Run a full security audit of this repository before our SOC 2 review:
> cover the REST API, the MCP server configurations and the last 30 days of
> production error logs, verify every finding, and give me a severity-ranked
> remediation report.

## Install

```
/plugin marketplace add ugurtheiron/SMT-Claude-Agents-public
/plugin install security-audit-team@safemate-agents
```
