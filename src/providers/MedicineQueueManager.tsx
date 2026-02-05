"use client";

import { useState, useEffect } from "react";
import { Medicine } from "@/types";
import { Button } from "@/components/ui/button";
import MyCard from "@/components/modules/homepage/MyCard";

// Local type to include quantity
type CartItem = Medicine & { quantity: number };

export default function MedicineQueueManager() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  // 1. Load from localStorage and listen for updates
  const loadCart = () => {
    const saved = localStorage.getItem("pending_cart_items");
    if (saved) {
      setCartItems(JSON.parse(saved));
    }
  };

  useEffect(() => {
    loadCart();
    // Listen for changes from other components (MedicineCard)
    window.addEventListener("cart-updated", loadCart);
    window.addEventListener("storage", loadCart);
    return () => {
      window.removeEventListener("cart-updated", loadCart);
      window.removeEventListener("storage", loadCart);
    };
  }, []);

  // 2. Quantity Logic
  const updateQuantity = (id: string, delta: number) => {
    const updated = cartItems.map((item) => {
      if (item.id === id) {
        const newQty = (item.quantity || 1) + delta;
        // Keep quantity between 1 and stock limit
        return { ...item, quantity: Math.min(Math.max(1, newQty), item.stock) };
      }
      return item;
    });
    setCartItems(updated);
    localStorage.setItem("pending_cart_items", JSON.stringify(updated));
  };

  // 3. Remove Item Logic
  const removeItem = (id: string) => {
    const updated = cartItems.filter((item) => item.id !== id);
    setCartItems(updated);
    localStorage.setItem("pending_cart_items", JSON.stringify(updated));
    // Close sheet if last item removed
    if (updated.length === 0) setIsSheetOpen(false);
  };

  // 4. Dummy helper for testing (Matches your new persistent logic)
  const addTestItem = () => {
    const testMedicine: CartItem = {
      id: "test-id-123",
      name: "Napa Extend",
      price: 25,
      stock: 50,
      description: "Paracetamol for long-lasting relief",
      manufacturer: "Beximco Pharma",
      image: "",
      quantity: 1, // Required for the new list view
    };

    // Check if item exists, if so increment, if not add
    const existingIndex = cartItems.findIndex((i) => i.id === testMedicine.id);
    let newCart;
    if (existingIndex > -1) {
      newCart = [...cartItems];
      newCart[existingIndex].quantity += 1;
    } else {
      newCart = [...cartItems, testMedicine];
    }

    setCartItems(newCart);
    localStorage.setItem("pending_cart_items", JSON.stringify(newCart));
    setIsSheetOpen(true);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex gap-4">
        <Button onClick={addTestItem} variant="outline">
          Test: Add Napa to Cart
        </Button>
        <Button
          onClick={() => setIsSheetOpen(true)}
          disabled={cartItems.length === 0}
        >
          Open Cart ({cartItems.length})
        </Button>
      </div>

      {/* FIXED: Passing the new expected props to MyCard */}
      <MyCard
        open={isSheetOpen}
        setOpen={setIsSheetOpen}
        items={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeItem}
      />
    </div>
  );
}
