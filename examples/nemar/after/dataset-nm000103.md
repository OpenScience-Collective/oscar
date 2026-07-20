# nm000103 — Healthy Brain Network EEG (Not for Commercial Use)

<!--
  Per-dataset card for a NEMAR dataset page, human and agent readable.
  The dataset PAGE is a single-page app; the DATA lives at data.nemar.org.
  This file states, in plain text: what the dataset is, its terms, and exactly how to get it.
  Serve it as a markdown mirror of the dataset page (for example .../nm000103.md).
-->

## What it is
- EEG and behavioral data from the Child Mind Institute Healthy Brain Network (HBN),
  curated into the Brain Imaging Data Structure (BIDS) with Hierarchical Event Descriptors (HED).
- 447 participants, ages 5 to 21. 270 GB across 17,615 files. BIDS 1.9.0.
- Concept Digital Object Identifier (DOI): 10.5281/zenodo.17306881 (always resolves to the latest version).

## License and terms, read before use
- **CC-BY-NC-SA 4.0. Non-commercial.** Participants did not consent to any commercial use.
- Required citations: https://doi.org/10.1038/sdata.2017.181 and https://doi.org/10.1038/sdata.2017.40
- An agent must not use this data commercially, and must attribute as above.

## Where the data is
Not on the web page. The BIDS tree is hosted at:

    https://data.nemar.org/nm000103/latest/

## How to download
Use nemar-cli. Install it once (see docs.nemar.org for prerequisites):

    bun install -g nemar-cli

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
- Read `participants.tsv` and `dataset_description.json` from `data.nemar.org/nm000103/latest/`.
- Tasks include RestingState, contrastChangeDetection, seqLearning, surroundSupp, and symbolSearch.
- Modality: EEG. Programmatic metadata is available from the NEMAR interface at api.nemar.org.
