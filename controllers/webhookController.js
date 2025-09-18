const { saveOrderFromSquare } = require("../services/orderService.js");

/* exports.handleSquareWebhook = async (req, res) => {
  try {
    const event = req.body;

    if (event.type === "order.created" || event.type === "order.updated") {
      const orderId = event.data.object.order.id;
      await saveOrderFromSquare(orderId);
      console.log("✅ Order saved from webhook:", orderId);
    }

    return res.status(200).send("OK");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
}; */

exports.handleSquareWebhook = async (req, res) => {
  const { data } = req.body;

  if (data.type === "order" && data.object.order_created) {
    const orderId = data.object.order_created.order_id;

    // Fetch full order details including line items
    try {
      const response = await squareClient.ordersApi.retrieveOrder(orderId);
      const fullOrder = response.result.order;

      // Now you have access to line_items
      const lineItems = fullOrder.lineItems;
      console.log("Line Items:", lineItems);
      // Store in your PostgreSQL database
      await storeOrderInDatabase(fullOrder);
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  }

  res.status(200).send("OK");
};

async function storeOrderInDatabase(order) {
  // Implement your logic to store the order in PostgreSQL
  console.log("Storing order in database:", order);
}
