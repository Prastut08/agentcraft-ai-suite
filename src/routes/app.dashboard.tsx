import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Phone, PhoneIncoming, PhoneMissed, Clock, CalendarCheck, DollarSign,
  TrendingUp, Users, Database, Activity, ArrowUpRight, Plus, Bot,
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
  { label: "Total Calls", value: "2,847", delta: "+12.4%", icon: Phone },
  { label: "Active Agents", value: "6", delta: "+2 this week", icon: Bot },
  { label: "Missed Calls", value: "18", delta: "-38%", icon: PhoneMissed, good: true },
  { label: "Avg Duration", value: "3m 42s", delta: "+8s", icon: Clock },
  { label: "Appointments", value: "412", delta: "+22%", icon: CalendarCheck },
  { label: "Revenue Generated", value: "$48.2k", delta: "+31%", icon: DollarSign },
  { label: "Lead Conversion", value: "34.7%", delta: "+4.1pts", icon: TrendingUp },
  { label: "CSAT", value: "4.8 / 5", delta: "+0.2", icon: Users },
];

const recent = [
  { name: "Sarah Kim", agent: "Reception · Aria", outcome: "Appointment booked", time: "2m ago", status: "success" },
  { name: "+1 (415) 555 0132", agent: "Sales · Milo", outcome: "Qualified lead — hot", time: "8m ago", status: "success" },
  { name: "Rajiv Menon", agent: "Support · Nova", outcome: "Escalated to human", time: "22m ago", status: "warn" },
  { name: "+44 20 7946 0958", agent: "FAQ · Aria", outcome: "Resolved", time: "41m ago", status: "success" },
  { name: "Anonymous", agent: "Reception · Aria", outcome: "Voicemail left", time: "1h ago", status: "muted" },
];

function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Welcome back, Jamie</h1>
          <p className="mt-1 text-sm text-muted-foreground">Your voice workforce handled 128 calls today — 94% resolved without human takeover.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Activity className="mr-2 h-4 w-4" /> Live monitor</Button>
          <Link to="/app/create"><Button><Plus className="mr-2 h-4 w-4" /> New agent</Button></Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.label} className="glass p-5">
            <div className="flex items-center justify-between text-muted-foreground">
              <span className="text-xs uppercase tracking-wider">{s.label}</span>
              <s.icon className="h-4 w-4" />
            </div>
            <div className="mt-3 text-2xl font-bold">{s.value}</div>
            <div className={`mt-1 text-xs ${s.good ? "text-success" : "text-primary"}`}>{s.delta}</div>
          </Card>
        ))}
      </div>

      {/* Chart + recent */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Call volume</h3>
              <p className="text-xs text-muted-foreground">Last 14 days</p>
            </div>
            <Badge variant="outline"><PhoneIncoming className="mr-1 h-3 w-3 text-primary" /> inbound + booked</Badge>
          </div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={callsData}>
                <defs>
                  <linearGradient id="c1" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="c2" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Area type="monotone" dataKey="calls" stroke="var(--color-primary)" fill="url(#c1)" strokeWidth={2} />
                <Area type="monotone" dataKey="booked" stroke="var(--color-accent)" fill="url(#c2)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass p-6">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">Recent conversations</h3>
            <Link to="/app/conversations" className="text-xs text-primary hover:underline">View all <ArrowUpRight className="ml-0.5 inline h-3 w-3" /></Link>
          </div>
          <div className="space-y-3">
            {recent.map((r) => (
              <div key={r.time} className="flex items-start gap-3 rounded-lg p-2 hover:bg-muted/40">
                <Avatar className="h-9 w-9"><AvatarFallback className="bg-surface-2 text-xs">{r.name.slice(0, 2)}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{r.name}</div>
                  <div className="truncate text-xs text-muted-foreground">{r.agent} · {r.outcome}</div>
                </div>
                <div className="text-xs text-muted-foreground">{r.time}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Health cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary"><Database className="h-5 w-5" /></div>
            <div>
              <div className="text-sm text-muted-foreground">Knowledge base</div>
              <div className="text-lg font-semibold">248 documents · healthy</div>
            </div>
          </div>
        </Card>
        <Card className="glass p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-success/15 text-success"><Phone className="h-5 w-5" /></div>
            <div>
              <div className="text-sm text-muted-foreground">Phone numbers</div>
              <div className="text-lg font-semibold">4 active · all healthy</div>
            </div>
          </div>
        </Card>
        <Card className="glass p-5">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-accent/20 text-accent"><Activity className="h-5 w-5" /></div>
            <div>
              <div className="text-sm text-muted-foreground">API usage</div>
              <div className="text-lg font-semibold">61% of monthly quota</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
