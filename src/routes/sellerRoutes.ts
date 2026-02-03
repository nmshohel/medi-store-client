import { Route } from "@/types";

export const sellerRoutes:Route[]=[

    {
      title: "Seller Management",
      items: [
        {
          title: "All Medicine",
          url: "/seller-dashboard",
        },
        {
          title: "Add Medicine",
          url: "/seller-dashboard/create-medicine",
        },
        {
          title: "All Orders",
          url: "/seller-dashboard/orders",
        },

      ],
    },
  ]