import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const distDir = path.join(projectRoot, "dist");
const publicDir = path.join(projectRoot, "public");
const outputDir = path.join(projectRoot, "standalone");

let html = await readFile(path.join(distDir, "index.html"), "utf8");

const stylesheetMatch = html.match(
  /<link rel="stylesheet" crossorigin href="([^"]+)">/,
);
const scriptMatch = html.match(
  /<script type="module" crossorigin src="([^"]+)"><\/script>/,
);

if (!stylesheetMatch || !scriptMatch) {
  throw new Error("Unable to locate the Vite CSS or JavaScript bundle.");
}

const css = await readFile(
  path.join(distDir, stylesheetMatch[1].replace(/^\//, "")),
  "utf8",
);
const javascript = await readFile(
  path.join(distDir, scriptMatch[1].replace(/^\//, "")),
  "utf8",
);

html = html
  .replace(stylesheetMatch[0], () => `<style>${css}</style>`)
  .replace(
    scriptMatch[0],
    () => `<script type="module">${javascript}</script>`,
  )
  .replace(/\s*<meta property="og:image" content="\/og\.png"\s*\/?>/, "");

const imageAssets = [
  ["assets/rag-console.png", "optimized/rag-console.webp", "image/webp"],
  [
    "assets/supportflow-chat.png",
    "optimized/supportflow-chat.webp",
    "image/webp",
  ],
  [
    "assets/excel-dashboard.png",
    "optimized/excel-dashboard.webp",
    "image/webp",
  ],
  ["assets/mini-preview.png", "optimized/mini-preview.webp", "image/webp"],
];

for (const [referencePath, optimizedPath, mimeType] of imageAssets) {
  const image = await readFile(path.join(publicDir, optimizedPath));
  const dataUrl = `data:${mimeType};base64,${image.toString("base64")}`;
  html = html.replaceAll(`/${referencePath}`, dataUrl);
}

await mkdir(outputDir, { recursive: true });
await writeFile(path.join(outputDir, "index.html"), html, "utf8");

console.log(
  `Standalone HTML created: ${Buffer.byteLength(html, "utf8")} bytes`,
);
