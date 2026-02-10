"use client";

import { DataTable } from "@/components/data-table/DataTable";
import { columns, type MemberCategory } from "./components/columns";
import { useState } from "react";
import { FormSheet } from "@/components/form-sheet";
import { CategoryForm } from "@/components/forms/category-form";

import {
  useCustomerCategories,
  useCreateCustomerCategory,
} from "@/hooks/use-customer-categories";

export default function CategoriesPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { data: categories, isLoading } = useCustomerCategories();
  const createCategory = useCreateCustomerCategory();

  const categoriesData = Array.isArray(categories)
    ? categories
    : categories?.data || [];

  return (
    <div className="space-y-8">
      <div className="bg-white">
        <DataTable
          columns={columns}
          data={categoriesData}
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
