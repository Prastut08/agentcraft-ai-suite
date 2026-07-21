import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Search, Upload, Plus, Database } from "lucide-react";

export const Route = createFileRoute("/app/knowledge")({
  component: KB,
});

const docs = [
  { n: "Service_Menu_2026.pdf", type: "PDF", size: "428 KB", status: "Embedded", chunks: 124 },
  { n: "FAQ_Master.docx", type: "DOCX", size: "112 KB", status: "Embedded", chunks: 62 },
  { n: "Price_List.xlsx", type: "XLSX", size: "38 KB", status: "Processing", chunks: 0 },
  { n: "Company_Policies.pdf", type: "PDF", size: "1.2 MB", status: "Embedded", chunks: 284 },
  { n: "brightdental.com", type: "URL", size: "48 pages", status: "Embedded", chunks: 512 },
];

function KB() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Knowledge Base</h1>
          <p className="mt-1 text-sm text-muted-foreground">5 sources · 982 chunks · 2.1 MB embedded</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Plus className="mr-2 h-4 w-4" /> Add Q&A</Button>
          <Button><Upload className="mr-2 h-4 w-4" /> Upload</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="glass p-5"><div className="text-xs text-muted-foreground">Total sources</div><div className="mt-1 text-2xl font-bold">5</div></Card>
        <Card className="glass p-5"><div className="text-xs text-muted-foreground">Embeddings health</div><div className="mt-1 text-2xl font-bold text-success">100%</div></Card>
        <Card className="glass p-5"><div className="text-xs text-muted-foreground">Last re-trained</div><div className="mt-1 text-2xl font-bold">2h ago</div></Card>
      </div>

      <Card className="glass p-5">
        <div className="mb-4 flex items-center gap-3">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search knowledge…" className="pl-9" />
          </div>
          <Button variant="outline"><Database className="mr-2 h-4 w-4" /> Re-train agents</Button>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {docs.map((d) => (
            <div key={d.n} className="flex items-center gap-3 rounded-xl border border-border/60 p-4">
              <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/15 text-primary"><FileText className="h-5 w-5" /></div>
              <div className="min-w-0 flex-1">
                <div className="truncate font-medium">{d.n}</div>
                <div className="text-xs text-muted-foreground">{d.type} · {d.size} · {d.chunks} chunks</div>
              </div>
              <Badge variant={d.status === "Embedded" ? "default" : "secondary"} className={d.status === "Embedded" ? "bg-success/20 text-success" : ""}>{d.status}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
