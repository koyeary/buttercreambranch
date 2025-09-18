const OrderModel = require("../models/Order");
const { listOrders } = require("../services/orderService.js");

exports.createOrder = async (req, res) => {
  console.log(req.body);
  try {
    const result = await OrderModel.createOrder(req.body);
    res.status(200).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Server error" });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await listOrders();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
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

//not working
exports.getOrderById = async (req, res) => {
  console.log(req);
  try {
    const order = await OrderModel.getOrderById(req);

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

exports.getOrdersByStatus = async (req, res) => {
  console.log(req.body);
  const { status } = req.body;
  try {
    const orders = await OrderModel.getOrdersByStatus(status);

    if (orders) {
      res.status(200).json(orders);
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
  console.log("update order status");

  const { id, status } = req.body;
  console.log(req.body);
  try {
    const result = await OrderModel.updateOrderStatus(id, status);

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
  const { id } = req.params;
  console.log(req.body, id);

  try {
    const result = await OrderModel.updateOrder(req, res);

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
    console.log(id);
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
