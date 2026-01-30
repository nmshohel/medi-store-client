

import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { getMedicine } from "@/actions/blog.action"
import { medicineService } from "@/services/medicine.service"
import MedicineCard from "@/components/modules/homepage/MedicineCard"


const images = [
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
]

export default async function Home() {
  const {data} = await medicineService.getMedicines()
  
 
  return (
            <div>
              {/* carosel div  */}
              <div className="mx-auto px-15 w-full">
                      <Carousel className="">
                      <CarouselContent>
                        {images.map((src, i) => (
                          <CarouselItem key={i} className="relative h-72">
                            <Image
                              src={src}
                              alt={`Medicine ${i + 1}`}
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
              {/* product div  */}
              <div className="
                  grid
                  grid-cols-1
                  sm:grid-cols-2
                  md:grid-cols-3
                  lg:grid-cols-4
                  xl:grid-cols-5
                  max-w-8xl
                  mx-auto
                  px-4
                  gap-4
                "> 
                {data?.data?.map((medicine: any) => (
                    <MedicineCard key={medicine.id} medicine={medicine}/>
                ))}
              </div>
              {/* footer  */}
              <div>

              </div>
            </div>
  )
}

