import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis,
  YAxis, CartesianGrid, PieChart, Pie, Cell, AreaChart, Area,
} from "recharts";
import {
  TrendingUp, TrendingDown, Calendar, Download, Filter,
  Phone, Clock, CheckCircle, Zap,
} from "lucide-react";

export const Route = createFileRoute("/app/analytics")({
  component: Analytics,
});

const weekly = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => ({
  day: d,
  calls: 120 + Math.round(Math.sin(i) * 30 + Math.random() * 40),
  booked: 30 + Math.round(Math.random() * 25),
  resolved: 85 + Math.round(Math.random() * 20),
}));

const trend = Array.from({ length: 30 }, (_, i) => ({
  date: `Jun ${i + 1}`,
  success: 85 + Math.round(Math.sin(i / 3) * 5 + Math.random() * 8),
}));

const sentiment = [
  { name: "Positive", v: 68, color: "var(--color-success)" },
  { name: "Neutral",  v: 24, color: "var(--color-accent)" },
  { name: "Negative", v:  8, color: "var(--color-destructive)" },
];

const agentPerf = [
  { name: "Aria",  calls: 842, csat: 4.8, resolution: 94 },
  { name: "Milo",  calls: 421, csat: 4.6, resolution: 88 },
  { name: "Nova",  calls: 618, csat: 4.9, resolution: 97 },
  { name: "Kai",   calls: 210, csat: 4.5, resolution: 82 },
];

