const pool = require("../db");

const OrderModel = {
  createOrder: async (orderData) => {
    const {
      id,
      status,
      type,
      size,
      modifications,
      customer_name,
      quantity,
      contact,
      due,
    } = orderData;
    const result = await pool.query(
      "INSERT INTO orders (id, status, type, size, modifications, customer_name, quantity, contact, due) VALUES ($1, $2, $3, $4) RETURNING *",
      [
        id,
        status,
        type,
        size,
        modifications,
        customer_name,
        quantity,
        contact,
        due,
      ]
    );
    return result.rows[0];
  },

  getOrders: async () => {
    const result = await pool.query(
      "SELECT * FROM orders ORDER BY created_at DESC"
    );
    return result.rows;
  },

  getOrderById: async (id) => {
    const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
    return result.rows[0];
  },

  getOrdersByStatus: async (status) => {
    const result = await pool.query(
      "SELECT * FROM orders WHERE status = $1 ORDER BY created_at DESC",
      [status]
    );
    return result.rows;
  },

  getOrdersByCustomerName: async (customer_name) => {
    const result = await pool.query(
      "SELECT * FROM orders WHERE customer_name ILIKE $1 ORDER BY created_at DESC",
      [`%${customer_name}%`]
    );
    return result.rows;
  },

  getOrdersByDateRange: async (start_date, end_date) => {
    const result = await pool.query(
      "SELECT * FROM orders WHERE created_at BETWEEN $1 AND $2 ORDER BY created_at DESC",
      [start_date, end_date]
    );
    return result.rows;
  },

  updateOrderStatus: async (id, status) => {
    const result = await pool.query(
      "UPDATE orders SET status = $1 WHERE id = $2 RETURNING *",
      [status, id]
    );
    return result.rows[0];
  },

  updateOrder: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const {
      status,
      type,
      size,
      modifications,
      customer_name,
      quantity,
      contact,
      due,
    } = req.body;

    try {
      const result = await pool.query(
        `UPDATE orders
       SET status = COALESCE($1, status),
           type = COALESCE($3, type),
           customer_name = COALESCE($2, customer_name),
           size = COALESCE($4, size),
           modifications = COALESCE($5, modifications),
           quantity = COALESCE($6, quantity),
           contact = COALESCE($7, contact),
           due = COALESCE($8, due),
       WHERE id = $7
       RETURNING *`,
        [
          id,
          status,
          type,
          size,
          modifications,
          customer_name,
          quantity,
          contact,
          due,
        ]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({ error: "Order not found" });
      }
      res.json(result.rows[0]);
    } catch (err) {
      console.error("Error updating order", err);
      res.status(500).json({ error: "Server error" });
    }
  },

  deleteOrder: async (id) => {
    const result = await pool.query(
      "DELETE FROM orders WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },
};

module.exports = OrderModel;
