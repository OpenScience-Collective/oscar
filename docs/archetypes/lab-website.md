# Archetype: Research lab / project website

> Maturity: draft. Structure is stable; examples are being expanded.

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

## Do these, in order of value

1. **Mark up your entities with JSON-LD.**
   `Organization` (or `ResearchOrganization`) for the lab,
   `Person` for members, `SoftwareSourceCode` or `SoftwareApplication` for tools,
   `Dataset` for data, and `ScholarlyArticle` for papers.
   Use `sameAs` to link each to its authoritative record.

2. **Expose persistent identifiers.**
   ORCID for people, ROR for the organization, DOIs for papers and datasets, repository URLs for software.
   These let an agent disambiguate "which Smith" and "which EEGLAB" with certainty.

3. **Keep a canonical index of your outputs.**
   One page that lists the lab's software, datasets, and standards, each linked to its own home,
   where that home is then made agent-ready under its own archetype.

4. **Publish an `llms.txt`** curating people, software, datasets, key papers, and contact.

5. **Set an AI-aware `robots.txt`.**

## License and citation

Say how to cite the lab's work and what license covers the site content and each output.
Attribution is the currency of open science; make it legible to machines.

## Minimum viable setup

JSON-LD for the lab and its outputs, plus an `llms.txt` that maps them.

## Pitfalls

- Do not publish papers and software as unlinked prose or PDFs only; give structured, linked records.
- Do not omit persistent identifiers; without them, agents cannot resolve who or what you mean.
- Do not list a tool without linking to its repository or docs.
