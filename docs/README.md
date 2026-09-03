# The OSCAR doctrine

How to make an open-science tool ready for AI agents,
so agents can both **discover** it and **use it to the fullest**, transparently.

New here? Read the [grounding](grounding.md) first,
why agent-readiness is the FAIR principles made practical, not a passing trend.
Then the [principles](principles.md), the guide for your archetype, and the [checklist](checklist.md).

Short on time? Read [`evidence.md`](evidence.md).
It tiers every technique below by the evidence that anything actually consumes it,
Core, Recommended, or Optional, with the citation for each,
and it is the reason some techniques moved down this page in 2026-09.

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
2. **The index** (discovery): `robots.txt`, `sitemap.xml`, `llms.txt`.
3. **The action** (what an agent can call): Model Context Protocol (MCP), OpenAPI, structured `--help`.

A pure content site needs the card and the index.
Anything with a command-line tool, library, API, or dataset also needs the action layer.

The layers say what a technique *is*; the [tiers](evidence.md) say what to do first.
They do not line up neatly, and that is the useful part.
The card is almost entirely Core, because server-rendered schema.org
is what documented consumers actually read.
The index splits: `robots.txt` and an honest `sitemap.xml` are Core,
while `llms.txt` is Optional, because the best available measurement says it is not being fetched.
The action layer is mostly Recommended: real, but narrower than it is usually sold as,
and MCP earns its cost only when agents must drive your tool rather than read about it.

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

Each guide lists its techniques in tier order, Core first.
If you read only the Core group of your archetype and stop,
you have done the part that has evidence behind it.

## The technique glossary

Each archetype guide points at some of these.
Every one produces a public, auditable artifact.
Each entry names its tier; the citations are in [`evidence.md`](evidence.md).

- **`llms.txt`** (Optional) A Markdown index at your site root that curates your best content for models.
  The de-facto standard from [llmstxt.org](https://llmstxt.org).
  Optionally `llms-full.txt` with the full text inlined.
  **Evidence caveat, stated plainly:** there is no measured uptake, and one vendor denial.
  A study of 137,210 domains found 97 percent of published `llms.txt` files
  received zero requests in a month
  ([Ahrefs, 2026-06-15](https://ahrefs.com/blog/llmstxt-study/)),
  and Google states that Search ignores the file and that referencing it was not an endorsement.
  Ship it as a cheap, honest, no-regret artifact, and do not count it as a findability win.
- **`AGENTS.md`** (Core at a repository root, Optional at a site root)
  A plain-language brief for coding agents,
  covering setup, key commands, and gotchas.
  The [agents.md](https://agents.md) open standard.
  The adoption is real and it is specifically the **repository root**:
  60,000+ projects, supported by OpenAI Codex, Google Jules, and Cursor,
  read by a coding agent working inside a checked-out repository.
  A copy at a **site root** has no uptake evidence,
  because no browsing or search agent is documented as fetching one;
  the proposals aimed at that use case go by other names and were not adopted.
  Put it in the repo; keep a site-root copy only as a human-readable brief.
- **AI-aware `robots.txt`** (Core) Named AI user-agents you explicitly allow or disallow
  (ClaudeBot, GPTBot, Google-Extended, PerplexityBot, CCBot, and so on).
  Every one of those tokens is documented by its own vendor.
- **JSON-LD / schema.org** (Core) Machine-readable structured data in the page head:
  `SoftwareApplication`, `Dataset`, `Organization`, `BreadcrumbList`.
  Server-render it: most AI crawlers execute no JavaScript,
  so a client-built card does not exist for them.
- **Markdown mirrors** (Optional) A clean `.md` version of each page,
  served by content negotiation or a `.md` URL,
  so agents skip the Hypertext Markup Language (HTML) noise.
  The efficiency argument is sound and the uptake is unmeasured:
  the vendor documenting the pattern cites no server-log evidence that agents request markdown.
- **Machine-readable help** For command-line tools, a stable `--help`
  and ideally a structured form such as `--help=json`.
- **OpenAPI** (Recommended) A specification of your Hypertext Transfer Protocol (HTTP) API
  that agents and tools consume directly.
  OpenAI's Actions read 3.0.1 and 3.1.0 specifications as they are.
- **Model Context Protocol (MCP)** (Recommended) A server that exposes your tool's *capabilities*,
  not just its docs, so an agent can call it. See [modelcontextprotocol.io](https://modelcontextprotocol.io).
  Vendor-broad and growing, and a large effort:
  it earns its cost when agents must drive stateful or authenticated actions,
  not when they need to search and read.
- **License and attribution metadata** How you tell an agent it may reuse your work and how to credit you:
  a schema.org `license` field, an SPDX identifier, a `LICENSE` file, and a `CITATION.cff`.
- **Signposting** (Recommended) Typed HTTP `Link` headers and HTML `<link>` relations
  (`cite-as`, `author`, `license`, `type`, `describedby`, `item`) that let an agent
  navigate a scholarly resource from a plain HEAD request, no scraping.
  The FAIR Signposting Profile; adopted by Zenodo, Dataverse, and DSpace. See [signposting.org](https://signposting.org).
  The adoption is verifiable and the consumers are repository software, not AI agents,
  which is why it is Recommended rather than Core.
- **Bioschemas** schema.org profiles refined for science
  (`Dataset`, `ComputationalTool`, `FormalParameter`, `Person`, `TrainingMaterial`),
  each with explicit Minimum, Recommended, and Optional fields. See [bioschemas.org](https://bioschemas.org).

## Where each file goes

You have the *what* above; this is the *where*, and whether each file is site-wide or per-page.

| Artifact | Location | Scope |
|----------|----------|-------|
| `robots.txt` | site root, `/robots.txt` | one per origin, never per-page |
| `llms.txt` | site root, `/llms.txt` | one per site; links out to per-section pages |
| `AGENTS.md` | repo root (Core); a site-root copy has no uptake evidence | one per repo; may nest per subdirectory, closest wins |
| JSON-LD / schema.org | each page's `<head>`, server-rendered | per page |
| Markdown mirror | beside each page, `/x` to `/x.md` | per page |
| Signposting `Link` | HTTP header or `<link>` per resource | per resource |

You never fork `llms.txt` or `robots.txt` per page.
Per-page detail is the JSON-LD's job:
a homepage carries `Organization`, a dataset page `Dataset`, a tool page `SoftwareApplication`.
The one root `llms.txt` gains depth by linking to those pages, not by cloning itself.

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
