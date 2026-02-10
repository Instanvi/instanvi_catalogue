import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { cataloguesService } from "../services/catalogues.service";
import { BulkAddProductsPayload } from "../types/api";

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
