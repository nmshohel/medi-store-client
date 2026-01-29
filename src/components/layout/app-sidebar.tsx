


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { adminRoutes } from "@/routes/adminRoute"

import { Route } from "@/types"
import { Roles } from "@/constants/roles"
import { customerRoutes } from "@/routes/customerRoutes"
import { sellerRoutes } from "@/routes/sellerRoutes"
import { Button } from "../ui/button"
import LogoutButton from "../modules/authentication/logout"

export function AppSidebar({user, ...props }:{user:{role:string}& React.ComponentProps<typeof Sidebar>}) {
  
  let routes:Route[]=[]
  switch(user.role){
    case Roles.admin:
                routes=adminRoutes;
                break;
    case Roles.customer:
                routes=customerRoutes;
                break;
    case Roles.seller:
                routes=sellerRoutes;
                break;
    default:
            routes=[];
            break;

  }
  
  return (
    <Sidebar {...props}>
      {/* logout button start  */}
        <div className="flex justify-center items-center py-4 border-b">
          <LogoutButton/>
          </div>

          {/* logout button end  */}



      <SidebarContent>
        {/* We create a SidebarGroup for each parent. */}
        {routes.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item:any) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link href={item.url}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  )
}


  // return (
  //   <Sidebar {...props}>
  //     <SidebarContent>
  //       {routes.map((item) => (
  //         <SidebarGroup key={item.title}>
  //           <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
  //           <SidebarGroupContent>
  //             <SidebarMenu>
  //               {item.items.map((item) => (
  //                 <SidebarMenuItem key={item.title}>
  //                   <SidebarMenuButton asChild>
  //                     <Link href={item.url}>{item.title}</Link>
  //                   </SidebarMenuButton>
  //                 </SidebarMenuItem>
  //               ))}
  //             </SidebarMenu>
  //           </SidebarGroupContent>
  //         </SidebarGroup>
  //       ))}
  //     </SidebarContent>
  //     <SidebarRail />
  //   </Sidebar>
  // );