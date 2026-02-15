"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "./components/columns";
import {
  productUnitsService,
  CreateProductUnitDto,
} from "@/services/product-units.service";
import { FormSheet } from "@/components/form-sheet";
import { ErrorState } from "@/components/error-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Plus } from "lucide-react";

export default function ProductUnitsPage() {
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [formData, setFormData] = useState<CreateProductUnitDto>({
    name: "",
    symbol: "",
    description: "",
  });

  const queryClient = useQueryClient();

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
      setFormData({ name: "", symbol: "", description: "" });
      toast.success("Product unit created successfully");
    },
    onError: () => {
      toast.error("Failed to create product unit");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createMutation.mutate(formData);
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
          addLabel="Add Product Unit"
          onAdd={() => setIsSheetOpen(true)}
          isLoading={isLoading}
        />
      </div>

      <FormSheet
        title="Add Product Unit"
        description="Create a new unit of measurement for your products."
        isOpen={isSheetOpen}
        onOpenChange={setIsSheetOpen}
        footer={
          <Button
            type="submit"
            form="create-product-unit-form"
            className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-semibold text-sm rounded-none transition-all active:scale-[0.98]"
            disabled={createMutation.isPending}
          >
            {createMutation.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            {createMutation.isPending ? "Saving..." : "Create Product Unit"}
          </Button>
        }
      >
        <form
          id="create-product-unit-form"
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          <div className="space-y-6">
            <div className="space-y-1.5">
              <Label
                htmlFor="name"
                className="text-sm font-semibold text-[#1c1c1c]"
              >
                Unit Name
              </Label>
              <Input
                id="name"
                placeholder="e.g. Kilogram, Litre, Box"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className="h-11 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20 transition-colors shadow-none"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="symbol"
                className="text-sm font-semibold text-[#1c1c1c]"
              >
                Symbol
              </Label>
              <Input
                id="symbol"
                placeholder="e.g. kg, L, bx"
                value={formData.symbol}
                onChange={(e) =>
                  setFormData({ ...formData, symbol: e.target.value })
                }
                required
                className="h-11 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20 transition-colors shadow-none font-mono"
              />
            </div>
            <div className="space-y-1.5">
              <Label
                htmlFor="factor"
                className="text-sm font-semibold text-[#1c1c1c]"
              >
                Default Factor
              </Label>
              <Input
                id="factor"
                type="number"
                step="0.01"
                placeholder="e.g. 1, 12, 24"
                value={formData.factor || "1"}
                onChange={(e) =>
                  setFormData({ ...formData, factor: e.target.value })
                }
                className="h-11 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20 transition-colors shadow-none font-mono"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <Label
              htmlFor="description"
              className="text-sm font-semibold text-[#1c1c1c]"
            >
              Description
            </Label>
            <Textarea
              id="description"
              placeholder="Optional description of this unit..."
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="min-h-[100px] rounded-none border-muted-foreground/20 focus-visible:ring-primary/20 transition-colors shadow-none resize-none"
            />
          </div>
        </form>
      </FormSheet>
    </div>
  );
}
