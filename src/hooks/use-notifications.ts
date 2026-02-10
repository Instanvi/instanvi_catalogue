import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationsService } from "../services/notifications.service";
import { NotificationPayload } from "../types/api";

export const useNotificationsHistory = () => {
  return useQuery({
    queryKey: ["notifications-history"],
    queryFn: notificationsService.getHistory,
  });
};

export const useSendNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: NotificationPayload) =>
      notificationsService.sendNewArrival(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications-history"] });
    },
  });
};
