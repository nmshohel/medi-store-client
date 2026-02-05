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
import { ShoppingCart, Trash2, Plus, Minus } from "lucide-react";
import Link from "next/link";

type MyCardProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
  items: Medicine[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
};

export default function MyCard({
  open,
  setOpen,
  items,
  onUpdateQuantity,
  onRemoveItem,
}: MyCardProps) {
  const subtotal = items.reduce(
    (acc, item) => acc + (item.price * (item as any).quantity || 1),
    0,
  );
  // const handleCheckOut = () => {
  //   console.log(items);
  // };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent
        side="right"
        className="flex w-full flex-col sm:max-w-md border-l shadow-2xl"
      >
        <SheetHeader className="border-b pb-5">
          <SheetTitle className="flex items-center gap-2 text-xl">
            <ShoppingCart className="h-5 w-5 text-primary" />
            Your Shopping Cart
          </SheetTitle>
          <SheetDescription>
            You have {items.length} items in your cart.
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto py-6 no-scrollbar">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
              <ShoppingCart className="h-10 w-10 mb-2 opacity-20" />
              <p>Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-3 border rounded-lg bg-slate-50 dark:bg-slate-900"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm line-clamp-1">
                      {item.name}
                    </h4>
                    <p className="text-xs text-primary font-bold">
                      ৳ {item.price}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center border rounded bg-background">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        disabled={item.quantity <= 1}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 text-center text-xs">
                        {item.quantity || 1}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        disabled={item.quantity >= item.stock}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-destructive h-8 w-8"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {items.length > 0 && (
          <SheetFooter className="border-t pt-6">
            <div className="w-full space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Subtotal</span>
                <span className="text-primary">৳ {subtotal.toFixed(2)}</span>
              </div>
              <Link
                href={{
                  pathname: "/checkout",

                  query: {
                    items: JSON.stringify(items),
                  },
                }}
                onClick={() => setOpen(false)}
              >
                <Button className="w-full h-12 text-base font-bold">
                  Checkout Now
                </Button>
              </Link>
            </div>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  );
}
