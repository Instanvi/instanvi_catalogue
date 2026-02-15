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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash2, Plus, Info } from "lucide-react";
import { productSchema, type ProductFormValues } from "./schema";
import { useProductUnits } from "@/hooks/use-product-units";

interface ProductFormProps {
  onSubmit: (formData: FormData) => void;
  isLoading?: boolean;
  defaultValues?: Partial<ProductFormValues>;
  formId?: string;
}

export function ProductForm({
  onSubmit,
  isLoading,
  defaultValues,
  formId,
}: ProductFormProps) {
  const [files, setFiles] = useState<File[]>([]);
  const { data: masterUnits, isLoading: isLoadingUnits } = useProductUnits();

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: defaultValues?.name || "",
      description: defaultValues?.description || "",
      price: defaultValues?.price || "0.00",
      sku: defaultValues?.sku || "",
      category: defaultValues?.category || "",
      productType: defaultValues?.productType || "",
      productUnitId: defaultValues?.productUnitId || "",
      secondaryUnits: defaultValues?.secondaryUnits || [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "secondaryUnits",
  });

  const handleFormSubmit = (values: ProductFormValues) => {
    const formData = new FormData();

    // Append primary fields
    formData.append("name", values.name);
    if (values.description) formData.append("description", values.description);
    formData.append("productUnitId", values.productUnitId);
    formData.append("price", values.price);
    formData.append("sku", values.sku);
    if (values.category) formData.append("category", values.category);
    if (values.productType) formData.append("productType", values.productType);

    // Append secondary units as JSON
    if (values.secondaryUnits && values.secondaryUnits.length > 0) {
      formData.append("secondaryUnits", JSON.stringify(values.secondaryUnits));
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
        id={formId}
        onSubmit={form.handleSubmit(handleFormSubmit)}
        className="space-y-6 pb-10"
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1.5 focus-within:z-10">
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
                <FormItem className="space-y-1.5 focus-within:z-10">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    SKU (Base Reference)
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
              name="productUnitId"
              render={({ field }) => (
                <FormItem className="space-y-1.5 focus-within:z-10">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Base Unit
                  </FormLabel>
                  <Select
                    disabled={isLoading || isLoadingUnits}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 border-muted-foreground/20 rounded-none focus:ring-primary/20 transition-colors shadow-none">
                        <SelectValue placeholder="Select a base unit" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-none">
                      {masterUnits?.map((unit) => (
                        <SelectItem key={unit.id} value={unit.id}>
                          {unit.name} ({unit.symbol})
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
              name="price"
              render={({ field }) => (
                <FormItem className="space-y-1.5 focus-within:z-10">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Base Retail Price ($)
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

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="space-y-1.5 focus-within:z-10">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Category
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Electronics"
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
              name="productType"
              render={({ field }) => (
                <FormItem className="space-y-1.5 focus-within:z-10">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Product Type
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="e.g. Physical, Digital"
                      className="h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary/20 transition-colors shadow-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />
          </div>

          <div className="pt-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-2 px-1">
              <div className="space-y-1">
                <FormLabel className="text-base font-bold text-black flex items-center gap-2">
                  Multi-Unit Selling
                  <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                </FormLabel>
                <p className="text-[12px] text-muted-foreground">
                  Add additional units (e.g. Pack, Crate) with conversion
                  factors
                </p>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() =>
                  append({
                    productUnitId: "",
                    price: "0.00",
                    conversionFactor: "1",
                    sku: "",
                  })
                }
                className="rounded-none border-primary text-primary hover:bg-primary/5 h-9 font-bold"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Unit
              </Button>
            </div>

            <div className="space-y-3">
              {fields.map((item, index) => (
                <div
                  key={item.id}
                  className="p-5 border border-muted-foreground/10 rounded-none bg-[#fafafa] relative group"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4">
                    <FormField
                      control={form.control}
                      name={`secondaryUnits.${index}.productUnitId`}
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                            Unit
                          </FormLabel>
                          <Select
                            disabled={isLoading || isLoadingUnits}
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-10 rounded-none border-muted-foreground/20 text-sm shadow-none bg-white">
                                <SelectValue placeholder="Select Unit" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="rounded-none">
                              {masterUnits?.map((unit) => (
                                <SelectItem key={unit.id} value={unit.id}>
                                  {unit.name} ({unit.symbol})
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`secondaryUnits.${index}.price`}
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                            Price ($)
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              className="h-10 rounded-none border-muted-foreground/20 text-sm shadow-none bg-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`secondaryUnits.${index}.conversionFactor`}
                      render={({ field }) => (
                        <FormItem className="space-y-1.5">
                          <FormLabel className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                            Factor
                          </FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="1"
                              className="h-10 rounded-none border-muted-foreground/20 text-sm shadow-none bg-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage className="text-[10px]" />
                        </FormItem>
                      )}
                    />
                    <div className="flex items-end gap-3">
                      <FormField
                        control={form.control}
                        name={`secondaryUnits.${index}.sku`}
                        render={({ field }) => (
                          <FormItem className="space-y-1.5 flex-1">
                            <FormLabel className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider">
                              SKU Override
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Optional"
                                className="h-10 rounded-none border-muted-foreground/20 text-sm shadow-none bg-white font-mono"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage className="text-[10px]" />
                          </FormItem>
                        )}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => remove(index)}
                        className="h-10 w-10 text-muted-foreground hover:text-destructive hover:bg-destructive/5 rounded-none"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
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
                <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                  Description
                </FormLabel>
                <FormControl>
                  <textarea
                    placeholder="Elaborate on the design and materials..."
                    className="min-h-[120px] w-full p-4 border border-muted-foreground/20 rounded-none focus:outline-none focus:border-primary transition-colors text-sm resize-none bg-transparent"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2">
            <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
              Product Images
            </FormLabel>
            <div className="p-6 border border-dashed border-muted-foreground/30 bg-muted/20 rounded-none hover:border-primary/50 transition-colors">
              <FileUploader onFilesChange={(newFiles) => setFiles(newFiles)} />
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
