"use client";

import { DataTable } from "@/components/data-table/DataTable";
import { columns, type MemberCategory } from "./components/columns";
import { useState } from "react";
import { FormSheet } from "@/components/form-sheet";
import { CategoryForm } from "@/components/forms/category-form";

const dummyData: MemberCategory[] = [
  {
    id: "c1",
    name: "VIP Distributors",
    discountPercentage: "25.00",
    markupPercentage: "0.00",
    isDefault: false,
    memberCount: 12,
  },
  {
    id: "c2",
    name: "Retail Partners",
    discountPercentage: "10.00",
    markupPercentage: "5.00",
    isDefault: true,
    memberCount: 45,
  },
];

export default function CategoriesPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="bg-white">
        <DataTable
          columns={columns}
          data={dummyData}
          searchKey="name"
          addLabel="Add New Category"
          onAdd={() => setIsSheetOpen(true)}
        />
      </div>

      <FormSheet
        title="Add New Category"
        description="Establish a new pricing tier for your distribution network."
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      >
        <div className="mt-8">
          <CategoryForm
            onSubmit={(values) => {
              console.log("Submit Category:", values);
              setIsSheetOpen(false);
            }}
          />
        </div>
      </FormSheet>
    </div>
  );
}
