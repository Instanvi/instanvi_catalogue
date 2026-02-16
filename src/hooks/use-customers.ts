import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  customersService,
  customerAuthService,
} from "../services/customers.service";
import type { UpdateCustomerPayload } from "../types/api";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios";

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
      toast.success("Customer created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create customer", {
        description: getErrorMessage(error),
      });
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
      toast.success("Customer updated successfully");
    },
    onError: (error) => {
      toast.error("Failed to update customer", {
        description: getErrorMessage(error),
      });
    },
  });
};

export const useDeleteCustomer = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => customersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["customers"] });
      toast.success("Customer deleted successfully");
    },
    onError: (error) => {
      toast.error("Failed to delete customer", {
        description: getErrorMessage(error),
      });
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
