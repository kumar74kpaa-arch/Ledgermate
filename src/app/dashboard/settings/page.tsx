"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Settings, Moon, Sun, Bell, Shield, Webhook } from "lucide-react";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-zinc-500/10 rounded-xl text-zinc-500">
          <Settings size={32} />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account and integration preferences.</p>
        </div>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun size={20} className="text-amber-500" />
              Appearance
            </CardTitle>
            <CardDescription>Customize how LedgerMate looks on your screen.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Dark Mode</Label>
                <p className="text-xs text-muted-foreground">Toggle between light and dark themes.</p>
              </div>
              <Switch 
                checked={theme === "dark"} 
                onCheckedChange={(checked) => setTheme(checked ? "dark" : "light")}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Webhook size={20} className="text-emerald-500" />
              WhatsApp Integration
            </CardTitle>
            <CardDescription>Configure your WhatsApp assistant connection.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Mock Auto-Reply</Label>
                <p className="text-xs text-muted-foreground">Automatically respond to queries in test mode.</p>
              </div>
              <Switch checked={true} />
            </div>
            <div className="pt-4 border-t">
              <Label className="text-xs uppercase text-muted-foreground mb-2 block">Webhook URL (Public)</Label>
              <div className="flex gap-2">
                <code className="flex-1 bg-muted p-2 rounded text-xs truncate">
                  https://ledgermate-webhook.vercel.app/api/whatsapp/webhook
                </code>
                <Button variant="outline" size="sm">Copy</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={20} className="text-blue-500" />
              Tally Connectivity
            </CardTitle>
            <CardDescription>Manage your Tally instance connection.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-sm font-medium">Connection Status</span>
              <span className="text-xs text-emerald-500 font-bold uppercase tracking-wider flex items-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Connected (Mock)
              </span>
            </div>
            <Button variant="outline">Reconnect</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
