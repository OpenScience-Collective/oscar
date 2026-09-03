# Archetype: Research lab / project website

> Maturity: draft. Structure is stable; examples are being expanded.
> Techniques are ordered by tier; see [`../evidence.md`](../evidence.md) for the citations.

You have this archetype if a lab or project presents its people, software, datasets, and papers.
Examples in our ecosystem: a principal investigator's lab site,
a center like the Swartz Center for Computational Neuroscience, or a project site like annot-garden.
The job is mostly **discovery** and entity clarity:
help an agent understand who you are, what you produce, and where those outputs live.

## Why it matters

A lab site is a hub.
Its real value to an agent is the map it provides:
this person, that tool, this dataset, that paper, and the links between them.
If those entities are only prose and PDFs, the agent cannot follow the graph.

This is a discovery-heavy archetype, so unlike the library and standard guides,
the tiers below really are a priority order.

## Core: do these first

1. **Mark up your entities with JSON-LD, server-rendered.**
   `Organization` (or `ResearchOrganization`) for the lab,
   `Person` for members, `SoftwareSourceCode` or `SoftwareApplication` for tools,
   `Dataset` for data, and `ScholarlyArticle` for papers.
   Use `sameAs` to link each to its authoritative record.
   Render it in the Hypertext Markup Language (HTML) your server returns:
   most AI crawlers execute no JavaScript, so a card built by a script does not exist for them.

2. **Expose persistent identifiers.**
   ORCID for people, ROR for the organization,
   Digital Object Identifiers (DOIs) for papers and datasets, repository URLs for software.
   These let an agent disambiguate "which Smith" and "which EEGLAB" with certainty.
   Where you mint DOIs yourself, complete the DataCite record:
   content negotiation from the DOI is automatic and unauthenticated once it is complete.

3. **Set an AI-aware `robots.txt`** naming the AI user-agents you allow,
   with a `Sitemap:` line.
   Every token is documented by its own vendor.
   See [`templates/robots.txt`](../../templates/robots.txt).

4. **Say how to cite the lab's work and what license covers the site content and each output,**
   machine-readably.
   Attribution is the currency of open science; make it legible to machines.

## Recommended: real, but narrower

5. **Signpost authorship and citations:** `rel="author"` to each member's ORCID,
   and `rel="cite-as"` to a DOI on every publication listing.
   Adoption across scholarly repositories is real and verifiable,
   and every documented consumer is repository software rather than an AI agent.

## Optional: no-regret, no evidence

6. **Publish an `llms.txt`** curating people, software, datasets, key papers, and contact.
   Cheap and honest; the best available measurement says these files are not being fetched.

## Unassessed, and still good practice

OSCAR's 2026-09 evidence review did not examine these,
so they are neither promoted nor demoted.

7. **Keep a canonical index of your outputs.**
   One page that lists the lab's software, datasets, and standards, each linked to its own home,
   where that home is then made agent-ready under its own archetype.

8. **Use the Bioschemas `Person` and `TrainingMaterial` profiles,** and mark up the lab's outputs
   as a small `DataCatalog` of datasets, tools, and software rather than plain prose links.

## Minimum viable setup

Server-rendered JSON-LD for the lab and its outputs, with persistent identifiers on each.

## Pitfalls

- Do not publish papers and software as unlinked prose or PDFs only; give structured, linked records.
- Do not omit persistent identifiers; without them, agents cannot resolve who or what you mean.
- Do not list a tool without linking to its repository or docs.
- Do not client-render the entity markup; a plain request then returns an empty shell.
