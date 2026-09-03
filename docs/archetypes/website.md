# Archetype: Website / docs site

> Maturity: stable. This is the most common archetype and the best understood.
> Techniques are ordered by tier; see [`../evidence.md`](../evidence.md) for the citations.

You have this archetype if people visit a site or read documentation there.
Examples in our ecosystem: eeglab.org, nemar.org, the annot-garden site, osc.earth.
The job here is almost entirely **discovery**:
help an agent find your best pages and read them cheaply.

## Why it matters

An agent does not render your site.
It fetches the payload and reads the text,
and it burns most of its budget wading through navigation, scripts, and markup before reaching anything useful.
Give it a clean, curated path instead.

The sharpest version of this: **most AI crawlers execute no JavaScript at all.**
An analysis of more than 500 million crawler fetches found zero JavaScript execution
by GPTBot, ClaudeBot, or PerplexityBot; they fetch script files and never run them.
Only Googlebot, Applebot, and bingbot render.
So a fact your page assembles client-side is not badly ranked, it is absent.

## Core: do these first

1. **Add JSON-LD to every page head, server-rendered.**
   At minimum `Organization` and, for a tool, `SoftwareApplication`.
   This is the machine-readable channel search engines and agents already trust,
   and it is the one most AI crawlers can actually see.
   Render it in the Hypertext Markup Language (HTML) your server returns,
   not by client-side script.

2. **Make `robots.txt` welcome the agents you want.**
   Name the AI user-agents explicitly so there is no ambiguity.
   Every token below comes from its own vendor's documentation.
   Stacked `User-agent` lines sharing one rule are valid robots.txt syntax,
   so the whole set fits in one block:

   ```
   User-agent: *
   Allow: /

   User-agent: GPTBot
   User-agent: OAI-SearchBot
   User-agent: ChatGPT-User
   User-agent: ClaudeBot
   User-agent: Claude-SearchBot
   User-agent: Claude-User
   User-agent: PerplexityBot
   User-agent: Google-Extended
   User-agent: Applebot
   User-agent: Applebot-Extended
   User-agent: meta-externalagent
   User-agent: CCBot
   Allow: /

   Sitemap: https://your-tool.org/sitemap.xml
   ```

   The explicit block is redundant under a permissive wildcard,
   and it is still worth writing: it states your policy in the form several vendors' own
   tooling checks for, and it is the file a person reads to learn what you allow.
   The three roles are worth knowing, because you may want to treat them differently:
   a **training** crawler (`GPTBot`, `ClaudeBot`, `CCBot`),
   a **search index** crawler (`OAI-SearchBot`, `Claude-SearchBot`, `PerplexityBot`),
   and a **live user fetch** (`ChatGPT-User`, `Claude-User`).
   `Google-Extended` and `Applebot-Extended` are not crawlers at all;
   they are tokens evaluated against pages already fetched by Googlebot and Applebot,
   which is how you control training and grounding without leaving Search.
   See [`templates/robots.txt`](../../templates/robots.txt) for the annotated version.

   One honest caveat: naming a token states your policy, it does not enforce it.
   Perplexity's own documentation says `Perplexity-User` generally ignores robots.txt
   on live fetches, and Cloudflare documented undeclared user agents fetching pages
   that disallow `PerplexityBot`.

3. **Keep `sitemap.xml` honest** with real `<lastmod>` dates so agents know what changed.
   Drive them from content events, not from your build.
   Bing ties freshness signals directly to how quickly updates reach AI generated answers,
   and Google uses `lastmod` only when it is consistently and verifiably accurate.
   Both ignore `priority` and `changefreq`, so do not spend time on them.

Then, whatever tier you stop at, **link it all from the footer.**
A quiet "For AI agents" link makes the whole setup auditable.
That is principle 2 rather than a technique, so it carries no tier:
it is required at every tier, including if you only ever do the Core items above.

## Recommended: real, but narrower

5. **Signpost your key relations.**
   Add typed `Link` relations, as Hypertext Transfer Protocol (HTTP) headers or HTML `<link>` tags,
   for how to cite the page (`cite-as`), its author, and its license: the FAIR Signposting Profile.
   An agent then gets citation, authorship, and license from a single HEAD request, no scraping.
   Adoption across scholarly repositories is real and verifiable
   (Zenodo, DSpace 7, InvenioRDM, HAL, Pangaea, CKAN),
   and every documented consumer is repository software rather than an AI agent.

## Optional: no-regret, no evidence

6. **Publish `/llms.txt`.**
   A short Markdown index: a title, a one-line summary, then curated links with one-line descriptions.
   Keep it to your genuinely important pages, not a sitemap dump.
   See [`templates/llms.txt`](../../templates/llms.txt).
   Be clear-eyed about why: a study of 137,210 domains found that 97 percent of published
   `llms.txt` files received zero requests in a month,
   and Google states that Search ignores them and that referencing the convention
   was not an endorsement.
   It is a cheap, honest artifact and a good summary of your own site.
   It is not a findability mechanism.

7. **Offer markdown mirrors.**
   Serve a clean `.md` for each page (a `.md` URL or `Accept: text/markdown` negotiation),
   so agents can skip the HTML entirely.
   The efficiency argument is real, and the uptake is unmeasured:
   the vendor documenting the pattern cites no server-log evidence that agents request markdown.
   On a static site, a `.md` URL variant per page is simpler than content negotiation,
   and most static-site generators can emit it at build time.

## Minimum viable setup

If you do only two things: server-render your JSON-LD, and ship an AI-aware `robots.txt`
with a `Sitemap:` line.
That is the pair with documented consumers on both ends.

## Reproducibility

Generate `llms.txt` and the markdown mirrors from your content source at build time.
A hand-edited `llms.txt` drifts out of date within a release or two.

## Pitfalls

- Do not client-render your structured data; an agent doing a plain HTTP GET then sees an empty shell.
  Some major data archives regressed exactly this way.
- Do not dump every URL into `llms.txt`; curate.
- Do not let `llms.txt` say something the page does not.
- Do not hide the link or the file. If it is for agents, it is visible to people.
- Do not treat a `Disallow` line as enforcement; it is a request, and at least one vendor
  documents ignoring it on live fetches.
