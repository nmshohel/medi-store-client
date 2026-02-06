"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import UpdateOrder from "./UpdateOrder";
type OrderTableProps = {
  ordersData: any[];
};
export default function OrderTable({ ordersData }: OrderTableProps) {
  console.log("Ordder-data", ordersData);
  const [open, setOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const handleUpdateClick = (id: string) => {
    setSelectedOrderId(id);
    setOpen(true);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Medicine Name</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {ordersData.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.user.name}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.user.phone}</TableCell>
              <TableCell>{item.totalAmount}</TableCell>
              <TableCell>{item.paymentMethod}</TableCell>
              <TableCell>{item.status}</TableCell>

              <TableCell>
                <Button
                  onClick={() => handleUpdateClick(item.id)}
                  variant="ghost"
                  size="icon"
                >
                  <Pencil className="h-4 w-4 text-blue-600" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* ✅ SAFE MODAL RENDER */}
      {selectedOrderId && (
        <UpdateOrder
          open={open}
          onOpenChange={setOpen}
          orderId={selectedOrderId}
        />
      )}
    </div>
  );
}
