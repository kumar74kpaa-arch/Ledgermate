"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  Package, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  {
    title: "Total Sales (Today)",
    value: "₹12,500",
    description: "+12% from yesterday",
    icon: TrendingUp,
    trend: "up",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10"
  },
  {
    title: "Outstanding",
    value: "₹8,400",
    description: "7 pending invoices",
    icon: CreditCard,
    trend: "down",
    color: "text-rose-500",
    bg: "bg-rose-500/10"
  },
  {
    title: "Cash Balance",
    value: "₹5,600",
    description: "Main safe",
    icon: Users,
    trend: "up",
    color: "text-blue-500",
    bg: "bg-blue-500/10"
  },
  {
    title: "Low Stock Items",
    value: "2 Items",
    description: "Widget A, Gadget B",
    icon: Package,
    trend: "down",
    color: "text-amber-500",
    bg: "bg-amber-500/10"
  }
];

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Welcome back, here's what's happening with your Tally data today.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <div className={`${stat.bg} ${stat.color} p-2 rounded-lg`}>
                  <stat.icon size={16} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center text-xs text-muted-foreground mt-1">
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="mr-1 text-emerald-500" size={12} />
                  ) : (
                    <ArrowDownRight className="mr-1 text-rose-500" size={12} />
                  )}
                  {stat.description}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Sales Performance</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border-t mt-2">
            <p className="text-muted-foreground italic">Interactive Chart Placeholder (Simulated)</p>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent WhatsApp Queries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: "John Doe", query: "today sales", time: "2 mins ago" },
                { user: "Jane Smith", query: "pending payments", time: "15 mins ago" },
                { user: "Robert Brown", query: "cash balance", time: "1 hour ago" },
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{item.user}</span>
                    <span className="text-xs text-muted-foreground">"{item.query}"</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
