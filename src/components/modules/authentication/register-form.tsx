// "use client"
// import { Button } from "@/components/ui/button"
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
// import { Input } from "@/components/ui/input"
// import { authClient } from "@/lib/auth-client"

// import {useForm} from "@tanstack/react-form"
// import z from "zod"
// import { toast } from "sonner";

// const formSchema = z.object({
//   name: z.string().min(1, "This field is required"),
//   password: z.string().min(8, "Minimum length is 8"),
//   role: z.string().min(1, "This field is required"),
//   email: z.email(),
// });
// export function RegisterForm({ ...props }: React.ComponentProps<typeof Card>) {

//   const form=useForm({
//     defaultValues:{
//       name:"",
//       email:"",
//       role:"",
//       password:""
//     },
//       validators: {
//       onSubmit: formSchema,
//     },
//     onSubmit: async ({ value }) => {
//       const toastId = toast.loading("Creating user");
//       try {
//         const { data, error } = await authClient.signUp.email(value);

//         if (error) {
//           toast.error(error.message, { id: toastId });
//           return;
//         }

//         toast.success("User Created Successfully", { id: toastId });
//       } catch (err) {
//         toast.error("Something went wrong, please try again.", { id: toastId });
//       }
//     },
//   })
//   return (
//     <Card {...props}>
//       <CardHeader>
//         <CardTitle>Create an account</CardTitle>
//         <CardDescription>
//           Enter your information below to create your account
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <form id="register-form" onSubmit={(e)=>{
//           e.preventDefault();
//           form.handleSubmit();
//         }}>

//           <FieldGroup>
//               <form.Field name="name" children={(field)=>{
//                   const isInvalid =
//                   field.state.meta.isTouched && !field.state.meta.isValid;
//                 return(
//                   <Field>
//                           <FieldLabel htmlFor={field.name}>Name</FieldLabel>
//                           <Input
//                           type="text"
//                           id={field.name}
//                           name={field.name}
//                           value={field.state.value}
//                           onChange={(e)=>field.handleChange(e.target.value)}
//                           />
//                     {isInvalid && (
//                       <FieldError errors={field.state.meta.errors} />
//                     )}
//                   </Field>
//                 )
//               }}/>
//                 <form.Field name="email" children={(field)=>{
//                   const isInvalid =
//                   field.state.meta.isTouched && !field.state.meta.isValid;
//                 return(
//                   <Field>
//                           <FieldLabel htmlFor={field.name}>Email</FieldLabel>
//                           <Input
//                           type="email"
//                           id={field.name}
//                           name={field.name}
//                           value={field.state.value}
//                           onChange={(e)=>field.handleChange(e.target.value)}
//                           />
//                    {isInvalid && (
//                       <FieldError errors={field.state.meta.errors} />
//                     )}
//                   </Field>
//                 )
//               }}/>
//                     <form.Field name="role" children={(field)=>{
//                         const isInvalid =
//                         field.state.meta.isTouched && !field.state.meta.isValid;
//                       return(
//                         <Field>
//                                 <FieldLabel htmlFor={field.name}>Role</FieldLabel>
//                                 <Input
//                                 type="text"
//                                 id={field.name}
//                                 name={field.name}
//                                 value={field.state.value}
//                                 onChange={(e)=>field.handleChange(e.target.value)}
//                                 />
//                           {isInvalid && (
//                             <FieldError errors={field.state.meta.errors} />
//                           )}
//                         </Field>
//                       )
//                     }}/>

//                 <form.Field name="password" children={(field)=>{
//                   const isInvalid =
//                   field.state.meta.isTouched && !field.state.meta.isValid;
//                 return(
//                   <Field>
//                           <FieldLabel htmlFor={field.name}>Password</FieldLabel>
//                           <Input
//                           type="password"
//                           id={field.name}
//                           name={field.name}
//                           value={field.state.value}
//                           onChange={(e)=>field.handleChange(e.target.value)}
//                           />
//                     {isInvalid && (
//                       <FieldError errors={field.state.meta.errors} />
//                     )}
//                   </Field>
//                 )
//               }}/>
//           </FieldGroup>
            
//         </form>
//       </CardContent>
//       <CardFooter className="flex flex-col gap-5 justify-end">
//                   <Button form="register-form" type="submit" className="w-full">Register</Button>
//       </CardFooter>
//     </Card>
//   )
// }


"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import z, { boolean } from "zod";
import { useRouter, useSearchParams } from "next/navigation";
/* ------------------ Zod Schema ------------------ */
const formSchema = z.object({
  name: z.string().min(1, "This field is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "Minimum length is 8"),
 
 role: z.enum(["CUSTOMER", "SELLER"]).refine(
    (val) => val === "CUSTOMER" || val === "SELLER",
    {
      message: "Please select a role",
    }
  ),
});

/* ------------------ Component ------------------ */
export function RegisterForm(props: React.ComponentProps<typeof Card>) {
      const seachParams = useSearchParams();
    const redirect = seachParams.get("redirectPath");
    const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
   
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Creating user...");
 

      try {
        const { data,error } = await authClient.signUp.email(value);
     


        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User created successfully 🎉", { id: toastId });
        router.push("/login");
      } catch (err) {
        toast.error("Something went wrong, please try again.", {
          id: toastId,
        });
      }
    },
  });

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form
          id="register-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* -------- Name -------- */}
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                    <Input
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* -------- Email -------- */}
            <form.Field
              name="email"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input
                      type="email"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* -------- Role (Select) -------- */}
            <form.Field
              name="role"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Role</FieldLabel>

                    <Select
                      value={field.state.value}
                      onValueChange={(value) =>
                        field.handleChange(value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="CUSTOMER">
                          CUSTOMER
                        </SelectItem>
                        <SelectItem value="SELLER">
                          SELLER
                        </SelectItem>
                      </SelectContent>
                    </Select>

                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            {/* -------- Password -------- */}
            <form.Field
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched &&
                  !field.state.meta.isValid;

                return (
                  <Field>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      value={field.state.value}
                      onChange={(e) =>
                        field.handleChange(e.target.value)
                      }
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter>
        <Button
          type="submit"
          form="register-form"
          className="w-full"
        >
          Register
        </Button>
      </CardFooter>
    </Card>
  );
}

