import api from "../lib/axios";
import {
  ApiResponse,
  NotificationPayload,
  NotificationHistory,
} from "../types/api";

export const notificationsService = {
  sendNewArrival: async (data: NotificationPayload) => {
    const response = await api.post<ApiResponse<void>>(
      "/business-notifications/new-arrival",
      data,
    );
    return response.data;
  },

  getHistory: async () => {
    const response = await api.get<ApiResponse<NotificationHistory[]>>(
      "/business-notifications/history",
    );
    return response.data.data;
  },
};
