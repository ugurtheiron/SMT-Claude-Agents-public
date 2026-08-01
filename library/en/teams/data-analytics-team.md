---
id: smt-team-data-analytics-team
name: Data & Analytics Team
description: >-
  From raw warehouse tables to a decision-ready insight report: ingestion
  and transforms, isolated data profiling, hypothesis-driven feature work,
  model training and a synthesized findings report.
category: data-ai
tags:
  - team
  - data
  - analytics
  - machine-learning
  - sql
platforms:
  - claude-code
members:
  - bwc-agent-data-engineer
  - bwc-agent-data-scientist
  - bwc-agent-data-analyst
  - bwc-agent-sql-expert
  - bwc-agent-ml-engineer
  - bwc-agent-report-generator
requires:
  - mcp:postgres
plugin: data-analytics-team
author: SafeMate AI Hub
verified: true
---

## Mission

Turn a vague analytics question into a defensible answer. The team runs a
**sequential pipeline with parallel exploration stages**: heavy profiling
happens in isolated contexts so bulky query output never drowns the main
conversation, and independent feature families are explored in parallel.

## Members

| Agent | Role |
| --- | --- |
| `data-engineer` | Validates sources, builds ingestion/transform layers, documents tables |
| `sql-expert` | Profiles distributions, nulls and drift in an isolated context |
| `data-analyst` | Business-level exploration and metric definitions |
| `data-scientist` | Hypothesis testing and feature engineering |
| `ml-engineer` | Trains and evaluates baseline and candidate models |
| `report-generator` | Compiles the final insight report with reproducible steps |

## How the team works

1. `data-engineer` establishes clean, documented source tables.
2. `sql-expert` profiles the data and returns only a summary — raw output stays out of your session.
3. `data-analyst` and `data-scientist` explore hypotheses; independent feature families fan out in parallel.
4. `ml-engineer` benchmarks models against an agreed metric.
5. `report-generator` synthesizes which signals matter, model performance and productionization advice.

## Example prompt

> Build a churn-prediction workflow from our events warehouse: profile the
> raw data, engineer candidate features, train and compare baseline models,
> and report which behavioral signals actually predict churn.

## Install

```
/plugin marketplace add ugurtheiron/SMT-Claude-Agents-public
/plugin install data-analytics-team@safemate-agents
```
