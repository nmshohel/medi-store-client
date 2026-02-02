"use client";

import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Medicine } from "@/types";
import { ShoppingCart, Package, Plus, Minus } from "lucide-react";

type MyCardProps = {
  medicine: Medicine | null;
  open: boolean;
  setOpen: (value: boolean) => void;
};

export default function MyCard({ medicine, open, setOpen }: MyCardProps) {
  const [quantity, setQuantity] = useState(1);

  // Reset quantity to 1 every time a new medicine is opened
  useEffect(() => {
    if (open) setQuantity(1);
  }, [open, medicine]);

  if (!medicine) return null;

  const totalPrice = (medicine.price * quantity).toFixed(2);

  const increment = () => {
    if (quantity < medicine.stock) setQuantity((prev) => prev + 1);
  };

  const decrement = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col sm:max-w-md border-l shadow-2xl"
      >
        <SheetHeader className="space-y-2.5 border-b pb-5">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Confirm Purchase
          </SheetTitle>
          <SheetDescription className="text-sm">
            Review <strong>{medicine.name}</strong> before adding to cart.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6 no-scrollbar">
          <div className="space-y-6">
            {/* Price Details Table */}
            <div className="rounded-lg border bg-slate-50 p-4 dark:bg-slate-900 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Medicine</span>
                <span className="font-medium">{medicine.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Unit Price</span>
                <span className="font-medium">৳ {medicine.price}</span>
              </div>
              <div className="flex justify-between border-t pt-2 mt-2">
                <span className="font-semibold">Total Price</span>
                <span className="text-lg font-bold text-primary">
                  ৳ {totalPrice}
                </span>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="space-y-3">
              <h4 className="text-sm font-semibold flex items-center gap-2">
                <Package className="h-4 w-4" />
                Select Quantity
              </h4>
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg overflow-hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={decrement}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={increment}
                    disabled={quantity >= medicine.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-xs text-muted-foreground">
                  {medicine.stock} units available
                </span>
              </div>
            </div>
          </div>
        </div>

        <SheetFooter className="mt-auto border-t pt-6">
          <div className="flex w-full flex-col gap-3">
            <Button
              className="w-full h-11 text-base font-semibold"
              onClick={() => {
                console.log(
                  `Added ${quantity} of ${medicine.name} to cart. Total: ৳${totalPrice}`,
                );
                setOpen(false);
              }}
            >
              Add {quantity} to Cart — ৳ {totalPrice}
            </Button>
            <Button
              variant="ghost"
              className="w-full text-muted-foreground"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
