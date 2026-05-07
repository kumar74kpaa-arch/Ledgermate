import { NextRequest, NextResponse } from "next/server";
import { detectIntent } from "@/lib/intents";
import { tallyService } from "@/lib/tallyService";
import { generateAIResponse } from "@/lib/ai";
import { addMessage, addLog } from "@/lib/mockData";
import { Intent } from "@/types/intent";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { from, content } = payload;

    if (!from || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // 1. Store incoming message
    const incomingMsg = {
      id: Date.now().toString(),
      content,
      direction: "incoming" as const,
      timestamp: Date.now(),
    };
    addMessage(incomingMsg);
    addLog({ type: "webhook_received", from, content });

    // 2. Detect Intent
    const intent = detectIntent(content);
    
    // 3. Process Intent & Fetch Data
    let data = null;
    let reply = "I'm sorry, I couldn't understand that request. Try asking for 'today sales', 'outstanding', or 'stock status'.";

    if (intent) {
      switch (intent) {
        case Intent.GET_TODAY_SALES:
          data = await tallyService.getTodaySales();
          reply = generateAIResponse(intent, { totalSales: data.total });
          break;
        case Intent.GET_OUTSTANDING:
          data = await tallyService.getOutstanding();
          reply = generateAIResponse(intent, { outstanding: data.amount });
          break;
        case Intent.GET_CASH_BALANCE:
          data = await tallyService.getCashBalance();
          reply = generateAIResponse(intent, { cash: data.amount });
          break;
        case Intent.GET_BANK_BALANCE:
          data = await tallyService.getBankBalance();
          reply = generateAIResponse(intent, { bank: data.amount });
          break;
        case Intent.GET_LOW_STOCK:
          const stock = await tallyService.getLowStock();
          data = stock;
          reply = generateAIResponse(intent, { items: stock.map(s => s.product) });
          break;
        case Intent.GET_GST_PAYABLE:
          data = await tallyService.getGSTPayable();
          reply = generateAIResponse(intent, { gst: data.amount });
          break;
      }
    }

    // 4. Generate & Store AI Reply
    const outgoingMsg = {
      id: (Date.now() + 1).toString(),
      content: reply,
      direction: "outgoing" as const,
      timestamp: Date.now(),
    };
    addMessage(outgoingMsg);
    addLog({ type: "webhook_reply_sent", reply, intent, data });

    return NextResponse.json({ 
      success: true, 
      message: "Webhook processed",
      reply,
      intent: intent || "NONE"
    });

  } catch (error) {
    console.error("Webhook Error:", error);
    addLog({ type: "webhook_error", error: String(error) });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ message: "WhatsApp Webhook endpoint is active." });
}
