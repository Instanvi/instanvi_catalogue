"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "./components/columns";
import { productUnitsService } from "@/services/product-units.service";
import { FormSheet } from "@/components/form-sheet";
import { ErrorState } from "@/components/error-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1, "Unit name is required"),
  symbol: z.string().min(1, "Symbol is required"),
  factor: z.string().default("1"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function ProductUnitsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(formSchema) as any,
    defaultValues: {
      name: "",
      symbol: "",
      factor: "1",
      description: "",
    },
  });

  const {
    data: units,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["product-units"],
    queryFn: productUnitsService.getAll,
  });

  const createMutation = useMutation({
    mutationFn: productUnitsService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["product-units"] });
      setIsSheetOpen(false);
      form.reset();
      toast.success("Product unit created successfully");
    },
    onError: () => {
      toast.error("Failed to create product unit");
    },
  });

  const onSubmit = (values: FormValues) => {
    createMutation.mutate({
      ...values,
      factor: values.factor || "1",
    });
  };

  if (error)
    return (
      <ErrorState
        title="Service Unavailable"
        message="Unable to load product units at this time."
        onRetry={() => refetch()}
      />
    );

  return (
    <div className="space-y-4 sm:space-y-6 md:space-y-8">
      <div className="bg-white border border-muted/10 rounded-sm shadow-sm">
        <DataTable
          columns={columns}
          data={units || []}
          searchKey="name"
          addLabel="Add product unit"
          onAdd={() => setIsSheetOpen(true)}
          isLoading={isLoading}
        />
      </div>

      <FormSheet
        title="Add Product Unit"
        description="Create a new unit of measurement for your products."
        isOpen={isSheetOpen}
        onOpenChange={(open) => {
          setIsSheetOpen(open);
          if (!open) form.reset();
        }}
        footer={
          <Button
            type="submit"
            form="create-product-unit-form"
            className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-semibold text-sm rounded-lg shadow-sm transition-all active:scale-[0.98]"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            {createMutation.isPending ? "Saving..." : "Create product unit"}
          </Button>
        }
      >
        <Form {...form}>
          <form
            id="create-product-unit-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <div className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                      Unit Name
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Kilogram, Litre, Box"
                        className="h-11 rounded-md border-muted-foreground/20 focus-visible:ring-primary/20 transition-colors shadow-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[12px] font-medium" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="symbol"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                      Symbol
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. kg, L, bx"
                        className="h-11 rounded-md border-muted-foreground/20 focus-visible:ring-primary/20 transition-colors shadow-none font-mono"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[12px] font-medium" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="factor"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                      Default Factor
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="e.g. 1, 12, 24"
                        className="h-11 rounded-md border-muted-foreground/20 focus-visible:ring-primary/20 transition-colors shadow-none font-mono"
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
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Optional description of this unit..."
                        className="min-h-[100px] rounded-md border-muted-foreground/20 focus-visible:ring-primary/20 transition-colors shadow-none resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-[12px] font-medium" />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
      </FormSheet>
    </div>
  );
}
