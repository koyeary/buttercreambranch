require("dotenv").config();
const express = require("express");
const next = require("next");
const routes = require("./routes");

const dev = process.env.NODE_ENV !== "production";
const nextApp = next({ dev, dir: "./client" });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(() => {
  const server = express();

  // Middleware
  server.use(express.json());
  server.use(express.urlencoded({ extended: true }));

  // Logging for debugging
  server.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });

  // API routes
  server.use("/api", routes);

  // Next.js catch-all (must be last)
  server.all(/.*/, (req, res) => handle(req, res));

  const port = process.env.PORT || 3001;
  server.listen(port, () => {
    console.log(`🚀 Server ready on http://localhost:${port}`);
  });
});
