"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type Resolver } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Calendar, Clock, MapPin } from "lucide-react";
import { scheduleSchema, type ScheduleFormValues } from "./schema";

interface ScheduleFormProps {
  onSubmit: (values: ScheduleFormValues) => void;
  isLoading?: boolean;
  defaultValues?: Partial<ScheduleFormValues>;
}

export function ScheduleForm({
  onSubmit,
  isLoading,
  defaultValues,
}: ScheduleFormProps) {
  const form = useForm<ScheduleFormValues>({
    resolver: zodResolver(scheduleSchema) as Resolver<ScheduleFormValues>,
    defaultValues: {
      title: defaultValues?.title || "",
      date: defaultValues?.date || "",
      time: defaultValues?.time || "",
      location: defaultValues?.location || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase font-bold text-muted-foreground tracking-widest">
                  Event Title
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Client Meeting / Demo"
                    className="h-12 border-muted-foreground/20 focus-visible:ring-primary rounded-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase font-bold text-muted-foreground tracking-widest">
                    Date
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground/50" />
                      <Input
                        type="date"
                        className="h-12 pl-10 border-muted-foreground/20 focus-visible:ring-primary rounded-none"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs uppercase font-bold text-muted-foreground tracking-widest">
                    Time
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Clock className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground/50" />
                      <Input
                        type="time"
                        className="h-12 pl-10 border-muted-foreground/20 focus-visible:ring-primary rounded-none"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs uppercase font-bold text-muted-foreground tracking-widest">
                  Location / Meeting Link
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-muted-foreground/50" />
                    <Input
                      placeholder="e.g. Office or Google Meet"
                      className="h-12 pl-10 border-muted-foreground/20 focus-visible:ring-primary rounded-none"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-primary hover:bg-primary/90 text-white font-bold uppercase tracking-widest rounded-none shadow-none transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Calendar className="mr-2 h-5 w-5" />
          )}
          {isLoading
            ? "Scheduling..."
            : defaultValues?.title
              ? "Update Schedule"
              : "Book Schedule"}
        </Button>
      </form>
    </Form>
  );
}
