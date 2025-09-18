const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: `${process.env.CONNECTION_STRING}`,
});

const seedLineItems = async () => {
  try {
    await client.connect();

    // Drop + recreate table
    await client.query(`
      DROP TABLE IF EXISTS line_items;
      CREATE TABLE line_items (
  id VARCHAR PRIMARY KEY,
  order_id VARCHAR REFERENCES square(id),
  name VARCHAR,
  quantity INTEGER,
  base_price_money INTEGER
      )`);

    console.log("✅ Line Items table created!");
  } catch (err) {
    console.error("❌ Error creating Line Items table:", err);
  }
};
module.exports = seedLineItems;
