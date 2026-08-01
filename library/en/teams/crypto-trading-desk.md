---
id: smt-team-crypto-trading-desk
name: Crypto Trading Desk
description: >-
  Fundamental and quantitative analysis run in deliberately separate
  contexts, synthesized into trade ideas with entries and invalidation
  levels, then stress-tested by a risk manager with veto power. Decision
  support only — the desk never executes trades.
category: crypto-trading
tags:
  - team
  - crypto
  - trading
  - risk-management
  - defi
platforms:
  - claude-code
members:
  - bwc-agent-crypto-trader
  - bwc-agent-crypto-analyst
  - bwc-agent-quant-analyst
  - bwc-agent-crypto-risk-manager
  - bwc-agent-defi-strategist
  - bwc-skill-coinpaprika-api
  - bwc-skill-dexpaprika-api
requires:
  - connection:coinpaprika
plugin: crypto-trading-desk
author: SafeMate AI Hub
verified: true
---

## Mission

Structured market analysis with an adversarial risk gate. The shape is a
**parallel analysis fan-out with an independent judge**: fundamentals and
quant signals are produced in separate contexts so neither analyst anchors
on the other's thesis, and nothing reaches you without risk approval.

> **Not financial advice.** The desk analyzes and recommends; it does not
> execute trades and its output is decision support, not investment advice.

## Members

| Member | Role |
| --- | --- |
| `crypto-analyst` | Fundamentals, news flow, on-chain data |
| `quant-analyst` | Statistical signals and technicals |
| `defi-strategist` | Protocol/yield context for DeFi-adjacent ideas |
| `crypto-trader` | Synthesizes both streams into concrete trade ideas |
| `crypto-risk-manager` | Adversarial judge with veto: sizing, correlation, drawdown |
| `coinpaprika-api` / `dexpaprika-api` (skills) | Market and DEX data access |

## How the team works

1. `crypto-analyst` and `quant-analyst` work the same brief in parallel, isolated from each other.
2. `crypto-trader` merges both into ideas with entries, invalidation levels and horizons.
3. `crypto-risk-manager` stress-tests sizing and drawdown against your limits — and can veto.
4. Only risk-approved ideas reach you, as a decision-support brief.

## Example prompt

> Analyze BTC and ETH going into tomorrow's Fed announcement: run technical
> and on-chain analyses in parallel, turn them into position ideas with
> entries and invalidation levels, and have the risk manager stress-test
> sizing against a 2 percent max-drawdown limit before anything reaches me.

## Install

```
/plugin marketplace add ugurtheiron/SMT-Claude-Agents-public
/plugin install crypto-trading-desk@safemate-agents
```
