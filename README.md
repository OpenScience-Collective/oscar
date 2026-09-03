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
It reads the text in the payload your server returns.
Most AI crawlers do not execute JavaScript at all,
so anything your page assembles with a script does not exist for them.
OSCAR's job is to make that returned text excellent and honest.

```
What a human sees                 What an agent reads (the served HTML)
-----------------                 -------------------------------------
[ rendered page, CSS, buttons ]   <script type="application/ld+json">
                                  { "@type": "Dataset",
  "Download"      ->  button        "identifier": "https://doi.org/...",
                                    "license": "https://...",
                                    "distribution": [ { "contentUrl": ... } ] }
```

A curated `/llms.txt` on top of that is a cheap extra, not the mechanism.
See [`docs/evidence.md`](docs/evidence.md) for which is which, and why.

## Not a fad: FAIR made practical

Machine-actionability is not new.
The FAIR principles (2016) already called for data usable by an
"autonomously-acting, computational data explorer."
OSCAR operationalizes FAIR's Interoperable and Reusable principles for a new such explorer,
the AI agent, and extends them from datasets to every kind of tool.
It also closes a gap: parts of the scholarly web solved structured metadata years ago
but now regress into client-rendered app shells an agent cannot read,
while the newer agent conventions have barely reached open science at all.
See [`docs/grounding.md`](docs/grounding.md).

## The archetypes

A "tool" is not one thing, so OSCAR gives a recipe per archetype.
Most projects are a combination of two or three.

Techniques are listed in tier order, and the tier is the evidence that anything
actually consumes the technique, not how good an idea it is.
**Core** has a documented consumer today, **Recommended** has a narrower one,
and **Optional** is a cheap no-regret artifact with no measured uptake.
Every tier traces to a citation in [`docs/evidence.md`](docs/evidence.md).

| Archetype | Example | Core | Recommended | Optional |
|-----------|---------|------|-------------|----------|
| Website / docs site | eeglab.org, nemar.org | server-rendered JSON-LD, AI-aware `robots.txt`, honest `sitemap.xml` | Signposting `Link` headers | `llms.txt`, markdown mirrors |
| Command-line tool | `nemar-cli` | repo-root `AGENTS.md`, excellent `--help` | MCP server | none |
| Library / toolbox | EEGLAB (MATLAB) | repo-root `AGENTS.md`, machine-readable license | MCP server | docs `llms.txt` |
| Web app / API | HEDit, OSA | JSON-LD `SoftwareApplication`, repo-root `AGENTS.md` | OpenAPI spec, MCP server | `llms.txt` |
| Data archive | NEMAR | schema.org `Dataset`, complete DataCite record, `sameAs` never `canonical`, documented bulk download | registries, Signposting, stream-versus-download guidance | `llms.txt`, Croissant export |
| Research lab / project site | a lab or project website | JSON-LD `Organization`/`Person`/`SoftwareSourceCode`, persistent identifiers, AI-aware `robots.txt` | Signposting `Link` headers | `llms.txt` |
| Standard / specification | BIDS, HED | versioned citable spec with a complete DOI record, repo-root `AGENTS.md` | callable validator over an API or MCP | `llms.txt` |

The tiers rank evidence, not value.
For the usage-heavy archetypes, library and standard, the highest-value techniques
(docstrings, explicit signatures, a machine-readable schema, a reference validator)
sit in an **Unassessed** group in their guides:
nobody measured them because they are the only interface there is.
Read that group before you read the tiers as a to-do list.

OSCAR curates instructions for the kinds of project the OpenScience Collective services:
data archives, tools and toolsets, research lab and project sites, and standards.
The set is meant to be extensible; new archetypes and worked examples are added as the landscape grows.
Full guides live in [`docs/archetypes/`](docs/archetypes/).

## Where each file goes

Two files are site-wide and live at the origin root; everything else is per-resource.

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

## Layout

```
oscar/
  docs/            The doctrine: principles + evidence tiers + one guide per archetype + a checklist
  templates/       Copy-paste starter files (llms.txt, AGENTS.md, robots.txt, JSON-LD)
  examples/        Worked case studies (HEDit, EEGLAB, NEMAR)
  brand/           Logo and favicon
```

## Quick start

1. Read [`docs/principles.md`](docs/principles.md), the non-negotiables.
2. Read [`docs/evidence.md`](docs/evidence.md) to see what is worth your first afternoon.
3. Find your archetype(s) in [`docs/archetypes/`](docs/archetypes/) and do the Core group first.
4. Copy the matching starter files from [`templates/`](templates/) and fill them in.
5. Self-audit against [`docs/checklist.md`](docs/checklist.md).
6. Link the files from your site footer so they are auditable.

## Status

Early and public.
The principles and the archetype framework are stable;
the per-archetype guides and worked examples are being written in the open.
The technique tiers in [`docs/evidence.md`](docs/evidence.md) are a living document,
reviewed 2026-09-03, and they are expected to move.
See [`.context/plan.md`](.context/plan.md) for the roadmap.

## License

Documentation and templates: Creative Commons Attribution 4.0 (CC-BY-4.0).
Code (generators, scripts): MIT.
See [`LICENSE`](LICENSE).
