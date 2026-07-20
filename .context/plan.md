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

## Next
- [~] **Website integration (osc.earth repo):** opened as PR #15; awaiting review and merge.
  Follow-up: consider Signposting `Link` headers and per-page markdown mirrors on osc.earth.
- [ ] **Deepen the archetype guides** with the research findings and specific tooling
  (llms.txt generators, markdown-mirror integrations, MCP server starters).
- [~] **Worked examples (examples/):** NEMAR built (examples/nemar/); HEDit and EEGLAB next.
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
