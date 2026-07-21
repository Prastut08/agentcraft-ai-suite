import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, PhoneForwarded, Plus, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/app/numbers")({
  component: Numbers,
});

const numbers = [
  { n: "+1 (415) 555 0100", provider: "Twilio", agent: "Aria", country: "US", status: "Healthy" },
  { n: "+1 (415) 555 0142", provider: "Vapi", agent: "Milo", country: "US", status: "Healthy" },
  { n: "+44 20 7946 0958", provider: "Telnyx", agent: "Nova", country: "UK", status: "Healthy" },
  { n: "+1 (628) 555 0177", provider: "Twilio", agent: "—", country: "US", status: "Idle" },
];

function Numbers() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Phone Numbers</h1>
          <p className="mt-1 text-sm text-muted-foreground">4 numbers across 3 providers</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><PhoneForwarded className="mr-2 h-4 w-4" /> Port number</Button>
          <Button><Plus className="mr-2 h-4 w-4" /> Buy number</Button>
        </div>
      </div>

      <Card className="glass overflow-hidden">
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 text-xs uppercase text-muted-foreground">
            <tr><th className="p-4 text-left">Number</th><th className="p-4 text-left">Provider</th><th className="p-4 text-left">Assigned</th><th className="p-4 text-left">Country</th><th className="p-4 text-left">Health</th></tr>
          </thead>
          <tbody>
            {numbers.map((r) => (
              <tr key={r.n} className="border-b border-border/40 last:border-0 hover:bg-muted/30">
                <td className="p-4 font-mono">{r.n}</td>
                <td className="p-4"><Badge variant="outline">{r.provider}</Badge></td>
                <td className="p-4">{r.agent}</td>
                <td className="p-4 text-muted-foreground">{r.country}</td>
                <td className="p-4">
                  <span className="inline-flex items-center gap-1.5 text-xs text-success"><ShieldCheck className="h-3.5 w-3.5" /> {r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
