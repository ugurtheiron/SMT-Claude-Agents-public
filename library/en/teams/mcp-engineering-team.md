---
id: smt-team-mcp-engineering-team
name: MCP Engineering Team
description: >-
  Design, build, review and conformance-test Model Context Protocol
  servers: tool-surface architecture, scaffolded implementation, protocol
  and description-quality review, and live-client integration tests behind
  a compliance gate.
category: development-architecture
tags:
  - team
  - mcp
  - protocol
  - tooling
  - testing
platforms:
  - claude-code
members:
  - bwc-agent-mcp-server-architect
  - bwc-agent-mcp-expert
  - bwc-agent-mcp-testing-engineer
  - bwc-agent-mcp-registry-navigator
  - bwc-agent-mcp-security-auditor
  - bwc-skill-mcp-builder
requires:
  - tool:docker
plugin: mcp-engineering-team
author: SafeMate AI Hub
verified: true
---

## Mission

Ship MCP servers that other agents can actually use. The team runs a
**pipeline with a protocol-compliance verification gate** — and treats tool
descriptions as a first-class deliverable, because a bad description sends
every calling agent down the wrong path.

## Members

| Member | Role |
| --- | --- |
| `mcp-server-architect` | Designs the tool surface: capabilities, schemas, auth, error semantics |
| `mcp-builder` (skill) | Scaffolds the server implementation from the design |
| `mcp-expert` | Reviews protocol compliance and tool-description quality |
| `mcp-security-auditor` | Audits permissions, transport and secret handling |
| `mcp-testing-engineer` | Conformance + integration tests against a live client |
| `mcp-registry-navigator` | Checks the ecosystem for prior art and registry conventions |

## How the team works

1. `mcp-registry-navigator` scans for existing servers so you don't rebuild prior art.
2. `mcp-server-architect` designs the tool surface; `mcp-builder` scaffolds it.
3. `mcp-expert` and `mcp-security-auditor` review compliance, descriptions and security.
4. `mcp-testing-engineer` exercises every tool including failure paths against a real client.
5. Failures loop back to the builder; the gate must pass before the server ships.

## Example prompt

> Design and build an MCP server that exposes our internal ticketing API as
> tools — create, search and update tickets — then review it for protocol
> compliance and run integration tests against a real client before we
> publish it.

## Install

```
/plugin marketplace add ugurtheiron/SMT-Claude-Agents-public
/plugin install mcp-engineering-team@safemate-agents
```
