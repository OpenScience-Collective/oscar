# Archetype: Command-line tool

> Maturity: draft. Structure is stable; examples are being expanded.
> Techniques are ordered by tier; see [`../evidence.md`](../evidence.md) for the citations.

You have this archetype if your tool runs in a terminal.
Example in our ecosystem: `nemar-cli`.
The job here is mostly **usage**:
an agent can already run shell commands, so help it run *yours* correctly.

## Why it matters

An agent driving a terminal discovers a command-line tool the way a person does:
by running `--help` and reading the output.
If your help text is clear, complete, and stable, the agent succeeds.
If it is thin or inconsistent, the agent guesses and fails.

This is also the archetype with the strongest agent-convention evidence in all of OSCAR,
and it is worth knowing exactly where that evidence points.

## Core: do these first

1. **Add an `AGENTS.md` at the repository root.**
   Install command, the three or four commands that matter most,
   a worked end-to-end example, and the common failure modes.
   See [`templates/AGENTS.md`](../../templates/AGENTS.md).
   The adoption here is genuine and it is specifically the **repository root**:
   more than 60,000 open-source projects,
   supported by OpenAI Codex, Google Jules, and Cursor,
   and donated alongside the Model Context Protocol (MCP)
   to the Linux Foundation's Agentic AI Foundation in December 2025.
   The mechanism is a coding agent reading a file inside a checked-out repository,
   which is exactly the situation an agent is in when it is about to run your tool.
   A copy at a website root is a different thing with no uptake evidence; see the website guide.

2. **Write excellent `--help`.**
   Every subcommand, every flag, with a one-line purpose and at least one example.
   Treat `--help` as the primary interface for both people and agents.
   It is what the agent will actually read first, before any file you publish.

## Recommended: real, but narrower

3. **Wrap the tool in an MCP server**
   if agents need to *drive* your tool rather than read about it.
   This turns your subcommands into callable tools an agent can invoke directly,
   with typed arguments, instead of composing raw shell strings.
   MCP adoption is vendor-broad and growing, and a server is a real project;
   it earns its cost for stateful or authenticated workflows,
   and less so for a tool an agent can already invoke correctly from good `--help`.
   Wrapping need not be a rewrite; the MCPmed "breadcrumbs" pattern wraps an existing tool.

## Unassessed, and still good practice

OSCAR's 2026-09 evidence review did not examine these,
so they are neither promoted nor demoted.
They remain the difference between a tool an agent can use and one it cannot.

4. **Ship a machine-readable help form.**
   A stable `--version` and, ideally, a structured dump such as `mytool --help=json`
   or a documented `mytool schema` command that prints the command tree as JSON.
   This lets an agent enumerate capabilities without scraping prose.
   The tools agents already lean on set the precedent: `gh`, `docker`, and `kubectl`
   all offer `--output json`.

5. **Use meaningful exit codes and predictable output.**
   Non-zero on failure, a `--json` output mode for anything an agent might parse,
   and errors that state what went wrong and how to fix it.

6. **Keep an examples cookbook** in the docs:
   real invocations for real tasks, copy-pasteable.

7. **Describe inputs and outputs,** not just the command's existence,
   using the Bioschemas `ComputationalTool` and `FormalParameter` profiles.

## Minimum viable setup

A repository-root `AGENTS.md` with a worked example,
plus great `--help` on every subcommand.

## Pitfalls

- Do not let `--help` and the docs disagree.
- Do not print progress or logs to stdout that a `--json` consumer will choke on; use stderr.
- Do not require interactive prompts with no non-interactive flag; agents cannot answer them.
- Do not assume a site-root `AGENTS.md` reaches the same audience as the repository-root one.
  It does not; nothing is documented as fetching it.
