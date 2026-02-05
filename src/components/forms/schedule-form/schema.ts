import * as zod from "zod";

export const scheduleSchema = zod.object({
  title: zod.string().min(2, "Title is required"),
  date: zod.string().min(1, "Date is required"),
  time: zod.string().min(1, "Time is required"),
  location: zod.string().optional(),
});

export type ScheduleFormValues = zod.infer<typeof scheduleSchema>;
