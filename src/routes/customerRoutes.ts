import { Route } from "@/types";

export const customerRoutes:Route[]=[

    {
      title: "Customer Management",
      items: [
        {
          title: "My Order",
          url: "/dashboard",
        },
        {
          title: "Profile",
          url: "/dashboard/profile",
        },
        {
          title: "Track Order",
          url: "",
        },

      ],
    },
  ]