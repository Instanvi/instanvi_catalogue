"use client";

import { DataTable } from "@/components/data-table/DataTable";
import { columns, type Product } from "./components/columns";
import { useState } from "react";
import { FormSheet } from "@/components/form-sheet";
import { ProductForm } from "@/components/forms/product-form";

const dummyData: Product[] = [
  {
    id: "p1",
    name: "Onyx Horizon Watch",
    sku: "WTC-ONX-01",
    basePrice: "1250.00",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?q=80&w=200&h=200&auto=format&fit=crop",
    ],
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p2",
    name: "Carbon Fibre Wallet",
    sku: "WLT-CRB-88",
    basePrice: "245.00",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=200&h=200&auto=format&fit=crop",
    ],
    isActive: true,
    updatedAt: new Date().toISOString(),
  },
];

export default function ProductsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="bg-white">
        <DataTable
          columns={columns}
          data={dummyData}
          searchKey="name"
          addLabel="Add New Product"
          onAdd={() => setIsSheetOpen(true)}
        />
      </div>

      <FormSheet
        title="Add New Product"
        description="Synchronize a new asset with your central repository."
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        size="2xl"
      >
        <div className="mt-8">
          <ProductForm
            categories={[
              { id: "c1", name: "VIP" },
              { id: "c2", name: "Reseller" },
              { id: "c3", name: "Standard" },
            ]}
            onSubmit={(formData) => {
              console.log(
                "Submit FormData:",
                Object.fromEntries(formData.entries()),
              );
              setIsSheetOpen(false);
            }}
          />
        </div>
      </FormSheet>
    </div>
  );
}
