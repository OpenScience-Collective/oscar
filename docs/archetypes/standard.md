# Archetype: Standard / specification

> Maturity: draft. Structure is stable; examples are being expanded.
> Techniques are ordered by tier; see [`../evidence.md`](../evidence.md) for the citations.

You have this archetype if you define a format or vocabulary others must conform to.
Examples in our ecosystem: the Brain Imaging Data Structure (BIDS)
and Hierarchical Event Descriptors (HED).
The job is both **discovery** (an agent finds the spec)
and **usage** (an agent applies it correctly and can check its own work).

## Why it matters

A standard is only followed if it can be applied without ambiguity.
An agent generating data in your format, or checking someone else's,
needs the rules in a form it can execute, not just prose it must interpret.
The machine-readable schema is the whole game here,
and it sits in the Unassessed section below for the same reason a docstring does:
nobody measured it because it is the only interface there is.

## Core: do these first

1. **Version the specification and make it citable.**
   Clear version numbers and a canonical citation, so an agent references the exact version it targeted.
   A standard that cannot be pinned cannot be relied on.
   Mint a Digital Object Identifier (DOI) and complete its DataCite record:
   content negotiation from the DOI to schema.org JSON-LD, BibTeX, and more
   is automatic and unauthenticated once the deposited metadata is complete,
   so a complete record is the cheapest discovery work available to you.

2. **Add an `AGENTS.md` at the repository root** of the specification,
   for implementers and contributors, saying how to validate a document against the spec.
   The repository root is where the evidence for this convention actually is:
   more than 60,000 projects, supported by OpenAI Codex, Google Jules, and Cursor.

3. **State the license and how to cite the specification, machine-readably.**
   Standards spread by being reused; make the terms and the credit unambiguous.

## Recommended: real, but narrower

4. **Make the validator callable over an API or a Model Context Protocol (MCP) server,**
   not only as a local install,
   so an agent can validate what it produced and fix it without a toolchain.
   MCP adoption is vendor-broad and growing, and this is the case that justifies the cost:
   validation is an action an agent needs to take, not a document it needs to read.

## Optional: no-regret, no evidence

5. **Serve the human specification cleanly** with an `llms.txt`
   pointing at the schema, the validator, and the key sections (see the website archetype).
   Cheap and honest, and not a findability mechanism on the current evidence.

## Unassessed, and still good practice

OSCAR's 2026-09 evidence review did not examine these,
so they are neither promoted nor demoted.
For a specification they are the substance:
the tiers above describe how an agent finds and cites your standard,
and the items below decide whether it can actually apply it.

6. **Publish the spec as a machine-readable schema.**
   BIDS ships a machine-readable schema; HED ships its schema as structured data.
   Give agents (and validators) JSON Schema, the structured schema, or equivalent,
   so they can generate and verify conformant output rather than guess from prose.

7. **Provide a reference validator** as a command-line tool and a library.
   The BIDS Validator and the HED validators are the model.
   Making it callable over an API or MCP is the Recommended item above;
   having one at all is this one.

8. **Ship conformant examples.**
   Minimal valid samples an agent can pattern-match, plus a few labeled invalid ones and why they fail.

9. **Ship the schema in more than one machine format,**
   the way HED publishes XML, MediaWiki, and JSON;
   naming the format meant for tools tells agents exactly what to read.

10. **Put the version in a machine-readable field**
    (a plain `SCHEMA_VERSION` file is enough),
    so an agent can gate compatibility before it validates.

## Precedent and specifics

- **The model to copy is BIDS:** a modular machine-readable schema in source (YAML),
  compiled to a single JSON, which then generates the human docs and feeds the reference validator.
  One source of truth, three consumers.

## Minimum viable setup

A machine-readable schema plus a callable validator,
with a versioned, citable specification and a complete DOI record.

## Pitfalls

- Do not leave the rules implicit in prose; if only a human can parse it, only a human can apply it.
- Do not let the schema and the written spec drift apart across versions.
- Make sure every shipped example actually validates against the current schema.
- Do not read the tiers here as a priority order without reading the Unassessed section;
  a findable standard nobody can mechanically apply has solved the smaller half.
