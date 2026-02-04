"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { useEffect } from "react";
import { updateUser } from "@/actions/user.action";

// Mocking the update API call
// const updateProfile = async (data: any) => {
//   // Replace with your actual API call
//   console.log("Updating profile with:", data);
//   return new Promise((resolve) => setTimeout(resolve, 1000));
// };

type UserData = {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string | null;
};

export default function UpdateProfile({ user }: { user: UserData }) {
  const form = useForm({
    defaultValues: {
      name: user?.name || "",
      phone: user?.phone || "",
      image: user?.image || "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating Profile...");
      try {
        await updateUser(value, user.id);
        toast.success("Profile updated successfully", { id: toastId });
      } catch (error) {
        toast.error("Update failed", { id: toastId });
      }
    },
  });

  // This ensures the form resets if the user prop changes (e.g., after a fetch)
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name,
        phone: user.phone,
        image: user.image || "",
      });
    }
  }, [user, form]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-sm border mt-10">
      <h2 className="text-xl font-bold mb-4">Edit Profile</h2>

      <form
        id="profile-form"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          {/* Name Field */}
          <form.Field
            name="name"
            children={(field) => (
              <Field>
                <FieldLabel>Full Name</FieldLabel>
                <Input
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Enter your name"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          {/* Phone Field */}
          <form.Field
            name="phone"
            children={(field) => (
              <Field>
                <FieldLabel>Phone Number</FieldLabel>
                <Input
                  type="tel"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="017XXXXXXXX"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          {/* Image URL Field (Simplified) */}
          <form.Field
            name="image"
            children={(field) => (
              <Field>
                <FieldLabel>Profile Image URL</FieldLabel>
                <Input
                  type="url"
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="https://example.com/photo.jpg"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          />

          <Button type="submit" className="w-full mt-4">
            Save Changes
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
