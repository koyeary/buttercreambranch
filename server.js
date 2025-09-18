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
/* 
require("dotenv").config();
const express = require("express");
const routes = require("./routes");
//const pool = require("./db");
const app = express();
const cors = require("cors");

//Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
app.use(routes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}`);
}); */
