"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, UserPlus } from "lucide-react";
import { customerSchema, type CustomerFormValues } from "./schema";

interface CustomerFormProps {
  onSubmit: (values: CustomerFormValues) => void;
  isLoading?: boolean;
  defaultValues?: Partial<CustomerFormValues>;
  categories?: { id: string; name: string }[];
}

export function CustomerForm({
  onSubmit,
  isLoading,
  defaultValues,
  categories = [],
}: CustomerFormProps) {
  const form = useForm<CustomerFormValues>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      email: defaultValues?.email || "",
      phone: defaultValues?.phone || "",
      company: defaultValues?.company || "",
      categoryId: defaultValues?.categoryId || "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="e.g. Andre Marie"
                    className="h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary/20 transition-colors shadow-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[12px] font-medium" />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="email"
                      placeholder="andre.marie@gmail.com"
                      className="h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary/20 transition-colors shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="+237 671..."
                      className="h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary/20 transition-colors shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                  Company / Organization
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Acme Inc."
                    className="h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary/20 transition-colors shadow-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[12px] font-medium" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                  Member Category
                </FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={(value) =>
                    field.onChange(value === "none" ? "" : value)
                  }
                  value={field.value || "none"}
                >
                  <FormControl>
                    <SelectTrigger className="h-11 border-muted-foreground/20 rounded-none focus:ring-primary/20 transition-colors shadow-none">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-none border border-border">
                    <SelectItem value="none">Standard (No Category)</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-[12px] font-medium" />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            className="h-11 px-8 bg-[#1c1c1c] hover:bg-[#1c1c1c]/90 text-white font-semibold text-sm rounded-none transition-all active:scale-[0.98]"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <UserPlus className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Creating..." : "Add Member"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
