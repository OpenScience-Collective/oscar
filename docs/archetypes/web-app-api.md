# Archetype: Web app / API

> Maturity: draft. Structure is stable; examples are being expanded.

You have this archetype if you offer an interactive app or a service with an API.
Examples in our ecosystem: HEDit (the HED annotation editor), and OSA itself.
The job here is both **discovery** and **usage**:
an agent must learn the service exists and then call it correctly.

## Why it matters

An interactive app is opaque to an agent that only reads HTML;
the value is behind actions and endpoints.
Expose those actions as a documented, machine-callable interface
and the app becomes something an agent can actually operate.

## Do these, in order of value

1. **Publish an OpenAPI specification** for your HTTP API.
   It is the single most useful artifact: agents and tool frameworks consume it directly,
   with paths, parameters, schemas, and auth all in one place.

2. **Add JSON-LD `SoftwareApplication`** to the app's landing page
   so discovery tools understand what it is, what it costs, and where to start.
   See [`templates/schema-softwareapplication.json`](../../templates/schema-softwareapplication.json).

3. **Expose the core actions via a Model Context Protocol (MCP) server.**
   For HEDit, that might be "suggest HED tags for this description" or "validate this annotation."
   MCP turns a click-through workflow into a callable capability.
   Ship both: OpenAPI for conventional, programmatic integration, and MCP for native agent tool-calling.
   HuggingFace, for instance, runs an official MCP server at huggingface.co/mcp rather than relying on a static file.

4. **State auth and limits plainly** in the docs:
   how to get a key, what the rate limits are, what errors look like.
   An agent that knows the limits backs off; one that does not gets throttled and fails.

5. **Ship a `/llms.txt` and an `AGENTS.md`** pointing at the OpenAPI spec,
   a quickstart, and one worked request-and-response.

6. **Return structured, well-typed responses** with errors that explain themselves.

## Minimum viable setup

An OpenAPI spec plus JSON-LD `SoftwareApplication` on the landing page.

## Pitfalls

- Do not gate the OpenAPI spec behind auth; the description of the door should not need a key.
- Do not describe endpoints in prose only; give the machine-readable spec.
- Treat anything a user typed as untrusted before you reflect it to an agent.
