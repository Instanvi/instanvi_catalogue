"use client";

import {
  LoginForm,
  type LoginFormValues,
} from "@/components/forms/auth/login-form";
import { useRequestOtp } from "@/hooks/use-customers";
import { useRouter } from "next/navigation";
import Link from "next/link";

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
    });
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-none border border-muted-foreground/10 p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold text-foreground">
              Welcome Back
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your email or phone to access your account. A code will be
              sent to you for verification.
            </p>
          </div>

          <LoginForm onSubmit={handleLogin} isLoading={isRequestingOtp} />

          <div className="pt-4 border-t border-muted-foreground/10 text-center">
            <p className="text-sm text-muted-foreground">
              I don&apos;t have a business account?{" "}
              <Link
                href="/register"
                className="text-primary font-medium hover:underline"
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
