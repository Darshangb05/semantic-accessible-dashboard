import test from "node:test";
import assert from "node:assert/strict";
import { spawn } from "node:child_process";

const PORT = 3123;
let serverProcess;

test.before(async () => {
    serverProcess =
        spawn(
            process.execPath,
            ["src/server.js"],
            {
                cwd: new URL(
                    "../server/",
                    import.meta.url
                ),
                env: {
                    ...process.env,
                    PORT: String(PORT)
                },
                stdio: "ignore"
            }
        );

    await new Promise(resolve =>
        setTimeout(resolve, 500)
    );
});

test.after(() => {
    serverProcess?.kill();
});

test("health endpoint returns ok", async () => {
    const response =
        await fetch(
            `http://localhost:${PORT}/api/health`
        );

    assert.equal(response.status, 200);

    const body =
        await response.json();

    assert.equal(body.status, "ok");
});

test("services endpoint returns service data", async () => {
    const response =
        await fetch(
            `http://localhost:${PORT}/api/services`
        );

    assert.equal(response.status, 200);

    const body =
        await response.json();

    assert.ok(Array.isArray(body.data));
    assert.ok(body.data.length > 0);
});
