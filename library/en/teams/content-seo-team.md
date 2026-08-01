---
id: smt-team-content-seo-team
name: Content & SEO Team
description: >-
  Parallel competitor and keyword research merged into one content brief,
  long-form drafting, channel-native social variants and an SEO/editorial
  pass — a complete launch content package from a single prompt.
category: sales-marketing
tags:
  - team
  - content
  - seo
  - marketing
  - social-media
platforms:
  - claude-code
members:
  - bwc-agent-content-marketer
  - bwc-agent-social-media-copywriter
  - bwc-agent-market-research-analyst
  - bwc-agent-search-specialist
  - bwc-skill-content-research-writer
  - bwc-skill-competitive-ads-extractor
requires:
  - tool:web-search
plugin: content-seo-team
author: SafeMate AI Hub
verified: true
---

## Mission

Marketing and search research feed one brief; everything downstream writes
from that brief so the message stays consistent across channels. The shape
is a **parallel research fan-out feeding a writing pipeline**.

## Members

| Member | Role |
| --- | --- |
| `market-research-analyst` | Maps competitor positioning and messaging |
| `search-specialist` | Gathers keyword and search-intent data |
| `competitive-ads-extractor` (skill) | Pulls competitor ad copy for angle analysis |
| `content-research-writer` (skill) | Research-backed long-form drafting support |
| `content-marketer` | Writes the long-form piece against the unified brief |
| `social-media-copywriter` | Derives LinkedIn/X/newsletter variants from the final draft |

## How the team works

1. Competitor and keyword research run in parallel; raw browsing stays in their contexts.
2. Both streams merge into a single content brief: angle, keywords, audience, outline.
3. `content-marketer` drafts long-form against the brief.
4. `social-media-copywriter` produces channel-native variants.
5. An SEO/editorial pass checks keyword coverage, internal links and metadata before anything ships.

## Example prompt

> Create the launch content package for our new scheduling feature: research
> competitor messaging and target keywords in parallel, write the
> announcement blog post from a unified brief, then produce LinkedIn and X
> variants plus meta title and description.

## Install

```
/plugin marketplace add ugurtheiron/SMT-Claude-Agents-public
/plugin install content-seo-team@safemate-agents
```
