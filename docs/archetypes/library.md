# Archetype: Library / toolbox

> Maturity: draft. Structure is stable; examples are being expanded.

You have this archetype if people import your functions into their own code.
Examples in our ecosystem: EEGLAB (MATLAB), and any Python or R package.
The job here is **usage**:
help an agent call your functions with the right arguments in the right order.

## Why it matters

An agent writing code against your library relies on signatures, docstrings, and examples.
It cannot see your intent, only what you documented.
A precisely documented public surface is the difference between working code and hallucinated calls.

## Do these, in order of value

1. **Document every public function** with a docstring that states
   what it does, each argument with its type and units, the return value, and one example.
   For EEGLAB and MATLAB, the leading help comment block is that docstring;
   keep it accurate and example-led.

2. **Make signatures explicit.**
   Type hints in Python, argument validation blocks in MATLAB, clear defaults everywhere.
   Ambiguous `*args`/`varargin` with no documentation is where agents go wrong.

3. **Publish docs with an `llms.txt`** for the docs site (see the website archetype),
   pointing at the API reference and the key tutorials.

4. **Provide worked notebooks or scripts** for the common workflows,
   end to end, with real (small) data.
   Examples teach an agent your idioms faster than reference docs.

5. **Add an `AGENTS.md`** covering install, import, the handful of entry-point functions,
   and the conventions a newcomer always gets wrong.
   This is often the single highest-value step for a library,
   because agents usually meet a library by reading source in an editor, not by visiting a website.
   Keep your package metadata accurate too (Python `pyproject.toml`, R `DESCRIPTION`, MATLAB `info.xml`);
   it is the library-world equivalent of a machine-readable card.

6. **Optional: an MCP server** exposing your highest-value operations as callable tools,
   so an agent can run an analysis step without generating and executing arbitrary code.

## Precedent and specifics

- **A model to copy:** MNE-Python ships a `CLAUDE.md` with architecture notes for agents
  and an AI-contribution disclosure policy in its `CONTRIBUTING.md`. Both are worth imitating.
- **Describe your callable surface** with the Bioschemas `ComputationalTool` and `FormalParameter` profiles,
  so a function's inputs and outputs, not just its existence, are machine-discoverable.
- **If your library implements a standard,** expose the schema as an importable object,
  the way `bidsschematools` loads the BIDS schema, not only as prose docs.
- **MATLAB toolboxes** (such as EEGLAB) have no package-registry hook and no docstring standard;
  the pragmatic minimum is a checked-in JSON or YAML manifest of function names, arguments, and help text.

## Minimum viable setup

Accurate, example-led docstrings on the public API, plus a docs `llms.txt`.

## Pitfalls

- Do not document the internal API and leave the public one thin.
- Do not omit units on scientific parameters; "time" versus "time in seconds" changes the result.
- Do not let example code in the docs fall out of sync with the current signatures.
