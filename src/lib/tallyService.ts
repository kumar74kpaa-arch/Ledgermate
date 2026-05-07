export interface TodaySales {
  total: number;
  orders: number;
}

export interface Outstanding {
  amount: number;
  invoices: number;
}

export interface Balance {
  amount: number;
}

export interface LowStockItem {
  product: string;
  quantity: number;
}

export class TallyService {
  async getTodaySales(): Promise<TodaySales> {
    // Mock data
    return { total: 12500, orders: 42 };
  }
  async getOutstanding(): Promise<Outstanding> {
    return { amount: 8400, invoices: 7 };
  }
  async getCashBalance(): Promise<Balance> {
    return { amount: 5600 };
  }
  async getBankBalance(): Promise<Balance> {
    return { amount: 24000 };
  }
  async getLowStock(): Promise<LowStockItem[]> {
    return [
      { product: 'Widget A', quantity: 3 },
      { product: 'Gadget B', quantity: 1 },
    ];
  }
  async getGSTPayable(): Promise<Balance> {
    return { amount: 3200 };
  }
}

export const tallyService = new TallyService();
