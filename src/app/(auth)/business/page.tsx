"use client";

// import { useSearchParams } from "next/navigation";
import { BusinessForm } from "@/components/forms/auth/business-form/BusinessForm";
import {
  type BusinessLoginFormValues,
  type BusinessRegisterFormValues,
} from "@/components/forms/auth/business-form/schema";

export default function BusinessAuthPage() {
  // const searchParams = useSearchParams();
  // const redirectTo = searchParams.get("redirect") || "/dashboard";

  const handleLogin = (values: BusinessLoginFormValues) => {
    console.log("Business Login:", values);
    // TODO: Connect to backend auth service
  };

  const handleRegister = (values: BusinessRegisterFormValues) => {
    console.log("Business Register:", values);
    // TODO: Connect to backend auth service
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-none border border-muted-foreground/10 p-8 space-y-6 shadow-none">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold text-foreground">
              Business Portal
            </h1>
            <p className="text-sm text-muted-foreground">
              Access your business dashboard to manage products and orders.
            </p>
          </div>

          <BusinessForm onLogin={handleLogin} onRegister={handleRegister} />
        </div>
      </div>
    </div>
  );
}
