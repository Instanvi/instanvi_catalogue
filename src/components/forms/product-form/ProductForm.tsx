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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(productSchema) as any,
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      price: defaultValues?.price || "0.00",
      sku: defaultValues?.sku || "",
      category: defaultValues?.category || "",
      unit: defaultValues?.unit || "piece",
      productType: defaultValues?.productType || "",
    },
  });

  const handleFormSubmit = (values: ProductFormValues) => {
    const formData = new FormData();

    // Get businessId
    let businessId = "";
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const user = JSON.parse(storedUser);
          businessId = user.businessId;
        } catch (e) {
          console.error("Failed to parse user", e);
        }
      }
    }

    if (businessId) {
      formData.append("businessId", businessId);
    } else {
      console.error("Business ID missing");
      // Depending on UX, might want to show error or return
    }

    // Append text fields
    formData.append("name", values.name);
    if (values.description) formData.append("description", values.description);
    formData.append("price", values.price);
    formData.append("sku", values.sku);
    if (values.category) formData.append("category", values.category);
    if (values.unit) formData.append("unit", values.unit);
    if (values.productType) formData.append("productType", values.productType);



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
        className="space-y-6 pb-10"
      >
        <div className="space-y-6">
          <div className="space-y-4">
            {/* Basic Information Section */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Product Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="e.g. Midnight Silk Watch"
                      className="h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary/20 transition-colors shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="sku"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    SKU / Reference
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="e.g. SN-2024-X"
                      className="h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary/20 transition-colors shadow-none font-mono text-sm"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Retail Price ($)
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="number"
                      step="0.01"
                      placeholder="0.00"
                      className="h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary/20 transition-colors shadow-none font-semibold"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />

            {/* Price was here */}

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-sm font-medium text-foreground">
                      Category
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g. Electronics"
                        className="h-11 border-muted-foreground/20 rounded-none focus-visible:ring-0 focus-visible:border-primary focus-visible:ring-offset-0 transition-colors shadow-none text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="unit"
                render={({ field }) => (
                  <FormItem className="space-y-1.5">
                    <FormLabel className="text-sm font-medium text-foreground">
                      Unit (e.g. piece, kg)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="piece"
                        className="h-11 border-muted-foreground/20 rounded-none focus-visible:ring-0 focus-visible:border-primary focus-visible:ring-offset-0 transition-colors shadow-none text-sm"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="productType"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-medium text-foreground">
                    Product Type
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Physical, Digital"
                      className="h-11 border-muted-foreground/20 rounded-none focus-visible:ring-0 focus-visible:border-primary focus-visible:ring-offset-0 transition-colors shadow-none text-sm"
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
                      className="min-h-[100px] w-full p-3 border border-muted-foreground/20 rounded-none focus:outline-none focus:border-primary transition-colors text-sm resize-none bg-transparent"
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
              <div className="p-4 border border-dashed border-muted-foreground/30 bg-muted/20 rounded-none hover:border-primary/50 transition-colors">
                <FileUploader
                  onFilesChange={(newFiles) => setFiles(newFiles)}
                />
              </div>
            </div>


          </div>
        </div>

        {/* Action Bar */}
        <div className="pt-6">
          <Button
            type="submit"
            className="w-full h-11 bg-primary text-white hover:bg-primary/90 font-bold text-sm rounded-none transition-all"
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
