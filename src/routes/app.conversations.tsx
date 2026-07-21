import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Play, Download, Smile, Meh, Frown } from "lucide-react";

export const Route = createFileRoute("/app/conversations")({
  component: Conversations,
});

const convos = [
  { name: "Sarah Kim", agent: "Aria", time: "2m ago", outcome: "Booked", sentiment: "pos", dur: "3:42" },
  { name: "+1 (415) 555 0132", agent: "Milo", time: "8m ago", outcome: "Qualified", sentiment: "pos", dur: "5:18" },
  { name: "Rajiv Menon", agent: "Nova", time: "22m ago", outcome: "Escalated", sentiment: "neu", dur: "6:04" },
  { name: "+44 20 7946 0958", agent: "Aria", time: "41m ago", outcome: "Resolved", sentiment: "pos", dur: "2:11" },
  { name: "Anonymous", agent: "Aria", time: "1h ago", outcome: "Voicemail", sentiment: "neu", dur: "0:38" },
  { name: "Diego Vega", agent: "Milo", time: "2h ago", outcome: "Not interested", sentiment: "neg", dur: "1:22" },
];

const transcript = [
  { s: "Aria", t: "Thanks for calling Bright Dental, this is Aria — how can I help?" },
  { s: "Sarah", t: "Hi, I'd like to book a cleaning for next week." },
  { s: "Aria", t: "Absolutely. Do you have a preferred day or time?" },
  { s: "Sarah", t: "Thursday afternoon if possible." },
  { s: "Aria", t: "I have 2:30 pm or 4:00 pm on Thursday — which works?" },
  { s: "Sarah", t: "2:30 is perfect." },
  { s: "Aria", t: "You're booked. I'll text a confirmation to this number. Anything else?" },
];

function Conversations() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Conversations</h1>
        <p className="mt-1 text-sm text-muted-foreground">Full transcripts, sentiment, and outcomes.</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
        <Card className="glass p-2">
          <div className="divide-y divide-border/40">
            {convos.map((c, i) => (
              <button key={c.name + i} className={`flex w-full items-center gap-3 rounded-lg p-3 text-left hover:bg-muted/40 ${i === 0 ? "bg-primary/10" : ""}`}>
                <Avatar className="h-9 w-9"><AvatarFallback className="bg-surface-2 text-xs">{c.name.slice(0, 2)}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="truncate text-sm font-medium">{c.name}</span>
                    <span className="text-[10px] text-muted-foreground">{c.time}</span>
                  </div>
                  <div className="truncate text-xs text-muted-foreground">{c.agent} · {c.outcome} · {c.dur}</div>
                </div>
                {c.sentiment === "pos" && <Smile className="h-4 w-4 text-success" />}
                {c.sentiment === "neu" && <Meh className="h-4 w-4 text-muted-foreground" />}
                {c.sentiment === "neg" && <Frown className="h-4 w-4 text-destructive" />}
              </button>
            ))}
          </div>
        </Card>

        <Card className="glass p-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <div className="text-lg font-semibold">Sarah Kim</div>
              <div className="text-sm text-muted-foreground">Aria · today 2:14pm · 3m 42s</div>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge className="bg-success/20 text-success">Appointment booked</Badge>
                <Badge variant="outline">Lead score 92</Badge>
                <Badge variant="outline">Positive sentiment</Badge>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm"><Play className="mr-1 h-3 w-3" /> Play audio</Button>
              <Button variant="outline" size="sm"><Download className="mr-1 h-3 w-3" /> Transcript</Button>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            {transcript.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.s === "Aria" ? "" : "flex-row-reverse"}`}>
                <Avatar className="h-8 w-8 shrink-0"><AvatarFallback className={m.s === "Aria" ? "bg-primary/20 text-primary text-xs" : "bg-surface-2 text-xs"}>{m.s[0]}</AvatarFallback></Avatar>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-sm ${m.s === "Aria" ? "bg-primary/10" : "bg-surface-2"}`}>{m.t}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 grid gap-3 border-t border-border/60 pt-4 md:grid-cols-2">
            <div className="rounded-xl border border-border/60 p-4">
              <div className="text-xs uppercase text-muted-foreground">Summary</div>
              <p className="mt-1 text-sm">Sarah booked a cleaning for Thursday 2:30pm. Confirmation SMS sent.</p>
            </div>
            <div className="rounded-xl border border-border/60 p-4">
              <div className="text-xs uppercase text-muted-foreground">Action items</div>
              <ul className="mt-1 space-y-1 text-sm">
                <li>· Calendar event created</li>
                <li>· Reminder SMS scheduled 24h prior</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
