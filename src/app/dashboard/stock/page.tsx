"use client";

import { useState, useMemo } from "react";
import { DataTable } from "@/components/data-table/DataTable";
import { getColumns } from "./components/columns";
import { useStock, useUpdateStock } from "@/hooks/use-stock";
import { ErrorState } from "@/components/error-state";
import { FormSheet } from "@/components/form-sheet";
import { StockUpdateForm } from "@/components/forms/stock-form/StockUpdateForm";
import { StockUpdateValues } from "@/components/forms/stock-form/schema";
import { StockItem } from "@/services/stock.service";
import { Settings2, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function StockPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<StockItem | null>(null);

  const { data: stockItems, isLoading, error } = useStock();
  const updateStock = useUpdateStock();

  const onUpdate = (item: StockItem) => {
    setSelectedStock(item);
    setIsSheetOpen(true);
  };

  const columns = useMemo(() => getColumns(onUpdate), []);
  const data = stockItems || [];

  const handleUpdateSubmit = (values: StockUpdateValues) => {
    updateStock.mutate(
      {
        id: values.stockId,
        quantity: values.quantity,
        reason: values.reason,
      },
      {
        onSuccess: () => {
          setIsSheetOpen(false);
          setSelectedStock(null);
        },
      },
    );
  };

  if (error)
    return (
      <ErrorState
        title="Inventory Unavailable"
        message="We encountered an issue retrieving your current stock levels."
        onRetry={() => window.location.reload()}
      />
    );

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <div className="bg-white border border-muted/10 rounded-sm shadow-sm">
        <DataTable
          columns={columns}
          data={data}
          searchKey="product_name"
          addLabel="Update Stock Total"
          onAdd={() => {
            setSelectedStock(null);
            setIsSheetOpen(true);
          }}
          isLoading={isLoading}
          bulkActions={[
            {
              label: "Update Stock",
              icon: <Settings2 className="h-4 w-4" />,
              onClick: (rows) => {
                if (rows.length > 1) {
                  toast.warning(
                    "Please select only one product to update total stock levels.",
                  );
                  return;
                }
                onUpdate(rows[0]);
              },
            },
          ]}
        />
      </div>

      <FormSheet
        title="Update Stock Levels"
        description="Set the current total quantity available for your products."
        isOpen={isSheetOpen}
        onOpenChange={(open) => {
          setIsSheetOpen(open);
          if (!open) setSelectedStock(null);
        }}
        footer={
          <Button
            type="submit"
            form="stock-update-form"
            className="w-full h-11 bg-black hover:bg-black/90 text-white font-semibold text-sm rounded-none transition-all active:scale-[0.98]"
            disabled={updateStock.isPending}
          >
            {updateStock.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {updateStock.isPending ? "Updating..." : "Update Stock Total"}
          </Button>
        }
      >
        <StockUpdateForm
          formId="stock-update-form"
          isLoading={updateStock.isPending}
          stockItems={data}
          defaultValues={
            selectedStock ? { stockId: selectedStock.id } : undefined
          }
          onSubmit={handleUpdateSubmit}
        />
      </FormSheet>
    </div>
  );
}
