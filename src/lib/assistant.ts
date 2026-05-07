import { detectIntent, generateAIResponse } from "./ai";
import { tallyService } from "./tallyService";
import { addMessage, addLog } from "./mockData";
import { Intent } from "@/types/intent";

/**
 * Assistant Service
 * Orchestrates the flow from incoming message to outgoing reply.
 */
export class AssistantService {
  async handleIncomingMessage(from: string, content: string): Promise<string> {
    // 1. Store incoming message
    const incomingMsg = {
      id: `in-${Date.now()}`,
      content,
      direction: "incoming" as const,
      timestamp: Date.now(),
    };
    addMessage(incomingMsg);
    addLog({ type: "assistant_received", from, content });

    // 2. Detect Intent
    const intent = detectIntent(content);
    
    // 3. Fetch Data & Generate Response
    let data = null;
    let reply = "I'm sorry, I couldn't understand that request. Try asking for 'today sales', 'outstanding', or 'stock status'.";

    if (intent) {
      switch (intent) {
        case Intent.GET_TODAY_SALES:
          data = await tallyService.getTodaySales();
          reply = generateAIResponse(intent, { 
            totalSales: data.total.toLocaleString('en-IN'), 
            orders: data.orders 
          });
          break;
        case Intent.GET_OUTSTANDING:
          data = await tallyService.getOutstanding();
          reply = generateAIResponse(intent, { 
            outstanding: data.amount.toLocaleString('en-IN'), 
            invoices: data.invoices 
          });
          break;
        case Intent.GET_CASH_BALANCE:
          data = await tallyService.getCashBalance();
          reply = generateAIResponse(intent, { 
            cash: data.amount.toLocaleString('en-IN') 
          });
          break;
        case Intent.GET_BANK_BALANCE:
          data = await tallyService.getBankBalance();
          reply = generateAIResponse(intent, { 
            bank: data.amount.toLocaleString('en-IN') 
          });
          break;
        case Intent.GET_LOW_STOCK:
          const stock = await tallyService.getLowStock();
          data = stock;
          reply = generateAIResponse(intent, { 
            items: stock.map(s => s.product) 
          });
          break;
        case Intent.GET_GST_PAYABLE:
          data = await tallyService.getGSTPayable();
          reply = generateAIResponse(intent, { 
            gst: data.amount.toLocaleString('en-IN') 
          });
          break;
      }
    }

    // 4. Store & Log outgoing reply
    const outgoingMsg = {
      id: `out-${Date.now()}`,
      content: reply,
      direction: "outgoing" as const,
      timestamp: Date.now(),
    };
    addMessage(outgoingMsg);
    addLog({ type: "assistant_reply", reply, intent, data });

    return reply;
  }
}

export const assistantService = new AssistantService();
