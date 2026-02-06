"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  ShoppingCart,
  Truck,
  CheckCircle2,
  MapPin,
  Wallet,
} from "lucide-react";
import { createOrder } from "@/actions/order.action";
import { toast } from "sonner";
import { getSession } from "@/actions/user.action";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const items = JSON.parse(searchParams.get("items") || "[]");
  const router = useRouter();

  const [address, setAddress] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("cod");

  const subtotal = items.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0,
  );
  const deliveryFee = items.length > 0 ? 60 : 0;
  const total = subtotal + deliveryFee;

  const purchaseInformation = async () => {
    // check login status
    const session = await getSession();
    if (!session.data) {
      toast.error(session.error?.message);
      router.push("/login");
      return;
    }
    // check address input
    if (!address) {
      toast.error("Shipping address required");

      return;
    }
    const orderData = {
      orderItems: items,
      shippingAddress: address,
      paymentMethod,
      total,
    };

    const toastId = toast.loading("Creating order...");
    try {
      const res = await createOrder(orderData);
      if (res.data) {
        toast.success("Order created successfully", { id: toastId });
        localStorage.removeItem("pending_cart_items");
      } else {
        toast.error("Order creation failed", { id: toastId });
      }
    } catch {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="h-5 w-5 text-primary" />
        <h1 className="text-2xl font-bold tracking-tight">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          {/* Compact Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Small Shipping Card */}
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" /> Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Enter full delivery address..."
                  className="min-h-[80px] text-sm resize-none bg-muted/20"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </CardContent>
            </Card>

            {/* Small Payment Card */}
            <Card className="shadow-sm border-primary/20 bg-primary/5">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Wallet className="h-4 w-4 text-primary" /> Payment Method
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="cod" onValueChange={setPaymentMethod}>
                  <div className="flex items-start space-x-3 p-3 border rounded-md bg-background">
                    <RadioGroupItem value="cod" id="cod" className="mt-1" />
                    <Label htmlFor="cod" className="cursor-pointer">
                      <span className="text-sm font-bold block">
                        Cash on Delivery
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Pay when you receive the parcel
                      </span>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Review Items Card */}
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-sm font-medium">
                Order Review
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item: any) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center text-sm"
                >
                  <div className="flex flex-col">
                    <span className="font-medium">{item.name}</span>
                    <span className="text-xs text-muted-foreground text-primary">
                      Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="font-semibold">
                    ৳ {(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Pricing Sidebar */}
        <div className="md:col-span-1">
          <Card className="sticky top-6 border-t-4 border-t-primary">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>৳ {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Delivery</span>
                <span>৳ {deliveryFee.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-xl py-2">
                <span>Total</span>
                <span className="text-primary">৳ {total.toLocaleString()}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-3">
              <Button
                className="w-full h-12 gap-2 text-base"
                size="lg"
                onClick={purchaseInformation}
                disabled={items.length === 0}
              >
                <CheckCircle2 className="h-5 w-5" /> Confirm Order
              </Button>
              <div className="flex items-center gap-2 text-[11px] text-muted-foreground justify-center">
                <Truck className="h-3 w-3" /> Fast Delivery in 2-3 Days
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
