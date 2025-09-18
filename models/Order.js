const pool = require("../db");

const OrderModel = {
  createOrder: async (orderData) => {
    const {
      orderId,
      due,
      status,
      items,
      size,
      notes,
      quantity,
      price,
      customer_name,
      contact,
      created_at,
    } = orderData;
    const result = await pool.query(
      `INSERT INTO orders (
      orderId,
       due,
      status,
      items,
      size,
      notes,
      quantity,
      price,
      customer_name,
      contact,
      created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [
        orderId,
        due,
        status,
        items,
        size,
        notes,
        quantity,
        price,
        customer_name,
        contact,
        created_at,
      ]
    );

    return result;
  },

  upsertOrder: async (order) => {
    await pool.query(
      `INSERT INTO orders (id, created_at)
     VALUES ($1, $2)
     ON CONFLICT (id) DO UPDATE
     SET customer_name = EXCLUDED.customer_name,
         total = EXCLUDED.total`,
      [order.id, order.created_at]
    );
  },

  getAllOrders: async () => {
    const result = await pool.query(`SELECT * FROM orders ORDER BY due ASC`);

    return result.rows;
  },

  getOrderByCustomerName: async (customer_name) => {
    const result = await pool.query(
      `SELECT * FROM orders WHERE customer_name = $1 `,
      [customer_name]
    );
    return result.rows;
  },

  getOrderById: async (req) => {
    const { id } = req.params;
    const result = await pool.query(`SELECT * FROM orders WHERE id = $1`, [id]);
    return result.rows[0];
  },

  getOrdersByStatus: async (req) => {
    const { status } = req.body;
    console.log("model", status);
    const result = await pool.query(
      `SELECT * FROM orders WHERE status = $1 ORDER BY created_at ASC`,
      [status]
    );
    return result.rows;
  },

  getOrdersByDateRange: async (start_date, end_date) => {
    const result = await pool.query(
      `SELECT * FROM orders WHERE created_at BETWEEN $1 AND $2 ORDER BY created_at DESC`,
      [start_date, end_date]
    );
    return result.rows;
  },

  updateOrderStatus: async (id, status) => {
    const result = await pool.query(
      `UPDATE orders SET status = $2 WHERE id = $1 RETURNING *`,
      [id, status]
    );
    return result;
  },

  updateOrder: async (req, res) => {
    const { id } = req.params;
    //const errors = validationResult(req);
    /*   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } */

    const item = getOrderById(orderId);
    console.log(item);
    console.log(req.params);
    const {
      orderId,
      due,
      status,
      items,
      size,
      notes,
      quantity,
      price,
      customer_name,
      contact,
    } = item;

    try {
      const result = await pool.query(
        `UPDATE orders
      SET

       due = COALESCE($2, due),
           status = COALESCE($3, status),
           items = COALESCE($4, items),
           size = COALESCE($5, size),
           notes = COALESCE($6, notes),
           quantity = COALESCE($7, quantity),
           price = COALESCE($8, price),
           customer_name = COALESCE($9, customer_name),
           contact = COALESCE($10, contact),
       WHERE orderId = $1
       RETURNING *`,
        [
          orderId,
          due,
          status,
          items,
          size,
          notes,
          quantity,
          price,
          customer_name,
          contact,
          id,
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

  deleteOrder: async (req) => {
    const { id } = req.params;
    const result = await pool.query(
      "DELETE FROM orders WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  },
};

module.exports = OrderModel;
