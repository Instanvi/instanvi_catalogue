"use client";

import { useQuery } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "./components/columns";
import { stockService } from "@/services/stock.service";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function StockPage() {
  const {
    data: stockItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["stock"],
    queryFn: stockService.getAll,
  });

  if (isLoading) return <div>Loading stock data...</div>;
  if (error) return <div>Error loading stock data</div>;

  const data = stockItems || [];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Stock Management
          </h2>
          <p className="text-muted-foreground">
            Monitor product inventory levels and adjust quantities.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {/* Add Adjustment Button or Bulk Update */}
          <Button variant="outline">Export</Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> Stock Adjustment
          </Button>
        </div>
      </div>
      <div className="bg-white">
        <DataTable
          columns={columns}
          data={data}
          searchKey="name"
          // addLabel="Add Adjustment" // Using header buttons for now
          // onAdd={() => {}}
        />
      </div>
    </div>
  );
}
