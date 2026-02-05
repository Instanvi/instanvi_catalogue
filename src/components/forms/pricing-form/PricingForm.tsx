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
import { Loader2, DollarSign, Target, User, Layers } from "lucide-react";
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="bg-muted/30 p-4 border-l-4 border-black space-y-4">
            <FormField
              control={form.control}
              name="targetType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Pricing Target Type
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="category">
                        Customer Category
                      </SelectItem>
                      <SelectItem value="member">Specific Customer</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="targetId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    {targetType === "category"
                      ? "Target Category"
                      : "Target Customer"}
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <div className="flex items-center gap-2">
                          {targetType === "category" ? (
                            <Layers className="h-4 w-4" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                          <SelectValue placeholder={`Select ${targetType}`} />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {(targetType === "category" ? categories : members).map(
                        (item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.name}
                          </SelectItem>
                        ),
                      )}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="bg-muted/30 p-4 border-l-4 border-primary space-y-4">
            <FormField
              control={form.control}
              name="catalogueProductId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Product from Catalogue
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <div className="flex items-center gap-2">
                          <Target className="h-4 w-4" />
                          <SelectValue placeholder="Select product" />
                        </div>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {catalogueProducts.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.productName} (MSRP: ${p.basePrice})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="customPrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-medium text-foreground">
                    Custom Exclusive Price
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-3 h-5 w-5 text-muted-foreground/50" />
                      <Input
                        type="number"
                        step="0.01"
                        className="h-10 pl-10 text-sm font-medium"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription className="text-xs">
                    This price will override the global category/base price for
                    this target.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          variant="primary-green"
          className="w-full h-10 font-medium text-sm"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <DollarSign className="mr-2 h-4 w-4" />
          )}
          {isLoading ? "Applying Price..." : "Set Exclusive Price"}
        </Button>
      </form>
    </Form>
  );
}
