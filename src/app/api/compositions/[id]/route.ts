import { NextResponse } from "next/server";
import { compositionsStore } from "@/lib/compositions-store";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const state = compositionsStore.get(id);
  if (!state) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  return NextResponse.json({ id, state });
}
