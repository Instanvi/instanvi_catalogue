import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cataloguesService } from "../services/catalogues.service";
import { BulkAddProductsPayload, UpdateCataloguePayload } from "../types/api";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios";

export const useCatalogues = () => {
  return useQuery({
    queryKey: ["catalogues"],
    queryFn: () => cataloguesService.getAll(),
  });
};

export const useBulkAddProductsToCatalogue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      catalogueId,
      payload,
    }: {
      catalogueId: string;
      payload: BulkAddProductsPayload;
    }) => cataloguesService.bulkAddProducts(catalogueId, payload),
    onSuccess: (_, { catalogueId }) => {
      queryClient.invalidateQueries({ queryKey: ["catalogue", catalogueId] });
      queryClient.invalidateQueries({ queryKey: ["catalogues"] });
      toast.success("Products added to catalogue");
    },
    onError: (error) => {
      toast.error("Failed to add products", {
        description: getErrorMessage(error),
      });
    },
  });
};

export const useUpdateCatalogue = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCataloguePayload }) =>
      cataloguesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["catalogues"] });
      toast.success("Catalogue updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update catalogue", {
        description: getErrorMessage(error),
      });
    },
  });
};
