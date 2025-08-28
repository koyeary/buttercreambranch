const { get } = require("mongoose");
const pool = require("../db");

const OrderModel = {
  async createOrder(orderData) {
    const { customer_name, items, total_price, status } = orderData;
    const result = await pool.query(
      "INSERT INTO orders (customer_name, items, total_price, status) VALUES ($1, $2, $3, $4) RETURNING *",
      [customer_name, items, total_price, status]
    );
    return result.rows[0];
  },

  async getOrders() {
    const result = await pool.query(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );
    return result.rows;
  },

  async getOrderById(id) {
    const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
    return result.rows[0];
  },

  async getOrdersByStatus(status) {
    const result = await pool.query(
      "SELECT * FROM orders WHERE status = $1 ORDER BY created_at DESC",
      [status]
    );
    return result.rows;
  },

  async getOrdersByCustomerName(customer_name) {
    const result = await pool.query(
      "SELECT * FROM orders WHERE customer_name ILIKE $1 ORDER BY created_at DESC",
      [`%${customer_name}%`]
    );
    return result.rows;
  },

  async getOrdersByDateRange(start_date, end_date) {
    const result = await pool.query(
      "SELECT * FROM orders WHERE created_at BETWEEN $1 AND $2 ORDER BY created_at DESC",
      [start_date, end_date]
    );
    return result.rows;
  },

  async updateOrderStatus(id, status) {
    const result = await pool.query(
      "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    return result.rows[0];
  },

  async deleteOrder(id) {
    const result = await pool.query(
      "DELETE FROM orders WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },
};

module.exports = OrderModel;
