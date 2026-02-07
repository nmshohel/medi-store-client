import { getOrders } from "@/actions/order.action";
import AdminOrderTable from "@/components/modules/admin/AdminOrderTable";

export const dynamic = "force-dynamic";
export default async function AdminOrdersPage() {
  const response = await getOrders();
  const ordersData = response.data?.data || [];
  return (
    <div>
      <AdminOrderTable ordersData={ordersData} />
    </div>
  );
}
