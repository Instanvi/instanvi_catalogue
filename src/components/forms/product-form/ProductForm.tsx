"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Loader2, Package, Trash2, Plus, Info } from "lucide-react";
import { productSchema, type ProductFormValues } from "./schema";
import { cn } from "@/lib/utils";

interface ProductFormProps {
  onSubmit: (formData: FormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<ProductFormValues>;
}

export function ProductForm({
  onSubmit,
  isLoading,
  defaultValues,
}: ProductFormProps) {
  const [files, setFiles] = useState<File[]>([]);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      price: defaultValues?.price || "0.00",
      sku: defaultValues?.sku || "",
      category: defaultValues?.category || "",
      productType: defaultValues?.productType || "",
      units: defaultValues?.units || [
        {
          name: "Unit",
          price: "0.00",
          conversionFactor: "1",
          sku: "",
          isDefault: true,
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "units",
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
          businessId = user.businessId || user.organizationId; // Fallback for transition
        } catch (e) {
          console.error("Failed to parse user", e);
        }
      }
    }

    if (businessId) {
      formData.append("businessId", businessId);
    } else {
      console.error("Business ID missing");
    }

    // Append text fields
    formData.append("name", values.name);
    if (values.description) formData.append("description", values.description);
    if (values.price) formData.append("price", values.price);
    formData.append("sku", values.sku);
    if (values.category) formData.append("category", values.category);
    if (values.productType) formData.append("productType", values.productType);

    // Append units as stringified JSON (Standard for complex FormData)
    formData.append("units", JSON.stringify(values.units));

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
            </div>

            {/* Units Section */}
            <div className="pt-6 space-y-4">
              <div className="flex items-center justify-between border-b pb-2">
                <div className="space-y-1">
                  <FormLabel className="text-base font-bold text-black flex items-center gap-2">
                    Product Units
                    <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                  </FormLabel>
                  <p className="text-[12px] text-muted-foreground">
                    Define different selling units (e.g. Bottle, Pack, Crate)
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() =>
                    append({
                      name: "",
                      price: "0.00",
                      conversionFactor: "1",
                      sku: "",
                      isDefault: false,
                    })
                  }
                  className="rounded-none border-primary text-primary hover:bg-primary/5 h-9"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Unit
                </Button>
              </div>

              <div className="space-y-4">
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className={cn(
                      "p-4 border rounded-none bg-[#fafafa] relative group",
                      form.watch(`units.${index}.isDefault`)
                        ? "border-primary/30 ring-1 ring-primary/10"
                        : "border-muted-foreground/10",
                    )}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                      <FormField
                        control={form.control}
                        name={`units.${index}.name`}
                        render={({ field }) => (
                          <FormItem className="lg:col-span-1">
                            <FormLabel className="text-[11px] font-semibold text-muted-foreground/80">
                              Unit name
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="e.g. Bottle"
                                className="h-9 rounded-none border-muted-foreground/20 text-sm shadow-none bg-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`units.${index}.price`}
                        render={({ field }) => (
                          <FormItem className="lg:col-span-1">
                            <FormLabel className="text-[11px] font-semibold text-muted-foreground/80">
                              Price
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                step="0.01"
                                placeholder="0.00"
                                className="h-9 rounded-none border-muted-foreground/20 text-sm shadow-none bg-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`units.${index}.conversionFactor`}
                        render={({ field }) => (
                          <FormItem className="lg:col-span-1">
                            <FormLabel className="text-[11px] font-semibold text-muted-foreground/80">
                              Factor
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="1"
                                className="h-9 rounded-none border-muted-foreground/20 text-sm shadow-none bg-white"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name={`units.${index}.sku`}
                        render={({ field }) => (
                          <FormItem className="lg:col-span-1">
                            <FormLabel className="text-[11px] font-semibold text-muted-foreground/80">
                              SKU
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="SKU"
                                className="h-9 rounded-none border-muted-foreground/20 text-sm shadow-none bg-white font-mono"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <div className="flex items-end justify-between lg:col-span-1 gap-2">
                        <FormField
                          control={form.control}
                          name={`units.${index}.isDefault`}
                          render={({ field }) => (
                            <FormItem className="flex-1">
                              <FormControl>
                                <Button
                                  type="button"
                                  onClick={() => {
                                    // Reset all other units to isDefault: false
                                    fields.forEach((_, i) =>
                                      form.setValue(
                                        `units.${i}.isDefault`,
                                        i === index,
                                      ),
                                    );
                                  }}
                                  variant={field.value ? "default" : "outline"}
                                  className={cn(
                                    "w-full h-9 rounded-none text-[10px] font-bold tracking-tight",
                                    field.value &&
                                      "bg-primary text-white hover:bg-primary shadow-sm",
                                  )}
                                >
                                  {field.value ? "Default unit" : "Set default"}
                                </Button>
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        {fields.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => remove(index)}
                            className="h-9 w-9 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-none"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

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
            {isLoading
              ? "Saving..."
              : defaultValues?.name
                ? "Update Product"
                : "Create Product"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
