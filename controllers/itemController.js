const ItemModel = require("../models/Item");

exports.getAllItems = async (req, res) => {
  try {
    const result = await ItemModel.getAllItems();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
exports.getItemById = async (req, res) => {
  try {
    const result = await ItemModel.getItemById(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.createItem = async (req, res) => {
  try {
    const result = await ItemModel.createItem(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateItemQuantity = async (req, res) => {
  try {
    const result = await ItemModel.updateItemQuantity(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteItem = async (req, res) => {
  try {
    const result = await ItemModel.deleteItem(req.body);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
};
