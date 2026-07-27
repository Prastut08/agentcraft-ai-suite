import { t as Card } from "./card-CMUgrADA.js";
import { t as Badge } from "./badge-DrmkgaLP.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { ShieldCheck } from "lucide-react";
//#region src/routes/app.numbers.tsx?tsr-split=component
var numbers = [];
function Numbers() {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-3xl font-bold",
			children: "Phone Numbers"
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Add numbers to route calls to your agents."
		})] }), /* @__PURE__ */ jsx(Card, {
			className: "glass overflow-hidden",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full text-sm",
				children: [/* @__PURE__ */ jsx("thead", {
					className: "border-b border-border/60 text-xs uppercase text-muted-foreground",
					children: /* @__PURE__ */ jsxs("tr", { children: [
						/* @__PURE__ */ jsx("th", {
							className: "p-4 text-left",
							children: "Number"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "p-4 text-left",
							children: "Provider"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "p-4 text-left",
							children: "Assigned"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "p-4 text-left",
							children: "Country"
						}),
						/* @__PURE__ */ jsx("th", {
							className: "p-4 text-left",
							children: "Health"
						})
					] })
				}), /* @__PURE__ */ jsx("tbody", { children: numbers.length === 0 ? /* @__PURE__ */ jsx("tr", { children: /* @__PURE__ */ jsx("td", {
					colSpan: 5,
					className: "p-8 text-center text-sm text-muted-foreground",
					children: "No phone numbers yet. Add a number to get started."
				}) }) : numbers.map((r) => /* @__PURE__ */ jsxs("tr", {
					className: "border-b border-border/40 last:border-0 hover:bg-muted/30",
					children: [
						/* @__PURE__ */ jsx("td", {
							className: "p-4 font-mono",
							children: r.n
						}),
						/* @__PURE__ */ jsx("td", {
							className: "p-4",
							children: /* @__PURE__ */ jsx(Badge, {
								variant: "outline",
								children: r.provider
							})
						}),
						/* @__PURE__ */ jsx("td", {
							className: "p-4",
							children: r.agent
						}),
						/* @__PURE__ */ jsx("td", {
							className: "p-4 text-muted-foreground",
							children: r.country
						}),
						/* @__PURE__ */ jsx("td", {
							className: "p-4",
							children: /* @__PURE__ */ jsxs("span", {
								className: "inline-flex items-center gap-1.5 text-xs text-success",
								children: [
									/* @__PURE__ */ jsx(ShieldCheck, { className: "h-3.5 w-3.5" }),
									" ",
									r.status
								]
							})
						})
					]
				}, r.n)) })]
			})
		})]
	});
}
//#endregion
export { Numbers as component };
