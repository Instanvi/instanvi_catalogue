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
  Tags,
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
  defaultValues?: Partial<CategoryFormValues>;
}

export function CategoryForm({
  onSubmit,
  isLoading,
  defaultValues,
}: CategoryFormProps) {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema) as Resolver<CategoryFormValues>,
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      discountPercentage: defaultValues?.discountPercentage || "0",
      markupPercentage: defaultValues?.markupPercentage || "0",
      priority: defaultValues?.priority || 0,
      isDefault: defaultValues?.isDefault || false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6">
          <div className="bg-primary/5 p-4 border-l-4 border-primary space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[13px] font-bold text-foreground">
                    Category Name
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Tags className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground/50" />
                      <Input
                        placeholder="e.g. VIP Retailers"
                        className="h-10 pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[13px] font-bold text-foreground">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Describe this category..."
                      className="h-10"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="discountPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[13px] font-bold text-foreground">
                    Global Discount (%)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Percent className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/50" />
                      <Input
                        type="number"
                        step="0.01"
                        className="h-10 pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormDescription className="text-[10px] text-muted-foreground">
                    Applied to all products for this category.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="markupPercentage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[13px] font-bold text-foreground">
                    Global Markup (%)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <TrendingUp className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/50" />
                      <Input
                        type="number"
                        step="0.01"
                        className="h-10 pl-10"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-[13px] font-bold text-foreground">
                    Priority Order
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <ListOrdered className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground/50" />
                      <Input
                        type="number"
                        className="h-10 pl-10"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                      />
                    </div>
                  </FormControl>
                  <FormDescription className="text-[10px] text-muted-foreground">
                    Higher priority overrides overlapping logic.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex items-center justify-between p-4 border border-muted-foreground/10 bg-muted/5">
            <div className="space-y-0.5">
              <FormLabel className="text-sm font-bold">
                Set as Default
              </FormLabel>
              <FormDescription className="text-xs">
                New members will be automatically assigned to this category.
              </FormDescription>
            </div>
            <FormField
              control={form.control}
              name="isDefault"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <Button
          type="submit"
          className="w-full h-12 bg-black hover:bg-black/90 text-white font-bold rounded-none"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <CheckCircle2 className="mr-2 h-5 w-5" />
          )}
          {isLoading ? "Saving Category..." : "Save Member Category"}
        </Button>
      </form>
    </Form>
  );
}
