# Worked example: EEGLAB

EEGLAB (eeglab.org) is the honest hard case: a widely used toolbox in a language with
no package registry and no docstring standard that an agent can lean on.

## What EEGLAB is

EEGLAB is an open-source MATLAB toolbox from the Swartz Center for Computational Neuroscience (SCCN)
for processing continuous and event-related electroencephalography (EEG), magnetoencephalography (MEG),
and other electrophysiological data: filtering, artifact rejection, independent component analysis (ICA),
time-frequency analysis, and group study.
It has a graphical interface and a scripting interface, and a large plugin ecosystem.

Two archetypes apply:

- **library / toolbox** (the MATLAB code), and
- **website** (eeglab.org, the docs and tutorials).

## The problem EEGLAB exposes

The library archetype leans on package metadata and typed docstrings.
MATLAB has neither in the way Python or R do:
no PyPI-style registry to publish a machine-readable card, and no numpydoc-style convention,
just the leading `help functionname` comment block.
So an agent writing an EEGLAB pipeline has little structured ground to stand on.

## The fix: a bolt-on function manifest

Since MATLAB gives an agent nothing to enumerate, OSCAR's advice is to check one in:
a machine-readable catalog of the functions that matter, their arguments, and a one-line purpose.
See [`after/function-manifest.json`](after/function-manifest.json), a starter covering the core pipeline
(`pop_loadset`, `pop_eegfiltnew`, `pop_runica`, `pop_epoch`, `eeg_checkset`, `pop_saveset`).
Generate it from the `help` blocks so it does not drift, and serve it from eeglab.org.

## The rest, from the doctrine

- **Discovery** ([website guide](../../docs/archetypes/website.md)): a curated [`after/llms.txt`](after/llms.txt)
  for eeglab.org, server-rendered `SoftwareApplication` JSON-LD ([`after/eeglab.jsonld`](after/eeglab.jsonld)),
  and an AI-aware [`after/robots.txt`](after/robots.txt).
- **Usage** ([library guide](../../docs/archetypes/library.md)): an [`after/AGENTS.md`](after/AGENTS.md)
  that shows how to run EEGLAB headless (`eeglab nogui`) and script the common pipeline,
  plus the function manifest as the machine-readable surface.

## How it maps to the doctrine

- MATLAB toolboxes are called out in the library guide as needing exactly this bolt-on manifest.
- The website half is standard discovery: `llms.txt`, JSON-LD, `robots.txt`.
- EEGLAB sits in an ecosystem: link out to BIDS (the `bids-matlab-tools` plugin), HED for events,
  and NEMAR and OpenNeuro for datasets, so an agent can follow the graph.

## Note

Files here are illustrative of the pattern.
Facts are EEGLAB's real ones (the `pop_` functions, the EEG structure, `.set`/`.fdt` files, `sccn/eeglab`, eeglab.org);
fill the exact page URLs from the live site when adopting.
