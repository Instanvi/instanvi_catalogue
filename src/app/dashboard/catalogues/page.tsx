"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table/DataTable";
import { getColumns } from "./components/columns";
import { cataloguesService, Catalogue } from "@/services/catalogues.service";
import { CatalogueType } from "@/types/api";
import { FormSheet } from "@/components/form-sheet";
import {
  CatalogueForm,
  CatalogueFormValues,
} from "@/components/forms/catalogue-form";
import { useUpdateCatalogue } from "@/hooks/use-dashboard-catalogues";
import { useCustomerCategories } from "@/hooks/use-customer-categories";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios";

import { ErrorState } from "@/components/error-state";

import { CustomerCategory } from "@/services/customer-categories.service";

export default function CataloguesPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isAssignSheetOpen, setIsAssignSheetOpen] = useState(false);
  const [selectedCatalogue, setSelectedCatalogue] = useState<Catalogue | null>(
    null,
  );
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

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

  const { data: categoriesData } = useCustomerCategories();
  const updateCatalogue = useUpdateCatalogue();

  const categories = useMemo(() => {
    return Array.isArray(categoriesData)
      ? categoriesData
      : categoriesData?.data || [];
  }, [categoriesData]);

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

  const onAssignCategory = (catalogue: Catalogue) => {
    setSelectedCatalogue(catalogue);
    setSelectedCategoryId(catalogue.customerCategoryId || "none");
    setIsAssignSheetOpen(true);
  };

  const handleSaveCategory = () => {
    if (!selectedCatalogue) return;

    updateCatalogue.mutate(
      {
        id: selectedCatalogue.id,
        data: {
          customerCategoryId:
            selectedCategoryId === "none" ? undefined : selectedCategoryId,
        },
      },
      {
        onSuccess: () => {
          toast.success("Category assigned successfully");
          setIsAssignSheetOpen(false);
        },
        onError: (error) => {
          toast.error("Failed to assign category", {
            description: getErrorMessage(error),
          });
        },
      },
    );
  };

  const columns = useMemo(() => getColumns(onAssignCategory), []);

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
      >
        <div className="mt-8">
          <CatalogueForm
            onSubmit={onSubmit}
            isLoading={createMutation.isPending}
          />
        </div>
      </FormSheet>

      <FormSheet
        title="Assign Category"
        description={`Restrict access to "${selectedCatalogue?.name}" by customer category.`}
        isOpen={isAssignSheetOpen}
        onOpenChange={setIsAssignSheetOpen}
      >
        <div className="mt-8 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-[#1c1c1c]">
              Select Customer Category
            </label>
            <Select
              value={selectedCategoryId}
              onValueChange={setSelectedCategoryId}
              disabled={updateCatalogue.isPending}
            >
              <SelectTrigger className="h-11 border-muted-foreground/20 rounded-none focus:ring-primary/20 transition-colors shadow-none">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="rounded-none border border-border">
                <SelectItem value="none">Public (All Members)</SelectItem>
                {categories.map((cat: CustomerCategory) => (
                  <SelectItem key={cat.id} value={cat.id}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">
              Only members assigned to this category will be able to see and
              order from this catalogue.
            </p>
          </div>

          <div className="pt-4">
            <Button
              onClick={handleSaveCategory}
              className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-semibold text-sm rounded-none transition-all active:scale-[0.98]"
              disabled={updateCatalogue.isPending}
            >
              {updateCatalogue.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              {updateCatalogue.isPending ? "Assigning..." : "Save Assignment"}
            </Button>
          </div>
        </div>
      </FormSheet>
    </div>
  );
}
