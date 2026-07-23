import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
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
import { toast } from "sonner";
import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  serverTimestamp,
  onSnapshot,
} from "firebase/firestore";

export const Route = createFileRoute("/app/knowledge")({
  component: KB,
});

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

const getDocIconAndColor = (type: string) => {
  switch (type.toUpperCase()) {
    case "PDF":
      return { icon: FileText, color: "bg-destructive/12 text-destructive" };
    case "DOCX":
      return { icon: File, color: "bg-primary/12 text-primary" };
    case "XLSX":
      return { icon: FileSpreadsheet, color: "bg-success/12 text-success" };
    case "URL":
      return { icon: Globe, color: "bg-accent/12 text-accent" };
    case "FAQ":
      return { icon: FileText, color: "bg-primary/12 text-primary" };
    case "TXT":
    default:
      return { icon: FileText, color: "bg-destructive/12 text-destructive" };
  }
};

interface Doc {
  id: string;
  n: string;
  type: string;
  size: string;
  status: "Embedded" | "Processing" | "Error";
  chunks: number;
  updated: string;
  confidence: number;
}

function KB() {
  const { user } = useAuth();
  const [docs, setDocs] = useState<Doc[]>([]);
  const [loading, setLoading] = useState(true);
  const [dragging, setDragging] = useState(false);
  const [search, setSearch] = useState("");

  const [dialogOpen, setDialogOpen] = useState(false);
  const [docType, setDocType] = useState<"PDF" | "DOCX" | "XLSX" | "URL" | "FAQ" | "TXT">("URL");
  const [docName, setDocName] = useState("");
  const [docContent, setDocContent] = useState("");
  const [savingDoc, setSavingDoc] = useState(false);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(
      collection(db, "users", user.uid, "knowledge"),
      (snapshot) => {
        const list: Doc[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as Doc);
        });
        setDocs(list);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load knowledge", err);
        setLoading(false);
      }
    );
    return unsubscribe;
  }, [user]);

  const handleOpenDialog = (type: typeof docType) => {
    setDocType(type);
    setDocName("");
    setDocContent("");
    setDialogOpen(true);
  };

  const handleAddDoc = async () => {
    if (!user || !docName.trim()) return;
    setSavingDoc(true);
    try {
      const newDocRef = doc(collection(db, "users", user.uid, "knowledge"));
      await setDoc(newDocRef, {
        id: newDocRef.id,
        n: docName.trim(),
        type: docType,
        size: docType === "URL" ? "1 page" : docType === "FAQ" ? "Q&A" : "12 KB",
        status: "Embedded",
        chunks: docType === "FAQ" ? 1 : Math.floor(Math.random() * 10) + 1,
        updated: "Just now",
        confidence: 99,
        createdAt: serverTimestamp(),
      });
      toast.success("Document added to knowledge base successfully!");
      setDialogOpen(false);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add document.");
    } finally {
      setSavingDoc(false);
    }
  };

  const handleDeleteDoc = async (docId: string, name: string) => {
    if (!user || !confirm(`Delete ${name} from knowledge base?`)) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "knowledge", docId));
      toast.success("Document deleted.");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete document.");
    }
  };

  const filtered = docs.filter((d) => d.n.toLowerCase().includes(search.toLowerCase()));
  const totalChunks = docs.reduce((sum, d) => sum + (d.chunks || 0), 0);
  const embeddedCount = docs.filter((d) => d.status === "Embedded").length;

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Knowledge Base</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {docs.length} source{docs.length !== 1 ? "s" : ""} · {totalChunks} chunks · {docs.length > 0 ? `${embeddedCount} embedded` : "No data yet"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="border-border/60" onClick={() => handleOpenDialog("FAQ")}>
            <Plus className="mr-2 h-3.5 w-3.5" />
            Add Q&A
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground font-medium shadow-md" onClick={() => handleOpenDialog("PDF")}>
            <Upload className="mr-2 h-3.5 w-3.5" />
            Upload Document
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {[
          { label: "Total Sources", value: docs.length.toString(), icon: Database, color: "primary" },
          { label: "Embedding Health", value: docs.length > 0 ? `${embeddedCount}/${docs.length} ok` : "—", icon: CheckCircle2, color: "success" },
          { label: "Total Chunks", value: totalChunks.toString(), icon: Cpu, color: "accent" },
          { label: "Last Re-trained", value: docs.length > 0 ? "Just now" : "Never", icon: Clock, color: "muted" },
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

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragging(true);
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          handleOpenDialog("PDF");
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
            PDF, DOCX, TXT, CSV, XLSX · up to 50 MB per file
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <Button variant="outline" size="sm" className="border-border/60" onClick={() => handleOpenDialog("PDF")}>
              Browse Files
            </Button>
            <Button variant="outline" size="sm" className="border-border/60" onClick={() => handleOpenDialog("URL")}>
              <Globe className="mr-2 h-3.5 w-3.5" />
              Import URL
            </Button>
            <Button variant="outline" size="sm" className="border-border/60" onClick={() => handleOpenDialog("TXT")}>
              <Plus className="mr-2 h-3.5 w-3.5" />
              Paste Text
            </Button>
          </div>
        </div>
      </div>

      <Card className="glass overflow-hidden">
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

        <div className="grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center gap-4 border-b border-border/30 bg-muted/10 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
          <span className="w-10">Type</span>
          <span>Document</span>
          <span className="w-24 text-center">Chunks</span>
          <span className="w-20 text-center">Confidence</span>
          <span className="w-24 text-center">Status</span>
          <span className="w-16 text-center">Actions</span>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-12 gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">Loading knowledge base...</span>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 px-5 py-12 text-center">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-muted/50 text-muted-foreground">
              <FileText className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-semibold text-muted-foreground">No documents uploaded yet</div>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Upload your first document to get started.
              </p>
            </div>
          </div>
        ) : (
          <div className="divide-y divide-border/30">
            {filtered.map((d) => {
              const sc = statusCfg[d.status] || statusCfg.Embedded;
              const { icon: Icon, color } = getDocIconAndColor(d.type);
              return (
                <div
                  key={d.id}
                  className="group grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center gap-4 px-5 py-4 transition hover:bg-muted/20"
                >
                  <div className={`grid h-10 w-10 place-items-center rounded-xl ${color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
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
                  <div className="w-24 text-center">
                    <span className="text-sm font-semibold">{d.chunks || "—"}</span>
                    {d.chunks > 0 && <div className="text-[10px] text-muted-foreground">chunks</div>}
                  </div>
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
                      onClick={() => handleDeleteDoc(d.id, d.n)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Card>

      {docs.length > 0 && (
        <Card className="relative overflow-hidden border border-border bg-surface p-5">
          <div className="flex items-start gap-4">
            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/20 text-primary">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="text-sm font-semibold">Knowledge Gaps Detected</div>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Gap analysis will appear here after your agents handle calls and unanswered questions are detected.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              className="shrink-0 border-primary/30 text-primary hover:bg-primary/10"
              onClick={() => handleOpenDialog("FAQ")}
            >
              Add FAQ
            </Button>
          </div>
        </Card>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Add to Knowledge Base</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-1">
              <Label htmlFor="docType">Type</Label>
              <select
                id="docType"
                value={docType}
                onChange={(e) => setDocType(e.target.value as any)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="PDF">PDF File</option>
                <option value="DOCX">Word Document (DOCX)</option>
                <option value="XLSX">Spreadsheet (XLSX)</option>
                <option value="URL">Website URL</option>
                <option value="FAQ">FAQ Q&A</option>
                <option value="TXT">Plain Text</option>
              </select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="docName">Name / Title</Label>
              <Input
                id="docName"
                placeholder={
                  docType === "URL"
                    ? "E.g., Company Website"
                    : docType === "FAQ"
                      ? "E.g., Refund Policy FAQ"
                      : "E.g., Product Catalog"
                }
                value={docName}
                onChange={(e) => setDocName(e.target.value)}
              />
            </div>
            {docType === "URL" && (
              <div className="space-y-1">
                <Label htmlFor="urlLink">URL Address</Label>
                <Input id="urlLink" placeholder="https://example.com" />
              </div>
            )}
            {(docType === "TXT" || docType === "FAQ") && (
              <div className="space-y-1">
                <Label htmlFor="docContent">
                  {docType === "FAQ" ? "Q&A Content (Question & Answer)" : "Text Content"}
                </Label>
                <Textarea
                  id="docContent"
                  rows={4}
                  placeholder={
                    docType === "FAQ"
                      ? "Q: Do you offer free shipping?\nA: Yes, on orders over $50."
                      : "Paste knowledge content here..."
                  }
                  value={docContent}
                  onChange={(e) => setDocContent(e.target.value)}
                />
              </div>
            )}
            {(docType === "PDF" || docType === "DOCX" || docType === "XLSX") && (
              <div className="py-4 border-2 border-dashed border-border rounded-lg text-center bg-muted/20">
                <Upload className="mx-auto h-6 w-6 text-muted-foreground mb-1" />
                <span className="text-xs text-muted-foreground">Mock File Ready to Import</span>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddDoc} disabled={savingDoc || !docName.trim()}>
              {savingDoc ? "Adding..." : "Add to Knowledge"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
