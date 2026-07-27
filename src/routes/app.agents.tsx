import { createFileRoute, Link } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  updateDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import {
  Bot,
  Phone,
  MoreHorizontal,
  Activity,
  Plus,
  Star,
  ArrowUpRight,
  Clock,
  Settings2,
  Trash2,
  Loader2,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/app/agents")({
  component: Agents,
});

interface Agent {
  id: string;
  name: string;
  role: string;
  status: "Live" | "Paused" | "Draft";
  calls: number;
  csat: number;
  number: string;
  health: number;
  lastDeployed: string;
  knowledge: string;
  desc: string;
}

const statusConfig: Record<
  string,
  { label: string; dot: string; badge: string }
> = {
  Live: {
    label: "Live",
    dot: "bg-success",
    badge: "bg-success/12 text-success border-success/20",
  },
  Paused: {
    label: "Paused",
    dot: "bg-warning",
    badge: "bg-warning/12 text-warning border-warning/20",
  },
  Draft: {
    label: "Draft",
    dot: "bg-muted-foreground",
    badge: "bg-muted/50 text-muted-foreground border-border",
  },
};

function HealthBar({ value }: { value: number }) {
  const color =
    value >= 90
      ? "bg-success"
      : value >= 70
        ? "bg-warning"
        : "bg-muted-foreground/40";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted/50">
        <div
          className={`h-full rounded-full transition-all duration-700 ${color}`}
          style={{ width: `${value}%` }}
        />
      </div>
      <span className="w-8 text-right text-xs font-medium text-muted-foreground">
        {value || "—"}
      </span>
    </div>
  );
}

