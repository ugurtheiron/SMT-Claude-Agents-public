---
id: smt-team-podcast-production-team
name: Podcast Production Team
description: >-
  Audio in, publish package out: transcription in an isolated context,
  chapter and quote extraction, SEO titles, show notes and tags, with an
  audio quality check — the textbook use of subagent context isolation.
category: specialized-domains
tags:
  - team
  - podcast
  - transcription
  - content
  - seo
platforms:
  - claude-code
members:
  - bwc-agent-episode-orchestrator
  - bwc-agent-podcast-transcriber
  - bwc-agent-podcast-content-analyzer
  - bwc-agent-podcast-metadata-specialist
  - bwc-agent-seo-podcast-optimizer
  - bwc-agent-audio-quality-controller
requires:
  - mcp:youtube-transcript
plugin: podcast-production-team
author: SafeMate AI Hub
verified: true
---

## Mission

Process an episode without ever pasting a 40-page transcript into your
conversation. The team is a **sequential pipeline with isolated high-volume
stages**: the transcript lives in the transcriber's context and only
structured extracts move downstream.

## Members

| Agent | Role |
| --- | --- |
| `episode-orchestrator` | Ingests audio + brief, plans the production run |
| `podcast-transcriber` | Full transcript in its own context — never dumped to you |
| `audio-quality-controller` | Flags audio issues worth re-recording |
| `podcast-content-analyzer` | Chapter markers, key quotes, highlight segments |
| `podcast-metadata-specialist` | Titles, show notes, descriptions, tags |
| `seo-podcast-optimizer` | Search-optimized variants of all metadata |

## How the team works

1. `episode-orchestrator` plans the run from your audio and episode brief.
2. `podcast-transcriber` produces the transcript in isolation; `audio-quality-controller` checks the source.
3. `podcast-content-analyzer` extracts chapters, quotes and highlights from the transcript.
4. Metadata and SEO specialists write the publish package from the structured extracts.
5. The orchestrator assembles everything and flags items needing human sign-off.

## Example prompt

> Process episode 42 from this audio file: transcribe it, extract chapter
> markers and the three strongest quotes, and write SEO-optimized titles,
> show notes and tags ready to paste into our podcast host.

## Install

```
/plugin marketplace add ugurtheiron/SMT-Claude-Agents-public
/plugin install podcast-production-team@safemate-agents
```
