import axios from "axios";

export const updateOrder = async (id: number, status: string) => {
  try {
    const res = await axios.put(`api/orders/${id}`, status);

    return res;
  } catch (err) {
    console.error(err);
  }
};
