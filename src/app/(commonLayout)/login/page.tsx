import { LoginForm } from "@/components/modules/authentication/login-form";
import { Suspense } from "react";
export default function Page() {
  return (
    <div className="flex  w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
          <LoginForm />
        </Suspense>
      </div>
    </div>
  );
}

// export default function Page() {
//   return (
//     <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
//       <div className="w-full max-w-sm">
//         <div className="flex flex-col space-y-3">
//           <div className="h-[300px] w-full animate-pulse rounded-xl bg-muted" />
//         </div>

//         <LoginForm />
//       </div>
//     </div>
//   );
// }
