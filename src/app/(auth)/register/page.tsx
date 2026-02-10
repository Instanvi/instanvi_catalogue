"use client";

import { CreateBusinessForm } from "@/components/forms/auth/business-form/CreateBusinessForm";
import { type CreateBusinessFormValues } from "@/components/forms/auth/business-form/schema";
import { useCreateBusiness } from "@/hooks/use-businesses";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const createBusiness = useCreateBusiness();

  const handleRegister = (values: CreateBusinessFormValues) => {
    createBusiness.mutate(
      {
        ...values,
        settings: {},
      },
      {
        onSuccess: () => {
          toast.success("Business created successfully!");
          router.push("/login");
        },
        onError: (error) => {
          console.log(error);
          toast.error("Failed to create business");
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-muted/30 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg">
        <div className="bg-white rounded-none border border-muted-foreground/10 p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-2xl font-semibold text-foreground">
              Create Business
            </h1>
            <p className="text-sm text-muted-foreground">
              Register your organization to start managing your catalogue and
              orders.
            </p>
          </div>

          <CreateBusinessForm
            onSubmit={handleRegister}
            isLoading={createBusiness.isPending}
          />

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
