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
import { Loader2, Save } from "lucide-react";
import { StockUpdateValues, stockUpdateSchema } from "./schema";
import { StockItem } from "@/services/stock.service";
import { useEffect } from "react";

interface StockUpdateFormProps {
  onSubmit: (values: StockUpdateValues) => void;
  isLoading?: boolean;
  stockItems: StockItem[];
  defaultValues?: Partial<StockUpdateValues>;
}

export function StockUpdateForm({
  onSubmit,
  isLoading,
  stockItems,
  defaultValues,
}: StockUpdateFormProps) {
  const form = useForm<StockUpdateValues>({
    resolver: zodResolver(stockUpdateSchema),
    defaultValues: {
      stockId: defaultValues?.stockId || "",
      quantity: 0,
      reason: "",
    },
  });

  // If a stockId is provided (e.g. from the row action), update the form value
  useEffect(() => {
    if (defaultValues?.stockId) {
      const selected = stockItems.find((s) => s.id === defaultValues.stockId);
      if (selected) {
        form.setValue("quantity", parseFloat(selected.quantity.toString()));
      }
    }
  }, [defaultValues?.stockId, stockItems, form]);

  const handleSelectChange = (val: string) => {
    form.setValue("stockId", val);
    const selected = stockItems.find((s) => s.id === val);
    if (selected) {
      form.setValue("quantity", parseFloat(selected.quantity.toString()));
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data))}
        className="space-y-6"
      >
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="stockId"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                  Product
                </FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={handleSelectChange}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-11 border-muted-foreground/20 rounded-none focus:ring-primary/20 transition-colors shadow-none text-left">
                      <SelectValue placeholder="Select a product to update" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="rounded-none border border-border max-h-[300px]">
                    {stockItems.map((item) => (
                      <SelectItem key={item.id} value={item.id}>
                        {item.product.name} ({item.product.sku}) - Current:{" "}
                        {item.quantity}
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
            name="quantity"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                  New Stock Quantity
                </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    disabled={isLoading}
                    placeholder="Enter total quantity in stock"
                    className="h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary/20 transition-colors shadow-none"
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.valueAsNumber || 0)
                    }
                  />
                </FormControl>
                <FormDescription className="text-[11px] text-muted-foreground italic">
                  Set the final quantity currently available.
                </FormDescription>
                <FormMessage className="text-[12px] font-medium" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="reason"
            render={({ field }) => (
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                  Reason for Change
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="e.g. Physical count, Restock"
                    className="h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary/20 transition-colors shadow-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[12px] font-medium" />
              </FormItem>
            )}
          />
        </div>

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full h-11 bg-black hover:bg-black/90 text-white font-semibold text-sm rounded-none transition-all active:scale-[0.98]"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Updating..." : "Update Stock Total"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
