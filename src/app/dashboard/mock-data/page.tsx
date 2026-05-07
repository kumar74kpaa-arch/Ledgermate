"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const invoices = [
  { id: "INV001", customer: "ABC Corp", date: "2024-05-01", amount: "₹4,500", status: "Paid" },
  { id: "INV002", customer: "XYZ Ltd", date: "2024-05-02", amount: "₹2,300", status: "Pending" },
  { id: "INV003", customer: "Global Solutions", date: "2024-05-03", amount: "₹8,900", status: "Overdue" },
  { id: "INV004", customer: "Local Shop", date: "2024-05-04", amount: "₹1,200", status: "Paid" },
  { id: "INV005", customer: "Tech Partners", date: "2024-05-05", amount: "₹5,600", status: "Pending" },
];

export default function MockDataPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Mock Tally Data</h1>
        <p className="text-muted-foreground">View and manage simulated data from your Tally instance.</p>
      </div>

      <Tabs defaultValue="invoices" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="outstanding">Outstanding</TabsTrigger>
          <TabsTrigger value="inventory">Inventory</TabsTrigger>
          <TabsTrigger value="balances">Balances</TabsTrigger>
        </TabsList>
        
        <TabsContent value="invoices">
          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.customer}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell>{invoice.amount}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant={invoice.status === "Paid" ? "default" : invoice.status === "Pending" ? "secondary" : "destructive"}>
                          {invoice.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="outstanding">
          <Card>
            <CardContent className="p-12 flex items-center justify-center text-muted-foreground italic">
              Outstanding payments data view...
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="inventory">
          <Card>
            <CardContent className="p-12 flex items-center justify-center text-muted-foreground italic">
              Inventory and stock levels view...
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="balances">
          <Card>
            <CardContent className="p-12 flex items-center justify-center text-muted-foreground italic">
              Ledger balances and cash/bank view...
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
