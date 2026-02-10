import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cataloguesService } from "../services/catalogues.service";
import { BulkAddProductsPayload, UpdateCataloguePayload } from "../types/api";

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
    },
  });
};
