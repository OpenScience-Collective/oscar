# Archetype: Data archive

> Maturity: draft. Structure is stable; examples are being expanded.
> Techniques are ordered by tier; see [`../evidence.md`](../evidence.md) for the citations.

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
   (JSON, not only a Hypertext Markup Language (HTML) page),
   so an agent can judge fit before downloading gigabytes.
3. **How do I download the data efficiently?** The exact endpoint or command for bulk and
   programmatic access (an API, an object-store bucket, a command-line tool), not just a browser button.

Answer these three well and you save every agent, and every human, an enormous amount of time.
The techniques below are how you answer them.

## Core: do these first

These have a documented consumer today.

1. **Emit schema.org `Dataset` JSON-LD on every dataset page, server-rendered.**
   Name, description, identifier (a Digital Object Identifier, DOI, where possible),
   license, creators, distribution URLs, variables.
   Google Dataset Search has indexed this markup since 2018,
   which makes it the technique with both the longest track record and the widest set of consumers.
   Server-rendering is not a style preference:
   most AI crawlers execute no JavaScript, so a card built by a script does not exist for them.

2. **Put everything an agent needs in the payload a plain request returns.**
   The access path, the license, the citation, and the download command
   must be in the HTML the crawler actually fetches,
   and they must say the same thing the page tells a human.
   This is the parity principle with teeth:
   an archive whose real instructions live only in a client-rendered panel
   has published them to nobody.

3. **Never point `rel=canonical` from a mirrored dataset page at the upstream archive.
   Use `sameAs`.**
   If you re-host or re-curate someone else's dataset, your page is not a duplicate:
   it adds your identifier, your validation status, your access paths, your derived products.
   Google's own duplicate-content guidance leaves the indexing decision with the republishing site,
   and a canonical pointing away deletes your page from the index it belongs in.
   Link the upstream record with `sameAs` and keep the canonical on your own URL.

4. **Complete the DOI record.**
   Every DOI-minted record should carry the DataCite mandatory fields
   (identifier, creator, title, publisher, publication year, resource type),
   and `resourceTypeGeneral` is required from schema 4.5 onward.
   This is the cheapest item on the page, because there is nothing to build:
   DataCite's resolver already negotiates from the DOI to schema.org JSON-LD, BibTeX,
   Citeproc JSON, RIS, Codemeta, and JATS, with no authentication,
   the moment your deposited metadata is complete.
   It is also what backs `cite-as`.

5. **Make the license and the required citations machine-readable per dataset,**
   not prose buried in a description field.
   An agent that cannot confirm terms should not, and a well-behaved one will not, use the data.
   Restrictive terms in particular (non-commercial, registered access) belong in a field,
   because that is the only form an agent can act on before it downloads anything.

6. **Keep `sitemap.xml` honest.**
   List every dataset page with a `<lastmod>` driven by a real event,
   a new version, a metadata change, a DOI minting,
   not by your build time.
   Bing states that freshness signals directly influence how quickly updates reach
   AI generated answers, and Google uses `lastmod` when it is verifiably accurate.
   A `lastmod` that changes on every rebuild is the case both vendors describe as unreliable.

7. **Document bulk and programmatic download** in the same breath as the dataset facts:
   the exact endpoint, bucket, or command-line invocation, with a worked example.
   A browser button is not an access path.

## Recommended: real, but narrower

8. **Register the archive** in re3data, and from there in FAIRsharing and OpenAIRE
   (re3data registration is a prerequisite for both), and create a Wikidata item.
   These are real scholarly infrastructure with real review processes.
   No conversational AI product is documented as retrieving from any of them;
   join them for their own value, not as a proven agent channel.

9. **Signpost each dataset:** `cite-as` to the DOI, `license`, `describedby` to the metadata record,
   and `item` or `collection` for the dataset-to-file relations.
   Adoption is genuine and verifiable, and every documented consumer is repository software.

## Stream or download a cloud-optimized copy

If you publish a derived, cloud-optimized serving copy of your data,
Zarr, Cloud-Optimized GeoTIFF, Parquet, or similar,
then say plainly how to use it.
Comparable archives converge on the same rule
(DANDI, Pangeo, NASA Earthdata, Microsoft Planetary Computer),
and OpenNeuro publishes no such guidance at all, so this is still a differentiator.

