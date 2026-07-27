import { t as Card } from "./card-CMUgrADA.js";
import { t as Badge } from "./badge-DrmkgaLP.js";
import { t as Button } from "./button-D1WH43tQ.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-tt_XJYL6.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Activity, ArrowUpRight, Bot, CalendarCheck, ChevronUp, Clock, Database, DollarSign, Phone, PhoneIncoming, PhoneMissed, Plus, Shield, Sparkles, TrendingUp, Users, Zap } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
//#region src/routes/app.dashboard.tsx?tsr-split=component
var callsData = [];
var stats = [
	{
		label: "Total Calls",
		value: "—",
		delta: "No data",
		trend: "up",
		icon: Phone,
		color: "muted"
	},
	{
		label: "Active Agents",
		value: "0",
		delta: "No agents yet",
		trend: "up",
		icon: Bot,
		color: "muted"
	},
	{
		label: "Appointments",
		value: "—",
		delta: "No data",
		trend: "up",
		icon: CalendarCheck,
		color: "muted"
	},
	{
		label: "Revenue Impact",
		value: "—",
		delta: "No data",
		trend: "up",
		icon: DollarSign,
		color: "muted"
	},
	{
		label: "Missed Calls",
		value: "—",
		delta: "No data",
		trend: "down",
		icon: PhoneMissed,
		color: "muted"
	},
	{
		label: "Avg Duration",
		value: "—",
		delta: "No data",
		trend: "up",
		icon: Clock,
		color: "muted"
	},
	{
		label: "Lead Conversion",
		value: "—",
		delta: "No data",
		trend: "up",
		icon: TrendingUp,
		color: "muted"
	},
	{
		label: "CSAT Score",
		value: "—",
		delta: "No data",
		trend: "up",
		icon: Users,
		color: "muted"
	}
];
var recent = [];
var quickActions = [
	{
		label: "Create Agent",
		icon: Plus,
		to: "/app/create",
		color: "primary"
	},
	{
		label: "Upload Knowledge",
		icon: Database,
		to: "/app/knowledge",
		color: "accent"
	},
	{
		label: "View Analytics",
		icon: TrendingUp,
		to: "/app/analytics",
		color: "success"
	},
	{
		label: "Integrations",
		icon: Zap,
		to: "/app/integrations",
		color: "warning"
	}
];
function StatCard({ s }) {
	const colorMap = {
		primary: "bg-primary/12 text-primary",
		success: "bg-success/12 text-success",
		accent: "bg-accent/12 text-accent",
		muted: "bg-muted/50 text-muted-foreground",
		warning: "bg-warning/12 text-warning"
	};
	const deltaColor = s.trend === "down" && s.label !== "Missed Calls" ? "text-destructive" : s.label === "Missed Calls" && s.trend === "down" ? "text-success" : "text-success";
	return /* @__PURE__ */ jsxs(Card, {
		className: "glass card-hover group relative overflow-hidden p-5",
		children: [
			/* @__PURE__ */ jsx("div", { className: `absolute right-0 top-0 h-20 w-20 rounded-bl-3xl opacity-5 ${s.color === "primary" ? "bg-primary" : s.color === "success" ? "bg-success" : s.color === "accent" ? "bg-accent" : "bg-muted"}` }),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ jsx("div", {
					className: `grid h-10 w-10 place-items-center rounded-xl transition-transform duration-200 group-hover:scale-110 ${colorMap[s.color]}`,
					children: /* @__PURE__ */ jsx(s.icon, { className: "h-5 w-5" })
				}), /* @__PURE__ */ jsx(ChevronUp, { className: `h-4 w-4 transition-opacity ${deltaColor} opacity-0 group-hover:opacity-100` })]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-4",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "text-xs font-medium uppercase tracking-wider text-muted-foreground",
						children: s.label
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-1.5 text-2xl font-bold tracking-tight",
						children: s.value
					}),
					/* @__PURE__ */ jsxs("div", {
						className: `mt-1 flex items-center gap-1 text-xs font-medium ${deltaColor}`,
						children: [
							/* @__PURE__ */ jsx(TrendingUp, { className: "h-3 w-3" }),
							s.delta,
							" vs last month"
						]
					})
				]
			})
		]
	});
}
var CustomTooltip = ({ active, payload, label }) => {
	if (active && payload?.length) return /* @__PURE__ */ jsxs("div", {
		className: "rounded-xl border border-border/60 bg-popover p-3 shadow-xl",
		children: [/* @__PURE__ */ jsxs("p", {
			className: "mb-2 text-xs font-medium text-muted-foreground",
			children: ["Day ", label]
		}), payload.map((p) => /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2 text-sm",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "h-2 w-2 rounded-full",
					style: { background: p.color }
				}),
				/* @__PURE__ */ jsxs("span", {
					className: "capitalize text-muted-foreground",
					children: [p.name, ":"]
				}),
				/* @__PURE__ */ jsx("span", {
					className: "font-semibold",
					children: p.value
				})
			]
		}, p.name))]
	});
	return null;
};
function Dashboard() {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-8 animate-fade-in",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("div", {
						className: "mb-1 flex items-center gap-2",
						children: /* @__PURE__ */ jsx("span", {
							className: "text-xs font-medium text-success",
							children: "Dashboard"
						})
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "text-3xl font-bold tracking-tight",
						children: "Dashboard"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-1.5 max-w-xl text-sm text-muted-foreground",
						children: "Overview of your AI voice workforce."
					})
				] }), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ jsxs(Button, {
						variant: "outline",
						className: "h-9 border-border/60 text-sm",
						children: [/* @__PURE__ */ jsx(Activity, { className: "mr-2 h-3.5 w-3.5 text-success" }), "Live Monitor"]
					}), /* @__PURE__ */ jsx(Link, {
						to: "/app/create",
						children: /* @__PURE__ */ jsxs(Button, {
							className: "h-9 bg-primary text-primary-foreground text-sm font-medium shadow-md",
							children: [/* @__PURE__ */ jsx(Plus, { className: "mr-2 h-3.5 w-3.5" }), "New Agent"]
						})
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-4 md:grid-cols-4",
				children: stats.map((s) => /* @__PURE__ */ jsx(StatCard, { s }, s.label))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-6 lg:grid-cols-5",
				children: [/* @__PURE__ */ jsxs(Card, {
					className: "glass p-6 lg:col-span-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-6 flex items-center justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "font-semibold",
							children: "Call Volume"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: "Last 14 days — inbound + booked"
						})] }), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-primary" }), " Calls"]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5 text-xs text-muted-foreground",
									children: [/* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-accent" }), " Booked"]
								}),
								/* @__PURE__ */ jsxs(Badge, {
									variant: "outline",
									className: "text-[10px]",
									children: [/* @__PURE__ */ jsx(PhoneIncoming, { className: "mr-1 h-2.5 w-2.5 text-primary" }), "Live"]
								})
							]
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "h-64",
						children: /* @__PURE__ */ jsx(ResponsiveContainer, {
							width: "100%",
							height: "100%",
							children: /* @__PURE__ */ jsxs(AreaChart, {
								data: callsData,
								margin: {
									top: 4,
									right: 4,
									bottom: 0,
									left: -16
								},
								children: [
									/* @__PURE__ */ jsxs("defs", { children: [/* @__PURE__ */ jsxs("linearGradient", {
										id: "c1",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ jsx("stop", {
											offset: "0%",
											stopColor: "var(--color-primary)",
											stopOpacity: .5
										}), /* @__PURE__ */ jsx("stop", {
											offset: "100%",
											stopColor: "var(--color-primary)",
											stopOpacity: 0
										})]
									}), /* @__PURE__ */ jsxs("linearGradient", {
										id: "c2",
										x1: "0",
										y1: "0",
										x2: "0",
										y2: "1",
										children: [/* @__PURE__ */ jsx("stop", {
											offset: "0%",
											stopColor: "var(--color-accent)",
											stopOpacity: .4
										}), /* @__PURE__ */ jsx("stop", {
											offset: "100%",
											stopColor: "var(--color-accent)",
											stopOpacity: 0
										})]
									})] }),
									/* @__PURE__ */ jsx(CartesianGrid, {
										strokeDasharray: "3 3",
										stroke: "oklch(1 0 0 / 5%)",
										vertical: false
									}),
									/* @__PURE__ */ jsx(XAxis, {
										dataKey: "day",
										stroke: "oklch(1 0 0 / 30%)",
										fontSize: 11,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ jsx(YAxis, {
										stroke: "oklch(1 0 0 / 30%)",
										fontSize: 11,
										tickLine: false,
										axisLine: false
									}),
									/* @__PURE__ */ jsx(Tooltip, {
										content: /* @__PURE__ */ jsx(CustomTooltip, {}),
										cursor: {
											stroke: "oklch(1 0 0 / 8%)",
											strokeWidth: 1
										}
									}),
									/* @__PURE__ */ jsx(Area, {
										type: "monotone",
										dataKey: "calls",
										stroke: "var(--color-primary)",
										fill: "url(#c1)",
										strokeWidth: 2,
										dot: false
									}),
									/* @__PURE__ */ jsx(Area, {
										type: "monotone",
										dataKey: "booked",
										stroke: "var(--color-accent)",
										fill: "url(#c2)",
										strokeWidth: 2,
										dot: false
									})
								]
							})
						})
					})]
				}), /* @__PURE__ */ jsxs(Card, {
					className: "glass p-5 lg:col-span-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-4 flex items-center justify-between",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-semibold",
							children: "Recent Conversations"
						}), /* @__PURE__ */ jsxs(Link, {
							to: "/app/conversations",
							className: "flex items-center gap-1 text-xs font-medium text-primary transition hover:opacity-80",
							children: ["View all ", /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-3 w-3" })]
						})]
					}), recent.length === 0 ? /* @__PURE__ */ jsxs("div", {
						className: "text-center py-8",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm font-medium text-muted-foreground",
							children: "No conversations yet"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-xs text-muted-foreground/70",
							children: "Conversations will appear here once your agents start handling calls."
						})]
					}) : /* @__PURE__ */ jsx("div", {
						className: "space-y-1",
						children: recent.map((r) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 rounded-xl p-2.5 transition hover:bg-muted/30 cursor-pointer",
							children: [
								/* @__PURE__ */ jsx(Avatar, {
									className: "h-8 w-8 shrink-0",
									children: /* @__PURE__ */ jsx(AvatarFallback, {
										className: "bg-surface-2 text-xs font-medium",
										children: r.name.slice(0, 2).toUpperCase()
									})
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "min-w-0 flex-1",
									children: [/* @__PURE__ */ jsx("div", {
										className: "truncate text-xs font-semibold",
										children: r.name
									}), /* @__PURE__ */ jsxs("div", {
										className: "truncate text-[11px] text-muted-foreground",
										children: [
											r.agent,
											" · ",
											r.outcome
										]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-col items-end gap-1",
									children: [/* @__PURE__ */ jsx("span", {
										className: "text-[10px] text-muted-foreground",
										children: r.time
									}), /* @__PURE__ */ jsx("span", { className: `h-1.5 w-1.5 rounded-full ${r.status === "success" ? "bg-success" : r.status === "warn" ? "bg-warning" : "bg-muted-foreground/40"}` })]
								})
							]
						}, r.time))
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-4 md:grid-cols-2 lg:grid-cols-4",
				children: quickActions.map((a) => /* @__PURE__ */ jsx(Link, {
					to: a.to,
					children: /* @__PURE__ */ jsxs(Card, {
						className: "glass group h-full cursor-pointer p-4 transition hover:brand-glow",
						children: [
							/* @__PURE__ */ jsx("div", {
								className: `mb-3 grid h-10 w-10 place-items-center rounded-xl transition-transform duration-200 group-hover:scale-110 ${a.color === "primary" ? "bg-primary/15 text-primary" : a.color === "accent" ? "bg-accent/15 text-accent" : a.color === "success" ? "bg-success/15 text-success" : "bg-warning/15 text-warning"}`,
								children: /* @__PURE__ */ jsx(a.icon, { className: "h-5 w-5" })
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-sm font-semibold",
								children: a.label
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-1 flex items-center gap-1 text-xs text-primary opacity-0 transition-opacity group-hover:opacity-100",
								children: ["Open ", /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-3 w-3" })]
							})
						]
					})
				}, a.label))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 md:grid-cols-3",
				children: [
					/* @__PURE__ */ jsx(Card, {
						className: "glass p-5",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "grid h-11 w-11 place-items-center rounded-xl bg-primary/12 text-primary",
									children: /* @__PURE__ */ jsx(Database, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground",
											children: "Knowledge Base"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "mt-0.5 font-semibold",
											children: "No documents"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "mt-0.5 flex items-center gap-1 text-xs",
											children: [/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-muted-foreground/40" }), /* @__PURE__ */ jsx("span", {
												className: "text-muted-foreground",
												children: "Upload documents to get started"
											})]
										})
									]
								}),
								/* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4 text-muted-foreground" })
							]
						})
					}),
					/* @__PURE__ */ jsx(Card, {
						className: "glass p-5",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "grid h-11 w-11 place-items-center rounded-xl bg-success/12 text-success",
									children: /* @__PURE__ */ jsx(Phone, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground",
											children: "Phone Numbers"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "mt-0.5 font-semibold",
											children: "No numbers"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "mt-0.5 flex items-center gap-1 text-xs",
											children: [/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-muted-foreground/40" }), /* @__PURE__ */ jsx("span", {
												className: "text-muted-foreground",
												children: "Add a phone number to enable calls"
											})]
										})
									]
								}),
								/* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4 text-muted-foreground" })
							]
						})
					}),
					/* @__PURE__ */ jsx(Card, {
						className: "glass p-5",
						children: /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "grid h-11 w-11 place-items-center rounded-xl bg-accent/12 text-accent",
									children: /* @__PURE__ */ jsx(Shield, { className: "h-5 w-5" })
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "min-w-0 flex-1",
									children: [
										/* @__PURE__ */ jsx("div", {
											className: "text-xs text-muted-foreground",
											children: "Platform Security"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "mt-0.5 font-semibold",
											children: "Active"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "mt-0.5 flex items-center gap-1 text-xs",
											children: [/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-success" }), /* @__PURE__ */ jsx("span", {
												className: "text-success",
												children: "Encrypted · Standard compliance"
											})]
										})
									]
								}),
								/* @__PURE__ */ jsx(ArrowUpRight, { className: "h-4 w-4 text-muted-foreground" })
							]
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs(Card, {
				className: "relative overflow-hidden border border-border bg-surface p-5",
				children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 dot-pattern opacity-30" }), /* @__PURE__ */ jsxs("div", {
					className: "relative flex items-start gap-4",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/20 text-primary animate-glow-pulse",
							children: /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ jsx("div", {
								className: "text-sm font-semibold",
								children: "AI Recommendations"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: "Recommendations will appear here after analyzing your call data and agent performance."
							})]
						}),
						/* @__PURE__ */ jsx(Button, {
							variant: "outline",
							size: "sm",
							className: "shrink-0 border-primary/30 text-primary hover:bg-primary/10",
							children: "Apply"
						})
					]
				})]
			})
		]
	});
}
//#endregion
export { Dashboard as component };
