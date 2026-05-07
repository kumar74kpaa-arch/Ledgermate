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
      return `📊 *Today's Sales Summary*\nTotal Sales: ₹${data.totalSales}\nTotal Orders: ${data.orders || 0}\n\nAnything else you'd like to check?`;
    case Intent.GET_OUTSTANDING:
      return `💳 *Outstanding Payments*\nTotal Pending: ₹${data.outstanding}\nNo. of Invoices: ${data.invoices || 0}\n\nWould you like a list of top defaulters?`;
    case Intent.GET_CASH_BALANCE:
      return `💵 *Current Cash Balance*\nTotal Cash in Hand: ₹${data.cash}\n\n_Note: Last updated 5 mins ago._`;
    case Intent.GET_BANK_BALANCE:
      return `🏦 *Bank Balance Summary*\nAvailable Balance: ₹${data.bank}\n\nChecking individual accounts... Done.`;
    case Intent.GET_LOW_STOCK:
      const items = Array.isArray(data.items) ? data.items.join(", ") : "None";
      return `📦 *Low Stock Alert!*\nThe following items are below reorder level: ${items}.\n\nShould I create a purchase draft?`;
    case Intent.GET_GST_PAYABLE:
      return `🧾 *GST Status*\nGST Payable: ₹${data.gst}\nFiling Deadline: 20th of next month.`;
    default:
      return "🤖 I'm your LedgerMate assistant. I can help you with sales, outstandings, balances, and stock. What can I check for you today?";
  }
}
