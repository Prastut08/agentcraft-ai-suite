import { t as Card } from "./card-CMUgrADA.js";
import { t as Badge } from "./badge-DrmkgaLP.js";
import { t as Input } from "./input-tDEmLj55.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { PhoneIncoming, PhoneMissed, PhoneOutgoing, Search } from "lucide-react";
//#region src/routes/app.logs.tsx?tsr-split=component
var logs = [];
function Logs() {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-3xl font-bold",
			children: "Call Logs"
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Every inbound, outbound, and missed call."
		})] }), /* @__PURE__ */ jsxs(Card, {
			className: "glass p-5",
			children: [/* @__PURE__ */ jsx("div", {
				className: "mb-4 flex items-center gap-3",
				children: /* @__PURE__ */ jsxs("div", {
					className: "relative max-w-md flex-1",
					children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
						placeholder: "Search caller, agent, outcome…",
						className: "pl-9"
					})]
				})
			}), /* @__PURE__ */ jsxs("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ jsx("thead", {
					className: "border-b border-border/60 text-xs uppercase text-muted-foreground",
					children: /* @__PURE__ */ jsxs("tr", { children: [
						/* @__PURE__ */ jsx("th", {
							className: "p-3 text-left",
							children: "Direction"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "p-3 text-left",
							children: "Caller"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "p-3 text-left",
							children: "Agent"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "p-3 text-left",
							children: "Duration"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "p-3 text-left",
							children: "Outcome"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "p-3 text-left",
							children: "Time"
						})
					] })
				}), /* @__PURE__ */ jsx("tbody", { children: logs.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
					colSpan: 6,
					className: "p-8 text-center text-sm text-muted-foreground",
					children: "No call logs yet."
				}) }) : logs.map((l) => /* @__PURE__ */ jsxs("tr", {
					className: "border-b border-border/40 last:border-0 hover:bg-muted/30",
					children: [
						/* @__PURE__ */ jsxs("td", {
							className: "p-3",
							children: [
								l.dir === "in" && /* @__PURE__ */ jsx(PhoneIncoming, { className: "h-4 w-4 text-success" }),
								l.dir === "out" && /* @__PURE__ */ jsx(PhoneOutgoing, { className: "h-4 w-4 text-primary" }),
								l.dir === "miss" && /* @__PURE__ */ jsx(PhoneMissed, { className: "h-4 w-4 text-destructive" })
							]
						}),
						/* @__PURE__ */ jsx("td", {
							className: "p-3 font-mono text-xs",
							children: l.from
						}),
						/* @__PURE__ */ jsx("td", {
							className: "p-3",
							children: l.agent
						}),
						/* @__PURE__ */ jsx("td", {
							className: "p-3 text-muted-foreground",
							children: l.dur
						}),
						/* @__PURE__ */ jsx("td", {
							className: "p-3",
							children: /* @__PURE__ */ jsx(Badge, {
								variant: "outline",
								children: l.outcome
							})
						}),
						/* @__PURE__ */ jsx("td", {
							className: "p-3 text-xs text-muted-foreground",
							children: l.time
						})
					]
				}, l.id)) })]
			})]
		})]
	});
}
//#endregion
export { Logs as component };
