"use client";

import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "./components/columns";
import { useState } from "react";
import { FormSheet } from "@/components/form-sheet";
import { CustomerForm } from "@/components/forms/customer-form";

import { useCustomers, useCreateCustomer } from "@/hooks/use-customers";
import { useCustomerCategories } from "@/hooks/use-customer-categories";
import { ErrorState } from "@/components/error-state";

export default function CustomersPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { data: customers, isLoading, error, refetch } = useCustomers();
  const { data: categoriesData } = useCustomerCategories();
  const createCustomer = useCreateCustomer();

  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : categoriesData?.data || [];

  const customersData = Array.isArray(customers)
    ? customers
    : customers?.data || [];

  if (error)
    return (
      <ErrorState
        title="Customers Offline"
        message="We are unable to synchronize your customer database."
        onRetry={() => refetch()}
      />
    );

  return (
    <div className="space-y-8">
      <div className="bg-white">
        <DataTable
          columns={columns}
          data={customersData}
          searchKey="name"
          addLabel="Add New Customer"
          onAdd={() => setIsSheetOpen(true)}
          isLoading={isLoading}
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
