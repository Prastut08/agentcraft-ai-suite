import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bot, Check, ChevronRight, Sparkles, Waves } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const Route = createFileRoute("/onboarding/agent-type")({
  component: AgentTypeOnboarding,
});

const agentTypes = [
  "AI Receptionist",
  "Customer Support Agent",
  "FAQ Agent",
  "Appointment Scheduler",
  "Sales Representative",
  "Lead Qualification Agent",
  "Outbound Calling Agent",
  "Follow-up Agent",
  "Restaurant Order Taking",
  "Hotel Concierge",
  "Medical Receptionist",
  "Real Estate Assistant",
  "Insurance Agent",
  "Recruitment Agent",
  "Debt Collection Agent",
  "Survey Agent",
  "Customer Success Agent",
  "Technical Support",
  "Custom AI Agent",
];

function AgentTypeOnboarding() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [selected, setSelected] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      navigate({ to: "/", replace: true });
    }
  }, [user, loading, navigate]);

  const toggle = (type: string) => {
    setSelected((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };

  const handleContinue = async () => {
    if (!user || selected.length === 0) return;

    setSaving(true);
    try {
      await setDoc(
        doc(db, "users", user.uid, "createAgentDrafts", "current"),
        {
          agentType: selected,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );
      navigate({ to: "/app/dashboard", replace: true });
    } catch (error) {
      console.error("Failed to save agent type", error);
      navigate({ to: "/app/dashboard", replace: true });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
        <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-surface/70 px-5 py-4 shadow-xl backdrop-blur">
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
          <span className="text-sm text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 grid-bg opacity-35" />
      <div
        className="absolute inset-x-0 top-0 h-[520px]"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="relative mx-auto max-w-5xl px-6 py-10 lg:px-8">
        <div className="mb-8 flex items-center gap-3">
          <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground brand-glow">
            <Waves className="h-6 w-6" />
          </div>
          <div>
            <div className="text-sm font-semibold">VoiceForge AI</div>
            <div className="text-xs text-muted-foreground">
              Let's set up your workspace
            </div>
          </div>
        </div>

        <Card className="glass overflow-hidden border-border/60 p-6 shadow-2xl md:p-8">
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Bot className="h-4 w-4" /> Choose your agent type
              </div>
              <h2 className="mt-2 text-2xl font-bold">
                What type of AI Voice Agent would you like to create?
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Select one or multiple. Each agent can wear several hats.
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {agentTypes.map((type) => {
                const active = selected.includes(type);
                return (
                  <button
                    key={type}
                    onClick={() => toggle(type)}
                    className={`rounded-xl border p-4 text-left transition ${
                      active
                        ? "border-primary bg-primary/10 brand-glow"
                        : "border-border/60 hover:border-border"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary">
                        <Bot className="h-4 w-4" />
                      </div>
                      {active && <Check className="h-4 w-4 text-primary" />}
                    </div>
                    <div className="mt-3 font-medium">{type}</div>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4">
              <Badge
                variant="secondary"
                className="rounded-full border border-border px-3 py-1 text-xs"
              >
                <Sparkles className="mr-1.5 h-3 w-3 text-primary" />
                {selected.length} selected
              </Badge>
              <Button
                onClick={handleContinue}
                disabled={selected.length === 0 || saving}
                className="h-11 gap-2 bg-primary text-primary-foreground"
              >
                {saving ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                    Saving...
                  </>
                ) : (
                  <>
                    Continue
                    <ChevronRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
