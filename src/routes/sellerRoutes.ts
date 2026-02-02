import { Route } from "@/types";

export const sellerRoutes:Route[]=[

    {
      title: "Seller Management",
      items: [
        {
          title: "Dashboard",
          url: "/seller-dashboard",
        },
        {
          title: "Add Medicine",
          url: "/seller-dashboard/create-medicine",
        },
        {
          title: "Orders",
          url: "/seller-dashboard/orders",
        },

      ],
    },
  ]