---
id: smt-team-research-intelligence-team
name: Research Intelligence Team
description: >-
  The canonical orchestrator-worker research architecture: a lead that
  decomposes the question, parallel searchers with explicit objectives and
  boundaries, compressed citation-tagged findings and a synthesized,
  source-checked report.
category: specialized-domains
tags:
  - team
  - research
  - orchestration
  - synthesis
  - citations
platforms:
  - claude-code
members:
  - bwc-agent-research-orchestrator
  - bwc-agent-research-coordinator
  - bwc-agent-comprehensive-researcher
  - bwc-agent-technical-researcher
  - bwc-agent-research-synthesizer
  - bwc-agent-report-generator
requires:
  - tool:web-search
plugin: research-intelligence-team
author: SafeMate AI Hub
verified: true
---

## Mission

Answer broad, breadth-first questions that exceed a single context window.
This is the **orchestrator-worker** pattern popularized by Anthropic's own
multi-agent research system: the lead gives each searcher an explicit
objective, output format, source guidance and task boundary — vague
delegation is the top failure mode, so the team is built to avoid it.

## Members

| Agent | Role |
| --- | --- |
| `research-orchestrator` | Decomposes the question, scales agent count to complexity |
| `research-coordinator` | Tracks sub-question coverage and reconciles overlaps |
| `comprehensive-researcher` | Broad-sweep searcher for landscape questions |
| `technical-researcher` | Deep-dive searcher for technical/spec questions |
| `research-synthesizer` | Compiles findings, reconciles conflicts between sources |
| `report-generator` | Produces the final structured report |

## How the team works

1. The orchestrator splits the question into independent sub-questions with explicit boundaries.
2. Searchers fan out in parallel, each iteratively querying and filtering in its own context.
3. Searchers return compressed, citation-tagged findings — never raw page dumps.
4. The synthesizer builds a coherent narrative and flags conflicting sources.
5. A citation-check pass verifies every claim traces to a real source before delivery.

## Example prompt

> Map the competitive landscape for AI coding assistants in 2026 — pricing,
> enterprise features and positioning for the top eight products — with
> every claim cited to a source I can check.

## Install

```
/plugin marketplace add ugurtheiron/SMT-Claude-Agents-public
/plugin install research-intelligence-team@safemate-agents
```
