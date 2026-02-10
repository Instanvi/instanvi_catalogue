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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Catalogue Name
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      placeholder="e.g. Summer Collection 2026"
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
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-1.5">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Visibility Type
                  </FormLabel>
                  <Select
                    disabled={isLoading}
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 rounded-none border-muted-foreground/20 focus:ring-primary/20 transition-colors shadow-none">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent className="rounded-none border-border">
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
              <FormItem className="space-y-1.5">
                <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                  Description
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    placeholder="Briefly describe the purpose of this collection..."
                    className="h-11 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20 transition-colors shadow-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-[12px] font-medium" />
              </FormItem>
            )}
          />

          {/* Row 3: Additional Settings */}
          <div className="flex items-center justify-between p-4 border border-muted-foreground/10 bg-muted/5 rounded-none">
            <div className="space-y-0.5">
              <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                Allow Cloning
              </FormLabel>
              <FormDescription className="text-[11px] text-muted-foreground/70">
                Enable others to duplicate this catalogue structure.
              </FormDescription>
            </div>
            <FormField
              control={form.control}
              name="allowCloning"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      disabled={isLoading}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="pt-4">
          <Button
            disabled={isLoading}
            type="submit"
            className="w-full h-11 bg-primary hover:bg-primary/90 text-white font-semibold rounded-none transition-all active:scale-[0.98]"
          >
            {initialData ? "Save Changes" : "Create Catalogue"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
