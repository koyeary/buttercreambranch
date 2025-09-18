const { fetchOrder } = require("./squareService.js");
const { upsertOrder, getAllOrders } = require("../models/Order.js");

const saveOrderFromSquare = async (orderId) => {
  const order = await fetchOrder(orderId);
  await upsertOrder(order);
};

const listOrders = async () => {
  return await getAllOrders();
};

module.exports = { saveOrderFromSquare, listOrders };
