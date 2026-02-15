"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table/DataTable";
import { getColumns } from "./components/columns";
import { cataloguesService } from "@/services/catalogues.service";
import { CatalogueType } from "@/types/api";
import { FormSheet } from "@/components/form-sheet";
import {
  CatalogueForm,
  CatalogueFormValues,
} from "@/components/forms/catalogue-form";
import { Button } from "@/components/ui/button";

import { ErrorState } from "@/components/error-state";

export default function CataloguesPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const queryClient = useQueryClient();

  const {
    data: catalogues,
    isLoading,
    error,
    refetch,
  } = useQuery({
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

  const columns = useMemo(() => getColumns(() => {}), []);

  const safeData = Array.isArray(catalogues) ? catalogues : [];

  if (error)
    return (
      <ErrorState
        title="Catalogues Offline"
        message="Your digital showcases are currently unreachable."
        onRetry={() => refetch()}
      />
    );

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <div className="bg-white border border-muted/10 rounded-sm shadow-sm">
        <DataTable
          columns={columns}
          data={safeData}
          searchKey="name"
          addLabel="Add Catalogue"
          onAdd={() => setIsSheetOpen(true)}
          isLoading={isLoading}
        />
      </div>

      <FormSheet
        title="Create Catalogue"
        description="Create a new product catalogue to share with your customers."
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        footer={
          <Button
            type="submit"
            form="catalogue-form"
            className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-semibold rounded-none transition-all active:scale-[0.98]"
            disabled={createMutation.isPending}
          >
            Create Catalogue
          </Button>
        }
      >
        <CatalogueForm
          formId="catalogue-form"
          onSubmit={onSubmit}
          isLoading={createMutation.isPending}
        />
      </FormSheet>
    </div>
  );
}
