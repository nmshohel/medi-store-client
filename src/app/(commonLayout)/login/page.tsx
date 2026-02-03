import { LoginForm } from "@/components/modules/authentication/login-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {/* Wrapping in Suspense fixes the useSearchParams build error */}
        fallback=
        {
          <div className="flex flex-col space-y-3">
            <div className="h-[300px] w-full animate-pulse rounded-xl bg-muted" />
          </div>
        }
        <LoginForm />
      </div>
    </div>
  );
}
