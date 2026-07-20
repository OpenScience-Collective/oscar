# Worked examples

Real OpenScience Collective tools, made agent-ready with OSCAR.
Each is chosen because it exercises a different mix of archetypes,
so together they cover the whole doctrine.

> Status: NEMAR is built (see [`nemar/`](nemar/)); HEDit and EEGLAB are next.

## HEDit (annot-garden)
The Hierarchical Event Descriptors (HED) annotation editor, plus the annot-garden site.
Archetypes: **web app / API** and **website**.
Shows: an OpenAPI spec for the editor's actions, an MCP server for "suggest tags" and "validate,"
JSON-LD `SoftwareApplication`, and a curated `llms.txt`.

## EEGLAB
The MATLAB toolbox for human electrophysiology, plus eeglab.org.
Archetypes: **library / toolbox** and **website**.
Shows: example-led help blocks on the public functions, a docs `llms.txt`,
worked scripts for common pipelines, and an `AGENTS.md` for the repo.

## NEMAR (built)
The Neuroelectromagnetic Data Archive and Tools Resource, plus `nemar-cli` and nemar.org.
Archetypes: **data archive**, **command-line tool**, and **website**.
The first full worked example: see [`nemar/`](nemar/).
It shows the crux, the data is not on the dataset page (it lives at data.nemar.org),
so the download path and the license must be exposed in machine-readable form beyond the HTML.

## Candidates as the landscape grows

We do not try to cover everything.
As OSCAR matures, likely additions include:

- **MNE-Python** (library): already ships a `CLAUDE.md` and an AI-contribution policy worth imitating.
- **DANDI** (data archive): its OpenAPI plus `/info` endpoint is a model to copy;
  its client-rendered dataset pages are a cautionary tale.
- **OpenNeuro** (data archive): a GraphQL API paired with the same server-render gap.
- **Neurodata Without Borders** (standard): an HDMF schema plus the `pynwb` validator.

---

Each example will land as its own directory here with:
the before/after files, a short write-up of what changed, and a link to the live result.
