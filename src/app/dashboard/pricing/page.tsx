"use client";

import { DataTable } from "@/components/data-table/DataTable";
import { columns, type CustomPrice } from "./components/columns";
import { useState } from "react";
import { FormSheet } from "@/components/form-sheet";
import { PricingForm } from "@/components/forms/pricing-form";

const dummyData: CustomPrice[] = [
  {
    id: "pr1",
    targetType: "category",
    targetName: "VIP Distributors",
    productName: "Midnight Silk Watch",
    customPrice: "950.00",
    basePrice: "1250.00",
  },
  {
    id: "pr2",
    targetType: "member",
    targetName: "Alpha Distributors",
    productName: "Carbon Fibre Wallet",
    customPrice: "180.00",
    basePrice: "245.00",
  },
];

export default function PricingPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // Dummy data for form
  const dummyMembers = [{ id: "m1", name: "Alpha Distributors" }];
  const dummyCategories = [{ id: "c1", name: "VIP Distributors" }];
  const dummyProducts = [
    { id: "p1", productName: "Midnight Silk Watch", basePrice: "1250.00" },
    { id: "p2", productName: "Carbon Fibre Wallet", basePrice: "245.00" },
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white">
        <DataTable
          columns={columns}
          data={dummyData}
          searchKey="targetName"
          addLabel="CONFIGURE OVERRIDE"
          onAdd={() => setIsSheetOpen(true)}
        />
      </div>

      <FormSheet
        title="SET EXCLUSIVE PRICE"
        description="Define a non-standard price point for a specific product and target."
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      >
        <div className="mt-8">
          <PricingForm
            members={dummyMembers}
            categories={dummyCategories}
            catalogueProducts={dummyProducts}
            onSubmit={(values) => {
              console.log("Submit Pricing:", values);
              setIsSheetOpen(false);
            }}
          />
        </div>
      </FormSheet>
    </div>
  );
}
