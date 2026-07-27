import { r as signOutUser } from "./firebase-auth-4nYWua_o.js";
import { n as useAuth } from "./auth-context-D8TD5ErT.js";
import { t as Button } from "./button-D1WH43tQ.js";
import { n as AvatarFallback, t as Avatar } from "./avatar-tt_XJYL6.js";
import { t as Input } from "./input-tDEmLj55.js";
import { t as AuthScreen } from "./auth-screen-CjYtZgA7.js";
import { useEffect, useState } from "react";
import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { BarChart3, Bell, BookOpen, Bot, ChevronLeft, ChevronRight, CreditCard, LayoutDashboard, ListChecks, LogOut, MessagesSquare, Moon, Phone, Plus, Puzzle, Search, Settings, Sparkles, Sun, Waves } from "lucide-react";
//#region src/routes/app.tsx?tsr-split=component
var navMain = [
	{
		to: "/app/dashboard",
		label: "Dashboard",
		icon: LayoutDashboard
	},
	{
		to: "/app/create",
		label: "Create Agent",
		icon: Plus,
		accent: true
	},
	{
		to: "/app/agents",
		label: "My Agents",
		icon: Bot
	},
	{
		to: "/app/analytics",
		label: "Analytics",
		icon: BarChart3
	},
	{
		to: "/app/conversations",
		label: "Conversations",
		icon: MessagesSquare
	},
	{
		to: "/app/logs",
		label: "Call Logs",
		icon: ListChecks
	}
];
var navSystem = [
	{
		to: "/app/knowledge",
		label: "Knowledge Base",
		icon: BookOpen
	},
	{
		to: "/app/numbers",
		label: "Phone Numbers",
		icon: Phone
	},
	{
		to: "/app/integrations",
		label: "Integrations",
		icon: Puzzle
	},
	{
		to: "/app/billing",
		label: "Billing",
		icon: CreditCard
	},
	{
		to: "/app/settings",
		label: "Settings",
		icon: Settings
	}
];
function NavLink({ item, active, collapsed }) {
	return /* @__PURE__ */ jsxs(Link, {
		to: item.to,
		title: collapsed ? item.label : void 0,
		className: `group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${active ? "nav-active text-foreground" : item.accent ? "text-primary hover:bg-primary/8 hover:text-primary" : "text-sidebar-foreground/60 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground"}`,
		children: [
			active && /* @__PURE__ */ jsx("span", { className: "absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-primary" }),
			/* @__PURE__ */ jsx(item.icon, { className: `shrink-0 transition-transform duration-200 group-hover:scale-105 ${collapsed ? "h-5 w-5" : "h-4 w-4"}` }),
			!collapsed && /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsx("span", {
					className: "flex-1 truncate",
					children: item.label
				}),
				item.accent && !active && /* @__PURE__ */ jsx(Sparkles, { className: "h-3 w-3 text-primary/70" }),
				item.badge && /* @__PURE__ */ jsx("span", {
					className: "flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary",
					children: item.badge
				})
			] })
		]
	});
}
function AppRoute() {
	const { user, loading, profile } = useAuth();
	if (loading) return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-6 text-foreground",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3 rounded-2xl border border-border/60 bg-surface/70 px-5 py-4 shadow-xl backdrop-blur",
			children: [/* @__PURE__ */ jsx("span", { className: "h-4 w-4 animate-spin rounded-full border-2 border-primary/30 border-t-primary" }), /* @__PURE__ */ jsx("span", {
				className: "text-sm text-muted-foreground",
				children: "Checking your workspace access..."
			})]
		})
	});
	if (!user) return /* @__PURE__ */ jsx(AuthScreen, {
		compact: true,
		reason: "Sign in to access your dashboard, agents, logs, and settings."
	});
	return /* @__PURE__ */ jsx(AppLayout, {
		userName: profile?.displayName ?? user.displayName ?? user.email ?? "Workspace user",
		userEmail: user.email ?? "",
		workspaceName: profile?.businessName ?? profile?.displayName ?? user.displayName ?? user.email ?? "Workspace"
	});
}
function AppLayout({ userName, userEmail, workspaceName }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const [collapsed, setCollapsed] = useState(false);
	const [notifOpen, setNotifOpen] = useState(false);
	const [isDark, setIsDark] = useState(true);
	const [signingOut, setSigningOut] = useState(false);
	const navigate = useNavigate();
	const initials = userName.split(/\s+/).filter(Boolean).map((part) => part[0]).slice(0, 2).join("").toUpperCase() || "U";
	useEffect(() => {
		if (isDark) document.documentElement.classList.add("dark");
		else document.documentElement.classList.remove("dark");
	}, [isDark]);
	return /* @__PURE__ */ jsxs("div", {
		className: "flex min-h-screen bg-background text-foreground",
		children: [
			/* @__PURE__ */ jsxs("aside", {
				className: `sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex transition-all duration-300 ease-in-out ${collapsed ? "w-[68px]" : "w-[240px]"}`,
				children: [
					/* @__PURE__ */ jsx("div", {
						className: `flex h-16 items-center border-b border-sidebar-border px-4 ${collapsed ? "justify-center" : "gap-3"}`,
						children: /* @__PURE__ */ jsxs(Link, {
							to: "/",
							className: "flex items-center gap-3 min-w-0",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-md",
								children: [/* @__PURE__ */ jsx(Waves, { className: "h-5 w-5" }), /* @__PURE__ */ jsx("span", { className: "absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-sidebar bg-success" })]
							}), !collapsed && /* @__PURE__ */ jsxs("div", {
								className: "min-w-0",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-sm font-bold leading-none text-foreground",
									children: "VoiceForge AI"
								}), /* @__PURE__ */ jsx("div", {
									className: "mt-0.5 text-[10px] text-muted-foreground",
									children: "Enterprise Platform"
								})]
							})]
						})
					}),
					!collapsed && /* @__PURE__ */ jsx("div", {
						className: "mx-3 mt-3",
						children: /* @__PURE__ */ jsxs("button", {
							className: "flex w-full items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-3 py-2 text-left text-xs transition hover:bg-sidebar-accent",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "flex h-5 w-5 items-center justify-center rounded bg-primary/20 text-[10px] font-bold text-primary",
									children: "B"
								}),
								/* @__PURE__ */ jsx("span", {
									className: "flex-1 truncate font-medium text-sidebar-foreground/80",
									children: workspaceName
								}),
								/* @__PURE__ */ jsx(ChevronRight, { className: "h-3 w-3 text-muted-foreground" })
							]
						})
					}),
					/* @__PURE__ */ jsxs("nav", {
						className: `flex-1 space-y-0.5 overflow-y-auto py-3 ${collapsed ? "px-2" : "px-3"}`,
						children: [
							!collapsed && /* @__PURE__ */ jsx("div", {
								className: "mb-1 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50",
								children: "Platform"
							}),
							navMain.map((item) => {
								return /* @__PURE__ */ jsx(NavLink, {
									item,
									active: pathname === item.to || item.to !== "/app/dashboard" && pathname.startsWith(item.to),
									collapsed
								}, item.to);
							}),
							!collapsed && /* @__PURE__ */ jsx("div", {
								className: "mb-1 mt-4 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50",
								children: "Configuration"
							}),
							collapsed && /* @__PURE__ */ jsx("div", { className: "my-2 h-px bg-sidebar-border" }),
							navSystem.map((item) => {
								return /* @__PURE__ */ jsx(NavLink, {
									item,
									active: pathname === item.to,
									collapsed
								}, item.to);
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: `border-t border-sidebar-border ${collapsed ? "p-2" : "p-3"} space-y-2`,
						children: [
							!collapsed && /* @__PURE__ */ jsx("div", {
								className: "rounded-xl border border-border/60 bg-sidebar-accent/30 p-3",
								children: /* @__PURE__ */ jsx("div", {
									className: "py-4 text-center text-xs text-muted-foreground",
									children: "No usage data"
								})
							}),
							/* @__PURE__ */ jsxs("button", {
								className: `flex w-full items-center gap-2.5 rounded-xl p-2 transition hover:bg-sidebar-accent ${collapsed ? "justify-center" : ""}`,
								children: [/* @__PURE__ */ jsx(Avatar, {
									className: "h-8 w-8 shrink-0",
									children: /* @__PURE__ */ jsx(AvatarFallback, {
										className: "bg-surface-2 border border-border text-xs font-semibold text-foreground",
										children: initials
									})
								}), !collapsed && /* @__PURE__ */ jsxs("div", {
									className: "min-w-0 flex-1 text-left",
									children: [/* @__PURE__ */ jsx("div", {
										className: "truncate text-xs font-semibold text-sidebar-foreground",
										children: userName
									}), /* @__PURE__ */ jsx("div", {
										className: "truncate text-[10px] text-muted-foreground",
										children: userEmail || "Authenticated workspace user"
									})]
								})]
							}),
							/* @__PURE__ */ jsxs(Button, {
								type: "button",
								variant: "outline",
								size: "sm",
								className: `w-full border-sidebar-border bg-transparent text-sidebar-foreground hover:bg-sidebar-accent ${collapsed ? "justify-center px-0" : "justify-start"}`,
								onClick: async () => {
									setSigningOut(true);
									try {
										await signOutUser();
										navigate({
											to: "/",
											replace: true
										});
									} finally {
										setSigningOut(false);
									}
								},
								disabled: signingOut,
								children: [/* @__PURE__ */ jsx(LogOut, { className: "h-4 w-4" }), !collapsed && /* @__PURE__ */ jsx("span", { children: signingOut ? "Signing out..." : "Sign out" })]
							})
						]
					}),
					/* @__PURE__ */ jsx("button", {
						onClick: () => setCollapsed((c) => !c),
						className: "absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-sidebar-border bg-sidebar text-muted-foreground shadow-sm transition hover:bg-sidebar-accent hover:text-foreground",
						children: collapsed ? /* @__PURE__ */ jsx(ChevronRight, { className: "h-3 w-3" }) : /* @__PURE__ */ jsx(ChevronLeft, { className: "h-3 w-3" })
					})
				]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ jsxs("header", {
					className: "sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/50 bg-background/85 px-6 backdrop-blur-xl",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "relative max-w-sm flex-1",
						children: [
							/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }),
							/* @__PURE__ */ jsx(Input, {
								placeholder: "Search agents, calls, contacts…",
								className: "h-9 border-border/50 bg-surface/60 pl-9 text-sm placeholder:text-muted-foreground/60 focus:bg-surface"
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center gap-1 sm:flex",
								children: [/* @__PURE__ */ jsx("kbd", {
									className: "flex h-5 items-center rounded border border-border/70 bg-muted px-1.5 font-mono text-[9px] text-muted-foreground",
									children: "⌘"
								}), /* @__PURE__ */ jsx("kbd", {
									className: "flex h-5 items-center rounded border border-border/70 bg-muted px-1.5 font-mono text-[9px] text-muted-foreground",
									children: "K"
								})]
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2 ml-auto",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "hidden items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-3 py-1 sm:flex",
								children: [/* @__PURE__ */ jsx("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-success" }), /* @__PURE__ */ jsx("span", {
									className: "text-[10px] font-medium text-success",
									children: "All systems operational"
								})]
							}),
							/* @__PURE__ */ jsx(Button, {
								variant: "outline",
								size: "icon",
								className: "h-9 w-9 border-border/60 text-muted-foreground hover:text-foreground",
								title: isDark ? "Switch to Light Mode (Wheat & Brown)" : "Switch to Dark Mode (Black & Gray)",
								onClick: () => setIsDark((d) => !d),
								children: isDark ? /* @__PURE__ */ jsx(Sun, { className: "h-4 w-4 text-amber-500" }) : /* @__PURE__ */ jsx(Moon, { className: "h-4 w-4 text-foreground" })
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "relative",
								children: [/* @__PURE__ */ jsxs(Button, {
									variant: "ghost",
									size: "icon",
									className: "relative h-9 w-9 text-muted-foreground hover:text-foreground",
									onClick: () => setNotifOpen((o) => !o),
									children: [/* @__PURE__ */ jsx(Bell, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", { className: "absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" })]
								}), notifOpen && /* @__PURE__ */ jsx("div", {
									className: "absolute right-0 top-12 z-50 w-80 animate-scale-in overflow-hidden rounded-2xl border border-border/60 bg-popover shadow-2xl",
									children: /* @__PURE__ */ jsx("div", {
										className: "py-8 text-center text-sm text-muted-foreground",
										children: "No notifications"
									})
								})]
							}),
							/* @__PURE__ */ jsx(Link, {
								to: "/app/create",
								children: /* @__PURE__ */ jsxs(Button, {
									size: "sm",
									className: "h-9 gap-1.5 bg-primary text-primary-foreground font-medium shadow-md transition",
									children: [/* @__PURE__ */ jsx(Plus, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
										className: "hidden sm:inline",
										children: "New Agent"
									})]
								})
							}),
							/* @__PURE__ */ jsx(Avatar, {
								className: "h-9 w-9 cursor-pointer ring-2 ring-border/50 transition hover:ring-primary/40",
								children: /* @__PURE__ */ jsx(AvatarFallback, {
									className: "bg-surface-2 border border-border text-xs font-semibold text-foreground",
									children: initials
								})
							})
						]
					})]
				}), /* @__PURE__ */ jsx("main", {
					className: "flex-1 p-6 md:p-8",
					children: /* @__PURE__ */ jsx(Outlet, {})
				})]
			}),
			notifOpen && /* @__PURE__ */ jsx("div", {
				className: "fixed inset-0 z-20",
				onClick: () => setNotifOpen(false)
			})
		]
	});
}
//#endregion
export { AppRoute as component };
