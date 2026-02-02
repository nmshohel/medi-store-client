// components/AddToCart.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Medicine } from "@/types";

type AddToCartProps = {
  medicine: Medicine | null;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function AddToCart({ medicine, open, setOpen }: AddToCartProps) {
  if (!medicine) return null;

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      {/* We hide the default DrawerTrigger because we'll control it externally */}
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Add to Cart</DrawerTitle>
          <DrawerDescription>
            Medicine: {medicine.name} <br />
            Price: ৳ {medicine.price}
          </DrawerDescription>
        </DrawerHeader>

        <DrawerFooter className="gap-2">
          <Button
            onClick={() => {
              console.log("Added to cart:", medicine);
              setOpen(false);
            }}
          >
            Confirm
          </Button>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
