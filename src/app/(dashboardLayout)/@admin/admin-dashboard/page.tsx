import { getUsers } from "@/actions/user.action";
import UserTable from "@/components/modules/admin/UserTable";

export default async function AdminDashboard() {
  const response = await getUsers();
  const usersData = response.data?.data || [];

  return (
    <div>
      Admin Dashboard
      <UserTable usersData={usersData} />
    </div>
  );
}
