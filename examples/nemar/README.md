# Worked example: NEMAR

NEMAR (the Neuroelectromagnetic Data Archive and Tools Resource, nemar.org)
is the sharpest case for OSCAR, because the thing an agent wants is not on the page it lands on.

> Facts current as of 2026-09-03.
> Techniques are labelled with their tier from [`docs/evidence.md`](../../docs/evidence.md).
> The `after/` files are **illustrative targets**, not a description of what NEMAR serves today;
> the table below says exactly which parts are shipped and which are not.

## Why NEMAR is the perfect example

NEMAR is three archetypes at once:

- a **website** (nemar.org), the browser for searching the archive,
- a **data archive** (the datasets themselves), and
- a **command-line tool** (`nemar-cli`) for programmatic access.

And its architecture makes the gap unmissable.
The real layout:

- `nemar.org/dataset/<id>` is the dataset page, with `?v=v<version>` for a specific version.
  It is the canonical Digital Object Identifier (DOI) landing target.
  The legacy `dataexplorer` site is gone and its URLs redirect here.
- The **data is not on nemar.org.** It lives at `data.nemar.org/<id>/latest/`,
  a browsable Brain Imaging Data Structure (BIDS) tree whose large files are
  git-annex content-addressed blobs on Amazon S3.
- The metadata API is `api.nemar.org`: `GET /datasets`, `GET /datasets/search`,
  and `GET /datasets/<id>`.
- A derived, latest-only **Zarr serving copy** lives at `zarr.nemar.org`,
  for reading a slice of a recording without downloading the dataset.
- Access is via `nemar-cli` (git-annex and S3 underneath), or file fetches from `data.nemar.org`.
- DOIs are minted through EZID and DataCite as `10.82901/nemar.<id>`,
  with per-version DOIs as `10.82901/nemar.<id>.v<version>`.
- Datasets are BIDS formatted, many with Hierarchical Event Descriptors (HED),
  and many are sourced from OpenNeuro.

So an agent that lands on a dataset page and reads the prose
sees a description and, without the structured data, nothing actionable:
no data, no download path, and no machine-readable license.
The 270 GB it is looking for sits on a different host, reachable only by a tool the page never names.
This is exactly the case OSCAR exists for:
**the instructions an agent needs must live in the payload the crawler fetches.**

## What NEMAR ships today, and what is still a target

| Artifact | Tier | Status |
|---|---|---|
| Server-rendered schema.org `Dataset` JSON-LD on every dataset page | Core | **Shipped.** This is the Core item, and NEMAR has it. |
| Machine-readable metadata API without downloading data (`api.nemar.org`) | Core | **Shipped.** |
| Documented programmatic and bulk download (`nemar-cli`, `data.nemar.org`) | Core | **Shipped**, in the CLI and the docs site. |
| DOI record through EZID and DataCite | Core | **Shipped.** Content negotiation follows from a complete record. |
| Cloud-optimized serving copy with a mandatory index document (`zarr.nemar.org`) | Recommended | **Shipped.** The stream-versus-download guidance on the card is the target. |
| `robots.txt` naming AI user-agent tokens, with a `Sitemap:` line | Core | **Target.** Today's `robots.txt` is a bare allow-all with no named tokens and no sitemap line. |
| `sitemap.xml` with event-driven `<lastmod>` | Core | **Target.** No sitemap yet. |
| `sameAs` to the upstream record, never `rel=canonical` | Core | **Target**, as an explicit policy. |
| Signposting `Link` headers (`cite-as`, `license`, `describedby`) on dataset pages | Recommended | **Target.** None today. Cheap, and it plugs NEMAR into real repository interoperability tooling. |
| Per-dataset agent-facing card | Unassessed | **Target.** [`dataset-nm000103.md`](after/dataset-nm000103.md) is the shape. The card format was never measured; the license, citations, and access path on it are Core. |
| `/llms.txt` | Optional | **Target.** None today. |
| Markdown mirrors of dataset pages | Optional | **Target.** None today. |
| Site-root `AGENTS.md` | Optional | **Target**, and deliberately last. See the note below. |

The repository-root `AGENTS.md` in `nemar-cli` is a separate, Core item, and it exists.
That is the file with the evidence behind it.

## Before: what an agent hits today

- `robots.txt` is a bare allow-all.
  It permits everything, which is the right policy, and it names nothing,
  so it states no policy a vendor's tooling can read.
