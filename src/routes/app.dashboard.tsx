import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Phone, PhoneIncoming, PhoneMissed, Clock, CalendarCheck, DollarSign,
  TrendingUp, Users, Database, Activity, ArrowUpRight, Plus, Bot,
  Sparkles, Zap, Shield, MoreHorizontal, ChevronUp,
} from "lucide-react";
import {
  Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid,
} from "recharts";

export const Route = createFileRoute("/app/dashboard")({
  component: Dashboard,
});

const callsData = Array.from({ length: 14 }, (_, i) => ({
  day: `${i + 1}`,
  calls: 40 + Math.round(Math.sin(i / 2) * 20 + Math.random() * 30 + i * 3),
  booked: 10 + Math.round(Math.cos(i / 3) * 6 + Math.random() * 8 + i),
}));

const stats = [
  { label: "Total Calls", value: "2,847", delta: "+12.4%", trend: "up", icon: Phone, color: "primary" },
  { label: "Active Agents", value: "6", delta: "+2 this week", trend: "up", icon: Bot, color: "primary" },
  { label: "Appointments", value: "412", delta: "+22%", trend: "up", icon: CalendarCheck, color: "success" },
  { label: "Revenue Impact", value: "$48.2k", delta: "+31%", trend: "up", icon: DollarSign, color: "success" },
  { label: "Missed Calls", value: "18", delta: "-38%", trend: "down", icon: PhoneMissed, color: "accent" },
  { label: "Avg Duration", value: "3m 42s", delta: "+8s", trend: "up", icon: Clock, color: "muted" },
  { label: "Lead Conversion", value: "34.7%", delta: "+4.1pts", trend: "up", icon: TrendingUp, color: "primary" },
  { label: "CSAT Score", value: "4.8 / 5", delta: "+0.2", trend: "up", icon: Users, color: "success" },
];

const recent = [
  { name: "Sarah Kim", agent: "Aria", role: "Receptionist", outcome: "Appointment booked", time: "2m ago", status: "success" },
  { name: "+1 (415) 555 0132", agent: "Milo", role: "Sales", outcome: "Qualified lead — hot", time: "8m ago", status: "success" },
  { name: "Rajiv Menon", agent: "Nova", role: "Support", outcome: "Escalated to human", time: "22m ago", status: "warn" },
  { name: "+44 20 7946 0958", agent: "Aria", role: "FAQ", outcome: "Resolved", time: "41m ago", status: "success" },
  { name: "Anonymous", agent: "Aria", role: "Receptionist", outcome: "Voicemail left", time: "1h ago", status: "muted" },
];

const quickActions = [
  { label: "Create Agent", icon: Plus, to: "/app/create", color: "primary" },
  { label: "Upload Knowledge", icon: Database, to: "/app/knowledge", color: "accent" },
  { label: "View Analytics", icon: TrendingUp, to: "/app/analytics", color: "success" },
  { label: "Integrations", icon: Zap, to: "/app/integrations", color: "warning" },
];

