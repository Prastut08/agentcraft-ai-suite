import { t as Card } from "./card-CMUgrADA.js";
import { t as Button } from "./button-D1WH43tQ.js";
import { t as Progress } from "./progress-DkI4Tylc.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { CreditCard } from "lucide-react";
//#region src/routes/app.billing.tsx?tsr-split=component
function Billing() {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [
			/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
				className: "text-3xl font-bold",
				children: "Billing"
			}), /* @__PURE__ */ jsx("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Manage your plan, usage, and invoices."
			})] }),
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 md:grid-cols-3",
				children: [/* @__PURE__ */ jsxs(Card, {
					className: "glass p-6 md:col-span-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("div", {
								className: "text-xs uppercase text-muted-foreground",
								children: "Current plan"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-1 text-2xl font-bold",
								children: "No active plan"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "text-sm text-muted-foreground",
								children: "Choose a plan to get started."
							})
						] }), /* @__PURE__ */ jsx(Button, {
							variant: "outline",
							children: "Change plan"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "mt-6 space-y-3",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
								className: "mb-1 flex justify-between text-xs",
								children: [/* @__PURE__ */ jsx("span", { children: "Voice minutes" }), /* @__PURE__ */ jsx("span", {
									className: "text-muted-foreground",
									children: "0 / —"
								})]
							}), /* @__PURE__ */ jsx(Progress, { value: 0 })] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
								className: "mb-1 flex justify-between text-xs",
								children: [/* @__PURE__ */ jsx("span", { children: "Phone numbers" }), /* @__PURE__ */ jsx("span", {
									className: "text-muted-foreground",
									children: "0 / —"
								})]
							}), /* @__PURE__ */ jsx(Progress, { value: 0 })] }),
							/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsxs("div", {
								className: "mb-1 flex justify-between text-xs",
								children: [/* @__PURE__ */ jsx("span", { children: "Knowledge storage" }), /* @__PURE__ */ jsx("span", {
									className: "text-muted-foreground",
									children: "0 / —"
								})]
							}), /* @__PURE__ */ jsx(Progress, { value: 0 })] })
						]
					})]
				}), /* @__PURE__ */ jsxs(Card, {
					className: "glass p-6",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "text-xs uppercase text-muted-foreground",
							children: "Payment method"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-3 flex items-center gap-3 rounded-xl border border-border/60 p-3",
							children: [/* @__PURE__ */ jsx(CreditCard, { className: "h-5 w-5 text-primary" }), /* @__PURE__ */ jsxs("div", {
								className: "text-sm",
								children: [/* @__PURE__ */ jsx("div", {
									className: "font-medium",
									children: "No payment method"
								}), /* @__PURE__ */ jsx("div", {
									className: "text-xs text-muted-foreground",
									children: "Add a payment method to upgrade."
								})]
							})]
						}),
						/* @__PURE__ */ jsx(Button, {
							variant: "outline",
							className: "mt-3 w-full",
							children: "Update card"
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs(Card, {
				className: "glass p-6",
				children: [/* @__PURE__ */ jsx("div", {
					className: "mb-4 font-semibold",
					children: "Recent invoices"
				}), /* @__PURE__ */ jsxs("table", {
					className: "w-full text-sm",
					children: [/* @__PURE__ */ jsx("thead", {
						className: "border-b border-border/60 text-xs uppercase text-muted-foreground",
						children: /* @__PURE__ */ jsxs("tr", { children: [
							/* @__PURE__ */ jsx("th", {
								className: "p-3 text-left",
								children: "Invoice"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "p-3 text-left",
								children: "Date"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "p-3 text-left",
								children: "Amount"
							}),
							/* @__PURE__ */ jsx("th", {
								className: "p-3 text-left",
								children: "Status"
							})
						] })
					}), /* @__PURE__ */ jsx("tbody", { children: /* @__PURE__ */ jsx("tr", {
						className: "border-b border-border/40",
						children: /* @__PURE__ */ jsx("td", {
							className: "p-3 text-muted-foreground",
							colSpan: 4,
							children: "No invoices yet"
						})
					}) })]
				})]
			})
		]
	});
}
//#endregion
export { Billing as component };
