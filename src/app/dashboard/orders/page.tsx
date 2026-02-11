"use client";

import { useCallback, useMemo } from "react";
import {
  useOrders,
  useUpdateOrderStatus,
  useDeleteOrder,
} from "@/hooks/use-orders";
import { getColumns, Order } from "./components/columns";
import { ErrorState } from "@/components/error-state";
import { DataTable } from "@/components/data-table/DataTable";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios";

export default function OrdersPage() {
  const { data: ordersResponse, isLoading, error, refetch } = useOrders();
  const updateStatus = useUpdateOrderStatus();
  const deleteOrder = useDeleteOrder();

  const handleUpdateStatus = useCallback(
    (id: string, status: Order["status"]) => {
      updateStatus.mutate(
        { id, status: status },
        {
          onSuccess: () => {
            toast.success(`Order status updated to ${status}`);
          },
          onError: (error) => {
            toast.error("Failed to update order status", {
              description: getErrorMessage(error),
            });
          },
        },
      );
    },
    [updateStatus],
  );

  const handleDelete = useCallback(
    (id: string) => {
      if (confirm("Are you sure you want to delete this order?")) {
        deleteOrder.mutate(id, {
          onSuccess: () => {
            toast.success("Order deleted successfully");
          },
          onError: (error) => {
            toast.error("Failed to delete order", {
              description: getErrorMessage(error),
            });
          },
        });
      }
    },
    [deleteOrder],
  );

  const columns = useMemo(
    () => getColumns(handleUpdateStatus, handleDelete),
    [handleUpdateStatus, handleDelete],
  );

  const ordersData = Array.isArray(ordersResponse)
    ? ordersResponse
    : ordersResponse?.data?.items || ordersResponse?.data || [];

  if (error)
    return (
      <ErrorState
        title="Orders Unavailable"
        message="We couldn't retrieve your distribution orders at this time."
        onRetry={() => refetch()}
      />
    );

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <div className="bg-white border border-muted/10 rounded-sm shadow-sm">
        <DataTable
          columns={columns}
          data={ordersData}
          searchKey="id"
          addLabel="New Order"
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
