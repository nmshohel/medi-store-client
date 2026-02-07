import { RegisterForm } from "@/components/modules/authentication/register-form";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="flex  w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
          <RegisterForm />
        </Suspense>
      </div>
    </div>
  );
}
