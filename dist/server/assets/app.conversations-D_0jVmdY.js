import { t as Card } from "./card-CMUgrADA.js";
import { t as Badge } from "./badge-DrmkgaLP.js";
import { t as Button } from "./button-D1WH43tQ.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-tt_XJYL6.js";
import { t as Input } from "./input-tDEmLj55.js";
import { useState } from "react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Bot, Clock, Copy, Download, Filter, PhoneIncoming, Play, Search, Sparkles } from "lucide-react";
//#region src/routes/app.conversations.tsx?tsr-split=component
function ScoreRing({ score }) {
	const radius = 16;
	const stroke = 2.5;
	const normalizedRadius = radius - stroke;
	const circumference = normalizedRadius * 2 * Math.PI;
	const percent = score > 10 ? score : score * 10;
	const strokeDashoffset = circumference - percent / 100 * circumference;
	const color = percent >= 80 ? "stroke-success text-success" : percent >= 50 ? "stroke-warning text-warning" : "stroke-destructive text-destructive";
	return /* @__PURE__ */ jsxs("svg", {
		height: radius * 2,
		width: radius * 2,
		className: "-rotate-90",
		children: [/* @__PURE__ */ jsx("circle", {
			stroke: "hsl(var(--border))",
			fill: "transparent",
			strokeWidth: stroke,
			r: normalizedRadius,
			cx: radius,
			cy: radius,
			className: "opacity-20"
		}), /* @__PURE__ */ jsx("circle", {
			stroke: "currentColor",
			fill: "transparent",
			strokeWidth: stroke,
			strokeDasharray: circumference + " " + circumference,
			style: { strokeDashoffset },
			r: normalizedRadius,
			cx: radius,
			cy: radius,
			className: `${color} transition-all duration-300`
		})]
	});
}
function Conversations() {
	const convos = [];
	const [selected, setSelected] = useState(null);
	const active = selected !== null ? convos[selected] : null;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6 animate-fade-in",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-wrap items-end justify-between gap-4",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-3xl font-bold tracking-tight",
				children: "Conversations"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-1.5 text-sm text-muted-foreground",
				children: "Full transcripts, sentiment analysis, and call outcomes."
			})] }), /* @__PURE__ */ jsxs("div", {
				className: "flex gap-2",
				children: [/* @__PURE__ */ jsxs(Button, {
					variant: "outline",
					size: "sm",
					className: "border-border/60",
					children: [/* @__PURE__ */ jsx(Filter, { className: "mr-2 h-3.5 w-3.5" }), "Filter"]
				}), /* @__PURE__ */ jsxs(Button, {
					variant: "outline",
					size: "sm",
					className: "border-border/60",
					children: [/* @__PURE__ */ jsx(Download, { className: "mr-2 h-3.5 w-3.5" }), "Export CSV"]
				})]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "grid gap-5 lg:grid-cols-[340px_1fr]",
			children: [/* @__PURE__ */ jsxs(Card, {
				className: "glass overflow-hidden",
				children: [/* @__PURE__ */ jsx("div", {
					className: "border-b border-border/50 p-3",
					children: /* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
							placeholder: "Search calls…",
							className: "h-8 border-border/50 bg-surface/60 pl-9 text-xs"
						})]
					})
				}), /* @__PURE__ */ jsx("div", {
					className: "divide-y divide-border/30 overflow-y-auto max-h-[600px]",
					children: convos.length === 0 ? /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center justify-center py-16 text-center",
						children: [
							/* @__PURE__ */ jsx(PhoneIncoming, { className: "mb-3 h-10 w-10 text-muted-foreground/40" }),
							/* @__PURE__ */ jsx("p", {
								className: "text-sm font-medium text-muted-foreground",
								children: "No conversations yet"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-1 text-xs text-muted-foreground/70",
								children: "Incoming calls will appear here automatically."
							})
						]
					}) : convos.map((c, i) => /* @__PURE__ */ jsxs("button", {
						onClick: () => setSelected(i),
						className: `flex w-full items-center gap-3 p-3.5 text-left transition hover:bg-muted/30 ${i === selected ? "bg-primary/8 border-l-2 border-l-primary" : "border-l-2 border-l-transparent"}`,
						children: [
							/* @__PURE__ */ jsx("div", {
								className: "relative",
								children: /* @__PURE__ */ jsx(Avatar, {
									className: "h-9 w-9 shrink-0",
									children: /* @__PURE__ */ jsx(AvatarFallback, {
										className: "bg-surface-2 text-xs font-medium",
										children: c.name.slice(0, 2).toUpperCase()
									})
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "flex items-center justify-between",
									children: [/* @__PURE__ */ jsx("span", {
										className: "truncate text-sm font-semibold",
										children: c.name
									}), /* @__PURE__ */ jsx("span", {
										className: "shrink-0 text-[10px] text-muted-foreground",
										children: c.time
									})]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ jsx(Bot, { className: "h-3 w-3" }),
										/* @__PURE__ */ jsx("span", { children: c.agent }),
										/* @__PURE__ */ jsx("span", { children: "·" }),
										/* @__PURE__ */ jsx("span", { children: c.outcome }),
										/* @__PURE__ */ jsx("span", { children: "·" }),
										/* @__PURE__ */ jsx(Clock, { className: "h-3 w-3" }),
										/* @__PURE__ */ jsx("span", { children: c.dur })
									]
								})]
							}),
							/* @__PURE__ */ jsx("div", {
								className: "relative shrink-0",
								children: c.score !== void 0 && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(ScoreRing, { score: c.score }), /* @__PURE__ */ jsx("span", {
									className: "absolute inset-0 flex items-center justify-center text-[8px] font-bold",
									children: c.score
								})] })
							})
						]
					}, i))
				})]
			}), /* @__PURE__ */ jsx(Card, {
				className: "glass flex flex-col overflow-hidden",
				children: !active ? /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col items-center justify-center py-24 text-center",
					children: [
						/* @__PURE__ */ jsx(PhoneIncoming, { className: "mb-3 h-12 w-12 text-muted-foreground/40" }),
						/* @__PURE__ */ jsx("p", {
							className: "text-sm font-medium text-muted-foreground",
							children: "Select a conversation to view transcript"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1 text-xs text-muted-foreground/70",
							children: "Choose a call from the list to see details."
						})
					]
				}) : /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsxs("div", {
						className: "border-b border-border/50 p-5",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-start justify-between gap-4",
							children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ jsx(Avatar, {
									className: "h-10 w-10",
									children: /* @__PURE__ */ jsx(AvatarFallback, {
										className: "bg-surface-2 border border-border text-sm font-semibold text-foreground",
										children: active.name.slice(0, 2).toUpperCase()
									})
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
									className: "font-bold",
									children: active.name
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-1.5 text-xs text-muted-foreground",
									children: [
										/* @__PURE__ */ jsx(PhoneIncoming, { className: "h-3 w-3" }),
										/* @__PURE__ */ jsxs("span", { children: ["via ", active.agent] }),
										/* @__PURE__ */ jsx("span", { children: "·" }),
										/* @__PURE__ */ jsxs("span", { children: ["Today ", active.time] }),
										/* @__PURE__ */ jsx("span", { children: "·" }),
										/* @__PURE__ */ jsx("span", { children: active.dur })
									]
								})] })]
							}), /* @__PURE__ */ jsxs("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ jsx(Badge, {
										className: `rounded-full border px-2.5 text-[10px] font-semibold ${active.outcomeBadge || "bg-muted/50 text-muted-foreground border-border"}`,
										children: active.outcome
									}),
									/* @__PURE__ */ jsxs(Badge, {
										variant: "outline",
										className: "text-[10px]",
										children: ["Lead score ", active.score]
									}),
									/* @__PURE__ */ jsxs(Badge, {
										variant: "outline",
										className: "text-[10px]",
										children: [
											active.sentiment === "pos" ? "Positive" : active.sentiment === "neu" ? "Neutral" : "Negative",
											" ",
											"sentiment"
										]
									})
								]
							})] }), /* @__PURE__ */ jsxs("div", {
								className: "flex gap-2",
								children: [
									/* @__PURE__ */ jsxs(Button, {
										variant: "outline",
										size: "sm",
										className: "border-border/60",
										children: [/* @__PURE__ */ jsx(Play, { className: "mr-1.5 h-3.5 w-3.5" }), "Play Audio"]
									}),
									/* @__PURE__ */ jsxs(Button, {
										variant: "outline",
										size: "sm",
										className: "border-border/60",
										children: [/* @__PURE__ */ jsx(Download, { className: "mr-1.5 h-3.5 w-3.5" }), "Transcript"]
									}),
									/* @__PURE__ */ jsx(Button, {
										variant: "outline",
										size: "sm",
										className: "border-border/60",
										children: /* @__PURE__ */ jsx(Copy, { className: "h-3.5 w-3.5" })
									})
								]
							})]
						}), /* @__PURE__ */ jsxs("div", {
							className: "mt-4 flex h-10 items-center gap-1 overflow-hidden rounded-xl bg-muted/30 px-4",
							children: [
								/* @__PURE__ */ jsx(Button, {
									size: "icon",
									variant: "ghost",
									className: "h-7 w-7 shrink-0 text-primary",
									children: /* @__PURE__ */ jsx(Play, { className: "h-4 w-4" })
								}),
								/* @__PURE__ */ jsx("div", {
									className: "flex flex-1 items-end gap-0.5 px-2",
									children: Array.from({ length: 60 }, (_, i) => /* @__PURE__ */ jsx("div", {
										className: "w-px rounded-full bg-primary/40 transition-all",
										style: { height: `${8 + Math.sin(i * .4) * 6 + Math.random() * 10}px` }
									}, i))
								}),
								/* @__PURE__ */ jsx("span", {
									className: "shrink-0 text-xs tabular-nums text-muted-foreground",
									children: "3:42"
								})
							]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "flex-1 overflow-y-auto p-5",
						children: /* @__PURE__ */ jsx("div", {
							className: "space-y-4",
							children: active.transcript?.map((m, i) => {
								const isAgent = m.s === active.agent;
								return /* @__PURE__ */ jsxs("div", {
									className: `flex gap-3 ${isAgent ? "" : "flex-row-reverse"}`,
									children: [/* @__PURE__ */ jsx(Avatar, {
										className: "h-8 w-8 shrink-0",
										children: /* @__PURE__ */ jsx(AvatarFallback, {
											className: `text-xs font-semibold ${isAgent ? "bg-primary/20 text-primary" : "bg-surface-2"}`,
											children: m.s[0]
										})
									}), /* @__PURE__ */ jsxs("div", {
										className: `max-w-[72%] space-y-1`,
										children: [/* @__PURE__ */ jsx("div", {
											className: `text-[10px] font-medium ${isAgent ? "text-primary" : "text-muted-foreground"} ${isAgent ? "" : "text-right"}`,
											children: m.s
										}), /* @__PURE__ */ jsx("div", {
											className: `rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${isAgent ? "rounded-tl-sm bg-primary/10 text-foreground" : "rounded-tr-sm bg-surface-2 text-foreground"}`,
											children: m.t
										})]
									})]
								}, i);
							})
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "border-t border-border/50 p-5",
						children: /* @__PURE__ */ jsxs("div", {
							className: "grid gap-3 md:grid-cols-3",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "rounded-xl border border-border/50 bg-muted/10 p-3",
									children: [/* @__PURE__ */ jsxs("div", {
										className: "mb-1.5 flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
										children: [/* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3 text-primary" }), "AI Summary"]
									}), /* @__PURE__ */ jsx("p", {
										className: "text-xs leading-relaxed",
										children: active.summary || "No summary available."
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "rounded-xl border border-border/50 bg-muted/10 p-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
										children: "Action Items"
									}), /* @__PURE__ */ jsx("ul", {
										className: "space-y-1 text-xs",
										children: /* @__PURE__ */ jsxs("li", {
											className: "flex items-center gap-1.5",
											children: [/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-success" }), active.actionItems?.length ? active.actionItems.join(", ") : "No action items recorded."]
										})
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "rounded-xl border border-border/50 bg-muted/10 p-3",
									children: [/* @__PURE__ */ jsx("div", {
										className: "mb-1.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
										children: "CRM Sync"
									}), /* @__PURE__ */ jsxs("div", {
										className: "space-y-1 text-xs",
										children: [/* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-muted-foreground",
												children: "Contact"
											}), /* @__PURE__ */ jsx(Badge, {
												className: "bg-muted/50 text-muted-foreground text-[9px]",
												children: "Pending"
											})]
										}), /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-between",
											children: [/* @__PURE__ */ jsx("span", {
												className: "text-muted-foreground",
												children: "Appointment"
											}), /* @__PURE__ */ jsx(Badge, {
												className: "bg-muted/50 text-muted-foreground text-[9px]",
												children: "Pending"
											})]
										})]
									})]
								})
							]
						})
					})
				] })
			})]
		})]
	});
}
//#endregion
export { Conversations as component };
