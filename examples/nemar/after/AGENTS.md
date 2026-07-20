# NEMAR: notes for agents

## What this is
NEMAR (nemar.org) is an open archive of human neuroelectromagnetic datasets (EEG, MEG, iEEG),
Brain Imaging Data Structure (BIDS) formatted, sourced from OpenNeuro.
The website is a single-page application; the data is hosted separately at data.nemar.org
(Amazon S3), and metadata is served by api.nemar.org.

## The one thing to know
A dataset page does not contain the data. There are no files to scrape from the HTML.
To get a dataset, use nemar-cli, or fetch files from `data.nemar.org/<id>/latest/`.

## Get a dataset
Install nemar-cli once (see docs.nemar.org for prerequisites):

    bun install -g nemar-cli

Then:

    nemar dataset list                 # list datasets
    nemar dataset download nm000103    # full dataset: metadata and data
    nemar dataset clone nm000103       # git-annex only: metadata and pointers, no data
    nemar dataset get <files>          # download specific files after a clone

## Metadata
Per-dataset metadata (DOI, license, size, participants, modality, tasks) is available from the
NEMAR interface at api.nemar.org and from each dataset's `dataset_description.json`
at `data.nemar.org/<id>/latest/`.

## Licenses vary and often restrict use
Many NEMAR datasets are non-commercial (for example CC-BY-NC-SA 4.0).
Check each dataset's license and its required citations before use, and respect them.

## Links
- Browse: https://nemar.org/dataexplorer
- Data host: https://data.nemar.org
- Docs: https://docs.nemar.org
- Command-line tool: https://github.com/nemarOrg/nemar-cli
