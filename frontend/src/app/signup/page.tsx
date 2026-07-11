// app/signup/page.tsx
"use client";

import { Quote } from "@/components/forms/quote";
import SignupForm from "@/components/forms/signup-form";
import { Logo } from "@/components/logo";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-black">
      <Logo className="absolute top-6 left-6 z-50 w-32 sm:w-40 md:w-48" />

      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left */}
        <div className="flex items-center justify-center px-4 pt-28 pb-10 sm:px-8">
          <SignupForm />
        </div>

        {/* Right */}
        <div className="hidden lg:flex items-center justify-center px-12">
          <Quote />
        </div>
      </div>
    </div>
  );
}
