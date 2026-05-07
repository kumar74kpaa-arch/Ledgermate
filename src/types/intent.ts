export enum Intent {
  GET_TODAY_SALES = 'GET_TODAY_SALES',
  GET_OUTSTANDING = 'GET_OUTSTANDING',
  GET_CASH_BALANCE = 'GET_CASH_BALANCE',
  GET_BANK_BALANCE = 'GET_BANK_BALANCE',
  GET_LOW_STOCK = 'GET_LOW_STOCK',
  GET_GST_PAYABLE = 'GET_GST_PAYABLE',
}

export interface Message {
  id: string;
  content: string;
  direction: 'incoming' | 'outgoing';
  timestamp: number; // Unix epoch ms
}

export interface TallyResponse {
  intent: Intent;
  data: any; // specific shape varies per intent
}
