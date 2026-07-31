---
id: smt-team-full-stack-dev-team
name: Full-Stack Development Team
description: >-
  Six specialists that take a feature from API contract to deployed code:
  backend architecture, database schema, frontend build, generated test
  suites, an independent review gate and CI/CD wiring — installed together
  as one Claude Code plugin.
category: development-architecture
tags:
  - team
  - full-stack
  - backend
  - frontend
  - testing
  - ci-cd
platforms:
  - claude-code
members:
  - bwc-agent-backend-architect
  - bwc-agent-frontend-developer
  - bwc-agent-database-optimizer
  - bwc-agent-test-automator
  - bwc-agent-code-reviewer
  - bwc-agent-deployment-engineer
requires:
  - mcp:github
  - tool:docker
plugin: full-stack-dev-team
author: SafeMate AI Hub
verified: true
---

## Mission

Ship a full feature end to end without losing the thread between layers.
The team follows a **sequential pipeline with review gates**: architecture
decisions freeze before implementation starts, and nothing deploys until an
independent reviewer signs off.

## Members

| Agent | Role |
| --- | --- |
| `backend-architect` | Designs the API contract, service boundaries and data model |
| `database-optimizer` | Turns the model into a concrete schema with indexes and query plans |
| `frontend-developer` | Builds UI components against the frozen API contract |
| `test-automator` | Generates unit, integration and e2e suites across the stack |
| `code-reviewer` | Read-only review gate over the full diff |
| `deployment-engineer` | Wires CI/CD, environment config and rollout |

## How the team works

1. `backend-architect` produces the API contract and service design from your feature brief.
2. `database-optimizer` derives the schema; once the contract is frozen, `frontend-developer` can run in parallel.
3. `test-automator` generates the test suites for every layer.
4. `code-reviewer` gates the full diff — findings loop back to the owning specialist, not to you.
5. `deployment-engineer` finishes with pipeline, environments and rollout plan.

## Example prompt

> Build a user dashboard with real-time notifications end to end: design the
> REST API and Postgres schema, implement the React frontend, generate the
> test suite, then review everything and set up the deployment pipeline.

## Install

```
/plugin marketplace add ugurtheiron/SMT-Claude-Agents-public
/plugin install full-stack-dev-team@safemate-agents
```
