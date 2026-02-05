import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { membersService, authService } from "../services/members.service";

export const useMemberProfile = () => {
  return useQuery({
    queryKey: ["memberProfile"],
    queryFn: membersService.getProfile,
    retry: false,
  });
};

export const useUpdateMemberProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: membersService.updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["memberProfile"] });
    },
  });
};

export const useRequestOtp = () => {
  return useMutation({
    mutationFn: (identifier: string) => authService.requestOtp(identifier),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: ({ identifier, code }: { identifier: string; code: string }) =>
      authService.login(identifier, code),
  });
};
