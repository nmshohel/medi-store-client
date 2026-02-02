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
import { Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteMedicine } from "@/actions/medicine.action";
import { useState } from "react";
import UpdateMedicine from "./UpdateMedicine";

type MedicineTableProps = {
  medicineData: any[];
};

export default function MedicineTable({ medicineData }: MedicineTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedMedicineId, setSelectedMedicineId] = useState<string | null>(
    null,
  );

  const deleteMedicineFun = async (id: string) => {
    await deleteMedicine(id);
    toast.success("Medicine deleted successfully");
  };

  const handleUpdateClick = (id: string) => {
    setSelectedMedicineId(id);
    setOpen(true);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Manufacturer</TableHead>
            <TableHead>Price</TableHead>
            <TableHead colSpan={2} className="text-center">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {medicineData.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.stock}</TableCell>
              <TableCell>{item.manufacturer}</TableCell>
              <TableCell>{item.price}</TableCell>

              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleUpdateClick(item.id)}
                >
                  <Pencil className="h-4 w-4 text-blue-600" />
                </Button>
              </TableCell>

              <TableCell>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => deleteMedicineFun(item.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* ✅ SAFE MODAL RENDER */}
      {selectedMedicineId && (
        <UpdateMedicine
          open={open}
          onOpenChange={setOpen}
          medicineId={selectedMedicineId}
        />
      )}
    </div>
  );
}
