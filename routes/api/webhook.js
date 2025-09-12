const express = require("express");
const { payment } = require("../../handlers/webhookHandler");
const router = express.Router();

router.get("/webhooks/square", payment);
module.exports = router;
