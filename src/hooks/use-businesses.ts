import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { businessesService } from "../services/businesses.service";
import type {
  CreateBusinessPayload,
  UpdateBusinessPayload,
} from "../types/api";

export const useBusinesses = () => {
  return useQuery({
    queryKey: ["businesses"],
    queryFn: businessesService.getAll,
  });
};

export const useBusiness = (id: string) => {
  return useQuery({
    queryKey: ["businesses", id],
    queryFn: () => businessesService.getOne(id),
    enabled: !!id,
  });
};

export const useCreateBusiness = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateBusinessPayload) => businessesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
    },
  });
};

export const useUpdateBusiness = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateBusinessPayload }) =>
      businessesService.update(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
      queryClient.invalidateQueries({ queryKey: ["businesses", variables.id] });
    },
  });
};

export const useDeleteBusiness = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => businessesService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["businesses"] });
    },
  });
};
