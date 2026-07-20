# The OSCAR doctrine

How to make an open-science tool ready for AI agents,
so agents can both **discover** it and **use it to the fullest**, transparently.

New here? Read the [grounding](grounding.md) first,
why agent-readiness is the FAIR principles made practical, not a passing trend.
Then the [principles](principles.md), the guide for your archetype, and the [checklist](checklist.md).

## Two jobs

Everything here serves one of two jobs:

- **Discovery** so an agent learns your tool exists and what it is for.
- **Usage** so an agent can operate your tool correctly once it has found it.

A pure website mostly needs discovery.
A command-line tool or library mostly needs usage.
Most real projects are a mix, which is why OSCAR is organized by archetype.

## The three layers

Under the two jobs, every technique falls into one of three layers.
Naming them helps you see what you are missing.

1. **The card** (structured, visible metadata): JSON-LD / schema.org, YAML front matter, package metadata.
2. **The index** (discovery): `llms.txt`, `sitemap.md`, `robots.txt`.
3. **The action** (what an agent can call): Model Context Protocol (MCP), OpenAPI, structured `--help`.

A pure content site needs the card and the index.
Anything with a command-line tool, library, API, or dataset also needs the action layer,
and MCP is the common thread there across four of the five archetypes.

## The archetypes

| Guide | You have this if | Reads |
|-------|------------------|-------|
| [Website / docs site](archetypes/website.md) | a site people visit or read docs on | discovery-heavy |
| [Command-line tool](archetypes/cli.md) | a program run in a terminal | usage-heavy |
| [Library / toolbox](archetypes/library.md) | functions imported into code (Python, MATLAB, R) | usage-heavy |
| [Web app / API](archetypes/web-app-api.md) | an interactive app or a service with an API | discovery + usage |
| [Data archive](archetypes/data-archive.md) | you host datasets others use | discovery + usage |
| [Research lab / project site](archetypes/lab-website.md) | you present people, software, and papers | discovery-heavy |
| [Standard / specification](archetypes/standard.md) | you define a format others must conform to | discovery + usage |

These map to what the OpenScience Collective services: archives, tools and toolsets,
research lab and project sites, and standards.
The set is deliberately extensible; add an archetype when a genuinely new shape appears.
Pick every row that applies and combine them.
For example NEMAR is a data archive plus a website plus a command-line tool,
so it uses three guides.

## The technique glossary

Each archetype guide points at some of these.
Every one produces a public, auditable artifact.

- **`llms.txt`** A Markdown index at your site root that curates your best content for models.
  The de-facto standard from [llmstxt.org](https://llmstxt.org).
  Optionally `llms-full.txt` with the full text inlined.
  Reality check: it is fetched by agentic tools (Claude Code, Cursor), not by classic search crawlers,
  so treat it as an agent signal, not as search-engine optimization.
- **`AGENTS.md`** A plain-language brief for coding agents,
  at a repo root or a site root, covering setup, key commands, and gotchas.
  The [agents.md](https://agents.md) open standard.
- **AI-aware `robots.txt`** Named AI user-agents you explicitly allow or disallow
  (ClaudeBot, GPTBot, Google-Extended, PerplexityBot, CCBot, and so on).
- **JSON-LD / schema.org** Machine-readable structured data in the page head:
  `SoftwareApplication`, `Dataset`, `Organization`, `BreadcrumbList`.
- **Markdown mirrors** A clean `.md` version of each page,
  served by content negotiation or a `.md` URL, so agents skip the HTML noise.
- **Machine-readable help** For command-line tools, a stable `--help`
  and ideally a structured form such as `--help=json`.
- **OpenAPI** A specification of your HTTP API that agents and tools can consume directly.
- **Model Context Protocol (MCP)** A server that exposes your tool's *capabilities*,
  not just its docs, so an agent can call it. See [modelcontextprotocol.io](https://modelcontextprotocol.io).
- **License and attribution metadata** How you tell an agent it may reuse your work and how to credit you:
  a schema.org `license` field, an SPDX identifier, a `LICENSE` file, and a `CITATION.cff`.
- **Signposting** Typed HTTP `Link` headers and HTML `<link>` relations
  (`cite-as`, `author`, `license`, `type`, `describedby`, `item`) that let an agent
  navigate a scholarly resource from a plain HEAD request, no scraping.
  The FAIR Signposting Profile; adopted by Zenodo, Dataverse, and DSpace. See [signposting.org](https://signposting.org).
- **Bioschemas** schema.org profiles refined for science
  (`Dataset`, `ComputationalTool`, `FormalParameter`, `Person`, `TrainingMaterial`),
  each with explicit Minimum, Recommended, and Optional fields. See [bioschemas.org](https://bioschemas.org).

## Tooling and validation

You do not have to eyeball this.
Vercel's [Agent Readability Spec](https://vercel.com/kb/guide/agent-readability-spec)
is the most complete public checklist (15 site-wide and 23 per-page checks),
with a companion `@vercel/agent-readability` package and the agent-ready.dev scorer.
Run it against your site, then close the gaps.
OSCAR's own [checklist](checklist.md) is the shorter, principle-first version.

## Status

The framework above is stable.
Individual archetype guides are being drafted in the open;
each notes its own maturity at the top.
