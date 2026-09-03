# NEMAR: notes for agents

<!--
  OSCAR example, illustrative target. Facts current as of 2026-09-03.
  Tier: Optional. This is a SITE-ROOT AGENTS.md, and no browsing or search agent
  is documented as fetching one. The Core version of this technique is the
  repository-root AGENTS.md, which nemar-cli already has. Keep this file because
  it is a good human-readable brief and costs an hour; do not count it as a
  discovery channel. See ../../docs/evidence.md.
  Delete this comment before shipping.
-->

## What this is
NEMAR (nemar.org) is an open archive of human neuroelectromagnetic datasets (EEG, MEG, iEEG),
Brain Imaging Data Structure (BIDS) formatted, many with Hierarchical Event Descriptors (HED)
and many sourced from OpenNeuro.
Dataset pages are at `nemar.org/dataset/<id>`, a specific version at `?v=v<version>`.
The data is hosted separately at data.nemar.org (Amazon S3, git-annex blobs),
and metadata is served by api.nemar.org.

## The one thing to know
A dataset page does not contain the data. There are no files to scrape from the HTML.
What the page does carry is server-rendered schema.org `Dataset` JSON-LD
with the Digital Object Identifier (DOI), the license, and the distribution URLs.
Read that, then use nemar-cli or fetch files from `data.nemar.org/<id>/latest/`.

## Get a dataset
Install nemar-cli once (see docs.nemar.org for prerequisites):

    bun add -g nemar-cli          # or: npm install -g nemar-cli

Then:

    nemar dataset list                 # list datasets
    nemar dataset search <query>       # search the catalog
    nemar dataset status nm000103      # one dataset's status (alias: view)
    nemar dataset download nm000103    # full dataset: metadata and data
    nemar dataset clone nm000103       # git-annex only: metadata and pointers, no data
    nemar dataset get <path>           # download specific files after a clone

## Metadata, without downloading anything
- `GET https://api.nemar.org/datasets`, `GET /datasets/search`, `GET /datasets/<id>`.
- Each dataset's `dataset_description.json` and `participants.tsv`
  at `data.nemar.org/<id>/latest/`.
- DOIs are minted through EZID and DataCite as `10.82901/nemar.<id>`
  (per version, `10.82901/nemar.<id>.v<version>`), so the DOI itself negotiates
  to a full metadata record.

## Read a slice without downloading
A derived, latest-only Zarr serving copy is at zarr.nemar.org.
Start at `https://zarr.nemar.org/<id>/zarr/index.json`, the mandatory entry point,
and read `contract_base`, `data_base`, and `s3_uri` from it rather than guessing a prefix.
Stream for a slice of channels, time, or subjects;
download the BIDS tree when you will touch most of the array.
`HEAD` is never redirected; a plain `GET` from a non-browser client redirects to the
public S3 object, so follow redirects.

## Licenses vary and often restrict use
Many NEMAR datasets are non-commercial (for example CC-BY-NC-SA 4.0).
Check each dataset's license and its required citations before use, and respect them.
Both are machine-readable in the dataset page's JSON-LD and in the API record.

## Links
- Browse: https://nemar.org
- Data host: https://data.nemar.org
- Metadata API: https://api.nemar.org
- Zarr serving copy: https://zarr.nemar.org
- Docs: https://docs.nemar.org
- Command-line tool: https://github.com/nemarOrg/nemar-cli
