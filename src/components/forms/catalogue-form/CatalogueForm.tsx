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
import { Checkbox } from "@/components/ui/checkbox";
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                Catalogue Name
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Ex: Summer Collection 2026"
                  className="h-11 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20"
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
            <FormItem>
              <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                Description
              </FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  placeholder="Briefly describe the purpose of this collection..."
                  className="h-11 rounded-none border-muted-foreground/20 focus-visible:ring-primary/20"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-[12px] font-medium" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                  Visibility Type
                </FormLabel>
                <Select
                  disabled={isLoading}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-11 rounded-none border-muted-foreground/20 focus:ring-primary/20">
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
          <FormField
            control={form.control}
            name="allowCloning"
            render={({ field }) => (
              <FormItem className="flex flex-row items-center space-x-3 space-y-0 rounded-none border border-muted-foreground/10 p-4 bg-muted/5">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className="rounded-none border-muted-foreground/30 data-[state=checked]:bg-primary"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                    Allow Members to Clone
                  </FormLabel>
                  <FormDescription className="text-[11px] leading-tight text-muted-foreground/70">
                    Resellers can create their own modified versions.
                  </FormDescription>
                </div>
              </FormItem>
            )}
          />
        </div>

        <div className="pt-4 flex justify-end w-full">
          <Button
            disabled={isLoading}
            type="submit"
            className="h-11 px-8 rounded-none font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98]"
          >
            {initialData ? "Save Changes" : "Create Catalogue"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
