import { SquareClient, SquareEnvironment } from "square";

export const listenAllOrders = async () => {
  const client = new SquareClient({
    environment: SquareEnvironment.Sandbox,
    token: "EAAAl--4VCDk9CkrwDu52BvR3qgQPvGYfgQZW4yJY_cx598zpcESeHZ6F7Y4iTiT",
  });
  const res = await client.orders.create({
    idempotencyKey: "c7f7a7e5-3a45-428d-a8d4-09d3ed63ab85",
    order: {
      locationId: "LV4HES3Z503DS",
    },
  });
  console.log(res);
};

/* 
exports.payment = async () => {
  const client = new Client({ token: `${process.env.SQ_ACCESS_TOKEN}` });
  await client.payments.create({
    sourceId: "ccof:GaJGNaZa8x4OgDJn4GB",
    idempotencyKey: "7b0f3ec5-086a-4871-8f13-3c81b3875218",
    autocomplete: true,
    customerId: "W92WH6P11H4Z77CTET0RNTGFW8",
    locationId: "L75YCADBXXDEQ",
    referenceId: "123456",
    note: "Brief description",
  });
}; */
