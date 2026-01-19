"use client";

import useRegister from "@/hooks/use-register";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useTranslations } from "next-intl";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters long"),
  phone: z.string().min(10, "Phone number must be at least 10 characters long"),
  location: z.string().min(2, "Location must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
  gender: z.enum(["Male", "Female"], { message: "Please select your gender" }),
});

const Register = () => {
  const { mutate, isLoading, error } = useRegister();

  const t = useTranslations()
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      gender: "Male",
      phone: "",
      location: "",
      password: "",
    },
  });

  const onSubmit = (data: z.infer<typeof formSchema>) => {
    console.log(data)
    // mutate(data);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-foreground flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="border border-slate-800 bg-slate-900/70 backdrop-blur-xl rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-white">
              Create your account
            </h1>
            <p className="text-sm text-muted-foreground">
              Join Shark and start managing your account in a few seconds.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="John Doe"
                        className="text-white"
                        autoComplete="name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Your phone number with country code no."
                          type="tel"
                          autoComplete="tel"
                          className="text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="location"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Jeddah, Saudi"
                          autoComplete="address-level2"
                          className="text-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="gender"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gender</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue className="text-white" placeholder="Select your gender" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="">
                        <SelectItem value="Male">Male</SelectItem>
                        <SelectItem value="Female">Female</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="name@example.com"
                        autoComplete="email"
                        className="text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        className="text-white"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {error && (
                <p className="text-sm text-red-500">
                  {error instanceof Error
                    ? error.message
                    : "Something went wrong. Please try again."}
                </p>
              )}

              <Button
                type="submit"
                className="w-full mt-2 bg-blue-500"
                disabled={isLoading}
              >
                {isLoading ? "Creating account..." : "Create account"}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;


