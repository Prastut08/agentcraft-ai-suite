import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Plus, Bot, Phone, BookOpen, BarChart3,
  MessagesSquare, ListChecks, Puzzle, CreditCard, Settings,
  Waves, Search, Bell, Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; accent?: boolean };
const nav: NavItem[] = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/create", label: "Create Agent", icon: Plus, accent: true },
  { to: "/app/agents", label: "My Agents", icon: Bot },
  { to: "/app/numbers", label: "Phone Numbers", icon: Phone },
  { to: "/app/knowledge", label: "Knowledge Base", icon: BookOpen },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/conversations", label: "Conversations", icon: MessagesSquare },
  { to: "/app/logs", label: "Call Logs", icon: ListChecks },
  { to: "/app/integrations", label: "Integrations", icon: Puzzle },
  { to: "/app/billing", label: "Billing", icon: CreditCard },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

function AppLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border/60 bg-sidebar text-sidebar-foreground md:flex">
        <Link to="/" className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5 font-semibold">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground brand-glow">
            <Waves className="h-5 w-5" />
          </div>
          <span>VoiceForge<span className="text-primary"> AI</span></span>
        </Link>
        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {nav.map((item) => {
            const active = pathname === item.to || (item.to !== "/app/dashboard" && pathname.startsWith(item.to));
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                } ${item.accent && !active ? "text-primary" : ""}`}
              >
                <item.icon className="h-4 w-4" />
                <span className="flex-1">{item.label}</span>
                {item.accent && <Sparkles className="h-3.5 w-3.5 opacity-60" />}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <div className="glass rounded-xl p-3 text-xs">
            <div className="mb-2 flex items-center justify-between">
              <span className="font-medium">Usage</span>
              <Badge variant="outline" className="h-5 text-[10px]">Growth</Badge>
            </div>
            <div className="text-muted-foreground">1,842 / 3,000 min</div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sidebar-accent">
              <div className="h-full rounded-full bg-primary" style={{ width: "61%" }} />
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border/60 bg-background/80 px-6 backdrop-blur-xl">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search agents, calls, contacts…" className="h-9 border-border/60 bg-surface pl-9" />
            <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground sm:inline">⌘K</kbd>
          </div>
          <Button variant="ghost" size="icon" className="h-9 w-9"><Bell className="h-4 w-4" /></Button>
          <Link to="/app/create"><Button size="sm"><Plus className="mr-1 h-4 w-4" /> New agent</Button></Link>
          <Avatar className="h-9 w-9"><AvatarFallback className="bg-primary/20 text-primary">JD</AvatarFallback></Avatar>
        </header>
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
