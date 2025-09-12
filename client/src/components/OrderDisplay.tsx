"use client";
import { useOrders } from "@/hooks/useOrders";
import DashboardCard from "./DashboardCard";

interface Order {
  id: number;
  due: Date;
  status: string;
  items: string;
  size: string;
  notes: string;
  quantity: number;
  price: number;
  customer_name: string;
  contact: string;
  created_at: Date;
}

const formatDate = (due) => {
  const date = new Date(due);
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${month}/${day} ${hours}:${minutes}`;
};

const OrderDisplay = () => {
  const { data, isLoading, isError } = useOrders();

  if (isLoading) return <p>Loading orders...</p>;
  if (isError) return <p>Failed to load orders.</p>;

  const pending = data.filter((order: Order) => order.status === "pending");
  const ready = data.filter((order: Order) => order.status === "ready");
  const complete = data.filter((order: Order) => order.status === "complete");

  return (
    <div className="grid grid-cols-2 gap-6">
      {/* New Orders Column */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Pending</h3>
          {/*     <Badge variant="secondary">4</Badge> */}
        </div>
        <div className="space-y-3">
          {pending.map((order: Order) => (
            <DashboardCard
              key={order.id}
              order={order}
              formatDate={formatDate}
              status="pending"
            />
          ))}
        </div>
      </div>

      {/* In Progress Column */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Ready</h3>
          {/*  <Badge variant="secondary">3</Badge>  */}
        </div>
        <div className="space-y-3">
          {ready.map((order: Order) => (
            <DashboardCard
              key={order.id}
              order={order}
              formatDate={formatDate}
              status="ready"
            />
          ))}
        </div>
      </div>

      {/* Complete Column */}
      {/*     <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Completed</h3>
                <Badge variant="secondary">2</Badge>  
        </div>
        <div className="space-y-3">
          {complete.map((order: Order) => (
            <DashboardCard
              key={order.id}
              order={order}
              formatDate={formatDate}
              status="complete"
            />
          ))}
        </div>
      </div> */}
    </div>
  );
};

export default OrderDisplay;
