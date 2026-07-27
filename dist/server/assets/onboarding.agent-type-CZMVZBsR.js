import { o as db } from "./firebase-auth-4nYWua_o.js";
import { n as useAuth } from "./auth-context-D8TD5ErT.js";
import { t as Card } from "./card-CMUgrADA.js";
import { t as Badge } from "./badge-DrmkgaLP.js";
import { t as Button } from "./button-D1WH43tQ.js";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Bot, Check, ChevronRight, Sparkles, Waves } from "lucide-react";
//#region src/routes/onboarding.agent-type.tsx?tsr-split=component
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
function AgentTypeOnboarding() {
	const navigate = useNavigate();
	const { user, loading } = useAuth();
	const [selected, setSelected] = useState([]);
	const [saving, setSaving] = useState(false);
	useEffect(() => {
		if (!loading && !user) navigate({
			to: "/",
			replace: true
		});
	}, [
		user,
		loading,
		navigate
	]);
	const toggle = (type) => {
		setSelected((prev) => prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]);
	};
	const handleContinue = async () => {
		if (!user || selected.length === 0) return;
		setSaving(true);
		try {
			await setDoc(doc(db, "users", user.uid, "createAgentDrafts", "current"), {
				agentType: selected,
				updatedAt: serverTimestamp()
			}, { merge: true });
			navigate({
				to: "/app/dashboard",
				replace: true
			});
		} catch (error) {
			console.error("Failed to save agent type", error);
			navigate({
				to: "/app/dashboard",
				replace: true
			});
		} finally {
			setSaving(false);
		}
	};
	if (loading) return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-6 text-foreground",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3 rounded-2xl border border-border/60 bg-surface/70 px-5 py-4 shadow-xl backdrop-blur",
			children: [/* @__PURE__ */ jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" }), /* @__PURE__ */ jsx("span", {
				className: "text-sm text-muted-foreground",
				children: "Loading..."
			})]
		})
	});
	if (!user) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "relative min-h-screen overflow-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid-bg opacity-35" }),
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-x-0 top-0 h-[520px]",
				style: { background: "var(--gradient-glow)" }
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative mx-auto max-w-5xl px-6 py-10 lg:px-8",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-8 flex items-center gap-3",
					children: [/* @__PURE__ */ jsx("div", {
						className: "grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground brand-glow",
						children: /* @__PURE__ */ jsx(Waves, { className: "h-6 w-6" })
					}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "text-sm font-semibold",
						children: "VoiceForge AI"
					}), /* @__PURE__ */ jsx("div", {
						className: "text-xs text-muted-foreground",
						children: "Let's set up your workspace"
					})] })]
				}), /* @__PURE__ */ jsx(Card, {
					className: "glass overflow-hidden border-border/60 p-6 shadow-2xl md:p-8",
					children: /* @__PURE__ */ jsxs("div", {
						className: "space-y-6",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 text-sm font-medium text-primary",
									children: [/* @__PURE__ */ jsx(Bot, { className: "h-4 w-4" }), " Choose your agent type"]
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "mt-2 text-2xl font-bold",
									children: "What type of AI Voice Agent would you like to create?"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "Select one or multiple. Each agent can wear several hats."
								})
							] }),
							/* @__PURE__ */ jsx("div", {
								className: "grid gap-3 sm:grid-cols-2 md:grid-cols-3",
								children: agentTypes.map((type) => {
									const active = selected.includes(type);
									return /* @__PURE__ */ jsxs("button", {
										onClick: () => toggle(type),
										className: `rounded-xl border p-4 text-left transition ${active ? "border-primary bg-primary/10 brand-glow" : "border-border/60 hover:border-border"}`,
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ jsx("div", {
												className: "grid h-9 w-9 place-items-center rounded-lg bg-primary/15 text-primary",
												children: /* @__PURE__ */ jsx(Bot, { className: "h-4 w-4" })
											}), active && /* @__PURE__ */ jsx(Check, { className: "h-4 w-4 text-primary" })]
										}), /* @__PURE__ */ jsx("div", {
											className: "mt-3 font-medium",
											children: type
										})]
									}, type);
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between pt-4",
								children: [/* @__PURE__ */ jsxs(Badge, {
									variant: "secondary",
									className: "rounded-full border border-border px-3 py-1 text-xs",
									children: [
										/* @__PURE__ */ jsx(Sparkles, { className: "mr-1.5 h-3 w-3 text-primary" }),
										selected.length,
										" selected"
									]
								}), /* @__PURE__ */ jsx(Button, {
									onClick: handleContinue,
									disabled: selected.length === 0 || saving,
									className: "h-11 gap-2 bg-primary text-primary-foreground",
									children: saving ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" }), "Saving..."] }) : /* @__PURE__ */ jsxs(Fragment, { children: ["Continue", /* @__PURE__ */ jsx(ChevronRight, { className: "h-4 w-4" })] })
								})]
							})
						]
					})
				})]
			})
		]
	});
}
//#endregion
export { AgentTypeOnboarding as component };
