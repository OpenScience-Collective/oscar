# The OSCAR doctrine

How to make an open-science tool ready for AI agents,
so agents can both **discover** it and **use it to the fullest**, transparently.

Start with the [principles](principles.md).
Then read the guide(s) for your archetype.
Finish with the [checklist](checklist.md).

## Two jobs

Everything here serves one of two jobs:

- **Discovery** so an agent learns your tool exists and what it is for.
- **Usage** so an agent can operate your tool correctly once it has found it.

A pure website mostly needs discovery.
A command-line tool or library mostly needs usage.
Most real projects are a mix, which is why OSCAR is organized by archetype.

## The archetypes

| Guide | You have this if | Reads |
|-------|------------------|-------|
| [Website / docs site](archetypes/website.md) | a site people visit or read docs on | discovery-heavy |
| [Command-line tool](archetypes/cli.md) | a program run in a terminal | usage-heavy |
| [Library / toolbox](archetypes/library.md) | functions imported into code (Python, MATLAB, R) | usage-heavy |
| [Web app / API](archetypes/web-app-api.md) | an interactive app or a service with an API | discovery + usage |
| [Data archive](archetypes/data-archive.md) | you host datasets others use | discovery + usage |

Pick every row that applies and combine them.
For example NEMAR is a data archive plus a website plus a command-line tool,
so it uses three guides.

## The technique glossary

Each archetype guide points at some of these.
Every one produces a public, auditable artifact.

- **`llms.txt`** A Markdown index at your site root that curates your best content for models.
  The de-facto standard from [llmstxt.org](https://llmstxt.org).
  Optionally `llms-full.txt` with the full text inlined.
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

## Status

The framework above is stable.
Individual archetype guides are being drafted in the open;
each notes its own maturity at the top.
