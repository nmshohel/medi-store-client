import { getOrders } from "@/actions/order.action";
import AdminOrderTable from "@/components/modules/admin/AdminOrderTable";
import React from "react";

export default async function AdminOrdersPage() {
  const response = await getOrders();
  const ordersData = response.data?.data || [];
  return (
    <div>
      <AdminOrderTable ordersData={ordersData} />
    </div>
  );
}
