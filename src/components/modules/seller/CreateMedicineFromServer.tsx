
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { env } from '@/env'
import { userServices } from '@/services/user.service'
import { cookies } from 'next/headers'

const API_URL = env.API_URL;
export default async function CreateMedicineFromServer() {
    const createMedicine = async (formData: FormData) => {
    "use server";
              const session=await userServices.getSession();
          if(!session)
          {
              throw new Error("User Session Not Found")
          }
          const sellerId=session?.data?.user?.id

    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const manufacturer = formData.get("manufacturer") as string;
    const image = formData.get("image") as string;
    const categoryId = formData.get("categoryId") as string;
    const priceEntry = formData.get("price");
    const stockEntry = formData.get("stock");
    // if (typeof priceEntry === "string" || typeof stockEntry === "string") {
    //     throw new Error("Invalid form data");
    // }

    const price = Number(priceEntry);
    const stock = Number(stockEntry);

    if (Number.isNaN(price) || Number.isNaN(stock)) {
        throw new Error("Price or stock must be a number");
    }

    const medicineData = {
      name,
      description,
      price,
      stock,
      categoryId,
      manufacturer,
      image,
      sellerId
    };

    const cookieStore = await cookies();
   
//  console.log("medicineData",JSON.stringify(medicineData))
console.log({API_URL})
    const res = await fetch("http://localhost:5000/api/medicines", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookieStore.toString(),
      },
      body: JSON.stringify(medicineData),
    });

    console.log("res",res)
    }
  return (
    <Card className='max-w-2xl mx-auto'>
        <CardHeader>
                    <CardTitle>Add Medicnine</CardTitle>
                    <CardDescription>You can add your new medicine.</CardDescription>
        </CardHeader>
        <CardContent>
            <form id='medicine-form' action={createMedicine}>
                    <FieldGroup>
                                <Field>
                                        <FieldLabel htmlFor='name'>Name</FieldLabel>
                                        <Input id='name'
                                         name='name'
                                        placeholder='Medicine Name'
                                        required/>
                                </Field>
                                <Field>
                                        <FieldLabel htmlFor='description'>Description</FieldLabel>
                                        <Textarea id='description' name='description' placeholder='Medicine Description'/>
                                </Field>
                                <Field>
                                        <FieldLabel htmlFor='price'>Price</FieldLabel>
                                        <Input id='price' type='number' name='price' placeholder='Price' required/>
                                </Field>
                                <Field>
                                        <FieldLabel htmlFor='stock'>Stock</FieldLabel>
                                        <Input id='stock' type='number' name='stock' placeholder='Stock' required/>
                                </Field>
                                <Field>
                                        <FieldLabel htmlFor='manufacturer'>Manufacturer</FieldLabel>
                                        <Input id='manufacturer' name='manufacturer' placeholder='Manufacturer' required/>
                                </Field>
                                <Field>
                                        <FieldLabel htmlFor='categoryId'>Category</FieldLabel>
                                        <Input id='categoryId' name='categoryId' placeholder='Category' required/>
                                </Field>
                                <Field>
                                        <FieldLabel htmlFor='image'>Image Link</FieldLabel>
                                        <Input id='image' name='image' placeholder='Image Link' required/>
                                </Field>
                    </FieldGroup>

            </form>

        </CardContent>
        <CardFooter>
                <Button form='medicine-form' type='submit' className='w-full'>Submit</Button>
        </CardFooter>
    </Card>
  )
}
