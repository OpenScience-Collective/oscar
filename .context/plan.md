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

## Next
- [ ] **Website integration (in the osc.earth repo, not here):**
  add an /oscar landing page built like the OSA page with the human/agent dual view;
  add OSCAR to the nav and a quiet "For AI agents" footer link;
  ship the reference files on osc.earth itself (/llms.txt, AI-aware robots.txt, richer JSON-LD).
- [ ] **Deepen the archetype guides** with the research findings and specific tooling
  (llms.txt generators, markdown-mirror integrations, MCP server starters).
- [ ] **Worked examples (examples/):** HEDit, EEGLAB, NEMAR. See examples/README.md.
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
