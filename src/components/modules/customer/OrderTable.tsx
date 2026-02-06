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

type OrderTableProps = {
  ordersData: any[];
};
export default function OrderTable({ ordersData }: OrderTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>Order Number</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Medicine Name</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Payment Method</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {ordersData.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.orderNumber}</TableCell>
              <TableCell>{item.user.name}</TableCell>
              <TableCell>{item.address}</TableCell>
              <TableCell>{item.user.phone}</TableCell>
              <TableCell>{item.totalAmount}</TableCell>
              <TableCell>{item.paymentMethod}</TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
