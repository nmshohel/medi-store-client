import { RegisterForm } from "@/components/modules/authentication/register-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        {/* Suspense handles client-side hooks like useSearchParams during build */}
        <Suspense
          fallback={
            <div className="w-full h-[400px] animate-pulse bg-gray-100 rounded-lg flex items-center justify-center">
              <span className="text-sm text-muted-foreground">
                Loading form...
              </span>
            </div>
          }
        >
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
