import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customerCategoriesService } from "../services/customer-categories.service";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios";

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
      toast.success("Category created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create category", {
        description: getErrorMessage(error),
      });
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
      toast.success("Category updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update category", {
        description: getErrorMessage(error),
      });
    },
  });
};

export const useDeleteCustomerCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => customerCategoriesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerCategories"] });
      toast.success("Category deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete category", {
        description: getErrorMessage(error),
      });
    },
  });
};
