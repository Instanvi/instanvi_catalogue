"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "./components/columns";
import { cataloguesService } from "@/services/catalogues.service";
import { CatalogueType } from "@/types/api";
import { FormSheet } from "@/components/form-sheet";
import {
  CatalogueForm,
  CatalogueFormValues,
} from "@/components/forms/catalogue-form";

export default function CataloguesPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data: catalogues, error } = useQuery({
    queryKey: ["catalogues"],
    queryFn: cataloguesService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: cataloguesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catalogues"] });
      setIsSheetOpen(false);
    },
  });

  const onSubmit = (values: CatalogueFormValues) => {
    createMutation.mutate({
      ...values,
      type: values.type as CatalogueType,
    });
  };

  const safeData = Array.isArray(catalogues) ? catalogues : [];

  if (error) return <div>Error loading catalogues</div>;

  return (
    <div className="space-y-8">
      <div className="bg-white">
        <DataTable
          columns={columns}
          data={safeData}
          searchKey="name"
          addLabel="Add Catalogue"
          onAdd={() => setIsSheetOpen(true)}
        />
      </div>

      <FormSheet
        title="Create Catalogue"
        description="Create a new product catalogue to share with your customers."
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
      >
        <div className="mt-8">
          <CatalogueForm
            onSubmit={onSubmit}
            isLoading={createMutation.isPending}
          />
        </div>
      </FormSheet>
    </div>
  );
}
