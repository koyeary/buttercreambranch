import { useQuery } from "@tanstack/react-query";

const api = "http://localhost:3001/api/users";

const fetchUserByPin = async () => {
  const res = await fetch("/api/users");
  console.log(res);
  if (!res.ok) throw new Error("Failed to fetch user data");

  return res.json();
};

export function useUsers() {
  return useQuery({
    queryKey: ["users"],
    queryFn: fetchUserByPin,
  });
}
