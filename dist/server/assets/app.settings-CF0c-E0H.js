import { o as db } from "./firebase-auth-4nYWua_o.js";
import { n as useAuth } from "./auth-context-D8TD5ErT.js";
import { s as cn, t as Card } from "./card-CMUgrADA.js";
import { t as Button } from "./button-D1WH43tQ.js";
import { t as Input } from "./input-tDEmLj55.js";
import { t as Label } from "./label-DQBDE3fv.js";
import { i as TabsTrigger, n as TabsContent, r as TabsList, t as Tabs } from "./tabs-BvkulN0d.js";
import * as React from "react";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { doc, getDoc, setDoc } from "firebase/firestore";
import * as SwitchPrimitives from "@radix-ui/react-switch";
//#region src/components/ui/switch.tsx
var Switch = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(SwitchPrimitives.Root, {
	className: cn("peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input", className),
	...props,
	ref,
	children: /* @__PURE__ */ jsx(SwitchPrimitives.Thumb, { className: cn("pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0") })
}));
Switch.displayName = SwitchPrimitives.Root.displayName;
//#endregion
//#region src/routes/app.settings.tsx?tsr-split=component
function Settings() {
	const { user } = useAuth();
	const [saving, setSaving] = useState(false);
	const [form, setForm] = useState({
		businessName: "",
		website: "",
		email: "",
		phone: "",
		address: ""
	});
	useEffect(() => {
		if (!user) return;
		const fetchProfile = async () => {
			try {
				const docSnap = await getDoc(doc(db, "users", user.uid));
				if (docSnap.exists()) {
					const data = docSnap.data();
					const info = data.businessInfo || {};
					setForm({
						businessName: data.businessName || info.businessName || "",
						website: info.website || "",
						email: info.email || "",
						phone: info.phone || info.phoneNumber || "",
						address: info.address || ""
					});
				}
			} catch (err) {
				console.error("Failed to load settings from database:", err);
			}
		};
		fetchProfile();
	}, [user]);
	const handleSave = async () => {
		if (!user) return;
		setSaving(true);
		try {
			await setDoc(doc(db, "users", user.uid), {
				businessName: form.businessName,
				businessInfo: {
					businessName: form.businessName,
					website: form.website,
					email: form.email,
					phone: form.phone,
					phoneNumber: form.phone,
					address: form.address
				}
			}, { merge: true });
			toast.success("Business profile saved successfully!");
		} catch (err) {
			console.error(err);
			toast.error("Failed to save changes. Please try again.");
		} finally {
			setSaving(false);
		}
	};
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-6",
		children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
			className: "text-3xl font-bold",
			children: "Settings"
		}), /* @__PURE__ */ jsx("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Manage your business, team, and platform preferences."
		})] }), /* @__PURE__ */ jsxs(Tabs, {
			defaultValue: "profile",
			children: [
				/* @__PURE__ */ jsxs(TabsList, { children: [
					/* @__PURE__ */ jsx(TabsTrigger, {
						value: "profile",
						children: "Business Profile"
					}),
					/* @__PURE__ */ jsx(TabsTrigger, {
						value: "team",
						children: "Team"
					}),
					/* @__PURE__ */ jsx(TabsTrigger, {
						value: "api",
						children: "API Keys"
					}),
					/* @__PURE__ */ jsx(TabsTrigger, {
						value: "notifs",
						children: "Notifications"
					}),
					/* @__PURE__ */ jsx(TabsTrigger, {
						value: "security",
						children: "Security"
					}),
					/* @__PURE__ */ jsx(TabsTrigger, {
						value: "audit",
						children: "Audit Logs"
					})
				] }),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "profile",
					className: "mt-6",
					children: /* @__PURE__ */ jsxs(Card, {
						className: "glass p-6",
						children: [/* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 md:grid-cols-2",
							children: [
								/* @__PURE__ */ jsx(F, {
									label: "Business name",
									children: /* @__PURE__ */ jsx(Input, {
										value: form.businessName,
										onChange: (e) => setForm({
											...form,
											businessName: e.target.value
										}),
										placeholder: "E.g., Bright Dental"
									})
								}),
								/* @__PURE__ */ jsx(F, {
									label: "Website",
									children: /* @__PURE__ */ jsx(Input, {
										value: form.website,
										onChange: (e) => setForm({
											...form,
											website: e.target.value
										}),
										placeholder: "https://example.com"
									})
								}),
								/* @__PURE__ */ jsx(F, {
									label: "Email",
									children: /* @__PURE__ */ jsx(Input, {
										value: form.email,
										onChange: (e) => setForm({
											...form,
											email: e.target.value
										}),
										placeholder: "contact@example.com"
									})
								}),
								/* @__PURE__ */ jsx(F, {
									label: "Phone",
									children: /* @__PURE__ */ jsx(Input, {
										value: form.phone,
										onChange: (e) => setForm({
											...form,
											phone: e.target.value
										}),
										placeholder: "+1 (555) 000-0000"
									})
								}),
								/* @__PURE__ */ jsx("div", {
									className: "md:col-span-2",
									children: /* @__PURE__ */ jsx(F, {
										label: "Address",
										children: /* @__PURE__ */ jsx(Input, {
											value: form.address,
											onChange: (e) => setForm({
												...form,
												address: e.target.value
											}),
											placeholder: "123 Main St, City, State"
										})
									})
								})
							]
						}), /* @__PURE__ */ jsx("div", {
							className: "mt-6 flex justify-end",
							children: /* @__PURE__ */ jsx(Button, {
								onClick: handleSave,
								disabled: saving,
								children: saving ? "Saving..." : "Save changes"
							})
						})]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "team",
					className: "mt-6",
					children: /* @__PURE__ */ jsxs(Card, {
						className: "glass p-6",
						children: [/* @__PURE__ */ jsx("div", {
							className: "py-8 text-center text-sm text-muted-foreground",
							children: "No team members yet"
						}), /* @__PURE__ */ jsx(Button, {
							className: "mt-4",
							children: "Invite teammate"
						})]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "api",
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Card, {
						className: "glass p-6",
						children: /* @__PURE__ */ jsx("div", {
							className: "rounded-xl border border-border/60 p-4 font-mono text-sm",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsx("span", { children: "No API key generated" }), /* @__PURE__ */ jsx(Button, {
									size: "sm",
									variant: "outline",
									children: "Generate new key"
								})]
							})
						})
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "notifs",
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Card, {
						className: "glass p-6 space-y-4",
						children: [
							"Notify me when an agent goes offline",
							"Daily summary email",
							"SMS on missed VIP calls",
							"Slack alert for escalations"
						].map((n) => /* @__PURE__ */ jsxs("div", {
							className: "flex items-center justify-between border-b border-border/40 pb-3 last:border-0 last:pb-0",
							children: [/* @__PURE__ */ jsx("span", {
								className: "text-sm",
								children: n
							}), /* @__PURE__ */ jsx(Switch, { defaultChecked: true })]
						}, n))
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "security",
					className: "mt-6",
					children: /* @__PURE__ */ jsxs(Card, {
						className: "glass p-6 space-y-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
									className: "font-medium",
									children: "Two-factor auth"
								}), /* @__PURE__ */ jsx("div", {
									className: "text-xs text-muted-foreground",
									children: "Require 2FA for all admins"
								})] }), /* @__PURE__ */ jsx(Switch, { defaultChecked: true })]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
									className: "font-medium",
									children: "SSO / SAML"
								}), /* @__PURE__ */ jsx("div", {
									className: "text-xs text-muted-foreground",
									children: "Enterprise plan only"
								})] }), /* @__PURE__ */ jsx(Switch, {})]
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "flex items-center justify-between",
								children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
									className: "font-medium",
									children: "Session timeout"
								}), /* @__PURE__ */ jsx("div", {
									className: "text-xs text-muted-foreground",
									children: "Auto sign-out after 30 min"
								})] }), /* @__PURE__ */ jsx(Switch, { defaultChecked: true })]
							})
						]
					})
				}),
				/* @__PURE__ */ jsx(TabsContent, {
					value: "audit",
					className: "mt-6",
					children: /* @__PURE__ */ jsx(Card, {
						className: "glass p-6",
						children: /* @__PURE__ */ jsx("div", {
							className: "py-8 text-center text-sm text-muted-foreground",
							children: "No activity yet"
						})
					})
				})
			]
		})]
	});
}
function F({ label, children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-1.5",
		children: [/* @__PURE__ */ jsx(Label, {
			className: "text-xs uppercase text-muted-foreground",
			children: label
		}), children]
	});
}
//#endregion
export { Settings as component };
