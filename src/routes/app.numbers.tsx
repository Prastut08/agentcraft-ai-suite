import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, PhoneForwarded, Plus, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/app/numbers")({
  component: Numbers,
});

const numbers: {
  n: string;
  provider: string;
  agent: string;
  country: string;
  status: string;
}[] = [];

function Numbers() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Phone Numbers</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Add numbers to route calls to your agents.
        </p>
      </div>
      <Card className="glass overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="p-4 text-left">Number</th>
              <th className="p-4 text-left">Provider</th>
              <th className="p-4 text-left">Assigned</th>
              <th className="p-4 text-left">Country</th>
              <th className="p-4 text-left">Health</th>
            </tr>
          </thead>
          <tbody>
            {numbers.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="p-8 text-center text-sm text-muted-foreground"
                >
                  No phone numbers yet. Add a number to get started.
                </td>
              </tr>
            ) : (
              numbers.map((r) => (
                <tr
                  key={r.n}
                  className="border-b border-border/40 last:border-0 hover:bg-muted/30"
                >
                  <td className="p-4 font-mono">{r.n}</td>
                  <td className="p-4">
                    <Badge variant="outline">{r.provider}</Badge>
                  </td>
                  <td className="p-4">{r.agent}</td>
                  <td className="p-4 text-muted-foreground">{r.country}</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-success">
                      <ShieldCheck className="h-3.5 w-3.5" /> {r.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
