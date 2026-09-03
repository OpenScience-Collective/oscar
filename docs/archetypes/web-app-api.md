# Archetype: Web app / API

> Maturity: draft. Structure is stable; examples are being expanded.
> Techniques are ordered by tier; see [`../evidence.md`](../evidence.md) for the citations.

You have this archetype if you offer an interactive app or a service with an API.
Examples in our ecosystem: HEDit (the Hierarchical Event Descriptors, or HED, annotation editor),
and OSA itself.
The job here is both **discovery** and **usage**:
an agent must learn the service exists and then call it correctly.

## Why it matters

An interactive app is opaque to an agent that only reads Hypertext Markup Language (HTML);
the value is behind actions and endpoints.
Expose those actions as a documented, machine-callable interface
and the app becomes something an agent can actually operate.

## Core: do these first

1. **Add JSON-LD `SoftwareApplication` to the landing page, server-rendered,**
   so discovery tools understand what it is, what it costs, and where to start.
   See [`templates/schema-softwareapplication.json`](../../templates/schema-softwareapplication.json).
   Render it in the HTML the server returns:
   most AI crawlers execute no JavaScript, and a single-page app shell tells them nothing.

2. **Add an `AGENTS.md` at the repository root** pointing at the specification,
   a quickstart, and one worked request and response.
   The repository-root convention is the best-evidenced agent file there is,
   and it reaches the coding agent that is about to integrate against you.

## Recommended: real, but narrower

3. **Publish an OpenAPI specification** for your Hypertext Transfer Protocol (HTTP) API.
   Agents and tool frameworks consume it directly,
   with paths, parameters, schemas, and auth all in one place,
   and OpenAI's Custom GPT Actions read 3.0.1 and 3.1.0 specifications as they are.
   A vendor benchmark measured a modest gain from supplying a specification to a coding agent,
   mostly in error handling and resilience rather than basic success;
   it was published by an interested party, which is why this sits in Recommended
   rather than Core.
   Generate it from the route definitions you already have, rather than writing it by hand.

4. **Expose the core actions via a Model Context Protocol (MCP) server**
   when agents must drive stateful or authenticated actions.
   For HEDit, that might be "suggest HED tags for this description" or "validate this annotation."
   MCP turns a click-through workflow into a callable capability,
   and its adoption is vendor-broad: OpenAI added client support in March 2025,
   and MCP was donated to a Linux-Foundation-hosted foundation in December 2025.
   The honest ordering is OpenAPI first, MCP when the surface is more than search and read:
   a read-mostly public API gets most of the benefit from the specification alone,
   at a fraction of the cost.
   If you ship both, say which is canonical.

## Optional: no-regret, no evidence

5. **Ship a `/llms.txt`** pointing at the specification, a quickstart,
   and one worked request-and-response.
   Cheap and honest; not a discovery mechanism, on the current evidence.

## Unassessed, and still good practice

6. **State auth and limits plainly** in the docs:
   how to get a key, what the rate limits are, what errors look like.
   An agent that knows the limits backs off; one that does not gets throttled and fails.

7. **Return structured, well-typed responses** with errors that explain themselves.

8. **Offer a machine `/info` or `/.well-known/` descriptor.**
   DANDI is the model to copy: an OpenAPI specification at a stable path
   plus an `/info` endpoint returning service URLs and versions as plain JSON.

9. **Signpost API responses too,** with `Link` headers, not only your HTML pages.
   Signposting itself is Recommended, but the adopters behind that tier are repository
   *landing pages*; extending the same typed relations to JSON API responses
   is a reasonable extrapolation that nobody has measured, so it sits here.

## Minimum viable setup

Server-rendered JSON-LD `SoftwareApplication` on the landing page,
plus a repository-root `AGENTS.md`, then the OpenAPI specification.

## Pitfalls

- Do not gate the OpenAPI spec behind auth; the description of the door should not need a key.
- Do not describe endpoints in prose only; give the machine-readable spec.
- Do not build an MCP server before the OpenAPI document, on a read-mostly API.
  The cheaper artifact has the documented consumer.
- Treat anything a user typed as untrusted before you reflect it to an agent.
- **GraphQL** (as OpenNeuro uses) is fine, but enable introspection and document the endpoint;
  the API, not a client-rendered page, is then the real agent surface.
