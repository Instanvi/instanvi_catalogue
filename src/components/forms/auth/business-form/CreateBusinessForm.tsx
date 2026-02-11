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
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, Building2, Globe, Phone } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { createBusinessSchema, type CreateBusinessFormValues } from "./schema";

interface CreateBusinessFormProps {
  onSubmit: (values: CreateBusinessFormValues) => void;
  isLoading?: boolean;
}

export function CreateBusinessForm({
  onSubmit,
  isLoading,
}: CreateBusinessFormProps) {
  const form = useForm<CreateBusinessFormValues>({
    resolver: zodResolver(createBusinessSchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-semibold text-[#1c1c1c]">
                Business Name
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Building2 className="absolute left-3 top-3 sm:top-3.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Acme Corp"
                    className="pl-9 h-9 sm:h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary shadow-none transition-colors text-sm"
                    {...field}
                    onChange={(e) => {
                      field.onChange(e);
                      const slug = e.target.value
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-")
                        .replace(/^-+|-+$/g, "");
                      if (
                        !form.getValues("slug") ||
                        form.getValues("slug") === slug.slice(0, -1)
                      ) {
                        form.setValue("slug", slug);
                      }
                    }}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-semibold text-[#1c1c1c]">
                Slug (URL Identifier)
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Globe className="absolute left-3 top-3 sm:top-3.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="acme-corp"
                    className="pl-9 h-9 sm:h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary shadow-none transition-colors text-sm"
                    {...field}
                  />
                </div>
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm font-semibold text-[#1c1c1c]">
                  Business Email
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="contact@acme.com"
                    className="h-9 sm:h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary shadow-none transition-colors text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs sm:text-sm font-semibold text-[#1c1c1c]">
                  Phone Number
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 sm:top-3.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="+1 234 567 890"
                      className="pl-9 h-9 sm:h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary shadow-none transition-colors text-sm"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-semibold text-[#1c1c1c]">
                Address (Optional)
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="123 Business St, City, Country"
                  className="h-9 sm:h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary shadow-none transition-colors text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xs sm:text-sm font-semibold text-[#1c1c1c]">
                Description (Optional)
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us about your business..."
                  className="min-h-[80px] sm:min-h-[100px] border-muted-foreground/20 rounded-none focus-visible:ring-primary shadow-none transition-colors resize-none text-sm"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-xs" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full h-9 sm:h-11 font-semibold text-xs sm:text-sm mt-3 sm:mt-4 rounded-none bg-primary hover:bg-primary/90 text-white shadow-none transition-all"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Create Business"
          )}
        </Button>
      </form>
    </Form>
  );
}
