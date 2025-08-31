const { Client } = require("pg");

const client = new Client({
  connectionString: `postgres://postgres:@1noORd3en@localhost:5432/kds_db`,
});

const orders = [
  {
    id: 1,
    status: "pending",
    type: "Chocolate Cake",
    size: '10"',
    modifications: "Extra frosting",
    customer_name: "Alice Johnson",
    quantity: 1,
    contact: "212-555-5555",
    due: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Due in one week
    created_at: new Date(),
  },
  {
    id: 2,
    status: "ready",
    type: "Vanilla Cupcakes",
    size: "QS",
    modifications: "Gluten-free",
    customer_name: "Bob Smith",
    quantity: 12,
    contact: "646-555-5555",
    due: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // Due in three days
    created_at: new Date(),
  },
  {
    id: 3,
    status: "complete",
    type: "Red Velvet Cake",
    size: '8"',
    modifications: "No nuts",
    customer_name: "Cathy Lee",
    quantity: 1,
    contact: "917-555-5555",
    due: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000), // Due in four days
    created_at: new Date(),
  },
  {
    id: 4,
    status: "pending",
    type: "Lemon Tart",
    size: '7"',
    modifications: "Extra lemon zest",
    customer_name: "David Kim",
    quantity: 2,
    contact: "718-555-5555",
    due: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), // Due in five days
    created_at: new Date(),
  },
  {
    id: 5,
    status: "ready",
    type: "Carrot Cake",
    size: '10"',
    modifications: "Cream cheese frosting",
    customer_name: "Eva Green",
    quantity: 1,
    contact: "212-555-1234",
    due: new Date(Date.now() + 6 * 24 * 60 * 60 * 1000), // Due in six days
    created_at: new Date(),
  },
];

async function seedOrders() {
  try {
    await client.connect();
    await client.query("DROP TABLE IF EXISTS orders");
    console.log("Cleared existing orders");

    await client.query(`
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        status VARCHAR(20) NOT NULL,
        type VARCHAR(100) NOT NULL,
        size VARCHAR(10) NOT NULL,
        modifications TEXT,
        customer_name VARCHAR(100) NOT NULL,
        quantity INT NOT NULL,
        contact VARCHAR(50) NOT NULL,
        due TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    console.log("Created orders table");
    for (const order of orders) {
      await client.query(
        `INSERT INTO orders (id, status, type, size, modifications, customer_name, quantity, contact, due, created_at)
                 VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)`,
        [
          order.id,
          order.status,
          order.type,
          order.size,
          order.modifications,
          order.customer_name,
          order.quantity,
          order.contact,
          order.due,
          order.created_at,
        ]
      );
    }

    console.log("Seeded orders table!");
  } catch (err) {
    console.error("Error seeding orders:", err);
  } finally {
    await client.end();
  }
}

seedOrders();
module.exports = seedOrders;
