import { o as db } from "./firebase-auth-4nYWua_o.js";
import { n as useAuth } from "./auth-context-D8TD5ErT.js";
import { s as cn, t as Card } from "./card-CMUgrADA.js";
import { t as Badge } from "./badge-DrmkgaLP.js";
import { t as Button } from "./button-D1WH43tQ.js";
import { t as Input } from "./input-tDEmLj55.js";
import { t as Label } from "./label-DQBDE3fv.js";
import { t as Textarea } from "./textarea-4hl39tGn.js";
import * as React from "react";
import { useEffect, useState } from "react";
import { jsx, jsxs } from "react/jsx-runtime";
import { toast } from "sonner";
import { collection, deleteDoc, doc, onSnapshot, serverTimestamp, setDoc } from "firebase/firestore";
import { ArrowUpRight, CheckCircle2, Clock, Cpu, Database, File, FileSpreadsheet, FileText, Filter, Globe, Loader2, Plus, RefreshCw, Search, Sparkles, Trash2, Upload, X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
//#region src/components/ui/dialog.tsx
var Dialog = DialogPrimitive.Root;
var DialogPortal = DialogPrimitive.Portal;
var DialogOverlay = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;
var DialogContent = React.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ jsxs(DialogPortal, { children: [/* @__PURE__ */ jsx(DialogOverlay, {}), /* @__PURE__ */ jsxs(DialogPrimitive.Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ jsxs(DialogPrimitive.Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ jsx(X, { className: "h-4 w-4" }), /* @__PURE__ */ jsx("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = DialogPrimitive.Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsx("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = DialogPrimitive.Title.displayName;
var DialogDescription = React.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(DialogPrimitive.Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = DialogPrimitive.Description.displayName;
//#endregion
//#region src/routes/app.knowledge.tsx?tsr-split=component
var statusCfg = {
	Embedded: {
		label: "Embedded",
		badge: "bg-success/12 text-success border-success/20",
		dot: "bg-success"
	},
	Processing: {
		label: "Processing",
		badge: "bg-warning/12 text-warning border-warning/20",
		dot: "bg-warning"
	},
	Error: {
		label: "Error",
		badge: "bg-destructive/12 text-destructive border-destructive/20",
		dot: "bg-destructive"
	}
};
var getDocIconAndColor = (type) => {
	switch (type.toUpperCase()) {
		case "PDF": return {
			icon: FileText,
			color: "bg-destructive/12 text-destructive"
		};
		case "DOCX": return {
			icon: File,
			color: "bg-primary/12 text-primary"
		};
		case "XLSX": return {
			icon: FileSpreadsheet,
			color: "bg-success/12 text-success"
		};
		case "URL": return {
			icon: Globe,
			color: "bg-accent/12 text-accent"
		};
		case "FAQ": return {
			icon: FileText,
			color: "bg-primary/12 text-primary"
		};
		default: return {
			icon: FileText,
			color: "bg-destructive/12 text-destructive"
		};
	}
};
function KB() {
	const { user } = useAuth();
	const [docs, setDocs] = useState([]);
	const [loading, setLoading] = useState(true);
	const [dragging, setDragging] = useState(false);
	const [search, setSearch] = useState("");
	const [dialogOpen, setDialogOpen] = useState(false);
	const [docType, setDocType] = useState("URL");
	const [docName, setDocName] = useState("");
	const [docContent, setDocContent] = useState("");
	const [savingDoc, setSavingDoc] = useState(false);
	useEffect(() => {
		if (!user) return;
		return onSnapshot(collection(db, "users", user.uid, "knowledge"), (snapshot) => {
			const list = [];
			snapshot.forEach((doc) => {
				list.push({
					id: doc.id,
					...doc.data()
				});
			});
			setDocs(list);
			setLoading(false);
		}, (err) => {
			console.error("Failed to load knowledge", err);
			setLoading(false);
		});
	}, [user]);
	const handleOpenDialog = (type) => {
		setDocType(type);
		setDocName("");
		setDocContent("");
		setDialogOpen(true);
	};
	const handleAddDoc = async () => {
		if (!user || !docName.trim()) return;
		setSavingDoc(true);
		try {
			const newDocRef = doc(collection(db, "users", user.uid, "knowledge"));
			await setDoc(newDocRef, {
				id: newDocRef.id,
				n: docName.trim(),
				type: docType,
				size: docType === "URL" ? "1 page" : docType === "FAQ" ? "Q&A" : "12 KB",
				status: "Embedded",
				chunks: docType === "FAQ" ? 1 : Math.floor(Math.random() * 10) + 1,
				updated: "Just now",
				confidence: 99,
				createdAt: serverTimestamp()
			});
			toast.success("Document added to knowledge base successfully!");
			setDialogOpen(false);
		} catch (err) {
			console.error(err);
			toast.error("Failed to add document.");
		} finally {
			setSavingDoc(false);
		}
	};
	const handleDeleteDoc = async (docId, name) => {
		if (!user || !confirm(`Delete ${name} from knowledge base?`)) return;
		try {
			await deleteDoc(doc(db, "users", user.uid, "knowledge", docId));
			toast.success("Document deleted.");
		} catch (err) {
			console.error(err);
			toast.error("Failed to delete document.");
		}
	};
	const filtered = docs.filter((d) => d.n.toLowerCase().includes(search.toLowerCase()));
	const totalChunks = docs.reduce((sum, d) => sum + (d.chunks || 0), 0);
	const embeddedCount = docs.filter((d) => d.status === "Embedded").length;
	return /* @__PURE__ */ jsxs("div", {
		className: "space-y-8 animate-fade-in",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h1", {
					className: "text-3xl font-bold tracking-tight",
					children: "Knowledge Base"
				}), /* @__PURE__ */ jsxs("p", {
					className: "mt-1.5 text-sm text-muted-foreground",
					children: [
						docs.length,
						" source",
						docs.length !== 1 ? "s" : "",
						" · ",
						totalChunks,
						" ",
						"chunks ·",
						" ",
						docs.length > 0 ? `${embeddedCount} embedded` : "No data yet"
					]
				})] }), /* @__PURE__ */ jsxs("div", {
					className: "flex gap-2",
					children: [/* @__PURE__ */ jsxs(Button, {
						variant: "outline",
						size: "sm",
						className: "border-border/60",
						onClick: () => handleOpenDialog("FAQ"),
						children: [/* @__PURE__ */ jsx(Plus, { className: "mr-2 h-3.5 w-3.5" }), "Add Q&A"]
					}), /* @__PURE__ */ jsxs(Button, {
						size: "sm",
						className: "bg-primary text-primary-foreground font-medium shadow-md",
						onClick: () => handleOpenDialog("PDF"),
						children: [/* @__PURE__ */ jsx(Upload, { className: "mr-2 h-3.5 w-3.5" }), "Upload Document"]
					})]
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-4 md:grid-cols-4",
				children: [
					{
						label: "Total Sources",
						value: docs.length.toString(),
						icon: Database,
						color: "primary"
					},
					{
						label: "Embedding Health",
						value: docs.length > 0 ? `${embeddedCount}/${docs.length} ok` : "—",
						icon: CheckCircle2,
						color: "success"
					},
					{
						label: "Total Chunks",
						value: totalChunks.toString(),
						icon: Cpu,
						color: "accent"
					},
					{
						label: "Last Re-trained",
						value: docs.length > 0 ? "Just now" : "Never",
						icon: Clock,
						color: "muted"
					}
				].map((s) => /* @__PURE__ */ jsxs(Card, {
					className: "glass p-5",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ jsx("div", {
							className: `grid h-8 w-8 place-items-center rounded-lg ${s.color === "primary" ? "bg-primary/12 text-primary" : s.color === "success" ? "bg-success/12 text-success" : s.color === "accent" ? "bg-accent/12 text-accent" : "bg-muted/50 text-muted-foreground"}`,
							children: /* @__PURE__ */ jsx(s.icon, { className: "h-4 w-4" })
						}), /* @__PURE__ */ jsx("span", {
							className: "text-xs text-muted-foreground",
							children: s.label
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: `mt-3 text-2xl font-bold tracking-tight ${s.color === "success" ? "text-success" : ""}`,
						children: s.value
					})]
				}, s.label))
			}),
			/* @__PURE__ */ jsxs("div", {
				onDragOver: (e) => {
					e.preventDefault();
					setDragging(true);
				},
				onDragLeave: () => setDragging(false),
				onDrop: (e) => {
					e.preventDefault();
					setDragging(false);
					handleOpenDialog("PDF");
				},
				className: `relative overflow-hidden rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-200 ${dragging ? "border-primary/70 bg-primary/8 scale-[1.01]" : "border-border/50 hover:border-primary/40 hover:bg-primary/4"}`,
				children: [/* @__PURE__ */ jsx("div", { className: "absolute inset-0 dot-pattern opacity-40" }), /* @__PURE__ */ jsxs("div", {
					className: "relative flex flex-col items-center",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "mb-4 grid h-16 w-16 place-items-center rounded-2xl bg-primary/12 text-primary",
							children: /* @__PURE__ */ jsx(Upload, { className: "h-7 w-7" })
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "text-base font-semibold",
							children: dragging ? "Drop to upload" : "Drag & drop files here"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-1.5 text-sm text-muted-foreground",
							children: "PDF, DOCX, TXT, CSV, XLSX · up to 50 MB per file"
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-5 flex flex-wrap justify-center gap-2",
							children: [
								/* @__PURE__ */ jsx(Button, {
									variant: "outline",
									size: "sm",
									className: "border-border/60",
									onClick: () => handleOpenDialog("PDF"),
									children: "Browse Files"
								}),
								/* @__PURE__ */ jsxs(Button, {
									variant: "outline",
									size: "sm",
									className: "border-border/60",
									onClick: () => handleOpenDialog("URL"),
									children: [/* @__PURE__ */ jsx(Globe, { className: "mr-2 h-3.5 w-3.5" }), "Import URL"]
								}),
								/* @__PURE__ */ jsxs(Button, {
									variant: "outline",
									size: "sm",
									className: "border-border/60",
									onClick: () => handleOpenDialog("TXT"),
									children: [/* @__PURE__ */ jsx(Plus, { className: "mr-2 h-3.5 w-3.5" }), "Paste Text"]
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ jsxs(Card, {
				className: "glass overflow-hidden",
				children: [
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center gap-3 border-b border-border/50 p-4",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "relative flex-1 max-w-sm",
								children: [/* @__PURE__ */ jsx(Search, { className: "absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" }), /* @__PURE__ */ jsx(Input, {
									placeholder: "Search documents…",
									className: "h-9 border-border/50 bg-surface/60 pl-9 text-sm",
									value: search,
									onChange: (e) => setSearch(e.target.value)
								})]
							}),
							/* @__PURE__ */ jsxs(Button, {
								variant: "outline",
								size: "sm",
								className: "border-border/60 ml-auto",
								children: [/* @__PURE__ */ jsx(Filter, { className: "mr-2 h-3.5 w-3.5" }), "Filter"]
							}),
							/* @__PURE__ */ jsxs(Button, {
								variant: "outline",
								size: "sm",
								className: "border-border/60",
								children: [/* @__PURE__ */ jsx(RefreshCw, { className: "mr-2 h-3.5 w-3.5" }), "Re-train Agents"]
							})
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center gap-4 border-b border-border/30 bg-muted/10 px-5 py-2.5 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "w-10",
								children: "Type"
							}),
							/* @__PURE__ */ jsx("span", { children: "Document" }),
							/* @__PURE__ */ jsx("span", {
								className: "w-24 text-center",
								children: "Chunks"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "w-20 text-center",
								children: "Confidence"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "w-24 text-center",
								children: "Status"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "w-16 text-center",
								children: "Actions"
							})
						]
					}),
					loading ? /* @__PURE__ */ jsxs("div", {
						className: "flex justify-center items-center py-12 gap-2",
						children: [/* @__PURE__ */ jsx(Loader2, { className: "h-5 w-5 animate-spin text-primary" }), /* @__PURE__ */ jsx("span", {
							className: "text-sm text-muted-foreground",
							children: "Loading knowledge base..."
						})]
					}) : filtered.length === 0 ? /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col items-center justify-center gap-3 px-5 py-12 text-center",
						children: [/* @__PURE__ */ jsx("div", {
							className: "grid h-12 w-12 place-items-center rounded-2xl bg-muted/50 text-muted-foreground",
							children: /* @__PURE__ */ jsx(FileText, { className: "h-6 w-6" })
						}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
							className: "text-sm font-semibold text-muted-foreground",
							children: "No documents uploaded yet"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-xs text-muted-foreground/70",
							children: "Upload your first document to get started."
						})] })]
					}) : /* @__PURE__ */ jsx("div", {
						className: "divide-y divide-border/30",
						children: filtered.map((d) => {
							const sc = statusCfg[d.status] || statusCfg.Embedded;
							const { icon: Icon, color } = getDocIconAndColor(d.type);
							return /* @__PURE__ */ jsxs("div", {
								className: "group grid grid-cols-[auto_1fr_auto_auto_auto_auto] items-center gap-4 px-5 py-4 transition hover:bg-muted/20",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: `grid h-10 w-10 place-items-center rounded-xl ${color}`,
										children: /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5" })
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ jsx("div", {
											className: "truncate font-medium",
											children: d.n
										}), /* @__PURE__ */ jsxs("div", {
											className: "mt-0.5 flex items-center gap-2 text-xs text-muted-foreground",
											children: [
												/* @__PURE__ */ jsx("span", {
													className: "rounded bg-muted/50 px-1.5 py-0.5 font-mono text-[10px]",
													children: d.type
												}),
												/* @__PURE__ */ jsx("span", { children: d.size }),
												/* @__PURE__ */ jsx("span", { children: "·" }),
												/* @__PURE__ */ jsxs("span", { children: ["Updated ", d.updated] })
											]
										})]
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "w-24 text-center",
										children: [/* @__PURE__ */ jsx("span", {
											className: "text-sm font-semibold",
											children: d.chunks || "—"
										}), d.chunks > 0 && /* @__PURE__ */ jsx("div", {
											className: "text-[10px] text-muted-foreground",
											children: "chunks"
										})]
									}),
									/* @__PURE__ */ jsx("div", {
										className: "w-20",
										children: d.confidence > 0 ? /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col items-center gap-1",
											children: [/* @__PURE__ */ jsxs("span", {
												className: "text-sm font-bold text-success",
												children: [d.confidence, "%"]
											}), /* @__PURE__ */ jsx("div", {
												className: "h-1 w-full overflow-hidden rounded-full bg-muted/50",
												children: /* @__PURE__ */ jsx("div", {
													className: "h-full rounded-full bg-success",
													style: { width: `${d.confidence}%` }
												})
											})]
										}) : /* @__PURE__ */ jsxs("div", {
											className: "flex items-center justify-center gap-1 text-xs text-muted-foreground",
											children: [/* @__PURE__ */ jsx(Loader2, { className: "h-3 w-3 animate-spin" }), /* @__PURE__ */ jsx("span", { children: "…" })]
										})
									}),
									/* @__PURE__ */ jsx("div", {
										className: "flex w-24 justify-center",
										children: /* @__PURE__ */ jsxs(Badge, {
											className: `rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${sc.badge}`,
											children: [/* @__PURE__ */ jsx("span", { className: `mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${sc.dot} ${d.status === "Processing" ? "animate-pulse" : ""}` }), sc.label]
										})
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "flex w-16 justify-center gap-1 opacity-0 transition-opacity group-hover:opacity-100",
										children: [/* @__PURE__ */ jsx(Button, {
											size: "icon",
											variant: "ghost",
											className: "h-7 w-7 text-muted-foreground hover:text-foreground",
											children: /* @__PURE__ */ jsx(ArrowUpRight, { className: "h-3.5 w-3.5" })
										}), /* @__PURE__ */ jsx(Button, {
											size: "icon",
											variant: "ghost",
											className: "h-7 w-7 text-muted-foreground hover:text-destructive",
											onClick: () => handleDeleteDoc(d.id, d.n),
											children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
										})]
									})
								]
							}, d.id);
						})
					})
				]
			}),
			docs.length > 0 && /* @__PURE__ */ jsx(Card, {
				className: "relative overflow-hidden border border-border bg-surface p-5",
				children: /* @__PURE__ */ jsxs("div", {
					className: "flex items-start gap-4",
					children: [
						/* @__PURE__ */ jsx("div", {
							className: "grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/20 text-primary",
							children: /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" })
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "min-w-0 flex-1",
							children: [/* @__PURE__ */ jsx("div", {
								className: "text-sm font-semibold",
								children: "Knowledge Gaps Detected"
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-0.5 text-xs text-muted-foreground",
								children: "Gap analysis will appear here after your agents handle calls and unanswered questions are detected."
							})]
						}),
						/* @__PURE__ */ jsx(Button, {
							variant: "outline",
							size: "sm",
							className: "shrink-0 border-primary/30 text-primary hover:bg-primary/10",
							onClick: () => handleOpenDialog("FAQ"),
							children: "Add FAQ"
						})
					]
				})
			}),
			/* @__PURE__ */ jsx(Dialog, {
				open: dialogOpen,
				onOpenChange: setDialogOpen,
				children: /* @__PURE__ */ jsxs(DialogContent, {
					className: "sm:max-w-[425px]",
					children: [
						/* @__PURE__ */ jsx(DialogHeader, { children: /* @__PURE__ */ jsx(DialogTitle, { children: "Add to Knowledge Base" }) }),
						/* @__PURE__ */ jsxs("div", {
							className: "space-y-4 py-4",
							children: [
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "docType",
										children: "Type"
									}), /* @__PURE__ */ jsxs("select", {
										id: "docType",
										value: docType,
										onChange: (e) => setDocType(e.target.value),
										className: "w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
										children: [
											/* @__PURE__ */ jsx("option", {
												value: "PDF",
												children: "PDF File"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "DOCX",
												children: "Word Document (DOCX)"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "XLSX",
												children: "Spreadsheet (XLSX)"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "URL",
												children: "Website URL"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "FAQ",
												children: "FAQ Q&A"
											}),
											/* @__PURE__ */ jsx("option", {
												value: "TXT",
												children: "Plain Text"
											})
										]
									})]
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "docName",
										children: "Name / Title"
									}), /* @__PURE__ */ jsx(Input, {
										id: "docName",
										placeholder: docType === "URL" ? "E.g., Company Website" : docType === "FAQ" ? "E.g., Refund Policy FAQ" : "E.g., Product Catalog",
										value: docName,
										onChange: (e) => setDocName(e.target.value)
									})]
								}),
								docType === "URL" && /* @__PURE__ */ jsxs("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "urlLink",
										children: "URL Address"
									}), /* @__PURE__ */ jsx(Input, {
										id: "urlLink",
										placeholder: "https://example.com"
									})]
								}),
								(docType === "TXT" || docType === "FAQ") && /* @__PURE__ */ jsxs("div", {
									className: "space-y-1",
									children: [/* @__PURE__ */ jsx(Label, {
										htmlFor: "docContent",
										children: docType === "FAQ" ? "Q&A Content (Question & Answer)" : "Text Content"
									}), /* @__PURE__ */ jsx(Textarea, {
										id: "docContent",
										rows: 4,
										placeholder: docType === "FAQ" ? "Q: Do you offer free shipping?\nA: Yes, on orders over $50." : "Paste knowledge content here...",
										value: docContent,
										onChange: (e) => setDocContent(e.target.value)
									})]
								}),
								(docType === "PDF" || docType === "DOCX" || docType === "XLSX") && /* @__PURE__ */ jsxs("div", {
									className: "py-4 border-2 border-dashed border-border rounded-lg text-center bg-muted/20",
									children: [/* @__PURE__ */ jsx(Upload, { className: "mx-auto h-6 w-6 text-muted-foreground mb-1" }), /* @__PURE__ */ jsx("span", {
										className: "text-xs text-muted-foreground",
										children: "Mock File Ready to Import"
									})]
								})
							]
						}),
						/* @__PURE__ */ jsxs(DialogFooter, { children: [/* @__PURE__ */ jsx(Button, {
							variant: "outline",
							onClick: () => setDialogOpen(false),
							children: "Cancel"
						}), /* @__PURE__ */ jsx(Button, {
							onClick: handleAddDoc,
							disabled: savingDoc || !docName.trim(),
							children: savingDoc ? "Adding..." : "Add to Knowledge"
						})] })
					]
				})
			})
		]
	});
}
//#endregion
export { KB as component };
