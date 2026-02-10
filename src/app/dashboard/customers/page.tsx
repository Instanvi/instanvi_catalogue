"use client";

import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "./components/columns";
import { useState } from "react";
import { FormSheet } from "@/components/form-sheet";
import { CustomerForm } from "@/components/forms/customer-form";

import { useCustomers, useCreateCustomer } from "@/hooks/use-customers";
import { useCustomerCategories } from "@/hooks/use-customer-categories";

export default function CustomersPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { data: customers } = useCustomers();
  const { data: categoriesData } = useCustomerCategories();
  const createCustomer = useCreateCustomer();

  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : categoriesData?.data || [];

  const customersData = Array.isArray(customers)
    ? customers
    : customers?.data || [];

  return (
    <div className="space-y-8">
      <div className="bg-white">
        <DataTable
          columns={columns}
          data={customersData}
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
            isLoading={createCustomer.isPending}
            categories={categories}
            onSubmit={(values) => {
              createCustomer.mutate(values, {
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
