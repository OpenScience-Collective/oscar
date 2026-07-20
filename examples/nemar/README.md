# Worked example: NEMAR

NEMAR (the Neuroelectromagnetic Data Archive and Tools Resource, nemar.org)
is the sharpest case for OSCAR, because the thing an agent wants is not on the page it lands on.

## Why NEMAR is the perfect example

NEMAR is three archetypes at once:

- a **website** (nemar.org), a browser application for searching the archive,
- a **data archive** (the datasets themselves), and
- a **command-line tool** (`nemar-cli`) for programmatic access.

And its architecture makes the gap unmissable.
The real layout, from the NEMAR sources:

- `nemar.org` is a client-rendered single-page application (Cloudflare), with metadata in a D1 database.
- The **data is not on nemar.org.** It lives at `data.nemar.org/<id>/latest/`, backed by Amazon S3.
- Access is via `nemar-cli` (which uses git-annex and Amazon S3 under the hood), or file fetches from `data.nemar.org`.
- Digital Object Identifiers (DOIs) are minted through Zenodo; datasets are Brain Imaging Data Structure (BIDS) formatted, many with Hierarchical Event Descriptors (HED).

So an agent that lands on a dataset page and reads the rendered Hypertext Markup Language (HTML)
sees a description and nothing actionable:
no data, no download path, and no machine-readable license.
The 270 GB it is looking for sits on a different host, reachable only by a tool the page never names.
This is exactly the case OSCAR exists for: **the instructions an agent needs live beyond the user-facing HTML.**

## Before: what an agent hits today

- The dataset page is a single-page app with no server-rendered structured data,
  so a plain Hypertext Transfer Protocol (HTTP) request returns an app shell, not the dataset facts.
- There is no `llms.txt` and no site-level `AGENTS.md`.
- The download path (`data.nemar.org`, `nemar-cli`, DataLad) is not stated in any machine-readable form.
- Licenses are often restrictive (for example CC-BY-NC-SA, non-commercial),
  but that term is not exposed as a machine-checkable field on the page.

## After: what OSCAR adds

All of it transparent, public, and auditable. Files in [`after/`](after/):

- [`llms.txt`](after/llms.txt) for nemar.org, naming the data host and the CLI up front.
- [`AGENTS.md`](after/AGENTS.md), a site-level brief whose first message is "the data is not on this site."
- [`dataset-nm000103.jsonld`](after/dataset-nm000103.jsonld), a **server-rendered** schema.org `Dataset`
  for a real dataset, with the DOI, the license, and a `distribution` that points at `data.nemar.org`.
- [`dataset-nm000103.md`](after/dataset-nm000103.md), the crux: a per-dataset card, human and agent readable,
  that answers the three questions an archive must answer,
  what it is, its terms, and exactly how to download it, with real `nemar-cli` commands.
- [`robots.txt`](after/robots.txt) that welcomes AI agents explicitly.

## How it maps to the doctrine

- **The three questions an agent asks** ([data archive guide](../../docs/archetypes/data-archive.md)):
  query (the dataexplorer and the NEMAR interface), metadata (the API and `dataset_description.json`),
  and download (`nemar-cli` or `data.nemar.org`). The card answers all three.
- **Server-render your structured data** ([website guide](../../docs/archetypes/website.md)):
  the schema.org `Dataset` must be in the HTML a plain request returns, not built by a script,
  or the single-page app hides it from agents.
- **Declare your license, and respect others'** ([principles](../../docs/principles.md), rule 8):
  nm000103 is CC-BY-NC-SA 4.0, non-commercial. That term, and the required citations,
  belong in the machine-readable card so an agent can honor them before it touches the data.
- **Command-line tool** ([CLI guide](../../docs/archetypes/cli.md)): `nemar-cli` is how the data is really fetched;
  its commands belong in the card and the `AGENTS.md`.

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

This example doubles as concrete input for the current nemar.org redesign (`nemarOrg/website`),
which already fronts `data.nemar.org` with `nemar-cli` and Cloudflare.
The files here are illustrative of the pattern;
dataset facts are taken from the real nm000103 record, and commands from the real `nemar-cli`.
