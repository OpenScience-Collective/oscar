# Worked example: HED

HED (Hierarchical Event Descriptors, hedtags.org) is the example where nearly every archetype meets, and where a project already has the hard part, the action layer, but not the discovery layer that lets agents find it.

## Why HED is the complete example

HED is not one kind of tool. It is, at once:

- a **standard** (the HED schema and specification, with validators),
- a **multi-page website** (hedtags.org: an introduction, a resources hub, a schema browser, and links to the tools),
- a **library** (Python `hedtools` and a JavaScript validator),
- a **web app and API** (the online tools at hedtools.org with a JSON web service), and
- it ships a **Model Context Protocol (MCP) server** for validation.

HED's action layer includes: an agent that finds the tools can validate a HED string,
a Brain Imaging Data Structure (BIDS) events file, or a JSON sidecar through Python, JavaScript, the web service, or MCP.
What is missing is the **discovery layer**: nothing on the site tells an agent in machine-readable form that these tools exist, where they are, and which to use.

## The multi-page question

The point you raised: the main page wants this, the resources page wants this, and so do the others.
OSCAR answers that with three moves, none of them per-page drudgery:

1. **One `llms.txt` at the site root** that maps every page that matters, the introduction, the resources hub,
   the schema browser, the online tools, and the four tool surfaces (Python, JavaScript, web service, MCP),
   each with a one-line description. This is the site's table of contents for agents.
   See [`after/llms.txt`](after/llms.txt).
2. **Server-rendered JSON-LD on the key pages**: `SoftwareApplication` for the online tools
   (see [`after/hed-online-tools.jsonld`](after/hed-online-tools.jsonld)),
   and `Organization` on the site. hedtags.org is already server-rendered, so it starts ahead.
3. **One site-level [`AGENTS.md`](after/AGENTS.md)** that states, in plain text, what HED is and how to validate,
   so an agent editing a dataset knows to check its work rather than guess.

For pages with substantial prose (the resources page, the tutorials), add a markdown mirror,
a `.md` twin of each page, so an agent reads the text without the surrounding markup.

## Before and after

- **Before:** the tools, the schema, and the validators exist and are excellent,
  but an agent landing on hedtags.org has no machine-readable path to any of them,
  and no `llms.txt`, no site `AGENTS.md`, no `Dataset`- or `SoftwareApplication`-level JSON-LD.
- **After:** the `llms.txt`, the `AGENTS.md`, the JSON-LD, and an AI-aware `robots.txt`
  (all in [`after/`](after/)) turn HED's existing strength into something agents can actually find and use.

## How it maps to the doctrine

- **Standard** ([guide](../../docs/archetypes/standard.md)): the schema ships in multiple machine formats,
  the specification is versioned and citable, and the validators are callable. HED already does this well.
- **Website** ([guide](../../docs/archetypes/website.md)): the `llms.txt`, server-rendered JSON-LD, and markdown mirrors.
- **Library** ([guide](../../docs/archetypes/library.md)): Python `hedtools` and the JavaScript validator,
  each with docs and an installable package.
- **Web app and API** ([guide](../../docs/archetypes/web-app-api.md)): the hedtools.org web service, plus the MCP server.
- **Validate, do not guess:** the recurring HED lesson. An agent should generate a HED annotation and then
  validate it, and OSCAR's job is to make the validators discoverable so it will.

## Note

Files here are illustrative of the pattern; the URLs are HED's real ones
(hedtags.org, hedtools.org/hed, and the hed-standard repositories),
and the MCP server referenced is the real `hed-standard/hed-mcp`.
