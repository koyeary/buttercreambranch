import axios from "axios";

export const updateOrderStatus = async ({
  id,
  status,
}: {
  id: string;
  status: string;
}) => {
  console.log(id, status);
  try {
    const res = await axios.put(
      "http://localhost:3001/api/orders/status/update",
      {
        id,
        status,
      }
    );

    return res;
  } catch (err) {
    console.error(err);
  }
};

export const authenticateUser = async (pin: string) => {
  try {
    const res = await axios.post("http://localhost:3001/api/users/pin", {
      pin,
    });

    return res;
  } catch (err) {
    console.error(err);
  }
};
