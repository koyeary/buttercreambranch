const pool = require("../db");

const ItemModel = {
  getAllItems: async () => {
    const result = await pool.query("SELECT * FROM inventory");
    console.log(result.rows);
    return result.rows;
  },

  getItemById: async (itemData) => {
    const { id } = itemData;
    const result = await pool.query(`SELECT * FROM inventory WHERE id = $1`, [
      id,
    ]);
    return result.rows[0];
  },

  createItem: async (itemData) => {
    const { name, size, quantity } = itemData;

    const result = await pool.query(
      "INSERT INTO inventory (name, size, quantity) VALUES ($1, $2, $3) RETURNING *",
      [name, size, quantity]
    );
    return result.rows[0];
  },
  updateItemQuantity: async (itemData) => {
    const { quantity, id } = itemData;
    const result = await pool.query(
      `UPDATE inventory SET quantity = $1 WHERE id = $2`,
      [quantity, id]
    );

    return `${result.command}: Quantity updated to ${quantity} on item id ${id}`;
  },
  deleteItem: async (itemData) => {
    const { id } = itemData;
    const result = await pool.query(`DELETE FROM inventory WHERE id = $1`, [
      id,
    ]);
    return `${result.command}: Item id ${id} deleted`;
  },
};

module.exports = ItemModel;
