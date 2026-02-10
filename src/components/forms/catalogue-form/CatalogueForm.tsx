"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
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
import { Switch } from "@/components/ui/switch";
import { catalogueSchema, CatalogueFormValues } from "./schema";
import { cn } from "@/lib/utils";

interface CatalogueFormProps {
  initialData?: CatalogueFormValues;
  onSubmit: (values: CatalogueFormValues) => void;
  isLoading?: boolean;
}

export function CatalogueForm({
  initialData,
  onSubmit,
  isLoading,
}: CatalogueFormProps) {
  const form = useForm<CatalogueFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: zodResolver(catalogueSchema) as any,
    defaultValues: initialData || {
      name: "",
      description: "",
      type: "public",
      coverImageUrl: "",
      allowCloning: true,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <div className="space-y-8">
          {/* Row 1: Name and Type (Columnar Layout) */}
          <div className="">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-normal text-gray-600">
                    Catalogue name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="Ex: Summer Collection 2026"
                      className="h-12 rounded-none border-gray-200 focus:border-primary transition-all font-normal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-normal text-gray-600">
                    Visibility type
                  </FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 rounded-none border-gray-200 focus:ring-primary/20 bg-white font-normal w-full">
                        <SelectValue placeholder="Select a type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-none">
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                      <SelectItem value="commission">Commission</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-[12px] font-medium" />
                </FormItem>
              )}
            />
          </div>

          {/* Row 2: Description (Full Width) */}
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <FormLabel className="text-sm font-normal text-gray-600">
                  Description
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Briefly describe the purpose of this collection..."
                    className="h-12 rounded-none border-gray-200 focus:border-primary transition-all font-normal"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[12px] font-medium" />
              </FormItem>
            )}
          />

          {/* Row 3: Additional Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <FormField
              control={form.control}
              name="allowCloning"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between">
                  <div className="space-y-0.5 leading-none">
                    <p className="font-normal text-gray-400">Settings</p>
                    <p className="font-normal text-gray-700">Allow cloning</p>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                      className="data-[state=checked]:bg-primary"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="pt-8 flex justify-end w-full border-t border-gray-100">
          <Button
            disabled={isLoading}
            type="submit"
            className="h-14 px-12 w-full rounded-none  text-sm transition-all hover:bg-primary/95 active:scale-[0.98] bg-primary text-white shadow-xl border-b-4 border-primary/20"
          >
            {initialData ? "Save changes" : "Create catalogue"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
