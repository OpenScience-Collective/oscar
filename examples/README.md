# Worked examples

Real open-science tools, made agent-ready with OSCAR.
Each is chosen because it exercises a different mix of archetypes,
so together they cover the whole doctrine.

## NEMAR (built)
The Neuroelectromagnetic Data Archive and Tools Resource, plus `nemar-cli` and nemar.org.
Archetypes: **data archive**, **command-line tool**, and **website**.
The crux: the data is not on the dataset page (it lives at data.nemar.org),
so the download path and the license must be machine-readable beyond the HTML.
Includes a tested generator and a sample four-hour CI. See [`nemar/`](nemar/).

## HED (built)
Hierarchical Event Descriptors, hedtags.org.
Archetypes: **standard**, **website** (multi-page), **library** (Python and JavaScript),
**web app and API**, and it already ships a **Model Context Protocol (MCP) server**.
The complete example: a project with a strong action layer that lacked the discovery layer.
Shows how a multi-page site adopts OSCAR with one `llms.txt`, server-rendered JSON-LD, and an `AGENTS.md`.
See [`hed/`](hed/).

## EEGLAB (built)
The MATLAB toolbox for human electrophysiology, plus eeglab.org.
Archetypes: **library / toolbox** and **website**.
The honest hard case: MATLAB has no package registry or docstring standard,
so OSCAR adds a checked-in, machine-readable function manifest. See [`eeglab/`](eeglab/).

## HEDit (built)
The Annotation Garden's natural-language-to-HED annotator.
Archetypes: **command-line tool** and **library**.
The small, clean case: a `pip`-installable tool that already prints `-o json`;
OSCAR adds the `AGENTS.md` and `llms.txt`. HEDit generates, HED validates. See [`hedit/`](hedit/).

## Candidates as the landscape grows

We do not try to cover everything.
Likely additions include MNE-Python (library; it already ships a `CLAUDE.md`
and an AI-contribution policy worth imitating), OpenNeuro and DANDI (data archives;
DANDI's OpenAPI plus `/info` endpoint is a model, and both archives' client-rendered
dataset pages are a cautionary tale), and Neurodata Without Borders (NWB) as a standard.

---

Each example lands as its own directory with the recommended `after/` files
and a write-up of what changed and why.
