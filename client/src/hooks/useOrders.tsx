import { useQuery } from "@tanstack/react-query";

const fetchOrders = async () => {
  const res = await fetch("http://localhost:3001/api/orders");

  if (!res.ok) throw new Error("Failed to fetch order data");

  return res.json();
};

export function useOrders() {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });
}
