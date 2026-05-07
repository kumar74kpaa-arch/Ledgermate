"use client";

import { useState, useEffect, useRef } from "react";
import { Message } from "@/types/message";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, User, Bot, Check, CheckCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

// Mock initial data
const initialMessages: Message[] = [
  { id: "1", content: "Hi LedgerMate, what are today's sales?", direction: "incoming", timestamp: Date.now() - 3600000 },
  { id: "2", content: "Checking your Tally data... Today's sales total is ₹12,500 across 42 orders.", direction: "outgoing", timestamp: Date.now() - 3590000 },
  { id: "3", content: "How about pending payments?", direction: "incoming", timestamp: Date.now() - 1800000 },
  { id: "4", content: "You have 7 pending invoices totaling ₹8,400.", direction: "outgoing", timestamp: Date.now() - 1790000 },
];

export default function ChatsPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      direction: "incoming",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: `I've received your query: "${userMessage.content}". This is a mock response from the LedgerMate AI assistant.`,
        direction: "outgoing",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMessage]);
    }, 1500);
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <Card className="flex-1 flex flex-col overflow-hidden border-none shadow-lg bg-zinc-50/50 dark:bg-zinc-950/50 backdrop-blur-sm">
        <CardHeader className="border-b bg-card/50 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white">
              <Bot size={24} />
            </div>
            <div>
              <CardTitle className="text-base">WhatsApp Assistant</CardTitle>
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs text-muted-foreground">Always active • Connected to Tally</span>
              </div>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 overflow-hidden p-0 relative bg-[url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')] bg-repeat opacity-90 dark:invert">
          <div className="absolute inset-0 bg-zinc-100/80 dark:bg-zinc-900/90" />
          <ScrollArea ref={scrollRef} className="h-full p-6 relative">
            <div className="flex flex-col gap-4">
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    className={cn(
                      "max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm",
                      msg.direction === "incoming" 
                        ? "bg-white dark:bg-zinc-800 self-start rounded-tl-none border" 
                        : "bg-emerald-600 text-white self-end rounded-tr-none"
                    )}
                  >
                    <div className="flex flex-col gap-1">
                      <p className="leading-relaxed">{msg.content}</p>
                      <div className={cn(
                        "flex items-center gap-1 self-end text-[10px]",
                        msg.direction === "incoming" ? "text-muted-foreground" : "text-emerald-100"
                      )}>
                        {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        {msg.direction === "outgoing" && <CheckCheck size={12} />}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="bg-white dark:bg-zinc-800 self-start rounded-2xl rounded-tl-none px-4 py-3 border shadow-sm"
                >
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </motion.div>
              )}
            </div>
          </ScrollArea>
        </CardContent>

        <div className="p-4 bg-card/80 border-t backdrop-blur-md">
          <div className="flex gap-2 max-w-4xl mx-auto">
            <Input
              placeholder="Type a message..."
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              className="rounded-full bg-background/50 border-zinc-200 dark:border-zinc-800 focus:ring-emerald-500"
            />
            <Button 
              onClick={handleSendMessage}
              size="icon" 
              className="rounded-full bg-emerald-600 hover:bg-emerald-700 shrink-0 h-10 w-10"
            >
              <Send size={18} className="text-white ml-0.5" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
