const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: `${process.env.CONNECTION_STRING}`,
});

const inventory = [
  { name: "Tres Leches", size: '7"', quantity: 14 },
  { name: "Tres Leches", size: '8"', quantity: 12 },
  { name: "Tres Leches", size: '10"', quantity: 6 },
  { name: "Tres Leches", size: "QS", quantity: 4 },
  { name: "Tres Leches", size: "HS", quantity: 3 },
  { name: "Tres Leches", size: "FS", quantity: 2 },

  { name: "Strawberry Shortcake", size: '7"', quantity: 13 },
  { name: "Strawberry Shortcake", size: '8"', quantity: 11 },
  { name: "Strawberry Shortcake", size: '10"', quantity: 5 },
  { name: "Strawberry Shortcake", size: "QS", quantity: 3 },
  { name: "Strawberry Shortcake", size: "HS", quantity: 2 },
  { name: "Strawberry Shortcake", size: "FS", quantity: 1 },

  { name: "Brooklyn Blackout", size: '7"', quantity: 15 },
  { name: "Brooklyn Blackout", size: '8"', quantity: 12 },
  { name: "Brooklyn Blackout", size: '10"', quantity: 7 },
  { name: "Brooklyn Blackout", size: "QS", quantity: 4 },
  { name: "Brooklyn Blackout", size: "HS", quantity: 3 },
  { name: "Brooklyn Blackout", size: "FS", quantity: 2 },

  { name: "Red Velvet", size: '7"', quantity: 14 },
  { name: "Red Velvet", size: '8"', quantity: 13 },
  { name: "Red Velvet", size: '10"', quantity: 6 },
  { name: "Red Velvet", size: "QS", quantity: 4 },
  { name: "Red Velvet", size: "HS", quantity: 2 },
  { name: "Red Velvet", size: "FS", quantity: 1 },

  { name: "Lemon Blueberry", size: '7"', quantity: 12 },
  { name: "Lemon Blueberry", size: '8"', quantity: 10 },
  { name: "Lemon Blueberry", size: '10"', quantity: 5 },
  { name: "Lemon Blueberry", size: "QS", quantity: 3 },
  { name: "Lemon Blueberry", size: "HS", quantity: 2 },
  { name: "Lemon Blueberry", size: "FS", quantity: 1 },

  { name: "Chocolate Mousse", size: '7"', quantity: 13 },
  { name: "Chocolate Mousse", size: '8"', quantity: 11 },
  { name: "Chocolate Mousse", size: '10"', quantity: 6 },
  { name: "Chocolate Mousse", size: "QS", quantity: 4 },
  { name: "Chocolate Mousse", size: "HS", quantity: 3 },
  { name: "Chocolate Mousse", size: "FS", quantity: 2 },

  { name: "Rainbow", size: '7"', quantity: 12 },
  { name: "Rainbow", size: '8"', quantity: 9 },
  { name: "Rainbow", size: '10"', quantity: 4 },
  { name: "Rainbow", size: "QS", quantity: 2 },
  { name: "Rainbow", size: "HS", quantity: 2 },
  { name: "Rainbow", size: "FS", quantity: 1 },

  { name: "Carrot Cake", size: '7"', quantity: 15 },
  { name: "Carrot Cake", size: '8"', quantity: 13 },
  { name: "Carrot Cake", size: '10"', quantity: 7 },
  { name: "Carrot Cake", size: "QS", quantity: 5 },
  { name: "Carrot Cake", size: "HS", quantity: 3 },
  { name: "Carrot Cake", size: "FS", quantity: 2 },

  { name: "Funfetti", size: '7"', quantity: 11 },
  { name: "Funfetti", size: '8"', quantity: 9 },
  { name: "Funfetti", size: '10"', quantity: 4 },
  { name: "Funfetti", size: "QS", quantity: 3 },
  { name: "Funfetti", size: "HS", quantity: 2 },
  { name: "Funfetti", size: "FS", quantity: 1 },
];

async function seedInventory() {
  try {
    await client.connect();
    console.log("client connected");
    await client.query("DROP TABLE IF EXISTS inventory");
    console.log("Cleared existing inventory");

    await client.query(`
      CREATE TABLE inventory (
      id SERIAL PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        size VARCHAR(10) NOT NULL,
        quantity INT NOT NULL
      )
    `);

    console.log("Created inventory table");
    for (const item of inventory) {
      await client.query(
        `INSERT INTO inventory (name, size, quantity)
                 VALUES ($1, $2, $3)`,
        [item.name, item.size, item.quantity]
      );
    }

    console.log("Seeded items table!");
  } catch (err) {
    console.error("Error seeding items:", err);
  } finally {
    await client.end();
  }
}

module.exports = seedInventory;
