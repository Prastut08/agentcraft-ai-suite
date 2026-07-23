import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  FileText,
  Search,
  Upload,
  Plus,
  Database,
  Globe,
  File,
  FileSpreadsheet,
  CheckCircle2,
  Loader2,
  Trash2,
  RefreshCw,
  Filter,
  ArrowUpRight,
  HardDrive,
  Cpu,
  Clock,
  Sparkles,
} from "lucide-react";

export const Route = createFileRoute("/app/knowledge")({
  component: KB,
});

const docs = [
  {
    n: "Service_Menu_2026.pdf",
    type: "PDF",
    size: "428 KB",
    status: "Embedded",
    chunks: 124,
    updated: "2d ago",
    confidence: 98,
    icon: FileText,
    color: "bg-destructive/12 text-destructive",
  },
  {
    n: "FAQ_Master.docx",
    type: "DOCX",
    size: "112 KB",
    status: "Embedded",
    chunks: 62,
    updated: "3d ago",
    confidence: 96,
    icon: File,
    color: "bg-primary/12 text-primary",
  },
  {
    n: "Price_List.xlsx",
    type: "XLSX",
    size: "38 KB",
    status: "Processing",
    chunks: 0,
    updated: "Just now",
    confidence: 0,
    icon: FileSpreadsheet,
    color: "bg-success/12 text-success",
  },
  {
    n: "Company_Policies.pdf",
    type: "PDF",
    size: "1.2 MB",
    status: "Embedded",
    chunks: 284,
    updated: "1w ago",
    confidence: 99,
    icon: FileText,
    color: "bg-destructive/12 text-destructive",
  },
  {
    n: "brightdental.com",
    type: "URL",
    size: "48 pages",
    status: "Embedded",
    chunks: 512,
    updated: "4d ago",
    confidence: 97,
    icon: Globe,
    color: "bg-accent/12 text-accent",
  },
];

const statusCfg: Record<string, { label: string; badge: string; dot: string }> = {
  Embedded: {
    label: "Embedded",
    badge: "bg-success/12 text-success border-success/20",
    dot: "bg-success",
  },
  Processing: {
    label: "Processing",
    badge: "bg-warning/12 text-warning border-warning/20",
    dot: "bg-warning",
  },
  Error: {
    label: "Error",
    badge: "bg-destructive/12 text-destructive border-destructive/20",
    dot: "bg-destructive",
  },
};

