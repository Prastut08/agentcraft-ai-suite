import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Bot, Phone, MoreHorizontal, Activity, Plus } from "lucide-react";

export const Route = createFileRoute("/app/agents")({
  component: Agents,
});

const agents = [
  { name: "Aria", role: "AI Receptionist", status: "Live", calls: 842, csat: 4.8, number: "+1 (415) 555 0100" },
  { name: "Milo", role: "Sales Representative", status: "Live", calls: 421, csat: 4.6, number: "+1 (415) 555 0142" },
  { name: "Nova", role: "Customer Support", status: "Live", calls: 618, csat: 4.9, number: "+1 (628) 555 0177" },
  { name: "Kai", role: "Appointment Scheduler", status: "Paused", calls: 210, csat: 4.5, number: "+1 (415) 555 0180" },
  { name: "Luna", role: "Hotel Concierge", status: "Draft", calls: 0, csat: 0, number: "—" },
];

function Agents() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">My Agents</h1>
          <p className="mt-1 text-sm text-muted-foreground">5 agents · 4 live · 1 draft</p>
        </div>
        <Link to="/app/create"><Button><Plus className="mr-2 h-4 w-4" /> New agent</Button></Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((a) => (
          <Card key={a.name} className="glass group p-5 transition hover:brand-glow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-primary/50 to-accent/50 text-lg font-bold text-brand-foreground">{a.name[0]}</div>
                <div>
                  <div className="font-semibold">{a.name}</div>
                  <div className="text-xs text-muted-foreground">{a.role}</div>
                </div>
              </div>
              <Button size="icon" variant="ghost" className="h-8 w-8"><MoreHorizontal className="h-4 w-4" /></Button>
            </div>
            <div className="mt-4 flex items-center gap-2">
              <Badge variant={a.status === "Live" ? "default" : a.status === "Paused" ? "secondary" : "outline"} className={a.status === "Live" ? "bg-success/20 text-success" : ""}>
                <Activity className="mr-1 h-3 w-3" /> {a.status}
              </Badge>
              <span className="text-xs text-muted-foreground"><Phone className="mr-1 inline h-3 w-3" /> {a.number}</span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border/60 pt-4 text-xs">
              <div><div className="text-muted-foreground">Calls</div><div className="mt-0.5 font-semibold text-foreground">{a.calls}</div></div>
              <div><div className="text-muted-foreground">CSAT</div><div className="mt-0.5 font-semibold text-foreground">{a.csat || "—"}</div></div>
              <div><div className="text-muted-foreground">Status</div><div className="mt-0.5 font-semibold text-foreground">{a.status}</div></div>
            </div>
            <div className="mt-4 flex gap-2">
              <Button size="sm" variant="outline" className="flex-1">Open</Button>
              <Button size="sm" variant="ghost" className="flex-1"><Bot className="mr-1 h-3 w-3" /> Test</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
