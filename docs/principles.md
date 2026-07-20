# Principles

These are the non-negotiables.
Every technique in OSCAR follows from them.
If a tactic violates one of these, it does not belong here, no matter how well it "works."

## 1. Transparency by construction

Everything you expose to an agent must be public, human-readable, and reachable at a well-known URL.
An agent and a curious person should be able to read the same file and see the same facts.
There is no private channel to machines.

This is not only an ethical stance; it is what keeps the content trustworthy.
A file that humans routinely read is a file that stays accurate.

## 2. Auditability

Link your agent-facing files from your site so a person can find them without guessing.
A quiet footer link ("For AI agents") pointing to `/llms.txt` and `/AGENTS.md` is enough.
The goal is that anyone can answer "what is this site telling agents?" in one click.

## 3. Parity between humans and agents

The information an agent reads must match what a human is told.
Do not describe your tool one way on the rendered page and a different way in `llms.txt`.
Same claims, same links, same tone of honesty.

## 4. No hidden instructions, ever

Do not use any of the following to steer agents:

- text hidden with `display:none`, `visibility:hidden`, zero opacity, or off-screen positioning,
- white-on-white or 1px text,
- instructions placed only in HTML comments, `alt` text, or metadata that no reader sees,
- content served to agents that differs from content served to browsers (cloaking).

These techniques are **indirect prompt injection**,
ranked first in the OWASP Top 10 for Large Language Model Applications (LLM01).
Security researchers document them as an attack vector (Palo Alto Unit 42, Zscaler ThreatLabz),
agent vendors are building detections against them,
and a site caught doing this can be flagged and distrusted.
An open-science project has more to lose here than anyone.

There is a legitimate way to steer an agent: do it in the open.
Stripe's public `llms.txt`, for example, carries a visible, labeled
"Instructions for Large Language Model Agents" section.
That is fair game, because a human can open the same file and read the same guidance.
If it is not fair to show a human, it is not fair to show an agent.

OSCAR documents the hidden-instruction patterns in exactly one place: this list, as things to never do.

## 5. Consent and control

Say clearly which agents may use your content, using standard, visible mechanisms.
`robots.txt` with named AI user-agents is the honest way to allow or disallow crawling.
If you want agents to use your tool, welcome them explicitly rather than relying on ambiguity.

## 6. Reproducibility

Generate agent-facing files from the same source as your site, at build time, so they never drift.
A hand-maintained `llms.txt` rots; a generated one stays true.
Prefer a small script in your build over manual upkeep, and check the output into version control.

## 7. Your agent-facing surface is also an attack surface

The moment your content is read by agents, it can carry injection aimed at *them*.
If your site includes user-generated content (comments, dataset descriptions, issue text),
treat it as untrusted in anything you expose to agents,
and do not let it smuggle instructions into your `llms.txt` or API responses.
Transparency protects your users too: what you publish is what you can be held to.

---

Everything else in OSCAR, the archetype guides and the templates,
is just the practical application of these seven principles to a specific kind of tool.
