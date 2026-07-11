"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signinInput } from "@czar16/common";
import type { z } from "zod";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

type SigninFormData = z.infer<typeof signinInput>;

export default function LoginForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinInput),
  });

  async function onSubmit(data: SigninFormData) {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/v1/user/signin`,
        data,
      );

      toast.success("Login successful");
      router.push("/blog");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || "Login failed");
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  return (
    <div className="w-full max-w-md px-4 sm:px-6">
      <div className="rounded-3xl border border-[#2A2A2E] bg-[#161618] p-6 sm:p-8 shadow-[0_0_40px_rgba(201,162,107,0.08)]">
        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-[#9C9891]">
          Welcome back
        </p>

        <h1
          className="mb-8 text-3xl text-[#F2EFE9]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Sign in to Corner
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div>
            <Label className="text-[#9C9891]">Email</Label>
            <Input
              {...register("email")}
              type="email"
              placeholder="john@example.com"
              className="mt-2 bg-[#1B1B1E] border-[#2A2A2E] text-[#F2EFE9] placeholder:text-[#5A5751] focus-visible:ring-[#C9A26B]"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-[#E0847A]">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <Label className="text-[#9C9891]">Password</Label>
            <Input
              {...register("password")}
              type="password"
              placeholder="••••••••"
              className="mt-2 bg-[#1B1B1E] border-[#2A2A2E] text-[#F2EFE9] placeholder:text-[#5A5751] focus-visible:ring-[#C9A26B]"
            />
            {errors.password && (
              <p className="mt-1 text-sm text-[#E0847A]">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="mt-3 w-full bg-[#C9A26B] text-[#121214] font-medium hover:bg-[#B58F5C]"
          >
            Sign in
          </Button>

          <p className="pt-2 text-center text-sm text-[#9C9891]">
            Don't have an account?{" "}
            <Link
              href="/signup"
              className="text-[#C9A26B] underline underline-offset-4 transition-colors hover:text-[#D9B37E]"
            >
              Create one
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
