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
        <div className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-medium text-foreground">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="e.g. Andre Marie"
                    className="h-11 border-muted-foreground/20 rounded-[4px] focus-visible:ring-0 focus-visible:border-primary focus-visible:ring-offset-0 transition-colors shadow-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-medium text-foreground">
                  Email Address
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="andre.marie@gmail.com"
                    className="h-11 border-muted-foreground/20 rounded-[4px] focus-visible:ring-0 focus-visible:border-primary focus-visible:ring-offset-0 transition-colors shadow-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-medium text-foreground">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="+237 671..."
                    className="h-11 border-muted-foreground/20 rounded-[4px] focus-visible:ring-0 focus-visible:border-primary focus-visible:ring-offset-0 transition-colors shadow-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-medium text-foreground">
                  Company / Organization
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Acme Inc."
                    className="h-11 border-muted-foreground/20 rounded-[4px] focus-visible:ring-0 focus-visible:border-primary focus-visible:ring-offset-0 transition-colors shadow-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-medium text-foreground">
                  Category
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-11 border-muted-foreground/20 rounded-[4px] focus:ring-0 focus:border-primary transition-colors shadow-none">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-[4px] border border-border">
                    <SelectItem value="">Standard</SelectItem>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.id}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full h-11 bg-primary text-white hover:bg-primary/90 font-semibold text-sm rounded-[4px] transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <UserPlus className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Creating..." : "Create Contact"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
