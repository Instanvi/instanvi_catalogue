"use client";

import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader2, Building2, ArrowRight, User } from "lucide-react";
import {
  businessLoginSchema,
  businessRegisterSchema,
  type BusinessLoginFormValues,
  type BusinessRegisterFormValues,
} from "./schema";

interface BusinessFormProps {
  onLogin: (values: BusinessLoginFormValues) => void;
  onRegister: (values: BusinessRegisterFormValues) => void;
  isLoading?: boolean;
}

export function BusinessForm({
  onLogin,
  onRegister,
  isLoading,
}: BusinessFormProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  const loginForm = useForm<BusinessLoginFormValues>({
    resolver: zodResolver(businessLoginSchema),
    defaultValues: {
      identifier: "",
    },
  });

  const registerForm = useForm<BusinessRegisterFormValues>({
    resolver: zodResolver(businessRegisterSchema),
    defaultValues: {
      businessName: "",
      industry: "",
      adminName: "",
      email: "",
      phone: "",
      address: "",
    },
  });

  return (
    <div className="w-full">
      <Tabs
        defaultValue="login"
        value={activeTab}
        onValueChange={(v) => setActiveTab(v as "login" | "register")}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Create Business</TabsTrigger>
        </TabsList>

        <TabsContent value="login">
          <Form {...loginForm}>
            <form
              onSubmit={loginForm.handleSubmit(onLogin)}
              className="space-y-4"
            >
              <FormField
                control={loginForm.control}
                name="identifier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                      Email or Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="name@company.com"
                        className="h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary shadow-none transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-11 font-semibold text-sm mt-2 rounded-none bg-primary hover:bg-primary/90 text-white shadow-none transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Continue to Dashboard
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </Form>
        </TabsContent>

        <TabsContent value="register">
          <Form {...registerForm}>
            <form
              onSubmit={registerForm.handleSubmit(onRegister)}
              className="space-y-4"
            >
              <FormField
                control={registerForm.control}
                name="businessName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                      Business Name
                    </FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Building2 className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Acme Inc."
                          className="pl-9 h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary shadow-none transition-colors"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={registerForm.control}
                  name="adminName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                        Admin Name
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <User className="absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                          <Input
                            placeholder="John Doe"
                            className="pl-9 h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary shadow-none transition-colors"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="industry"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                        Industry (Optional)
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Technology"
                          className="h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary shadow-none transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={registerForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                        Email Address
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="admin@acme.com"
                          className="h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary shadow-none transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={registerForm.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                        Phone Number
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="+1 234 567 890"
                          className="h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary shadow-none transition-colors"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={registerForm.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-[#1c1c1c]">
                      Business Address (Optional)
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Main St, City, Country"
                        className="h-11 border-muted-foreground/20 rounded-none focus-visible:ring-primary shadow-none transition-colors"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full h-11 font-semibold text-sm mt-4 rounded-none bg-primary hover:bg-primary/90 text-white shadow-none transition-all"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Create Business Account"
                )}
              </Button>
            </form>
          </Form>
        </TabsContent>
      </Tabs>
    </div>
  );
}
