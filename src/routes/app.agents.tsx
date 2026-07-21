import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bot, Phone, MoreHorizontal, Activity, Plus, TrendingUp,
  Zap, Star, ArrowUpRight, Clock, Users, Settings2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/app/agents")({
  component: Agents,
});

const agents = [
  {
    name: "Aria", role: "AI Receptionist", status: "Live",
    calls: 842, csat: 4.8, number: "+1 (415) 555 0100",
    health: 98, lastDeployed: "2h ago", knowledge: "248 docs",
    desc: "Handles inbound reception, appointment booking, and FAQ resolution.",
  },
  {
    name: "Milo", role: "Sales Representative", status: "Live",
    calls: 421, csat: 4.6, number: "+1 (415) 555 0142",
    health: 94, lastDeployed: "1d ago", knowledge: "86 docs",
    desc: "Qualifies leads, runs discovery calls, and schedules demos with the sales team.",
  },
  {
    name: "Nova", role: "Customer Support", status: "Live",
    calls: 618, csat: 4.9, number: "+1 (628) 555 0177",
    health: 99, lastDeployed: "3d ago", knowledge: "312 docs",
    desc: "Provides tier-1 customer support and escalates complex issues intelligently.",
  },
  {
    name: "Kai", role: "Appointment Scheduler", status: "Paused",
    calls: 210, csat: 4.5, number: "+1 (415) 555 0180",
    health: 72, lastDeployed: "5d ago", knowledge: "44 docs",
    desc: "Specializes in scheduling, rescheduling, and sending reminders.",
  },
  {
    name: "Luna", role: "Hotel Concierge", status: "Draft",
    calls: 0, csat: 0, number: "—",
    health: 0, lastDeployed: "—", knowledge: "—",
    desc: "Luxury hospitality agent — currently in configuration.",
  },
];

const statusConfig: Record<string, { label: string; dot: string; badge: string }> = {
  Live:   { label: "Live",   dot: "bg-success", badge: "bg-success/12 text-success border-success/20" },
  Paused: { label: "Paused", dot: "bg-warning",  badge: "bg-warning/12 text-warning border-warning/20" },
  Draft:  { label: "Draft",  dot: "bg-muted-foreground", badge: "bg-muted/50 text-muted-foreground border-border" },
};

function HealthBar({ value }: { value: number }) {
  const color = value >= 90 ? "bg-success" : value >= 70 ? "bg-warning" : "bg-muted-foreground/40";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted/50">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-8 text-right text-xs font-medium text-muted-foreground">{value || "—"}</span>
    </div>
  );
}

function Agents() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* ─── Page Header ─── */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Agents</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            5 AI employees · 3 live · 1 paused · 1 draft
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-border/60">
            <Settings2 className="mr-2 h-3.5 w-3.5" />
            Manage
          </Button>
          <Link to="/app/create">
            <Button size="sm" className="bg-primary text-primary-foreground font-medium shadow-md">
              <Plus className="mr-2 h-3.5 w-3.5" />
              New Agent
            </Button>
          </Link>
        </div>
      </div>

      {/* ─── Summary Stats ─── */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          { label: "Total Workforce", val: "5 agents", icon: Bot, trend: "+2 this month" },
          { label: "Live Agents", val: "3 live", icon: Activity, trend: "100% uptime" },
          { label: "Total Calls", val: "2,091", icon: Phone, trend: "+34% vs last week" },
          { label: "Avg CSAT", val: "4.8 / 5.0", icon: Star, trend: "Top 5% benchmark" },
        ].map((s) => (
          <Card key={s.label} className="glass p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 text-xl font-bold">{s.val}</div>
            <div className="mt-1 text-[10px] text-muted-foreground">{s.trend}</div>
          </Card>
        ))}
      </div>

      {/* ─── Agent Cards ─── */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((a) => {
          const sc = statusConfig[a.status];
          return (
            <Card key={a.name} className="glass card-hover group flex flex-col overflow-hidden">
              {/* Header */}
              <div className="p-5 pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar */}
                    <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-surface-2 border border-border text-2xl font-bold text-foreground shadow-sm">
                      {a.name[0]}
                      {/* Status dot */}
                      <span className={`absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-card ${sc.dot} ${a.status === "Live" ? "animate-pulse" : ""}`} />
                    </div>
                    <div>
                      <div className="font-bold leading-tight">{a.name}</div>
                      <div className="mt-0.5 text-xs text-muted-foreground">{a.role}</div>
                    </div>
                  </div>
                  <Button size="icon" variant="ghost" className="h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>

                {/* Description */}
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{a.desc}</p>

                {/* Status + Number */}
                <div className="mt-3 flex items-center gap-2">
                  <Badge className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${sc.badge}`}>
                    <span className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${sc.dot}`} />
                    {sc.label}
                  </Badge>
                  {a.number !== "—" && (
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {a.number}
                    </span>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="border-t border-border/50 px-5 py-3">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div>
                    <div className="text-xs text-muted-foreground">Calls</div>
                    <div className="mt-0.5 text-sm font-bold">{a.calls || "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">CSAT</div>
                    <div className="mt-0.5 text-sm font-bold">{a.csat || "—"}</div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Knowledge</div>
                    <div className="mt-0.5 text-[11px] font-semibold">{a.knowledge}</div>
                  </div>
                </div>
              </div>

              {/* Health bar */}
              {a.status !== "Draft" && (
                <div className="px-5 py-2">
                  <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground">
                    <span>Health score</span>
                    <span className="font-medium">{a.health}%</span>
                  </div>
                  <HealthBar value={a.health} />
                </div>
              )}

              {/* Footer */}
              <div className="mt-auto flex gap-2 border-t border-border/50 p-4">
                <Button size="sm" variant="outline" className="flex-1 border-border/60 text-xs">
                  <Settings2 className="mr-1.5 h-3 w-3" />
                  Configure
                </Button>
                <Button size="sm" className="flex-1 bg-primary/15 text-primary text-xs hover:bg-primary/25">
                  <Bot className="mr-1.5 h-3 w-3" />
                  Test Call
                </Button>
                {a.status === "Live" && (
                  <Button size="sm" variant="ghost" className="shrink-0 text-xs text-muted-foreground">
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                )}
              </div>
            </Card>
          );
        })}

        {/* Add new agent card */}
        <Link to="/app/create">
          <Card className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 border-dashed border-border/50 bg-transparent p-8 text-center transition hover:border-primary/40 hover:bg-primary/4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl border-2 border-dashed border-border/60 text-muted-foreground transition hover:border-primary/50 hover:text-primary">
              <Plus className="h-6 w-6" />
            </div>
            <div>
              <div className="font-semibold text-muted-foreground">Create New Agent</div>
              <p className="mt-1 text-xs text-muted-foreground/70">Deploy your next AI employee in minutes</p>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
