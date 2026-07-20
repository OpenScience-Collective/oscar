# OSCAR research notes

Findings on the agent-readable web that ground the doctrine.
Transparent techniques only.

## The three-layer shape (organizing model)
Every archetype has the same shape:
1. **Structured, visible metadata ("the card")**: JSON-LD / schema.org, YAML front matter, package metadata.
2. **Discovery / index ("where things are")**: llms.txt, sitemap.md, robots.txt.
3. **Action ("what an agent can call")**: Model Context Protocol (MCP), OpenAPI, structured `--help`.

A pure content site needs layers 1 and 2.
Anything with a command-line tool, library, API, or dataset host also needs layer 3.
MCP is the common denominator of layer 3 across four of the five archetypes.

## llms.txt (llmstxt.org)
- Format: H1 (the only required part), a blockquote summary, freeform Markdown,
  then zero or more H2 "file list" sections of `- [name](url): note`,
  plus an optional `## Optional` section that can be skipped for a shorter context.
- Companion tool `llms_txt2ctx` expands it to `llms-ctx.txt` / `llms-ctx-full.txt`.
- Live examples: `docs.stripe.com/llms.txt` (notably includes a visible
  "Instructions for Large Language Model Agents" section, the legitimate way to steer agents, in the open),
  `vercel.com/llms.txt`, `platform.claude.com/docs/llms.txt`. Links use a `.md` suffix.
- Honest caveat: Google Search states llms.txt does not affect Search or AI Overview ranking;
  their crawl never reads it. It is fetched by agentic tools (Claude Code, Cursor)
  and checked by Chrome DevTools' "Agentic Browsing" Lighthouse audit.
  So it is an agent-tool signal, not an SEO or training-crawler signal. Worth doing at near-zero cost,
  with correct expectations.

## robots.txt AI-bot tokens (authoritative)
- Anthropic (support.claude.com/en/articles/8896518; verify IPs at claude.com/crawling/bots.json):
  `ClaudeBot` (training), `Claude-SearchBot` (search index), `Claude-User` (user-initiated fetch).
- OpenAI: `GPTBot` (training), `OAI-SearchBot` (ChatGPT Search), `ChatGPT-User` (user fetch).
- Google: `Google-Extended` (Gemini training opt-out, separate from Googlebot).
- Apple: `Applebot-Extended`. Others: `PerplexityBot`, `CCBot` (Common Crawl).
- Transparent practice: explicitly Allow the ones you want rather than relying on default-allow silence.
- For licensed or restricted research data, consider allowing search/user fetchers
  while disallowing training crawlers, rather than a blanket policy.

## Markdown mirrors + content negotiation
- Checkly field test: an `Accept: text/markdown` request cut a docs payload from 615 KB to 2.3 KB
  (about a 99.7 percent token reduction).
- Only some agents send a markdown-preferring Accept header today (Claude Code, Cursor, OpenCode);
  others receive full HTML.
- For a static site (Astro), the portable pattern is a static `.md` URL variant per page (the Stripe style),
  not server-side content negotiation.

## JSON-LD / schema.org
- The most mature machine-trust channel, dual-purpose (search plus agents), fully visible in source.
- `schema.org/Dataset` has been indexed by Google Dataset Search since 2018,
  the strongest precedent of all, directly relevant to NEMAR-style archives.
- RO-Crate (`ro-crate-metadata.json`) extends JSON-LD to a whole research object,
  applicable to Brain Imaging Data Structure (BIDS) packaging.

## AGENTS.md (agents.md)
- Repo-facing: guides coding agents working inside a repository. Highest value for libraries,
  where agents mostly meet the tool by reading source, not a website.
- Site-facing (Vercel proposal): served at the deployed site root; still product and code oriented.

## MCP (modelcontextprotocol.io)
- Exposes callable capabilities, not just docs.
- HuggingFace ships an official MCP server at `huggingface.co/mcp`
  (model, dataset, Space, and paper search, plus invokable Gradio Spaces),
  a stronger investment than a static file for anything with a real API.
- HuggingFace has no site-wide llms.txt (root returns 404);
  its real machine channels are model and dataset card YAML front matter plus that MCP server.

## Tooling
- Vercel "Agent Readability Spec" (vercel.com/kb/guide/agent-readability-spec):
  the most complete testable checklist found (15 site-wide plus 23 per-page checks,
  including a text-to-HTML ratio above 15 percent).
  Companion: the `@vercel/agent-readability` package and the agent-ready.dev free scorer and AGENTS.md validator.
- Astro: `starlight-llms-txt` (Starlight docs only); `astro-llms-generate` (generic, maintenance uncertain);
  Firecrawl `llmstxt-generator` / `create-llmstxt-py` (crawl a live URL).
  For a small site, hand-write llms.txt plus a build step that emits a `.md` per page
  (about 30 lines, more auditable than a dependency). Use bun or pnpm, not npm, per project rules.

## The anti-pattern (forbidden): hidden instructions
- Hidden, invisible, comment-only, off-screen, or zero-width agent-only content is indirect prompt injection,
  ranked number one in the OWASP Top 10 for Large Language Model Applications (LLM01),
  reaffirmed for agentic systems in the 2025/2026 revision.
- Real campaigns documented by Palo Alto Unit 42 and Zscaler ThreatLabz used search-poisoning placement
  and manipulated models into fraudulent actions.
- It is the LLM-era retarget of search-engine cloaking, treated as an attack regardless of the operator's intent.
  Forbidden by docs/principles.md.

## Authoritative sources
llmstxt.org; vercel.com/kb/guide/agent-readability-spec; support.claude.com/en/articles/8896518;
owasp.org/www-project-top-10-for-large-language-model-applications;
mintlify.com/blog/context-for-agents; checklyhq.com/blog/state-of-ai-agent-content-negotation;
Google Search Central structured-data and AI-features documentation.
