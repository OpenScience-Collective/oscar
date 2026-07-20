# Archetype: Website / docs site

> Maturity: stable. This is the most common archetype and the best understood.

You have this archetype if people visit a site or read documentation there.
Examples in our ecosystem: eeglab.org, nemar.org, the annot-garden site, osc.earth.
The job here is almost entirely **discovery**:
help an agent find your best pages and read them cheaply.

## Why it matters

An agent does not render your site.
It fetches the payload and reads the text,
and it burns most of its budget wading through navigation, scripts, and markup before reaching anything useful.
Give it a clean, curated path instead.

## Do these, in order of value

1. **Publish `/llms.txt`.**
   A short Markdown index: a title, a one-line summary, then curated links with one-line descriptions.
   Keep it to your genuinely important pages, not a sitemap dump.
   See [`templates/llms.txt`](../../templates/llms.txt).

2. **Make `robots.txt` welcome the agents you want.**
   Name the AI user-agents explicitly so there is no ambiguity.
   See [`templates/robots.txt`](../../templates/robots.txt).

3. **Add JSON-LD to every page head.**
   At minimum `Organization` and, for a tool, `SoftwareApplication`.
   This is the machine-readable channel search engines and agents already trust.

4. **Offer markdown mirrors.**
   Serve a clean `.md` for each page (a `.md` URL or `Accept: text/markdown` negotiation),
   so agents can skip the HTML entirely.
   Many static-site generators can emit these at build time.

5. **Keep `sitemap.xml` honest** with real `<lastmod>` dates so agents know what changed.

6. **Link it all from the footer.**
   A quiet "For AI agents" link to `/llms.txt` makes the whole setup auditable.

## Minimum viable setup

If you do only two things: ship `/llms.txt` and an AI-aware `robots.txt`.
That alone moves you from "noise" to "curated."

## Reproducibility

Generate `llms.txt` and the markdown mirrors from your content source at build time.
A hand-edited `llms.txt` drifts out of date within a release or two.

## Pitfalls

- Do not dump every URL into `llms.txt`; curate.
- Do not let `llms.txt` say something the page does not.
- Do not hide the link or the file. If it is for agents, it is visible to people.
