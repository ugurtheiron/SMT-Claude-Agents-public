---
id: smt-team-product-launch-team
name: Product Launch Team
description: >-
  Market sizing and business case built in parallel, merged into one
  opportunity brief that drives UX concepts, launch messaging and sales
  outreach — so marketing and sales ship a single consistent message on
  launch day.
category: business-finance
tags:
  - team
  - product
  - launch
  - marketing
  - sales
  - ux
platforms:
  - claude-code
members:
  - bwc-agent-business-analyst
  - bwc-agent-market-research-analyst
  - bwc-agent-ui-ux-designer
  - bwc-agent-content-marketer
  - bwc-agent-sales-automator
  - bwc-agent-legal-advisor
requires:
  - tool:web-search
plugin: product-launch-team
author: SafeMate AI Hub
verified: true
---

## Mission

Every launch artifact — pricing narrative, landing copy, outreach cadence —
grounded in the same opportunity brief. The shape is a **discovery fan-out
converging into a launch pipeline**.

## Members

| Agent | Role |
| --- | --- |
| `market-research-analyst` | Sizes the market, maps competitors |
| `business-analyst` | Business case: pricing, personas, success metrics |
| `ui-ux-designer` | Flows and concepts for launch-critical surfaces |
| `content-marketer` | Positioning, announcement narrative, landing copy |
| `sales-automator` | Outreach sequences and follow-up cadences |
| `legal-advisor` | Terms, claims and compliance review of launch materials |

## How the team works

1. Market research and business case are built in parallel.
2. Both merge into a single opportunity brief every downstream agent works from.
3. `ui-ux-designer` produces flows; `content-marketer` develops messaging from the brief.
4. `sales-automator` turns the same positioning into outreach sequences.
5. `legal-advisor` reviews claims before anything ships.

## Example prompt

> We are launching a bilingual booking add-on next month: validate the
> market and competitors, define the business case with pricing options,
> sketch the onboarding flow, and produce launch messaging plus a
> five-email outreach sequence for existing customers.

## Install

```
/plugin marketplace add ugurtheiron/SMT-Claude-Agents-public
/plugin install product-launch-team@safemate-agents
```
