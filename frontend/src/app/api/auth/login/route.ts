import { NextResponse } from "next/server";
import { getRepo } from "@/lib/repositories";

export async function POST(req: Request) {
  const body = await req.json();
  try {
    const result = await getRepo().auth.login(body.role);
    return NextResponse.json({ success: true, data: result });
  } catch {
    return NextResponse.json({ success: false, error: "Invalid role" }, { status: 400 });
  }
}
