# Self-audit checklist

Run this against your own tool.
Every item maps to a principle or an archetype technique.
Aim for "yes" or "not applicable," never "hidden."

Within each archetype the items are grouped by tier,
which is the evidence of real uptake behind the technique, not how good an idea it is.
The tiers and their citations are in [`evidence.md`](evidence.md):

- **Core** a documented consumer fetches and acts on it today. Do these first.
- **Recommended** real consumers exist, but narrower than "AI agents in general."
- **Optional** cheap and no-regret, with no measured uptake. Ship if it costs you an hour.
- **Unassessed** in OSCAR, but not examined by the 2026-09 evidence review.
  Keep doing it; do not claim evidence for it.

The principles below are not tiered.
They are the non-negotiables, and they hold whatever the evidence says about any technique.

## Principles

- [ ] Every agent-facing file is public and reachable at a well-known URL.
- [ ] A person can find those files from the site (a footer link is enough).
- [ ] What agents read matches what humans are told (parity).
- [ ] No hidden text, invisible instructions, comment-only directives, or cloaking anywhere.
- [ ] `robots.txt` states which AI user-agents may use the content.
- [ ] Agent-facing files are generated from source at build time, not hand-maintained.
- [ ] User-generated content is treated as untrusted in anything exposed to agents.
- [ ] Your license is machine-readable (schema.org `license`, SPDX, `LICENSE`, `CITATION.cff`), with attribution guidance.

## Website / docs site

**Core**

- [ ] Structured data is server-rendered: a plain HTTP request returns the JSON-LD,
      not an app shell that builds it with script.
- [ ] JSON-LD (`Organization`, and `SoftwareApplication` for a tool) is in every page head.
- [ ] `robots.txt` names the AI user-agents you allow or disallow, and carries a `Sitemap:` line.
- [ ] `sitemap.xml` has real `<lastmod>` dates, driven by content events rather than build time.

**Recommended**

- [ ] Signposting `Link` relations (`cite-as`, `author`, `license`) are served per resource.

**Optional**

- [ ] `/llms.txt` exists, is curated (not a sitemap dump), and is current.
- [ ] Markdown mirrors are available for key pages.
- [ ] A footer link makes the agent-facing files findable by a person.
      (Optional as a technique, required by principle 2 as an audit path.)

## Command-line tool

**Core**

- [ ] `AGENTS.md` at the **repository root** covers install, key commands, and a worked example.
- [ ] `--help` is complete and example-led on every subcommand.

**Recommended**

- [ ] The tool is wrapped in a Model Context Protocol (MCP) server,
      if agents need to drive it rather than read about it.

**Unassessed**

- [ ] A machine-readable help or schema form exists.
- [ ] Exit codes are meaningful and a `--json` output mode exists.
- [ ] No required interactive prompt lacks a non-interactive flag.

## Library / toolbox

For this archetype the Unassessed group is the substance, not the leftovers.
An agent cannot call a function whose signature it cannot see,
and no study is needed to establish that.

**Core**

- [ ] `AGENTS.md` at the repository root states install, the main entry points, and the gotchas.
- [ ] The license and citation are machine-readable (SPDX in package metadata, `LICENSE`, `CITATION.cff`).

**Recommended**

- [ ] A Model Context Protocol (MCP) server exposes the highest-value operations as callable tools,
      if an agent should run them rather than write code against them.

**Optional**

- [ ] The docs site has an `llms.txt`.

**Unassessed**

- [ ] Every public function has an accurate, example-led docstring with argument types and units.
- [ ] Signatures are explicit; defaults are documented.
- [ ] Package metadata is accurate (`pyproject.toml`, `DESCRIPTION`, `info.xml`).
- [ ] Worked notebooks or scripts cover the common workflows.
- [ ] Bioschemas `ComputationalTool` and `FormalParameter` describe the callable surface.

## Web app / API

**Core**

- [ ] JSON-LD `SoftwareApplication` is server-rendered on the landing page.
- [ ] `AGENTS.md` at the repository root points at the specification and a worked request.

