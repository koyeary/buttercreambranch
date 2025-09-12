const express = require("express");
const { listenAllOrders } = require("../../handlers/webhookHandler");
const router = express.Router();

router.get("/webhooks/square", listenAllOrders);
module.exports = router;
