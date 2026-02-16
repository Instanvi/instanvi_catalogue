"use client";

import { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table/DataTable";
import { getColumns } from "@/app/dashboard/components/catalogue-columns";
import { cataloguesService } from "@/services/catalogues.service";
import { CatalogueType } from "@/types/api";
import { FormSheet } from "@/components/form-sheet";
import {
  CatalogueForm,
  CatalogueFormValues,
} from "@/components/forms/catalogue-form";
import { CustomerFormValues } from "@/components/forms/customer-form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios";
import { ErrorState } from "@/components/error-state";
import { CustomerForm } from "@/components/forms/customer-form";
import { useCreateCustomer } from "@/hooks/use-customers";
import { Loader2, Plus, UserPlus } from "lucide-react";

export default function DashboardPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isCustomerSheetOpen, setIsCustomerSheetOpen] = useState(false);
  const [selectedCatalogueId, setSelectedCatalogueId] = useState<string | null>(
    null,
  );
  const queryClient = useQueryClient();

  const {
    data: catalogues,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["catalogues"],
    queryFn: () => cataloguesService.getAll(),
  });

  const createMutation = useMutation({
    mutationFn: cataloguesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catalogues"] });
      setIsSheetOpen(false);
      toast.success("Catalogue created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create catalogue", {
        description: getErrorMessage(error),
      });
    },
  });

  const createCustomerMutation = useCreateCustomer();

  const onSubmit = (values: CatalogueFormValues) => {
    createMutation.mutate({
      ...values,
      type: values.type as CatalogueType,
    });
  };

  const addCustomerToCatalogueMutation = useMutation({
    mutationFn: ({
      catalogueId,
      customerId,
    }: {
      catalogueId: string;
      customerId: string;
    }) => cataloguesService.addCustomer(catalogueId, customerId),
    onSuccess: () => {
      toast.success("Customer added to catalogue");
      setIsCustomerSheetOpen(false);
      setSelectedCatalogueId(null);
    },
    onError: (error) => {
      toast.error("Failed to add customer to catalogue", {
        description: getErrorMessage(error),
      });
    },
  });

  const onAddCustomerSubmit = (values: CustomerFormValues) => {
    createCustomerMutation.mutate(values, {
      onSuccess: (data) => {
        if (selectedCatalogueId && data?.customer?.id) {
          addCustomerToCatalogueMutation.mutate({
            catalogueId: selectedCatalogueId,
            customerId: data.customer.id,
          });
        }
      },
    });
  };

  const columns = useMemo(
    () =>
      getColumns((catalogue) => {
        setSelectedCatalogueId(catalogue.id);
        setIsCustomerSheetOpen(true);
      }),
    [],
  );

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
          addLabel="Add catalogue"
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
            className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-semibold rounded-lg shadow-sm transition-all active:scale-[0.98]"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create catalogue
              </>
            )}
          </Button>
        }
      >
        <div className="mt-4">
          <CatalogueForm
            formId="catalogue-form"
            onSubmit={onSubmit}
            isLoading={createMutation.isPending}
          />
        </div>
      </FormSheet>

      <FormSheet
        title="Add New Customer"
        description="Verify and register a new customer for catalogue access."
        isOpen={isCustomerSheetOpen}
        onOpenChange={setIsCustomerSheetOpen}
        footer={
          <Button
            type="submit"
            form="create-customer-form"
            className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-semibold text-sm rounded-lg shadow-sm transition-all active:scale-[0.98]"
            disabled={
              createCustomerMutation.isPending ||
              addCustomerToCatalogueMutation.isPending
            }
          >
            {createCustomerMutation.isPending ||
            addCustomerToCatalogueMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <UserPlus className="mr-2 h-4 w-4" />
            )}
            {createCustomerMutation.isPending ||
            addCustomerToCatalogueMutation.isPending
              ? "Saving..."
              : "Add member"}
          </Button>
        }
      >
        <CustomerForm
          formId="create-customer-form"
          isLoading={createCustomerMutation.isPending}
          onSubmit={onAddCustomerSubmit}
        />
      </FormSheet>
    </div>
  );
}
