import { NextResponse } from "next/server";
import { compositionsStore } from "@/lib/compositions-store";

export async function POST(request: Request) {
  try {
    const { id, state } = (await request.json()) as {
      id: string;
      state: string;
    };
    if (!(id && state)) {
      return NextResponse.json(
        { error: "Missing id or state" },
        { status: 400 }
      );
    }
    compositionsStore.set(id, state);
    return NextResponse.json({ id });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

export function GET() {
  const list = Array.from(compositionsStore.entries()).map(([id, state]) => ({
    id,
    state,
  }));
  return NextResponse.json(list);
}
