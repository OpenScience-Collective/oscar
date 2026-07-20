# Archetype: Standard / specification

> Maturity: draft. Structure is stable; examples are being expanded.

You have this archetype if you define a format or vocabulary others must conform to.
Examples in our ecosystem: the Brain Imaging Data Structure (BIDS)
and Hierarchical Event Descriptors (HED).
The job is both **discovery** (an agent finds the spec)
and **usage** (an agent applies it correctly and can check its own work).

## Why it matters

A standard is only followed if it can be applied without ambiguity.
An agent generating data in your format, or checking someone else's,
needs the rules in a form it can execute, not just prose it must interpret.
The machine-readable schema is the whole game here.

## Do these, in order of value

1. **Publish the spec as a machine-readable schema.**
   BIDS ships a machine-readable schema; HED ships its schema as structured data.
   Give agents (and validators) JSON Schema, the structured schema, or equivalent,
   so they can generate and verify conformant output rather than guess from prose.

2. **Provide a validator, and make it callable.**
   A reference validator as a command-line tool, a library, and ideally a Model Context Protocol (MCP)
   server or API, so an agent can validate what it produced and fix it.
   The BIDS Validator and the HED validators are the model.

3. **Version and make the spec citable.**
   Clear version numbers and a canonical citation, so an agent references the exact version it targeted.
   A standard that cannot be pinned cannot be relied on.

4. **Ship conformant examples.**
   Minimal valid samples an agent can pattern-match, plus a few labeled invalid ones and why they fail.

5. **Serve the human spec cleanly** with an `llms.txt`
   pointing at the schema, the validator, and the key sections (see the website archetype).

6. **Add an `AGENTS.md`** in the specification repository for implementers and contributors.

## License and citation

State the specification's license and how to cite it, in machine-readable form.
Standards spread by being reused; make the terms and the credit unambiguous.

## Precedent and specifics

- **The model to copy is BIDS:** a modular machine-readable schema in source (YAML),
  compiled to a single JSON, which then generates the human docs and feeds the reference validator.
  One source of truth, three consumers.
- **Ship the schema in more than one machine format,** the way HED publishes XML, MediaWiki, and JSON;
  naming the format meant for tools tells agents exactly what to read.
- **Put the version in a machine-readable field** (a plain `SCHEMA_VERSION` file is enough),
  so an agent can gate compatibility before it validates.

## Minimum viable setup

A machine-readable schema plus a callable validator.

## Pitfalls

- Do not leave the rules implicit in prose; if only a human can parse it, only a human can apply it.
- Do not let the schema and the written spec drift apart across versions.
- Make sure every shipped example actually validates against the current schema.
