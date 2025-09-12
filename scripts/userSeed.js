const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
  connectionString: `${process.env.CONNECTION_STRING}`,
});

const users = [
  {
    id: 1,
    pin: "8085",
    type: "admin",
    name: "Katherine Yeary-Rantala",
  },
  {
    id: 2,
    pin: "2951",
    type: "FOH",
    name: "Chase Elder",
  },
  {
    id: 3,
    pin: "3967",
    type: "BOH",
    name: "Bryan Christensen",
  },
];
async function seedUsers() {
  try {
    await client.connect();
    await client.query("DROP TABLE IF EXISTS users");
    console.log("Cleared existing users");

    await client.query(`
      CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        pin VARCHAR(4) NOT NULL,
        type VARCHAR(100) NOT NULL,
        name VARCHAR(100) NOT NULL
      )
    `);

    console.log("Created users table");
    for (const user of users) {
      await client.query(
        `INSERT INTO users (id, pin, type, name)
                 VALUES ($1, $2, $3, $4)`,
        [user.id, user.pin, user.type, user.name]
      );
    }

    console.log("Seeded users table!");
  } catch (err) {
    console.error("Error seeding users:", err);
  } finally {
    await client.end();
  }
}

module.exports = seedUsers;
