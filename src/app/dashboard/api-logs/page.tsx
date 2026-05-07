"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Code2, Clock, Globe } from "lucide-react";

const mockLogs = [
  { id: "LOG001", method: "POST", path: "/api/whatsapp/webhook", status: 200, time: "2024-05-07 10:15:32", latency: "124ms" },
  { id: "LOG002", method: "POST", path: "/api/whatsapp/webhook", status: 200, time: "2024-05-07 10:22:11", latency: "98ms" },
  { id: "LOG003", method: "POST", path: "/api/whatsapp/webhook", status: 500, time: "2024-05-07 10:45:00", latency: "2.4s" },
  { id: "LOG004", method: "POST", path: "/api/whatsapp/webhook", status: 200, time: "2024-05-07 11:02:15", latency: "112ms" },
];

export default function APILogsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-500/10 rounded-xl text-blue-500">
          <Code2 size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Logs</h1>
          <p className="text-muted-foreground">Monitor incoming webhook calls and API performance.</p>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Recent Webhook Activity</CardTitle>
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Clock size={14} /> Real-time
            </div>
            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <Globe size={14} /> WhatsApp Webhook
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Method</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Latency</TableHead>
                <TableHead className="text-right">Timestamp</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-bold">{log.method}</TableCell>
                  <TableCell className="font-mono text-xs">{log.path}</TableCell>
                  <TableCell>
                    <Badge variant={log.status === 200 ? "default" : "destructive"}>
                      {log.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{log.latency}</TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground font-mono">
                    {log.time}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
