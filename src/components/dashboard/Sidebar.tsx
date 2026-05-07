"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  MessageSquare, 
  Database, 
  History, 
  PlayCircle, 
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const menuItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Chat Logs", href: "/dashboard/chats", icon: MessageSquare },
  { name: "Mock Data", href: "/dashboard/mock-data", icon: Database },
  { name: "API Logs", href: "/dashboard/api-logs", icon: History },
  { name: "AI Playground", href: "/dashboard/ai-playground", icon: PlayCircle },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "flex flex-col h-screen border-r bg-card transition-all duration-300 ease-in-out",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="flex items-center justify-between p-4 h-16 border-b">
        {!isCollapsed && <span className="text-xl font-bold tracking-tight text-primary">LedgerMate</span>}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 rounded-md hover:bg-accent hover:text-accent-foreground transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-2 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg transition-all group",
                isActive 
                  ? "bg-primary text-primary-foreground font-medium" 
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <item.icon size={20} className={cn(
                isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-accent-foreground"
              )} />
              {!isCollapsed && <span>{item.name}</span>}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-4 border-t">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
              PK
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-sm font-medium truncate">Prabha Kumar</span>
              <span className="text-xs text-muted-foreground truncate">Admin</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
