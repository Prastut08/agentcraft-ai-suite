import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bar, BarChart, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell,
} from "recharts";

export const Route = createFileRoute("/app/analytics")({
  component: Analytics,
});

const weekly = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map((d, i) => ({
  day: d, calls: 120 + Math.round(Math.sin(i) * 30 + Math.random() * 40), booked: 30 + Math.round(Math.random() * 25),
}));
const sentiment = [
  { name: "Positive", v: 68 },{ name: "Neutral", v: 24 },{ name: "Negative", v: 8 },
];
const colors = ["var(--color-primary)","var(--color-accent)","var(--color-destructive)"];

function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="mt-1 text-sm text-muted-foreground">Deep insight into how your voice workforce performs.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { l: "Success rate", v: "92.4%", d: "+3.1%" },
          { l: "Avg response", v: "1.2s", d: "-0.2s" },
          { l: "Avg call length", v: "3m 42s", d: "+8s" },
          { l: "Lead conversion", v: "34.7%", d: "+4.1pts" },
        ].map(s => (
          <Card key={s.l} className="glass p-5">
            <div className="text-xs uppercase text-muted-foreground">{s.l}</div>
            <div className="mt-2 text-2xl font-bold">{s.v}</div>
            <div className="mt-1 text-xs text-primary">{s.d}</div>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass p-6 lg:col-span-2">
          <div className="mb-4 flex items-center justify-between"><h3 className="font-semibold">Weekly calls</h3><Badge variant="outline">This week</Badge></div>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weekly}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis dataKey="day" stroke="var(--color-muted-foreground)" fontSize={11} />
                <YAxis stroke="var(--color-muted-foreground)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--color-popover)", border: "1px solid var(--color-border)", borderRadius: 12 }} />
                <Bar dataKey="calls" fill="var(--color-primary)" radius={[6,6,0,0]} />
                <Bar dataKey="booked" fill="var(--color-accent)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="glass p-6">
          <h3 className="mb-4 font-semibold">Customer sentiment</h3>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sentiment} dataKey="v" innerRadius={50} outerRadius={80} paddingAngle={4}>
                  {sentiment.map((_, i) => <Cell key={i} fill={colors[i]} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2 text-sm">
            {sentiment.map((s, i) => (
              <div key={s.name} className="flex items-center justify-between">
                <span className="flex items-center gap-2"><span className="h-2 w-2 rounded-full" style={{ background: colors[i] }} /> {s.name}</span>
                <span className="text-muted-foreground">{s.v}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="glass p-6">
        <h3 className="mb-4 font-semibold">Top questions asked</h3>
        <div className="space-y-3">
          {[
            ["What are your hours?", 412],
            ["Do you accept insurance?", 288],
            ["How much is a cleaning?", 241],
            ["Can I book for tomorrow?", 187],
            ["Where are you located?", 154],
          ].map(([q, n]) => (
            <div key={q as string} className="flex items-center justify-between">
              <div className="min-w-0 truncate text-sm">{q}</div>
              <div className="flex items-center gap-3">
                <div className="h-1.5 w-40 overflow-hidden rounded-full bg-muted"><div className="h-full bg-primary" style={{ width: `${(n as number) / 4.2}%` }} /></div>
                <span className="w-10 text-right text-xs text-muted-foreground">{n as number}</span>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