- There is no `sitemap.xml`, so nothing tells a crawler which dataset pages changed and when.
- There is no `llms.txt` and no site-level `AGENTS.md`.
- The download path (`data.nemar.org`, `nemar-cli`) is documented for humans on docs.nemar.org,
  and is not stated on the dataset page in a form an agent reads first.
- Licenses are often restrictive (for example CC-BY-NC-SA, non-commercial).
  The JSON-LD carries the license; the required citations and the practical consequence
  ("do not use this commercially") deserve to be as prominent.

The good news is that the hardest Core item is already done:
the dataset page server-renders its schema.org `Dataset`,
so a crawler that executes no JavaScript still gets the identifier, the license,
and the distribution URL.

## After: what OSCAR adds

All of it transparent, public, and auditable. Files in [`after/`](after/):

- [`robots.txt`](after/robots.txt) (Core) naming every AI user-agent token and the sitemap.
- [`dataset-nm000103.jsonld`](after/dataset-nm000103.jsonld) (Core), a **server-rendered**
  schema.org `Dataset` for a real dataset, with the EZID DOI, the license,
  and `distribution` entries for both the BIDS tree and the Zarr serving copy.
  NEMAR already emits markup of this kind; this file is the reference shape.
- [`dataset-nm000103.md`](after/dataset-nm000103.md) (Unassessed as a format, though every
  fact on it is Core), the crux:
  a per-dataset card, human and agent readable,
  that answers what the dataset is, its terms, where the data is, how to download it,
  and how to assess fit without downloading anything.
- [`llms.txt`](after/llms.txt) (Optional) for nemar.org, naming the data host and the CLI up front.
- [`AGENTS.md`](after/AGENTS.md) (Optional at a site root) whose first message is
  "the data is not on this site."

The order matters and it changed in 2026-09.
`llms.txt` and a site-root `AGENTS.md` used to lead this list.
They are now last, because 97 percent of published `llms.txt` files received zero requests
in a 137,210-domain study, and no browsing agent is documented as fetching a site-root
`AGENTS.md` at all.
They are still worth shipping: they cost an hour, they are honest,
and a curated index of your own archive is a good artifact for a person too.
They are not the reason an agent will find a NEMAR dataset.

## How it maps to the doctrine

- **The three questions an agent asks** ([data archive guide](../../docs/archetypes/data-archive.md)):
  query (`api.nemar.org` and the browser at `nemar.org/dataset/<id>`),
  metadata (the API, `dataset_description.json`, and the Zarr `index.json`),
  and download (`nemar-cli` or `data.nemar.org`). The card answers all three.
- **Server-render your structured data** ([website guide](../../docs/archetypes/website.md)):
  the schema.org `Dataset` must be in the Hypertext Markup Language (HTML)
  a plain request returns.
  NEMAR does this; it is the single most load-bearing thing it does.
- **`sameAs`, never `canonical`** ([data archive guide](../../docs/archetypes/data-archive.md)):
  a NEMAR page for a dataset that also exists upstream adds a NEMAR DOI,
  BIDS validation status, Zarr access, and quality-assurance outputs.
  It is not a duplicate, and a canonical pointing at the upstream archive
  would delete it from the index it belongs in.
- **Declare your license, and respect others'** ([principles](../../docs/principles.md), rule 8):
  nm000103 is CC-BY-NC-SA 4.0, non-commercial. That term, and the required citations,
  belong in the machine-readable card so an agent can honor them before it touches the data.
- **Command-line tool** ([CLI guide](../../docs/archetypes/cli.md)): `nemar-cli` is how the data is really fetched;
  its commands belong in the card and in the repository-root `AGENTS.md`.

## Automating it

Generate the card, do not hand-write it. The [`after/ci/`](after/ci/) folder has a working sample:

- [`generate-jsonld.ts`](after/ci/generate-jsonld.ts): turns a NEMAR metadata record into a
  schema.org `Dataset` JSON-LD plus a compact `summary.json`. Run it with
  `bun run generate-jsonld.ts nm000103 --metadata <path> --out <dir>`.
- [`new-dataset-jsonld.yml`](after/ci/new-dataset-jsonld.yml): a GitHub Actions workflow that runs
  every four hours (the cadence NEMAR already uses to check for new datasets), detects new or
  changed datasets, and regenerates the JSON-LD and summary for each.

Tracking issue for the production implementation: nemarOrg/website#156.

## Note

The files here are illustrative of the pattern.
Dataset facts are taken from the real nm000103 record and commands from the real `nemar-cli`,
but nothing in `after/` should be read as a claim about what nemar.org currently serves.
The shipped-versus-target table above is the authority on that.
