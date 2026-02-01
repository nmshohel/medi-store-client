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

export default function MedicineTable() {
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
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell className="font-medium">Napa</TableCell>
            <TableCell>Napa for pain</TableCell>
            <TableCell>250</TableCell>
            <TableCell>ACI</TableCell>
            <TableCell>$10.5</TableCell>

            <TableCell className="text-right w-[50px] px-0">
              <Button variant="ghost" size="icon" title="Update">
                <Pencil className="h-4 w-4 text-blue-600" />
              </Button>
            </TableCell>

            <TableCell className="text-left w-[50px] px-0">
              <Button variant="ghost" size="icon" title="Delete">
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
