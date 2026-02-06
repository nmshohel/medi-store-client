import { getMyOrders, getOrders } from "@/actions/order.action";
import OrderTable from "@/components/modules/customer/OrderTable";

export default async function CustomerDashboard() {
  const response = await getOrders();
  console.log("res", response);
  const ordersData = response.data?.data || [];
  console.log(ordersData);
  return (
    <div>
      <div className="text-center font-bold text-2xl">My Order History</div>
      <div>
        <OrderTable ordersData={ordersData} />
      </div>
    </div>
  );
}
