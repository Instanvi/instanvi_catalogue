import { z } from "zod";

export const notificationSchema = z.object({
  channel: z.enum(["email", "sms", "whatsapp"]),
  title: z.string().min(1, "Title is required"),
  message: z.string().min(1, "Message is required"),
});

export type NotificationValues = z.infer<typeof notificationSchema>;
