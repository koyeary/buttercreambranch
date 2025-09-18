const express = require("express");
const router = express.Router();
const { handleSquareWebhook } = require("../../controllers/webhookController");

router.post("/webhooks/square", handleSquareWebhook);

module.exports = router;
