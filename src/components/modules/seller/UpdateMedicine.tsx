// "use client";

// import { getCategoriess } from "@/actions/category.action";
// import { getSingleMedicine } from "@/actions/medicine.action";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogClose,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
// } from "@/components/ui/field";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { useForm } from "@tanstack/react-form";
// import { useEffect, useState } from "react";
// import { toast } from "sonner";

// type UpdateMedicineProps = {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   medicineId: string | null;
// };

// export default function UpdateMedicine({
//   open,
//   onOpenChange,
//   medicineId,
// }: UpdateMedicineProps) {
//   if (!medicineId) return null;

//   // const getSingleDedicine=await

//   const [categories, setCategories] = useState<{ id: string; name: string }[]>(
//     [],
//   );
//   const [singleMedicine, setSingleMedicine] = useState<{
//     id: string;
//     name: string;
//     description: string;
//     price: number;
//     stock: number;
//     manufacturer: string;
//     image: string;
//   }>();

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await getCategoriess();

//         const data = res?.data;
//         setCategories(data);
//       } catch (error) {
//         toast.error("Failed to load categories");
//       }
//     };

//     fetchCategories();
//   }, []);

//   useEffect(() => {
//     const fetchSingleMedicine = async () => {
//       try {
//         const res = await getSingleMedicine(medicineId);
//         const data = res.data;
//         setSingleMedicine(data);
//       } catch (error) {
//         toast.error("Failed to load categories");
//       }
//     };

//     fetchSingleMedicine();
//   }, {});

//   const form = useForm({
//     defaultValues: {
//       name: "napa",
//       description: "",
//       price: 0,
//       stock: 0,
//       categoryId: "",
//       manufacturer: "",
//       image: "",
//     },
//     validators: {
//       //   onSubmit: medicineSchema,
//     },
//     onSubmit: async ({ value }) => {
//       const toastId = toast.loading("Creating....");

//       const medicineData = {
//         name: value.name,
//         description: value.description,
//         price: value.price,
//         stock: value.stock,
//         categoryId: value.categoryId,
//         manufacturer: value.manufacturer,
//         image: value.image,
//       };

//       try {
//         // const res = await createMedicine(medicineData);
//         // if (res.error) {
//         //   toast.error(res.error.message, { id: toastId });
//         //   return;
//         // }
//         // toast.success("Medicine Created", { id: toastId });
//       } catch (err) {
//         toast.error("Something Went Wrong", { id: toastId });
//       }
//     },
//   });

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent>
//         {/* <DialogHeader>
//           <DialogTitle>Update Medicine</DialogTitle>
//           <DialogDescription>
//             Updating medicine ID: <b>{medicineId}</b>
//           </DialogDescription>
//         </DialogHeader>
//         <h1>Update Your information</h1> */}
//         {/* start upate medicine form start **************************************************** */}
//         <form
//           id="medicine-form"
//           onSubmit={(e) => {
//             e.preventDefault();
//             form.handleSubmit();
//           }}
//         >
//           <FieldGroup>
//             <form.Field
//               name="name"
//               children={(field) => {
//                 const isInvalid =
//                   field.state.meta.isTouched && !field.state.meta.isValid;
//                 return (
//                   <Field data-invalid={isInvalid}>
//                     <FieldLabel htmlFor={field.name}>Name</FieldLabel>
//                     <Input
//                       type="text"
//                       id={field.name}
//                       name={field.name}
//                       value={field.state.value}
//                       onChange={(e) => field.handleChange(e.target.value)}
//                       placeholder="Name"
//                     />
//                     {isInvalid && (
//                       <FieldError errors={field.state.meta.errors} />
//                     )}
//                   </Field>
//                 );
//               }}
//             />
//             <form.Field
//               name="description"
//               children={(field) => {
//                 const isInvalid =
//                   field.state.meta.isTouched && !field.state.meta.isValid;
//                 return (
//                   <Field data-invalid={isInvalid}>
//                     <FieldLabel htmlFor={field.name}>Description</FieldLabel>
//                     <Textarea
//                       id={field.name}
//                       name={field.name}
//                       value={field.state.value}
//                       onChange={(e) => field.handleChange(e.target.value)}
//                       placeholder="Description"
//                     />
//                     {isInvalid && (
//                       <FieldError errors={field.state.meta.errors} />
//                     )}
//                   </Field>
//                 );
//               }}
//             />
//             <form.Field
//               name="price"
//               children={(field) => (
//                 <Field data-invalid={field.state.meta.errors.length > 0}>
//                   <FieldLabel htmlFor={field.name}>Price</FieldLabel>
//                   <Input
//                     type="number"
//                     // step="0.01" // Allows decimals for price
//                     id={field.name}
//                     value={field.state.value}
//                     onChange={(e) => field.handleChange(e.target.valueAsNumber)}
//                   />
//                   <FieldError errors={field.state.meta.errors} />
//                 </Field>
//               )}
//             />
//             <form.Field
//               name="stock"
//               children={(field) => (
//                 <Field data-invalid={field.state.meta.errors.length > 0}>
//                   <FieldLabel htmlFor={field.name}>Stock Quantity</FieldLabel>
//                   <Input
//                     type="number"
//                     id={field.name}
//                     value={field.state.value}
//                     onChange={(e) => field.handleChange(e.target.valueAsNumber)}
//                   />
//                   <FieldError errors={field.state.meta.errors} />
//                 </Field>
//               )}
//             />
//             <form.Field
//               name="categoryId"
//               children={(field) => {
//                 const isInvalid =
//                   field.state.meta.isTouched &&
//                   field.state.meta.errors.length > 0;

