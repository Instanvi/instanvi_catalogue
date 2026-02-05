"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
import { FileUploader } from "@/components/ui/file-uploader";
import { Loader2, Package } from "lucide-react";
import { productSchema, type ProductFormValues } from "./schema";

interface ProductFormProps {
  onSubmit: (formData: FormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<ProductFormValues>;
  categories?: { id: string; name: string }[];
}

export function ProductForm({
  onSubmit,
  isLoading,
  defaultValues,
  categories = [],
}: ProductFormProps) {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      basePrice: defaultValues?.basePrice || "0.00",
      sku: defaultValues?.sku || "",
      categoryPrices: defaultValues?.categoryPrices || {},
    },
  });

  const handleFormSubmit = (values: ProductFormValues) => {
    const formData = new FormData();

    // Append text fields
    formData.append("name", values.name);
    if (values.description) formData.append("description", values.description);
    formData.append("basePrice", values.basePrice);
    if (values.sku) formData.append("sku", values.sku);

    // Append category prices
    if (values.categoryPrices) {
      formData.append("categoryPrices", JSON.stringify(values.categoryPrices));
    }

    // Append files
    files.forEach((file) => {
      formData.append("files", file);
    });

    onSubmit(formData);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="max-w-2xl mx-auto space-y-8 pb-10"
      >
        <div className="space-y-6">
          {/* Header Section */}
          <div className="space-y-1">
            <h2 className="text-xl font-semibold text-foreground">
              Add New Product
            </h2>
            <p className="text-sm text-muted-foreground">
              Enter the information for the new product.
            </p>
          </div>

          <div className="space-y-5">
            {/* Basic Information Section */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Product Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Midnight Silk Watch"
                      className="h-11 border-muted-foreground/20 rounded-[4px] focus-visible:ring-0 focus-visible:border-primary focus-visible:ring-offset-0 transition-colors shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-medium text-foreground">
                    SKU / Reference
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. SN-2024-X"
                      className="h-11 border-muted-foreground/20 rounded-[4px] focus-visible:ring-0 focus-visible:border-primary focus-visible:ring-offset-0 transition-colors shadow-none font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="basePrice"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Retail Price ($)
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="h-11 border-muted-foreground/20 rounded-[4px] focus-visible:ring-0 focus-visible:border-primary focus-visible:ring-offset-0 transition-colors shadow-none font-semibold"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Description
                  </FormLabel>
                  <FormControl>
                    <textarea
                      placeholder="Elaborate on the design and materials..."
                      className="min-h-[100px] w-full p-3 border border-muted-foreground/20 rounded-[4px] focus:outline-none focus:border-primary transition-colors text-sm resize-none bg-transparent"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Media Section */}
            <div className="space-y-2">
              <FormLabel className="text-sm font-medium text-foreground">
                Product Images
              </FormLabel>
              <div className="p-4 border border-dashed border-muted-foreground/30 bg-muted/20 rounded-[4px] hover:border-primary/50 transition-colors">
                <FileUploader
                  onFilesChange={(newFiles) => setFiles(newFiles)}
                />
              </div>
            </div>

            {/* Pricing Segments Section */}
            {categories.length > 0 && (
              <div className="pt-4 space-y-4">
                <FormLabel className="text-sm font-semibold text-foreground block border-b pb-2">
                  Category Pricing
                </FormLabel>
                <div className="space-y-4">
                  {categories.map((category) => (
                    <FormField
                      key={category.id}
                      control={form.control}
                      name={`categoryPrices.${category.id}`}
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-xs font-medium text-muted-foreground">
                            {category.name} Segment Price
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              className="h-11 border-muted-foreground/20 rounded-[4px] focus-visible:ring-0 focus-visible:border-primary focus-visible:ring-offset-0 transition-colors shadow-none text-sm"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-6">
          <Button
            type="submit"
            className="w-full h-11 bg-primary text-white hover:bg-primary/90 font-bold text-sm rounded-[4px] transition-all"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Package className="mr-2 h-4 w-4" />
            )}
            {isLoading ? "Saving..." : "Create Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
