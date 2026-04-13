import { NextResponse } from "next/server";
import { getRepo } from "@/lib/repositories";

/**
 * GET /api/diagnosis/:id
 *
 * Returns the full diagnosis result.
 * If status is "running", the frontend should poll until "completed" or "failed".
 */
export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await getRepo().diagnosis.getById(id);
  if (!result) return NextResponse.json({ success: false, error: "Not found" }, { status: 404 });
  return NextResponse.json({ success: true, data: result });
}
