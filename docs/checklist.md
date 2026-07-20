# Self-audit checklist

Run this against your own tool.
Every item maps to a principle or an archetype technique.
Aim for "yes" or "not applicable," never "hidden."

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

- [ ] `/llms.txt` exists, is curated (not a sitemap dump), and is current.
- [ ] `robots.txt` names the AI agents you allow or disallow.
- [ ] JSON-LD (`Organization`, and `SoftwareApplication` for a tool) is in every page head.
- [ ] Markdown mirrors are available for key pages.
- [ ] `sitemap.xml` has real `<lastmod>` dates.

## Command-line tool

- [ ] `--help` is complete and example-led on every subcommand.
- [ ] A machine-readable help or schema form exists.
- [ ] `AGENTS.md` covers install, key commands, and a worked example.
- [ ] Exit codes are meaningful and a `--json` output mode exists.
- [ ] No required interactive prompt lacks a non-interactive flag.

## Library / toolbox

- [ ] Every public function has an accurate, example-led docstring with argument types and units.
- [ ] Signatures are explicit; defaults are documented.
- [ ] The docs site has an `llms.txt`.
- [ ] Worked notebooks or scripts cover the common workflows.

## Web app / API

- [ ] An OpenAPI specification is published and reachable without auth.
- [ ] JSON-LD `SoftwareApplication` is on the landing page.
- [ ] Core actions are exposed via an MCP server or a documented API.
- [ ] Auth, rate limits, and error shapes are documented.

## Data archive

- [ ] Each dataset page emits schema.org `Dataset` JSON-LD with a license and identifier.
- [ ] A machine-readable catalog of all datasets exists.
- [ ] An agent can search or query programmatically (documented API with examples).
- [ ] Metadata is fetchable in machine-readable form without downloading the data.
- [ ] Bulk and programmatic data download is documented (API, bucket, or CLI), not just a browser button.
- [ ] A top-level `llms.txt` points at the catalog and search, not every dataset.

## Research lab / project site

- [ ] JSON-LD marks up the lab, its people, software, datasets, and papers.
- [ ] Persistent identifiers are exposed (ORCID, ROR, DOI).
- [ ] A canonical index links each output to its own home.
- [ ] `llms.txt` maps people, software, datasets, and key papers.

## Standard / specification

- [ ] The specification is published as a machine-readable schema.
- [ ] A validator exists and is callable (command-line, library, or API/MCP).
- [ ] The specification is versioned and citable.
- [ ] Conformant examples (and a few labeled non-conformant ones) are provided.
