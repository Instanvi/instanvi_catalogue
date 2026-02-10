import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customerCategoriesService } from "../services/customer-categories.service";

export const useCustomerCategories = () => {
  return useQuery({
    queryKey: ["customerCategories"],
    queryFn: customerCategoriesService.getAll,
  });
};

export const useCreateCustomerCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: customerCategoriesService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerCategories"] });
    },
  });
};

export const useUpdateCustomerCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: unknown }) =>
      customerCategoriesService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerCategories"] });
    },
  });
};

export const useDeleteCustomerCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => customerCategoriesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerCategories"] });
    },
  });
};
