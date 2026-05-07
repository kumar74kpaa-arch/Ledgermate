"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { detectIntent, generateAIResponse } from "@/lib/ai";
import { Intent } from "@/types/intent";
import { tallyService } from "@/lib/tallyService";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, Search, Code, CheckCircle2, AlertCircle } from "lucide-react";

export default function AIPlaygroundPage() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    intent: Intent | null;
    response: string;
    data: any;
    raw: string;
  } | null>(null);

  const handleTest = async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setResult(null);

    // Simulate flow
    const intent = detectIntent(prompt);
    let data = null;
    let response = "I couldn't identify a specific intent for this query. Try asking about sales, outstanding payments, or stock levels.";

    if (intent) {
      switch (intent) {
        case Intent.GET_TODAY_SALES:
          data = await tallyService.getTodaySales();
          response = generateAIResponse(intent, { totalSales: data.total });
          break;
        case Intent.GET_OUTSTANDING:
          data = await tallyService.getOutstanding();
          response = generateAIResponse(intent, { outstanding: data.amount });
          break;
        case Intent.GET_CASH_BALANCE:
          data = await tallyService.getCashBalance();
          response = generateAIResponse(intent, { cash: data.amount });
          break;
        case Intent.GET_BANK_BALANCE:
          data = await tallyService.getBankBalance();
          response = generateAIResponse(intent, { bank: data.amount });
          break;
        case Intent.GET_LOW_STOCK:
          const stock = await tallyService.getLowStock();
          data = stock;
          response = generateAIResponse(intent, { items: stock.map(s => s.product) });
          break;
        case Intent.GET_GST_PAYABLE:
          data = await tallyService.getGSTPayable();
          response = generateAIResponse(intent, { gst: data.amount });
          break;
      }
    }

    setTimeout(() => {
      setResult({ intent, response, data, raw: prompt });
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-xl text-primary">
          <Brain size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Playground</h1>
          <p className="text-muted-foreground">Test how the assistant interprets user queries and generates responses.</p>
        </div>
      </div>

      <Card className="border-2 border-primary/20 shadow-xl overflow-hidden">
        <CardHeader className="bg-primary/5">
          <CardTitle>Test Prompt</CardTitle>
          <CardDescription>Enter a natural language query as if you were a WhatsApp user.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="flex gap-3">
            <Input 
              placeholder='e.g., "how much sales today?" or "pending payments"' 
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleTest()}
              className="h-12 text-lg"
            />
            <Button 
              onClick={handleTest} 
              disabled={loading}
              className="h-12 px-8 font-semibold"
            >
              {loading ? "Analyzing..." : "Run Test"}
            </Button>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Try these:</span>
            {["today sales", "outstanding", "cash balance", "low stock"].map(t => (
              <button 
                key={t}
                onClick={() => setPrompt(t)}
                className="text-xs bg-muted hover:bg-accent px-2 py-1 rounded transition-colors"
              >
                {t}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <AnimatePresence>
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                  <Search size={18} className="text-blue-500" />
                  <CardTitle className="text-sm uppercase tracking-wider">Intent Detection</CardTitle>
                </CardHeader>
                <CardContent>
                  {result.intent ? (
                    <div className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 dark:bg-emerald-950/30 p-3 rounded-lg border border-emerald-200 dark:border-emerald-900">
                      <CheckCircle2 size={20} />
                      {result.intent}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-rose-600 font-bold bg-rose-50 dark:bg-rose-950/30 p-3 rounded-lg border border-rose-200 dark:border-rose-900">
                      <AlertCircle size={20} />
                      UNKNOWN_INTENT
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-2 pb-2">
                  <Code size={18} className="text-amber-500" />
                  <CardTitle className="text-sm uppercase tracking-wider">Mock Tally Service Data</CardTitle>
                </CardHeader>
                <CardContent>
                  <pre className="text-xs bg-zinc-950 text-zinc-50 p-3 rounded-lg overflow-x-auto">
                    {JSON.stringify(result.data || {}, null, 2)}
                  </pre>
                </CardContent>
              </Card>
            </div>

            <Card className="border-emerald-500/30 bg-emerald-50/10">
              <CardHeader>
                <CardTitle className="text-lg">Generated AI Response</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-white dark:bg-zinc-900 rounded-xl border-l-4 border-emerald-500 shadow-sm italic text-lg leading-relaxed">
                  "{result.response}"
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
