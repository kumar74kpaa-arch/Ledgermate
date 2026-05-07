// src/lib/ai.ts
import { Intent } from "./intents";

/**
 * Mock AI response generator. In real implementation this would call an LLM.
 */
export function generateAIResponse(intent: Intent, data: any): string {
  switch (intent) {
    case Intent.GET_TODAY_SALES:
      return `Today's sales total is ₹${data.totalSales}.`;
    case Intent.GET_OUTSTANDING:
      return `Outstanding amount is ₹${data.outstanding}.`;
    case Intent.GET_CASH_BALANCE:
      return `Cash balance: ₹${data.cash}.`;
    case Intent.GET_BANK_BALANCE:
      return `Bank balance: ₹${data.bank}.`;
    case Intent.GET_LOW_STOCK:
      return `Low stock items: ${data.items.join(', ')}.`;
    case Intent.GET_GST_PAYABLE:
      return `GST payable this period: ₹${data.gst}.`;
    default:
      return "I'm not sure how to help with that.";
  }
}
