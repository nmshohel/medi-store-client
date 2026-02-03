import { Route } from "@/types";

export const adminRoutes:Route[]=[

    {
      title: "Admin Management",
      items: [
        {
          title: "User",
          url: "/admin-dashboard",
        },
                {
          title: "Medicine",
          url: "/admin-dashboard/medicine",
        },
        {
          title: "Orders",
          url: "/admin-dashboard/orders",
        },
                {
          title: "Category",
          url: "/admin-dashboard/category",
        },

      ],
    },
  ]