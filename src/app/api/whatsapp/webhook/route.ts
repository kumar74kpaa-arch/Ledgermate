import { NextRequest, NextResponse } from "next/server";
import { assistantService } from "@/lib/assistant";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { from, content } = payload;

    if (!from || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const reply = await assistantService.handleIncomingMessage(from, content);

    return NextResponse.json({ 
      success: true, 
      message: "Webhook processed",
      reply
    });

  } catch (error) {
    console.error("Webhook Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "WhatsApp Webhook endpoint is active." });
}
