import { Intent } from "@/types/intent";

/**
 * Mock AI Intent Detection
 * Supports fuzzy matching using keyword analysis and regex.
 */
export function detectIntent(message: string): Intent | null {
  const input = message.toLowerCase().trim();

  // GET_TODAY_SALES
  if (
    /today/.test(input) && /sale/.test(input) ||
    /current/.test(input) && /sale/.test(input) ||
    input === "sales"
  ) {
    return Intent.GET_TODAY_SALES;
  }

  // GET_OUTSTANDING
  if (
    /outstanding/.test(input) ||
    /pending/.test(input) && /payment/.test(input) ||
    /due/.test(input) ||
    /balance/.test(input) && /payment/.test(input)
  ) {
    return Intent.GET_OUTSTANDING;
  }

  // GET_CASH_BALANCE
  if (
    /cash/.test(input) && /balance/.test(input) ||
    input === "cash" ||
    /in hand/.test(input)
  ) {
    return Intent.GET_CASH_BALANCE;
  }

  // GET_BANK_BALANCE
  if (
    /bank/.test(input) && /balance/.test(input) ||
    input === "bank" ||
    /account/.test(input) && /balance/.test(input)
  ) {
    return Intent.GET_BANK_BALANCE;
  }

  // GET_LOW_STOCK
  if (
    /low/.test(input) && /stock/.test(input) ||
    /out of stock/.test(input) ||
    /inventory/.test(input) && /short/.test(input) ||
    /reorder/.test(input)
  ) {
    return Intent.GET_LOW_STOCK;
  }

  // GET_GST_PAYABLE
  if (
    /gst/.test(input) ||
    /tax/.test(input) && /payable/.test(input) ||
    /gst/.test(input) && /due/.test(input)
  ) {
    return Intent.GET_GST_PAYABLE;
  }

  return null;
}

/**
 * Mock AI Response Generator
 */
export function generateAIResponse(intent: Intent, data: any): string {
  switch (intent) {
    case Intent.GET_TODAY_SALES:
      return `Today's sales are ₹${data.totalSales} across ${data.orders} invoices.`;
    case Intent.GET_OUTSTANDING:
      return `Total outstanding amount is ₹${data.outstanding} from ${data.invoices} pending invoices.`;
    case Intent.GET_CASH_BALANCE:
      return `Current Cash in Hand is ₹${data.cash}.`;
    case Intent.GET_BANK_BALANCE:
      return `Your total Bank Balance is ₹${data.bank}.`;
    case Intent.GET_LOW_STOCK:
      const items = Array.isArray(data.items) ? data.items.join(", ") : "None";
      return `⚠️ *Low Stock Alert*: The following items are below reorder level: ${items}.`;
    case Intent.GET_GST_PAYABLE:
      return `GST payable for the current period is ₹${data.gst}.`;
    default:
      return "🤖 I'm your LedgerMate assistant. I can help you with sales, outstandings, balances, and stock. What can I check for you today?";
  }
}
