export enum Intent {
  GET_TODAY_SALES = 'GET_TODAY_SALES',
  GET_OUTSTANDING = 'GET_OUTSTANDING',
  GET_CASH_BALANCE = 'GET_CASH_BALANCE',
  GET_BANK_BALANCE = 'GET_BANK_BALANCE',
  GET_LOW_STOCK = 'GET_LOW_STOCK',
  GET_GST_PAYABLE = 'GET_GST_PAYABLE',
}

/** Simple keyword‑based intent detection */
export function detectIntent(message: string): Intent | null {
  const lowered = message.toLowerCase();
  if (/today|sales/.test(lowered)) return Intent.GET_TODAY_SALES;
  if (/outstanding|pending/.test(lowered)) return Intent.GET_OUTSTANDING;
  if (/cash\s*balance/.test(lowered)) return Intent.GET_CASH_BALANCE;
  if (/bank\s*balance/.test(lowered)) return Intent.GET_BANK_BALANCE;
  if (/low\s*stock/.test(lowered)) return Intent.GET_LOW_STOCK;
  if (/gst|payable/.test(lowered)) return Intent.GET_GST_PAYABLE;
  return null;
}
