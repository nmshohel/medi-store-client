"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// 1. Import the icons
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteMedicine } from "@/actions/medicine.action";
type MedicineTableProps = {
  medicineData: any[];
};
export default function MedicineTable({ medicineData }: MedicineTableProps) {
  const deleteMedicineFun = async (id: string) => {
    const result = await deleteMedicine(id);
    toast.success("Medicine deleted successfully");
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[80px]">S/N</TableHead>
            <TableHead>Medicine Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Manufacturer</TableHead>
            <TableHead>Price</TableHead>
            {/* Merged Header */}
            <TableHead colSpan={2} className="text-center">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {medicineData.map((item: any, index: number) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>{item.manufacturer}</TableCell>
              <TableCell>{item.price}</TableCell>

              <TableCell className="text-right w-[50px] px-0">
                <Button variant="ghost" size="icon" title="Update">
                  <Pencil className="h-4 w-4 text-blue-600" />
                </Button>
              </TableCell>

              <TableCell className="text-left w-[50px] px-0">
                <Button
                  variant="ghost"
                  size="icon"
                  title="Delete"
                  onClick={() => deleteMedicineFun(item.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
