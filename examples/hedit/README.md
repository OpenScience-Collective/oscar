# Worked example: HEDit

HEDit (github.com/Annotation-Garden/HEDit) is the small, clean case: a command-line tool and
Python package that does one thing, turn a natural-language or image description of an event
into a valid HED (Hierarchical Event Descriptor) annotation.

## What HEDit is

HEDit is a multi-agent system, delivered as a `pip`-installable command-line tool and library,
part of the Annotation Garden (annotation.garden).
It pairs naturally with the HED example: **HEDit generates** annotations, and **HED validates** them.

Two archetypes apply:

- **command-line tool** (the `hedit` command), and
- **library** (the Python package), with a small **website** (annotation.garden) around it.

## What OSCAR adds

HEDit is already close to agent-ready, because a command-line tool that an agent can shell out to,
with a machine-readable output mode, is most of the battle. OSCAR just makes it legible:

- An [`after/AGENTS.md`](after/AGENTS.md) at the repo root: install, the handful of commands that matter,
  and the one habit (use `-o json`, then validate the result).
- A [`after/llms.txt`](after/llms.txt) for annotation.garden, so an agent discovers HEDit exists
  and how it relates to HED.

## The one thing that makes it usable

HEDit already prints machine-readable output with `-o json`.
That single flag is what the command-line archetype asks for:
an agent can call `hedit annotate "..." -o json`, parse the result, and move on.
The `AGENTS.md` documents it so the agent knows to use it.

## How it maps to the doctrine

- **Command-line tool** ([guide](../../docs/archetypes/cli.md)): example-led `--help`, a JSON output mode,
  a worked example, and an `AGENTS.md`. HEDit has the JSON mode; OSCAR adds the `AGENTS.md`.
- **Library** ([guide](../../docs/archetypes/library.md)): a real PyPI package with accurate metadata.
- **Generate, then validate:** HEDit's output is a HED string, so validate it (via `hedit validate`,
  or the HED tools in the HED example) before use.

## Note

Files here are illustrative of the pattern; the commands and package name are HEDit's real ones
(`pip install hedit`, `hedit annotate`, `github.com/Annotation-Garden/HEDit`).
