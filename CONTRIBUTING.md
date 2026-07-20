# Contributing to OSCAR

Thank you for helping make open-science tools ready for AI agents.
OSCAR is a public good; contributions of all sizes are welcome,
from a typo fix to a whole new archetype guide or worked example.

## What we are looking for

- **Sharper doctrine:** improvements to the principles, the archetype guides, or the checklist.
- **Better templates:** clearer or more complete starter files under `templates/`.
- **Worked examples:** a real open-science tool made agent-ready, added under `examples/`.
- **Corrections:** anything inaccurate, especially bot tokens, tooling, or standards details.

## The one rule you cannot bend

Everything OSCAR recommends must be **transparent**:
public, human-readable, and auditable, with parity between what agents and humans see.
We do not accept any technique that hides content from people while exposing it to agents.
That is indirect prompt injection; see [`docs/principles.md`](docs/principles.md).

## Writing conventions

- **Semantic line breaks** in Markdown prose: roughly one sentence per line,
  breaking at clause punctuation for long sentences (see sembr.org).
- **No em-dashes;** use commas or semicolons.
- **Define an abbreviation** before its first use, for example "Hierarchical Event Descriptors (HED)".
- **No emojis** in commits, pull requests, or files.
- **Examples beat explanations;** every archetype guide should end with something copyable.

## Workflow

1. Open an issue describing the change (skip only for typos).
2. Create a branch from `main`.
3. Make atomic commits with messages under 50 characters.
4. Open a pull request that references the issue and says what changed.
5. A maintainer reviews; address all non-trivial feedback before merge.

## Cite your sources

Doctrine claims about standards, tooling, or agent behavior should be checkable.
Link the authoritative source, and prefer primary references (a spec, a vendor's own docs) over blog posts.

## Reporting a security concern

If you find a way OSCAR's guidance or templates could be misused, or a vulnerability in any tooling,
please follow [`SECURITY.md`](SECURITY.md) rather than opening a public issue.

By contributing, you agree that your contributions are licensed under the same terms as the project
(CC-BY-4.0 for documentation and templates, MIT for code); see [`LICENSE`](LICENSE).
