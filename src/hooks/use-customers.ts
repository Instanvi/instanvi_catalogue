import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  customersService,
  customerAuthService,
} from "../services/customers.service";
import type { UpdateCustomerPayload } from "../types/api";

// Admin Hooks
export const useCustomers = () => {
  return useQuery({
    queryKey: ["customers"],
    queryFn: customersService.getAll,
  });
};

export const useCreateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: customersService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useUpdateCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCustomerPayload }) =>
      customersService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => customersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
};

// Customer Hooks
export const useCustomerProfile = () => {
  return useQuery({
    queryKey: ["customerProfile"],
    queryFn: customersService.getProfile,
    retry: false,
  });
};

export const useUpdateCustomerProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: customersService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customerProfile"] });
    },
  });
};

export const useRequestOtp = () => {
  return useMutation({
    mutationFn: (identifier: string) =>
      customerAuthService.requestOtp(identifier),
  });
};

export const useCustomerLogin = () => {
  return useMutation({
    mutationFn: ({ identifier, code }: { identifier: string; code: string }) =>
      customerAuthService.login(identifier, code),
  });
};
