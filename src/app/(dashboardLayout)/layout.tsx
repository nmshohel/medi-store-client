import { getSession } from "@/actions/user.action";
import { AppSidebar } from "@/components/layout/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Roles } from "@/constants/roles";
import { userServices } from "@/services/user.service";

export default async function DashboardLayout({
  admin,
  customer,
  seller,
}: {
  admin: React.ReactNode;
  customer: React.ReactNode;
  seller: React.ReactNode;
}) {
  // const userInfo={
  //   role:"admin"
  // }

  const { data } = await getSession();
  const userInfo = data.user;
  return (
    <SidebarProvider>
      <AppSidebar user={userInfo} />
      <SidebarInset>
        <div className="flex flex-1 flex-col gap-4 p-4">
          {userInfo.role === Roles.admin
            ? admin
            : userInfo.role === Roles.seller
              ? seller
              : customer}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
