"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"

import {useForm} from "@tanstack/react-form"
import z from "zod"
import { toast } from "sonner";

const formSchema = z.object({
  password: z.string().min(8, "Minimum length is 8"),
  email: z.email(),
});
export function LoginForm({ ...props }: React.ComponentProps<typeof Card>) {
  const form=useForm({
    defaultValues:{
   
      email:"",
      password:""
    },
      validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("value",value)
      const toastId = toast.loading("Login in");
      try {
        const { data, error } = await authClient.signIn.email(value);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }

        toast.success("User Logged in Successfully", { id: toastId });
      } catch (err) {
        toast.error("Something went wrong, please try again.", { id: toastId });
      }
    },
  })
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Please Log In</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="register-form" onSubmit={(e)=>{
          e.preventDefault();
          form.handleSubmit();
        }}>

          <FieldGroup>
                <form.Field name="email" children={(field)=>{
                  const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return(
                  <Field>
                          <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                          <Input
                          type="email"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e)=>field.handleChange(e.target.value)}
                          />
                   {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}/>
                <form.Field name="password" children={(field)=>{
                  const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return(
                  <Field>
                          <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                          <Input
                          type="password"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e)=>field.handleChange(e.target.value)}
                          />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                )
              }}/>
          </FieldGroup>
            
        </form>
      </CardContent>
      <CardFooter className="flex flex-col gap-5 justify-end">
                  <Button  form="register-form" type="submit" className="w-full">Login</Button>

      </CardFooter>
    </Card>
  )
}
