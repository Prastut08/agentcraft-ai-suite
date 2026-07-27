import { t as Card } from "./card-CMUgrADA.js";
import { t as Badge } from "./badge-DrmkgaLP.js";
import { t as Button } from "./button-D1WH43tQ.js";
import { jsx, jsxs } from "react/jsx-runtime";
import { Puzzle } from "lucide-react";
//#region src/routes/app.integrations.tsx?tsr-split=component
var items = [];
function Integrations() {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-3xl font-bold",
			children: "Integrations"
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Connect your favorite tools — your agent uses them mid-call."
		})] }), /* @__PURE__ */ jsx("div", {
			className: "grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
			children: items.length === 0 ? /* @__PURE__ */ jsxs(Card, {
				className: "glass col-span-full flex flex-col items-center justify-center p-8 text-center",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary",
						children: /* @__PURE__ */ jsx(Puzzle, { className: "h-5 w-5" })
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-3 font-medium",
						children: "No integrations connected"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-xs text-muted-foreground",
						children: "Connect tools to extend your agent's capabilities."
					})
				]
			}) : items.map((i) => /* @__PURE__ */ jsxs(Card, {
				className: "glass p-4",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-start justify-between",
						children: [/* @__PURE__ */ jsx("div", {
							className: "grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary",
							children: /* @__PURE__ */ jsx(Puzzle, { className: "h-5 w-5" })
						}), i.connected ? /* @__PURE__ */ jsx(Badge, {
							className: "bg-success/20 text-success",
							children: "Connected"
						}) : /* @__PURE__ */ jsx(Badge, {
							variant: "outline",
							children: "Available"
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-3 font-medium",
						children: i.name
					}),
					/* @__PURE__ */ jsx("div", {
						className: "text-xs text-muted-foreground",
						children: i.cat
					}),
					/* @__PURE__ */ jsx(Button, {
						size: "sm",
						variant: i.connected ? "outline" : "default",
						className: "mt-3 w-full",
						children: i.connected ? "Manage" : "Connect"
					})
				]
			}, i.name))
		})]
	});
}
//#endregion
export { Integrations as component };
