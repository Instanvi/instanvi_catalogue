"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PaperPlaneTilt } from "@phosphor-icons/react";
import { Loader2 } from "lucide-react";
import { NotificationValues, notificationSchema } from "./schema";

interface NotificationFormProps {
  onSubmit: (values: NotificationValues) => void;
  isLoading?: boolean;
}

export function NotificationForm({
  onSubmit,
  isLoading,
}: NotificationFormProps) {
  const form = useForm<NotificationValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      channel: "email",
      title: "",
      message: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="channel"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-semibold">Channel</FormLabel>
              <Select
                disabled={isLoading}
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="h-11 border-muted-foreground/20 rounded-none focus:ring-primary/20">
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="rounded-none">
                  <SelectItem value="email">Email</SelectItem>
                  <SelectItem value="sms">SMS</SelectItem>
                  <SelectItem value="whatsapp">WhatsApp</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-semibold">Subject</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="e.g. New Arrivals: Summer Collection"
                  className="h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem className="space-y-2">
              <FormLabel className="text-sm font-semibold">Message</FormLabel>
              <FormControl>
                <Textarea
                  disabled={isLoading}
                  placeholder="Write your announcement here..."
                  className="min-h-[120px] border-muted-foreground/20 rounded-none focus-visible:ring-primary/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-11 bg-primary text-white font-semibold text-sm rounded-none tracking-wide"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <PaperPlaneTilt className="mr-2 h-4 w-4" weight="bold" />
          )}
          {isLoading ? "Broadcasting..." : "Send Broadcast Now"}
        </Button>
      </form>
    </Form>
  );
}
