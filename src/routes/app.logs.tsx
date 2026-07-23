import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, PhoneIncoming, PhoneOutgoing, PhoneMissed } from "lucide-react";

export const Route = createFileRoute("/app/logs")({
  component: Logs,
});

const logs = Array.from({ length: 14 }).map((_, i) => ({
  id: `CL-${9210 - i}`,
  from: i % 3 === 0 ? "+1 (415) 555 013" + (i % 10) : "+1 (628) 555 010" + (i % 10),
  to: "+1 (415) 555 0100",
  agent: ["Aria", "Milo", "Nova"][i % 3],
  dir: i % 4 === 0 ? "out" : i % 5 === 0 ? "miss" : "in",
  dur: `${1 + (i % 6)}m ${(i * 7) % 60}s`,
  outcome: ["Booked", "Qualified", "Resolved", "Transferred", "Voicemail"][i % 5],
  time: `${i * 12 + 3} min ago`,
}));

function Logs() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Call Logs</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every inbound, outbound, and missed call.
        </p>
      </div>

      <Card className="glass p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search caller, agent, outcome…" className="pl-9" />
          </div>
        </div>
        <table className="w-full text-sm">
          <thead className="border-b border-border/60 text-xs uppercase text-muted-foreground">
            <tr>
              <th className="p-3 text-left">Direction</th>
              <th className="p-3 text-left">Caller</th>
              <th className="p-3 text-left">Agent</th>
              <th className="p-3 text-left">Duration</th>
              <th className="p-3 text-left">Outcome</th>
              <th className="p-3 text-left">Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((l) => (
              <tr key={l.id} className="border-b border-border/40 last:border-0 hover:bg-muted/30">
                <td className="p-3">
                  {l.dir === "in" && <PhoneIncoming className="h-4 w-4 text-success" />}
                  {l.dir === "out" && <PhoneOutgoing className="h-4 w-4 text-primary" />}
                  {l.dir === "miss" && <PhoneMissed className="h-4 w-4 text-destructive" />}
                </td>
                <td className="p-3 font-mono text-xs">{l.from}</td>
                <td className="p-3">{l.agent}</td>
                <td className="p-3 text-muted-foreground">{l.dur}</td>
                <td className="p-3">
                  <Badge variant="outline">{l.outcome}</Badge>
                </td>
                <td className="p-3 text-xs text-muted-foreground">{l.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