//                 return (
//                   <Field data-invalid={isInvalid}>
//                     <FieldLabel htmlFor={field.name}>Category</FieldLabel>
//                     <Select
//                       value={field.state.value}
//                       onValueChange={(value) => field.handleChange(value)}
//                     >
//                       <SelectTrigger id={field.name} className="w-full">
//                         <SelectValue placeholder="Select a category" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         {categories.map((cat) => (
//                           <SelectItem key={cat.id} value={cat.id}>
//                             {cat.name}
//                           </SelectItem>
//                         ))}
//                       </SelectContent>
//                     </Select>
//                     {isInvalid && (
//                       <FieldError errors={field.state.meta.errors} />
//                     )}
//                   </Field>
//                 );
//               }}
//             />
//             <form.Field
//               name="manufacturer"
//               children={(field) => {
//                 const isInvalid =
//                   field.state.meta.isTouched && !field.state.meta.isValid;
//                 return (
//                   <Field data-invalid={isInvalid}>
//                     <FieldLabel htmlFor={field.name}>manufacturer</FieldLabel>
//                     <Input
//                       type="text"
//                       id={field.name}
//                       name={field.name}
//                       value={field.state.value}
//                       onChange={(e) => field.handleChange(e.target.value)}
//                       placeholder="manufacturer"
//                     />
//                     {isInvalid && (
//                       <FieldError errors={field.state.meta.errors} />
//                     )}
//                   </Field>
//                 );
//               }}
//             />
//             <form.Field
//               name="image"
//               children={(field) => {
//                 const isInvalid =
//                   field.state.meta.isTouched && !field.state.meta.isValid;
//                 return (
//                   <Field data-invalid={isInvalid}>
//                     <FieldLabel htmlFor={field.name}>image Link</FieldLabel>
//                     <Input
//                       type="text"
//                       id={field.name}
//                       name={field.name}
//                       value={field.state.value}
//                       onChange={(e) => field.handleChange(e.target.value)}
//                       placeholder="image"
//                     />
//                     {isInvalid && (
//                       <FieldError errors={field.state.meta.errors} />
//                     )}
//                   </Field>
//                 );
//               }}
//             />
//           </FieldGroup>
//         </form>
//         {/* end upate medicine form start **************************************************** */}
//         <DialogFooter>
//           <DialogClose asChild>
//             <Button variant="outline">Cancel</Button>
//           </DialogClose>
//           <Button type="submit">Save changes</Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

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
        console.log("UPDATE DATA************************************:", value);
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
