const OrderModel = require("../models/Order");
//const { validationResult } = require("express-validator");

exports.createOrder = async (req, res) => {
  try {
    const result = await OrderModel.createOrder(req.body);
    res.status(200).json(result);
  } catch (err) {
    console.error("Error creating order", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch orders" });
  }
};
exports.getOrderById = async (req, res) => {
  const { id } = req.body;
  console.log(id);
  try {
    const order = await OrderModel.getOrderById(id);

    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error. Failed to fetch order" });
  }
};

exports.getOrderByCustomerName = async (req, res) => {
  const { customer_name } = req.body;
  console.log(req.body);

  try {
    const order = await OrderModel.getOrderByCustomerName(customer_name);
    if (order) {
      res.status(200).json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  //const errors = validationResult(req);
  /*   if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } */
  console.log("hit status controller");
  const { id } = req.params;
  const { status } = req.body;
  console.log(id, status);
  try {
    const result = await OrderModel.updateOrderStatus(status, id);

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }
    res.status(200).json(result);
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
