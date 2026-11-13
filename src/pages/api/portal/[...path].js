import https from "https";
import http from "http";

const BACKEND =
  process.env.PORTAL_BACKEND_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://localhost:3000";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: "4mb"
    }
  }
};

function proxyRequest(url, method, headers, body) {
  return new Promise((resolve, reject) => {
    const lib = url.protocol === "https:" ? https : http;
    const options = {
      method,
      hostname: url.hostname,
      port: url.port || (url.protocol === "https:" ? 443 : 80),
      path: `${url.pathname}${url.search}`,
      headers,
      rejectUnauthorized: false
    };

    const upstream = lib.request(options, response => {
      const chunks = [];
      response.on("data", chunk => chunks.push(chunk));
      response.on("end", () => {
        resolve({
          status: response.statusCode || 502,
          headers: response.headers,
          body: Buffer.concat(chunks).toString("utf8")
        });
      });
    });

    upstream.on("error", reject);
    if (body) upstream.write(body);
    upstream.end();
  });
}

export default async function handler(req, res) {
  const parts = req.query.path;
  const subPath = Array.isArray(parts) ? parts.join("/") : parts || "";
  const url = new URL(`/portal/${subPath}`, BACKEND);

  if (req.url?.includes("?")) {
    url.search = req.url.split("?")[1];
  }

  const headers = {};
  if (req.headers.authorization) {
    headers.authorization = req.headers.authorization;
  }
  if (req.headers.cookie) {
    headers.cookie = req.headers.cookie;
  }

  const method = req.method || "GET";
  const hasBody = method !== "GET" && method !== "HEAD";
  const body = hasBody ? JSON.stringify(req.body ?? {}) : undefined;
  if (hasBody) {
    headers["content-type"] = "application/json";
    headers["content-length"] = Buffer.byteLength(body || "");
  }

  try {
    const upstream = await proxyRequest(url, method, headers, body);
    res.status(upstream.status);
    if (upstream.headers["content-type"]) {
      res.setHeader("content-type", upstream.headers["content-type"]);
    }
    res.send(upstream.body);
  } catch (err) {
    res.status(502).json({
      status: 502,
      message: `Backend unreachable at ${BACKEND}. Start origins-backend on port 3000. (${err.message})`,
      data: []
    });
  }
}
