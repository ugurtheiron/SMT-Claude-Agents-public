---
id: smt-team-devops-sre-team
name: DevOps & SRE Team
description: >-
  Conditional incident-response chain and infrastructure build pipeline in
  one plugin: triage, parallel log/metric investigation, root-cause
  synthesis, reviewed Terraform and a prevention step so the same failure
  never pages twice.
category: infrastructure-operations
tags:
  - team
  - devops
  - sre
  - terraform
  - incident-response
  - cloud
platforms:
  - claude-code
members:
  - bwc-agent-cloud-architect
  - bwc-agent-terraform-specialist
  - bwc-agent-devops-troubleshooter
  - bwc-agent-incident-responder
  - bwc-agent-network-engineer
  - bwc-agent-performance-engineer
requires:
  - tool:docker
  - tool:terraform
  - mcp:github
plugin: devops-sre-team
author: SafeMate AI Hub
verified: true
---

## Mission

One team, two modes. The orchestration is **conditional routing**: incident
requests (something is broken) flow through a stabilize → investigate →
synthesize chain; build requests (something is needed) flow through design
→ implement-as-IaC. Both paths end with prevention.

## Members

| Agent | Role |
| --- | --- |
| `incident-responder` | Stabilizes, establishes timeline and blast radius |
| `devops-troubleshooter` | Investigates infrastructure dimensions in parallel |
| `performance-engineer` | Investigates latency/regression dimensions in parallel |
| `network-engineer` | Network path, DNS, load-balancer and TLS analysis |
| `cloud-architect` | Designs target architecture for build requests |
| `terraform-specialist` | Implements the design as reviewed Terraform |

## How the team works

1. The request is classified: **incident** or **build**.
2. Incident path: `incident-responder` stabilizes; `devops-troubleshooter` and `performance-engineer` mine logs and metrics in parallel, each in an isolated context.
3. Root cause and fix are synthesized into a runbook entry.
4. Build path: `cloud-architect` designs, `terraform-specialist` codifies.
5. Either path ends with alerts, dashboards or a Terraform guardrail.

## Example prompt

> Production API p99 latency tripled after last night's deploy: triage the
> incident, find the root cause in the logs and metrics, propose the
> immediate fix, and write the Terraform change that prevents a recurrence.

## Install

```
/plugin marketplace add ugurtheiron/SMT-Claude-Agents-public
/plugin install devops-sre-team@safemate-agents
```
