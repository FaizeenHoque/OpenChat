// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { chatCompletion } from "../../../lib/server/fetchHcApi";

export async function POST(req: Request) {
  const { model, message } = await req.json();
  if (!model || !message)
    return NextResponse.json(
      { error: "model and message required" },
      { status: 400 },
    );

  try {
    const data = await chatCompletion({ model, message });
    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
