"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

const CATEGORIES = ["Tablet", "Syrup", "Injection"];
const MANUFACTURERS = ["Square", "Beximco", "Incepta"];

export default function HomeFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // 🔹 initial state from URL
  const [category, setCategory] = useState<string>(
    searchParams.get("category") || "",
  );
  const [manufacturer, setManufacturer] = useState<string>(
    searchParams.get("manufacturer") || "",
  );
  const [price, setPrice] = useState<[number, number]>([
    Number(searchParams.get("min")) || 0,
    Number(searchParams.get("max")) || 1000,
  ]);

  // 🔹 apply filter → update URL
  const applyFilter = () => {
    const params = new URLSearchParams();

    if (category) params.set("category", category);
    if (manufacturer) params.set("manufacturer", manufacturer);
    params.set("min", price[0].toString());
    params.set("max", price[1].toString());

    router.push(`/?${params.toString()}`);
  };

  // 🔹 reset filter
  const resetFilter = () => {
    setCategory("");
    setManufacturer("");
    setPrice([0, 1000]);
    router.push("/");
  };

  return (
    <div className="bg-white border rounded-lg p-4 space-y-6 sticky top-20">
      {/* CATEGORY */}
      <div>
        <h3 className="font-semibold mb-2">Category</h3>
        <div className="space-y-2">
          {CATEGORIES.map((item) => (
            <label
              key={item}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={category === item}
                onCheckedChange={() => setCategory(item)}
              />
              <span className="text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* MANUFACTURER */}
      <div>
        <h3 className="font-semibold mb-2">Manufacturer</h3>
        <div className="space-y-2">
          {MANUFACTURERS.map((item) => (
            <label
              key={item}
              className="flex items-center gap-2 cursor-pointer"
            >
              <Checkbox
                checked={manufacturer === item}
                onCheckedChange={() => setManufacturer(item)}
              />
              <span className="text-sm">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* PRICE */}
      <div>
        <h3 className="font-semibold mb-2">
          Price (৳{price[0]} – ৳{price[1]})
        </h3>
        <Slider
          value={price}
          max={5000}
          step={50}
          onValueChange={(v) => setPrice(v as [number, number])}
        />
      </div>

      {/* ACTIONS */}
      <div className="flex flex-col gap-2">
        <Button onClick={applyFilter} className="w-full">
          Apply
        </Button>

        <Button variant="outline" onClick={resetFilter} className="w-full">
          Reset
        </Button>
      </div>
    </div>
  );
}
