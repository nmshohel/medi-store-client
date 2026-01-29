import { NextRequest, NextResponse } from "next/server";
import { userServices } from "./services/user.service";
import { Roles } from "./constants/roles";


export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const { data } = await userServices.getSession();

  // 🔒 Not authenticated
  if (!data) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const role = data.user.role;

  // =========================
  // ADMIN RULES
  // =========================
  if (role === Roles.admin) {
    if (!pathname.startsWith("/admin-dashboard")) {
      return NextResponse.redirect(
        new URL("/admin-dashboard", request.url)
      );
    }
  }

  // =========================
  // SELLER RULES
  // =========================
  if (role === Roles.seller) {
    if (!pathname.startsWith("/seller-dashboard")) {
      return NextResponse.redirect(
        new URL("/seller-dashboard", request.url)
      );
    }
  }

  // =========================
  // CUSTOMER / USER RULES
  // =========================
  if (role === Roles.customer) {
    if (!pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(
        new URL("/dashboard", request.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/admin-dashboard",
    "/admin-dashboard/:path*",
    "/seller-dashboard",
    "/seller-dashboard/:path*",
  ],
};
