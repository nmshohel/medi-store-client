"use client";

import { getCategoriess } from "@/actions/category.action";
import { getSingleMedicine, updateMedicine } from "@/actions/medicine.action";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type UpdateMedicineProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  medicineId: string | null;
};

type Category = {
  id: string;
  name: string;
};

type Medicine = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  manufacturer: string;
  image: string;
  categoryId?: string;
};

export default function UpdateMedicine({
  open,
  onOpenChange,
  medicineId,
}: UpdateMedicineProps) {
  if (!medicineId) return null;

  const [categories, setCategories] = useState<Category[]>([]);
  const [singleMedicine, setSingleMedicine] = useState<Medicine | null>(null);

  /* -------------------- Fetch categories -------------------- */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategoriess();
        setCategories(res?.data || []);
      } catch {
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  /* -------------------- Fetch single medicine -------------------- */
  useEffect(() => {
    if (!medicineId) return;

    const fetchSingleMedicine = async () => {
      try {
        const res = await getSingleMedicine(medicineId);
        setSingleMedicine(res.data);
      } catch {
        toast.error("Failed to load medicine");
      }
    };

    fetchSingleMedicine();
  }, [medicineId]);

  /* -------------------- Form -------------------- */
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      stock: 0,
      categoryId: "",
      manufacturer: "",
      image: "",
    },
    onSubmit: async ({ value }) => {
      const toastId = toast.loading("Updating medicine...");

      try {
        // await updateMedicine(medicineId, value);
        const result = await updateMedicine(value, medicineId);

        toast.success("Medicine updated successfully", { id: toastId });
        onOpenChange(false);
      } catch {
        toast.error("Update failed", { id: toastId });
      }
    },
  });

  /* -------------------- Prefill form -------------------- */
  useEffect(() => {
    if (!singleMedicine) return;

    form.reset({
      name: singleMedicine.name,
      description: singleMedicine.description,
      price: singleMedicine.price,
      stock: singleMedicine.stock,
      categoryId: singleMedicine.categoryId || "",
      manufacturer: singleMedicine.manufacturer,
      image: singleMedicine.image,
    });
  }, [singleMedicine]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Update Medicine</DialogTitle>
        </DialogHeader>

        <form
          id="medicine-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            {/* Name */}
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

            {/* Description */}
            <form.Field name="description">
              {(field) => (
                <Field>
                  <FieldLabel>Description</FieldLabel>
                  <Textarea
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            </form.Field>

            {/* Price */}
            <form.Field name="price">
              {(field) => (
                <Field>
                  <FieldLabel>Price</FieldLabel>
                  <Input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                  />
                </Field>
              )}
            </form.Field>

            {/* Stock */}
            <form.Field name="stock">
              {(field) => (
                <Field>
                  <FieldLabel>Stock</FieldLabel>
                  <Input
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                  />
                </Field>
              )}
            </form.Field>

            {/* Category */}
            <form.Field name="categoryId">
              {(field) => (
                <Field>
                  <FieldLabel>Category</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            </form.Field>

            {/* Manufacturer */}
            <form.Field name="manufacturer">
              {(field) => (
                <Field>
                  <FieldLabel>Manufacturer</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            </form.Field>

            {/* Image */}
            <form.Field name="image">
              {(field) => (
                <Field>
                  <FieldLabel>Image URL</FieldLabel>
                  <Input
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="medicine-form">
            Save changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
