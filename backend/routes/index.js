const express = require("express");
const router = express.Router();
const orderRoutes = require("./api/orders");
const userRoutes = require("./api/users");
const itemRoutes = require("./api/items");

router.use("/api", itemRoutes);
router.use("/api", orderRoutes);
router.use("/api", userRoutes);

module.exports = router;
