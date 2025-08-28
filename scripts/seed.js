const { Client } = require("pg");

const client = new Client({
  connectionString:
    "postgres://username:password@localhost:5432/your_database_name",
});

const orders = [
  {
    user_id: 1,
    product_id: 2,
    quantity: 3,
    status: "pending",
    created_at: new Date(),
  },
  {
    user_id: 2,
    product_id: 1,
    quantity: 1,
    status: "completed",
    created_at: new Date(),
  },
  {
    user_id: 3,
    product_id: 3,
    quantity: 2,
    status: "shipped",
    created_at: new Date(),
  },
];

async function seedOrders() {
  try {
    await client.connect();
    for (const order of orders) {
      await client.query(
        `INSERT INTO orders (user_id, product_id, quantity, status, created_at)
                 VALUES ($1, $2, $3, $4, $5)`,
        [
          order.user_id,
          order.product_id,
          order.quantity,
          order.status,
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

/* mias_bakery=# CREATE TABLE cake_orders (
    order_number SERIAL PRIMARY KEY,
    cake_type VARCHAR(100) NOT NULL,
    cake_size cake_size NOT NULL,
    due_by_date DATE NOT NULL,
    modifications TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    kds_db=# CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(50) DEFAULT 'pending',
    customer_name VARCHAR(100) NOT NULL,
    type VARCHAR(100) NOT NULL,
    size VARCHAR(50) NOT NULL,
    quantity INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

    , contact VARCHAR(50)
); */
