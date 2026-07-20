# Archetype: Data archive

> Maturity: draft. Structure is stable; examples are being expanded.

You have this archetype if you host datasets others use.
Examples in our ecosystem: NEMAR, and the broader OpenNeuro model it builds on.
The job here is both **discovery** (agents find the right dataset)
and **usage** (agents fetch and understand it correctly).

## Why it matters

A dataset is only useful to an agent if the agent can find it and trust its structure.
Rich, standard, machine-readable metadata per dataset is what makes an archive navigable at scale.

## The three questions an agent asks

An agent approaching your archive needs three things answered fast:

1. **How do I search or query?** A documented query interface or API with examples,
   so an agent finds the right dataset without scraping listing pages.
2. **How do I get the metadata?** A direct, machine-readable way to fetch a dataset's metadata
   (JSON, not only an HTML page), so an agent can judge fit before downloading gigabytes.
3. **How do I download the data efficiently?** The exact endpoint or command for bulk and
   programmatic access (an API, an object-store bucket, a command-line tool), not just a browser button.

Answer these three well and you save every agent, and every human, an enormous amount of time.
The techniques below are how you answer them.

## Do these, in order of value

1. **Emit schema.org `Dataset` JSON-LD** on every dataset page:
   name, description, identifier (a DOI where possible), license, creators, distribution URLs, variables.
   This is what dataset search engines index.
   Google Dataset Search has indexed this markup since 2018, so it is the most mature agent channel of all.
   For a whole packaged research object, RO-Crate (`ro-crate-metadata.json`) extends the same JSON-LD,
   a natural fit for Brain Imaging Data Structure (BIDS) datasets.

2. **Publish a machine-readable catalog** of all datasets:
   a DCAT catalog or a simple JSON index, plus a sitemap that lists every dataset page with `<lastmod>`.

3. **Give each dataset a concise, agent-facing card.**
   Modality, sample size, format (for example the Brain Imaging Data Structure, BIDS),
   and how to download, in plain text an agent can quote.

4. **Document the query and download API.**
   How to search, how to filter, how to fetch, with examples.
   Pair it with the web-app-api archetype if you have a real API.

5. **Add a top-level `/llms.txt`** that points at the catalog, the search, and the docs,
   not at ten thousand individual datasets.

6. **Consider a discipline-standard metadata sidecar** where one exists
   (for machine-learning consumers, the Croissant metadata format is emerging),
   so agents built for that ecosystem understand your data natively.

## Minimum viable setup

schema.org `Dataset` on each dataset page, plus a machine-readable catalog of all of them.

## Pitfalls

- Do not rely on a human-readable table as the only catalog; provide the structured version too.
- Do not omit the license; an agent that cannot confirm terms should not, and may not, use the data.
- Do not let free-text dataset descriptions carry instructions into what you expose to agents.
- For licensed or restricted data, do not use a blanket crawler policy; in `robots.txt`,
  consider allowing search and user fetchers while disallowing training crawlers.
