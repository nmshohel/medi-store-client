import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import MedicineCard from "@/components/modules/homepage/MedicineCard";

import { getMedicine } from "@/actions/medicine.action";
import HomeFilter from "@/components/modules/homepage/HomeFilter";

const images = [
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
  "https://i.ibb.co.com/Kj2pJ2Mm/c-2.png",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
];

type HomeProps = {
  searchParams: {
    category?: string;
    manufacturer?: string;
    min?: string;
    max?: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const { category, manufacturer, min, max } = searchParams;

  const { data } = await getMedicine();

  console.log("data", data?.data);
  // {
  //     category,
  //     manufacturer,
  //     minPrice: min,
  //     maxPrice: max,
  //   }
  return (
    <div className="max-w-8xl mx-auto px-4">
      {/* 🔥 Carousel */}
      <div className="mb-6">
        <Carousel>
          <CarouselContent>
            {images.map((src, i) => (
              <CarouselItem key={i} className="relative h-72">
                <Image
                  src={src}
                  alt={`Slide ${i}`}
                  fill
                  className="object-cover rounded-xl"
                  priority={i === 0}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      {/* 🧠 Main Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* LEFT FILTER */}
        <aside className="col-span-12 md:col-span-3 lg:col-span-2">
          <HomeFilter />
        </aside>

        {/* RIGHT PRODUCTS */}
        <section className="col-span-12 md:col-span-9 lg:col-span-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {data?.data?.map((medicine: any) => (
              <MedicineCard key={medicine.id} medicine={medicine} />
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="mt-8 bg-amber-50 min-h-24 flex items-center justify-center">
        <h1>This is footer</h1>
      </div>
    </div>
  );
}
