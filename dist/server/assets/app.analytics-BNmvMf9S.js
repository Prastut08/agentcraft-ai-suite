import { t as Card } from "./card-CMUgrADA.js";
import { t as Badge } from "./badge-DrmkgaLP.js";
import { t as Button } from "./button-D1WH43tQ.js";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select } from "./select-BNKCGG-n.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Calendar, CheckCircle, Clock, Download, Filter, TrendingDown, TrendingUp, Zap } from "lucide-react";
//#region src/routes/app.analytics.tsx?tsr-split=component
function Analytics() {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-8 animate-fade-in",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-3xl font-bold tracking-tight",
					children: "Analytics"
				}), /* @__PURE__ */ jsx("p", {
					className: "mt-1.5 text-sm text-muted-foreground",
					children: "Deep insights into how your voice workforce performs."
				})] }), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-2",
					children: [
						/* @__PURE__ */ jsxs(Select, {
							defaultValue: "7d",
							children: [/* @__PURE__ */ jsxs(SelectTrigger, {
								className: "h-9 w-[130px] border-border/60 bg-surface/60 text-sm",
								children: [/* @__PURE__ */ jsx(Calendar, { className: "mr-2 h-3.5 w-3.5" }), /* @__PURE__ */ jsx(SelectValue, {})]
							}), /* @__PURE__ */ jsxs(SelectContent, { children: [
								/* @__PURE__ */ jsx(SelectItem, {
									value: "1d",
									children: "Today"
								}),
								/* @__PURE__ */ jsx(SelectItem, {
									value: "7d",
									children: "Last 7 days"
								}),
								/* @__PURE__ */ jsx(SelectItem, {
									value: "30d",
									children: "Last 30 days"
								}),
								/* @__PURE__ */ jsx(SelectItem, {
									value: "90d",
									children: "Last quarter"
								})
							] })]
						}),
						/* @__PURE__ */ jsxs(Button, {
							variant: "outline",
							size: "sm",
							className: "h-9 border-border/60",
							children: [/* @__PURE__ */ jsx(Download, { className: "mr-2 h-3.5 w-3.5" }), "Export"]
						}),
						/* @__PURE__ */ jsxs(Button, {
							variant: "outline",
							size: "sm",
							className: "h-9 border-border/60",
							children: [/* @__PURE__ */ jsx(Filter, { className: "mr-2 h-3.5 w-3.5" }), "Filter"]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-4 md:grid-cols-4",
				children: [
					{
						l: "Success Rate",
						v: "—",
						d: "No data",
						t: "up",
						icon: CheckCircle,
						color: "muted"
					},
					{
						l: "Avg Response",
						v: "—",
						d: "No data",
						t: "up",
						icon: Zap,
						color: "muted"
					},
					{
						l: "Avg Call Length",
						v: "—",
						d: "No data",
						t: "up",
						icon: Clock,
						color: "muted"
					},
					{
						l: "Lead Conversion",
						v: "—",
						d: "No data",
						t: "up",
						icon: TrendingUp,
						color: "muted"
					}
				].map((s) => /* @__PURE__ */ jsxs(Card, {
					className: "glass p-5",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ jsx("span", {
								className: `text-xs font-medium uppercase tracking-wider text-muted-foreground`,
								children: s.l
							}), /* @__PURE__ */ jsx("div", {
								className: `grid h-8 w-8 place-items-center rounded-lg ${s.color === "muted" ? "bg-muted/50 text-muted-foreground" : s.color === "primary" ? "bg-primary/12 text-primary" : s.color === "success" ? "bg-success/12 text-success" : "bg-accent/12 text-accent"}`,
								children: /* @__PURE__ */ jsx(s.icon, { className: "h-4 w-4" })
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-3 text-2xl font-bold tracking-tight",
							children: s.v
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-1 flex items-center gap-1 text-xs font-medium text-muted-foreground",
							children: [
								s.t === "up" ? /* @__PURE__ */ jsx(TrendingUp, { className: "h-3 w-3" }) : /* @__PURE__ */ jsx(TrendingDown, { className: "h-3 w-3" }),
								s.d,
								" vs last period"
							]
						})
					]
				}, s.l))
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-6 lg:grid-cols-5",
				children: [/* @__PURE__ */ jsxs(Card, {
					className: "glass p-6 lg:col-span-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-5 flex items-center justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "font-semibold",
							children: "Weekly Call Volume"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: "Calls received, booked, and resolved"
						})] }), /* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3 text-xs text-muted-foreground",
							children: [/* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ jsx("span", { className: "h-2.5 w-2.5 rounded-sm bg-primary" }), "Calls"]
							}), /* @__PURE__ */ jsxs("span", {
								className: "flex items-center gap-1.5",
								children: [/* @__PURE__ */ jsx("span", { className: "h-2.5 w-2.5 rounded-sm bg-accent" }), "Booked"]
							})]
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "h-64 flex items-center justify-center",
						children: /* @__PURE__ */ jsxs("div", {
							className: "text-center",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium text-muted-foreground",
								children: "No analytics data yet"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs text-muted-foreground/70",
								children: "Call data will appear here once available."
							})]
						})
					})]
				}), /* @__PURE__ */ jsxs(Card, {
					className: "glass p-6 lg:col-span-2",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "mb-4 font-semibold",
						children: "Caller Sentiment"
					}), /* @__PURE__ */ jsx("div", {
						className: "h-48 flex items-center justify-center",
						children: /* @__PURE__ */ jsxs("div", {
							className: "text-center",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium text-muted-foreground",
								children: "No sentiment data yet"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs text-muted-foreground/70",
								children: "Sentiment breakdown will appear here."
							})]
						})
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ jsxs(Card, {
					className: "glass p-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-5 flex items-center justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "font-semibold",
							children: "Success Rate Trend"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: "30-day rolling average"
						})] }), /* @__PURE__ */ jsx(Badge, {
							className: "bg-muted/50 text-muted-foreground border-border",
							children: "—"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "h-52 flex items-center justify-center",
						children: /* @__PURE__ */ jsxs("div", {
							className: "text-center",
							children: [/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium text-muted-foreground",
								children: "No trend data yet"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs text-muted-foreground/70",
								children: "Trend data will appear once available."
							})]
						})
					})]
				}), /* @__PURE__ */ jsxs(Card, {
					className: "glass p-6",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-5 flex items-center justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
							className: "font-semibold",
							children: "Top Questions Asked"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-0.5 text-xs text-muted-foreground",
							children: "Most frequent caller inquiries"
						})] }), /* @__PURE__ */ jsx(Badge, {
							variant: "outline",
							className: "text-xs",
							children: "This week"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "text-center py-8",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-sm font-medium text-muted-foreground",
							children: "No questions data yet"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-xs text-muted-foreground/70",
							children: "Top questions will appear here once available."
						})]
					})]
				})]
			}),
			/* @__PURE__ */ jsxs(Card, {
				className: "glass p-6",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-5 flex items-center justify-between",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
						className: "font-semibold",
						children: "Agent Performance Breakdown"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-0.5 text-xs text-muted-foreground",
						children: "Individual agent metrics this period"
					})] }), /* @__PURE__ */ jsx(Button, {
						variant: "outline",
						size: "sm",
						className: "border-border/60 text-xs",
						children: "View detailed report"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "text-center py-8",
					children: [/* @__PURE__ */ jsx("p", {
						className: "text-sm font-medium text-muted-foreground",
						children: "No agent data yet"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-xs text-muted-foreground/70",
						children: "Agent performance metrics will appear here once available."
					})]
				})]
			})
		]
	});
}
//#endregion
export { Analytics as component };
