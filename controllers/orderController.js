const OrderModel = require("../models/Order");
const { validationResult } = require("express-validator");

exports.createOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { status, customer_name, type, size, quantity, contact } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO orders (status, customer_name, type, size, quantity, contact)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING *`,
      [status || "pending", customer_name, type, size, quantity, contact]
    );
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
exports.updateOrder = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { status, customer_name, type, size, quantity, contact } = req.body;

  try {
    const result = await pool.query(
      `UPDATE orders
       SET status = COALESCE($1, status),
           customer_name = COALESCE($2, customer_name),
           type = COALESCE($3, type),
           size = COALESCE($4, size),
           quantity = COALESCE($5, quantity),
           contact = COALESCE($6, contact),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $7
       RETURNING *`,
      [status, customer_name, type, size, quantity, contact, id]
    );

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
