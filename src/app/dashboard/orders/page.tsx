"use client";

import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "./components/columns";
import { useState } from "react";
import { useOrders } from "@/hooks/use-orders";

export default function OrdersPage() {
  const [businessId] = useState<string | null>(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          return user.businessId || null;
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  const { data: ordersResponse, isLoading, error } = useOrders(businessId);

  const ordersData = Array.isArray(ordersResponse)
    ? ordersResponse
    : ordersResponse?.data?.items || ordersResponse?.data || [];

  if (isLoading)
    return (
      <div className="p-8 text-center text-muted-foreground">
        Loading orders...
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-center text-red-500">Error loading orders</div>
    );

  return (
    <div className="space-y-8">
      <div className="bg-white">
        <DataTable
          columns={columns}
          data={ordersData}
          searchKey="id"
          addLabel="New Order"
          // In a real app, adding an order might be different, but keeping consistency
          onAdd={() => {}}
        />
      </div>
    </div>
  );
}
