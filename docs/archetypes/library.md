# Archetype: Library / toolbox

> Maturity: draft. Structure is stable; examples are being expanded.
> Techniques are ordered by tier; see [`../evidence.md`](../evidence.md) for the citations.

You have this archetype if people import your functions into their own code.
Examples in our ecosystem: EEGLAB (MATLAB), and any Python or R package.
The job here is **usage**:
help an agent call your functions with the right arguments in the right order.

## Why it matters

An agent writing code against your library relies on signatures, docstrings, and examples.
It cannot see your intent, only what you documented.
A precisely documented public surface is the difference between working code and hallucinated calls.

Read the Unassessed section below before you read the tiers as a priority order.
This is a usage-heavy archetype, and the techniques that matter most to it
are the ones nobody has measured, precisely because they are the only interface there is.

## Core: do these first

1. **Add an `AGENTS.md` at the repository root** covering install, import,
   the handful of entry-point functions,
   and the conventions a newcomer always gets wrong.
   This is often the single highest-value step for a library,
   because agents usually meet a library by reading source in an editor, not by visiting a website,
   and the repository root is exactly where the evidence says such a file gets read:
   more than 60,000 projects, supported by OpenAI Codex, Google Jules, and Cursor,
   donated to the Linux Foundation in December 2025.
   See [`templates/AGENTS.md`](../../templates/AGENTS.md).

2. **Declare your license and how to cite you, machine-readably.**
   A `LICENSE` file, an SPDX identifier in your package metadata, and a `CITATION.cff`.
   A library an agent cannot confirm the terms of is a library a well-behaved agent will not vendor.

## Recommended: real, but narrower

3. **Ship a Model Context Protocol (MCP) server** exposing your highest-value operations
   as callable tools, so an agent can run an analysis step
   without generating and executing arbitrary code.
   MCP adoption is vendor-broad and growing, and a server is a real project;
   it earns its cost when an agent should call your operation directly
   rather than write code against your API.

## Optional: no-regret, no evidence

4. **Publish docs with an `llms.txt`** for the docs site (see the website archetype),
   pointing at the API reference and the key tutorials.
   Cheap and honest; the best available measurement says these files are not being fetched,
   so do not count it as a findability win.

## Unassessed, and still good practice

OSCAR's 2026-09 evidence review looked at discovery channels and agent-facing conventions.
It did not examine any of the following, so they are neither promoted nor demoted here.
For a library they are the whole job:
an agent cannot call a function whose signature it cannot see,
and no study is needed to establish that.

5. **Document every public function** with a docstring that states
   what it does, each argument with its type and units, the return value, and one example.
   For EEGLAB and MATLAB, the leading help comment block is that docstring;
   keep it accurate and example-led.

6. **Make signatures explicit.**
   Type hints in Python, argument validation blocks in MATLAB, clear defaults everywhere.
   Ambiguous `*args` or `varargin` with no documentation is where agents go wrong.

7. **Keep your package metadata accurate**
   (Python `pyproject.toml`, R `DESCRIPTION`, MATLAB `info.xml`);
   it is the library-world equivalent of a machine-readable card.

8. **Provide worked notebooks or scripts** for the common workflows,
   end to end, with real (small) data.
   Examples teach an agent your idioms faster than reference docs.

9. **Describe your callable surface** with the Bioschemas `ComputationalTool`
   and `FormalParameter` profiles,
   so a function's inputs and outputs, not just its existence, are machine-discoverable.

## Precedent and specifics

- **A model to copy:** MNE-Python ships a `CLAUDE.md` with architecture notes for agents
  and an AI-contribution disclosure policy in its `CONTRIBUTING.md`. Both are worth imitating.
- **If your library implements a standard,** expose the schema as an importable object,
  the way `bidsschematools` loads the Brain Imaging Data Structure (BIDS) schema,
  not only as prose docs.
- **MATLAB toolboxes** (such as EEGLAB) have no package-registry hook and no docstring standard;
  the pragmatic minimum is a checked-in JSON or YAML manifest of function names, arguments, and help text.

## Minimum viable setup

A repository-root `AGENTS.md`, plus accurate, example-led docstrings on the public API.

## Pitfalls

- Do not document the internal API and leave the public one thin.
- Do not omit units on scientific parameters; "time" versus "time in seconds" changes the result.
- Do not let example code in the docs fall out of sync with the current signatures.
- Do not read the tiers here as a priority order without reading the Unassessed section;
  for a library, the unmeasured items are the ones that decide whether an agent succeeds.
