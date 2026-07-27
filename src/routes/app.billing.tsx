import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CreditCard } from "lucide-react";

export const Route = createFileRoute("/app/billing")({
  component: Billing,
});

function Billing() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Billing</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your plan, usage, and invoices.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass p-6 md:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-xs uppercase text-muted-foreground">
                Current plan
              </div>
              <div className="mt-1 text-2xl font-bold">No active plan</div>
              <div className="text-sm text-muted-foreground">
                Choose a plan to get started.
              </div>
            </div>
            <Button variant="outline">Change plan</Button>
          </div>
          <div className="mt-6 space-y-3">
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span>Voice minutes</span>
                <span className="text-muted-foreground">0 / —</span>
              </div>
              <Progress value={0} />
            </div>
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span>Phone numbers</span>
                <span className="text-muted-foreground">0 / —</span>
              </div>
              <Progress value={0} />
            </div>
            <div>
              <div className="mb-1 flex justify-between text-xs">
                <span>Knowledge storage</span>
                <span className="text-muted-foreground">0 / —</span>
              </div>
              <Progress value={0} />
            </div>
          </div>
        </Card>
        <Card className="glass p-6">
          <div className="text-xs uppercase text-muted-foreground">
            Payment method
          </div>
          <div className="mt-3 flex items-center gap-3 rounded-xl border border-border/60 p-3">
            <CreditCard className="h-5 w-5 text-primary" />
            <div className="text-sm">
              <div className="font-medium">No payment method</div>
              <div className="text-xs text-muted-foreground">
                Add a payment method to upgrade.
              </div>
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
            <tr className="border-b border-border/40">
              <td className="p-3 text-muted-foreground" colSpan={4}>
                No invoices yet
              </td>
            </tr>
          </tbody>
        </table>
      </Card>
    </div>
  );
}
