import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  productUnitsService,
  CreateProductUnitDto,
} from "@/services/product-units.service";
import { toast } from "sonner";

export const useProductUnits = () => {
  return useQuery({
    queryKey: ["product-units"],
    queryFn: () => productUnitsService.getAll(),
  });
};

export const useCreateProductUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateProductUnitDto) =>
      productUnitsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-units"] });
      toast.success("Product unit created successfully");
    },
    onError: () => {
      toast.error("Failed to create product unit");
    },
  });
};

export const useUpdateProductUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: Partial<CreateProductUnitDto>;
    }) => productUnitsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-units"] });
      toast.success("Product unit updated successfully");
    },
    onError: () => {
      toast.error("Failed to update product unit");
    },
  });
};

export const useDeleteProductUnit = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => productUnitsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-units"] });
      toast.success("Product unit deleted successfully");
    },
    onError: () => {
      toast.error("Failed to delete product unit");
    },
  });
};
