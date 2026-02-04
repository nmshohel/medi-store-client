"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShoppingCart, Eye } from "lucide-react";

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
import MyCard from "./MyCard";

export default function MedicineCard({ medicine }: { medicine: Medicine }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(
    null,
  );

  const handleAddToCart = () => {
    setSelectedMedicine(medicine); // set clicked medicine
    setIsDrawerOpen(true); // open the drawer
  };

  return (
    <>
      <Card className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-sm transition-all duration-300 hover:shadow-lg">
        {/* Image */}
        <div className="relative h-40 w-full overflow-hidden bg-muted">
          {medicine.image ? (
            <Image
              src={medicine.image}
              alt={medicine.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
              No Image
            </div>
          )}

          {/* Stock badge */}
          <Badge
            className="absolute left-3 top-3"
            variant={medicine.stock > 0 ? "default" : "destructive"}
          >
            {medicine.stock > 0
              ? `In Stock: ${medicine.stock}`
              : "Out of Stock"}
          </Badge>
        </div>

        {/* Content */}
        <CardHeader className="pb-0">
          <CardTitle className="line-clamp-2 text-lg font-semibold">
            {medicine.name}
          </CardTitle>
        </CardHeader>

        <CardContent className="mt-auto text-xl font-bold text-primary">
          ৳ {medicine.price}
        </CardContent>

        {/* Actions */}
        <CardFooter className="flex gap-1 border-t px-4">
          <Button
            className="flex-1"
            disabled={medicine.stock === 0}
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>

          <Button variant="outline" asChild>
            <Link href={`/all-medicine/${medicine.id}`}>
              <Eye className="mr-2 h-2 w-2" />
              Details
            </Link>
          </Button>
        </CardFooter>
      </Card>

      {/* Drawer */}
      {selectedMedicine && (
        <MyCard
          medicine={selectedMedicine}
          open={isDrawerOpen}
          setOpen={(value) => {
            setIsDrawerOpen(value);
            if (!value) setSelectedMedicine(null); // reset medicine when drawer closes
          }}
        />
      )}
    </>
  );
}
