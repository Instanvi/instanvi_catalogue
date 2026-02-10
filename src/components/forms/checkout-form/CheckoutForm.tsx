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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <section className="space-y-6">
          <h3 className="text-xl font-semibold border-b-2 border-primary pb-2 tracking-tighter text-black">
            01. Customer Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            <FormField
              control={form.control}
              name="customerName"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-normal text-gray-600">
                    Full Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Jane Doe"
                      className="rounded-none h-12 border-gray-200 focus:border-primary transition-all font-normal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerEmail"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-normal text-gray-600">
                    Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="jane@example.com"
                      className="rounded-none h-12 border-gray-200 focus:border-primary transition-all font-normal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customerPhone"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-normal text-gray-600">
                    Phone Number
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+237 6xx xxx xxx"
                      className="rounded-none h-12 border-gray-200 focus:border-primary transition-all font-normal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="shippingAddress"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-normal text-gray-600">
                    Shipping Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Douala, Akwa"
                      className="rounded-none h-12 border-gray-200 focus:border-primary transition-all font-normal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <section className="space-y-6">
          <h3 className="text-xl  border-b-2 border-primary pb-2 tracking-tighter text-black">
            02. Payment & Notes
          </h3>
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="paymentMethod"
              render={({ field }) => (
                <FormItem className="space-y-4">
                  <FormLabel className="text-sm font-normal text-gray-600">
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
                            "border-2 p-6 flex items-center justify-start gap-5",
                            isSelected
                              ? "border-primary bg-primary/5 shadow-md"
                              : "border-gray-100 hover:border-primary/50 bg-white",
                          )}
                        >
                          <div
                            className={cn(
                              "w-12 h-12 rounded-none flex items-center justify-center shadow-inner shrink-0",
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
                                isSelected ? "text-primary" : "text-black",
                              )}
                            >
                              {method.label}
                            </p>
                            <p className="text-xs text-gray-400 font-normal">
                              Instant Mobile Payment
                            </p>
                          </div>
                          <div
                            className={cn(
                              "w-5 h-5 border-2 rounded-full flex items-center justify-center transition-all",
                              isSelected
                                ? "border-primary bg-primary"
                                : "border-gray-200",
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
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-normal text-gray-600">
                    Order Notes
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Delivery instructions (optional)..."
                      className="rounded-none h-12 border-gray-200 focus:border-primary transition-all font-normal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </section>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-16 rounded-none bg-primary text-white font-black text-xl hover:bg-primary/95 transition-all shadow-xl active:scale-[0.99] border-b-4 border-primary/20"
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
