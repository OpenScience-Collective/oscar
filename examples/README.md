# Worked examples

Real OpenScience Collective tools, made agent-ready with OSCAR.
Each is chosen because it exercises a different mix of archetypes,
so together they cover the whole doctrine.

> Status: planned. These are the first case studies OSCAR will build out.

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

## NEMAR
The Neuroelectromagnetic Data Archive and Tools Resource, plus `nemar-cli` and nemar.org.
Archetypes: **data archive**, **command-line tool**, and **website**.
Shows: schema.org `Dataset` per dataset, a machine-readable catalog,
a clean `nemar-cli --help` with a JSON schema form, and a top-level `llms.txt`.

---

Each example will land as its own directory here with:
the before/after files, a short write-up of what changed, and a link to the live result.
