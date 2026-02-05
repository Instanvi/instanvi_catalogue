"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, ShieldCheck } from "lucide-react";
import { otpSchema, type OtpFormValues } from "./schema";
export type { OtpFormValues };

interface OtpFormProps {
  onSubmit: (values: OtpFormValues) => void;
  isLoading?: boolean;
  identifier: string;
}

export function OtpForm({ onSubmit, isLoading, identifier }: OtpFormProps) {
  const form = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      code: "",
      identifier,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-foreground text-center block">
                Verification Code
              </FormLabel>
              <FormControl>
                <Input
                  placeholder="000000"
                  className="h-14 text-center text-2xl font-semibold tracking-widest border-muted-foreground/20"
                  maxLength={6}
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-center text-xs">
                Enter the 6-digit code sent to your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full h-10 font-medium text-sm"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <>
              Verify Code
              <ShieldCheck className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );
}
