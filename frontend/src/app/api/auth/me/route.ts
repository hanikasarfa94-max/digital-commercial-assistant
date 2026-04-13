import { NextResponse } from "next/server";
import { getRepo } from "@/lib/repositories";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") ?? "";
  const token = auth.replace("Bearer ", "");
  const user = await getRepo().auth.getUserByToken(token);
  return NextResponse.json({ success: true, data: user });
}
