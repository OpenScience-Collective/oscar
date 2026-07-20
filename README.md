<p align="center">
  <img src="brand/oscar-logo.svg" alt="OSCAR" width="220" />
</p>

<h1 align="center">OSCAR</h1>

<p align="center"><strong>Open Science Collective Agent Readiness</strong><br/>
Make your open-science tools legible to AI agents, transparently.</p>

---

OSCAR is the best practices, rules, and tools that make an open-science project ready for AI agents.
It helps any maintainer answer two questions:

1. **How do agents find out my tool exists,** and what it does?
2. **How do agents use my tool to the fullest** once they have found it?

It is a resource of the [OpenScience Collective](https://osc.earth),
a sibling to the [Open Science Assistant (OSA)](https://osc.earth/osa/).
Where OSA is an assistant that uses open-science tools,
OSCAR is the standard that makes those tools usable by any assistant.

## The one rule: transparency by construction

Everything OSCAR asks you to publish is public, human-readable, and linked from your site.
Anything an agent is told, a person can open and audit.

OSCAR does not use, and actively warns against,
hidden text, invisible instructions, or comment-only directives aimed at agents.
Those techniques are a form of indirect prompt injection;
security teams catalog them as an attack, and they erode the trust open science runs on.
See [`docs/principles.md`](docs/principles.md).

## What agents actually see

An agent never sees your rendered page, your styling, or your buttons.
It reads the text in the payload.
OSCAR's job is to make that text excellent and honest.

```
What a human sees                 What an agent reads (/llms.txt)
-----------------                 ------------------------------
[ rendered page, CSS, buttons ]   # Your Tool
                                  > One-line description of what it is.
  "Try the demo"  ->  button      ## Start here
                                  - [Docs](https://...): ...
                                  - [Demo](https://...): try it now
```

## The five archetypes

A "tool" is not one thing, so OSCAR gives a recipe per archetype.
Most projects are a combination of two or three.

| Archetype | Example | Primary techniques |
|-----------|---------|--------------------|
| Website / docs site | eeglab.org, nemar.org | `llms.txt`, `AGENTS.md`, AI-friendly `robots.txt`, JSON-LD, markdown mirrors |
| Command-line tool | `nemar-cli` | machine-readable `--help`, `AGENTS.md`, examples cookbook, optional MCP server |
| Library / toolbox | EEGLAB (MATLAB) | docstrings, typed signatures, docs `llms.txt`, MCP server, worked notebooks |
| Web app / API | HEDit, OSA | OpenAPI spec, MCP server, JSON-LD `SoftwareApplication`, clear auth and limits |
| Data archive | NEMAR | schema.org `Dataset`, machine-readable catalog, per-dataset cards, API |

Full guides live in [`docs/archetypes/`](docs/archetypes/).

## Layout

```
oscar/
  docs/            The doctrine: principles + one guide per archetype + a checklist
  templates/       Copy-paste starter files (llms.txt, AGENTS.md, robots.txt, JSON-LD)
  examples/        Worked case studies (HEDit, EEGLAB, NEMAR)
  brand/           Logo and favicon
```

## Quick start

1. Read [`docs/principles.md`](docs/principles.md), the non-negotiables.
2. Find your archetype(s) in [`docs/archetypes/`](docs/archetypes/).
3. Copy the matching starter files from [`templates/`](templates/) and fill them in.
4. Self-audit against [`docs/checklist.md`](docs/checklist.md).
5. Link the files from your site footer so they are auditable.

## Status

Early and public.
The principles and the archetype framework are stable;
the per-archetype guides and worked examples are being written in the open.
See [`.context/plan.md`](.context/plan.md) for the roadmap.

## License

Documentation and templates: Creative Commons Attribution 4.0 (CC-BY-4.0).
Code (generators, scripts): MIT.
See [`LICENSE`](LICENSE).
