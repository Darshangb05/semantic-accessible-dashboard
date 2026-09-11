import http from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";
import { fileURLToPath } from "node:url";
import { services } from "./data/services.js";

const PORT = process.env.PORT || 3000;

const currentFile =
    fileURLToPath(import.meta.url);

const serverRoot =
    join(currentFile, "../../../");

const clientRoot =
    join(serverRoot, "client");

const contentTypes = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8"
};

function sendJson(response, statusCode, body) {
    response.writeHead(statusCode, {
        "Content-Type": "application/json; charset=utf-8",
        "Cache-Control": "no-store"
    });

    response.end(
        JSON.stringify(body)
    );
}

async function serveStatic(request, response) {
    let requestPath =
        request.url === "/"
            ? "/index.html"
            : request.url;

    requestPath =
        requestPath.split("?")[0];

    const safePath =
        normalize(
            join(clientRoot, requestPath)
        );

    if (!safePath.startsWith(clientRoot)) {
        response.writeHead(403);
        response.end("Forbidden");
        return;
    }

    try {
        const file =
            await readFile(safePath);

        const extension =
            extname(safePath);

        response.writeHead(200, {
            "Content-Type":
                contentTypes[extension] ||
                "application/octet-stream"
        });

        response.end(file);

    } catch {
        response.writeHead(404);
        response.end("Not Found");
    }
}

const server =
    http.createServer(
        async (request, response) => {

            const url =
                new URL(
                    request.url,
                    `http://${request.headers.host}`
                );

            if (
                request.method === "GET" &&
                url.pathname === "/api/health"
            ) {
                sendJson(response, 200, {
                    status: "ok"
                });
                return;
            }

            if (
                request.method === "GET" &&
                url.pathname === "/api/services"
            ) {
                sendJson(response, 200, {
                    data: services
                });
                return;
            }

            if (request.method === "GET") {
                await serveStatic(
                    request,
                    response
                );
                return;
            }

            sendJson(response, 405, {
                error: "Method not allowed"
            });
        }
    );

server.listen(
    PORT,
    () => {
        console.log(
            `Server running at http://localhost:${PORT}`
        );
    }
);

export { server };
