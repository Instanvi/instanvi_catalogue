"use client";

import { DataTable } from "@/components/data-table/DataTable";
import { columns, type CustomPrice } from "./components/columns";
import { useState } from "react";
import { FormSheet } from "@/components/form-sheet";
import { PricingForm } from "@/components/forms/pricing-form";

import { useCustomers } from "@/hooks/use-customers";
import { useCustomerCategories } from "@/hooks/use-customer-categories";
import { useProducts } from "@/hooks/use-products";

export default function PricingPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const { data: membersRaw } = useCustomers();
  const { data: categoriesRaw } = useCustomerCategories();
  const { data: productsRaw } = useProducts();

  const members = (
    Array.isArray(membersRaw)
      ? membersRaw
      : (membersRaw as { data?: Record<string, unknown>[] })?.data || []
  ).map((m) => ({
    id: String(m.id || m._id || ""),
    name: String(m.name || ""),
  }));

  const categories = (
    Array.isArray(categoriesRaw)
      ? categoriesRaw
      : (categoriesRaw as { data?: Record<string, unknown>[] })?.data || []
  ).map((c) => ({
    id: String(c.id || c._id || ""),
    name: String(c.name || ""),
  }));

  const catalogueProducts = (
    Array.isArray(productsRaw)
      ? productsRaw
      : (productsRaw as { data?: Record<string, unknown>[] })?.data || []
  ).map((p) => ({
    id: String(p.id || p._id || ""),
    productName: String(p.name || ""),
    basePrice: String(p.price || "0"),
  }));

  // For the table, we might need a specific query for existing overrides if backend supports it.
  // For now, we'll keep the safeData empty or use a placeholder if needed.
  const safeData: CustomPrice[] = [];

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <div className="bg-white border border-muted/10 rounded-sm shadow-sm">
        <DataTable
          columns={columns}
          data={safeData}
          searchKey="targetName"
          addLabel="Configure Override"
          onAdd={() => setIsSheetOpen(true)}
        />
      </div>

      <FormSheet
        title="Set Exclusive Price"
        description="Define a non-standard price point for a specific product and target."
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      >
        <div className="mt-8">
          <PricingForm
            members={members}
            categories={categories}
            catalogueProducts={catalogueProducts}
            onSubmit={(values) => {
              console.log("Submit Pricing Override:", values);
              setIsSheetOpen(false);
            }}
          />
        </div>
      </FormSheet>
    </div>
  );
}
