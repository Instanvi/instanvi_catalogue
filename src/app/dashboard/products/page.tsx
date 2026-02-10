"use client";

import { DataTable } from "@/components/data-table/DataTable";
import { columns, Product } from "./components/columns";
import { useState } from "react";
import { FormSheet } from "@/components/form-sheet";
import { ProductForm } from "@/components/forms/product-form";

import { useProducts, useCreateProduct } from "@/hooks/use-products";

import { CatalogueSelectionSheet } from "@/components/catalogue-selection-sheet";
import { FolderPlus } from "lucide-react";

export default function ProductsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isCatalogueSheetOpen, setIsCatalogueSheetOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const { data: products } = useProducts();
  const createProduct = useCreateProduct();

  const productsData = products?.items || [];

  return (
    <div className="space-y-8">
      <div className="bg-white">
        <DataTable
          columns={columns}
          data={productsData as Product[]}
          searchKey="name"
          addLabel="Add New Product"
          onAdd={() => setIsSheetOpen(true)}
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
      >
        <div className="mt-8">
          <ProductForm
            isLoading={createProduct.isPending}
            onSubmit={(formData) => {
              createProduct.mutate(formData, {
                onSuccess: () => {
                  setIsSheetOpen(false);
                },
              });
            }}
          />
        </div>
      </FormSheet>
    </div>
  );
}
