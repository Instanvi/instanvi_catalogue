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
  FormDescription,
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
import { CustomerCategory } from "@/services/customer-categories.service";

interface NotificationFormProps {
  onSubmit: (values: NotificationValues) => void;
  isLoading?: boolean;
  categories: CustomerCategory[];
}

export function NotificationForm({
  onSubmit,
  isLoading,
  categories,
}: NotificationFormProps) {
  const form = useForm<NotificationValues>({
    resolver: zodResolver(notificationSchema),
    defaultValues: {
      channel: "email",
      categoryId: "all",
      title: "",
      message: "",
    },
  });

  const handleSubmit = (data: NotificationValues) => {
    // If categoryId is "all", send undefined to backend
    const payload = {
      ...data,
      categoryId: data.categoryId === "all" ? undefined : data.categoryId,
    };
    onSubmit(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            name="categoryId"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-semibold">
                  Customer Category
                </FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-11 border-muted-foreground/20 rounded-none focus:ring-primary/20">
                      <SelectValue placeholder="All Customers" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-none">
                    <SelectItem value="all">All Customers</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription className="text-[11px]">
                  Send to all or a specific segment.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

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
