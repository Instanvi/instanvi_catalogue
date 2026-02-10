export interface Schedule {
  id: string;
  title: string;
  type: "email" | "sms" | "push";
  scheduledFor: string;
  status: "pending" | "sent" | "failed" | "cancelled";
  recipientCount: number;
}

export const schedulesService = {
  getAll: async () => {
    // Mock data
    return [
      {
        id: "s1",
        title: "Weekly Newsletter",
        type: "email",
        scheduledFor: new Date(Date.now() + 86400000).toISOString(), // +1 day
        status: "pending",
        recipientCount: 150,
      },
      {
        id: "s2",
        title: "Flash Sale Alert",
        type: "push",
        scheduledFor: new Date(Date.now() - 3600000).toISOString(), // -1 hour
        status: "sent",
        recipientCount: 1200,
      },
      {
        id: "s3",
        title: "Order Reminders",
        type: "sms",
        scheduledFor: new Date(Date.now() + 172800000).toISOString(), // +2 days
        status: "pending",
        recipientCount: 45,
      },
      {
        id: "s4",
        title: "Summer Collection Teaser",
        type: "email",
        scheduledFor: new Date(Date.now() - 86400000).toISOString(), // -1 day
        status: "failed",
        recipientCount: 0,
      },
    ] as Schedule[];
  },

  create: async (data: Partial<Schedule>) => {
    // Mock create
    return { id: "mock-id", status: "pending", ...data };
  },
};
