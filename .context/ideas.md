# OSCAR design ideas

## Vision
Make it easy and honest for any open-science project to become "agent-ready":
discoverable by AI agents, and usable by them to the fullest.
A reusable public good, sibling to the Open Science Assistant (OSA).

## Key principles (see docs/principles.md)
- Transparency by construction: anything agents read, humans can read and audit.
- No hidden instructions, ever: hidden or comment-only directives are indirect prompt injection, out of scope.
- Parity: agents and humans get the same facts.
- Reproducibility: generate agent-facing files from source at build time.

## Core structure decision
Organize the doctrine by **tool archetype**, not by technology:
website, command-line tool, library, web app / API, data archive.
Rationale: a maintainer thinks "I have a MATLAB toolbox" or "I have a CLI,"
not "I need JSON-LD." Meet them where they are, then hand them the techniques.
Most real tools combine two or three archetypes (NEMAR is three).

## The signature idea: the dual view
Agents do not see the rendered page, only the text in the payload.
The human-facing OSCAR page shows this literally: the rendered site beside its /llms.txt.
This turns the transparency requirement into the teaching moment.

## Delivery
- Layer 1: the doctrine (this repo's docs/).
- Layer 2: osc.earth as the reference implementation (the /oscar page + the real files).
- Layer 3: templates/ plus a generator so a maintainer adopts it in an afternoon.

## Open questions
- Ship an MCP starter server in v0.1, or only document the pattern?
- Where should a live validator run: CLI only, or also a hosted "check my site" page?