**Recommended**

- [ ] An OpenAPI specification is published and reachable without auth.
- [ ] Core actions are exposed via an MCP server,
      if agents must drive stateful or authenticated actions rather than read.

**Optional**

- [ ] A `/llms.txt` points at the specification, a quickstart, and one worked request.

**Unassessed**

- [ ] Auth, rate limits, and error shapes are documented.
- [ ] Responses are structured and well-typed, with errors that explain themselves.

## Data archive

**Core**

- [ ] Each dataset page emits schema.org `Dataset` JSON-LD with a license and identifier.
- [ ] **Every instruction an agent needs is in the server-rendered HTML the crawler fetches,**
      and it is the same information a human is shown on the page (parity).
      Most AI crawlers execute no JavaScript, so a client-rendered fact does not exist for them.
- [ ] **No mirrored dataset page carries a `rel=canonical` pointing at the upstream archive.**
      Use `sameAs` for the upstream record; the republishing site decides its own indexing.
- [ ] Every DOI record carries the DataCite mandatory fields, so content negotiation
      returns a rich record with no extra work from you.
- [ ] The license and the required citations are machine-readable per dataset,
      not only prose in a description field.
- [ ] `sitemap.xml` lists every dataset page with a real `<lastmod>` tied to a version
      or metadata event.
- [ ] Bulk and programmatic data download is documented (API, bucket, or command-line tool),
      not just a browser button.
- [ ] Metadata is fetchable in machine-readable form without downloading the data.

**Recommended**

- [ ] The archive is listed in re3data, and from there in FAIRsharing and OpenAIRE.
- [ ] The archive has a Wikidata item.
- [ ] Each dataset is signposted: `cite-as` to the DOI, `license`, `describedby`, and `item`.
- [ ] If you publish a cloud-optimized serving copy, the documentation says when to stream it
      and when to download, and names the entry-point document to start from.

**Optional**

- [ ] A top-level `llms.txt` points at the catalog and search, not every dataset.
- [ ] A Croissant export exists for the tabular sidecars,
      and it was justified by a concrete discovery gain such as a Hugging Face or Kaggle listing.

**Unassessed**

- [ ] A machine-readable catalog of all datasets exists.
- [ ] An agent can search or query programmatically (documented API with examples).
- [ ] Bioschemas `Dataset` or RO-Crate refinements are applied where they fit.

## Research lab / project site

**Core**

- [ ] JSON-LD marks up the lab, its people, software, datasets, and papers, server-rendered.
- [ ] Persistent identifiers are exposed (ORCID, ROR, DOI).
- [ ] `robots.txt` names the AI user-agents you allow, with a `Sitemap:` line.
- [ ] Citation and license for the site and each output are machine-readable.

**Recommended**

- [ ] `rel="author"` points at each member's ORCID and `rel="cite-as"` at a DOI on every publication.

**Optional**

- [ ] `llms.txt` maps people, software, datasets, and key papers.

**Unassessed**

- [ ] A canonical index links each output to its own home.
- [ ] Bioschemas `Person` and `TrainingMaterial` profiles are applied to the lab's outputs.

## Standard / specification

For this archetype too, the Unassessed group is the substance.
The tiers say how an agent finds and cites your standard;
the unmeasured items decide whether it can mechanically apply it.

**Core**

- [ ] The specification is versioned and citable, with a DOI whose DataCite record is complete.
- [ ] `AGENTS.md` at the repository root says how to validate a document against the specification.
- [ ] The specification's license and citation are machine-readable.

**Recommended**

- [ ] The validator is callable over an API or a Model Context Protocol server,
      not only as a local install.

**Optional**

- [ ] An `llms.txt` points at the schema, the validator, and the key sections.

**Unassessed**

- [ ] The specification is published as a machine-readable schema.
- [ ] A reference validator exists as a command-line tool and a library.
- [ ] Conformant examples (and a few labeled non-conformant ones) are provided.
- [ ] The schema ships in more than one machine format.
- [ ] The version is in a machine-readable field an agent can gate on.
