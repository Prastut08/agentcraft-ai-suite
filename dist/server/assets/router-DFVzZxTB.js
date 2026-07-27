import { t as AuthProvider } from "./auth-context-D8TD5ErT.js";
import { useEffect } from "react";
import { HeadContent, Link, Outlet, Scripts, createFileRoute, createRootRouteWithContext, createRouter, lazyRouteComponent, useRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
//#region src/styles.css?url
var styles_default = "/assets/styles-D62GbjmJ.css";
//#endregion
//#region src/lib/lovable-error-reporting.ts
function reportLovableError(error, context = {}) {
	if (typeof window === "undefined") return;
	window.__lovableEvents?.captureException?.(error, {
		source: "react_error_boundary",
		route: window.location.pathname,
		...context
	}, {
		mechanism: "react_error_boundary",
		handled: false,
		severity: "error"
	});
	const message = error instanceof Response ? `Response ${error.status}${error.url ? ` at ${error.url}` : ""}` : error instanceof Error ? error.message : String(error);
	window.__lovableReportRuntimeError?.({
		message,
		stack: error instanceof Error ? error.stack : void 0,
		filename: window.location.pathname
	});
}
//#endregion
//#region src/components/ui/sonner.tsx
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ jsx(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
//#endregion
//#region src/routes/__root.tsx
function NotFoundComponent() {
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-7xl font-bold gradient-text",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-4 text-xl font-semibold",
					children: "Page not found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist."
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:opacity-90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	useEffect(() => {
		reportLovableError(error, { boundary: "tanstack_root_error_component" });
	}, [error]);
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ jsxs("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "text-xl font-semibold",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong. Try refreshing or head back home."
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ jsx("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground",
						children: "Try again"
					}), /* @__PURE__ */ jsx("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input px-4 py-2 text-sm font-medium",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$17 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "VoiceForge AI — Create AI Voice Employees in Minutes" },
			{
				name: "description",
				content: "Build AI receptionists, sales agents, appointment schedulers, and custom voice assistants trained for your business — no code required."
			},
			{
				property: "og:title",
				content: "VoiceForge AI"
			},
			{
				property: "og:description",
				content: "Create, train, and deploy AI Voice Agents for your business in minutes."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.ico",
				type: "image/x-icon"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ jsxs("html", {
		lang: "en",
		className: "dark",
		children: [/* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }), /* @__PURE__ */ jsxs("body", { children: [children, /* @__PURE__ */ jsx(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$17.useRouteContext();
	return /* @__PURE__ */ jsx(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ jsxs(AuthProvider, { children: [/* @__PURE__ */ jsx(Outlet, {}), /* @__PURE__ */ jsx(Toaster$1, {})] })
	});
}
//#endregion
//#region src/routes/index.tsx
var $$splitComponentImporter$16 = () => import("./routes-z8zLE-Tf.js");
var Route$16 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$16, "component") });
//#endregion
//#region src/routes/app.tsx
var $$splitComponentImporter$15 = () => import("./app-CQ7IX4jU.js");
var Route$15 = createFileRoute("/app")({ component: lazyRouteComponent($$splitComponentImporter$15, "component") });
//#endregion
//#region src/routes/app.index.tsx
var $$splitComponentImporter$14 = () => import("./app.index-B8XAd4jg.js");
var Route$14 = createFileRoute("/app/")({ component: lazyRouteComponent($$splitComponentImporter$14, "component") });
//#endregion
//#region src/routes/app.agents.tsx
var $$splitComponentImporter$13 = () => import("./app.agents-7WXq9htF.js");
var Route$13 = createFileRoute("/app/agents")({ component: lazyRouteComponent($$splitComponentImporter$13, "component") });
//#endregion
//#region src/routes/app.analytics.tsx
var $$splitComponentImporter$12 = () => import("./app.analytics-BNmvMf9S.js");
var Route$12 = createFileRoute("/app/analytics")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
//#endregion
//#region src/routes/app.billing.tsx
var $$splitComponentImporter$11 = () => import("./app.billing-Q6xan2E4.js");
var Route$11 = createFileRoute("/app/billing")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
//#endregion
//#region src/routes/app.conversations.tsx
var $$splitComponentImporter$10 = () => import("./app.conversations-D_0jVmdY.js");
var Route$10 = createFileRoute("/app/conversations")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
//#endregion
//#region src/routes/app.create.tsx
var $$splitComponentImporter$9 = () => import("./app.create-C8MqAKrD.js");
var Route$9 = createFileRoute("/app/create")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
//#endregion
//#region src/routes/app.dashboard.tsx
var $$splitComponentImporter$8 = () => import("./app.dashboard-Cbx5USqo.js");
var Route$8 = createFileRoute("/app/dashboard")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
//#endregion
//#region src/routes/app.integrations.tsx
var $$splitComponentImporter$7 = () => import("./app.integrations-DvDp7h-p.js");
var Route$7 = createFileRoute("/app/integrations")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
//#endregion
//#region src/routes/app.knowledge.tsx
var $$splitComponentImporter$6 = () => import("./app.knowledge-BJfRncl5.js");
var Route$6 = createFileRoute("/app/knowledge")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
//#endregion
//#region src/routes/app.logs.tsx
var $$splitComponentImporter$5 = () => import("./app.logs-BTrc3PBJ.js");
var Route$5 = createFileRoute("/app/logs")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
//#endregion
//#region src/routes/app.numbers.tsx
var $$splitComponentImporter$4 = () => import("./app.numbers--vSPohIz.js");
var Route$4 = createFileRoute("/app/numbers")({ component: lazyRouteComponent($$splitComponentImporter$4, "component") });
//#endregion
//#region src/routes/app.settings.tsx
var $$splitComponentImporter$3 = () => import("./app.settings-CF0c-E0H.js");
var Route$3 = createFileRoute("/app/settings")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
//#endregion
//#region src/routes/auth.login.tsx
var $$splitComponentImporter$2 = () => import("./auth.login-ByQE5Z7B.js");
var Route$2 = createFileRoute("/auth/login")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
//#endregion
//#region src/routes/auth.register.tsx
var $$splitComponentImporter$1 = () => import("./auth.register-BGtycN3_.js");
var Route$1 = createFileRoute("/auth/register")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
//#endregion
//#region src/routes/onboarding.agent-type.tsx
var $$splitComponentImporter = () => import("./onboarding.agent-type-CZMVZBsR.js");
var Route = createFileRoute("/onboarding/agent-type")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
//#endregion
//#region src/routeTree.gen.ts
var IndexRoute = Route$16.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$17
});
var AppRoute = Route$15.update({
	id: "/app",
	path: "/app",
	getParentRoute: () => Route$17
});
var AppIndexRoute = Route$14.update({
	id: "/",
	path: "/",
	getParentRoute: () => AppRoute
});
var AppAgentsRoute = Route$13.update({
	id: "/agents",
	path: "/agents",
	getParentRoute: () => AppRoute
});
var AppAnalyticsRoute = Route$12.update({
	id: "/analytics",
	path: "/analytics",
	getParentRoute: () => AppRoute
});
var AppBillingRoute = Route$11.update({
	id: "/billing",
	path: "/billing",
	getParentRoute: () => AppRoute
});
var AppConversationsRoute = Route$10.update({
	id: "/conversations",
	path: "/conversations",
	getParentRoute: () => AppRoute
});
var AppCreateRoute = Route$9.update({
	id: "/create",
	path: "/create",
	getParentRoute: () => AppRoute
});
var AppDashboardRoute = Route$8.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => AppRoute
});
var AppIntegrationsRoute = Route$7.update({
	id: "/integrations",
	path: "/integrations",
	getParentRoute: () => AppRoute
});
var AppKnowledgeRoute = Route$6.update({
	id: "/knowledge",
	path: "/knowledge",
	getParentRoute: () => AppRoute
});
var AppLogsRoute = Route$5.update({
	id: "/logs",
	path: "/logs",
	getParentRoute: () => AppRoute
});
var AppNumbersRoute = Route$4.update({
	id: "/numbers",
	path: "/numbers",
	getParentRoute: () => AppRoute
});
var AppSettingsRoute = Route$3.update({
	id: "/settings",
	path: "/settings",
	getParentRoute: () => AppRoute
});
var AuthLoginRoute = Route$2.update({
	id: "/auth/login",
	path: "/auth/login",
	getParentRoute: () => Route$17
});
var AuthRegisterRoute = Route$1.update({
	id: "/auth/register",
	path: "/auth/register",
	getParentRoute: () => Route$17
});
var OnboardingAgentTypeRoute = Route.update({
	id: "/onboarding/agent-type",
	path: "/onboarding/agent-type",
	getParentRoute: () => Route$17
});
var AppRouteChildren = {
	AppAgentsRoute,
	AppAnalyticsRoute,
	AppBillingRoute,
	AppConversationsRoute,
	AppCreateRoute,
	AppDashboardRoute,
	AppIntegrationsRoute,
	AppKnowledgeRoute,
	AppLogsRoute,
	AppNumbersRoute,
	AppSettingsRoute,
	AppIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AppRoute: AppRoute._addFileChildren(AppRouteChildren),
	AuthLoginRoute,
	AuthRegisterRoute,
	OnboardingAgentTypeRoute
};
var routeTree = Route$17._addFileChildren(rootRouteChildren)._addFileTypes();
//#endregion
//#region src/router.tsx
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
