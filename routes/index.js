const express = require("express");
const router = express.Router();
const orderRoutes = require("./api/orders");
const userRoutes = require("./api/users");
const itemRoutes = require("./api/items");
const webhookRoutes = require("./api/webhook");

router.use("/api", itemRoutes);
router.use("/api", orderRoutes);
router.use("/api", userRoutes);
router.use("/api", webhookRoutes);

module.exports = router;
