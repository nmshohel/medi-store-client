"use client";

import { getCategoriess } from "@/actions/category.action";
import { getSingleMedicine, updateMedicine } from "@/actions/medicine.action";
import { updateOrder } from "@/actions/order.action";
import { updateUser } from "@/actions/user.action";
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

type UpdateUserProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId: string;
};

type Order = {
  status: string;
};
const statusList = ["ban", "unban"];
export default function UpdateUser({
  open,
  onOpenChange,
  userId,
}: UpdateUserProps) {
  if (!userId) return null;

  /* -------------------- Form -------------------- */
  const form = useForm({
    defaultValues: {
      status: "",
    },
    onSubmit: async ({ value }) => {
      console.log("value*****************************", value);
      const toastId = toast.loading("Updating user...");
      try {
        const result = await updateUser(value, userId);
        toast.success("User updated successfully", { id: toastId });
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
          <DialogTitle>Update User</DialogTitle>
        </DialogHeader>

        <form
          id="status-form"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field name="status">
              {(field) => (
                <Field>
                  <FieldLabel>Status</FieldLabel>
                  <Select
                    value={field.state.value}
                    onValueChange={field.handleChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statusList.map((item) => (
                        <SelectItem key={item} value={item}>
                          {item}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              )}
            </form.Field>
          </FieldGroup>
        </form>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button type="submit" form="status-form">
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
