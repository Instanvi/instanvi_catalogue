"use client";

import { DataTable } from "@/components/data-table/DataTable";
import { columns, type Customer } from "./components/columns";
import { useState } from "react";
import { FormSheet } from "@/components/form-sheet";
import { CustomerForm } from "@/components/forms/customer-form";

const dummyData: Customer[] = [
  {
    id: "m1",
    name: "John Miller",
    email: "john@miller.com",
    phone: "+1 234 567 890",
    company: "Miller Luxury",
    category: { id: "c1", name: "VIP" },
    createdAt: new Date().toISOString(),
  },
  {
    id: "m2",
    name: "Sarah Chen",
    email: "sarah@chen.com",
    phone: "+1 987 654 321",
    company: "Chen Collectibles",
    category: null,
    createdAt: new Date().toISOString(),
  },
];

export default function CustomersPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <div className="space-y-8">
      <div className="bg-white">
        <DataTable
          columns={columns}
          data={dummyData}
          searchKey="name"
          addLabel="Add New Customer"
          onAdd={() => setIsSheetOpen(true)}
        />
      </div>

      <FormSheet
        title="Add New Customer"
        description="Verify and register a new customer for catalogue access."
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      >
        <div className="mt-8">
          <CustomerForm
            onSubmit={(values) => {
              console.log("Submit:", values);
              setIsSheetOpen(false);
            }}
          />
        </div>
      </FormSheet>
    </div>
  );
}
