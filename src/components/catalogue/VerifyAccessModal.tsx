"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import api, { getErrorMessage } from "@/lib/axios";
import { useVerifyCatalogueAccess } from "@/hooks/use-catalogue-access";

const verifyCodeSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

interface VerifyAccessModalProps {
  isOpen: boolean;
  catalogueId: string;
  onSuccess: () => void;
  onBack: () => void;
}

export function VerifyAccessModal({
  isOpen,
  catalogueId,
  onSuccess,
  onBack,
}: VerifyAccessModalProps) {
  const verifyMutation = useVerifyCatalogueAccess();

  const form = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = (values: z.infer<typeof verifyCodeSchema>) => {
    verifyMutation.mutate(
      {
        id: catalogueId,
        data: {
          code: values.code,
        },
      },
      {
        onSuccess: (data) => {
          if (data.data.access_token) {
            localStorage.setItem("token", data.data.access_token);
            api.defaults.headers.common["Authorization"] =
              `Bearer ${data.data.access_token}`;
          }
          toast.success("Access Granted", {
            description: "You now have access to this catalogue.",
          });
          onSuccess();
        },
        onError: (error) => {
          console.error(error);
          toast.error("Verification Failed", {
            description: getErrorMessage(error),
          });
        },
      },
    );
  };

  return (
    <Dialog open={isOpen}>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Enter Access Code</DialogTitle>
          <DialogDescription>
            Enter the 6-digit code sent to you to view this catalogue.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Verification Code</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="123456"
                      className="text-center h-12 text-lg"
                      autoFocus
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col gap-2">
              <Button
                type="submit"
                className="w-full"
                disabled={verifyMutation.isPending}
              >
                {verifyMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Verify Access
              </Button>
              <Button
                type="button"
                variant="ghost"
                onClick={onBack}
                disabled={verifyMutation.isPending}
              >
                Back
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
