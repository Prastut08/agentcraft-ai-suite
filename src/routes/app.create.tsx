import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Check,
  ChevronRight,
  ChevronLeft,
  Building2,
  Bot,
  ListChecks,
  BookOpen,
  Sparkles,
  Mic,
  Workflow,
  Phone,
  FileCode2,
  Rocket,
  Upload,
  Plus,
  Play,
  Star,
  Globe,
} from "lucide-react";
import { toast } from "sonner";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  collection,
} from "firebase/firestore";
import { onSnapshot, type DocumentData } from "firebase/firestore";

import { useAuth } from "@/lib/auth-context";
import { db } from "@/lib/firebase";

export const Route = createFileRoute("/app/create")({
  component: CreateWizard,
});

const steps = [
  { n: 1, label: "Business Info", icon: Building2 },
  { n: 2, label: "Agent Type", icon: Bot },
  { n: 3, label: "Responsibilities", icon: ListChecks },
  { n: 4, label: "Knowledge Base", icon: BookOpen },
  { n: 5, label: "Personality", icon: Sparkles },
  { n: 6, label: "Voice", icon: Mic },
  { n: 7, label: "Call Flow", icon: Workflow },
  { n: 8, label: "Phone Number", icon: Phone },
  { n: 9, label: "AI Prompt", icon: FileCode2 },
  { n: 10, label: "Review & Deploy", icon: Rocket },
];

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

const responsibilities = [
  "Answer Calls",
  "Make Calls",
  "Transfer Calls",
  "Book Appointments",
  "Cancel Appointments",
  "Answer FAQs",
  "Collect Leads",
  "Verify Customers",
  "Process Orders",
  "Upsell Products",
  "Collect Payments",
  "Route Calls",
  "Schedule Meetings",
  "Send SMS",
  "Send Emails",
  "Escalate Calls",
  "Take Messages",
];

const voices = [
  { name: "Aria", tag: "Female · Warm", accent: "American" },
  { name: "Nova", tag: "Female · Professional", accent: "British" },
  { name: "Milo", tag: "Male · Confident", accent: "American" },
  { name: "Kai", tag: "Male · Youthful", accent: "Australian" },
  { name: "Luna", tag: "Female · Luxury", accent: "French" },
  { name: "Atlas", tag: "Male · Mature", accent: "American" },
];

const tones = [
  "Friendly",
  "Professional",
  "Luxury",
  "Formal",
  "Casual",
  "Empathetic",
  "Energetic",
  "Calm",
  "Sales Focused",
];

type BusinessInfo = {
  businessName: string;
  industry: string;
  website: string;
  phoneNumber: string;
  email: string;
  timeZone: string;
  businessHours: string;
  languagesSpoken: string;
  businessDescription: string;
  address: string;
};

function normalizeBusinessInfo(
  info: Partial<BusinessInfo>,
): Partial<BusinessInfo> {
  return {
    businessName:
      typeof info.businessName === "string" ? info.businessName : "",
    industry: typeof info.industry === "string" ? info.industry : "",
    website: typeof info.website === "string" ? info.website : "",
    phoneNumber: typeof info.phoneNumber === "string" ? info.phoneNumber : "",
    email: typeof info.email === "string" ? info.email : "",
    timeZone: typeof info.timeZone === "string" ? info.timeZone : "pst",
    businessHours:
      typeof info.businessHours === "string" ? info.businessHours : "",
    languagesSpoken:
      typeof info.languagesSpoken === "string" ? info.languagesSpoken : "",
    businessDescription:
      typeof info.businessDescription === "string"
        ? info.businessDescription
        : "",
    address: typeof info.address === "string" ? info.address : "",
  };
}

