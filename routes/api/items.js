const express = require("express");
const router = express.Router();
const ItemController = require("../../controllers/itemController");

router.post("/items", ItemController.createItem);
router.get("/items", ItemController.getItems);
router.get("/items/:id", ItemController.getItemById);
router.put("/items/:id", ItemController.updateItem);
router.delete("/items/:id", ItemController.deleteItem);

module.exports = router;
