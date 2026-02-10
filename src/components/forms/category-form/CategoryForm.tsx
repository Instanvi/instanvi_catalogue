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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Loader2,
  Percent,
  TrendingUp,
  CheckCircle2,
  ListOrdered,
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { categorySchema, type CategoryFormValues } from "./schema";

interface CategoryFormProps {
  onSubmit: (values: CategoryFormValues) => void;
  isLoading?: boolean;
  initialData?: Partial<CategoryFormValues>;
}

export function CategoryForm({
  onSubmit,
  isLoading,
  initialData,
}: CategoryFormProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema) as Resolver<CategoryFormValues>,
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      discountPercentage: initialData?.discountPercentage || "0",
      markupPercentage: initialData?.markupPercentage || "0",
      priority: initialData?.priority || 0,
      isDefault: initialData?.isDefault || false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Category Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="e.g. VIP Retailers"
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Describe the purpose of this pricing tier..."
                      className="h-11 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20 transition-colors shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="discountPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Global Discount (%)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Percent className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground/50" />
                      <Input
                        disabled={isLoading}
                        type="number"
                        step="0.01"
                        className="h-11 pl-10 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20 transition-colors shadow-none"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription className="text-[11px] text-muted-foreground/60 leading-tight">
                    Applied automatically to all products for this category.
                  </FormDescription>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="markupPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Global Markup (%)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <TrendingUp className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground/50" />
                      <Input
                        disabled={isLoading}
                        type="number"
                        step="0.01"
                        className="h-11 pl-10 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20 transition-colors shadow-none"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Priority Order
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <ListOrdered className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground/50" />
                      <Input
                        disabled={isLoading}
                        type="number"
                        className="h-11 pl-10 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20 transition-colors shadow-none"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </div>
                  </FormControl>
                  <FormDescription className="text-[11px] text-muted-foreground/60 leading-tight">
                    Higher priority tiers take precedence in overlapping logic.
                  </FormDescription>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-between p-4 border border-muted-foreground/10 bg-muted/5 rounded-none">
            <div className="space-y-0.5">
              <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                Set as Default Category
              </FormLabel>
              <FormDescription className="text-[11px] text-muted-foreground/70">
                New registered members will be automatically assigned here.
              </FormDescription>
            </div>
            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      disabled={isLoading}
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <Button
            type="submit"
            className="h-11 px-8 bg-[#1c1c1c] hover:bg-[#1c1c1c]/90 text-white font-semibold rounded-none transition-all active:scale-[0.98]"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <CheckCircle2 className="mr-2 h-4 w-4" />
            )}
            {isLoading
              ? "Saving..."
              : initialData
                ? "Update Category"
                : "Save Category"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
