"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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
import { Loader2, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const checkoutSchema = z.object({
  customerName: z.string().min(1, "Name is required"),
  customerEmail: z.string().email("Invalid email"),
  customerPhone: z.string().min(1, "Phone is required"),
  shippingAddress: z.string().min(1, "Address is required"),
  notes: z.string().optional(),
  paymentMethod: z
    .string()
    .refine((val) => ["MTN_MONEY", "ORANGE_MONEY"].includes(val), {
      message: "Please select a payment method",
    }),
});

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
  onSubmit: (values: CheckoutFormValues) => void;
  isLoading?: boolean;
}

const PAYMENT_METHODS = [
  {
    id: "MTN_MONEY",
    label: "MTN Mobile Money",
    color: "bg-[#FFCC00]",
    textColor: "text-black",
  },
  {
    id: "ORANGE_MONEY",
    label: "Orange Money",
    color: "bg-[#FF6600]",
    textColor: "text-white",
  },
];

export function CheckoutForm({ onSubmit, isLoading }: CheckoutFormProps) {
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      customerName: "",
      customerEmail: "",
      customerPhone: "",
      shippingAddress: "",
      notes: "",
      paymentMethod: "MTN_MONEY",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <section className="space-y-6">
          <h3 className="text-xl font-semibold border-b-2 border-[#1c1c1c] pb-2 tracking-tighter text-[#1c1c1c]">
            01. Customer Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jane Doe"
                      className="h-11 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20 transition-colors shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerEmail"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jane@example.com"
                      className="h-11 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20 transition-colors shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+237 6xx xxx xxx"
                      className="h-11 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20 transition-colors shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Shipping Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Douala, Akwa"
                      className="h-11 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20 transition-colors shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl font-semibold border-b-2 border-[#1c1c1c] pb-2 tracking-tighter text-[#1c1c1c]">
            02. Payment & Notes
          </h3>
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Select Payment Provider
                  </FormLabel>
                  <div className="flex flex-col gap-4">
                    {PAYMENT_METHODS.map((method) => {
                      const isSelected = field.value === method.id;
                      return (
                        <div
                          key={method.id}
                          onClick={() => field.onChange(method.id)}
                          className={cn(
                            "relative cursor-pointer group transition-all duration-300",
                            "border p-6 flex items-center justify-start gap-5 rounded-none",
                            isSelected
                              ? "border-primary bg-primary/5"
                              : "border-muted-foreground/20 hover:border-primary/50 bg-white",
                          )}
                        >
                          <div
                            className={cn(
                              "w-12 h-12 rounded-none flex items-center justify-center shrink-0",
                              method.color,
                            )}
                          >
                            <span
                              className={cn(
                                "text-lg font-black italic",
                                method.textColor,
                              )}
                            >
                              {method.id.split("_")[0][0]}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p
                              className={cn(
                                "font-bold text-base transition-colors",
                                isSelected ? "text-primary" : "text-[#1c1c1c]",
                              )}
                            >
                              {method.label}
                            </p>
                            <p className="text-xs text-muted-foreground font-medium">
                              Instant Mobile Payment
                            </p>
                          </div>
                          <div
                            className={cn(
                              "w-5 h-5 border rounded-full flex items-center justify-center transition-all",
                              isSelected
                                ? "border-primary bg-primary"
                                : "border-muted-foreground/30",
                            )}
                          >
                            {isSelected && (
                              <Check
                                size={12}
                                className="text-white"
                                strokeWidth={4}
                              />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Order Notes
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Delivery instructions (optional)..."
                      className="h-11 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20 transition-colors shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />
          </div>
        </section>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-14 rounded-none bg-primary text-white font-bold text-lg hover:bg-primary/90 transition-all active:scale-[0.99]"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          ) : (
            "Complete Purchase"
          )}
        </Button>
      </form>
    </Form>
  );
}
