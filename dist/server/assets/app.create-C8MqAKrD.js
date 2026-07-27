import { o as db } from "./firebase-auth-4nYWua_o.js";
import { n as useAuth } from "./auth-context-D8TD5ErT.js";
import { s as cn, t as Card } from "./card-CMUgrADA.js";
import { t as Badge } from "./badge-DrmkgaLP.js";
import { t as Button } from "./button-D1WH43tQ.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BNKCGG-n.js";
import { t as Progress } from "./progress-DkI4Tylc.js";
import { t as Input } from "./input-tDEmLj55.js";
import { t as Label } from "./label-DQBDE3fv.js";
import { t as Textarea } from "./textarea-4hl39tGn.js";
import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { collection, doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { BookOpen, Bot, Building2, Check, ChevronLeft, ChevronRight, FileCode2, Globe, ListChecks, Mic, Phone, Play, Plus, Rocket, Sparkles, Upload, Workflow } from "lucide-react";
import * as SliderPrimitive from "@radix-ui/react-slider";
//#region src/components/ui/slider.tsx
var Slider = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxs(SliderPrimitive.Root, {
	ref,
	className: cn("relative flex w-full touch-none select-none items-center", className),
	...props,
	children: [/* @__PURE__ */ jsx(SliderPrimitive.Track, {
		className: "relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20",
		children: /* @__PURE__ */ jsx(SliderPrimitive.Range, { className: "absolute h-full bg-primary" })
	}), /* @__PURE__ */ jsx(SliderPrimitive.Thumb, { className: "block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" })]
}));
Slider.displayName = SliderPrimitive.Root.displayName;
//#endregion
//#region src/routes/app.create.tsx?tsr-split=component
var steps = [
	{
		n: 1,
		label: "Business Info",
		icon: Building2
	},
	{
		n: 2,
		label: "Agent Type",
		icon: Bot
	},
	{
		n: 3,
		label: "Responsibilities",
		icon: ListChecks
	},
	{
		n: 4,
		label: "Knowledge Base",
		icon: BookOpen
	},
	{
		n: 5,
		label: "Personality",
		icon: Sparkles
	},
	{
		n: 6,
		label: "Voice",
		icon: Mic
	},
	{
		n: 7,
		label: "Call Flow",
		icon: Workflow
	},
	{
		n: 8,
		label: "Phone Number",
		icon: Phone
	},
	{
		n: 9,
		label: "AI Prompt",
		icon: FileCode2
	},
	{
		n: 10,
		label: "Review & Deploy",
		icon: Rocket
	}
];
var agentTypes = [
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
	"Custom AI Agent"
];
var responsibilities = [
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
	"Take Messages"
];
var voices = [
	{
		name: "Aria",
		tag: "Female · Warm",
		accent: "American"
	},
	{
		name: "Nova",
		tag: "Female · Professional",
		accent: "British"
	},
	{
		name: "Milo",
		tag: "Male · Confident",
		accent: "American"
	},
	{
		name: "Kai",
		tag: "Male · Youthful",
		accent: "Australian"
	},
	{
		name: "Luna",
		tag: "Female · Luxury",
		accent: "French"
	},
	{
		name: "Atlas",
		tag: "Male · Mature",
		accent: "American"
	}
];
var tones = [
	"Friendly",
	"Professional",
	"Luxury",
	"Formal",
	"Casual",
	"Empathetic",
	"Energetic",
	"Calm",
	"Sales Focused"
];
function normalizeBusinessInfo(info) {
	return {
		businessName: typeof info.businessName === "string" ? info.businessName : "",
		industry: typeof info.industry === "string" ? info.industry : "",
		website: typeof info.website === "string" ? info.website : "",
		phoneNumber: typeof info.phoneNumber === "string" ? info.phoneNumber : "",
		email: typeof info.email === "string" ? info.email : "",
		timeZone: typeof info.timeZone === "string" ? info.timeZone : "pst",
		businessHours: typeof info.businessHours === "string" ? info.businessHours : "",
		languagesSpoken: typeof info.languagesSpoken === "string" ? info.languagesSpoken : "",
		businessDescription: typeof info.businessDescription === "string" ? info.businessDescription : "",
		address: typeof info.address === "string" ? info.address : ""
	};
}
function CreateWizard() {
	const { user, profile } = useAuth();
	const navigate = useNavigate();
	const [step, setStep] = useState(1);
	const [selectedTypes, setSelectedTypes] = useState(["AI Receptionist"]);
	const [selectedResp, setSelectedResp] = useState(["Answer Calls", "Book Appointments"]);
	const [tone, setTone] = useState("Professional");
	const [voice, setVoice] = useState("Aria");
	const [humor, setHumor] = useState([30]);
	const [empathy, setEmpathy] = useState([70]);
	const [professionalism, setProfessionalism] = useState([85]);
	const [confidence, setConfidence] = useState([75]);
	const selectedStyle = {
		borderColor: "var(--color-primary)",
		background: "color-mix(in oklch, var(--color-primary) 12%, transparent)",
		boxShadow: "0 0 0 1px color-mix(in oklch, var(--color-primary) 30%, transparent)",
		position: "relative",
		zIndex: 1
	};
	const [savingDraft, setSavingDraft] = useState(false);
	const hydratedDraftRef = useRef(false);
	const stepHydratedRef = useRef(false);
	const saveTimerRef = useRef(void 0);
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
		address: ""
	};
	const [businessInfo, setBusinessInfo] = useState(initialBusinessInfo);
	const businessInfoRef = useRef(initialBusinessInfo);
	const selectedTypesRef = useRef(["AI Receptionist"]);
	const selectedRespRef = useRef(["Answer Calls", "Book Appointments"]);
	const [personality, setPersonality] = useState({
		tone: "Professional",
		voice: "Aria",
		humor: 30,
		empathy: 70,
		professionalism: 85,
		confidence: 75
	});
	const personalityRef = useRef({
		tone: "Professional",
		voice: "Aria",
		humor: 30,
		empathy: 70,
		professionalism: 85,
		confidence: 75
	});
	const [callFlow, setCallFlow] = useState([]);
	const callFlowRef = useRef([]);
	const [prompt, setPrompt] = useState("");
	const promptRef = useRef("");
	const progress = step / 10 * 100;
	const businessName = businessInfo.businessName.trim() || "Bright Dental";
	businessInfo.businessDescription.trim();
	const toggle = (arr, set, ref, v) => {
		const next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
		set(next);
		ref.current = next;
		if (user) setDoc(doc(db, "users", user.uid, "createAgentDrafts", "current"), {
			agentType: next,
			updatedAt: serverTimestamp()
		}, { merge: true }).then(() => console.log("[create] saved agentType:", next)).catch((error) => console.error("[create] failed to save agentType:", error));
	};
	const next = () => setStep((s) => Math.min(10, s + 1));
	const prev = () => setStep((s) => Math.max(1, s - 1));
	const updatePersonality = useCallback((changes) => {
		setPersonality((prev) => {
			const next = {
				...prev,
				...changes
			};
			personalityRef.current = next;
			return next;
		});
	}, []);
	const setCallFlowState = useCallback((next) => {
		callFlowRef.current = next;
		setCallFlow(next);
	}, []);
	const addCallFlowBlock = useCallback((block) => {
		if (callFlowRef.current.includes(block)) return;
		const next = [...callFlowRef.current, block];
		callFlowRef.current = next;
		setCallFlow(next);
	}, []);
	const removeCallFlowBlock = useCallback((index) => {
		const next = callFlowRef.current.filter((_, i) => i !== index);
		callFlowRef.current = next;
		setCallFlow(next);
	}, []);
	useCallback((next) => {
		promptRef.current = next;
		setPrompt(next);
	}, []);
	const setHumorState = useCallback((next) => {
		personalityRef.current = {
			...personalityRef.current,
			humor: next[0]
		};
		setHumor(next);
	}, []);
	const setEmpathyState = useCallback((next) => {
		personalityRef.current = {
			...personalityRef.current,
			empathy: next[0]
		};
		setEmpathy(next);
	}, []);
	const setProfessionalismState = useCallback((next) => {
		personalityRef.current = {
			...personalityRef.current,
			professionalism: next[0]
		};
		setProfessionalism(next);
	}, []);
	const setConfidenceState = useCallback((next) => {
		personalityRef.current = {
			...personalityRef.current,
			confidence: next[0]
		};
		setConfidence(next);
	}, []);
	useEffect(() => {
		if (businessInfo.businessName.trim().length === 0 && profile?.businessName) {
			const nextBusinessInfo = {
				...businessInfoRef.current,
				businessName: profile.businessName
			};
			businessInfoRef.current = nextBusinessInfo;
			setBusinessInfo((current) => ({
				...current,
				businessName: profile.businessName
			}));
		}
	}, [profile?.businessName, businessInfo.businessName]);
	useEffect(() => {
		if (!user) return;
		return onSnapshot(doc(db, "users", user.uid, "createAgentDrafts", "current"), (snapshot) => {
			if (hydratedDraftRef.current) return;
			hydratedDraftRef.current = true;
			stepHydratedRef.current = true;
			const data = snapshot.data();
			if (!data) return;
			if (typeof data.step === "number") setStep(data.step);
			if (data.businessInfo && typeof data.businessInfo === "object") setBusinessInfo((current) => {
				const nextBusinessInfo = {
					...current,
					...normalizeBusinessInfo(data.businessInfo)
				};
				businessInfoRef.current = nextBusinessInfo;
				return nextBusinessInfo;
			});
			if (Array.isArray(data.agentType)) {
				setSelectedTypes(data.agentType.filter((item) => typeof item === "string"));
				selectedTypesRef.current = data.agentType.filter((item) => typeof item === "string");
			}
			if (Array.isArray(data.responsibilities)) {
				setSelectedResp(data.responsibilities.filter((item) => typeof item === "string"));
				selectedRespRef.current = data.responsibilities.filter((item) => typeof item === "string");
			}
			if (typeof data.personality?.tone === "string") {
				setTone(data.personality.tone);
				updatePersonality({ tone: data.personality.tone });
			}
			if (typeof data.personality?.voice === "string") {
				setVoice(data.personality.voice);
				updatePersonality({ voice: data.personality.voice });
			}
			if (typeof data.personality?.humor === "number") setHumorState([data.personality.humor]);
			if (typeof data.personality?.empathy === "number") setEmpathyState([data.personality.empathy]);
			if (typeof data.personality?.professionalism === "number") setProfessionalismState([data.personality.professionalism]);
			if (typeof data.personality?.confidence === "number") setConfidenceState([data.personality.confidence]);
			if (Array.isArray(data.callFlow)) {
				const flow = data.callFlow.filter((item) => typeof item === "string");
				setCallFlowState(flow);
			}
		});
	}, [user]);
	const saveBusinessInfo = useCallback(async (nextBusinessInfo = businessInfoRef.current) => {
		if (!user) return;
		const nextBusinessName = nextBusinessInfo.businessName.trim() || "Bright Dental";
		const nextBusinessDescription = nextBusinessInfo.businessDescription.trim() || "We are a modern dental practice offering cosmetic, restorative, and preventive care…";
		const payload = {
			businessName: nextBusinessName,
			businessInfo: {
				...nextBusinessInfo,
				businessName: nextBusinessName,
				businessDescription: nextBusinessDescription
			},
			updatedAt: serverTimestamp()
		};
		try {
			await setDoc(doc(db, "users", user.uid), payload, { merge: true });
			await setDoc(doc(db, "users", user.uid, "createAgentDrafts", "current"), {
				step: 1,
				sections: { businessInfo: payload.businessInfo },
				updatedAt: serverTimestamp()
			}, { merge: true });
		} catch (error) {
			const message = error instanceof Error ? error.message : "Unable to save your business details right now.";
			console.error("Failed to save business info", error);
			toast.error(message);
			throw error;
		}
	}, [user]);
	const saveDraft = useCallback(async () => {
		if (!user) return;
		const currentBusinessInfo = businessInfoRef.current;
		const nextBusinessName = currentBusinessInfo.businessName.trim() || "Bright Dental";
		const nextBusinessDescription = currentBusinessInfo.businessDescription.trim() || "We are a modern dental practice offering cosmetic, restorative, and preventive care…";
		const draft = {
			step,
			sections: {
				businessInfo: {
					...currentBusinessInfo,
					businessName: nextBusinessName,
					businessDescription: nextBusinessDescription
				},
				agentType: selectedTypesRef.current,
				responsibilities: selectedRespRef.current,
				personality: personalityRef.current,
				callFlow: callFlowRef.current,
				prompt: promptRef.current
			},
			updatedAt: serverTimestamp()
		};
		console.log("[create] saveDraft writing sections:", Object.keys(draft.sections));
		setSavingDraft(true);
		try {
			await setDoc(doc(db, "users", user.uid), {
				businessName: nextBusinessName,
				businessInfo: draft.sections.businessInfo,
				updatedAt: serverTimestamp()
			}, { merge: true });
			await setDoc(doc(db, "users", user.uid, "createAgentDrafts", "current"), draft, { merge: true });
			console.log("[create] saveDraft success");
		} catch (error) {
			const message = error instanceof Error ? error.message : "Unable to save your draft right now.";
			console.error("Failed to save create-agent draft", error);
			toast.error(message);
			throw error;
		} finally {
			setSavingDraft(false);
		}
	}, [user, step]);
	const updateBusinessInfo = useCallback((changes) => {
		const nextBusinessInfo = {
			...businessInfoRef.current,
			...changes
		};
		businessInfoRef.current = nextBusinessInfo;
		setBusinessInfo(nextBusinessInfo);
		if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
		saveTimerRef.current = window.setTimeout(() => {
			saveBusinessInfo(nextBusinessInfo).catch((error) => {
				console.error("Autosave business info failed", error);
			});
		}, 800);
	}, [saveBusinessInfo]);
	function handleNext() {
		console.log("[create] handleNext called, step:", step);
		(step === 1 ? saveBusinessInfo() : saveDraft()).then(() => {
			console.log("[create] save before continue SUCCESS");
			next();
		}).catch((error) => {
			console.error("[create] save before continue FAILED:", error);
			next();
		});
	}
	async function handleDeploy() {
		if (!user) return;
		setSavingDraft(true);
		try {
			const newAgentDoc = doc(collection(db, "users", user.uid, "agents"));
			const newAgent = {
				id: newAgentDoc.id,
				name: selectedTypes[0] ? selectedTypes[0].split(" ")[0] || "Aria" : "Aria",
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
				businessInfo,
				selectedTypes,
				selectedResp,
				personality: {
					tone,
					voice,
					humor: humor[0],
					empathy: empathy[0],
					professionalism: professionalism[0],
					confidence: confidence[0]
				}
			};
			await setDoc(newAgentDoc, newAgent);
			await setDoc(doc(db, "users", user.uid, "createAgentDrafts", "current"), { step: 1 }, { merge: true });
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
			if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
		};
	}, []);
	useEffect(() => {
		if (!user || !hydratedDraftRef.current) return;
		const timer = window.setTimeout(() => {
			saveDraft().catch((error) => {
				console.error("Autosave draft failed", error);
			});
		}, 700);
		return () => window.clearTimeout(timer);
	}, [saveDraft, user]);
	useEffect(() => {
		if (!user || !hydratedDraftRef.current) return;
		const timer = window.setTimeout(() => {
			setDoc(doc(db, "users", user.uid, "createAgentDrafts", "current"), { responsibilities: selectedRespRef.current }, { merge: true }).catch((error) => console.error("Autosave responsibilities failed", error));
		}, 400);
		return () => window.clearTimeout(timer);
	}, [user, selectedResp]);
	useEffect(() => {
		if (!user || !hydratedDraftRef.current) return;
		const timer = window.setTimeout(() => {
			setDoc(doc(db, "users", user.uid, "createAgentDrafts", "current"), { personality: personalityRef.current }, { merge: true }).catch((error) => console.error("Autosave personality failed", error));
		}, 400);
		return () => window.clearTimeout(timer);
	}, [user, personality]);
	useEffect(() => {
		if (!user || !hydratedDraftRef.current || personalityRef.current.voice === voice) return;
		const timer = window.setTimeout(() => {
			personalityRef.current = {
				...personalityRef.current,
				voice
			};
			setDoc(doc(db, "users", user.uid, "createAgentDrafts", "current"), { personality: personalityRef.current }, { merge: true }).catch((error) => console.error("Autosave voice failed", error));
		}, 400);
		return () => window.clearTimeout(timer);
	}, [user, voice]);
	useEffect(() => {
		if (!user || !hydratedDraftRef.current || promptRef.current === prompt) return;
		const timer = window.setTimeout(() => {
			promptRef.current = prompt;
			setDoc(doc(db, "users", user.uid, "createAgentDrafts", "current"), { prompt }, { merge: true }).catch((error) => console.error("Autosave prompt failed", error));
		}, 400);
		return () => window.clearTimeout(timer);
	}, [user, prompt]);
	useEffect(() => {
		if (!user || !hydratedDraftRef.current) return;
		const timer = window.setTimeout(() => {
			setDoc(doc(db, "users", user.uid, "createAgentDrafts", "current"), { callFlow: callFlowRef.current }, { merge: true }).catch((error) => console.error("Autosave call flow failed", error));
		}, 400);
		return () => window.clearTimeout(timer);
	}, [user, callFlow]);
	return /* @__PURE__ */ jsxs("div", {
		className: "mx-auto max-w-6xl space-y-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [
			/* @__PURE__ */ jsx("h1", {
				className: "text-3xl font-bold",
				children: "Create your AI Voice Agent"
			}),
			/* @__PURE__ */ jsxs("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					"Step ",
					step,
					" of 10 — ",
					steps[step - 1].label
				]
			}),
			/* @__PURE__ */ jsx(Progress, {
				value: progress,
				className: "mt-4 h-1.5"
			})
		] }), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-6 lg:grid-cols-[240px_1fr]",
			children: [/* @__PURE__ */ jsx(Card, {
				className: "glass hidden h-fit p-2 lg:block",
				children: /* @__PURE__ */ jsx("nav", {
					className: "space-y-0.5",
					children: steps.map((s) => {
						const done = s.n < step;
						const active = s.n === step;
						return /* @__PURE__ */ jsxs("button", {
							onClick: () => setStep(s.n),
							className: `flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm transition ${active ? "bg-primary/15 text-foreground" : done ? "text-muted-foreground hover:bg-muted/40" : "text-muted-foreground/60"}`,
							children: [/* @__PURE__ */ jsx("div", {
								className: `grid h-6 w-6 shrink-0 place-items-center rounded-full text-[10px] font-semibold ${active ? "bg-primary text-primary-foreground" : done ? "bg-success/20 text-success" : "bg-muted"}`,
								children: done ? /* @__PURE__ */ jsx(Check, { className: "h-3 w-3" }) : s.n
							}), /* @__PURE__ */ jsx("span", {
								className: "truncate",
								children: s.label
							})]
						}, s.n);
					})
				})
			}), /* @__PURE__ */ jsxs(Card, {
				className: "glass p-6 md:p-8",
				children: [
					step === 1 && /* @__PURE__ */ jsxs("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-semibold",
							children: "Tell us about your business"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "This helps the AI sound like it works for you."
						})] }), /* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 md:grid-cols-2",
							children: [
								/* @__PURE__ */ jsx(Field, {
									label: "Business Name",
									children: /* @__PURE__ */ jsx(Input, {
										placeholder: "Bright Dental",
										value: businessInfo.businessName,
										onChange: (event) => updateBusinessInfo({ businessName: event.target.value })
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Industry",
									children: /* @__PURE__ */ jsxs(Select, {
										value: businessInfo.industry,
										onValueChange: (value) => updateBusinessInfo({ industry: value }),
										children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, { placeholder: "Select…" }) }), /* @__PURE__ */ jsx(SelectContent, { children: [
											"Healthcare",
											"Real Estate",
											"Legal",
											"Restaurant",
											"Hotel",
											"Retail",
											"SaaS",
											"Other"
										].map((i) => /* @__PURE__ */ jsx(SelectItem, {
											value: i,
											children: i
										}, i)) })]
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Website",
									children: /* @__PURE__ */ jsx(Input, {
										placeholder: "https://brightdental.com",
										value: businessInfo.website,
										onChange: (event) => updateBusinessInfo({ website: event.target.value })
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Phone Number",
									children: /* @__PURE__ */ jsx(Input, {
										placeholder: "+1 (415) 555 0100",
										value: businessInfo.phoneNumber,
										onChange: (event) => updateBusinessInfo({ phoneNumber: event.target.value })
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Email",
									children: /* @__PURE__ */ jsx(Input, {
										type: "email",
										placeholder: "hello@brightdental.com",
										value: businessInfo.email,
										onChange: (event) => updateBusinessInfo({ email: event.target.value })
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Time Zone",
									children: /* @__PURE__ */ jsxs(Select, {
										value: businessInfo.timeZone,
										onValueChange: (value) => updateBusinessInfo({ timeZone: value }),
										children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }), /* @__PURE__ */ jsxs(SelectContent, { children: [
											/* @__PURE__ */ jsx(SelectItem, {
												value: "pst",
												children: "Pacific (PST)"
											}),
											/* @__PURE__ */ jsx(SelectItem, {
												value: "est",
												children: "Eastern (EST)"
											}),
											/* @__PURE__ */ jsx(SelectItem, {
												value: "gmt",
												children: "London (GMT)"
											}),
											/* @__PURE__ */ jsx(SelectItem, {
												value: "cet",
												children: "Central Europe (CET)"
											})
										] })]
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Business Hours",
									children: /* @__PURE__ */ jsx(Input, {
										placeholder: "Mon–Fri, 9am – 6pm",
										value: businessInfo.businessHours,
										onChange: (event) => updateBusinessInfo({ businessHours: event.target.value })
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: "Languages Spoken",
									children: /* @__PURE__ */ jsx(Input, {
										placeholder: "English, Spanish",
										value: businessInfo.languagesSpoken,
										onChange: (event) => updateBusinessInfo({ languagesSpoken: event.target.value })
									})
								}),
								/* @__PURE__ */ jsx("div", {
									className: "md:col-span-2",
									children: /* @__PURE__ */ jsx(Field, {
										label: "Business Description",
										children: /* @__PURE__ */ jsx(Textarea, {
											rows: 4,
											placeholder: "We are a modern dental practice offering cosmetic, restorative, and preventive care…",
											value: businessInfo.businessDescription,
											onChange: (event) => updateBusinessInfo({ businessDescription: event.target.value })
										})
									})
								}),
								/* @__PURE__ */ jsx("div", {
									className: "md:col-span-2",
									children: /* @__PURE__ */ jsx(Field, {
										label: "Address",
										children: /* @__PURE__ */ jsx(Input, {
											placeholder: "123 Market St, San Francisco, CA",
											value: businessInfo.address,
											onChange: (event) => updateBusinessInfo({ address: event.target.value })
										})
									})
								})
							]
						})]
					}),
					step === 2 && /* @__PURE__ */ jsxs("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-semibold",
							children: "What type of AI Voice Agent would you like to create?"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "Select one or multiple. Each agent can wear several hats."
						})] }), /* @__PURE__ */ jsx("div", {
							className: "grid gap-3 sm:grid-cols-2 md:grid-cols-3",
							children: agentTypes.map((t) => {
								const active = selectedTypes.includes(t);
								return /* @__PURE__ */ jsxs("button", {
									onClick: () => toggle(selectedTypes, setSelectedTypes, selectedTypesRef, t),
									className: `rounded-xl border p-4 text-left transition ${active ? "" : "border-border/60 text-foreground hover:border-border"}`,
									style: active ? selectedStyle : void 0,
									children: [/* @__PURE__ */ jsxs("div", {
										className: "flex items-center justify-between",
										children: [/* @__PURE__ */ jsx("div", {
											className: "grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary",
											children: /* @__PURE__ */ jsx(Bot, { className: "h-4 w-4" })
										}), active && /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-primary" })]
									}), /* @__PURE__ */ jsx("div", {
										className: "mt-3 font-medium",
										children: t
									})]
								}, t);
							})
						})]
					}),
					step === 3 && /* @__PURE__ */ jsxs("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-semibold",
								children: "Choose responsibilities"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "What should this agent actually do on a call?"
							})] }),
							/* @__PURE__ */ jsx("div", {
								className: "flex flex-wrap gap-2",
								children: responsibilities.map((r) => {
									const active = selectedResp.includes(r);
									return /* @__PURE__ */ jsxs("button", {
										onClick: () => toggle(selectedResp, setSelectedResp, selectedRespRef, r),
										className: `rounded-full border px-4 py-2 text-sm transition ${active ? "" : "border-border/60 text-muted-foreground hover:border-border"}`,
										style: active ? selectedStyle : void 0,
										children: [active && /* @__PURE__ */ jsx(Check, { className: "mr-1.5 inline h-3.5 w-3.5 text-primary" }), r]
									}, r);
								})
							}),
							/* @__PURE__ */ jsx(Field, {
								label: "Custom responsibilities",
								children: /* @__PURE__ */ jsx(Textarea, {
									rows: 4,
									placeholder: "E.g. Explain our loyalty program and offer a $50 credit for referrals."
								})
							})
						]
					}),
					step === 4 && /* @__PURE__ */ jsxs("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-semibold",
								children: "Upload your knowledge"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "PDFs, docs, spreadsheets, FAQs, websites — anything you'd hand a new employee."
							})] }),
							/* @__PURE__ */ jsxs("div", {
								className: "rounded-2xl border-2 border-dashed border-border/60 p-10 text-center transition hover:border-primary/50",
								children: [
									/* @__PURE__ */ jsx(Upload, { className: "mx-auto h-8 w-8 text-muted-foreground" }),
									/* @__PURE__ */ jsx("p", {
										className: "mt-3 font-medium",
										children: "Drop files here or click to upload"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "text-xs text-muted-foreground",
										children: "PDF, DOCX, TXT, CSV, XLSX, PNG · up to 50MB"
									}),
									/* @__PURE__ */ jsx(Button, {
										variant: "outline",
										className: "mt-4",
										children: "Browse files"
									})
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "grid gap-3 md:grid-cols-2",
								children: [
									{
										n: "Service_Menu_2026.pdf",
										s: "428 KB · ingested"
									},
									{
										n: "FAQ_Master.docx",
										s: "112 KB · ingested"
									},
									{
										n: "Price_List.xlsx",
										s: "38 KB · processing"
									}
								].map((f) => /* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between rounded-xl border border-border/60 p-3 text-sm",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ jsx("div", {
											className: "truncate font-medium",
											children: f.n
										}), /* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground",
											children: f.s
										})]
									}), /* @__PURE__ */ jsx(Badge, {
										variant: "outline",
										children: "Knowledge"
									})]
								}, f.n))
							}),
							/* @__PURE__ */ jsx("div", {
								className: "grid gap-3 md:grid-cols-4",
								children: [
									"Paste text",
									"Add Q&A",
									"Import URL",
									"Connect Notion"
								].map((a) => /* @__PURE__ */ jsxs(Button, {
									variant: "outline",
									children: [
										/* @__PURE__ */ jsx(Plus, { className: "mr-2 h-4 w-4" }),
										" ",
										a
									]
								}, a))
							})
						]
					}),
					step === 5 && /* @__PURE__ */ jsxs("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-semibold",
								children: "Shape the personality"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "Fine-tune how your agent sounds and behaves."
							})] }),
							/* @__PURE__ */ jsx(Field, {
								label: "Voice tone",
								children: /* @__PURE__ */ jsx("div", {
									className: "flex flex-wrap gap-2",
									children: tones.map((t) => /* @__PURE__ */ jsx("button", {
										onClick: () => {
											setTone(t);
											updatePersonality({ tone: t });
										},
										className: `rounded-full border px-4 py-1.5 text-sm transition ${tone === t ? "" : "border-border/60 text-muted-foreground"}`,
										style: tone === t ? selectedStyle : void 0,
										children: t
									}, t))
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-4 md:grid-cols-2",
								children: [/* @__PURE__ */ jsx(Field, {
									label: "Speaking speed",
									children: /* @__PURE__ */ jsxs(Select, {
										defaultValue: "normal",
										children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }), /* @__PURE__ */ jsxs(SelectContent, { children: [
											/* @__PURE__ */ jsx(SelectItem, {
												value: "slow",
												children: "Slow"
											}),
											/* @__PURE__ */ jsx(SelectItem, {
												value: "normal",
												children: "Normal"
											}),
											/* @__PURE__ */ jsx(SelectItem, {
												value: "fast",
												children: "Fast"
											})
										] })]
									})
								}), /* @__PURE__ */ jsx(Field, {
									label: "Conversation style",
									children: /* @__PURE__ */ jsxs(Select, {
										defaultValue: "short",
										children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }), /* @__PURE__ */ jsxs(SelectContent, { children: [
											/* @__PURE__ */ jsx(SelectItem, {
												value: "short",
												children: "Short"
											}),
											/* @__PURE__ */ jsx(SelectItem, {
												value: "detailed",
												children: "Detailed"
											}),
											/* @__PURE__ */ jsx(SelectItem, {
												value: "consultative",
												children: "Consultative"
											}),
											/* @__PURE__ */ jsx(SelectItem, {
												value: "persuasive",
												children: "Persuasive"
											})
										] })]
									})
								})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "space-y-5",
								children: [
									/* @__PURE__ */ jsx(SliderRow, {
										label: "Humor",
										v: humor,
										setV: setHumorState
									}),
									/* @__PURE__ */ jsx(SliderRow, {
										label: "Empathy",
										v: empathy,
										setV: setEmpathyState
									}),
									/* @__PURE__ */ jsx(SliderRow, {
										label: "Professionalism",
										v: professionalism,
										setV: setProfessionalismState
									}),
									/* @__PURE__ */ jsx(SliderRow, {
										label: "Confidence",
										v: confidence,
										setV: setConfidenceState
									})
								]
							})
						]
					}),
					step === 6 && /* @__PURE__ */ jsxs("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-semibold",
								children: "Choose a voice"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "Preview each voice — you can change it any time."
							})] }),
							/* @__PURE__ */ jsx("div", {
								className: "grid gap-3 sm:grid-cols-2 md:grid-cols-3",
								children: voices.map((v) => {
									const active = voice === v.name;
									return /* @__PURE__ */ jsxs("button", {
										onClick: () => {
											setVoice(v.name);
											updatePersonality({ voice: v.name });
										},
										className: `rounded-2xl border p-5 text-left transition ${active ? "" : "border-border/60"}`,
										style: active ? selectedStyle : void 0,
										children: [
											/* @__PURE__ */ jsxs("div", {
												className: "flex items-center justify-between",
												children: [/* @__PURE__ */ jsx("div", {
													className: "grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary/40 to-accent/40 text-lg font-semibold",
													children: v.name[0]
												}), /* @__PURE__ */ jsx(Button, {
													size: "icon",
													variant: "ghost",
													className: "h-8 w-8",
													children: /* @__PURE__ */ jsx(Play, { className: "h-4 w-4" })
												})]
											}),
											/* @__PURE__ */ jsx("div", {
												className: "mt-3 font-semibold",
												children: v.name
											}),
											/* @__PURE__ */ jsx("div", {
												className: "text-xs text-muted-foreground",
												children: v.tag
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "mt-2 flex items-center gap-1 text-xs text-muted-foreground",
												children: [
													/* @__PURE__ */ jsx(Globe, { className: "h-3 w-3" }),
													" ",
													v.accent
												]
											})
										]
									}, v.name);
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-4 md:grid-cols-3",
								children: [
									/* @__PURE__ */ jsx(Field, {
										label: "Accent",
										children: /* @__PURE__ */ jsxs(Select, {
											defaultValue: "american",
											children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }), /* @__PURE__ */ jsxs(SelectContent, { children: [
												/* @__PURE__ */ jsx(SelectItem, {
													value: "american",
													children: "American"
												}),
												/* @__PURE__ */ jsx(SelectItem, {
													value: "british",
													children: "British"
												}),
												/* @__PURE__ */ jsx(SelectItem, {
													value: "australian",
													children: "Australian"
												})
											] })]
										})
									}),
									/* @__PURE__ */ jsx(Field, {
										label: "Language",
										children: /* @__PURE__ */ jsxs(Select, {
											defaultValue: "en",
											children: [/* @__PURE__ */ jsx(SelectTrigger, { children: /* @__PURE__ */ jsx(SelectValue, {}) }), /* @__PURE__ */ jsxs(SelectContent, { children: [
												/* @__PURE__ */ jsx(SelectItem, {
													value: "en",
													children: "English"
												}),
												/* @__PURE__ */ jsx(SelectItem, {
													value: "es",
													children: "Spanish"
												}),
												/* @__PURE__ */ jsx(SelectItem, {
													value: "fr",
													children: "French"
												})
											] })]
										})
									}),
									/* @__PURE__ */ jsx(Field, {
										label: "Voice clone (coming soon)",
										children: /* @__PURE__ */ jsx(Button, {
											variant: "outline",
											disabled: true,
											children: "Upload sample"
										})
									})
								]
							})
						]
					}),
					step === 7 && /* @__PURE__ */ jsxs("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-semibold",
							children: "Design the call flow"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "Drag blocks onto the canvas and connect them."
						})] }), /* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 md:grid-cols-[200px_1fr]",
							children: [/* @__PURE__ */ jsxs(Card, {
								className: "glass p-3",
								children: [/* @__PURE__ */ jsx("div", {
									className: "mb-2 text-xs uppercase tracking-wider text-muted-foreground",
									children: "Blocks"
								}), /* @__PURE__ */ jsx("div", {
									className: "space-y-1.5",
									children: [
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
										"End Call"
									].map((b) => /* @__PURE__ */ jsx("button", {
										onClick: () => addCallFlowBlock(b),
										className: "cursor-pointer rounded-lg border border-border/60 px-3 py-1.5 text-xs hover:border-primary/60 text-foreground",
										children: b
									}, b))
								})]
							}), /* @__PURE__ */ jsx("div", {
								className: "relative min-h-[420px] rounded-2xl border border-border/60 grid-bg p-6",
								children: callFlow.length === 0 ? /* @__PURE__ */ jsx("div", {
									className: "flex h-full min-h-[360px] items-center justify-center text-sm text-muted-foreground",
									children: "Click blocks from the sidebar to build your call flow"
								}) : /* @__PURE__ */ jsx("div", {
									className: "space-y-3",
									children: callFlow.map((block, i) => /* @__PURE__ */ jsxs("div", {
										className: "flex items-center gap-3 rounded-xl border border-border/60 bg-primary/10 p-3 text-sm",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "grid h-7 w-7 place-items-center rounded-full bg-primary/20 text-xs font-semibold text-primary",
												children: i + 1
											}),
											/* @__PURE__ */ jsx("span", {
												className: "flex-1 font-medium",
												children: block
											}),
											/* @__PURE__ */ jsx("button", {
												onClick: () => removeCallFlowBlock(i),
												className: "text-muted-foreground hover:text-destructive",
												children: /* @__PURE__ */ jsxs("svg", {
													xmlns: "http://www.w3.org/2000/svg",
													className: "h-4 w-4",
													viewBox: "0 0 24 24",
													fill: "none",
													stroke: "currentColor",
													strokeWidth: "2",
													strokeLinecap: "round",
													strokeLinejoin: "round",
													children: [/* @__PURE__ */ jsx("path", { d: "M18 6 6 18" }), /* @__PURE__ */ jsx("path", { d: "m6 6 12 12" })]
												})
											})
										]
									}, block))
								})
							})]
						})]
					}),
					step === 8 && /* @__PURE__ */ jsxs("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-semibold",
								children: "Connect a phone number"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "Bring your own or buy a fresh one."
							})] }),
							/* @__PURE__ */ jsx("div", {
								className: "grid gap-3 md:grid-cols-4",
								children: [
									"Twilio",
									"Vapi",
									"Retell",
									"Bland AI",
									"Plivo",
									"Exotel",
									"Telnyx",
									"Custom SIP"
								].map((p) => /* @__PURE__ */ jsxs("button", {
									className: "rounded-xl border border-border/60 p-4 text-left hover:border-primary/50",
									children: [/* @__PURE__ */ jsx("div", {
										className: "font-medium",
										children: p
									}), /* @__PURE__ */ jsx("div", {
										className: "text-xs text-muted-foreground",
										children: "Not connected"
									})]
								}, p))
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-3 md:grid-cols-3",
								children: [
									/* @__PURE__ */ jsxs(Card, {
										className: "glass p-5",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "font-medium",
												children: "Buy a new number"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-1 text-xs text-muted-foreground",
												children: "From $2 / mo · 40+ countries"
											}),
											/* @__PURE__ */ jsx(Button, {
												className: "mt-3",
												variant: "outline",
												children: "Search numbers"
											})
										]
									}),
									/* @__PURE__ */ jsxs(Card, {
										className: "glass p-5",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "font-medium",
												children: "Connect existing"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-1 text-xs text-muted-foreground",
												children: "SIP trunk or provider port"
											}),
											/* @__PURE__ */ jsx(Button, {
												className: "mt-3",
												variant: "outline",
												children: "Add number"
											})
										]
									}),
									/* @__PURE__ */ jsxs(Card, {
										className: "glass p-5",
										children: [
											/* @__PURE__ */ jsx("div", {
												className: "font-medium",
												children: "Forward business line"
											}),
											/* @__PURE__ */ jsx("p", {
												className: "mt-1 text-xs text-muted-foreground",
												children: "Route overflow calls"
											}),
											/* @__PURE__ */ jsx(Button, {
												className: "mt-3",
												variant: "outline",
												children: "Set forwarding"
											})
										]
									})
								]
							})
						]
					}),
					step === 9 && /* @__PURE__ */ jsxs("div", {
						className: "space-y-6",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
							className: "text-xl font-semibold",
							children: "Your generated prompt"
						}), /* @__PURE__ */ jsx("p", {
							className: "text-sm text-muted-foreground",
							children: "Auto-generated from your business info, knowledge, and personality settings."
						})] }), /* @__PURE__ */ jsxs("div", {
							className: "overflow-hidden rounded-2xl border border-border/60 bg-[oklch(0.12_0.03_250)]",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between border-b border-border/60 px-4 py-2 text-xs",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-mono text-muted-foreground",
									children: "system_prompt.md"
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex gap-2",
									children: [/* @__PURE__ */ jsx(Button, {
										size: "sm",
										variant: "ghost",
										children: "Copy"
									}), /* @__PURE__ */ jsx(Button, {
										size: "sm",
										variant: "ghost",
										children: "Download"
									})]
								})]
							}), /* @__PURE__ */ jsx("pre", {
								className: "overflow-auto p-5 font-mono text-xs leading-relaxed text-foreground/90",
								children: `# ROLE
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
`
							})]
						})]
					}),
					step === 10 && /* @__PURE__ */ jsxs("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
								className: "text-xl font-semibold",
								children: "Review & deploy"
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm text-muted-foreground",
								children: "One last look before your agent goes live."
							})] }),
							/* @__PURE__ */ jsxs("div", {
								className: "grid gap-3 md:grid-cols-2",
								children: [
									/* @__PURE__ */ jsx(Summary, {
										label: "Business",
										value: businessName
									}),
									/* @__PURE__ */ jsx(Summary, {
										label: "Agent Type",
										value: selectedTypes.join(", ")
									}),
									/* @__PURE__ */ jsx(Summary, {
										label: "Voice",
										value: `${voice} · Professional`
									}),
									/* @__PURE__ */ jsx(Summary, {
										label: "Phone Number",
										value: "+1 (415) 555 0100"
									}),
									/* @__PURE__ */ jsx(Summary, {
										label: "Knowledge",
										value: "3 documents · 12 FAQs"
									}),
									/* @__PURE__ */ jsx(Summary, {
										label: "Est. Monthly Usage",
										value: "1,200 min · $79"
									})
								]
							}),
							/* @__PURE__ */ jsxs(Card, {
								className: "p-6 text-center brand-glow",
								style: { background: "var(--gradient-brand)" },
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "text-lg font-semibold text-brand-foreground",
										children: "Ready to go live"
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-1 text-sm text-brand-foreground/80",
										children: "Deploying takes about 30 seconds. Your agent will start answering immediately."
									}),
									/* @__PURE__ */ jsxs(Button, {
										size: "lg",
										variant: "secondary",
										className: "mt-4",
										onClick: handleDeploy,
										children: [/* @__PURE__ */ jsx(Rocket, { className: "mr-2 h-4 w-4" }), " Deploy agent"]
									})
								]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-8 flex items-center justify-between border-t border-border/60 pt-6",
						children: [
							/* @__PURE__ */ jsxs(Button, {
								variant: "outline",
								onClick: prev,
								disabled: step === 1 || savingDraft,
								children: [/* @__PURE__ */ jsx(ChevronLeft, { className: "mr-1 h-4 w-4" }), " Back"]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "text-xs text-muted-foreground",
								children: [
									"Step ",
									step,
									" of 10"
								]
							}),
							/* @__PURE__ */ jsxs(Button, {
								onClick: handleNext,
								children: ["Continue ", /* @__PURE__ */ jsx(ChevronRight, { className: "ml-1 h-4 w-4" })]
							})
						]
					})
				]
			})]
		})]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ jsx(Label, {
			className: "text-xs uppercase tracking-wider text-muted-foreground",
			children: label
		}), children]
	});
}
function SliderRow({ label, v, setV }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
		className: "mb-2 flex items-center justify-between text-sm",
		children: [/* @__PURE__ */ jsx("span", { children: label }), /* @__PURE__ */ jsx("span", {
			className: "text-muted-foreground",
			children: v[0]
		})]
	}), /* @__PURE__ */ jsx(Slider, {
		value: v,
		onValueChange: setV,
		max: 100,
		step: 1
	})] });
}
function Summary({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-xl border border-border/60 p-4",
		children: [/* @__PURE__ */ jsx("div", {
			className: "text-xs uppercase tracking-wider text-muted-foreground",
			children: label
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-1 font-medium",
			children: value
		})]
	});
}
//#endregion
export { CreateWizard as component };
