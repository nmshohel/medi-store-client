"use client";

import { addCategory } from "@/actions/category.action";
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

export default function AddCategory() {
  const form = useForm({
    defaultValues: {
      name: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Adding category...");
      try {
        await addCategory(value);
        toast.success("Category added successfully", { id: toastId });
        form.reset();
      } catch {
        toast.error("Add failed", { id: toastId });
      }
    },
  });

  return (
    <div>
      <form
        id="category-form"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <form.Field name="name">
            {(field) => (
              <Field>
                <FieldLabel>Name</FieldLabel>
                <Input
                  className="min-w-[300px]"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Category name"
                />
                <FieldError errors={field.state.meta.errors} />
              </Field>
            )}
          </form.Field>
        </FieldGroup>
      </form>

      <div className="flex justify-end gap-2 mt-4">
        <Button type="submit" form="category-form">
          Save
        </Button>
      </div>
    </div>
  );
}