function StatCard({ s }: { s: typeof stats[0] }) {
  const colorMap: Record<string, string> = {
    primary: "bg-primary/12 text-primary",
    success: "bg-success/12 text-success",
    accent: "bg-accent/12 text-accent",
    muted: "bg-muted/50 text-muted-foreground",
    warning: "bg-warning/12 text-warning",
  };
  const deltaColor = s.trend === "down" && s.label !== "Missed Calls"
    ? "text-destructive"
    : s.label === "Missed Calls" && s.trend === "down"
    ? "text-success"
    : "text-success";

  return (
    <Card className="glass card-hover group relative overflow-hidden p-5">
      {/* Subtle gradient accent in background */}
      <div className={`absolute right-0 top-0 h-20 w-20 rounded-bl-3xl opacity-5 ${
        s.color === "primary" ? "bg-primary" : s.color === "success" ? "bg-success" : s.color === "accent" ? "bg-accent" : "bg-muted"
      }`} />
      <div className="flex items-start justify-between">
        <div className={`grid h-10 w-10 place-items-center rounded-xl transition-transform duration-200 group-hover:scale-110 ${colorMap[s.color]}`}>
          <s.icon className="h-5 w-5" />
        </div>
        <ChevronUp className={`h-4 w-4 transition-opacity ${deltaColor} opacity-0 group-hover:opacity-100`} />
      </div>
      <div className="mt-4">
        <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{s.label}</div>
        <div className="mt-1.5 text-2xl font-bold tracking-tight">{s.value}</div>
        <div className={`mt-1 flex items-center gap-1 text-xs font-medium ${deltaColor}`}>
          <TrendingUp className="h-3 w-3" />
          {s.delta} vs last month
        </div>
      </div>
    </Card>
  );
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-xl border border-border/60 bg-popover p-3 shadow-xl">
        <p className="mb-2 text-xs font-medium text-muted-foreground">Day {label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full" style={{ background: p.color }} />
            <span className="capitalize text-muted-foreground">{p.name}:</span>
            <span className="font-semibold">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function Dashboard() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* ─── Page Header ─── */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full border border-success/30 bg-success/15">
              <span className="h-2 w-2 rounded-full bg-success animate-pulse" />
            </div>
            <span className="text-xs font-medium text-success">6 agents live · Real-time</span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome back, Jamie</h1>
          <p className="mt-1.5 max-w-xl text-sm text-muted-foreground">
            Your voice workforce handled{" "}
            <span className="font-semibold text-foreground">128 calls today</span> — 94% resolved without human intervention.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-9 border-border/60 text-sm">
            <Activity className="mr-2 h-3.5 w-3.5 text-success" />
            Live Monitor
          </Button>
          <Link to="/app/create">
            <Button className="h-9 bg-primary text-primary-foreground text-sm font-medium shadow-md">
              <Plus className="mr-2 h-3.5 w-3.5" />
              New Agent
            </Button>
          </Link>
        </div>
      </div>

      {/* ─── KPI Grid ─── */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => <StatCard key={s.label} s={s} />)}
      </div>

      {/* ─── Chart + Recent ─── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Chart */}
        <Card className="glass p-6 lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Call Volume</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">Last 14 days — inbound + booked</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-primary" /> Calls
              </div>
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-accent" /> Booked
              </div>
              <Badge variant="outline" className="text-[10px]">
                <PhoneIncoming className="mr-1 h-2.5 w-2.5 text-primary" />
                Live
              </Badge>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={callsData} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
                <defs>
                  <linearGradient id="c1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="c2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 5%)" vertical={false} />
                <XAxis dataKey="day" stroke="oklch(1 0 0 / 30%)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(1 0 0 / 30%)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "oklch(1 0 0 / 8%)", strokeWidth: 1 }} />
                <Area type="monotone" dataKey="calls" stroke="var(--color-primary)" fill="url(#c1)" strokeWidth={2} dot={false} />
                <Area type="monotone" dataKey="booked" stroke="var(--color-accent)" fill="url(#c2)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Recent Conversations */}
        <Card className="glass p-5 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Recent Conversations</h3>
            <Link to="/app/conversations" className="flex items-center gap-1 text-xs font-medium text-primary transition hover:opacity-80">
              View all <ArrowUpRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="space-y-1">
            {recent.map((r) => (
              <div
                key={r.time}
                className="flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-muted/30 cursor-pointer"
              >
                <Avatar className="h-8 w-8 shrink-0">
                  <AvatarFallback className="bg-surface-2 text-xs font-medium">
                    {r.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-semibold">{r.name}</div>
                  <div className="truncate text-[11px] text-muted-foreground">
                    {r.agent} · {r.outcome}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] text-muted-foreground">{r.time}</span>
                  <span className={`h-1.5 w-1.5 rounded-full ${
                    r.status === "success" ? "bg-success" : r.status === "warn" ? "bg-warning" : "bg-muted-foreground/40"
                  }`} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ─── Quick Actions + Health Cards ─── */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {/* Quick Actions */}
        {quickActions.map((a) => (
          <Link key={a.label} to={a.to as string as "/app/create"}>
            <Card className="glass group h-full cursor-pointer p-4 transition hover:brand-glow">
              <div className={`mb-3 grid h-10 w-10 place-items-center rounded-xl transition-transform duration-200 group-hover:scale-110 ${
                a.color === "primary" ? "bg-primary/15 text-primary"
                : a.color === "accent" ? "bg-accent/15 text-accent"
                : a.color === "success" ? "bg-success/15 text-success"
                : "bg-warning/15 text-warning"
              }`}>
                <a.icon className="h-5 w-5" />
              </div>
              <div className="text-sm font-semibold">{a.label}</div>
              <div className="mt-1 flex items-center gap-1 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100">
                Open <ArrowUpRight className="h-3 w-3" />
              </div>
            </Card>
          </Link>
        ))}
      </div>

      {/* ─── Health Status Row ─── */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/12 text-primary">
              <Database className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs text-muted-foreground">Knowledge Base</div>
              <div className="mt-0.5 font-semibold">248 documents</div>
              <div className="mt-0.5 flex items-center gap-1 text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                <span className="text-success">Healthy · 100% embedded</span>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>

        <Card className="glass p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-success/12 text-success">
              <Phone className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs text-muted-foreground">Phone Numbers</div>
              <div className="mt-0.5 font-semibold">4 active</div>
              <div className="mt-0.5 flex items-center gap-1 text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                <span className="text-success">All healthy · 0 errors</span>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>

        <Card className="glass p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-accent/12 text-accent">
              <Shield className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-xs text-muted-foreground">Platform Security</div>
              <div className="mt-0.5 font-semibold">SOC2 Compliant</div>
              <div className="mt-0.5 flex items-center gap-1 text-xs">
                <span className="h-1.5 w-1.5 rounded-full bg-success" />
                <span className="text-success">Encrypted · Audit logs on</span>
              </div>
            </div>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </div>
        </Card>
      </div>

      {/* ─── AI Suggestions Banner ─── */}
      <Card className="relative overflow-hidden border border-border bg-surface p-5">
        <div className="absolute inset-0 dot-pattern opacity-30" />
        <div className="relative flex items-start gap-4">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/20 text-primary animate-glow-pulse">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold">AI Recommendations</div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Based on your call patterns, enabling <span className="text-foreground font-medium">after-hours voicemail</span> could capture{" "}
              <span className="text-success font-medium">~42 additional leads/month</span>. Agent Milo has a 94% first-call resolution rate — consider expanding his responsibilities.
            </p>
          </div>
          <Button variant="outline" size="sm" className="shrink-0 border-primary/30 text-primary hover:bg-primary/10">
            Apply
          </Button>
        </div>
      </Card>
    </div>
  );
}
