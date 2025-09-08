const pool = require("../db");

const UserModel = {
  getUser: async (userData) => {
    const { pin } = userData;
    console.log(pin);
    const result = await pool.query(`SELECT * FROM users WHERE pin = $1`, [
      pin,
    ]);
    return result.rows[0];
  },
  getAllUsers: async () => {
    const result = await pool.query(`SELECT * FROM users`);
    console.log(result.rows);
    return result.rows;
  },
  getUserByPin: async (userData) => {
    const { pin } = userData;
    const result = await pool.query(`SELECT * FROM users WHERE pin = $1`, [
      pin,
    ]);
    return result.rows[0];
  },
  createUser: async (userData) => {
    const { id, pin, type, name } = userData;
    const result = await pool.query(
      "INSERT INTO users (id, pin, type, name) VALUES ($1, $2, $3, $4) RETURNING *",
      [id, pin, type, name]
    );
    return result.rows[0];
  },
  updateUser: async (userData) => {
    const { pin, id } = userData;
    const result = await pool.query(
      `UPDATE items SET pin = ${pin} WHERE id = ${id}`,
      [pin]
    );
    return result.rows[0];
  },
  deleteUser: async (userData) => {
    const { pin } = userData;
    const result = await pool.query(`DELETE FROM users WHERE pin = ${pin}`, [
      pin,
    ]);
    return result.rows[0];
  },
};

module.exports = UserModel;