Nine lines, in the dataset card and in your documentation:

1. Start at the index document under the stable contract base.
   Never hardcode a bucket path.
2. Read the per-dataset data base and object-store URI **from the index**, not from a guessed prefix.
   The contract base is the only URL a client may hardcode; where the bytes live may change.
3. Default to streaming, with the ordinary one-line open call for the format.
4. Stream for a slice of channels, time, or subjects;
   download only when you will touch most of the array.
   That is the framing every archive uses, and none of them state a size cutoff.
5. Name the filesystem layer for each scheme:
   the object-store client for an `s3://` or equivalent URI, plain Hypertext Transfer Protocol
   (HTTP) for the served hostname.
6. State what `HEAD` does and what a plain `GET` does.
   If a `GET` without a browser origin redirects to the object store, say so and say to follow it,
   because some clients do not follow redirects on `HEAD`.
7. Say which documents are always proxied and which redirect,
   so a client knows what to expect from each.
8. Tell the client to read the store's own attribution attributes
   (identifier, license, citation, source commit) before reuse.
   A store that travels should carry its terms with it.
9. Name the flag to filter on if you publish a verification status,
   and say what the weaker flag means.

The point is not the specific technology.
It is that an archive which publishes a cloud-optimized copy and no usage guidance
has published a format, not an access path.

## Optional: no-regret, no evidence

10. **A top-level `/llms.txt`** that points at the catalog, the search, and the docs,
    not at ten thousand individual datasets.
    Cheap and honest, and the best available measurement says these files are not being fetched:
    97 percent of published `llms.txt` files received zero requests
    in a study of 137,210 domains.
    Ship it, and do not count it as a findability win.

11. **A Croissant export, for the tabular sidecars only,**
    and only when a concrete discovery gain justifies it, such as a Hugging Face or Kaggle listing.
    Croissant is a real, adopted metadata format for machine-learning consumers,
    but it is an optional interoperability export, not a peer of your domain standard.
    The Brain Imaging Data Structure (BIDS) and Hierarchical Event Descriptors (HED)
    are peer standards to Croissant
    in scope and standing; schema.org `Dataset` plus the domain metadata is the card.
    Croissant's `RecordSet` model targets row-and-column data,
    and there is no published precedent for applying it to raw scientific time-series.

## Unassessed, and still good practice

OSCAR's 2026-09 evidence review did not examine these,
so they are neither promoted nor demoted.
They keep their place in the workflow; what they do not have is a measurement behind them.

12. **Refine with Bioschemas or RO-Crate** where they fit.
    The Bioschemas `Dataset` profile sets explicit minimum fields beyond plain schema.org,
    and RO-Crate (`ro-crate-metadata.json`) extends the same JSON-LD for a whole packaged
    research object, a natural fit for a BIDS dataset.
    Both ride the Core card's channel, which is an argument for them, and not a measurement.

13. **Publish a machine-readable catalog** of all datasets:
    a Data Catalog Vocabulary (DCAT) catalog or a simple JSON index.
    This is the substrate the rest of the archive's automation stands on,
    and its uptake by agents specifically was not assessed.

14. **Give each dataset a concise, agent-facing card.**
    Modality, sample size, format, terms, and how to download,
    in plain text an agent can quote and a human can check.
    Every fact on the card is a Core item; the card format itself was not measured,
    which is why it sits here rather than a tier above.
    Generate it per dataset from the same source as the page, so the two cannot drift.

## Minimum viable setup

Server-rendered schema.org `Dataset` on each dataset page,
with a complete DOI record and a documented download path.

## Pitfalls

- Do not client-render the card. An agent doing a plain request then sees an empty shell,
  and some major neuroscience archives currently regress exactly this way.
- Do not canonicalize your dataset page to the upstream archive; that is the `sameAs` case.
- Do not rely on a human-readable table as the only catalog; provide the structured version too.
- Do not omit the license; an agent that cannot confirm terms should not, and may not, use the data.
- Do not let free-text dataset descriptions carry instructions into what you expose to agents.
- Do not tie `<lastmod>` to your build; a timestamp that is always fresh is treated as never accurate.
- For licensed or restricted data, do not use a blanket crawler policy; in `robots.txt`,
  consider allowing search and user fetchers while disallowing training crawlers.
