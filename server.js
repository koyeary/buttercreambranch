require("dotenv").config();
const express = require("express");
const next = require("next");
const cors = require("cors");
const routes = require("./routes");

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev, dir: "./client" });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Middleware
  server.use(express.urlencoded({ extended: true }));
  server.use(express.json());
  server.use(cors());

  // API routes
  server.use("/api", routes);

  // Everything else handled by Next.js
  server.all("*", (req, res) => handle(req, res));

  const port = process.env.PORT || 3000;
  server.listen(port, () => console.log(`Server ready on port ${port}`));
});
