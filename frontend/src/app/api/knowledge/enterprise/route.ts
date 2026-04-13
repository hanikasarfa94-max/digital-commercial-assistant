import { NextResponse } from "next/server";
import { getRepo } from "@/lib/repositories";

export async function GET() {
  const data = await getRepo().knowledge.getEnterprise();
  return NextResponse.json({ success: true, data });
}

export async function PUT(req: Request) {
  const body = await req.json();
  const data = await getRepo().knowledge.updateEnterprise(body);
  return NextResponse.json({ success: true, data });
}
