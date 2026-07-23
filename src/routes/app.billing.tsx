import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Check, CreditCard } from "lucide-react";

export const Route = createFileRoute("/app/billing")({
  component: Billing,
});

function Billing() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="mt-1 text-sm text-muted-foreground">Manage your plan, usage, and invoices.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass p-6 md:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase text-muted-foreground">Current plan</div>
              <div className="mt-1 text-2xl font-bold">
                Growth <Badge className="ml-2 align-middle">Popular</Badge>
              </div>
              <div className="text-sm text-muted-foreground">$199 / mo · renews Jan 3, 2027</div>
            </div>
            <Button variant="outline">Change plan</Button>
          </div>
          <div className="mt-6 space-y-3">
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span>Voice minutes</span>
                <span className="text-muted-foreground">1,842 / 3,000</span>
              </div>
              <Progress value={61} />
            </div>
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span>Phone numbers</span>
                <span className="text-muted-foreground">4 / 5</span>
              </div>
              <Progress value={80} />
            </div>
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span>Knowledge storage</span>
                <span className="text-muted-foreground">2.1 / 10 GB</span>
              </div>
              <Progress value={21} />
            </div>
          </div>
        </Card>
        <Card className="glass p-6">
          <div className="text-xs uppercase text-muted-foreground">Payment method</div>
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-border/60 p-3">
            <CreditCard className="h-5 w-5 text-primary" />
            <div className="text-sm">
              <div className="font-medium">Visa •••• 4242</div>
              <div className="text-xs text-muted-foreground">Expires 09/28</div>
            </div>
          </div>
          <Button variant="outline" className="mt-3 w-full">
            Update card
          </Button>
        </Card>
      </div>

      <Card className="glass p-6">
        <div className="mb-4 font-semibold">Recent invoices</div>
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="p-3 text-left">Invoice</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">Amount</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["INV-2094", "Dec 3, 2026", "$199.00", "Paid"],
              ["INV-2019", "Nov 3, 2026", "$199.00", "Paid"],
              ["INV-1948", "Oct 3, 2026", "$149.00", "Paid"],
            ].map((r) => (
              <tr key={r[0]} className="border-b border-border/40 last:border-0">
                <td className="p-3 font-mono">{r[0]}</td>
                <td className="p-3">{r[1]}</td>
                <td className="p-3">{r[2]}</td>
                <td className="p-3">
                  <span className="inline-flex items-center gap-1 text-success">
                    <Check className="h-3 w-3" /> {r[3]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
