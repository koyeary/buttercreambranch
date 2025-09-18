const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: `${process.env.CONNECTION_STRING}`,
});

const seedSquare = async () => {
  try {
    await client.connect();

    // Drop + recreate table
    await client.query(`
      DROP TABLE IF EXISTS square;
      CREATE TABLE square (
  id VARCHAR PRIMARY KEY,
  location_id VARCHAR,
  state VARCHAR,
  created_at TIMESTAMP,
  total_money INTEGER
      )`);

    console.log("✅ Square table created!");
  } catch (err) {
    console.error("❌ Error creating Square table:", err);
  }
};

module.exports = seedSquare;
