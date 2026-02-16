"use client";

import { DataTable } from "@/components/data-table/DataTable";
import { columns, Product } from "./components/columns";
import { useState } from "react";
import { FormSheet } from "@/components/form-sheet";
import { ProductForm } from "@/components/forms/product-form";

import { useProducts, useCreateProduct } from "@/hooks/use-products";
import { ErrorState } from "@/components/error-state";

import { CatalogueSelectionSheet } from "@/components/catalogue-selection-sheet";
import { FolderPlus, Loader2, Package } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ProductsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isCatalogueSheetOpen, setIsCatalogueSheetOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const { data: products, isLoading, error, refetch } = useProducts();
  const createProduct = useCreateProduct();

  const productsData = products?.items || [];

  if (error)
    return (
      <ErrorState
        title="Products Unavailable"
        message="Your product catalog could not be loaded at this time."
        onRetry={() => refetch()}
      />
    );

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <div className="bg-white border border-muted/10 rounded-sm shadow-sm">
        <DataTable
          columns={columns}
          data={productsData as Product[]}
          searchKey="name"
          addLabel="Add New Product"
          onAdd={() => setIsSheetOpen(true)}
          isLoading={isLoading}
          bulkActions={[
            {
              label: "Add to Catalogue",
              icon: <FolderPlus className="h-3.5 w-3.5" />,
              onClick: (rows: Product[]) => {
                setSelectedProducts(rows);
                setIsCatalogueSheetOpen(true);
              },
            },
          ]}
        />
      </div>

      <CatalogueSelectionSheet
        isOpen={isCatalogueSheetOpen}
        onOpenChange={setIsCatalogueSheetOpen}
        selectedProducts={selectedProducts}
      />

      <FormSheet
        title="Add New Product"
        description="Synchronize a new asset with your central repository."
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        size="full"
        footer={
          <Button
            type="submit"
            form="create-product-form"
            className="w-full h-11 bg-primary text-white hover:bg-primary/90 font-semibold rounded-lg shadow-sm transition-all active:scale-[0.98]"
            disabled={createProduct.isPending}
          >
            {createProduct.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Package className="mr-2 h-4 w-4" />
            )}
            {createProduct.isPending ? "Creating..." : "Create Product"}
          </Button>
        }
      >
        <ProductForm
          formId="create-product-form"
          isLoading={createProduct.isPending}
          onSubmit={(formData) => {
            createProduct.mutate(formData, {
              onSuccess: () => {
                setIsSheetOpen(false);
              },
            });
          }}
        />
      </FormSheet>
    </div>
  );
}
