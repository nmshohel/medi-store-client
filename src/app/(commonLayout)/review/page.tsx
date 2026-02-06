"use client";

import React, { useState } from "react";
import { Star, Send } from "lucide-react"; // Added Send icon
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";

export default function ReviewPage() {
  const [rating, setRating] = useState<number>(0);
  const [hover, setHover] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 1. This only updates the UI state
  const handleStarClick = (selected: number) => {
    setRating(selected);
  };

  // 2. This handles the actual console.log and final submission
  const onSubmit = async () => {
    if (rating === 0) return;

    setIsSubmitting(true);

    const reviewData = {
      stars: rating,
      submittedAt: new Date().toISOString(),
      platform: "Web-Frontend",
    };

    // Simulated API delay

    console.log("🚀 Final Review Submitted:", reviewData);

    setIsSubmitting(false);
    // Optional: Reset or redirect after success
    // setRating(0);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-50 p-4">
      <Card className="w-full max-w-md shadow-xl border-t-4 border-t-yellow-400">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            How was your order?
          </CardTitle>
          <CardDescription>
            Select a rating and click submit below.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col items-center space-y-6">
          {/* Star Rating Group */}
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Button
                key={star}
                type="button"
                variant="ghost"
                size="icon"
                className={cn(
                  "p-0 h-12 w-12 hover:bg-transparent transition-all duration-150 hover:scale-110 active:scale-95",
                  (hover || rating) >= star
                    ? "text-yellow-400"
                    : "text-slate-300",
                )}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
                onClick={() => handleStarClick(star)}
              >
                <Star
                  className={cn(
                    "h-10 w-10",
                    (hover || rating) >= star ? "fill-current" : "fill-none",
                  )}
                />
                <span className="sr-only">Rate {star} stars</span>
              </Button>
            ))}
          </div>

          <div className="text-center h-6">
            {rating > 0 ? (
              <p className="text-sm font-medium text-slate-600">
                Rating: {rating} / 5
              </p>
            ) : (
              <p className="text-sm text-slate-400">Choose your rating</p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          {/* THE SUBMIT BUTTON */}
          <Button
            className="w-full gap-2 font-bold"
            disabled={rating === 0 || isSubmitting}
            onClick={onSubmit}
          >
            {isSubmitting ? (
              "Submitting..."
            ) : (
              <>
                <Send className="h-4 w-4" /> Submit Review
              </>
            )}
          </Button>

          {rating > 0 && !isSubmitting && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setRating(0)}
              className="text-slate-400 hover:text-red-500 w-full"
            >
              Clear
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
