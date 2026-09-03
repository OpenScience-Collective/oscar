# nm000103: Healthy Brain Network EEG (Not for Commercial Use)

<!--
  OSCAR example, illustrative target. Per-dataset card for a NEMAR dataset page,
  human and agent readable. Facts current as of 2026-09-03.
  The dataset PAGE is at nemar.org/dataset/nm000103; the DATA is at data.nemar.org.
  This file states, in plain text: what the dataset is, its terms, exactly how to get it,
  and how to judge fit without downloading anything.
  Generate it per dataset from the same record that feeds the page, so the two cannot drift.
  Serve it as a markdown mirror of the dataset page (for example .../nm000103.md).
-->

## What it is
- EEG and behavioral data from the Child Mind Institute Healthy Brain Network (HBN),
  curated into the Brain Imaging Data Structure (BIDS) with Hierarchical Event Descriptors (HED).
- 447 participants, ages 5 to 21. 270 GB across 17,615 files. BIDS 1.9.0.
- Concept Digital Object Identifier (DOI): 10.82901/nemar.nm000103,
  minted through EZID and DataCite, always resolving to the latest version.
  Per-version DOIs take the form `10.82901/nemar.nm000103.v<version>`.
- Dataset page: https://nemar.org/dataset/nm000103
  (a specific version: `?v=v1.0.0`).

## License and terms, read before use
- **CC-BY-NC-SA 4.0. Non-commercial.** Participants did not consent to any commercial use.
- Required citations: https://doi.org/10.1038/sdata.2017.181 and https://doi.org/10.1038/sdata.2017.40
- An agent must not use this data commercially, and must attribute as above.

## Where the data is
Not on the web page. The BIDS tree is hosted at:

    https://data.nemar.org/nm000103/latest/

Large files there are git-annex content-addressed blobs backed by Amazon S3.

## How to download
Install nemar-cli once (see docs.nemar.org for prerequisites):

    bun add -g nemar-cli          # or: npm install -g nemar-cli

Then, for the full dataset:

    nemar dataset download nm000103

`clone` alone does not fetch data; it clones the git-annex (metadata and file pointers).
To pull only part of a 270 GB dataset, clone first, then `get` the files you need:

    nemar dataset clone nm000103          # git-annex only, no file content
    nemar dataset get sub-<label>/        # download the actual files you need

For a few small files, a direct fetch also works:

    wget https://data.nemar.org/nm000103/latest/participants.tsv
    wget https://data.nemar.org/nm000103/latest/dataset_description.json

## Assess fit without downloading
- `nemar dataset list`, `nemar dataset search <query>`, and
  `nemar dataset status nm000103` (alias `view`) answer most questions from the terminal.
- The metadata API needs no download: `GET https://api.nemar.org/datasets/nm000103`,
  with `GET /datasets` and `GET /datasets/search` for the catalog.
- Read `participants.tsv` and `dataset_description.json` directly from
  `data.nemar.org/nm000103/latest/`.
- Tasks include RestingState, contrastChangeDetection, seqLearning, surroundSupp, and symbolSearch.
- Modality: EEG.

## Read a slice without downloading: the Zarr serving copy
NEMAR publishes a derived, latest-only Zarr copy for reading parts of a recording remotely.
It is a serving copy, not the source of truth; the BIDS tree above is authoritative.

1. Start at the index, which is the mandatory entry point.
   Anonymous listing of the bucket is denied, so this document is how a client
   learns what is served:

       https://zarr.nemar.org/nm000103/zarr/index.json

2. Read `contract_base`, `data_base`, and `s3_uri` from that index.
   `contract_base` is the only URL to hardcode; `data_base` and `s3_uri` say where the
   bytes are today and are per-dataset, so a dataset can be moved without breaking a client.
3. Stream by default, for example
   `xarray.open_zarr(fsspec.get_mapper(data_base + store), consolidated=True)`.
4. Stream for a slice of channels, time, or subjects.
   Download the BIDS files instead when you will touch most of the array;
   there is no size cutoff, only that distinction.
5. Use an S3 filesystem client for the `s3://` URI and plain HTTPS for `zarr.nemar.org`.
6. `HEAD` is never redirected, so use it for existence and metadata checks.
   A plain `GET` from a non-browser client is redirected to the public S3 object;
   follow redirects.
7. Only `index.json` is always proxied. The sibling `manifest.json` (per-store source paths)
   and `events.parquet` (one row per event and channel group) redirect like store objects.
8. Read the store's `nemar` root attribute (dataset id, DOI, license, citation, source commit)
   before reusing anything; a store that travels carries its terms with it.
9. Filter on `has_zarr_verified` rather than `has_zarr` for an automated pipeline.
   `has_zarr` means converted; `has_zarr_verified` means a fidelity sweep also checked it.
