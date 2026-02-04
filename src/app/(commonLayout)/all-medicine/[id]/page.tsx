import { getSingleMedicine } from "@/actions/medicine.action";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export default async function MedicinePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const medicinedata = (await getSingleMedicine(id)) || {};
  const medicine = medicinedata.data;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* IMAGE */}
            <div className="relative w-full h-96">
              <Image
                src={medicine.image}
                alt={medicine.name}
                fill
                className="object-contain rounded-lg"
                priority
              />
            </div>

            {/* DETAILS */}
            <div className="space-y-4">
              <h1 className="text-3xl font-bold">{medicine.name}</h1>

              <p className="text-muted-foreground">{medicine.description}</p>

              <div className="space-y-1 text-sm">
                <p>
                  <span className="font-medium">Manufacturer:</span>{" "}
                  {medicine.manufacturer}
                </p>
                <p>
                  <span className="font-medium">Stock:</span> {medicine.stock}{" "}
                  available
                </p>
              </div>

              <div className="text-2xl font-semibold text-primary">
                ৳{medicine.price}
              </div>

              <Button size="lg" className="mt-4">
                Add to Cart
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