function Agents() {
  const { user } = useAuth();
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [simulating, setSimulating] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = onSnapshot(
      collection(db, "users", user.uid, "agents"),
      (snapshot) => {
        const list: Agent[] = [];
        snapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() } as Agent);
        });
        setAgents(list);
        setLoading(false);
      },
      (err) => {
        console.error("Failed to fetch agents", err);
        setLoading(false);
      },
    );
    return unsubscribe;
  }, [user]);

  const handleToggleStatus = async (agent: Agent) => {
    if (!user) return;
    const nextStatus = agent.status === "Live" ? "Paused" : "Live";
    try {
      await updateDoc(doc(db, "users", user.uid, "agents", agent.id), {
        status: nextStatus,
      });
      toast.success(`Agent ${agent.name} is now ${nextStatus.toLowerCase()}!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to toggle agent status.");
    }
  };

  const handleDelete = async (agentId: string, name: string) => {
    if (!user || !confirm(`Are you sure you want to delete ${name}?`)) return;
    try {
      await deleteDoc(doc(db, "users", user.uid, "agents", agentId));
      toast.success(`Agent ${name} deleted successfully.`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete agent.");
    }
  };

  const handleTestCall = async (agent: Agent) => {
    if (!user) return;
    setSimulating(agent.id);
    try {
      // Create mock conversation
      const newConvoDoc = doc(
        collection(db, "users", user.uid, "conversations"),
      );
      const outcomes = [
        "Appointment booked",
        "Resolved FAQ",
        "Lead qualified",
        "Escalated to human",
      ];
      const names = ["John Doe", "Jane Smith", "Robert Johnson", "Emily Davis"];
      const selectedName = names[Math.floor(Math.random() * names.length)];
      const selectedOutcome =
        outcomes[Math.floor(Math.random() * outcomes.length)];
      const callerNumber = `+1 (415) 555-01${Math.floor(Math.random() * 90) + 10}`;

      const newConvo = {
        id: newConvoDoc.id,
        name: selectedName,
        agent: agent.name,
        time: "Just now",
        dur: `${Math.floor(Math.random() * 3) + 1}m ${Math.floor(Math.random() * 50) + 10}s`,
        outcome: selectedOutcome,
        score: Math.floor(Math.random() * 3) + 8, // 8-10
        sentiment: ["pos", "neu"][Math.floor(Math.random() * 2)],
        summary: `Caller ${selectedName} inquired about business details and services. Agent ${agent.name} successfully handled the query resulting in: ${selectedOutcome}.`,
        actionItems: ["Review details in dashboard", "Update client log"],
        transcript: [
          {
            s: "Caller",
            t: "Hello, I wanted to ask about your business hours and if I can schedule a visit.",
          },
          {
            s: agent.name,
            t: `Hi! Yes, I can certainly help you with that. We are open Monday to Friday from 9 AM to 6 PM. What day would you like to schedule a visit?`,
          },
          { s: "Caller", t: "How about tomorrow morning around 10 AM?" },
          {
            s: agent.name,
            t: "Let me check the calendar. Yes! We have that slot open. I've booked that slot for you under your name.",
          },
          { s: "Caller", t: "Awesome, thank you so much!" },
          {
            s: agent.name,
            t: "You're welcome! We have sent a confirmation message. Have a wonderful day!",
          },
        ],
        createdAt: serverTimestamp(),
      };
      await setDoc(newConvoDoc, newConvo);

      // Create mock call log
      const newLogDoc = doc(collection(db, "users", user.uid, "logs"));
      await setDoc(newLogDoc, {
        id: newLogDoc.id,
        from: callerNumber,
        to: agent.number || "+1 (415) 555-0100",
        agent: agent.name,
        dir: "in",
        dur: newConvo.dur,
        outcome: selectedOutcome,
        time: "Just now",
        createdAt: serverTimestamp(),
      });

      // Update call counts on agent document
      await updateDoc(doc(db, "users", user.uid, "agents", agent.id), {
        calls: (agent.calls || 0) + 1,
        csat: Number(
          (
            ((agent.csat || 4.5) * (agent.calls || 0) + newConvo.score / 2) /
            ((agent.calls || 0) + 1)
          ).toFixed(1),
        ),
      });

      toast.success(
        `Mock call simulated with ${agent.name}! Log and transcript created.`,
      );
    } catch (err) {
      console.error(err);
      toast.error("Failed to simulate mock call.");
    } finally {
      setSimulating(null);
    }
  };

  const liveCount = agents.filter((a) => a.status === "Live").length;
  const pausedCount = agents.filter((a) => a.status === "Paused").length;
  const draftCount = agents.filter((a) => a.status === "Draft").length;
  const totalCalls = agents.reduce((sum, a) => sum + (a.calls || 0), 0);
  const avgCsat = agents.length
    ? (
        agents.reduce((sum, a) => sum + (a.csat || 0), 0) /
          agents.filter((a) => (a.csat || 0) > 0).length || 5.0
      ).toFixed(1)
    : "0.0";

  return (
    <div className="space-y-8 animate-fade-in">
      {/* ─── Page Header ─── */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Agents</h1>
          <p className="mt-1.5 text-sm text-muted-foreground">
            {agents.length} agent{agents.length !== 1 ? "s" : ""} · {liveCount}{" "}
            live · {pausedCount} paused · {draftCount} draft
          </p>
        </div>
        <div className="flex gap-2">
          <Link to="/app/create">
            <Button
              size="sm"
              className="bg-primary text-primary-foreground font-medium shadow-md"
            >
              <Plus className="mr-2 h-3.5 w-3.5" />
              New Agent
            </Button>
          </Link>
        </div>
      </div>

      {/* ─── Summary Stats ─── */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          {
            label: "Total Agents",
            val: agents.length.toString(),
            icon: Bot,
            trend: agents.length > 0 ? `${liveCount} live` : "None yet",
          },
          {
            label: "Live Agents",
            val: liveCount.toString(),
            icon: Activity,
            trend: "Active now",
          },
          {
            label: "Total Calls",
            val: totalCalls.toLocaleString(),
            icon: Phone,
            trend: agents.length > 0 ? "All time" : "No calls yet",
          },
          {
            label: "Avg CSAT",
            val: `${avgCsat} / 5.0`,
            icon: Star,
            trend: "Continual refinement",
          },
        ].map((s) => (
          <Card key={s.label} className="glass p-4">
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">{s.label}</span>
              <s.icon className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-2 text-xl font-bold">{s.val}</div>
            <div className="mt-1 text-[10px] text-muted-foreground">
              {s.trend}
            </div>
          </Card>
        ))}
      </div>

      {/* ─── Agent Cards ─── */}
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          <div className="col-span-full py-12 flex justify-center items-center gap-2">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-sm text-muted-foreground">
              Loading agents...
            </span>
          </div>
        ) : agents.length === 0 ? (
          <Card className="glass col-span-full flex flex-col items-center justify-center gap-4 p-10 text-center">
            <div className="grid h-16 w-16 place-items-center rounded-2xl bg-muted/50 text-muted-foreground">
              <Bot className="h-8 w-8" />
            </div>
            <div>
              <div className="text-base font-semibold text-muted-foreground">
                No agents yet
              </div>
              <p className="mt-1 text-sm text-muted-foreground/70">
                Create your first AI voice agent to get started.
              </p>
            </div>
            <Link to="/app/create">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground font-medium shadow-md"
              >
                <Plus className="mr-2 h-3.5 w-3.5" />
                Create Your First Agent
              </Button>
            </Link>
          </Card>
        ) : (
          agents.map((a) => {
            const sc = statusConfig[a.status] || statusConfig.Live;
            return (
              <Card
                key={a.id}
                className="glass card-hover group flex flex-col overflow-hidden"
              >
                {/* Header */}
                <div className="p-5 pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {/* Avatar */}
                      <div className="relative grid h-14 w-14 place-items-center rounded-2xl bg-surface-2 border border-border text-2xl font-bold text-foreground shadow-sm">
                        {a.name[0]}
                        {/* Status dot */}
                        <span
                          className={`absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-card ${sc.dot} ${a.status === "Live" ? "animate-pulse" : ""}`}
                        />
                      </div>
                      <div>
                        <div className="font-bold leading-tight">{a.name}</div>
                        <div className="mt-0.5 text-xs text-muted-foreground">
                          {a.role}
                        </div>
                      </div>
                    </div>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive"
                      onClick={() => handleDelete(a.id, a.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Description */}
                  <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                    {a.desc}
                  </p>

                  {/* Status + Number */}
                  <div className="mt-3 flex items-center gap-2">
                    <Badge
                      className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${sc.badge}`}
                    >
                      <span
                        className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${sc.dot}`}
                      />
                      {sc.label}
                    </Badge>
                    {a.number !== "—" && (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {a.number}
                      </span>
                    )}
                  </div>
                </div>

                {/* Stats */}
                <div className="border-t border-border/50 px-5 py-3">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div>
                      <div className="text-xs text-muted-foreground">Calls</div>
                      <div className="mt-0.5 text-sm font-bold">
                        {a.calls || 0}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">CSAT</div>
                      <div className="mt-0.5 text-sm font-bold">
                        {a.csat || "—"}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground">
                        Knowledge
                      </div>
                      <div className="mt-0.5 text-[11px] font-semibold">
                        {a.knowledge || "Ingested"}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Health bar */}
                {a.status !== "Draft" && (
                  <div className="px-5 py-2">
                    <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground">
                      <span>Health score</span>
                      <span className="font-medium">{a.health || 100}%</span>
                    </div>
                    <HealthBar value={a.health || 100} />
                  </div>
                )}

                {/* Footer */}
                <div className="mt-auto flex gap-2 border-t border-border/50 p-4">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-border/60 text-xs"
                    onClick={() => handleToggleStatus(a)}
                  >
                    <Settings2 className="mr-1.5 h-3 w-3" />
                    {a.status === "Live" ? "Pause" : "Activate"}
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 bg-primary/15 text-primary text-xs hover:bg-primary/25"
                    onClick={() => handleTestCall(a)}
                    disabled={simulating === a.id}
                  >
                    {simulating === a.id ? (
                      <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
                    ) : (
                      <Bot className="mr-1.5 h-3 w-3" />
                    )}
                    {simulating === a.id ? "Calling..." : "Test Call"}
                  </Button>
                  {a.status === "Live" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="shrink-0 text-xs text-muted-foreground"
                    >
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </Button>
                  )}
                </div>
              </Card>
            );
          })
        )}

        {/* Add new agent card */}
        <Link to="/app/create" className="h-full">
          <Card className="flex h-full min-h-[280px] flex-col items-center justify-center gap-4 border-dashed border-border/50 bg-transparent p-8 text-center transition hover:border-primary/40 hover:bg-primary/4">
            <div className="grid h-14 w-14 place-items-center rounded-2xl border-2 border-dashed border-border/60 text-muted-foreground transition hover:border-primary/50 hover:text-primary">
              <Plus className="h-6 w-6" />
            </div>
            <div>
              <div className="font-semibold text-muted-foreground">
                Create New Agent
              </div>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Deploy your next AI employee in minutes
              </p>
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
