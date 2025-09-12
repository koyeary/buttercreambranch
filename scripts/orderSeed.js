const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: `${process.env.CONNECTION_STRING}`,
});

const statuses = ["pending", "ready", "complete"];
const sizes = ['7"', '8"', '10"', "QS", "HS", "FS"];
const cakeTypes = [
  "Tres Leches",
  "Strawberry Shortcake",
  "Brooklyn Blackout",
  "Red Velvet",
  "Lemon Blueberry",
  "Vintage Heart Cake",
  "Vintage White Cake",
  "Chocolate Mousse Cake",
  "Fruit Napolean Cake",
  "Rainbow Cake",
  "Chocolate Fudge Cake",
  "Tiramisu",
  "Oreo Cake",
  "Salted Caramel Cake",
  "Carrot Cake",
  "Chocolate Layer Cake",
  "7 Layer Cake",
  "Peach Raspberry Cake",
  "Burnt Almond Cake",
  "Nutella Cake",
  "Black Forest Cake",
  "Coconut Cake",
  "Vanilla Bean Cake",
  "German Chocolate Cake",
  "Girl Gender Reveal",
  "Boy Gender Reveal",
  "Pink & Blue Rosette",
  "Girl or Boy",
];

const firstNames = [
  "Alice",
  "Bob",
  "Catherine",
  "Daniel",
  "Ella",
  "Frank",
  "Grace",
  "Henry",
  "Isabella",
  "Jack",
];
const lastNames = [
  "Johnson",
  "Smith",
  "Lee",
  "Perez",
  "Brown",
  "White",
  "Kim",
  "Lopez",
  "Green",
  "Wilson",
];

const randomContact = (first, last) => {
  if (Math.random() > 0.5) {
    return `${first.toLowerCase()}.${last.toLowerCase()}@example.com`;
  }
  return `(${Math.floor(Math.random() * 900 + 100)})-${Math.floor(
    Math.random() * 900 + 100
  )}-${Math.floor(Math.random() * 9000 + 1000)}`;
};

const randomPrice = () => {
  return Math.floor(Math.random() * 8000 + 100) / 100;
};

const seedOrders = async () => {
  try {
    await client.connect();

    // Drop + recreate table
    await client.query(`
      DROP TABLE IF EXISTS orders;
      CREATE TABLE orders (
        id SERIAL PRIMARY KEY,
        due TIMESTAMP,
        status VARCHAR(20) NOT NULL,
        items VARCHAR(100) NOT NULL,
        size VARCHAR(10) NOT NULL,
        notes TEXT,
        quantity INT NOT NULL,
        price NUMERIC(8, 2),
        customer_name VARCHAR(100) NOT NULL,
        contact VARCHAR(50) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      CREATE INDEX idx_orders_status ON orders(status);
      CREATE INDEX idx_orders_due ON orders(due);
    `);

    // Insert 50 seed rows
    for (let i = 0; i < 50; i++) {
      const first = firstNames[Math.floor(Math.random() * firstNames.length)];
      const last = lastNames[Math.floor(Math.random() * lastNames.length)];
      const customerName = `${first} ${last}`;
      const items = cakeTypes[Math.floor(Math.random() * cakeTypes.length)];
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const quantity = Math.floor(Math.random() * 5) + 1;
      const price = randomPrice();
      const notesOptions = [
        null,
        "Extra frosting",
        "No nuts",
        "Gluten-free",
        "Birthday message",
      ];
      const notes =
        notesOptions[Math.floor(Math.random() * notesOptions.length)];
      const contact = randomContact(first, last);
      const due = new Date(
        Date.now() + Math.floor(Math.random() * 7 + 1) * 24 * 60 * 60 * 1000
      );

      await client.query(
        `INSERT INTO orders (due, status, items, size, notes, quantity, price, customer_name, contact)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`,
        [
          due,
          status,
          items,
          size,
          notes,
          quantity,
          price,
          customerName,
          contact,
        ]
      );
    }

    console.log("✅ Seed data inserted into orders");
  } catch (err) {
    console.error("❌ Error seeding orders", err);
  } finally {
    await client.end();
  }
};

module.exports = seedOrders;
