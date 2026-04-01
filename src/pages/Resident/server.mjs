// Tiny static server for the resident frontend.
// This lets the modular ES-module frontend run from http://localhost
// without adding any extra dependencies or frameworks.

import { createReadStream, existsSync } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, join, normalize } from "node:path";
import { cwd, env } from "node:process";

const PORT = Number(env.PORT || 4173);
const ROOT = cwd();

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8"
};

function resolvePath(urlPathname) {
  const decodedPath = decodeURIComponent(urlPathname.split("?")[0]);
  const safePath = normalize(decodedPath).replace(/^(\.\.[/\\])+/, "");
  const requestedPath = !safePath || safePath === "/" || safePath === "\\"
    ? "index.html"
    : safePath.replace(/^[/\\]+/, "");
  return join(ROOT, requestedPath);
}

const server = createServer(async (request, response) => {
  const filePath = resolvePath(request.url || "/");

  try {
    const fileStats = await stat(filePath);

    if (fileStats.isDirectory()) {
      response.writeHead(302, { Location: "/" });
      response.end();
      return;
    }

    response.writeHead(200, {
      "Content-Type": MIME_TYPES[extname(filePath)] || "application/octet-stream"
    });

    createReadStream(filePath).pipe(response);
  } catch {
    if (existsSync(join(ROOT, "index.html"))) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      response.end("File not found.");
      return;
    }

    response.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("index.html is missing from the project root.");
  }
});

server.listen(PORT, () => {
  console.log(`Barangay resident portal running at http://localhost:${PORT}`);
});
