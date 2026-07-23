import { useEffect, useMemo, useState, type FormEvent, type ReactNode, useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight, Check, Loader2, Lock, Shield, Sparkles, Waves } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  type AuthMode,
  signInAsGuest,
  signInWithEmail,
  signUpWithEmail,
  useFirebaseAuth,
} from "@/lib/firebase-auth";

type AuthScreenProps = {
  compact?: boolean;
  reason?: string;
};

const highlights = [
  "Email/password access for every workspace member",
  "Firestore profile records created on sign-up",
  "Protected app routes with automatic sign-out fallback",
];

export function AuthScreen({ compact = false, reason }: AuthScreenProps) {
  const navigate = useNavigate();
  const { user, loading } = useFirebaseAuth();
  const [mode, setMode] = useState<AuthMode>("sign-in");
  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isNewUserFlowRef = useRef(false);

  useEffect(() => {
    if (user && !isNewUserFlowRef.current) {
      navigate({ to: "/app/dashboard", replace: true });
    }
    isNewUserFlowRef.current = false;
  }, [navigate, user]);

  const primaryCopy = useMemo(() => {
    if (compact) return "Sign in to continue";
    return "Create your workspace access";
  }, [compact]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError(null);

    try {
      if (mode === "sign-up") {
        isNewUserFlowRef.current = true;
        await signUpWithEmail(email, password, name, businessName);
        navigate({ to: "/onboarding/agent-type", replace: true });
      } else {
        await signInWithEmail(email, password);
        navigate({ to: "/app/dashboard", replace: true });
      }
    } catch (submitError) {
      const message =
        submitError instanceof Error
          ? submitError.message
          : "Unable to continue with this account.";
      setError(message);
    } finally {
      setBusy(false);
    }
  }

  async function handleDemoAccess() {
    setBusy(true);
    setError(null);
    try {
      isNewUserFlowRef.current = true;
      await signInAsGuest();
      navigate({ to: "/onboarding/agent-type", replace: true });
    } catch (demoError) {
      const message =
        demoError instanceof Error ? demoError.message : "Unable to start demo session.";
      setError(message);
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-6 text-foreground">
        <div className="flex items-center gap-3 rounded-2xl border border-border/60 bg-surface/70 px-5 py-4 shadow-xl backdrop-blur">
          <Loader2 className="h-4 w-4 animate-spin text-primary" />
          <span className="text-sm text-muted-foreground">Checking your session...</span>
        </div>
      </div>
    );
  }

  if (user) {
    return null;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 grid-bg opacity-35" />
      <div
        className="absolute inset-x-0 top-0 h-[520px]"
        style={{ background: "var(--gradient-glow)" }}
      />
      <div className="relative mx-auto grid min-h-screen max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
        <section className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground brand-glow">
              <Waves className="h-6 w-6" />
            </div>
            <div>
              <div className="text-sm font-semibold">VoiceForge AI</div>
              <div className="text-xs text-muted-foreground">Secure access required</div>
            </div>
          </div>

          <div className="max-w-2xl space-y-5">
            <Badge
              variant="secondary"
              className="rounded-full border border-border px-3 py-1 text-xs"
            >
              <Shield className="mr-1.5 h-3 w-3 text-primary" /> Firebase Auth + Firestore
            </Badge>
            <h1 className="text-5xl font-bold tracking-tight md:text-7xl">{primaryCopy}</h1>
            <p className="max-w-xl text-lg text-muted-foreground md:text-xl">
              {reason ??
                "Use your workspace account to sign in or create a new account before opening the dashboard."}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {[
              { value: "1", label: "workspace gate" },
              { value: "2", label: "auth methods" },
              { value: "3", label: "persisted profile docs" },
            ].map((stat) => (
              <Card key={stat.label} className="glass p-4">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </Card>
            ))}
          </div>

          <div className="space-y-3">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary">
                  <Check className="h-3.5 w-3.5" />
                </div>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <Card className="glass relative overflow-hidden border-border/60 p-6 shadow-2xl md:p-8">
          <div className="absolute -right-14 -top-14 h-28 w-28 rounded-full bg-primary/10 blur-3xl" />
          <div className="relative space-y-6">
            <div>
              <div className="flex items-center gap-2 text-sm font-medium text-primary">
                <Lock className="h-4 w-4" /> Workspace access
              </div>
              <h2 className="mt-2 text-2xl font-bold">Sign in or create an account</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                One account unlocks the dashboard, agents, logs, and Firestore-backed profile data.
              </p>
            </div>

            <Tabs
              value={mode}
              onValueChange={(value) => setMode(value as AuthMode)}
              className="space-y-4"
            >
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sign-in">Sign in</TabsTrigger>
                <TabsTrigger value="sign-up">Sign up</TabsTrigger>
              </TabsList>

              <form onSubmit={handleSubmit} className="space-y-4">
                <TabsContent value="sign-in" forceMount className="mt-0 space-y-4">
                  <Field label="Email address">
                    <Input
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@company.com"
                    />
                  </Field>
                  <Field label="Password">
                    <Input
                      autoComplete="current-password"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="••••••••"
                    />
                  </Field>
                </TabsContent>

                <TabsContent value="sign-up" forceMount className="mt-0 space-y-4">
                  <Field label="Business name">
                    <Input
                      autoComplete="organization"
                      value={businessName}
                      onChange={(event) => setBusinessName(event.target.value)}
                      placeholder="Bright Dental"
                    />
                  </Field>
                  <Field label="Name">
                    <Input
                      autoComplete="name"
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      placeholder="Jamie Doe"
                    />
                  </Field>
                  <Field label="Email address">
                    <Input
                      autoComplete="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@company.com"
                    />
                  </Field>
                  <Field label="Password">
                    <Input
                      autoComplete="new-password"
                      type="password"
                      value={password}
                      onChange={(event) => setPassword(event.target.value)}
                      placeholder="Create a password"
                    />
                  </Field>
                </TabsContent>

                {error && (
                  <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <Button type="submit" className="h-11 w-full" disabled={busy}>
                  {busy ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Please wait
                    </>
                  ) : (
                    <>
                      {mode === "sign-up" ? "Create account" : "Continue"}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  variant="outline"
                  className="h-11 w-full"
                  onClick={handleDemoAccess}
                  disabled={busy}
                >
                  <Sparkles className="mr-2 h-4 w-4 text-primary" />
                  Instant Demo Access
                </Button>
              </form>
            </Tabs>

            <Separator />

            <p className="text-center text-xs text-muted-foreground">
              By continuing you agree to use the workspace with your Firebase authenticated account.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="space-y-2">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
