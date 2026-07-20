# OSCAR research notes

The agent-readable web: standards, tooling, and live examples that ground the doctrine.

## The de-facto standard: llms.txt
- Spec: https://llmstxt.org (Jeremy Howard / Answer.AI, Sept 2024).
- A Markdown file at the site root: H1 title, blockquote summary, then curated `##` sections
  of links with one-line descriptions, plus an optional `## Optional` section.
- Optional companion `llms-full.txt` inlines the full content.
- Status (2026): a community proposal, not an IETF or W3C standard;
  adoption studies put it near 10 percent of large domains and rising.
- Live examples to inspect: docs.anthropic.com/llms.txt, vercel.com/llms.txt,
  docs.stripe.com/llms.txt, huggingface.co/llms.txt.

## Vercel "agent readability" spec (a useful synthesis)
- Recommends: llms.txt, sitemap.xml with lastmod, a markdown sitemap, AGENTS.md at site root,
  AI-bot-friendly robots.txt, per-page canonical + description + Open Graph + lang,
  JSON-LD with title/description/url/dateModified/BreadcrumbList, and markdown mirrors
  (via `.md` URLs or `Accept: text/markdown` content negotiation).
- Notably contains no hidden-instruction advice; it is all discoverable, structured metadata.

## AGENTS.md
- Open standard: https://agents.md . Primarily for code repositories;
  Vercel and others also serve one at the site root as an agent onboarding brief.

## Model Context Protocol (MCP)
- https://modelcontextprotocol.io . The standard way to expose a tool's *capabilities*
  (callable actions), not just its docs. This is the "usage" half of agent-readiness.

## The anti-pattern: hidden instructions
- Text hidden via display:none / zero-opacity / off-screen, comment-only or alt-text directives,
  and cloaking are all forms of indirect prompt injection.
- Documented as an attack by security teams (for example Palo Alto Unit 42 and Zscaler ThreatLabz),
  observed in the wild redirecting agent behavior. OSCAR forbids these; see docs/principles.md.

## To confirm and expand (open research threads)
- Exact current AI user-agent tokens per vendor for robots.txt (ClaudeBot, Claude-User,
  GPTBot, OAI-SearchBot, Google-Extended, PerplexityBot, CCBot, and others).
- Build-time generators for llms.txt (Mintlify, Firecrawl, community npm packages, Astro integrations).
- How HuggingFace exposes model and dataset metadata to agents beyond llms.txt.
- Croissant metadata format for machine-learning datasets (data-archive archetype).

<!-- A dedicated research pass is being folded in here as it completes. -->
