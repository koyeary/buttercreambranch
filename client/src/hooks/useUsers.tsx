import { useQuery } from "@tanstack/react-query";

const fetchUserByPin = async () => {
  const res = await fetch("http://localhost:3001/api/users");

  if (!res.ok) throw new Error("Failed to fetch user data");

  return res.json();
};

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUserByPin,
  });
}
