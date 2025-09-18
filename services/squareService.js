const axios = require("axios");

const SQ_ACCESS_TOKEN = process.env.SQ_ACCESS_TOKEN;

const fetchOrder = async (orderId) => {
  const res = await axios.get(
    `https://connect.squareup.com/v2/orders/${orderId}`,
    {
      headers: {
        Authorization: `Bearer ${SQ_ACCESS_TOKEN}`,
        "Content-Type": "application/json",
      },
    }
  );
  if (!res.ok) throw new Error(`Square API error ${res.status}`);
  const data = await res.json();
  return data.order;
};

module.exports = { fetchOrder };
