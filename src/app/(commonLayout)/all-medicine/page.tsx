import MedicineCard from "@/components/modules/homepage/MedicineCard"
import { medicineService } from "@/services/medicine.service"


export default async function AllMedicine() {
  const {data} = await medicineService.getMedicines()
  return (
                  <div className="
                      grid
                      grid-cols-1
                      sm:grid-cols-2
                      md:grid-cols-3
                      lg:grid-cols-4
                      xl:grid-cols-5
                      max-w-8xl
                      mx-auto
                      px-15
                      gap-4
                    "> 
                    {data?.data?.map((medicine: any) => (
                        <MedicineCard key={medicine.id} medicine={medicine}/>
                    ))}
                  </div>
  )
}
