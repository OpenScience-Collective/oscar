# Security policy

OSCAR is about making tools safe and legible for AI agents,
so we take the security of our own guidance and tooling seriously.

## Reporting a vulnerability

Please report security concerns privately to **info@osc.earth**
rather than opening a public issue.
Include enough detail to reproduce or understand the problem,
and we will acknowledge your report and work with you on a fix and disclosure timeline.

We welcome reports in two categories:

1. **Tooling vulnerabilities** in any generator, validator, or script OSCAR ships.
2. **Doctrine hazards:** a place where OSCAR's guidance or a template could,
   if followed, expose a project to injection, data leakage, or license violation.
   Getting the advice right is itself a security concern here.

## Scope and stance

OSCAR forbids hidden or deceptive agent-facing content as a matter of principle
(see [`docs/principles.md`](docs/principles.md)),
because such content is indirect prompt injection,
ranked first in the OWASP Top 10 for Large Language Model Applications.
If you find any OSCAR template or example that violates this, treat it as a security bug and report it.

We also remind adopters: your agent-facing surface is an attack surface.
Treat user-generated content as untrusted in anything you expose to agents.
