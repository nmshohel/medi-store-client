"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardDescription,
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
import { createOrder } from "@/actions/order.action";
import { toast } from "sonner";
import { getSession } from "@/actions/user.action";
import { createReview } from "@/actions/review.action";

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const items = JSON.parse(searchParams.get("items") || "[]");
  const router = useRouter();

  // Checkout State
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Review Modal State
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [reviewComment, setReviewComment] = useState("");

  const subtotal = items.reduce(
    (acc: number, item: any) => acc + item.price * item.quantity,
    0,
  );
  const deliveryFee = items.length > 0 ? 60 : 0;
  const total = subtotal + deliveryFee;

  /**
   * Function to handle the final review data collection
   */
  const handleReviewSubmit = async () => {
    const finalReviewData = {
      rating,
      comment: reviewComment,
      orderItems: items,
    };

    try {
      const res = await createReview(finalReviewData);
      toast.success("Thank you for your feedback!");
      setIsReviewOpen(false);
    } catch {
      toast.error("Add failed");
    }

    // Optionally redirect user to home or orders page
    // router.push("/orders");
  };

  const purchaseInformation = async () => {
    // 1. Check login status
    const session = await getSession();
    if (!session.data) {
      toast.error(session.error?.message || "Please login to continue");
      router.push("/login");
      return;
    }

    // 2. Check address input
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

        // 3. Open Review Modal on success
        setIsReviewOpen(true);
      } else {
        toast.error("Order creation failed", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
      console.error(err);
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Shipping Card */}
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

            {/* Payment Card */}
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

          {/* Order Review Items */}
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
                    <span className="text-xs text-primary">
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

      {/* --- REVIEW DIALOG MODAL --- */}
      <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-bold">
              Excellent!
            </DialogTitle>
            <DialogDescription className="text-center">
              Your order has been placed. Would you mind rating your experience?
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center py-4 space-y-6">
            {/* Star Logic */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  className={cn(
                    "p-1 transition-all duration-75 hover:scale-110 active:scale-90",
                    (hover || rating) >= star
                      ? "text-yellow-400"
                      : "text-slate-200",
                  )}
                  onMouseEnter={() => setHover(star)}
                  onMouseLeave={() => setHover(0)}
                  onClick={() => setRating(star)}
                >
                  <Star
                    className={cn(
                      "h-10 w-10",
                      (hover || rating) >= star ? "fill-current" : "fill-none",
                    )}
                  />
                  <span className="sr-only">Rate {star} stars</span>
                </button>
              ))}
            </div>

            <div className="w-full space-y-2">
              <Label htmlFor="review" className="text-sm font-medium">
                Add a comment (Optional)
              </Label>
              <Textarea
                id="review"
                placeholder="How was the checkout process?"
                value={reviewComment}
                onChange={(e) => setReviewComment(e.target.value)}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => setIsReviewOpen(false)}
            >
              Skip
            </Button>
            <Button
              className="w-full sm:flex-1 gap-2"
              disabled={rating === 0}
              onClick={handleReviewSubmit}
            >
              <Send className="h-4 w-4" /> Submit Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
