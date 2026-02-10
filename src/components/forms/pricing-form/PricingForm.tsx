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
import { Loader2, DollarSign } from "lucide-react";
import { pricingSchema, type PricingFormValues } from "./schema";

interface PricingFormProps {
  onSubmit: (values: PricingFormValues) => void;
  isLoading?: boolean;
  members: Array<{ id: string; name: string }>;
  categories: Array<{ id: string; name: string }>;
  catalogueProducts: Array<{
    id: string;
    productName: string;
    basePrice: string;
  }>;
  defaultValues?: Partial<PricingFormValues>;
}

export function PricingForm({
  onSubmit,
  isLoading,
  members,
  categories,
  catalogueProducts,
  defaultValues,
}: PricingFormProps) {
  const form = useForm<PricingFormValues>({
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      targetType: defaultValues?.targetType || "category",
      targetId: defaultValues?.targetId || "",
      catalogueProductId: defaultValues?.catalogueProductId || "",
      customPrice: defaultValues?.customPrice || "0.00",
    },
  });

  const targetType = form.watch("targetType");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="targetType"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Override Target Level
                  </FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 rounded-none border-muted-foreground/20 focus:ring-primary/20 transition-colors shadow-none">
                        <SelectValue placeholder="Select target type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-none">
                      <SelectItem value="category">
                        Customer Category
                      </SelectItem>
                      <SelectItem value="member">Individual Member</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetId"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    {targetType === "category"
                      ? "Target Category"
                      : "Target Member"}
                  </FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 rounded-none border-muted-foreground/20 focus:ring-primary/20 transition-colors shadow-none">
                        <div className="flex items-center gap-2">
                          <SelectValue placeholder={`Select ${targetType}`} />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-none">
                      {(targetType === "category" ? categories : members).map(
                        (item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-4">
            <FormField
              control={form.control}
              name="catalogueProductId"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Product
                  </FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 rounded-none border-muted-foreground/20 focus:ring-primary/20 transition-colors shadow-none">
                        <div className="flex items-center gap-2">
                          <SelectValue placeholder="Select product" />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-none">
                      {catalogueProducts.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.productName} (Base: ${p.basePrice})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customPrice"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Custom Override Price
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground/50" />
                      <Input
                        disabled={isLoading}
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        className="h-11 pl-10 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20 transition-colors shadow-none font-semibold"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription className="text-[11px] text-muted-foreground/60 leading-tight">
                    This will override any category or base MSRP price for the
                    selected target.
                  </FormDescription>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-semibold rounded-none transition-all active:scale-[0.98]"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <DollarSign className="mr-2 h-4 w-4" />
            )}
            {isLoading
              ? "Processing..."
              : defaultValues?.catalogueProductId
                ? "Update Override Price"
                : "Set Override Price"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
