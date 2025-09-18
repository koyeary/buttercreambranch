require("dotenv").config();
const express = require("express");
const next = require("next");
const cors = require("cors");
const pool = require("./db");
const routes = require("./routes");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./client" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(cors());

  // 📝 Log every request
  server.use((req, res, nextMiddleware) => {
    console.log(`[${req.method}] ${req.url}`);
    nextMiddleware();
  });

  pool.connect();

  // ✅ API routes FIRST
  server.use(
    "/api",
    (req, res, nextMiddleware) => {
      console.log("→ Handling with Express API");
      nextMiddleware();
    },
    routes
  );

  // ✅ Next.js catch-all LAST
  server.all(/.*/, (req, res) => {
    console.log("→ Handling with Next.js");
    return handle(req, res);
  });

  const port = process.env.PORT || 3000;
  server.listen(port, () => console.log(`Server running on port ${port}`));
});
