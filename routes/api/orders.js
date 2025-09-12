const express = require("express");
const router = express.Router();

const {
  createOrder,
  getAllOrders,
  getOrderByCustomerName,
  getOrderById,
  updateOrder,
  updateOrderStatus,
  deleteOrder,
} = require("../../controllers/orderController");

// GET
router.get("/orders", getAllOrders); //Get all orders

// POST
router.post("/orders/create", createOrder); //Create order
router.post("/orders/name", getOrderByCustomerName); //Retrieve orders by customer name
router.post("/orders/id", getOrderById); // Retrieve order by ID

// PUT
router.put("/orders/", updateOrder); //Update single order
router.put("/orders/status/:id", updateOrderStatus); //Update order status

// DELETE
router.delete("/orders", deleteOrder); //Delete order(s)

module.exports = router;
