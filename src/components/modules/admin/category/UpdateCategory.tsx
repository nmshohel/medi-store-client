"use client";

import { getSingleCategory, updateCategory } from "@/actions/category.action";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";

import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type UpdateCategoryProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  categoryId: string | null;
};

type Category = {
  id: string;
  name: string;
};

export default function UpdateCategory({
  open,
  onOpenChange,
  categoryId,
}: UpdateCategoryProps) {
  if (!categoryId) return null;

  const [category, setCategory] = useState<string>("");

  /* -------------------- Fetch category -------------------- */
  useEffect(() => {
    if (!categoryId) return;

    const fetchCategory = async () => {
      try {
        const res = await getSingleCategory(categoryId);

        setCategory(res?.data?.name);
      } catch {
        toast.error("Failed to load category");
      }
    };

    fetchCategory();
  }, [categoryId]);

  const form = useForm({
    defaultValues: {
      name: category,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating Category...");
      try {
        const result = await updateCategory(value, categoryId);

        toast.success("Category updated successfully", { id: toastId });
        onOpenChange(false);
      } catch {
        toast.error("Update failed", { id: toastId });
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Medicine</DialogTitle>
        </DialogHeader>

        <form
          id="category-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Category */}
            <form.Field name="name">
              {(field) => (
                <Field>
                  <FieldLabel>Name</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldError errors={field.state.meta.errors} />
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="category-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
