import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  Filter,
  Clock,
  CheckCircle,
  Zap,
} from "lucide-react";

export const Route = createFileRoute("/app/analytics")({
  component: Analytics,
});

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
          {
            l: "Success Rate",
            v: "—",
            d: "No data",
            t: "up",
            icon: CheckCircle,
            color: "muted",
          },
          {
            l: "Avg Response",
            v: "—",
            d: "No data",
            t: "up",
            icon: Zap,
            color: "muted",
          },
          {
            l: "Avg Call Length",
            v: "—",
            d: "No data",
            t: "up",
            icon: Clock,
            color: "muted",
          },
          {
            l: "Lead Conversion",
            v: "—",
            d: "No data",
            t: "up",
            icon: TrendingUp,
            color: "muted",
          },
        ].map((s) => (
          <Card key={s.l} className="glass p-5">
            <div className="flex items-center justify-between">
              <span
                className={`text-xs font-medium uppercase tracking-wider text-muted-foreground`}
              >
                {s.l}
              </span>
              <div
                className={`grid h-8 w-8 place-items-center rounded-lg ${
                  s.color === "muted"
                    ? "bg-muted/50 text-muted-foreground"
                    : s.color === "primary"
                      ? "bg-primary/12 text-primary"
                      : s.color === "success"
                        ? "bg-success/12 text-success"
                        : "bg-accent/12 text-accent"
                }`}
              >
                <s.icon className="h-4 w-4" />
              </div>
            </div>
            <div className="mt-3 text-2xl font-bold tracking-tight">{s.v}</div>
            <div className="mt-1 flex items-center gap-1 text-xs font-medium text-muted-foreground">
              {s.t === "up" ? (
                <TrendingUp className="h-3 w-3" />
              ) : (
                <TrendingDown className="h-3 w-3" />
              )}
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
              <p className="mt-0.5 text-xs text-muted-foreground">
                Calls received, booked, and resolved
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-primary" />
                Calls
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-sm bg-accent" />
                Booked
              </span>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">
                No analytics data yet
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Call data will appear here once available.
              </p>
            </div>
          </div>
        </Card>

        {/* Sentiment Donut */}
        <Card className="glass p-6 lg:col-span-2">
          <h3 className="mb-4 font-semibold">Caller Sentiment</h3>
          <div className="h-48 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">
                No sentiment data yet
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Sentiment breakdown will appear here.
              </p>
            </div>
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
              <p className="mt-0.5 text-xs text-muted-foreground">
                30-day rolling average
              </p>
            </div>
            <Badge className="bg-muted/50 text-muted-foreground border-border">
              —
            </Badge>
          </div>
          <div className="h-52 flex items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium text-muted-foreground">
                No trend data yet
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Trend data will appear once available.
              </p>
            </div>
          </div>
        </Card>

        {/* Top Questions */}
        <Card className="glass p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Top Questions Asked</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Most frequent caller inquiries
              </p>
            </div>
            <Badge variant="outline" className="text-xs">
              This week
            </Badge>
          </div>
          <div className="text-center py-8">
            <p className="text-sm font-medium text-muted-foreground">
              No questions data yet
            </p>
            <p className="mt-1 text-xs text-muted-foreground/70">
              Top questions will appear here once available.
            </p>
          </div>
        </Card>
      </div>

      {/* ─── Agent Performance Table ─── */}
      <Card className="glass p-6">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Agent Performance Breakdown</h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Individual agent metrics this period
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-border/60 text-xs"
          >
            View detailed report
          </Button>
        </div>
        <div className="text-center py-8">
          <p className="text-sm font-medium text-muted-foreground">
            No agent data yet
          </p>
          <p className="mt-1 text-xs text-muted-foreground/70">
            Agent performance metrics will appear here once available.
          </p>
        </div>
      </Card>
    </div>
  );
}
