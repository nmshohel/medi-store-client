import { getOrders } from "@/actions/order.action";
import OrderTable from "@/components/modules/seller/OrderTable";

export const dynamic = "force-dynamic";

export default async function Orders() {
  const response = await getOrders();
  const ordersData = response.data?.data || [];

  return (
    <div>
      <OrderTable ordersData={ordersData} />
    </div>
  );
}
