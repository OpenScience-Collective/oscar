#!/usr/bin/env bun
/**
 * OSCAR NEMAR example: generate a schema.org Dataset JSON-LD and a compact
 * summary.json from a NEMAR metadata record.
 *
 * Usage:
 *   bun run generate-jsonld.ts <dataset-id> --metadata <path/to/nmXXXXXX.json> --out <dir>
 *
 * NEMAR metadata format: { "entry": { "0": { ...fields... } }, "success": true }.
 * This is illustrative; adapt the field mapping to your own metadata source.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const LICENSE_URLS: Record<string, string> = {
  "CC0": "https://creativecommons.org/publicdomain/zero/1.0/",
  "CC-BY-4.0": "https://creativecommons.org/licenses/by/4.0/",
  "CC-BY-SA-4.0": "https://creativecommons.org/licenses/by-sa/4.0/",
  "CC-BY-NC-4.0": "https://creativecommons.org/licenses/by-nc/4.0/",
  "CC-BY-NC-SA-4.0": "https://creativecommons.org/licenses/by-nc-sa/4.0/",
  "CC-BY-NC-ND-4.0": "https://creativecommons.org/licenses/by-nc-nd/4.0/",
};

const MODALITY_LABELS: Record<string, string> = {
  eeg: "Electroencephalography (EEG)",
  meg: "Magnetoencephalography (MEG)",
  ieeg: "Intracranial EEG (iEEG)",
  emg: "Electromyography (EMG)",
};

function arg(flag: string): string | undefined {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : undefined;
}

function licenseUrl(license: string): string | undefined {
  if (!license) return undefined;
  return LICENSE_URLS[license.trim().replace(/\s+/g, "-").toUpperCase()];
}

function extractDois(...texts: string[]): string[] {
  const dois = new Set<string>();
  const re = /10\.\d{4,9}\/[^\s"<>),;]+/g;
  for (const t of texts) for (const m of (t ?? "").matchAll(re)) dois.add(`https://doi.org/${m[0]}`);
  return [...dois];
}

const id = process.argv[2];
if (!id || id.startsWith("--")) {
  console.error("Usage: bun run generate-jsonld.ts <dataset-id> --metadata <path> --out <dir>");
  process.exit(1);
}
const metadataPath = arg("--metadata") ?? `metadata/${id}.json`;
const outDir = arg("--out") ?? `out/${id}`;

const raw = JSON.parse(readFileSync(metadataPath, "utf8"));
const m = raw.entry?.["0"] ?? raw; // support wrapped or flat records

const dataUrl = `https://data.nemar.org/${id}/latest/`;
const landingUrl = `https://nemar.org/dataset/${id}`;
const zarrIndexUrl = `https://zarr.nemar.org/${id}/zarr/index.json`;
const modality = MODALITY_LABELS[(m.modalities ?? "").toLowerCase()] ?? m.modalities ?? undefined;
const citations = extractDois(m.HowToAcknowledge ?? "", m.ReferencesAndLinks ?? "");
const licUrl = licenseUrl(m.License ?? "");
const nonCommercial = (m.License ?? "").toUpperCase().includes("NC");

const jsonld: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Dataset",
  name: m.name,
  identifier: m.DatasetDOI ? `https://doi.org/${m.DatasetDOI}` : undefined,
  // The landing page, not the data host: this is the canonical DOI target.
  url: landingUrl,
  version: m.latestSnapshot || undefined,
  license: licUrl ?? m.License,
  conditionsOfAccess: nonCommercial ? `Non-commercial use only (${m.License}).` : undefined,
  // Google Dataset Search rewards this field; NEMAR data is downloadable without payment.
  isAccessibleForFree: true,
  creator: (m.Authors ?? "")
    .split(",")
    .map((n: string) => ({ "@type": "Person", name: n.trim() }))
    .filter((p: { name: string }) => p.name),
  citation: citations.length ? citations : undefined,
  measurementTechnique: modality,
  includedInDataCatalog: { "@type": "DataCatalog", name: "NEMAR", url: "https://nemar.org" },
  // sameAs, never rel=canonical: this page carries its own DOI, validation status,
  // and access paths, so it is not a duplicate of the upstream record.
  sameAs: m.upstreamUrl || undefined,
  distribution: [
    {
      "@type": "DataDownload",
      name: "BIDS tree",
      contentUrl: dataUrl,
      encodingFormat: "https://bids.neuroimaging.io",
      contentSize: m.byte_size_format || undefined,
      description:
        `Browsable BIDS tree; large files are git-annex blobs on Amazon S3. ` +
        `Install with 'bun add -g nemar-cli' or 'npm install -g nemar-cli'. ` +
        `Download the full dataset with 'nemar dataset download ${id}', or fetch ` +
        `selectively with 'nemar dataset clone ${id}' then 'nemar dataset get <path>'.`,
    },
    // Only when a Zarr serving copy exists for this dataset.
    ...(m.has_zarr
      ? [
          {
            "@type": "DataDownload",
            name: "Zarr serving copy",
            contentUrl: zarrIndexUrl,
            encodingFormat: "application/json",
            description:
              `Derived, latest-only Zarr copy for reading a slice without downloading ` +
              `the dataset. index.json is the mandatory entry point: read contract_base, ` +
              `data_base, and s3_uri from it rather than hardcoding a bucket path.`,
          },
        ]
      : []),
  ],
};

const summary = {
  id,
  name: m.name,
  doi: m.DatasetDOI,
  license: { label: m.License, url: licUrl },
  conditionsOfAccess: jsonld.conditionsOfAccess,
  size: m.byte_size_format,
  participants: m.participants,
  sessions: m.sessionsNum,
  bidsVersion: m.BIDSVersion,
  modality,
  tasks: (m.tasks ?? "").split(",").map((t: string) => t.trim()).filter(Boolean),
  landingUrl,
  dataUrl,
  zarr: m.has_zarr ? { index: zarrIndexUrl, verified: Boolean(m.has_zarr_verified) } : undefined,
  citations,
  download: {
    full: `nemar dataset download ${id}`,
    selective: [`nemar dataset clone ${id}`, `nemar dataset get <path>`],
    install: ["bun add -g nemar-cli", "npm install -g nemar-cli"],
  },
};

// Drop undefined keys for clean output.
const clean = (o: unknown) => JSON.parse(JSON.stringify(o));

await mkdir(outDir, { recursive: true });
await writeFile(join(outDir, "dataset.jsonld"), JSON.stringify(clean(jsonld), null, 2) + "\n");
await writeFile(join(outDir, "summary.json"), JSON.stringify(clean(summary), null, 2) + "\n");
console.log(`Wrote ${join(outDir, "dataset.jsonld")} and ${join(outDir, "summary.json")}`);
