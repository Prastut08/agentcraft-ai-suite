import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Play,
  Download,
  Search,
  Filter,
  Clock,
  Bot,
  PhoneIncoming,
  Copy,
  Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/app/conversations")({
  component: Conversations,
});

function ScoreRing({ score }: { score: number }) {
  const radius = 16;
  const stroke = 2.5;
  const normalizedRadius = radius - stroke;
  const circumference = normalizedRadius * 2 * Math.PI;
  const percent = score > 10 ? score : score * 10;
  const strokeDashoffset = circumference - (percent / 100) * circumference;

  const color =
    percent >= 80
      ? "stroke-success text-success"
      : percent >= 50
        ? "stroke-warning text-warning"
        : "stroke-destructive text-destructive";

  return (
    <svg height={radius * 2} width={radius * 2} className="-rotate-90">
      <circle
        stroke="hsl(var(--border))"
        fill="transparent"
        strokeWidth={stroke}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        className="opacity-20"
      />
      <circle
        stroke="currentColor"
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={circumference + " " + circumference}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
        className={`${color} transition-all duration-300`}
      />
    </svg>
  );
}

interface Message {
  s: string;
  t: string;
}

interface Conversation {
  name: string;
  time: string;
  agent: string;
  outcome: string;
  dur: string;
  score?: number;
}