function KB() {
  const [dragging, setDragging] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = docs.filter((d) => d.n.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ─── Header ─── */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            5 sources · 982 chunks · 2.1 MB embedded across all agents
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-border/60">
            <Plus className="mr-2 h-3.5 w-3.5" />
            Add Q&A
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground font-medium shadow-md">
            <Upload className="mr-2 h-3.5 w-3.5" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* ─── Health Stats ─── */}
      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Sources", value: "5", icon: Database, color: "primary" },
          { label: "Embedding Health", value: "100%", icon: CheckCircle2, color: "success" },
          { label: "Total Chunks", value: "982", icon: Cpu, color: "accent" },
          { label: "Last Re-trained", value: "2h ago", icon: Clock, color: "muted" },
        ].map((s) => (
          <Card key={s.label} className="glass p-5">
            <div className="flex items-center gap-2">
              <div
                className={`grid h-8 w-8 place-items-center rounded-lg ${
                  s.color === "primary"
                    ? "bg-primary/12 text-primary"
                    : s.color === "success"
                      ? "bg-success/12 text-success"
                      : s.color === "accent"
                        ? "bg-accent/12 text-accent"
                        : "bg-muted/50 text-muted-foreground"
                }`}
              >
                <s.icon className="h-4 w-4" />
              </div>
              <span className="text-xs text-muted-foreground">{s.label}</span>
            </div>
            <div
              className={`mt-3 text-2xl font-bold tracking-tight ${s.color === "success" ? "text-success" : ""}`}
            >
              {s.value}
            </div>
          </Card>
        ))}
      </div>

      {/* ─── Upload Zone ─── */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
        }}
        className={`relative overflow-hidden rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-200 ${
          dragging
            ? "border-primary/70 bg-primary/8 scale-[1.01]"
            : "border-border/50 hover:border-primary/40 hover:bg-primary/4"
        }`}
      >
        <div className="absolute inset-0 dot-pattern opacity-40" />
        <div className="relative flex flex-col items-center">
          <div className="mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-primary/12 text-primary">
            <Upload className="h-7 w-7" />
          </div>
          <h3 className="text-base font-semibold">
            {dragging ? "Drop to upload" : "Drag & drop files here"}
          </h3>
          <p className="mt-1.5 text-sm text-muted-foreground">
            PDF, DOCX, TXT, CSV, XLSX, PNG · up to 50 MB per file
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Button variant="outline" size="sm" className="border-border/60">
              Browse Files
            </Button>
            <Button variant="outline" size="sm" className="border-border/60">
              <Globe className="mr-2 h-3.5 w-3.5" />
              Import URL
            </Button>
            <Button variant="outline" size="sm" className="border-border/60">
              <Plus className="mr-2 h-3.5 w-3.5" />
              Paste Text
            </Button>
          </div>
        </div>
      </div>

      {/* ─── Document List ─── */}
      <Card className="glass overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center gap-3 border-b border-border/50 p-4">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search documents…"
              className="h-9 border-border/50 bg-surface/60 pl-9 text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Button variant="outline" size="sm" className="border-border/60 ml-auto">
            <Filter className="mr-2 h-3.5 w-3.5" />
            Filter
          </Button>
          <Button variant="outline" size="sm" className="border-border/60">
            <RefreshCw className="mr-2 h-3.5 w-3.5" />
            Re-train Agents
          </Button>
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center gap-4 border-b border-border/30 bg-muted/10 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span className="w-10">Type</span>
          <span>Document</span>
          <span className="w-24 text-center">Chunks</span>
          <span className="w-20 text-center">Confidence</span>
          <span className="w-24 text-center">Status</span>
          <span className="w-16 text-center">Actions</span>
        </div>

        {/* Rows */}
        <div className="divide-y divide-border/30">
          {filtered.map((d) => {
            const sc = statusCfg[d.status];
            return (
              <div
                key={d.n}
                className="group grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center gap-4 px-5 py-4 transition hover:bg-muted/20"
              >
                {/* File icon */}
                <div className={`grid h-10 w-10 place-items-center rounded-xl ${d.color}`}>
                  <d.icon className="h-5 w-5" />
                </div>

                {/* File info */}
                <div className="min-w-0">
                  <div className="truncate font-medium">{d.n}</div>
                  <div className="mt-0.5 flex items-center gap-2 text-xs text-muted-foreground">
                    <span className="rounded bg-muted/50 px-1.5 py-0.5 font-mono text-[10px]">
                      {d.type}
                    </span>
                    <span>{d.size}</span>
                    <span>·</span>
                    <span>Updated {d.updated}</span>
                  </div>
                </div>

                {/* Chunks */}
                <div className="w-24 text-center">
                  <span className="text-sm font-semibold">{d.chunks || "—"}</span>
                  {d.chunks > 0 && <div className="text-[10px] text-muted-foreground">chunks</div>}
                </div>

                {/* Confidence */}
                <div className="w-20">
                  {d.confidence > 0 ? (
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-sm font-bold text-success">{d.confidence}%</span>
                      <div className="h-1 w-full overflow-hidden rounded-full bg-muted/50">
                        <div
                          className="h-full rounded-full bg-success"
                          style={{ width: `${d.confidence}%` }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1 text-xs text-muted-foreground">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span>…</span>
                    </div>
                  )}
                </div>

                {/* Status badge */}
                <div className="flex w-24 justify-center">
                  <Badge
                    className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${sc.badge}`}
                  >
                    <span
                      className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${sc.dot} ${d.status === "Processing" ? "animate-pulse" : ""}`}
                    />
                    {sc.label}
                  </Badge>
                </div>

                {/* Actions */}
                <div className="flex w-16 justify-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-muted-foreground hover:text-foreground"
                  >
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      {/* ─── AI Suggestions ─── */}
      <Card className="relative overflow-hidden border border-border bg-surface p-5">
        <div className="flex items-start gap-4">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/20 text-primary">
            <Sparkles className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-sm font-semibold">Knowledge Gaps Detected</div>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Callers asked about "payment plans" 34 times — no answer found in your knowledge base.
              Consider uploading a financing FAQ or enabling a Stripe integration.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            className="shrink-0 border-primary/30 text-primary hover:bg-primary/10"
          >
            Add FAQ
          </Button>
        </div>
      </Card>
    </div>
  );
}
