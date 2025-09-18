import { SquareClient, SquareEnvironment } from "square";
//import { createOrder } from "../controllers/orderController";
import crypto from "crypto";
import bodyParser from "body-parser";

const SQUARE_WEBHOOK_SIGNATURE_KEY = process.env.SQ_ACCESS_TOKEN;

const verifySquareSignature = (req) => {
  const signature = req.headers["x-square-signature"];
  const body = req.body;
  const url = `https://${req.headers.host}${req.originalUrl}`;

  const hmac = crypto.createHmac("sha1", SQUARE_WEBHOOK_SIGNATURE_KEY);
  hmac.update(url + body);

  const expected = hmac.digest("base64");
  return signature === expected;
};

export const handleWebhook = (req, res) => {
  if (!verifySquareSignature(req)) {
    console.error("⚠️ Invalid Square signature");
    return res.status(403).send("Invalid signature");
  }

  try {
    const event = JSON.parse(req.body.toString());
    console.log("✅ Received Square event:", event.type);

    //create order

    res.status(200).send("OK");
  } catch (err) {
    console.error("Error parsing webhook event:", err);
    res.status(400).send("Bad Request");
  }
};

const client = new SquareClient({
  environment: SquareEnvironment.Sandbox,
  token: "EAAAl--4VCDk9CkrwDu52BvR3qgQPvGYfgQZW4yJY_cx598zpcESeHZ6F7Y4iTiT",
});

export const webhookEvents = async (req, res) => {
  //  const { event_type } = req.body;

  try {
    const results = await client.webhooks.subscriptions.test({
      subscriptionId: "wbhk_e74973e85c7e4f64baa98575efaebb30",
      eventType: "order.created",
    });

    const orderId = results.payload.data.object.order_created.order_id;
    res.send(orderId);

    const details = await fetchOrder(orderId);
    return details;
  } catch (err) {
    console.error(err);
  }
};

const fetchOrder = async (id) => {
  try {
    const order = await client.orders.get({
      orderId: id,
    });

    res.send(order);
  } catch (err) {
    console.error(err);
  }
};

export const paymentTest = async (req, res) => {
  const client = new SquareClient({
    environment: SquareEnvironment.Sandbox,
    token: "EAAAl--4VCDk9CkrwDu52BvR3qgQPvGYfgQZW4yJY_cx598zpcESeHZ6F7Y4iTiT",
  });
  const requestBody = {
    idempotency_key: "{{$guid}}",
    checkout: {
      amount_money: {
        amount: 200,
        currency: "USD",
      },
      payment_options: {
        autocomplete: false,
        accept_partial_authorization: true,
      },
      device_options: {
        device_id: "9fa747a2-25ff-48ee-b078-04381f7c828f",
      },
      order_id: "{{order_id}}",
    },
  };
  try {
    const results = await client.webhooks.subscriptions.test(requestBody);

    results.send(200).json();
  } catch (err) {
    console.error(err);
  }
};
