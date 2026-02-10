"use client";

import {
  RegisterForm,
  type RegisterFormValues,
} from "@/components/forms/auth/register-form";
import Link from "next/link";

export default function RegisterPage() {
  const handleRegister = (values: RegisterFormValues) => {
    console.log("Registering:", values);
    // TODO: Implement registration logic
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-none border border-muted-foreground/10 p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold text-foreground">
              Create Account
            </h1>
            <p className="text-sm text-muted-foreground">
              Apply for customer access. We&apos;ll review your application and
              send you a verification code.
            </p>
          </div>

          <RegisterForm onSubmit={handleRegister} />

          <div className="pt-4 border-t border-muted-foreground/10 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-primary font-medium hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
