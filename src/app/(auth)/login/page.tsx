"use client";

import {
  LoginForm,
  type LoginFormValues,
} from "@/components/forms/auth/login-form";
import { useRequestOtp } from "@/hooks/use-customers";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "sonner";
import { getErrorMessage } from "@/lib/axios";

export default function LoginPage() {
  const router = useRouter();
  const requestOtp = useRequestOtp();
  const isRequestingOtp = requestOtp.isPending;

  const handleLogin = (values: LoginFormValues) => {
    requestOtp.mutate(values.identifier, {
      onSuccess: () => {
        router.push(
          `/verify-otp?identifier=${encodeURIComponent(values.identifier)}`,
        );
      },
      onError: (error) => {
        toast.error("Login Failed", {
          description: getErrorMessage(error),
        });
      },
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center px-4 sm:px-6 py-12 sm:py-0">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg sm:rounded-none border border-muted-foreground/10 p-6 sm:p-8 space-y-6 shadow-sm sm:shadow-none">
          <div className="space-y-3 text-center">
            <h1 className="text-xl sm:text-2xl font-semibold text-foreground break-words">
              Welcome Back
            </h1>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Enter your email or phone to access your account. A code will be
              sent to you for verification.
            </p>
          </div>

          <LoginForm onSubmit={handleLogin} isLoading={isRequestingOtp} />

          <div className="pt-4 border-t border-muted-foreground/10 text-center">
            <p className="text-xs sm:text-sm text-muted-foreground">
              I don&apos;t have a business account?{" "}
              <Link
                href="/register"
                className="text-primary font-medium hover:underline transition-colors"
              >
                Create a Business Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
