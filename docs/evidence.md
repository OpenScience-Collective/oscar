# Evidence: what agents and crawlers actually consume

> Point in time: 2026-09.
> This page is a living document, not doctrine.
> The [principles](principles.md) do not change when the evidence does; the techniques do.

OSCAR recommends techniques, and a colleague was right to ask which of them are load-bearing.
Not every technique in this repository has evidence behind it,
and a few of the most fashionable ones have evidence against them.
This page separates the two, so a maintainer with one afternoon spends it on the right things.

Every claim below traces to a primary source: a vendor specification, vendor documentation,
or a published measurement.
Where the underlying research found no primary source either way, the text says
"not verified as of 2026-09" rather than guessing.

## How to read the tiers

- **Core.** A documented consumer fetches and acts on it today,
  and the evidence is a vendor specification, vendor documentation, or a large-sample measurement.
  Do these first.
- **Recommended.** Real consumers exist, but they are narrower than "AI agents in general":
  one vendor's feature, scholarly infrastructure rather than agents,
  or a benchmark published by an interested party.
- **Optional.** Cheap and no-regret, but with no measured uptake,
  and in one case an on-the-record vendor denial.
  Ship them if they cost you an hour; do not report them as a findability win.

A technique's tier is about *evidence of uptake*, not about whether it is a good idea.
An Optional item can still be worth doing.
A Core item is one you can defend to a skeptical colleague with a citation.

## 1. Crawler tokens, and the JavaScript problem

