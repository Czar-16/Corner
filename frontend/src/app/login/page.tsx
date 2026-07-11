"use client";

import LoginForm from "@/components/forms/login-form";
import { Logo } from "@/components/logo";

export default function SignInPage() {
  return (
    <div className="relative min-h-screen bg-black">
      {/* Logo */}
      <Logo className="absolute top-6 left-6 z-50 w-32 sm:w-40 md:w-48 lg:w-56" />

      {/* Login Form */}
      <div className="flex min-h-screen items-center justify-center px-4 pt-24 pb-8">
        <LoginForm />
      </div>
    </div>
  );
}
