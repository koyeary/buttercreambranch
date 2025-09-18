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

  server.use("/api", routes); // Express API
  server.all(/.*/, (req, res) => handle(req, res)); // Next.js fallback

  const port = process.env.PORT || 3000;
  server.listen(port, () => console.log(`Server running on port ${port}`));
});