**The single most load-bearing fact in this document:
most AI crawlers do not execute JavaScript at all.**
Vercel and MERJ analysed more than 500 million crawler fetches and found
zero JavaScript execution by GPTBot, ClaudeBot, or PerplexityBot;
they fetch `.js` files and never run them
([Vercel, "The rise of the AI crawler", 2024-12-17](https://vercel.com/blog/the-rise-of-the-ai-crawler)).
Only Googlebot and Applebot render pages.
`bingbot` executes JavaScript in Chromium, and its index also backs
Yahoo, DuckDuckGo, and Copilot's web grounding.

Consequence: a dataset page whose facts are assembled by client-side script
is not merely badly optimised for those crawlers, it is invisible to them.
Server-rendered structured data is not a nicety; for most AI crawlers it is the only channel.

The named tokens are documented by their vendors, and all of them are robots.txt tokens:

- OpenAI: `GPTBot` (training crawl), `OAI-SearchBot` (search and citation crawl),
  and `ChatGPT-User` (live per-request fetch, documented as "not used for crawling the web
  in an automatic fashion"), all robots.txt compliant
  ([platform.openai.com/docs/bots](https://platform.openai.com/docs/bots)).
- Anthropic: `ClaudeBot` (training), `Claude-SearchBot` (search index),
  and `Claude-User` (live fetch); all three, including the live-fetch agent,
  honor robots.txt (Anthropic crawler policy, docs.claude.com).
- Perplexity: `PerplexityBot` (indexing) honors robots.txt,
  but `Perplexity-User` "generally ignores robots.txt rules" on live fetches (docs.perplexity.ai).
  Cloudflare separately documented Perplexity fetching pages that disallow `PerplexityBot`
  using undeclared, rotating user agents and addresses (Cloudflare blog, 2025-08).
- `Google-Extended` is not a crawler.
  It is a robots.txt token Google evaluates against pages Googlebot already fetched,
  controlling Gemini training and grounding independently of inclusion in Search.
- `Applebot-Extended` (Apple Intelligence training) is controllable separately
  from `Applebot` (Siri and Spotlight).
- `CCBot` is a plain, non-JavaScript fetcher whose archive is reused as upstream
  training data by many organisations beyond Common Crawl itself.

**Tier: Core.**
Every token above comes from its own vendor's documentation,
and an explicit block is what several vendors' own tooling checks for,
even though the tokens are already covered by a permissive wildcard.
The copy-paste block is in [`templates/robots.txt`](../templates/robots.txt).

One honest caveat: naming a token is a statement of your policy, not an enforcement mechanism.
The Perplexity findings above are the counter-example.
Whether agentic browsers (Atlas, Comet, Copilot browsing) honor robots.txt
differently from their documented "-User" fetchers is not verified as of 2026-09.

## 2. Sitemaps and `lastmod`

Bing states the link to AI answers directly:
freshness signals "directly influence how quickly updates are reflected in search results
and AI generated answers"
([Bing Webmaster Blog, 2025-07-31](https://blogs.bing.com/webmaster/July-2025/Keeping-Content-Discoverable-with-Sitemaps-in-AI-Powered-Search)).
Google uses `lastmod` when it is "consistently and verifiably accurate".
Both ignore `priority` and `changefreq`.

The practical requirement is that `lastmod` be event-driven,
tied to the version, metadata, or release event that actually changed the page,
not to your build time.
A `lastmod` that updates on every rebuild is the case both vendors describe as unreliable,
and it is worse than no `lastmod` at all.

Crawl budget is not your problem at open-science scale.
Google's own guidance puts the threshold around a million pages a week updated,
or ten thousand a day, far above an archive with hundreds of datasets.

**Tier: Core.**

## 3. JSON-LD, schema.org, and Google Dataset Search

Google Dataset Search has consumed schema.org `Dataset` markup since 2018,
and its requirements are documented and modest:
few strictly mandatory fields, but the ranking and display value sits in
`creator` (with ORCID or ROR in `sameAs`), `identifier` (a DOI), `license` (a URL),
`keywords`, `isAccessibleForFree`, `temporalCoverage` and `spatialCoverage`,
and `distribution` (a `DataDownload` with `contentUrl` and `encodingFormat`);
text truncates at 5,000 characters
([Google structured data documentation for datasets](https://developers.google.com/search/docs/appearance/structured-data/dataset)).

This is the card, and it is the technique with both the longest track record
and the widest set of documented consumers.
It is also the technique the JavaScript finding in section 1 makes non-negotiable:
render it in the HTML your server returns.

**Do not canonicalize a mirrored dataset page to the upstream archive.**
Google's duplicate-content guidance recommends that the downstream or republishing site
decide its own indexing rather than blanket `rel=canonical` to the origin
([Google, consolidate duplicate URLs](https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls)).
A mirrored dataset page that adds its own identifier, validation status, access paths,
or derived products is not byte-identical to the upstream record,
and a canonical pointing away deletes it from the index it should be in.
`sameAs` is the correct link.

**Tier: Core** for server-rendered `Dataset` JSON-LD, and Core as a policy for the canonical rule.

Whether any conversational product retrieves from Google Dataset Search itself
is a separate question, and it is not verified as of 2026-09.

## 4. DOIs, DataCite, and registries

DataCite's resolver supports Accept-header content negotiation from a DOI
to schema.org JSON-LD, Citeproc JSON, BibTeX, RIS, Codemeta, and JATS, with no authentication
([DataCite content resolver](https://support.datacite.org/docs/datacite-content-resolver)).
This is the cheapest Core item on the page, because there is nothing to build:
it works the moment your deposited metadata is complete.
In DataCite Metadata Schema 4.5 and 4.6, `resourceTypeGeneral` is required,
and `Subject`, `Contributor`, `Date`, `RelatedIdentifier`, `Description`, and `GeoLocation`
are recommended for discoverability
([DataCite metadata schema 4.6](https://datacite-metadata-schema.readthedocs.io/en/4.6/appendices/appendix-1/resourceTypeGeneral/)).
Auditing your own deposits against that list is a spreadsheet exercise, not an engineering project.

Registries are a different case.
They are real scholarly infrastructure with real human and machine consumers:

- **re3data**: free listing by application; a project team evaluates the site against its schema
  and handbook, and a second reviewer validates before publication
  ([re3data FAQ](https://www.re3data.org/faq)).
- **FAIRsharing**: a curated registry whose roughly 1,900 repository records cross-link to
  re3data and SciCrunch and import into OpenAIRE Explore as one de-duplicated record per repository
  (blog.fairsharing.org).
- **OpenAIRE**: requires re3data registration first
  ([OpenAIRE validator registration guide](https://www.openaire.eu/validator-registration-guide)),
  and is open to repositories outside Europe that pass its compatibility guidelines.
- **Wikidata**: OpenNeuro has an item, Q23891141, with 25 statements, verified 2026-09-03.
  That is a direct precedent for an archive item, and the effort is an afternoon.

What is **not** established is that any conversational AI product queries
DataCite Commons, re3data, FAIRsharing, OpenAIRE, or Wikidata as a retrieval source.
No primary source was found either way; not verified as of 2026-09.

**Tier: Core** for complete DOI and DataCite metadata,
because content negotiation is a documented, automatic consumer.
**Tier: Recommended** for registry listings,
because the value is real but the consumer is scholarly infrastructure, not agents.

## 5. Signposting

[signposting.org](https://signposting.org) lists more than thirty adopters,
including Zenodo, DSpace 7, InvenioRDM, HAL, Pangaea, and CKAN.
Typed `Link` relations (`cite-as`, `describedby`, `license`, `author`, `item`)
let a client get citation, description, and terms from a single HEAD request with no scraping,
and the adoption is genuine and verifiable.

The honest qualification is who the consumers are.
Every listed consumer is scholarly or library infrastructure.
No AI agent consumer of Signposting is documented.

**Tier: Recommended.**
Ship it because it plugs you into real repository interoperability tooling,
which is a good reason on its own.
Do not ship it expecting an agent to notice.

## 6. `llms.txt` and markdown mirrors

This is the section that changes OSCAR's previous emphasis.

**`llms.txt` has no measured uptake and one on-the-record vendor denial.**
Ahrefs analysed the May 2026 server logs of 137,210 domains:
28 percent published a valid `llms.txt`,
and **97 percent of those published files received zero requests that month**;
GPTBot led AI bots at 4.51 percent of requests
([Ahrefs llms.txt study, 2026-06-15](https://ahrefs.com/blog/llmstxt-study/)).
Asked whether referencing the file amounted to an endorsement, Google's John Mueller answered
"no", and Google Search Central now states that such files
"won't harm (nor help)" and that Google Search ignores them
([Search Engine Roundtable](https://www.seroundtable.com/google-does-not-endorse-llms-txt-40789.html)).
A ten-site tracking study by Search Engine Land found no consistent effect on AI referrals
(searchengineland.com/does-llms-txt-matter-467740, 2026-01-20).

**Markdown mirrors have a capability claim and no uptake data.**
Mintlify documents serving `.md` by URL suffix and by `Accept: text/markdown` negotiation,
framed as an efficiency claim of "30x more efficient",
but cites no server-log evidence that agents request markdown
(mintlify.com/blog/context-for-agents, 2026-01-29).
No independent uptake data was found anywhere.

Both remain cheap, both remain honest, and both are still consistent with OSCAR's principles:
a curated index of your own site is a good artifact for a human too.
Neither is a findability bet.

**Tier: Optional, for both.**
Ship them as no-regret additions.
Do not put them at the top of an archetype guide,
and do not report them internally as an AI-findability win,
because the best available evidence says they are not being read.

## 7. `AGENTS.md`: the right file in the wrong place

The evidence here is strong, and it is about a different mechanism than the one
OSCAR was previously recommending.

**At a repository root, `AGENTS.md` is genuinely adopted**:
more than 60,000 open-source projects,
supported by OpenAI Codex, Google Jules, and Cursor ([agents.md](https://agents.md)),
and donated, alongside the Model Context Protocol (MCP),
to the Linux Foundation's Agentic AI Foundation on 2025-12-09.
That is a coding agent reading a file inside a checked-out repository,
and it is one of the best-evidenced techniques in this document.

**At a site root, there is no evidence at all.**
No browsing or search agent is documented as fetching a site-root `AGENTS.md`
the way it fetches `robots.txt`.
The proposals aimed at that use case go by different names,
`webagents.md` and `agents.txt`, and none of them has been adopted.

**Tier: Core** for a repository-root `AGENTS.md` on anything with a repository.
**Tier: Optional** for a site-root copy: harmless, human-readable, and not a discovery channel.

## 8. OpenAPI versus MCP

OpenAI's Custom GPT Actions consume OpenAPI 3.0.1 and 3.1.0 specifications directly
(platform.openai.com/docs/actions/getting-started),
which makes a published specification immediately usable by a documented consumer.
A vendor benchmark by APImatic (2026-08-07) ran Claude Opus against a 13,000-line integration task
and scored a vanilla agent 13.8 out of 24 on a resilience-focused readiness gate,
a supplied OpenAPI specification 15.0, and a documentation MCP server 17.2.
All three completed the basic task; the gap was error handling and resilience,
not core success.
That benchmark is vendor-authored and not neutral, which is why OpenAPI sits in Recommended
rather than Core.

MCP adoption is vendor-broad and growing:
OpenAI added client support in March 2025,
and by December 2025 Anthropic had donated MCP to a Linux-Foundation-hosted
Agentic AI Foundation with OpenAI and Block as co-founders
(blog.modelcontextprotocol.io, 2025-12-09).
Numeric adoption figures circulating for MCP come from secondary aggregators
and were not cross-verified against a primary report; treat them as unverified.

The practical division:
an OpenAPI document generated from route definitions you already have
clears the bar for correct basic usage at a fraction of the cost of a bespoke MCP server.
MCP earns its cost when an agent must *drive* stateful or authenticated actions,
uploads, validation, publication,
rather than search and read.
A read-mostly public API is served by OpenAPI first.

**Tier: Recommended** for OpenAPI.
**Tier: Recommended** for MCP, with the caveat that it is a large effort
and should follow demand rather than precede it.

## 9. Croissant

Croissant is real, and it is not a requirement.

MLCommons announced it on 2024-03-06 with Hugging Face, Google Dataset Search, Kaggle,
and OpenML as launch adopters
([MLCommons Croissant announcement](https://mlcommons.org/2024/03/croissant_metadata_announce/)).
It extends schema.org with a `cr:` namespace across four layers:
Dataset Metadata (which reuses `name`, `description`, and `license`),
Resource, Structure (`RecordSet` and `Field`), and Semantic.
By February 2025 MLCommons reported more than 700,000 datasets
discoverable through Google Dataset Search via Croissant
(mlcommons.org/2025/02/croissant-qa-community),
and Hugging Face auto-generates it for Hub datasets
([Hugging Face Croissant documentation](https://huggingface.co/docs/dataset-viewer/en/croissant)).

Two things follow.
First, the marginal cost is real: the Dataset Metadata Layer reuses fields
a schema.org emitter already produces, but the Structure Layer requires authoring
`RecordSet` and `Field` declarations for tabular structure.
That is incremental work, not a namespace bolt-on.
Second, the domain fit for raw scientific signal data is weak and unestablished.
Croissant's `RecordSet` model targets row-and-column or image-and-label data,
and no precedent was found for Croissant applied to raw time-series recordings;
not verified as of 2026-09.

OSCAR's position: Croissant is an **optional interoperability export**,
judged on a concrete discovery gain such as a Hugging Face or Kaggle listing,
never a requirement.
The Brain Imaging Data Structure (BIDS) and Hierarchical Event Descriptors (HED)
are peer standards to Croissant in scope and standing, not subordinate to it.
schema.org `Dataset` plus the domain metadata standard is the card.
Where Croissant fits, it fits the tabular sidecars, not the recordings.

**Tier: Optional.**

## 10. Cloud-optimized serving copies: stream or download

If you publish a derived, cloud-optimized serving copy of your data
(Zarr, Cloud-Optimized GeoTIFF, Parquet, or similar),
say plainly when an agent should stream it and when it should download.
Comparable archives converge on the same shape of guidance:

- DANDI and PyNWB frame streaming as reading small pieces of a large remote file,
  with no fixed size threshold (pynwb.readthedocs.io).
- Pangeo streams by default, to minimize egress; the choice is architectural, not size-conditional.
- NASA's Earthdata Cloud Cookbook gives the most concrete rule:
  stream in-region, download outside it (nasa-openscapes.github.io).
- Microsoft Planetary Computer has the catalog itself declare the open arguments,
  a precedent for an index document carrying its own access recipe.
- OpenNeuro publishes no streaming guidance at all
  (docs.openneuro.org/user_guide.html), which makes this a differentiator rather than table stakes.

**Tier: Recommended.**
The precedent is strong and consistent, but the consumer is the human or agent
reading your documentation, not a crawler that fetches the guidance automatically.
The generalised block is in the
[data archive guide](archetypes/data-archive.md#stream-or-download-a-cloud-optimized-copy).

## Not assessed in this evidence base

These techniques appear in OSCAR and were not examined by the 2026-09 research.
They keep their current position and are marked as unassessed in the checklist
rather than being promoted or demoted on evidence that does not exist:
Bioschemas profiles, RO-Crate, DCAT, structured `--help` and `--json` output modes,
`CITATION.cff`, and the internal shape of a machine-readable catalog.
Several of them ride the Core card channel (Bioschemas and RO-Crate are schema.org profiles),
which is an argument for them, but it is not a measurement.

## What could not be verified

Stated plainly, because a guide that hides its gaps is not auditable:

- Whether any conversational AI product queries Google Dataset Search, DataCite Commons,
  re3data, FAIRsharing, OpenAIRE, or Wikidata as a retrieval source.
  No primary source either way; not verified as of 2026-09.
- Whether agentic browsers honor robots.txt differently from their documented
  "-User" fetchers. Not verified as of 2026-09.
- A documented, low-cost "card only, data hosted elsewhere" Hugging Face mirroring pattern
  for an archive that does not host on Hugging Face. Not verified as of 2026-09.
- Numeric MCP adoption figures, which come from secondary aggregators
  rather than one cross-verified primary report. Not verified as of 2026-09.
- Any real-world precedent for Croissant applied to raw neurophysiology time-series.
  Not verified as of 2026-09.

## The tier table

| Technique | Tier | Why |
|---|---|---|
| Server-rendered schema.org JSON-LD in the returned HTML | Core | Most AI crawlers execute no JavaScript, so this is the only channel they have (Vercel/MERJ, 500M+ fetches). |
| `robots.txt` naming AI user-agent tokens, plus a `Sitemap:` line | Core | Every token is documented by its own vendor, and the major crawlers state that they honor robots.txt. |
| `sitemap.xml` with real, event-driven `lastmod` | Core | Bing ties freshness signals directly to AI generated answers; Google uses `lastmod` when it is verifiably accurate. |
| Complete DOI and DataCite metadata | Core | Content negotiation from the DOI to JSON-LD, BibTeX, and more is automatic and unauthenticated once the record is complete. |
| Machine-readable license and citation on the resource | Core | A documented Google Dataset Search field, and the DataCite mandatory set is what backs `cite-as`. |
| `AGENTS.md` at a repository root | Core | 60,000+ projects, supported by OpenAI Codex, Google Jules, and Cursor; donated to the Linux Foundation in December 2025. |
| Parity: what an agent needs is in the server-rendered payload | Core | Same measurement as the first row; a client-rendered fact does not exist for a non-rendering crawler. |
| Never `rel=canonical` from a mirrored dataset page to the upstream archive; `sameAs` only | Core | Google's duplicate-content guidance puts the indexing decision with the republishing site. |
| OpenAPI specification | Recommended | OpenAI Actions consume it directly; the benchmark showing a gain is vendor-authored, not neutral. |
| Registry listings (re3data, then FAIRsharing, OpenAIRE, Wikidata) | Recommended | Real scholarly infrastructure with a documented review process; no confirmed AI-agent retrieval channel. |
| Signposting `Link` headers | Recommended | 30+ verifiable adopters, all of them repository software rather than AI agents. |
| Stream-versus-download guidance for a cloud-optimized copy | Recommended | Strong, consistent precedent across DANDI, Pangeo, and NASA; the consumer is a reader, not a crawler. |
| Model Context Protocol server | Recommended | Vendor-broad and growing, but it earns its cost only when agents must drive stateful actions, not read. |
| `llms.txt` | Optional | 97 percent of published files received zero requests in a 137,210-domain study, and Google states Search ignores them. |
| Markdown mirrors and `Accept: text/markdown` | Optional | A vendor capability claim with no server-log evidence and no independent uptake data. |
| Croissant | Optional | Real adopters, but the Structure Layer is genuine extra work and the fit for raw signal data is unestablished. |
| `AGENTS.md` at a site root | Optional | No browsing or search agent is documented as fetching one; the proposals for that use case were never adopted. |

## Revisit

**Reviewed 2026-09-03. Revisit by 2027-03-03, or sooner if any of the following happens.**

This field moves faster than documentation does, and the tiers above are perishable:

- A vendor documents fetching `llms.txt` or negotiating `text/markdown`,
  or a study measures requests for either.
  Either would move an Optional row up, and the Ahrefs study is the number to beat.
- A conversational product documents retrieval from a dataset registry or from
  Google Dataset Search. That would move registries from Recommended to Core.
- A browsing agent is documented as fetching a site-root agent brief under any name.
- Croissant gains a published precedent for raw scientific time-series.
- Any crawler in section 1 begins executing JavaScript,
  which would loosen the strongest constraint on this page.

When a tier moves, move it here first, then in
[`checklist.md`](checklist.md) and the archetype guides, in the same change.
