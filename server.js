require("dotenv").config();
const express = require("express");
const routes = require("./routes");
const pool = require("./db");
const app = express();
const cors = require("cors");

//Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// API routes
app.use(routes);

// Serve up static assets
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const PORT = process.env.PORT || 3001;
pool
  .connect()
  .then((client) => {
    client.release();
    console.log("✅ Connected to database");
    app.listen(process.env.PORT || 3001, () => {
      console.log(`🌎  ==> API Server now listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed", err);
    process.exit(1);
  });
