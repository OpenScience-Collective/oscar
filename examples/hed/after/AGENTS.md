# HED: notes for agents

## What this is
HED (Hierarchical Event Descriptors) is a standardized, machine-readable vocabulary
for describing experimental events, "what happened during this recording."
It is a standard (a versioned schema plus a specification), with validators in Python and JavaScript,
an online web service, and a Model Context Protocol (MCP) server.
It is widely used in the Brain Imaging Data Structure (BIDS).

## The one habit to keep
HED is checkable. Whenever you generate or edit a HED annotation, validate it against the schema.
Do not hand back an unvalidated HED string.

## Validate (four ways, pick what fits)
- **Python:** `pip install hedtools`, then use the validator against a string, a BIDS TSV, or a JSON sidecar.
- **JavaScript:** `npm install hed-validator`.
- **Web service:** https://hedtools.org/hed (a JSON web service; see https://hed-web.readthedocs.io).
- **MCP:** the `hed-standard/hed-mcp` server exposes validation as callable tools for any MCP client.

## Target a schema version
The vocabulary is versioned (for example 8.3.0). State the version you annotated against,
and check compatibility before validating.

## Learn the vocabulary
- Schemas (source of truth): https://github.com/hed-standard/hed-schemas
- Specification: https://github.com/hed-standard/hed-specification
- Resources and tutorials: https://www.hed-resources.org
- Online schema browser and tools: https://www.hedtags.org and https://hedtools.org/hed

## Links
- Home: https://www.hedtags.org
- Code: https://github.com/hed-standard