function CreateWizard() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([
    "AI Receptionist",
  ]);
  const [selectedResp, setSelectedResp] = useState<string[]>([
    "Answer Calls",
    "Book Appointments",
  ]);
  const [tone, setTone] = useState("Professional");
  const [voice, setVoice] = useState("Aria");
  const [humor, setHumor] = useState([30]);
  const [empathy, setEmpathy] = useState([70]);
  const [professionalism, setProfessionalism] = useState([85]);
  const [confidence, setConfidence] = useState([75]);

  const selectedStyle: React.CSSProperties = {
    borderColor: "var(--color-primary)",
    background: "color-mix(in oklch, var(--color-primary) 12%, transparent)",
    boxShadow:
      "0 0 0 1px color-mix(in oklch, var(--color-primary) 30%, transparent)",
    position: "relative",
    zIndex: 1,
  };
  const [savingDraft, setSavingDraft] = useState(false);
  const hydratedDraftRef = useRef(false);
  const stepHydratedRef = useRef(false);
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(
    undefined,
  );
  const initialBusinessInfo = {
    businessName: "",
    industry: "",
    website: "",
    phoneNumber: "",
    email: "",
    timeZone: "pst",
    businessHours: "",
    languagesSpoken: "",
    businessDescription: "",
    address: "",
  };
  const [businessInfo, setBusinessInfo] =
    useState<BusinessInfo>(initialBusinessInfo);
  const businessInfoRef = useRef<BusinessInfo>(initialBusinessInfo);
  const selectedTypesRef = useRef<string[]>(["AI Receptionist"]);
  const selectedRespRef = useRef<string[]>([
    "Answer Calls",
    "Book Appointments",
  ]);
  const [personality, setPersonality] = useState({
    tone: "Professional",
    voice: "Aria",
    humor: 30,
    empathy: 70,
    professionalism: 85,
    confidence: 75,
  });
  const personalityRef = useRef({
    tone: "Professional",
    voice: "Aria",
    humor: 30,
    empathy: 70,
    professionalism: 85,
    confidence: 75,
  });
  const [callFlow, setCallFlow] = useState<string[]>([]);
  const callFlowRef = useRef<string[]>([]);
  const [prompt, setPrompt] = useState("");
  const promptRef = useRef("");

  const progress = (step / 10) * 100;

  const businessName = businessInfo.businessName.trim() || "Bright Dental";
  const businessDescription =
    businessInfo.businessDescription.trim() ||
    "We are a modern dental practice offering cosmetic, restorative, and preventive care…";
  const toggle = (
    arr: string[],
    set: (v: string[]) => void,
    ref: { current: string[] },
    v: string,
  ) => {
    const next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
    set(next);
    ref.current = next;
    if (user) {
      setDoc(
        doc(db, "users", user.uid, "createAgentDrafts", "current"),
        { agentType: next, updatedAt: serverTimestamp() },
        { merge: true },
      )
        .then(() => console.log("[create] saved agentType:", next))
        .catch((error) =>
          console.error("[create] failed to save agentType:", error),
        );
    }
  };

  const next = () => setStep((s) => Math.min(10, s + 1));
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const updatePersonality = useCallback(
    (
      changes: Partial<{
        tone: string;
        voice: string;
        humor: number;
        empathy: number;
        professionalism: number;
        confidence: number;
      }>,
    ) => {
      setPersonality((prev) => {
        const next = { ...prev, ...changes };
        personalityRef.current = next;
        return next;
      });
    },
    [],
  );

  const setCallFlowState = useCallback((next: string[]) => {
    callFlowRef.current = next;
    setCallFlow(next);
  }, []);

  const addCallFlowBlock = useCallback((block: string) => {
    if (callFlowRef.current.includes(block)) return;
    const next = [...callFlowRef.current, block];
    callFlowRef.current = next;
    setCallFlow(next);
  }, []);

  const removeCallFlowBlock = useCallback((index: number) => {
    const next = callFlowRef.current.filter((_, i) => i !== index);
    callFlowRef.current = next;
    setCallFlow(next);
  }, []);

  const setPromptState = useCallback((next: string) => {
    promptRef.current = next;
    setPrompt(next);
  }, []);

  const setHumorState = useCallback((next: number[]) => {
    personalityRef.current = { ...personalityRef.current, humor: next[0] };
    setHumor(next);
  }, []);

  const setEmpathyState = useCallback((next: number[]) => {
    personalityRef.current = { ...personalityRef.current, empathy: next[0] };
    setEmpathy(next);
  }, []);

  const setProfessionalismState = useCallback((next: number[]) => {
    personalityRef.current = {
      ...personalityRef.current,
      professionalism: next[0],
    };
    setProfessionalism(next);
  }, []);

  const setConfidenceState = useCallback((next: number[]) => {
    personalityRef.current = { ...personalityRef.current, confidence: next[0] };
    setConfidence(next);
  }, []);

  useEffect(() => {
    if (
      businessInfo.businessName.trim().length === 0 &&
      profile?.businessName
    ) {
      const nextBusinessInfo = {
        ...businessInfoRef.current,
        businessName: profile.businessName,
      };
      businessInfoRef.current = nextBusinessInfo;
      setBusinessInfo((current) => ({
        ...current,
        businessName: profile.businessName,
      }));
    }
  }, [profile?.businessName, businessInfo.businessName]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const draftRef = doc(db, "users", user.uid, "createAgentDrafts", "current");
    const unsubscribe = onSnapshot(draftRef, (snapshot) => {
      if (hydratedDraftRef.current) {
        return;
      }

      hydratedDraftRef.current = true;
      stepHydratedRef.current = true;

      const data = snapshot.data() as DocumentData | undefined;
      if (!data) {
        return;
      }

      if (typeof data.step === "number") {
        setStep(data.step);
      }

      if (data.businessInfo && typeof data.businessInfo === "object") {
        setBusinessInfo((current) => {
          const nextBusinessInfo = {
            ...current,
            ...normalizeBusinessInfo(
              data.businessInfo as Partial<BusinessInfo>,
            ),
          };
          businessInfoRef.current = nextBusinessInfo;
          return nextBusinessInfo;
        });
      }

      if (Array.isArray(data.agentType)) {
        setSelectedTypes(
          data.agentType.filter(
            (item): item is string => typeof item === "string",
          ),
        );
        selectedTypesRef.current = data.agentType.filter(
          (item): item is string => typeof item === "string",
        );
      }

      if (Array.isArray(data.responsibilities)) {
        setSelectedResp(
          data.responsibilities.filter(
            (item): item is string => typeof item === "string",
          ),
        );
        selectedRespRef.current = data.responsibilities.filter(
          (item): item is string => typeof item === "string",
        );
      }

      if (typeof data.personality?.tone === "string") {
        setTone(data.personality.tone);
        updatePersonality({ tone: data.personality.tone });
      }

      if (typeof data.personality?.voice === "string") {
        setVoice(data.personality.voice);
        updatePersonality({ voice: data.personality.voice });
      }

      if (typeof data.personality?.humor === "number") {
        setHumorState([data.personality.humor]);
      }

      if (typeof data.personality?.empathy === "number") {
        setEmpathyState([data.personality.empathy]);
      }

      if (typeof data.personality?.professionalism === "number") {
        setProfessionalismState([data.personality.professionalism]);
      }

      if (typeof data.personality?.confidence === "number") {
        setConfidenceState([data.personality.confidence]);
      }

      if (Array.isArray(data.callFlow)) {
        const flow = data.callFlow.filter(
          (item): item is string => typeof item === "string",
        );
        setCallFlowState(flow);
      }
    });

    return unsubscribe;
  }, [user]);

  const saveBusinessInfo = useCallback(
    async (nextBusinessInfo: BusinessInfo = businessInfoRef.current) => {
      if (!user) {
        return;
      }

      const nextBusinessName =
        nextBusinessInfo.businessName.trim() || "Bright Dental";
      const nextBusinessDescription =
        nextBusinessInfo.businessDescription.trim() ||
        "We are a modern dental practice offering cosmetic, restorative, and preventive care…";

      const payload = {
        businessName: nextBusinessName,
        businessInfo: {
          ...nextBusinessInfo,
          businessName: nextBusinessName,
          businessDescription: nextBusinessDescription,
        },
        updatedAt: serverTimestamp(),
      };

      try {
        await setDoc(doc(db, "users", user.uid), payload, { merge: true });
        await setDoc(
          doc(db, "users", user.uid, "createAgentDrafts", "current"),
          {
            step: 1,
            sections: {
              businessInfo: payload.businessInfo,
            },
            updatedAt: serverTimestamp(),
          },
          { merge: true },
        );
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Unable to save your business details right now.";
        console.error("Failed to save business info", error);
        toast.error(message);
        throw error;
      }
    },
    [user],
  );

  const saveDraft = useCallback(async () => {
    if (!user) {
      return;
    }

    const currentBusinessInfo = businessInfoRef.current;
    const nextBusinessName =
      currentBusinessInfo.businessName.trim() || "Bright Dental";
    const nextBusinessDescription =
      currentBusinessInfo.businessDescription.trim() ||
      "We are a modern dental practice offering cosmetic, restorative, and preventive care…";

    const draft = {
      step,
      sections: {
        businessInfo: {
          ...currentBusinessInfo,
          businessName: nextBusinessName,
          businessDescription: nextBusinessDescription,
        },
        agentType: selectedTypesRef.current,
        responsibilities: selectedRespRef.current,
        personality: personalityRef.current,
        callFlow: callFlowRef.current,
        prompt: promptRef.current,
      },
      updatedAt: serverTimestamp(),
    };

    console.log(
      "[create] saveDraft writing sections:",
      Object.keys(draft.sections),
    );

    setSavingDraft(true);
    try {
      await setDoc(
        doc(db, "users", user.uid),
        {
          businessName: nextBusinessName,
          businessInfo: draft.sections.businessInfo,
          updatedAt: serverTimestamp(),
        },
        { merge: true },
      );

      await setDoc(
        doc(db, "users", user.uid, "createAgentDrafts", "current"),
        draft,
        {
          merge: true,
        },
      );
      console.log("[create] saveDraft success");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to save your draft right now.";
      console.error("Failed to save create-agent draft", error);
      toast.error(message);
      throw error;
    } finally {
      setSavingDraft(false);
    }
  }, [user, step]);

  const updateBusinessInfo = useCallback(
    (changes: Partial<BusinessInfo>) => {
      const nextBusinessInfo = {
        ...businessInfoRef.current,
        ...changes,
      };

      businessInfoRef.current = nextBusinessInfo;
      setBusinessInfo(nextBusinessInfo);

      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }

      saveTimerRef.current = window.setTimeout(() => {
        saveBusinessInfo(nextBusinessInfo).catch((error) => {
          console.error("Autosave business info failed", error);
        });
      }, 800);
    },
    [saveBusinessInfo],
  );

  function handleNext() {
    console.log("[create] handleNext called, step:", step);
    const savePromise = step === 1 ? saveBusinessInfo() : saveDraft();
    savePromise
      .then(() => {
        console.log("[create] save before continue SUCCESS");
        next();
      })
      .catch((error) => {
        console.error("[create] save before continue FAILED:", error);
        next();
      });
  }

  async function handleDeploy() {
    if (!user) return;
    setSavingDraft(true);
    try {
      const agentsRef = collection(db, "users", user.uid, "agents");
      const newAgentDoc = doc(agentsRef);
      const agentId = newAgentDoc.id;

      const newAgent = {
        id: agentId,
        name: selectedTypes[0]
          ? selectedTypes[0].split(" ")[0] || "Aria"
          : "Aria",
        role: selectedTypes.join(", ") || "AI Receptionist",
        status: "Live",
        calls: 0,
        csat: 0,
        number: businessInfo.phoneNumber || "+1 (415) 555 0100",
        health: 100,
        lastDeployed: "Just now",
        knowledge: "Ingested",
        desc: businessInfo.businessDescription || "AI employee.",
        createdAt: serverTimestamp(),
        // Save config
        businessInfo,
        selectedTypes,
        selectedResp,
        personality: {
          tone,
          voice,
          humor: humor[0],
          empathy: empathy[0],
          professionalism: professionalism[0],
          confidence: confidence[0],
        },
      };

      await setDoc(newAgentDoc, newAgent);

      // Reset draft step
      await setDoc(
        doc(db, "users", user.uid, "createAgentDrafts", "current"),
        {
          step: 1,
        },
        { merge: true },
      );

      toast.success(`Agent ${newAgent.name} deployed successfully!`);
      navigate({ to: "/app/agents" });
    } catch (error) {
      console.error("Failed to deploy agent", error);
      toast.error("Failed to deploy agent. Please try again.");
    } finally {
      setSavingDraft(false);
    }
  }

  useEffect(() => {
    return () => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!user || !hydratedDraftRef.current) {
      return;
    }

    const timer = window.setTimeout(() => {
      saveDraft().catch((error) => {
        console.error("Autosave draft failed", error);
      });
    }, 700);

    return () => window.clearTimeout(timer);
  }, [saveDraft, user]);

  useEffect(() => {
    if (!user || !hydratedDraftRef.current) {
      return;
    }

    const timer = window.setTimeout(() => {
      setDoc(
        doc(db, "users", user.uid, "createAgentDrafts", "current"),
        { responsibilities: selectedRespRef.current },
        { merge: true },
      ).catch((error) =>
        console.error("Autosave responsibilities failed", error),
      );
    }, 400);

    return () => window.clearTimeout(timer);
  }, [user, selectedResp]);

  useEffect(() => {
    if (!user || !hydratedDraftRef.current) {
      return;
    }

    const timer = window.setTimeout(() => {
      setDoc(
        doc(db, "users", user.uid, "createAgentDrafts", "current"),
        { personality: personalityRef.current },
        { merge: true },
      ).catch((error) => console.error("Autosave personality failed", error));
    }, 400);

    return () => window.clearTimeout(timer);
  }, [user, personality]);

  useEffect(() => {
    if (
      !user ||
      !hydratedDraftRef.current ||
      personalityRef.current.voice === voice
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      personalityRef.current = { ...personalityRef.current, voice };
      setDoc(
        doc(db, "users", user.uid, "createAgentDrafts", "current"),
        { personality: personalityRef.current },
        { merge: true },
      ).catch((error) => console.error("Autosave voice failed", error));
    }, 400);

    return () => window.clearTimeout(timer);
  }, [user, voice]);

  useEffect(() => {
    if (!user || !hydratedDraftRef.current || promptRef.current === prompt) {
      return;
    }

    const timer = window.setTimeout(() => {
      promptRef.current = prompt;
      setDoc(
        doc(db, "users", user.uid, "createAgentDrafts", "current"),
        { prompt },
        { merge: true },
      ).catch((error) => console.error("Autosave prompt failed", error));
    }, 400);

    return () => window.clearTimeout(timer);
  }, [user, prompt]);

  useEffect(() => {
    if (!user || !hydratedDraftRef.current) {
      return;
    }

    const timer = window.setTimeout(() => {
      setDoc(
        doc(db, "users", user.uid, "createAgentDrafts", "current"),
        { callFlow: callFlowRef.current },
        { merge: true },
      ).catch((error) => console.error("Autosave call flow failed", error));
    }, 400);

    return () => window.clearTimeout(timer);
  }, [user, callFlow]);

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create your AI Voice Agent</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Step {step} of 10 — {steps[step - 1].label}
        </p>
        <Progress value={progress} className="mt-4 h-1.5" />
      </div>

      <div className="grid gap-6 lg:grid-cols-[240px_1fr]">
        {/* Step nav */}
        <Card className="glass hidden h-fit p-2 lg:block">
          <nav className="space-y-0.5">
            {steps.map((s) => {
              const done = s.n < step;
              const active = s.n === step;
              return (
                <button
                  key={s.n}
                  onClick={() => setStep(s.n)}
                  className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${
                    active
                      ? "bg-primary/15 text-foreground"
                      : done
                        ? "text-muted-foreground hover:bg-muted/40"
                        : "text-muted-foreground/60"
                  }`}
                >
                  <div
                    className={`grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-semibold ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : done
                          ? "bg-success/20 text-success"
                          : "bg-muted"
                    }`}
                  >
                    {done ? <Check className="h-3 w-3" /> : s.n}
                  </div>
                  <span className="truncate">{s.label}</span>
                </button>
              );
            })}
          </nav>
        </Card>

        {/* Content */}
        <Card className="glass p-6 md:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">
                  Tell us about your business
                </h2>
                <p className="text-sm text-muted-foreground">
                  This helps the AI sound like it works for you.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Business Name">
                  <Input
                    placeholder="Bright Dental"
                    value={businessInfo.businessName}
                    onChange={(event) =>
                      updateBusinessInfo({ businessName: event.target.value })
                    }
                  />
                </Field>
                <Field label="Industry">
                  <Select
                    value={businessInfo.industry}
                    onValueChange={(value) =>
                      updateBusinessInfo({ industry: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select…" />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        "Healthcare",
                        "Real Estate",
                        "Legal",
                        "Restaurant",
                        "Hotel",
                        "Retail",
                        "SaaS",
                        "Other",
                      ].map((i) => (
                        <SelectItem key={i} value={i}>
                          {i}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Website">
                  <Input
                    placeholder="https://brightdental.com"
                    value={businessInfo.website}
                    onChange={(event) =>
                      updateBusinessInfo({ website: event.target.value })
                    }
                  />
                </Field>
                <Field label="Phone Number">
                  <Input
                    placeholder="+1 (415) 555 0100"
                    value={businessInfo.phoneNumber}
                    onChange={(event) =>
                      updateBusinessInfo({ phoneNumber: event.target.value })
                    }
                  />
                </Field>
                <Field label="Email">
                  <Input
                    type="email"
                    placeholder="hello@brightdental.com"
                    value={businessInfo.email}
                    onChange={(event) =>
                      updateBusinessInfo({ email: event.target.value })
                    }
                  />
                </Field>
                <Field label="Time Zone">
                  <Select
                    value={businessInfo.timeZone}
                    onValueChange={(value) =>
                      updateBusinessInfo({ timeZone: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pst">Pacific (PST)</SelectItem>
                      <SelectItem value="est">Eastern (EST)</SelectItem>
                      <SelectItem value="gmt">London (GMT)</SelectItem>
                      <SelectItem value="cet">Central Europe (CET)</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Business Hours">
                  <Input
                    placeholder="Mon–Fri, 9am – 6pm"
                    value={businessInfo.businessHours}
                    onChange={(event) =>
                      updateBusinessInfo({ businessHours: event.target.value })
                    }
                  />
                </Field>
                <Field label="Languages Spoken">
                  <Input
                    placeholder="English, Spanish"
                    value={businessInfo.languagesSpoken}
                    onChange={(event) =>
                      updateBusinessInfo({
                        languagesSpoken: event.target.value,
                      })
                    }
                  />
                </Field>
                <div className="md:col-span-2">
                  <Field label="Business Description">
                    <Textarea
                      rows={4}
                      placeholder="We are a modern dental practice offering cosmetic, restorative, and preventive care…"
                      value={businessInfo.businessDescription}
                      onChange={(event) =>
                        updateBusinessInfo({
                          businessDescription: event.target.value,
                        })
                      }
                    />
                  </Field>
                </div>
                <div className="md:col-span-2">
                  <Field label="Address">
                    <Input
                      placeholder="123 Market St, San Francisco, CA"
                      value={businessInfo.address}
                      onChange={(event) =>
                        updateBusinessInfo({ address: event.target.value })
                      }
                    />
                  </Field>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">
                  What type of AI Voice Agent would you like to create?
                </h2>
                <p className="text-sm text-muted-foreground">
                  Select one or multiple. Each agent can wear several hats.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {agentTypes.map((t) => {
                  const active = selectedTypes.includes(t);
                  return (
                    <button
                      key={t}
                      onClick={() =>
                        toggle(
                          selectedTypes,
                          setSelectedTypes,
                          selectedTypesRef,
                          t,
                        )
                      }
                      className={`rounded-xl border p-4 text-left transition ${active ? "" : "border-border/60 text-foreground hover:border-border"}`}
                      style={active ? selectedStyle : undefined}
                    >
                      <div className="flex items-center justify-between">
                        <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary">
                          <Bot className="h-4 w-4" />
                        </div>
                        {active && <Check className="h-4 w-4 text-primary" />}
                      </div>
                      <div className="mt-3 font-medium">{t}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">
                  Choose responsibilities
                </h2>
                <p className="text-sm text-muted-foreground">
                  What should this agent actually do on a call?
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {responsibilities.map((r) => {
                  const active = selectedResp.includes(r);
                  return (
                    <button
                      key={r}
                      onClick={() =>
                        toggle(
                          selectedResp,
                          setSelectedResp,
                          selectedRespRef,
                          r,
                        )
                      }
                      className={`rounded-full border px-4 py-2 text-sm transition ${active ? "" : "border-border/60 text-muted-foreground hover:border-border"}`}
                      style={active ? selectedStyle : undefined}
                    >
                      {active && (
                        <Check className="mr-1.5 inline h-3.5 w-3.5 text-primary" />
                      )}
                      {r}
                    </button>
                  );
                })}
              </div>
              <Field label="Custom responsibilities">
                <Textarea
                  rows={4}
                  placeholder="E.g. Explain our loyalty program and offer a $50 credit for referrals."
                />
              </Field>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Upload your knowledge</h2>
                <p className="text-sm text-muted-foreground">
                  PDFs, docs, spreadsheets, FAQs, websites — anything you'd hand
                  a new employee.
                </p>
              </div>
              <div className="rounded-2xl border-2 border-dashed border-border/60 p-10 text-center transition hover:border-primary/50">
                <Upload className="mx-auto h-8 w-8 text-muted-foreground" />
                <p className="mt-3 font-medium">
                  Drop files here or click to upload
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, DOCX, TXT, CSV, XLSX, PNG · up to 50MB
                </p>
                <Button variant="outline" className="mt-4">
                  Browse files
                </Button>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {[
                  { n: "Service_Menu_2026.pdf", s: "428 KB · ingested" },
                  { n: "FAQ_Master.docx", s: "112 KB · ingested" },
                  { n: "Price_List.xlsx", s: "38 KB · processing" },
                ].map((f) => (
                  <div
                    key={f.n}
                    className="flex items-center justify-between rounded-xl border border-border/60 p-3 text-sm"
                  >
                    <div className="min-w-0">
                      <div className="truncate font-medium">{f.n}</div>
                      <div className="text-xs text-muted-foreground">{f.s}</div>
                    </div>
                    <Badge variant="outline">Knowledge</Badge>
                  </div>
                ))}
              </div>
              <div className="grid gap-3 md:grid-cols-4">
                {["Paste text", "Add Q&A", "Import URL", "Connect Notion"].map(
                  (a) => (
                    <Button key={a} variant="outline">
                      <Plus className="mr-2 h-4 w-4" /> {a}
                    </Button>
                  ),
                )}
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Shape the personality</h2>
                <p className="text-sm text-muted-foreground">
                  Fine-tune how your agent sounds and behaves.
                </p>
              </div>
              <Field label="Voice tone">
                <div className="flex flex-wrap gap-2">
                  {tones.map((t) => (
                    <button
                      key={t}
                      onClick={() => {
                        setTone(t);
                        updatePersonality({ tone: t });
                      }}
                      className={`rounded-full border px-4 py-1.5 text-sm transition ${tone === t ? "" : "border-border/60 text-muted-foreground"}`}
                      style={tone === t ? selectedStyle : undefined}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </Field>
              <div className="grid gap-4 md:grid-cols-2">
                <Field label="Speaking speed">
                  <Select defaultValue="normal">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="slow">Slow</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="fast">Fast</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Conversation style">
                  <Select defaultValue="short">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short</SelectItem>
                      <SelectItem value="detailed">Detailed</SelectItem>
                      <SelectItem value="consultative">Consultative</SelectItem>
                      <SelectItem value="persuasive">Persuasive</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>
              <div className="space-y-5">
                <SliderRow label="Humor" v={humor} setV={setHumorState} />
                <SliderRow label="Empathy" v={empathy} setV={setEmpathyState} />
                <SliderRow
                  label="Professionalism"
                  v={professionalism}
                  setV={setProfessionalismState}
                />
                <SliderRow
                  label="Confidence"
                  v={confidence}
                  setV={setConfidenceState}
                />
              </div>
            </div>
          )}

          {step === 6 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Choose a voice</h2>
                <p className="text-sm text-muted-foreground">
                  Preview each voice — you can change it any time.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                {voices.map((v) => {
                  const active = voice === v.name;
                  return (
                    <button
                      key={v.name}
                      onClick={() => {
                        setVoice(v.name);
                        updatePersonality({ voice: v.name });
                      }}
                      className={`rounded-2xl border p-5 text-left transition ${active ? "" : "border-border/60"}`}
                      style={active ? selectedStyle : undefined}
                    >
                      <div className="flex items-center justify-between">
                        <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary/40 to-accent/40 text-lg font-semibold">
                          {v.name[0]}
                        </div>
                        <Button size="icon" variant="ghost" className="h-8 w-8">
                          <Play className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="mt-3 font-semibold">{v.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {v.tag}
                      </div>
                      <div className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                        <Globe className="h-3 w-3" /> {v.accent}
                      </div>
                    </button>
                  );
                })}
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                <Field label="Accent">
                  <Select defaultValue="american">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="american">American</SelectItem>
                      <SelectItem value="british">British</SelectItem>
                      <SelectItem value="australian">Australian</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Language">
                  <Select defaultValue="en">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="es">Spanish</SelectItem>
                      <SelectItem value="fr">French</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
                <Field label="Voice clone (coming soon)">
                  <Button variant="outline" disabled>
                    Upload sample
                  </Button>
                </Field>
              </div>
            </div>
          )}

          {step === 7 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Design the call flow</h2>
                <p className="text-sm text-muted-foreground">
                  Drag blocks onto the canvas and connect them.
                </p>
              </div>
              <div className="grid gap-4 md:grid-cols-[200px_1fr]">
                <Card className="glass p-3">
                  <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">
                    Blocks
                  </div>
                  <div className="space-y-1.5">
                    {[
                      "Start Call",
                      "Greeting",
                      "Ask Question",
                      "Knowledge Lookup",
                      "Booking",
                      "Lead Qualification",
                      "Transfer",
                      "Send SMS",
                      "Webhook",
                      "CRM Lookup",
                      "Payment",
                      "End Call",
                    ].map((b) => (
                      <button
                        key={b}
                        onClick={() => addCallFlowBlock(b)}
                        className="cursor-pointer rounded-lg border border-border/60 px-3 py-1.5 text-xs hover:border-primary/60 text-foreground"
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </Card>
                <div className="relative min-h-[420px] rounded-2xl border border-border/60 grid-bg p-6">
                  {callFlow.length === 0 ? (
                    <div className="flex h-full min-h-[360px] items-center justify-center text-sm text-muted-foreground">
                      Click blocks from the sidebar to build your call flow
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {callFlow.map((block, i) => (
                        <div
                          key={block}
                          className="flex items-center gap-3 rounded-xl border border-border/60 bg-primary/10 p-3 text-sm"
                        >
                          <div className="grid h-7 w-7 place-items-center rounded-full bg-primary/20 text-xs font-semibold text-primary">
                            {i + 1}
                          </div>
                          <span className="flex-1 font-medium">{block}</span>
                          <button
                            onClick={() => removeCallFlowBlock(i)}
                            className="text-muted-foreground hover:text-destructive"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M18 6 6 18" />
                              <path d="m6 6 12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {step === 8 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">
                  Connect a phone number
                </h2>
                <p className="text-sm text-muted-foreground">
                  Bring your own or buy a fresh one.
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-4">
                {[
                  "Twilio",
                  "Vapi",
                  "Retell",
                  "Bland AI",
                  "Plivo",
                  "Exotel",
                  "Telnyx",
                  "Custom SIP",
                ].map((p) => (
                  <button
                    key={p}
                    className="rounded-xl border border-border/60 p-4 text-left hover:border-primary/50"
                  >
                    <div className="font-medium">{p}</div>
                    <div className="text-xs text-muted-foreground">
                      Not connected
                    </div>
                  </button>
                ))}
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                <Card className="glass p-5">
                  <div className="font-medium">Buy a new number</div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    From $2 / mo · 40+ countries
                  </p>
                  <Button className="mt-3" variant="outline">
                    Search numbers
                  </Button>
                </Card>
                <Card className="glass p-5">
                  <div className="font-medium">Connect existing</div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    SIP trunk or provider port
                  </p>
                  <Button className="mt-3" variant="outline">
                    Add number
                  </Button>
                </Card>
                <Card className="glass p-5">
                  <div className="font-medium">Forward business line</div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Route overflow calls
                  </p>
                  <Button className="mt-3" variant="outline">
                    Set forwarding
                  </Button>
                </Card>
              </div>
            </div>
          )}

          {step === 9 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Your generated prompt</h2>
                <p className="text-sm text-muted-foreground">
                  Auto-generated from your business info, knowledge, and
                  personality settings.
                </p>
              </div>
              <div className="overflow-hidden rounded-2xl border border-border/60 bg-[oklch(0.12_0.03_250)]">
                <div className="flex items-center justify-between border-b border-border/60 px-4 py-2 text-xs">
                  <span className="font-mono text-muted-foreground">
                    system_prompt.md
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="ghost">
                      Copy
                    </Button>
                    <Button size="sm" variant="ghost">
                      Download
                    </Button>
                  </div>
                </div>
                <pre className="overflow-auto p-5 font-mono text-xs leading-relaxed text-foreground/90">
                  {`# ROLE
You are Aria, the AI Receptionist for ${businessName} — a modern
practice in ${businessInfo.address || "your service area"} offering cosmetic, restorative, and
preventive care.

# PERSONALITY
Tone: professional, warm, calm. Speak in short sentences.
Never rush the caller. Empathy: ${empathy[0]}/100. Humor: ${humor[0]}/100. Professionalism: ${professionalism[0]}/100. Confidence: ${confidence[0]}/100.

# RESPONSIBILITIES
- Answer inbound calls, verify caller identity.
- Book, reschedule, and cancel appointments via calendar tool.
- Answer FAQs from the knowledge base.
- Transfer clinical questions to the on-call dentist.

# GREETING
"Thanks for calling ${businessName}, this is Aria — how can I help?"

# ESCALATION
If caller mentions pain, bleeding, or emergency → transfer immediately.
If caller requests a human → warm transfer to reception.
`}
                </pre>
              </div>
            </div>
          )}

          {step === 10 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold">Review & deploy</h2>
                <p className="text-sm text-muted-foreground">
                  One last look before your agent goes live.
                </p>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                <Summary label="Business" value={businessName} />
                <Summary label="Agent Type" value={selectedTypes.join(", ")} />
                <Summary label="Voice" value={`${voice} · Professional`} />
                <Summary label="Phone Number" value="+1 (415) 555 0100" />
                <Summary label="Knowledge" value="3 documents · 12 FAQs" />
                <Summary label="Est. Monthly Usage" value="1,200 min · $79" />
              </div>
              <Card
                className="p-6 text-center brand-glow"
                style={{ background: "var(--gradient-brand)" }}
              >
                <div className="text-lg font-semibold text-brand-foreground">
                  Ready to go live
                </div>
                <p className="mt-1 text-sm text-brand-foreground/80">
                  Deploying takes about 30 seconds. Your agent will start
                  answering immediately.
                </p>
                <Button
                  size="lg"
                  variant="secondary"
                  className="mt-4"
                  onClick={handleDeploy}
                >
                  <Rocket className="mr-2 h-4 w-4" /> Deploy agent
                </Button>
              </Card>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-6">
            <Button
              variant="outline"
              onClick={prev}
              disabled={step === 1 || savingDraft}
            >
              <ChevronLeft className="mr-1 h-4 w-4" /> Back
            </Button>
            <div className="text-xs text-muted-foreground">
              Step {step} of 10
            </div>
            <Button onClick={handleNext}>
              Continue <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </Label>
      {children}
    </div>
  );
}

function SliderRow({
  label,
  v,
  setV,
}: {
  label: string;
  v: number[];
  setV: (v: number[]) => void;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span>{label}</span>
        <span className="text-muted-foreground">{v[0]}</span>
      </div>
      <Slider value={v} onValueChange={setV} max={100} step={1} />
    </div>
  );
}

function Summary({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border/60 p-4">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1 font-medium">{value}</div>
    </div>
  );
}
