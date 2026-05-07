import { NextResponse } from "next/server";
import { webhookLogs } from "@/lib/mockData";

export async function GET() {
  return NextResponse.json(webhookLogs);
}
