import { NextResponse } from "next/server";
import { getRepo } from "@/lib/repositories";

export async function GET() {
  const data = await getRepo().knowledge.getProducts();
  return NextResponse.json({ success: true, data });
}
