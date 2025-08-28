const express = require("express");
const router = express.Router();
const orderRoutes = require("./api/orders");

router.use("/api", orderRoutes);

module.exports = router;
