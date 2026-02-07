"use client";

import Link from "next/link";
import Image from "next/image";
import { Eye, ShoppingCart } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Medicine } from "@/types";
import { toast } from "sonner";

interface MedicineCardProps {
  medicine: Medicine;
}

export default function MedicineCard({ medicine }: MedicineCardProps) {
  const handleAddToCart = () => {
    // 1. Get current cart from localStorage
    const saved = localStorage.getItem("pending_cart_items");
    let currentCart: any[] = saved ? JSON.parse(saved) : [];

    // 2. Check if this medicine is already in the cart
    const existingItemIndex = currentCart.findIndex(
      (item) => item.id === medicine.id,
    );

    if (existingItemIndex > -1) {
      // If it exists, check stock before incrementing
      if (currentCart[existingItemIndex].quantity < medicine.stock) {
        currentCart[existingItemIndex].quantity += 1;
        toast.success(`Updated quantity for ${medicine.name}`);
      } else {
        toast.error("Cannot add more than available stock");
        return;
      }
    } else {
      // If it's new, add it with quantity 1
      const newItem = {
        ...medicine,
        quantity: 1,
      };
      currentCart.push(newItem);
      toast.success(`${medicine.name} added to cart`);
    }

    // 3. Save back to localStorage
    localStorage.setItem("pending_cart_items", JSON.stringify(currentCart));

    // 4. Trigger the custom event so the Navbar updates instantly
    window.dispatchEvent(new Event("cart-updated"));
  };

  return (
    <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all duration-300 hover:shadow-lg">
      {/* Image Container */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        {medicine.image ? (
          <Image
            src={medicine.image}
            alt={medicine.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground italic">
            No Image Available
          </div>
        )}

        {/* Stock Status Badge */}
        <Badge
          className="absolute left-3 top-3 z-10"
          variant={medicine.stock > 0 ? "secondary" : "destructive"}
        >
          {medicine.stock > 0 ? `In Stock: ${medicine.stock}` : "Out of Stock"}
        </Badge>
      </div>

      {/* Medicine Info */}
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="line-clamp-2 text-lg font-bold">
            {medicine.name}
          </CardTitle>
        </div>
        <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
          {medicine.manufacturer}
        </p>
      </CardHeader>

      <CardContent className="mt-auto">
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-black text-primary">
            ৳{medicine.price}
          </span>
          <span className="text-xs text-muted-foreground">/ unit</span>
        </div>
      </CardContent>

      {/* Action Buttons */}
      <CardFooter className="flex gap-2 border-t bg-slate-50/50 p-2 dark:bg-slate-900/50">
        <Button
          variant="default"
          size="sm"
          className="flex-1 h-8 gap-2 text-xs font-bold" // h-8 manually forces a smaller height
          disabled={medicine.stock === 0}
          onClick={handleAddToCart}
        >
          <ShoppingCart className="h-3 w-3" />
          Add to Cart
        </Button>

        <Button
          variant="outline"
          size="icon"
          className="h-8 w-8"
          asChild
          title="View Details"
        >
          <Link href={`/all-medicine/${medicine.id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