function Conversations() {
  const convos: Conversation[] = [];
  const [selected, setSelected] = useState<number | null>(null);
  const active = selected !== null ? convos[selected] : null;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* ─── Header ─── */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Conversations</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            Full transcripts, sentiment analysis, and call outcomes.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-border/60">
            <Filter className="mr-2 h-3.5 w-3.5" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="border-border/60">
            <Download className="mr-2 h-3.5 w-3.5" />
            Export CSV
          </Button>
        </div>
      </div>

      <div className="grid gap-5 lg:grid-cols-[340px_1fr]">
        {/* ─── Conversation List ─── */}
        <Card className="glass overflow-hidden">
          {/* Search bar */}
          <div className="border-b border-border/50 p-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search calls…"
                className="h-8 border-border/50 bg-surface/60 pl-9 text-xs"
              />
            </div>
          </div>

          {/* List items */}
          <div className="divide-y divide-border/30 overflow-y-auto max-h-[600px]">
            {convos.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <PhoneIncoming className="mb-3 h-10 w-10 text-muted-foreground/40" />
                <p className="text-sm font-medium text-muted-foreground">
                  No conversations yet
                </p>
                <p className="mt-1 text-xs text-muted-foreground/70">
                  Incoming calls will appear here automatically.
                </p>
              </div>
            ) : (
              convos.map((c, i) => (
                <button
                  key={i}
                  onClick={() => setSelected(i)}
                  className={`flex w-full items-center gap-3 p-3.5 text-left transition hover:bg-muted/30 ${
                    i === selected
                      ? "bg-primary/8 border-l-2 border-l-primary"
                      : "border-l-2 border-l-transparent"
                  }`}
                >
                  <div className="relative">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarFallback className="bg-surface-2 text-xs font-medium">
                        {c.name.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="truncate text-sm font-semibold">
                        {c.name}
                      </span>
                      <span className="shrink-0 text-[10px] text-muted-foreground">
                        {c.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Bot className="h-3 w-3" />
                      <span>{c.agent}</span>
                      <span>·</span>
                      <span>{c.outcome}</span>
                      <span>·</span>
                      <Clock className="h-3 w-3" />
                      <span>{c.dur}</span>
                    </div>
                  </div>
                  <div className="relative shrink-0">
                    {c.score !== undefined && (
                      <>
                        <ScoreRing score={c.score} />
                        <span className="absolute inset-0 flex items-center justify-center text-[8px] font-bold">
                          {c.score}
                        </span>
                      </>
                    )}
                  </div>
                </button>
              ))
            )}
          </div>
        </Card>

        {/* ─── Conversation Detail ─── */}
        <Card className="glass flex flex-col overflow-hidden">
          {!active ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <PhoneIncoming className="mb-3 h-12 w-12 text-muted-foreground/40" />
              <p className="text-sm font-medium text-muted-foreground">
                Select a conversation to view transcript
              </p>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Choose a call from the list to see details.
              </p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="border-b border-border/50 p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-surface-2 border border-border text-sm font-semibold text-foreground">
                          {active.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-bold">{active.name}</div>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <PhoneIncoming className="h-3 w-3" />
                          <span>via {active.agent}</span>
                          <span>·</span>
                          <span>Today {active.time}</span>
                          <span>·</span>
                          <span>{active.dur}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Badge
                        className={`rounded-full border px-2.5 text-[10px] font-semibold ${active.outcomeBadge || "bg-muted/50 text-muted-foreground border-border"}`}
                      >
                        {active.outcome}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        Lead score {active.score}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">
                        {active.sentiment === "pos"
                          ? "Positive"
                          : active.sentiment === "neu"
                            ? "Neutral"
                            : "Negative"}{" "}
                        sentiment
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border/60"
                    >
                      <Play className="mr-1.5 h-3.5 w-3.5" />
                      Play Audio
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border/60"
                    >
                      <Download className="mr-1.5 h-3.5 w-3.5" />
                      Transcript
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-border/60"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>

                {/* Audio waveform placeholder */}
                <div className="mt-4 flex h-10 items-center gap-1 overflow-hidden rounded-xl bg-muted/30 px-4">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 shrink-0 text-primary"
                  >
                    <Play className="h-4 w-4" />
                  </Button>
                  <div className="flex flex-1 items-end gap-0.5 px-2">
                    {Array.from({ length: 60 }, (_, i) => (
                      <div
                        key={i}
                        className="w-px rounded-full bg-primary/40 transition-all"
                        style={{
                          height: `${8 + Math.sin(i * 0.4) * 6 + Math.random() * 10}px`,
                        }}
                      />
                    ))}
                  </div>
                  <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                    3:42
                  </span>
                </div>
              </div>

              {/* Transcript */}
              <div className="flex-1 overflow-y-auto p-5">
                <div className="space-y-4">
                  {active.transcript?.map((m: Message, i: number) => {
                    const isAgent = m.s === active.agent;
                    return (
                      <div
                        key={i}
                        className={`flex gap-3 ${isAgent ? "" : "flex-row-reverse"}`}
                      >
                        <Avatar className="h-8 w-8 shrink-0">
                          <AvatarFallback
                            className={`text-xs font-semibold ${isAgent ? "bg-primary/20 text-primary" : "bg-surface-2"}`}
                          >
                            {m.s[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`max-w-[72%] space-y-1`}>
                          <div
                            className={`text-[10px] font-medium ${isAgent ? "text-primary" : "text-muted-foreground"} ${isAgent ? "" : "text-right"}`}
                          >
                            {m.s}
                          </div>
                          <div
                            className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                              isAgent
                                ? "rounded-tl-sm bg-primary/10 text-foreground"
                                : "rounded-tr-sm bg-surface-2 text-foreground"
                            }`}
                          >
                            {m.t}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI Summary */}
              <div className="border-t border-border/50 p-5">
                <div className="grid gap-3 md:grid-cols-3">
                  <div className="rounded-xl border border-border/50 bg-muted/10 p-3">
                    <div className="mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      <Sparkles className="h-3 w-3 text-primary" />
                      AI Summary
                    </div>
                    <p className="text-xs leading-relaxed">
                      {active.summary || "No summary available."}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-muted/10 p-3">
                    <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      Action Items
                    </div>
                    <ul className="space-y-1 text-xs">
                      <li className="flex items-center gap-1.5">
                        <span className="h-1.5 w-1.5 rounded-full bg-success" />
                        {active.actionItems?.length
                          ? active.actionItems.join(", ")
                          : "No action items recorded."}
                      </li>
                    </ul>
                  </div>
                  <div className="rounded-xl border border-border/50 bg-muted/10 p-3">
                    <div className="mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                      CRM Sync
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">Contact</span>
                        <Badge className="bg-muted/50 text-muted-foreground text-[9px]">
                          Pending
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">
                          Appointment
                        </span>
                        <Badge className="bg-muted/50 text-muted-foreground text-[9px]">
                          Pending
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  );
}
