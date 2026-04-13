import { NextResponse } from "next/server";
import { getRepo } from "@/lib/repositories";

export async function GET() {
  const data = await getRepo().workspace.getWorkspace();
  return NextResponse.json({ success: true, data });
}
