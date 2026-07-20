# Grounding: OSCAR and FAIR

OSCAR is not a new demand invented for the age of AI agents.
It operationalizes principles open science has held for a decade.

## FAIR already named this goal

The FAIR Guiding Principles (Wilkinson et al., 2016, *Scientific Data*, doi:10.1038/sdata.2016.18)
were written for machines, not only people.
The paper's own target is an "autonomously-acting, computational data explorer,"
and it frames machine-actionability as "a continuum of possible states," not a binary,
a description written years before LLM agents existed that fits one exactly.

FAIR's Interoperable and Reusable clauses are, in effect, an agent-readiness checklist:

- I1 to I3: a formal, shared representation; qualified references between records; FAIR vocabularies.
- R1 to R1.3: rich description, an explicit license, provenance, and conformance to community standards.

OSCAR does not add a requirement on top of FAIR.
It applies FAIR's Interoperable and Reusable principles to a new kind of computational explorer,
the autonomous agent, and extends the FAIR Digital Object idea
(a persistent identifier, typed metadata, and a machine-resolvable location)
from data objects down to every artifact an archetype covers:
websites, command-line tools, libraries, APIs, archives, lab pages, and standards.

This is an active research thread, not a lone claim.
FAIR-Squared (fair2.ai) is an explicitly AI-ready extension of FAIR,
and the FARR effort (FAIR, AI-Readiness, Reproducibility; *AI Magazine*, 2026, doi:10.1002/aaai.70063)
names the same convergence.
OSCAR sits alongside these, not apart from them.

## The bidirectional gap OSCAR closes

Two communities are talking past each other.

- The **scholarly web** solved structured, machine-actionable metadata years ago
  (schema.org, Bioschemas, Signposting, DataCite, RO-Crate),
  yet is quietly regressing: several major data archives now serve
  client-rendered single-page applications whose dataset pages carry
  no server-rendered structured data at all, invisible to a plain HTTP request.
- The **agent and web-development** world has fresh, lightweight conventions
  (llms.txt, AGENTS.md, markdown mirrors) but is largely unaware of the scholarly standards,
  and, as of this writing, none of the major neuroscience tools has adopted even an llms.txt.

OSCAR closes both halves.
It brings the scholarly standards to projects that only know the web conventions,
and the web conveniences to projects that only know the scholarly standards,
and it insists the result is server-rendered and auditable, not hidden behind a script.

## What this means in practice

Prefer the standard with scholarly grounding when one exists:

- Signposting over an ad-hoc file for typed navigation.
- schema.org and Bioschemas for the metadata card.
- A machine-readable schema plus a callable validator for a specification.

Use the lighter conventions (llms.txt, AGENTS.md) as a helpful supplementary index,
not as the foundation.
