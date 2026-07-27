import { o as db } from "./firebase-auth-4nYWua_o.js";
import { n as useAuth } from "./auth-context-D8TD5ErT.js";
import { t as Card } from "./card-CMUgrADA.js";
import { t as Badge } from "./badge-DrmkgaLP.js";
import { t as Button } from "./button-D1WH43tQ.js";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc, updateDoc } from "firebase/firestore";
import { Activity, ArrowUpRight, Bot, Loader2, Phone, Plus, Settings2, Star, Trash2 } from "lucide-react";
//#region src/routes/app.agents.tsx?tsr-split=component
var statusConfig = {
	Live: {
		label: "Live",
		dot: "bg-success",
		badge: "bg-success/12 text-success border-success/20"
	},
	Paused: {
		label: "Paused",
		dot: "bg-warning",
		badge: "bg-warning/12 text-warning border-warning/20"
	},
	Draft: {
		label: "Draft",
		dot: "bg-muted-foreground",
		badge: "bg-muted/50 text-muted-foreground border-border"
	}
};
function HealthBar({ value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-center gap-2",
		children: [/* @__PURE__ */ jsx("div", {
			className: "h-1.5 flex-1 overflow-hidden rounded-full bg-muted/50",
			children: /* @__PURE__ */ jsx("div", {
				className: `h-full rounded-full transition-all duration-700 ${value >= 90 ? "bg-success" : value >= 70 ? "bg-warning" : "bg-muted-foreground/40"}`,
				style: { width: `${value}%` }
			})
		}), /* @__PURE__ */ jsx("span", {
			className: "w-8 text-right text-xs font-medium text-muted-foreground",
			children: value || "—"
		})]
	});
}
function Agents() {
	const { user } = useAuth();
	const [agents, setAgents] = useState([]);
	const [loading, setLoading] = useState(true);
	const [simulating, setSimulating] = useState(null);
	useEffect(() => {
		if (!user) return;
		return onSnapshot(collection(db, "users", user.uid, "agents"), (snapshot) => {
			const list = [];
			snapshot.forEach((doc) => {
				list.push({
					id: doc.id,
					...doc.data()
				});
			});
			setAgents(list);
			setLoading(false);
		}, (err) => {
			console.error("Failed to fetch agents", err);
			setLoading(false);
		});
	}, [user]);
	const handleToggleStatus = async (agent) => {
		if (!user) return;
		const nextStatus = agent.status === "Live" ? "Paused" : "Live";
		try {
			await updateDoc(doc(db, "users", user.uid, "agents", agent.id), { status: nextStatus });
			toast.success(`Agent ${agent.name} is now ${nextStatus.toLowerCase()}!`);
		} catch (err) {
			console.error(err);
			toast.error("Failed to toggle agent status.");
		}
	};
	const handleDelete = async (agentId, name) => {
		if (!user || !confirm(`Are you sure you want to delete ${name}?`)) return;
		try {
			await deleteDoc(doc(db, "users", user.uid, "agents", agentId));
			toast.success(`Agent ${name} deleted successfully.`);
		} catch (err) {
			console.error(err);
			toast.error("Failed to delete agent.");
		}
	};
	const handleTestCall = async (agent) => {
		if (!user) return;
		setSimulating(agent.id);
		try {
			const newConvoDoc = doc(collection(db, "users", user.uid, "conversations"));
			const outcomes = [
				"Appointment booked",
				"Resolved FAQ",
				"Lead qualified",
				"Escalated to human"
			];
			const names = [
				"John Doe",
				"Jane Smith",
				"Robert Johnson",
				"Emily Davis"
			];
			const selectedName = names[Math.floor(Math.random() * names.length)];
			const selectedOutcome = outcomes[Math.floor(Math.random() * outcomes.length)];
			const callerNumber = `+1 (415) 555-01${Math.floor(Math.random() * 90) + 10}`;
			const newConvo = {
				id: newConvoDoc.id,
				name: selectedName,
				agent: agent.name,
				time: "Just now",
				dur: `${Math.floor(Math.random() * 3) + 1}m ${Math.floor(Math.random() * 50) + 10}s`,
				outcome: selectedOutcome,
				score: Math.floor(Math.random() * 3) + 8,
				sentiment: ["pos", "neu"][Math.floor(Math.random() * 2)],
				summary: `Caller ${selectedName} inquired about business details and services. Agent ${agent.name} successfully handled the query resulting in: ${selectedOutcome}.`,
				actionItems: ["Review details in dashboard", "Update client log"],
				transcript: [
					{
						s: "Caller",
						t: "Hello, I wanted to ask about your business hours and if I can schedule a visit."
					},
					{
						s: agent.name,
						t: `Hi! Yes, I can certainly help you with that. We are open Monday to Friday from 9 AM to 6 PM. What day would you like to schedule a visit?`
					},
					{
						s: "Caller",
						t: "How about tomorrow morning around 10 AM?"
					},
					{
						s: agent.name,
						t: "Let me check the calendar. Yes! We have that slot open. I've booked that slot for you under your name."
					},
					{
						s: "Caller",
						t: "Awesome, thank you so much!"
					},
					{
						s: agent.name,
						t: "You're welcome! We have sent a confirmation message. Have a wonderful day!"
					}
				],
				createdAt: serverTimestamp()
			};
			await setDoc(newConvoDoc, newConvo);
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
				createdAt: serverTimestamp()
			});
			await updateDoc(doc(db, "users", user.uid, "agents", agent.id), {
				calls: (agent.calls || 0) + 1,
				csat: Number((((agent.csat || 4.5) * (agent.calls || 0) + newConvo.score / 2) / ((agent.calls || 0) + 1)).toFixed(1))
			});
			toast.success(`Mock call simulated with ${agent.name}! Log and transcript created.`);
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
	const avgCsat = agents.length ? (agents.reduce((sum, a) => sum + (a.csat || 0), 0) / agents.filter((a) => (a.csat || 0) > 0).length || 5).toFixed(1) : "0.0";
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-8 animate-fade-in",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-3xl font-bold tracking-tight",
					children: "My Agents"
				}), /* @__PURE__ */ jsxs("p", {
					className: "mt-1.5 text-sm text-muted-foreground",
					children: [
						agents.length,
						" agent",
						agents.length !== 1 ? "s" : "",
						" · ",
						liveCount,
						" ",
						"live · ",
						pausedCount,
						" paused · ",
						draftCount,
						" draft"
					]
				})] }), /* @__PURE__ */ jsx("div", {
					className: "flex gap-2",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/app/create",
						children: /* @__PURE__ */ jsxs(Button, {
							size: "sm",
							className: "bg-primary text-primary-foreground font-medium shadow-md",
							children: [/* @__PURE__ */ jsx(Plus, { className: "mr-2 h-3.5 w-3.5" }), "New Agent"]
						})
					})
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-4 md:grid-cols-4",
				children: [
					{
						label: "Total Agents",
						val: agents.length.toString(),
						icon: Bot,
						trend: agents.length > 0 ? `${liveCount} live` : "None yet"
					},
					{
						label: "Live Agents",
						val: liveCount.toString(),
						icon: Activity,
						trend: "Active now"
					},
					{
						label: "Total Calls",
						val: totalCalls.toLocaleString(),
						icon: Phone,
						trend: agents.length > 0 ? "All time" : "No calls yet"
					},
					{
						label: "Avg CSAT",
						val: `${avgCsat} / 5.0`,
						icon: Star,
						trend: "Continual refinement"
					}
				].map((s) => /* @__PURE__ */ jsxs(Card, {
					className: "glass p-4",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-xs text-muted-foreground",
								children: s.label
							}), /* @__PURE__ */ jsx(s.icon, { className: "h-4 w-4 text-muted-foreground" })]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-2 text-xl font-bold",
							children: s.val
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-1 text-[10px] text-muted-foreground",
							children: s.trend
						})
					]
				}, s.label))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-5 md:grid-cols-2 lg:grid-cols-3",
				children: [loading ? /* @__PURE__ */ jsxs("div", {
					className: "col-span-full py-12 flex justify-center items-center gap-2",
					children: [/* @__PURE__ */ jsx(Loader2, { className: "h-6 w-6 animate-spin text-primary" }), /* @__PURE__ */ jsx("span", {
						className: "text-sm text-muted-foreground",
						children: "Loading agents..."
					})]
				}) : agents.length === 0 ? /* @__PURE__ */ jsxs(Card, {
					className: "glass col-span-full flex flex-col items-center justify-center gap-4 p-10 text-center",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "grid h-16 w-16 place-items-center rounded-2xl bg-muted/50 text-muted-foreground",
							children: /* @__PURE__ */ jsx(Bot, { className: "h-8 w-8" })
						}),
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-base font-semibold text-muted-foreground",
							children: "No agents yet"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-sm text-muted-foreground/70",
							children: "Create your first AI voice agent to get started."
						})] }),
						/* @__PURE__ */ jsx(Link, {
							to: "/app/create",
							children: /* @__PURE__ */ jsxs(Button, {
								size: "sm",
								className: "bg-primary text-primary-foreground font-medium shadow-md",
								children: [/* @__PURE__ */ jsx(Plus, { className: "mr-2 h-3.5 w-3.5" }), "Create Your First Agent"]
							})
						})
					]
				}) : agents.map((a) => {
					const sc = statusConfig[a.status] || statusConfig.Live;
					return /* @__PURE__ */ jsxs(Card, {
						className: "glass card-hover group flex flex-col overflow-hidden",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "p-5 pb-4",
								children: [
									/* @__PURE__ */ jsxs("div", {
										className: "flex items-start justify-between",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center gap-3",
											children: [/* @__PURE__ */ jsxs("div", {
												className: "relative grid h-14 w-14 place-items-center rounded-2xl bg-surface-2 border border-border text-2xl font-bold text-foreground shadow-sm",
												children: [a.name[0], /* @__PURE__ */ jsx("span", { className: `absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-card ${sc.dot} ${a.status === "Live" ? "animate-pulse" : ""}` })]
											}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
												className: "font-bold leading-tight",
												children: a.name
											}), /* @__PURE__ */ jsx("div", {
												className: "mt-0.5 text-xs text-muted-foreground",
												children: a.role
											})] })]
										}), /* @__PURE__ */ jsx(Button, {
											size: "icon",
											variant: "ghost",
											className: "h-8 w-8 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 hover:text-destructive",
											onClick: () => handleDelete(a.id, a.name),
											children: /* @__PURE__ */ jsx(Trash2, { className: "h-4 w-4" })
										})]
									}),
									/* @__PURE__ */ jsx("p", {
										className: "mt-3 text-xs leading-relaxed text-muted-foreground",
										children: a.desc
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "mt-3 flex items-center gap-2",
										children: [/* @__PURE__ */ jsxs(Badge, {
											className: `rounded-full border px-2 py-0.5 text-[10px] font-semibold ${sc.badge}`,
											children: [/* @__PURE__ */ jsx("span", { className: `mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${sc.dot}` }), sc.label]
										}), a.number !== "—" && /* @__PURE__ */ jsxs("span", {
											className: "flex items-center gap-1 text-xs text-muted-foreground",
											children: [/* @__PURE__ */ jsx(Phone, { className: "h-3 w-3" }), a.number]
										})]
									})
								]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "border-t border-border/50 px-5 py-3",
								children: /* @__PURE__ */ jsxs("div", {
									className: "grid grid-cols-3 gap-3 text-center",
									children: [
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground",
											children: "Calls"
										}), /* @__PURE__ */ jsx("div", {
											className: "mt-0.5 text-sm font-bold",
											children: a.calls || 0
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground",
											children: "CSAT"
										}), /* @__PURE__ */ jsx("div", {
											className: "mt-0.5 text-sm font-bold",
											children: a.csat || "—"
										})] }),
										/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground",
											children: "Knowledge"
										}), /* @__PURE__ */ jsx("div", {
											className: "mt-0.5 text-[11px] font-semibold",
											children: a.knowledge || "Ingested"
										})] })
									]
								})
							}),
							a.status !== "Draft" && /* @__PURE__ */ jsxs("div", {
								className: "px-5 py-2",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "mb-1 flex items-center justify-between text-[10px] text-muted-foreground",
									children: [/* @__PURE__ */ jsx("span", { children: "Health score" }), /* @__PURE__ */ jsxs("span", {
										className: "font-medium",
										children: [a.health || 100, "%"]
									})]
								}), /* @__PURE__ */ jsx(HealthBar, { value: a.health || 100 })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-auto flex gap-2 border-t border-border/50 p-4",
								children: [
									/* @__PURE__ */ jsxs(Button, {
										size: "sm",
										variant: "outline",
										className: "flex-1 border-border/60 text-xs",
										onClick: () => handleToggleStatus(a),
										children: [/* @__PURE__ */ jsx(Settings2, { className: "mr-1.5 h-3 w-3" }), a.status === "Live" ? "Pause" : "Activate"]
									}),
									/* @__PURE__ */ jsxs(Button, {
										size: "sm",
										className: "flex-1 bg-primary/15 text-primary text-xs hover:bg-primary/25",
										onClick: () => handleTestCall(a),
										disabled: simulating === a.id,
										children: [simulating === a.id ? /* @__PURE__ */ jsx(Loader2, { className: "mr-1.5 h-3 w-3 animate-spin" }) : /* @__PURE__ */ jsx(Bot, { className: "mr-1.5 h-3 w-3" }), simulating === a.id ? "Calling..." : "Test Call"]
									}),
									a.status === "Live" && /* @__PURE__ */ jsx(Button, {
										size: "sm",
										variant: "ghost",
										className: "shrink-0 text-xs text-muted-foreground",
										children: /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-3.5 w-3.5" })
									})
								]
							})
						]
					}, a.id);
				}), /* @__PURE__ */ jsx(Link, {
					to: "/app/create",
					className: "h-full",
					children: /* @__PURE__ */ jsxs(Card, {
						className: "flex h-full min-h-[280px] flex-col items-center justify-center gap-4 border-dashed border-border/50 bg-transparent p-8 text-center transition hover:border-primary/40 hover:bg-primary/4",
						children: [/* @__PURE__ */ jsx("div", {
							className: "grid h-14 w-14 place-items-center rounded-2xl border-2 border-dashed border-border/60 text-muted-foreground transition hover:border-primary/50 hover:text-primary",
							children: /* @__PURE__ */ jsx(Plus, { className: "h-6 w-6" })
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "font-semibold text-muted-foreground",
							children: "Create New Agent"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-xs text-muted-foreground/70",
							children: "Deploy your next AI employee in minutes"
						})] })]
					})
				})]
			})
		]
	});
}
//#endregion
export { Agents as component };
