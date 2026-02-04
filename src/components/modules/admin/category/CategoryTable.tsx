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
import { deleteCategory } from "@/actions/category.action";
import UpdateCategory from "./UpdateCategory";

type CategoryTableProps = {
  categoryData: any[];
};

export default function CategoryTable({ categoryData }: CategoryTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );

  const deleteCategoryFun = async (id: string) => {
    await deleteCategory(id);
    toast.success("Category deleted successfully");
  };

  const handleUpdateClick = (id: string) => {
    setSelectedCategoryId(id);
    setOpen(true);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {categoryData.map((item: any, index: number) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>

              {/* Actions */}
              <TableCell className="text-center">
                <div className="flex justify-center gap-14">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleUpdateClick(item.id)}
                  >
                    <Pencil className="h-4 w-4 text-blue-600" />
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteCategoryFun(item.id)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {selectedCategoryId && (
        <UpdateCategory
          open={open}
          onOpenChange={setOpen}
          categoryId={selectedCategoryId}
        />
      )}
    </div>
  );
}
