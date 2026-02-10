"use client";

import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "./components/categories-columns";
import { useState } from "react";
import { FormSheet } from "@/components/form-sheet";
import { CategoryForm } from "@/components/forms/category-form";

import { ErrorState } from "@/components/error-state";

import {
  useCustomerCategories,
  useCreateCustomerCategory,
} from "@/hooks/use-customer-categories";

export default function DashboardPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const {
    data: categories,
    isLoading,
    error,
    refetch,
  } = useCustomerCategories();
  const createCategory = useCreateCustomerCategory();

  const categoriesData = Array.isArray(categories)
    ? categories
    : categories?.data || [];

  if (error)
    return (
      <ErrorState
        title="Categories Unavailable"
        message="We couldn't synchronize your customer categories at this time."
        onRetry={() => refetch()}
      />
    );

  return (
    <div className="space-y-8">
      <div className="bg-white">
        <DataTable
          columns={columns}
          data={categoriesData}
          searchKey="name"
          addLabel="Add New Category"
          onAdd={() => setIsSheetOpen(true)}
          isLoading={isLoading}
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
            isLoading={createCategory.isPending}
            onSubmit={(values) => {
              createCategory.mutate(values, {
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
