import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { env } from "@/env";

export async function GET() {
  try {
    const cookieStore = cookies();

    const res = await fetch(`${env.AUTH_URL}/get-session`, {
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: "no-store",
    });

    const data = await res.json();

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { session: null },
      { status: 500 }
    );
  }
}