const topQuestions = [
  ["What are your hours?", 412],
  ["Do you accept insurance?", 288],
  ["How much is a cleaning?", 241],
  ["Can I book for tomorrow?", 187],
  ["Where are you located?", 154],
  ["Do you offer emergency slots?", 121],
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="rounded-xl border border-border/60 bg-popover p-3 shadow-xl">
        <p className="mb-2 text-xs font-medium text-muted-foreground">{label}</p>
        {payload.map((p: any) => (
          <div key={p.name} className="flex items-center gap-2 text-sm">
            <span className="h-2 w-2 rounded-full" style={{ background: p.color || p.fill }} />
            <span className="capitalize text-muted-foreground">{p.name}:</span>
            <span className="font-semibold">{p.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

function Analytics() {
  return (
    <div className="space-y-8 animate-fade-in">
      {/* ─── Header ─── */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Deep insights into how your voice workforce performs.
          </p>
        </div>
        <div className="flex gap-2">
          <Select defaultValue="7d">
            <SelectTrigger className="h-9 w-[130px] border-border/60 bg-surface/60 text-sm">
              <Calendar className="mr-2 h-3.5 w-3.5" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1d">Today</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last quarter</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm" className="h-9 border-border/60">
            <Download className="mr-2 h-3.5 w-3.5" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="h-9 border-border/60">
            <Filter className="mr-2 h-3.5 w-3.5" />
            Filter
          </Button>
        </div>
      </div>

      {/* ─── KPI Row ─── */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { l: "Success Rate",     v: "92.4%",  d: "+3.1%",  t: "up",   icon: CheckCircle, color: "success" },
          { l: "Avg Response",     v: "1.2s",   d: "−0.2s",  t: "down", icon: Zap,         color: "primary" },
          { l: "Avg Call Length",  v: "3m 42s", d: "+8s",    t: "up",   icon: Clock,       color: "accent" },
          { l: "Lead Conversion",  v: "34.7%",  d: "+4.1pts",t: "up",   icon: TrendingUp,  color: "primary" },
        ].map((s) => (
          <Card key={s.l} className="glass p-5">
            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium uppercase tracking-wider text-muted-foreground`}>{s.l}</span>
              <div className={`grid h-8 w-8 place-items-center rounded-lg ${
                s.color === "primary" ? "bg-primary/12 text-primary"
                : s.color === "success" ? "bg-success/12 text-success"
                : "bg-accent/12 text-accent"
              }`}>
                <s.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold tracking-tight">{s.v}</div>
            <div className={`mt-1 flex items-center gap-1 text-xs font-medium ${
              s.d.startsWith("−") ? "text-success" : "text-success"
            }`}>
              {s.t === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {s.d} vs last period
            </div>
          </Card>
        ))}
      </div>

      {/* ─── Charts Row 1 ─── */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Weekly Calls Bar Chart */}
        <Card className="glass p-6 lg:col-span-3">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Weekly Call Volume</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">Calls received, booked, and resolved</p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-primary" />Calls</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-accent" />Booked</span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekly} barGap={4} margin={{ top: 4, right: 0, bottom: 0, left: -16 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 5%)" vertical={false} />
                <XAxis dataKey="day" stroke="oklch(1 0 0 / 30%)" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="oklch(1 0 0 / 30%)" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "oklch(1 0 0 / 4%)" }} />
                <Bar dataKey="calls"  fill="var(--color-primary)" radius={[6, 6, 0, 0]} maxBarSize={32} />
                <Bar dataKey="booked" fill="var(--color-accent)"  radius={[6, 6, 0, 0]} maxBarSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Sentiment Donut */}
        <Card className="glass p-6 lg:col-span-2">
          <h3 className="mb-4 font-semibold">Caller Sentiment</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentiment}
                  dataKey="v"
                  innerRadius={52}
                  outerRadius={80}
                  paddingAngle={3}
                  strokeWidth={0}
                >
                  {sentiment.map((s, i) => <Cell key={i} fill={s.color} />)}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {sentiment.map((s) => (
              <div key={s.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  {s.name}
                </span>
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-20 overflow-hidden rounded-full bg-muted/50">
                    <div className="h-full rounded-full" style={{ width: `${s.v}%`, background: s.color }} />
                  </div>
                  <span className="w-8 text-right text-sm font-semibold">{s.v}%</span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ─── Charts Row 2 ─── */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Success Rate Trend */}
        <Card className="glass p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Success Rate Trend</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">30-day rolling average</p>
            </div>
            <Badge className="bg-success/12 text-success border-success/20">↑ 3.1%</Badge>
          </div>
          <div className="h-52">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trend} margin={{ top: 4, right: 4, bottom: 0, left: -16 }}>
                <defs>
                  <linearGradient id="successGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--color-success)" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="var(--color-success)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 5%)" vertical={false} />
                <XAxis dataKey="date" stroke="oklch(1 0 0 / 30%)" fontSize={10} tickLine={false} axisLine={false} interval={4} />
                <YAxis stroke="oklch(1 0 0 / 30%)" fontSize={10} tickLine={false} axisLine={false} domain={[75, 100]} />
                <Tooltip content={<CustomTooltip />} cursor={{ stroke: "oklch(1 0 0 / 8%)" }} />
                <Area type="monotone" dataKey="success" stroke="var(--color-success)" fill="url(#successGrad)" strokeWidth={2} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top Questions */}
        <Card className="glass p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Top Questions Asked</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">Most frequent caller inquiries</p>
            </div>
            <Badge variant="outline" className="text-xs">This week</Badge>
          </div>
          <div className="space-y-3.5">
            {topQuestions.map(([q, n], i) => (
              <div key={q as string} className="group flex items-center gap-3">
                <span className="w-4 shrink-0 text-center text-[10px] font-bold text-muted-foreground/50">
                  {(i + 1).toString().padStart(2, "0")}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{q}</div>
                  <div className="mt-1 h-1.5 overflow-hidden rounded-full bg-muted/50">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${((n as number) / 412) * 100}%`,
                        background: `oklch(0.68 0.22 ${268 - i * 8})`
                      }}
                    />
                  </div>
                </div>
                <span className="w-10 shrink-0 text-right text-sm font-semibold text-muted-foreground">{n as number}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* ─── Agent Performance Table ─── */}
      <Card className="glass p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Agent Performance Breakdown</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">Individual agent metrics this period</p>
          </div>
          <Button variant="outline" size="sm" className="border-border/60 text-xs">
            View detailed report
          </Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border/50">
                {["Agent", "Role", "Calls", "CSAT", "Resolution Rate", "Performance"].map((h) => (
                  <th key={h} className="pb-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground first:pl-0">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {agentPerf.map((a) => (
                <tr key={a.name} className="group transition hover:bg-muted/20">
                  <td className="py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-8 w-8 place-items-center rounded-xl bg-surface-2 border border-border text-sm font-bold text-foreground">
                        {a.name[0]}
                      </div>
                      <span className="font-semibold">{a.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-sm text-muted-foreground">AI Agent</td>
                  <td className="py-3 text-sm font-semibold">{a.calls.toLocaleString()}</td>
                  <td className="py-3">
                    <span className="flex items-center gap-1 text-sm font-semibold text-warning">
                      ★ {a.csat}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted/50">
                        <div
                          className={`h-full rounded-full ${a.resolution >= 90 ? "bg-success" : "bg-warning"}`}
                          style={{ width: `${a.resolution}%` }}
                        />
                      </div>
                      <span className="text-xs font-medium">{a.resolution}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <Badge className={`text-[10px] ${a.resolution >= 90 ? "bg-success/12 text-success border-success/20" : "bg-warning/12 text-warning border-warning/20"}`}>
                      {a.resolution >= 95 ? "Excellent" : a.resolution >= 90 ? "Strong" : "Good"}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
