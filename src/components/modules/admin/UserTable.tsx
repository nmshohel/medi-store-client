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
import UpdateUser from "./UpdateUser";
type UserTableProps = {
  usersData: any[];
};
export default function UserTable({ usersData }: UserTableProps) {
  const [open, setOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const handleUpdateClick = (id: string) => {
    setSelectedUserId(id);
    setOpen(true);
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>S/N</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {usersData.map((item, index) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.phone}</TableCell>
              <TableCell>{item.role}</TableCell>
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
      {selectedUserId && (
        <UpdateUser
          open={open}
          onOpenChange={setOpen}
          userId={selectedUserId}
        />
      )}
    </div>
  );
}
