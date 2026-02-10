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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { registerSchema, type RegisterFormValues } from "./schema";

interface RegisterFormProps {
  onSubmit: (values: RegisterFormValues) => void;
  isLoading?: boolean;
}

export function RegisterForm({ onSubmit, isLoading }: RegisterFormProps) {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      company: "",
      address: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Full Name
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="John Doe"
                    className="h-11 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20"
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
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="john@example.com"
                    className="h-11 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Phone
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="+1..."
                    className="h-11 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20"
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
              <FormItem>
                <FormLabel className="text-sm font-medium text-foreground">
                  Company
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Acme Corp"
                    className="h-11 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground">
                Address (Optional)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="123 Street, City, Country"
                  className="h-11 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-11 font-semibold text-sm rounded-none bg-primary hover:bg-primary/90 text-white shadow-none transition-all mt-6"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Create Account"
          )}
        </Button>
      </form>
    </Form>
  );
}
