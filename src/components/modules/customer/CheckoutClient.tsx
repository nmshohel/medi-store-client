"use client";

import React, { JSX, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  ShoppingCart,
  Truck,
  CheckCircle2,
  MapPin,
  Wallet,
  Star,
  Send,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { toast } from "sonner";

import { createOrder } from "@/actions/order.action";
import { getSession } from "@/actions/user.action";
import { createReview } from "@/actions/review.action";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export default function CheckoutClient(): JSX.Element {
  const searchParams = useSearchParams();
  const router = useRouter();

  const items: CartItem[] = JSON.parse(searchParams.get("items") || "[]");

  // -------------------- STATE --------------------
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [reviewComment, setReviewComment] = useState("");

  // -------------------- PRICE --------------------
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = items.length ? 60 : 0;
  const total = subtotal + deliveryFee;

  // -------------------- ORDER --------------------
  const purchaseInformation = async () => {
    const session = await getSession();

    if (!session?.data) {
      toast.error("Please login to continue");
      router.push("/login");
      return;
    }

    if (!address.trim()) {
      toast.error("Shipping address is required");
      return;
    }

    const toastId = toast.loading("Creating order...");

    try {
      const res = await createOrder({
        orderItems: items,
        shippingAddress: address,
        paymentMethod,
        total,
      });

      if (res?.data) {
        toast.success("Order placed successfully", { id: toastId });
        localStorage.removeItem("pending_cart_items");
        setIsReviewOpen(true);
      } else {
        toast.error("Order failed", { id: toastId });
      }
    } catch (error) {
      toast.error("Something went wrong", { id: toastId });
      console.error(error);
    }
  };

  // -------------------- REVIEW --------------------
  const handleReviewSubmit = async () => {
    try {
      await createReview({
        rating,
        comment: reviewComment,
        orderItems: items,
      });

      toast.success("Thanks for your review!");
      setIsReviewOpen(false);
    } catch {
      toast.error("Review submission failed");
    }
  };

  // -------------------- JSX --------------------
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="h-5 w-5 text-primary" />
        <h1 className="text-2xl font-bold">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Shipping Address
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="Enter delivery address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-4 w-4" /> Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="cod" onValueChange={setPaymentMethod}>
                <div className="flex gap-2 items-center">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">Cash on Delivery</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Order Review</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>৳ {item.price * item.quantity}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT */}
        <Card className="sticky top-6">
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>৳ {subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>৳ {deliveryFee}</span>
            </div>
            <Separator />
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>৳ {total}</span>
            </div>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              onClick={purchaseInformation}
              disabled={!items.length}
            >
              <CheckCircle2 className="mr-2 h-4 w-4" /> Confirm Order
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* REVIEW MODAL */}
      <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Rate Your Experience
            </DialogTitle>
            <DialogDescription className="text-center">
              Help us improve
            </DialogDescription>
          </DialogHeader>

          <div className="flex justify-center gap-1 py-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                className={cn(
                  "transition",
                  (hover || rating) >= star
                    ? "text-yellow-400"
                    : "text-gray-300",
                )}
              >
                <Star className="h-8 w-8 fill-current" />
              </button>
            ))}
          </div>

          <Textarea
            placeholder="Optional comment..."
            value={reviewComment}
            onChange={(e) => setReviewComment(e.target.value)}
          />

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsReviewOpen(false)}>
              Skip
            </Button>
            <Button disabled={!rating} onClick={handleReviewSubmit}>
              <Send className="h-4 w-4 mr-2" /> Submit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
