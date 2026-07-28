import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const html = await readFile(
  path.join(projectRoot, "standalone", "index.html"),
  "utf8",
);

const response = await fetch(
  "https://mcp-on-edge.edgeone.site/mcp-server",
  {
    method: "POST",
    headers: {
      Accept: "application/json, text/event-stream",
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 7,
      method: "tools/call",
      params: {
        name: "deploy-html",
        arguments: { value: html },
      },
    }),
    signal: AbortSignal.timeout(300_000),
  },
);

const payload = await response.json();

if (!response.ok || payload.error) {
  throw new Error(
    `EdgeOne deployment failed (${response.status}): ${JSON.stringify(payload)}`,
  );
}

const publicUrl = payload.result?.content?.find(
  (item) => item.type === "text",
)?.text;

if (!publicUrl || !/^https:\/\/[^ ]+$/.test(publicUrl)) {
  throw new Error(`EdgeOne returned no public URL: ${JSON.stringify(payload)}`);
}

console.log(publicUrl);
