"use client";

import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "./components/columns";
import { useState } from "react";
import { FormSheet } from "@/components/form-sheet";
import { CustomerForm } from "@/components/forms/customer-form";
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus } from "lucide-react";

import { useCustomers, useCreateCustomer } from "@/hooks/use-customers";
import { ErrorState } from "@/components/error-state";

export default function CustomersPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { data: customers, isLoading, error, refetch } = useCustomers();
  const createCustomer = useCreateCustomer();

  const customersData = Array.isArray(customers)
    ? customers
    : (customers as any)?.data || [];

  if (error)
    return (
      <ErrorState
        title="Customers Offline"
        message="We are unable to synchronize your customer database."
        onRetry={() => refetch()}
      />
    );

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <div className="bg-white border border-muted/10 rounded-sm shadow-sm">
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
        footer={
          <Button
            type="submit"
            form="create-customer-form"
            className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-semibold text-sm rounded-none transition-all active:scale-[0.98]"
            disabled={createCustomer.isPending}
          >
            {createCustomer.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <UserPlus className="mr-2 h-4 w-4" />
            )}
            {createCustomer.isPending ? "Saving..." : "Add Member"}
          </Button>
        }
      >
        <CustomerForm
          formId="create-customer-form"
          isLoading={createCustomer.isPending}
          onSubmit={(values) => {
            createCustomer.mutate(values, {
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
