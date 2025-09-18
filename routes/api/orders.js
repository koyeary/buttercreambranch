const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrdersByStatus,
  getOrderByCustomerName,
  getOrderById,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../../controllers/orderController");

// GET
router.get("/orders", getAllOrders); //Get all orders
router.get("/orders/get_one/:id", getOrderById); // Retrieve order by ID

// POST
router.post("/orders/create", createOrder); //Create order
router.post("/orders/name", getOrderByCustomerName); //Retrieve orders by customer name

//router.post("/orders/status", getOrdersByStatus); // Retrieve orders by Status

// PUT
//router.put("/orders/:id", updateOrder); //Update single order
router.put("/orders/status/update", updateOrderStatus); //Update order status

// DELETE
router.delete("/orders/:id", deleteOrder); //Delete order(s)

module.exports = router;
