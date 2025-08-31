const ItemModel = require("../models/Item");
const OrderModel = require("../models/Order");
const { validationResult } = require("express-validator");

exports.createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const result = await OrderModel.createOrder();
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating order", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await OrderModel.getOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await OrderModel.getOrderById(id);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};
exports.updateOrderStatus = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { id, status } = req.body;

  try {
    const result = await OrderModel.updateOrderStatus(id, status);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating order", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.updateOrder = async (req, res) => {
  const { orderData } = req.body;
  try {
    const result = await OrderModel.updateOrder(orderData);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating order", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedOrder = await OrderModel.deleteOrder(id);
    if (deletedOrder) {
      res.status(200).json(deletedOrder);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to delete order" });
  }
};

//module.exports = OrderController;
