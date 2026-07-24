# HED: notes for agents

## What this is
HED (Hierarchical Event Descriptors) is an ecosystem with a standardized, versioned, machine-readable vocabulary (HED schema) for describing what happened during an experiment (the experimental events) as well as other relevant metadata such as participant state and phenotype. 
The HED ecosystem includes annotation validators in Python and JavaScript, an online web service, and a Model Context Protocol (MCP) server as well as a suite of tools to
support analysis using HED annotations. HED annotation behavior and interpretation are governed by the HED specification.
HED is widely used in the Brain Imaging Data Structure (BIDS) and is being extended to
Neurodata Without Borders (NWB).

## The one habit to keep
HED is checkable. Whenever you generate or edit a HED annotation, validate it against the schema.
Do not hand back an unvalidated HED string.

## Validate (four ways, pick what fits)
- **Python:** `pip install hedtools`, then use the validator against a string, a BIDS TSV, or a JSON sidecar.
- **JavaScript:** `npm install hed-validator`.
- **Web service:** https://hedtools.org/hed (a JSON web service; see https://www.hedtags.org/hed-server for additional information).
- **MCP:** the `hed-standard/hed-mcp` server exposes validation as callable tools for any MCP client.

## Target a schema version
The vocabulary is versioned (for example 8.4.0). State the version you annotated against,
and check compatibility before validating.

## Learn the vocabulary
- Schemas (source of truth): https://github.com/hed-standard/hed-schemas
- Specification: https://github.com/hed-standard/hed-specification
- Resources and tutorials: https://www.hedtags.org/hed-resources
- Online schema browser: https://www.hedtags.org/hed-schema-browser
- Web services: https://hedtools.org/hed

## Links
- Home: https://www.hedtags.org
- Code: https://github.com/hed-standard
