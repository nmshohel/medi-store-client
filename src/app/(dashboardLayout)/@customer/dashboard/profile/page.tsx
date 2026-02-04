import { getSession, getSingleUser } from "@/actions/user.action";
import UpdateProfile from "@/components/modules/customer/UpdateProfile";

export default async function Profile() {
  const userData = await getSession();
  const user = userData?.data?.user;
  return (
    <div>
      <UpdateProfile user={user} />
    </div>
  );
}
