import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import {
  doc,
  onSnapshot,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";
import {
  ArrowLeft,
  Bot,
  Settings2,
  Phone,
  Activity,
  Loader2,
  Copy,
  CheckCircle2,
  Workflow,
  Sparkles,
  Mic,
  Volume2,
} from "lucide-react";

interface AgentDetail {
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
  personality?: {
    tone: string;
    voice: string;
    humor: number;
    empathy: number;
    professionalism: number;
    confidence: number;
  };
  callFlow?: string[];
  prompt?: string;
  selectedResp?: string[];
  voiceDetails?: {
    voice: string;
    tone: string;
    speakingSpeed: string;
    conversationStyle: string;
    accent: string;
    language: string;
  };
  businessInfo?: Record<string, unknown>;
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

function StatCard({
  label,
  value,
  icon: Icon,
  trend,
}: {
  label: string;
  value: string;
  icon: typeof Bot;
  trend: string;
}) {
  return (
    <Card className="glass p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{label}</span>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="mt-2 text-xl font-bold">{value}</div>
      <div className="mt-1 text-[10px] text-muted-foreground">{trend}</div>
    </Card>
  );
}

export const Route = createFileRoute("/app/agents/$agentId")({
  component: AgentDetail,
});

function AgentDetail() {
  const { agentId } = useParams({ from: "/app/agents/$agentId" });
  const { user } = useAuth();
  const [agent, setAgent] = useState<AgentDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!user || !agentId) return;
    const unsub = onSnapshot(
      doc(db, "users", user.uid, "agents", agentId),
      (snap) => {
        if (snap.exists()) {
          setAgent({ id: snap.id, ...snap.data() } as AgentDetail);
        }
        setLoading(false);
      },
      (err) => {
        console.error("Failed to load agent", err);
        setLoading(false);
      },
    );
    return unsub;
  }, [user, agentId]);

  const handleToggleStatus = async () => {
    if (!agent || !user) return;
    setUpdating(true);
    try {
      const next = agent.status === "Live" ? "Paused" : "Live";
      await updateDoc(doc(db, "users", user.uid, "agents", agent.id), {
        status: next,
      });
      toast.success(`Agent ${agent.name} is now ${next.toLowerCase()}!`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update agent status.");
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin text-primary" />
          Loading agent details...
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-3 text-center">
        <Bot className="h-10 w-10 text-muted-foreground" />
        <div>
          <div className="text-base font-semibold text-muted-foreground">
            Agent not found
          </div>
          <p className="mt-1 text-sm text-muted-foreground/70">
            This agent may have been deleted.
          </p>
        </div>
        <Link to="/app/agents">
          <Button size="sm" className="mt-2">
            Back to agents
          </Button>
        </Link>
      </div>
    );
  }

  const sc = statusConfig[agent.status] || statusConfig.Live;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-3">
        <Link
          to="/app/agents"
          className="inline-flex items-center gap-1 text-xs text-muted-foreground transition hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Agents
        </Link>
      </div>

      {/* Header */}
      <Card className="glass p-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative grid h-16 w-16 place-items-center rounded-2xl bg-surface-2 border border-border text-3xl font-bold text-foreground shadow-sm">
              {agent.name[0]}
              <span
                className={`absolute -right-0.5 -top-0.5 h-3.5 w-3.5 rounded-full border-2 border-card ${sc.dot} ${agent.status === "Live" ? "animate-pulse" : ""}`}
              />
            </div>
            <div>
              <div className="text-xl font-bold leading-tight">
                {agent.name}
              </div>
              <div className="mt-1 text-xs text-muted-foreground">
                {agent.role}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Badge
                  className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${sc.badge}`}
                >
                  <span
                    className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${sc.dot}`}
                  />
                  {sc.label}
                </Badge>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Phone className="h-3 w-3" />
                  {agent.number || "—"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="border-border/60 text-xs"
              onClick={handleToggleStatus}
              disabled={updating}
            >
              {updating ? (
                <Loader2 className="mr-1.5 h-3 w-3 animate-spin" />
              ) : (
                <Settings2 className="mr-1.5 h-3 w-3" />
              )}
              {agent.status === "Live" ? "Pause" : "Activate"}
            </Button>
            <Link to={`/app/create?agentId=${agent.id}`}>
              <Button size="sm" className="text-xs">
                Edit Agent
              </Button>
            </Link>
          </div>
        </div>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {agent.desc}
        </p>

        <div className="mt-5 grid grid-cols-2 gap-3 md:grid-cols-4">
          <StatCard
            label="Calls"
            value={(agent.calls || 0).toString()}
            icon={Phone}
            trend="All time"
          />
          <StatCard
            label="CSAT"
            value={agent.csat ? agent.csat.toString() : "—"}
            icon={Activity}
            trend="Continual refinement"
          />
          <StatCard
            label="Knowledge"
            value={agent.knowledge || "Ingested"}
            icon={CheckCircle2}
            trend="Ready"
          />
          <StatCard
            label="Health"
            value={`${agent.health || 100}%`}
            icon={Activity}
            trend="Stable"
          />
        </div>

        {agent.status !== "Draft" && (
          <div className="mt-4">
            <div className="mb-1 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>Health score</span>
              <span className="font-medium">{agent.health || 100}%</span>
            </div>
            <HealthBar value={agent.health || 100} />
          </div>
        )}
      </Card>

      {/* Voice Details */}
      {(agent.personality || agent.voiceDetails) && (
        <Card className="glass p-6">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Mic className="h-4 w-4" />
            Voice Details
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-surface/60 px-4 py-3">
              <span className="text-xs text-muted-foreground">Voice</span>
              <span className="flex items-center gap-2 text-sm font-semibold">
                <Volume2 className="h-3.5 w-3.5 text-primary" />
                {agent.personality?.voice || agent.voiceDetails?.voice || "—"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-surface/60 px-4 py-3">
              <span className="text-xs text-muted-foreground">Tone</span>
              <span className="text-sm font-semibold">
                {agent.personality?.tone || "—"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-surface/60 px-4 py-3">
              <span className="text-xs text-muted-foreground">
                Speaking speed
              </span>
              <span className="text-sm font-semibold">
                {agent.voiceDetails?.speakingSpeed || "—"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-surface/60 px-4 py-3">
              <span className="text-xs text-muted-foreground">
                Conversation style
              </span>
              <span className="text-sm font-semibold">
                {agent.voiceDetails?.conversationStyle || "—"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-surface/60 px-4 py-3">
              <span className="text-xs text-muted-foreground">Accent</span>
              <span className="text-sm font-semibold capitalize">
                {agent.voiceDetails?.accent || "—"}
              </span>
            </div>
            <div className="flex items-center justify-between rounded-xl border border-border/60 bg-surface/60 px-4 py-3">
              <span className="text-xs text-muted-foreground">Language</span>
              <span className="text-sm font-semibold uppercase">
                {agent.voiceDetails?.language || "—"}
              </span>
            </div>
          </div>

          {(agent.personality?.humor != null ||
            agent.personality?.empathy != null ||
            agent.personality?.professionalism != null ||
            agent.personality?.confidence != null) && (
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {(
                ["humor", "empathy", "professionalism", "confidence"] as const
              ).map((key) => {
                const value = agent.personality?.[key];
                const safeValue = typeof value === "number" ? value : 0;
                return (
                  <div
                    key={key}
                    className="flex items-center justify-between rounded-xl border border-border/60 bg-surface/60 px-4 py-3"
                  >
                    <span className="text-xs text-muted-foreground capitalize">
                      {key}
                    </span>
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted/50">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${safeValue >= 70 ? "bg-success" : safeValue >= 40 ? "bg-warning" : "bg-destructive"}`}
                          style={{
                            width: `${Math.min(100, Math.max(0, safeValue))}%`,
                          }}
                        />
                      </div>
                      <span className="w-8 text-right text-xs font-semibold">
                        {safeValue}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      )}

      {/* Call Flow */}
      {agent.callFlow && agent.callFlow.length > 0 && (
        <Card className="glass p-6">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Workflow className="h-4 w-4" />
            Call Flow
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            {agent.callFlow.map((block, idx) => (
              <div
                key={idx}
                className="flex items-center gap-2 rounded-xl border border-border/60 bg-surface/60 px-3 py-2 text-xs"
              >
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/12 text-[10px] font-bold text-primary">
                  {idx + 1}
                </span>
                <span className="font-medium">{block}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Prompt */}
      {agent.prompt && (
        <Card className="glass p-6">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <Copy className="h-4 w-4" />
            System Prompt
          </div>
          <pre className="mt-3 whitespace-pre-wrap rounded-xl border border-border/60 bg-surface/60 p-4 text-xs leading-relaxed text-muted-foreground">
            {agent.prompt}
          </pre>
        </Card>
      )}

      {/* Responsibilities */}
      {agent.selectedResp && agent.selectedResp.length > 0 && (
        <Card className="glass p-6">
          <div className="flex items-center gap-2 text-sm font-medium text-primary">
            <CheckCircle2 className="h-4 w-4" />
            Responsibilities
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {agent.selectedResp.map((item, idx) => (
              <Badge
                key={idx}
                variant="secondary"
                className="rounded-full border border-border"
              >
                {item}
              </Badge>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
}
