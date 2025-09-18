const express = require("express");
const router = express.Router();
const ItemController = require("../../controllers/itemController");

// GET
router.get("/items", ItemController.getAllItems);

// POST
router.post("/items", ItemController.createItem);
router.post("/items/id", ItemController.getItemById);

// PUT
router.put("/items/update_quantity", ItemController.updateItemQuantity);

// DELETE
router.delete("/items/delete", ItemController.deleteItem);

module.exports = router;
