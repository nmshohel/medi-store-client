

import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const images = [
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
  "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5",
]

export default function Home() {
  return (
            <div className="container">
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
              <div> 
             

              </div>
              {/* footer  */}
              <div>

              </div>
            </div>
  )
}

