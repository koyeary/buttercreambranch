const pool = require("../db");

const ItemModel = {
  getItem: async (itemData) => {
    const { type } = itemData;
    const result = await pool.query(
      `SELECT * FROM items WHERE type = ${type}`,
      [type]
    );
    return result.rows[0];
  },
  getItemById: async (itemData) => {
    const { id } = itemData;
    const result = await pool.query(`SELECT * FROM items WHERE id = ${id}`, [
      id,
    ]);
    return result.rows[0];
  },
  createItem: async (itemData) => {
    const { type, quantity, next_day } = itemData;
    const result = await pool.query(
      "INSERT INTO items (type, quantity, next_day) VALUES ($1, $2, $3) RETURNING *",
      [type, quantity, next_day]
    );
    return result.rows[0];
  },
  updateItem: async (itemData) => {
    const { type, quantity } = itemData;
    const result = await pool.query(
      `UPDATE items SET quantity = ${quantity} WHERE type = ${type}`,
      [type, quantity]
    );
    return result.rows[0];
  },
  deleteItem: async (itemData) => {
    const { type } = itemData;
    const result = await pool.query(`DELETE FROM orders WHERE type = ${type}`, [
      type,
    ]);
    return result.rows[0];
  },
};

module.exports = ItemModel;
