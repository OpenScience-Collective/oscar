# Archetype: Command-line tool

> Maturity: draft. Structure is stable; examples are being expanded.

You have this archetype if your tool runs in a terminal.
Example in our ecosystem: `nemar-cli`.
The job here is mostly **usage**:
an agent can already run shell commands, so help it run *yours* correctly.

## Why it matters

An agent driving a terminal discovers a command-line tool the way a person does:
by running `--help` and reading the output.
If your help text is clear, complete, and stable, the agent succeeds.
If it is thin or inconsistent, the agent guesses and fails.

## Do these, in order of value

1. **Write excellent `--help`.**
   Every subcommand, every flag, with a one-line purpose and at least one example.
   Treat `--help` as the primary interface for both people and agents.

2. **Ship a machine-readable help form.**
   A stable `--version` and, ideally, a structured dump such as `mytool --help=json`
   or a documented `mytool schema` command that prints the command tree as JSON.
   This lets an agent enumerate capabilities without scraping prose.
   The tools agents already lean on set the precedent: `gh`, `docker`, and `kubectl` all offer `--output json`.

3. **Add an `AGENTS.md` at the repo root.**
   Install command, the three or four commands that matter most,
   a worked end-to-end example, and the common failure modes.
   See [`templates/AGENTS.md`](../../templates/AGENTS.md).

4. **Use meaningful exit codes and predictable output.**
   Non-zero on failure, a `--json` output mode for anything an agent might parse,
   and errors that state what went wrong and how to fix it.

5. **Keep an examples cookbook** in the docs:
   real invocations for real tasks, copy-pasteable.

6. **Optional but powerful: wrap the tool in a Model Context Protocol (MCP) server.**
   This turns your subcommands into callable tools an agent can invoke directly,
   with typed arguments, instead of composing raw shell strings.

## Minimum viable setup

Great `--help` on every subcommand, plus an `AGENTS.md` with a worked example.

## Pitfalls

- Do not let `--help` and the docs disagree.
- Do not print progress or logs to stdout that a `--json` consumer will choke on; use stderr.
- Do not require interactive prompts with no non-interactive flag; agents cannot answer them.
