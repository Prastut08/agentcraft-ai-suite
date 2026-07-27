import { a as useFirebaseAuth, i as signUpWithEmail, n as signInWithEmail, t as signInAsGuest } from "./firebase-auth-4nYWua_o.js";
import { s as cn, t as Card } from "./card-CMUgrADA.js";
import { t as Badge } from "./badge-DrmkgaLP.js";
import { t as Button } from "./button-D1WH43tQ.js";
import { t as Input } from "./input-tDEmLj55.js";
import { t as Label } from "./label-DQBDE3fv.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BvkulN0d.js";
import * as React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { ArrowRight, Check, Loader2, Lock, Shield, Sparkles, Waves } from "lucide-react";
import * as SeparatorPrimitive from "@radix-ui/react-separator";
//#region src/components/ui/separator.tsx
var Separator = React.forwardRef(({ className, orientation = "horizontal", decorative = true, ...props }, ref) => /* @__PURE__ */ jsx(SeparatorPrimitive.Root, {
	ref,
	decorative,
	orientation,
	className: cn("shrink-0 bg-border", orientation === "horizontal" ? "h-[1px] w-full" : "h-full w-[1px]", className),
	...props
}));
Separator.displayName = SeparatorPrimitive.Root.displayName;
//#endregion
//#region src/components/auth/auth-screen.tsx
var highlights = [
	"Email/password access for every workspace member",
	"Firestore profile records created on sign-up",
	"Protected app routes with automatic sign-out fallback"
];
function AuthScreen({ compact = false, reason }) {
	const navigate = useNavigate();
	const { user, loading } = useFirebaseAuth();
	const [mode, setMode] = useState("sign-in");
	const [name, setName] = useState("");
	const [businessName, setBusinessName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [busy, setBusy] = useState(false);
	const [error, setError] = useState(null);
	const isNewUserFlowRef = useRef(false);
	useEffect(() => {
		if (user && !isNewUserFlowRef.current) navigate({
			to: "/app/dashboard",
			replace: true
		});
		isNewUserFlowRef.current = false;
	}, [navigate, user]);
	const primaryCopy = useMemo(() => {
		if (compact) return "Sign in to continue";
		return "Create your workspace access";
	}, [compact]);
	async function handleSubmit(event) {
		event.preventDefault();
		setBusy(true);
		setError(null);
		try {
			if (mode === "sign-up") {
				isNewUserFlowRef.current = true;
				await signUpWithEmail(email, password, name, businessName);
				navigate({
					to: "/onboarding/agent-type",
					replace: true
				});
			} else {
				await signInWithEmail(email, password);
				navigate({
					to: "/app/dashboard",
					replace: true
				});
			}
		} catch (submitError) {
			const message = submitError instanceof Error ? submitError.message : "Unable to continue with this account.";
			setError(message);
		} finally {
			setBusy(false);
		}
	}
	async function handleDemoAccess() {
		setBusy(true);
		setError(null);
		try {
			isNewUserFlowRef.current = true;
			await signInAsGuest();
			navigate({
				to: "/onboarding/agent-type",
				replace: true
			});
		} catch (demoError) {
			const message = demoError instanceof Error ? demoError.message : "Unable to start demo session.";
			setError(message);
		} finally {
			setBusy(false);
		}
	}
	if (loading) return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-6 text-foreground",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-3 rounded-2xl border border-border/60 bg-surface/70 px-5 py-4 shadow-xl backdrop-blur",
			children: [/* @__PURE__ */ jsx(Loader2, { className: "h-4 w-4 animate-spin text-primary" }), /* @__PURE__ */ jsx("span", {
				className: "text-sm text-muted-foreground",
				children: "Checking your session..."
			})]
		})
	});
	if (user) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "relative min-h-screen overflow-hidden bg-background text-foreground",
		children: [
			/* @__PURE__ */ jsx("div", { className: "absolute inset-0 grid-bg opacity-35" }),
			/* @__PURE__ */ jsx("div", {
				className: "absolute inset-x-0 top-0 h-[520px]",
				style: { background: "var(--gradient-glow)" }
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "relative mx-auto grid min-h-screen max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8",
				children: [/* @__PURE__ */ jsxs("section", {
					className: "space-y-8",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "flex items-center gap-3",
							children: [/* @__PURE__ */ jsx("div", {
								className: "grid h-11 w-11 place-items-center rounded-2xl bg-primary text-primary-foreground brand-glow",
								children: /* @__PURE__ */ jsx(Waves, { className: "h-6 w-6" })
							}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
								className: "text-sm font-semibold",
								children: "VoiceForge AI"
							}), /* @__PURE__ */ jsx("div", {
								className: "text-xs text-muted-foreground",
								children: "Secure access required"
							})] })]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "max-w-2xl space-y-5",
							children: [
								/* @__PURE__ */ jsxs(Badge, {
									variant: "secondary",
									className: "rounded-full border border-border px-3 py-1 text-xs",
									children: [/* @__PURE__ */ jsx(Shield, { className: "mr-1.5 h-3 w-3 text-primary" }), " Firebase Auth + Firestore"]
								}),
								/* @__PURE__ */ jsx("h1", {
									className: "text-5xl font-bold tracking-tight md:text-7xl",
									children: primaryCopy
								}),
								/* @__PURE__ */ jsx("p", {
									className: "max-w-xl text-lg text-muted-foreground md:text-xl",
									children: reason ?? "Use your workspace account to sign in or create a new account before opening the dashboard."
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid gap-3 sm:grid-cols-3",
							children: [
								{
									value: "1",
									label: "workspace gate"
								},
								{
									value: "2",
									label: "auth methods"
								},
								{
									value: "3",
									label: "persisted profile docs"
								}
							].map((stat) => /* @__PURE__ */ jsxs(Card, {
								className: "glass p-4",
								children: [/* @__PURE__ */ jsx("div", {
									className: "text-2xl font-bold",
									children: stat.value
								}), /* @__PURE__ */ jsx("div", {
									className: "text-sm text-muted-foreground",
									children: stat.label
								})]
							}, stat.label))
						}),
						/* @__PURE__ */ jsx("div", {
							className: "space-y-3",
							children: highlights.map((item) => /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3 text-sm text-muted-foreground",
								children: [/* @__PURE__ */ jsx("div", {
									className: "grid h-6 w-6 place-items-center rounded-full bg-primary/10 text-primary",
									children: /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5" })
								}), /* @__PURE__ */ jsx("span", { children: item })]
							}, item))
						})
					]
				}), /* @__PURE__ */ jsxs(Card, {
					className: "glass relative overflow-hidden border-border/60 p-6 shadow-2xl md:p-8",
					children: [/* @__PURE__ */ jsx("div", { className: "absolute -right-14 -top-14 h-28 w-28 rounded-full bg-primary/10 blur-3xl" }), /* @__PURE__ */ jsxs("div", {
						className: "relative space-y-6",
						children: [
							/* @__PURE__ */ jsxs("div", { children: [
								/* @__PURE__ */ jsxs("div", {
									className: "flex items-center gap-2 text-sm font-medium text-primary",
									children: [/* @__PURE__ */ jsx(Lock, { className: "h-4 w-4" }), " Workspace access"]
								}),
								/* @__PURE__ */ jsx("h2", {
									className: "mt-2 text-2xl font-bold",
									children: "Sign in or create an account"
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "One account unlocks the dashboard, agents, logs, and Firestore-backed profile data."
								})
							] }),
							/* @__PURE__ */ jsxs(Tabs, {
								value: mode,
								onValueChange: (value) => setMode(value),
								className: "space-y-4",
								children: [/* @__PURE__ */ jsxs(TabsList, {
									className: "grid w-full grid-cols-2",
									children: [/* @__PURE__ */ jsx(TabsTrigger, {
										value: "sign-in",
										children: "Sign in"
									}), /* @__PURE__ */ jsx(TabsTrigger, {
										value: "sign-up",
										children: "Sign up"
									})]
								}), /* @__PURE__ */ jsxs("form", {
									onSubmit: handleSubmit,
									className: "space-y-4",
									children: [
										/* @__PURE__ */ jsxs(TabsContent, {
											value: "sign-in",
											forceMount: true,
											className: "mt-0 space-y-4",
											children: [/* @__PURE__ */ jsx(Field, {
												label: "Email address",
												children: /* @__PURE__ */ jsx(Input, {
													autoComplete: "email",
													value: email,
													onChange: (event) => setEmail(event.target.value),
													placeholder: "you@company.com"
												})
											}), /* @__PURE__ */ jsx(Field, {
												label: "Password",
												children: /* @__PURE__ */ jsx(Input, {
													autoComplete: "current-password",
													type: "password",
													value: password,
													onChange: (event) => setPassword(event.target.value),
													placeholder: "••••••••"
												})
											})]
										}),
										/* @__PURE__ */ jsxs(TabsContent, {
											value: "sign-up",
											forceMount: true,
											className: "mt-0 space-y-4",
											children: [
												/* @__PURE__ */ jsx(Field, {
													label: "Business name",
													children: /* @__PURE__ */ jsx(Input, {
														autoComplete: "organization",
														value: businessName,
														onChange: (event) => setBusinessName(event.target.value),
														placeholder: "Bright Dental"
													})
												}),
												/* @__PURE__ */ jsx(Field, {
													label: "Name",
													children: /* @__PURE__ */ jsx(Input, {
														autoComplete: "name",
														value: name,
														onChange: (event) => setName(event.target.value),
														placeholder: "Jamie Doe"
													})
												}),
												/* @__PURE__ */ jsx(Field, {
													label: "Email address",
													children: /* @__PURE__ */ jsx(Input, {
														autoComplete: "email",
														value: email,
														onChange: (event) => setEmail(event.target.value),
														placeholder: "you@company.com"
													})
												}),
												/* @__PURE__ */ jsx(Field, {
													label: "Password",
													children: /* @__PURE__ */ jsx(Input, {
														autoComplete: "new-password",
														type: "password",
														value: password,
														onChange: (event) => setPassword(event.target.value),
														placeholder: "Create a password"
													})
												})
											]
										}),
										error && /* @__PURE__ */ jsx("div", {
											className: "rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive",
											children: error
										}),
										/* @__PURE__ */ jsx(Button, {
											type: "submit",
											className: "h-11 w-full",
											disabled: busy,
											children: busy ? /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Please wait"] }) : /* @__PURE__ */ jsxs(Fragment, { children: [mode === "sign-up" ? "Create account" : "Continue", /* @__PURE__ */ jsx(ArrowRight, { className: "ml-2 h-4 w-4" })] })
										}),
										/* @__PURE__ */ jsxs(Button, {
											type: "button",
											variant: "outline",
											className: "h-11 w-full",
											onClick: handleDemoAccess,
											disabled: busy,
											children: [/* @__PURE__ */ jsx(Sparkles, { className: "mr-2 h-4 w-4 text-primary" }), "Instant Demo Access"]
										})
									]
								})]
							}),
							/* @__PURE__ */ jsx(Separator, {}),
							/* @__PURE__ */ jsx("p", {
								className: "text-center text-xs text-muted-foreground",
								children: "By continuing you agree to use the workspace with your Firebase authenticated account."
							})
						]
					})]
				})]
			})
		]
	});
}
function Field({ label, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-2",
		children: [/* @__PURE__ */ jsx(Label, {
			className: "text-xs uppercase tracking-wider text-muted-foreground",
			children: label
		}), children]
	});
}
//#endregion
export { AuthScreen as t };
