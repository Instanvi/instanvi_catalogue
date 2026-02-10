"use client";

import { useSearchParams, useRouter } from "next/navigation";
import {
  OtpForm,
  type OtpFormValues,
} from "@/components/forms/auth/otp-form/OtpForm";
import { useCustomerLogin } from "@/hooks/use-customers";
import { Suspense } from "react";

function VerifyOtpContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const identifier = searchParams.get("identifier") || "";
  const login = useCustomerLogin();
  const isLoggingIn = login.isPending;

  const handleVerify = (values: OtpFormValues) => {
    login.mutate(values, {
      onSuccess: () => {
        router.push("/dashboard");
      },
    });
  };

  if (!identifier) {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-none border border-muted-foreground/10 p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold text-foreground">
              Verify Your Code
            </h1>
            <p className="text-sm text-muted-foreground">
              We sent a verification code to{" "}
              <span className="text-foreground font-medium">{identifier}</span>
            </p>
          </div>

          <OtpForm
            onSubmit={handleVerify}
            isLoading={isLoggingIn}
            identifier={identifier}
          />

          <div className="pt-4 border-t border-muted-foreground/10 text-center">
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-primary font-medium transition-colors"
              onClick={() => router.back()}
            >
              Wrong contact details? Go back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VerifyOtpPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-muted-foreground">
          Loading...
        </div>
      }
    >
      <VerifyOtpContent />
    </Suspense>
  );
}
