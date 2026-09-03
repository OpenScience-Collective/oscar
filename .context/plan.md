# OSCAR plan

## Goal
A public guide and drop-in toolkit that helps open-science projects make their tools
discoverable by AI agents and usable to the fullest, transparently.
A resource of the OpenScience Collective, sibling to the Open Science Assistant (OSA).

## Done (v0.1)
- [x] Repo scaffolded with vibe-rules templates.
- [x] Principles written (docs/principles.md): the transparency non-negotiables.
- [x] Archetype framework and five draft guides (docs/archetypes/): website, cli, library, web-app-api, data-archive.
- [x] Self-audit checklist (docs/checklist.md).
- [x] Copy-paste templates (templates/): llms.txt, AGENTS.md, robots.txt, JSON-LD SoftwareApplication.
- [x] Brand (brand/): logo and favicon in the OSC family.
- [x] Community files: CODE_OF_CONDUCT, CONTRIBUTING, SECURITY, CITATION.cff.
- [x] Two more archetypes (research lab site, standard) and the licensing principle.
- [x] Scholarly grounding (docs/grounding.md): FAIR, Signposting, Bioschemas, neuroscience precedents.
- [x] osc.earth integration opened as PR #15 (/oscar page, footer link, llms.txt, robots.txt).

## Done (v0.2): the evidence triage

A colleague on the HED project made the fair point that not every OSCAR recommendation is needed.
The triage is done, and the answer was that they were right.

- [x] **Evidence page (docs/evidence.md).** Every technique tiered Core, Recommended, or Optional
  by what actually consumes it, with a primary-source citation for each claim
  and an explicit list of what could not be verified.
- [x] **Techniques demoted.** `llms.txt` and markdown mirrors moved to Optional
  (no measured uptake, one on-the-record vendor denial),
  a site-root `AGENTS.md` moved to Optional (no uptake evidence at a site root,
  as distinct from the well-evidenced repository root),
  and Croissant is now an optional interoperability export judged on concrete discovery gain,
  never a requirement. BIDS and HED are peer standards to Croissant, not subordinate to it.
- [x] **Techniques promoted.** Server-rendered JSON-LD, an AI-aware `robots.txt` with a
  `Sitemap:` line, an honest event-driven `<lastmod>`, a complete DataCite record,
  and a repository-root `AGENTS.md` are the Core set.
- [x] **Two new archive rules**: everything an agent needs is in the server-rendered payload
  (parity with what a human is shown), and never `rel=canonical` from a mirrored dataset page
  to the upstream archive, `sameAs` only.
- [x] Checklist regrouped by tier; the four affected archetype guides reordered;
  `templates/robots.txt` rewritten around the stacked token block;
  the NEMAR example refreshed to current facts (EZID and DataCite DOIs,
  `nemar.org/dataset/<id>`, `api.nemar.org`, the Zarr serving copy)
  with a shipped-versus-target table.

**The principles were not triaged and did not change.**
Transparency, auditability, parity, no hidden instructions, consent, reproducibility,
attack surface, and license declaration are the non-negotiables,
and they hold whatever the evidence says about any technique.

**docs/evidence.md is a living document, not doctrine.**
Reviewed 2026-09-03, revisit by 2027-03-03 or sooner on any of the triggers listed at its foot.
When a tier moves, move it in evidence.md first, then in the checklist and the archetype guides,
in the same change.

## Next
- [~] **Website integration (osc.earth repo):** opened as PR #15; awaiting review and merge.
  Follow-up: consider Signposting `Link` headers and per-page markdown mirrors on osc.earth.
- [ ] **Deepen the archetype guides** with the research findings and specific tooling,
  Core tier first (JSON-LD generators, sitemap lastmod wiring, DataCite record audits)
  rather than the Optional tier (llms.txt generators, markdown-mirror integrations).
- [x] **Worked examples (examples/):** NEMAR, HED, EEGLAB, and HEDit built and tier-aligned.
- [ ] **Generator + validator (Bun + TypeScript):**
  generate llms.txt from a small config or a sitemap;
  validate a live site against docs/checklist.md and report gaps.
- [ ] **Astro integration note** so static sites emit llms.txt and markdown mirrors at build time.

## Open questions
- Home for the human page: osc.earth/oscar (path, chosen) vs a subdomain later.
- Does OSCAR ship an MCP starter server, or only document the pattern for v0.1?
- Versioning: tag the doctrine (v0.1, v0.2) so adopters can cite a fixed revision.

## Notes
Research on the agent-readable web (standards, tooling, live examples) is being
collected into .context/research.md and folded into the archetype guides.
Anything in research.md that predates the 2026-09 triage is superseded by
docs/evidence.md wherever the two disagree; evidence.md carries the citations.
