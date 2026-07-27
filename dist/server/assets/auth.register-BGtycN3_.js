import { i as signUpWithEmail } from "./firebase-auth-4nYWua_o.js";
import { n as useAuth } from "./auth-context-D8TD5ErT.js";
import { a as CardHeader, i as CardFooter, n as CardContent, o as CardTitle, r as CardDescription, t as Card } from "./card-CMUgrADA.js";
import { t as Button } from "./button-D1WH43tQ.js";
import { t as Input } from "./input-tDEmLj55.js";
import { t as Label } from "./label-DQBDE3fv.js";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { Waves } from "lucide-react";
//#region src/routes/auth.register.tsx?tsr-split=component
function RegisterPage() {
	const navigate = useNavigate();
	const { user, loading } = useAuth();
	const [businessName, setBusinessName] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [submitting, setSubmitting] = useState(false);
	useEffect(() => {
		if (!loading && user) navigate({
			to: "/app/dashboard",
			replace: true
		});
	}, [
		user,
		loading,
		navigate
	]);
	async function handleSubmit(e) {
		e.preventDefault();
		setError("");
		setSubmitting(true);
		if (password.length < 6) {
			setError("Password must be at least 6 characters.");
			setSubmitting(false);
			return;
		}
		try {
			await signUpWithEmail(email, password, name, businessName);
			navigate({
				to: "/app/dashboard",
				replace: true
			});
		} catch (err) {
			const code = (err instanceof Error ? err : void 0)?.code ?? "";
			if (code === "auth/email-already-in-use") setError("This email is already registered. Try signing in instead.");
			else if (code === "auth/invalid-email") setError("Please enter a valid email address.");
			else if (code === "auth/weak-password") setError("Password is too weak. Use at least 6 characters.");
			else if (code === "auth/too-many-requests") setError("Too many attempts. Please try again later.");
			else setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
		} finally {
			setSubmitting(false);
		}
	}
	if (loading) return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex items-center gap-2 text-muted-foreground",
			children: [/* @__PURE__ */ jsx("div", { className: "h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" }), "Loading…"]
		})
	});
	return /* @__PURE__ */ jsx("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4 py-12",
		children: /* @__PURE__ */ jsxs("div", {
			className: "w-full max-w-sm",
			children: [
				/* @__PURE__ */ jsxs(Link, {
					to: "/",
					className: "mb-8 flex items-center justify-center gap-2",
					children: [/* @__PURE__ */ jsx("div", {
						className: "grid h-10 w-10 place-items-center rounded-xl bg-primary text-primary-foreground brand-glow",
						children: /* @__PURE__ */ jsx(Waves, { className: "h-5 w-5" })
					}), /* @__PURE__ */ jsxs("span", {
						className: "text-xl font-bold",
						children: ["VoiceForge", /* @__PURE__ */ jsx("span", {
							className: "text-primary",
							children: " AI"
						})]
					})]
				}),
				/* @__PURE__ */ jsxs(Card, {
					className: "glass",
					children: [/* @__PURE__ */ jsxs(CardHeader, {
						className: "text-center",
						children: [/* @__PURE__ */ jsx(CardTitle, {
							className: "text-xl",
							children: "Create your account"
						}), /* @__PURE__ */ jsx(CardDescription, { children: "Start building AI voice agents in minutes" })]
					}), /* @__PURE__ */ jsxs("form", {
						onSubmit: handleSubmit,
						children: [/* @__PURE__ */ jsxs(CardContent, {
							className: "space-y-4",
							children: [
								error && /* @__PURE__ */ jsx("div", {
									className: "rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs font-medium text-destructive",
									children: error
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "businessName",
										children: "Business name"
									}), /* @__PURE__ */ jsx(Input, {
										id: "businessName",
										type: "text",
										placeholder: "Bright Dental",
										value: businessName,
										onChange: (e) => setBusinessName(e.target.value),
										autoComplete: "organization"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "name",
										children: "Full name"
									}), /* @__PURE__ */ jsx(Input, {
										id: "name",
										type: "text",
										placeholder: "Jamie Doe",
										value: name,
										onChange: (e) => setName(e.target.value),
										required: true,
										autoComplete: "name"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "email",
										children: "Email"
									}), /* @__PURE__ */ jsx(Input, {
										id: "email",
										type: "email",
										placeholder: "you@company.com",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										required: true,
										autoComplete: "email"
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "password",
										children: "Password"
									}), /* @__PURE__ */ jsx(Input, {
										id: "password",
										type: "password",
										placeholder: "At least 6 characters",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										required: true,
										minLength: 6,
										autoComplete: "new-password"
									})]
								})
							]
						}), /* @__PURE__ */ jsxs(CardFooter, {
							className: "flex flex-col gap-3",
							children: [/* @__PURE__ */ jsx(Button, {
								type: "submit",
								className: "w-full",
								disabled: submitting,
								children: submitting ? /* @__PURE__ */ jsxs("span", {
									className: "flex items-center gap-2",
									children: [/* @__PURE__ */ jsx("div", { className: "h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" }), "Creating account…"]
								}) : "Create account"
							}), /* @__PURE__ */ jsxs("p", {
								className: "text-xs text-muted-foreground text-center",
								children: [
									"Already have an account?",
									" ",
									/* @__PURE__ */ jsx(Link, {
										to: "/auth/login",
										className: "font-medium text-primary hover:underline",
										children: "Sign in"
									})
								]
							})]
						})]
					})]
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "mt-6 text-center text-xs text-muted-foreground",
					children: [
						"By creating an account, you agree to our",
						" ",
						/* @__PURE__ */ jsx("a", {
							href: "#",
							className: "underline hover:text-foreground",
							children: "Terms"
						}),
						" ",
						"and",
						" ",
						/* @__PURE__ */ jsx("a", {
							href: "#",
							className: "underline hover:text-foreground",
							children: "Privacy Policy"
						}),
						"."
					]
				})
			]
		})
	});
}
//#endregion
export { RegisterPage as component };
