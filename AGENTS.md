# OSCAR Instructions

## Project Context
**Purpose:** OSCAR (Open Science Collective Agent Readiness) is a guide and drop-in toolkit
that helps open-science projects make their tools discoverable by AI agents
and usable to the fullest, always transparently.
It is a resource of the OpenScience Collective (osc.earth), a sibling to the Open Science Assistant (OSA).

**Tech Stack:** This is primarily a documentation and template repository.
Prose lives in Markdown under `docs/`.
Copy-paste starter files live under `templates/`.
Any generator or validator tooling is Bun + TypeScript (never npm/npx).

**Architecture:** Content over code.
The doctrine is organized by tool archetype, not by technology.
Every recommendation must be transparent: public, human-readable, and auditable.

## Architecture Map
```
docs/
├── principles.md        # The non-negotiables (transparency, auditability, no hidden prompts)
├── archetypes/          # One guide per archetype: website, cli, library, web-app-api, data-archive
└── checklist.md         # Self-audit checklist a maintainer runs against their own tool
templates/               # Copy-paste starters: llms.txt, AGENTS.md, robots.txt, JSON-LD
examples/                # Worked case studies (HEDit, EEGLAB, NEMAR)
brand/                   # Logo and favicon (OSC family: deep blue on steel, red accent)
```

## The prime directive: transparency by construction
Every technique OSCAR recommends produces a public, human-readable artifact at a well-known URL,
linked from the site so any person can audit it.
Never recommend, document, or generate hidden text, invisible instructions,
zero-opacity or off-screen content, or comment-only directives aimed at agents.
Those are indirect prompt injection and are out of scope except as an explicit anti-pattern to warn against.
If an agent is told something, a human must be able to read the same thing.

## Writing conventions
- Semantic line breaks in all Markdown prose: roughly one sentence per line,
  break at clause punctuation for long sentences (see sembr.org).
- No em-dashes; use commas or semicolons.
- Define an abbreviation before first use, for example "Hierarchical Event Descriptors (HED)".
- No emojis in commits, pull requests, or code.
- Examples beat explanations; every archetype guide ends with a concrete, copyable snippet.

## Development Workflow
1. **Check context:** `.context/plan.md` for the current roadmap and tasks.
2. **Understand deeply:** `.context/ideas.md` for design decisions and open questions.
3. **Branch:** `gh issue develop <issue-number>` for anything beyond a typo.
4. **Write:** follow the conventions above and the patterns in `.rules/`.
5. **Commit:** atomic, under 50 characters, no emojis, no AI attribution.
6. **PR:** reference the issue; run `/review-pr` before merging.

## [NEVER DO THIS]
- Never document or generate a technique that hides content from humans while exposing it to agents.
- Never use `npm` or `npx`; use Bun for any JS/TS tooling.
- Never use `pip`, `conda`, or `virtualenv`; use UV for any Python tooling.
- Never commit secrets or credentials.
- Never add a TODO without a linked issue.

## Context Files
- `.context/plan.md` - Current roadmap and tasks.
- `.context/ideas.md` - Design decisions and open questions.
- `.context/research.md` - Findings on the agent-readable web (standards, tooling, examples).
- `.context/scratch_history.md` - Failed attempts and lessons.
- `.context/decisions/` - Architecture Decision Records; copy `0000-template.md` to start one.

---
Remember: the deliverable is a public good other maintainers can adopt in an afternoon.
Keep it transparent, concrete, and reproducible.
