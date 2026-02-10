"use client";

import { useState } from "react";
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
import { cataloguesService } from "@/services/catalogues.service";
import { toast } from "sonner";

const requestAccessSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email().optional().or(z.literal("")),
    phone: z.string().optional().or(z.literal("")),
  })
  .refine((data) => data.email || data.phone, {
    message: "Either email or phone is required",
    path: ["email"],
  });

const verifyCodeSchema = z.object({
  code: z.string().length(6, "Code must be 6 digits"),
});

interface CatalogueAccessModalProps {
  isOpen: boolean;
  catalogueId: string;
  onSuccess: () => void;
}

export function CatalogueAccessModal({
  isOpen,
  catalogueId,
  onSuccess,
}: CatalogueAccessModalProps) {
  const [step, setStep] = useState<"request" | "verify">("request");
  const [isLoading, setIsLoading] = useState(false);

  const requestForm = useForm<z.infer<typeof requestAccessSchema>>({
    resolver: zodResolver(requestAccessSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const verifyForm = useForm<z.infer<typeof verifyCodeSchema>>({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const onRequestSubmit = async (
    values: z.infer<typeof requestAccessSchema>,
  ) => {
    setIsLoading(true);
    try {
      await cataloguesService.requestAccess(catalogueId, {
        name: values.name,
        email: values.email || undefined,
        phone: values.phone || undefined,
      });
      toast.success("Access Code Sent", {
        description:
          "Please check your email or phone for the verification code.",
      });
      setStep("verify");
    } catch (error) {
      console.error(error);
      toast.error("Request Failed", {
        description:
          "Failed to request access. Please ensure you are a registered customer.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onVerifySubmit = async (values: z.infer<typeof verifyCodeSchema>) => {
    setIsLoading(true);
    try {
      await cataloguesService.verifyAccess(catalogueId, {
        code: values.code,
      });
      toast.success("Access Granted", {
        description: "You now have access to this catalogue.",
      });
      onSuccess();
    } catch (error) {
      console.error(error);
      toast.error("Verification Failed", {
        description: "Invalid or expired code.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent
        className="sm:max-w-md"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>
            {step === "request" ? "Private Catalogue" : "Enter Access Code"}
          </DialogTitle>
          <DialogDescription>
            {step === "request"
              ? "This catalogue is private. Please identify yourself to request access."
              : "Enter the 6-digit code sent to you to view this catalogue."}
          </DialogDescription>
        </DialogHeader>

        {step === "request" ? (
          <Form {...requestForm}>
            <form
              onSubmit={requestForm.handleSubmit(onRequestSubmit)}
              className="space-y-4"
            >
              <FormField
                control={requestForm.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={requestForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email (Preferred)</FormLabel>
                    <FormControl>
                      <Input placeholder="john@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={requestForm.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="+1234567890" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Request Access
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...verifyForm}>
            <form
              onSubmit={verifyForm.handleSubmit(onVerifySubmit)}
              className="space-y-4"
            >
              <FormField
                control={verifyForm.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input placeholder="123456" maxLength={6} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col gap-2">
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Verify Access
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setStep("request")}
                  disabled={isLoading}
                >
                  Back
                </Button>
              </div>
            </form>
          </Form>
        )}
      </DialogContent>
    </Dialog>
  );
}
