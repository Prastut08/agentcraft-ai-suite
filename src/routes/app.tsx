import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Plus, Bot, Phone, BookOpen, BarChart3,
  MessagesSquare, ListChecks, Puzzle, CreditCard, Settings,
  Waves, Search, Bell, Sparkles, ChevronLeft, ChevronRight,
  Command, Activity, TrendingUp, Zap, Shield, Sun, Moon,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard; accent?: boolean; badge?: string };

const navMain: NavItem[] = [
  { to: "/app/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/app/create", label: "Create Agent", icon: Plus, accent: true },
  { to: "/app/agents", label: "My Agents", icon: Bot, badge: "6" },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/conversations", label: "Conversations", icon: MessagesSquare },
  { to: "/app/logs", label: "Call Logs", icon: ListChecks },
];

const navSystem: NavItem[] = [
  { to: "/app/knowledge", label: "Knowledge Base", icon: BookOpen },
  { to: "/app/numbers", label: "Phone Numbers", icon: Phone },
  { to: "/app/integrations", label: "Integrations", icon: Puzzle },
  { to: "/app/billing", label: "Billing", icon: CreditCard },
  { to: "/app/settings", label: "Settings", icon: Settings },
];

function NavLink({ item, active, collapsed }: { item: NavItem; active: boolean; collapsed: boolean }) {
  return (
    <Link
      to={item.to as string as "/app/dashboard"}
      title={collapsed ? item.label : undefined}
      className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ${
        active
          ? "nav-active text-foreground"
          : item.accent
          ? "text-primary hover:bg-primary/8 hover:text-primary"
          : "text-sidebar-foreground/60 hover:bg-sidebar-accent/70 hover:text-sidebar-foreground"
      }`}
    >
      {/* Active left-border indicator */}
      {active && (
        <span className="absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r-full bg-primary" />
      )}
      <item.icon className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${collapsed ? "h-5 w-5" : "h-4 w-4"}`} />
      {!collapsed && (
        <>
          <span className="flex-1 truncate">{item.label}</span>
          {item.accent && !active && (
            <Sparkles className="h-3 w-3 text-primary/70" />
          )}
          {item.badge && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary">
              {item.badge}
            </span>
          )}
        </>
      )}
    </Link>
  );
}

function AppLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [collapsed, setCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const usagePercent = 61;

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* ─── Sidebar ─── */}
      <aside
        className={`sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex transition-all duration-300 ease-in-out ${
          collapsed ? "w-[68px]" : "w-[240px]"
        }`}
      >
        {/* Logo */}
        <div className={`flex h-16 items-center border-b border-sidebar-border px-4 ${collapsed ? "justify-center" : "gap-3"}`}>
          <Link to="/" className="flex items-center gap-3 min-w-0">
            <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-md">
              <Waves className="h-5 w-5" />
              {/* Animated glow dot */}
              <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-sidebar bg-success" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="text-sm font-bold leading-none text-foreground">
                  VoiceForge AI
                </div>
                <div className="mt-0.5 text-[10px] text-muted-foreground">Enterprise Platform</div>
              </div>
            )}
          </Link>
        </div>

        {/* Workspace pill */}
        {!collapsed && (
          <div className="mx-3 mt-3">
            <button className="flex w-full items-center gap-2 rounded-lg border border-sidebar-border bg-sidebar-accent/40 px-3 py-2 text-left text-xs transition hover:bg-sidebar-accent">
              <div className="flex h-5 w-5 items-center justify-center rounded bg-primary/20 text-[10px] font-bold text-primary">B</div>
              <span className="flex-1 truncate font-medium text-sidebar-foreground/80">Bright Dental</span>
              <ChevronRight className="h-3 w-3 text-muted-foreground" />
            </button>
          </div>
        )}

        {/* Main nav */}
        <nav className={`flex-1 space-y-0.5 overflow-y-auto py-3 ${collapsed ? "px-2" : "px-3"}`}>
          {!collapsed && (
            <div className="mb-1 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              Platform
            </div>
          )}
          {navMain.map((item) => {
            const active = pathname === item.to || (item.to !== "/app/dashboard" && pathname.startsWith(item.to));
            return <NavLink key={item.to} item={item} active={active} collapsed={collapsed} />;
          })}

          {!collapsed && (
            <div className="mb-1 mt-4 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/50">
              Configuration
            </div>
          )}
          {collapsed && <div className="my-2 h-px bg-sidebar-border" />}
          {navSystem.map((item) => {
            const active = pathname === item.to;
            return <NavLink key={item.to} item={item} active={active} collapsed={collapsed} />;
          })}
        </nav>

        {/* Usage + profile */}
        <div className={`border-t border-sidebar-border ${collapsed ? "p-2" : "p-3"} space-y-2`}>
          {!collapsed && (
            <div className="rounded-xl border border-sidebar-border bg-sidebar-accent/30 p-3">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-xs font-semibold text-sidebar-foreground/80">Monthly Usage</span>
                <Badge variant="outline" className="h-4 border-primary/30 bg-primary/10 px-1.5 text-[9px] text-primary">
                  Growth
                </Badge>
              </div>
              <div className="flex items-baseline justify-between text-xs text-muted-foreground">
                <span className="font-medium text-foreground">1,842 min</span>
                <span>/ 3,000</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sidebar-accent">
                <div
                  className="h-full rounded-full transition-all duration-700 bg-primary"
                  style={{ width: `${usagePercent}%` }}
                />
              </div>
              <div className="mt-1 text-[10px] text-muted-foreground">{100 - usagePercent}% remaining this month</div>
            </div>
          )}

          {/* User profile */}
          <button className={`flex w-full items-center gap-2.5 rounded-xl p-2 transition hover:bg-sidebar-accent ${collapsed ? "justify-center" : ""}`}>
            <Avatar className="h-8 w-8 shrink-0">
              <AvatarFallback className="bg-surface-2 border border-border text-xs font-semibold text-foreground">
                JD
              </AvatarFallback>
            </Avatar>
            {!collapsed && (
              <div className="min-w-0 flex-1 text-left">
                <div className="truncate text-xs font-semibold text-sidebar-foreground">Jamie Doe</div>
                <div className="truncate text-[10px] text-muted-foreground">Owner · Bright Dental</div>
              </div>
            )}
          </button>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed((c) => !c)}
          className="absolute -right-3 top-20 flex h-6 w-6 items-center justify-center rounded-full border border-sidebar-border bg-sidebar text-muted-foreground shadow-sm transition hover:bg-sidebar-accent hover:text-foreground"
        >
          {collapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
        </button>
      </aside>

      {/* ─── Main ─── */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Topbar */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border/50 bg-background/85 px-6 backdrop-blur-xl">
          {/* Search */}
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search agents, calls, contacts…"
              className="h-9 border-border/50 bg-surface/60 pl-9 text-sm placeholder:text-muted-foreground/60 focus:bg-surface"
            />
            <div className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 items-center gap-1 sm:flex">
              <kbd className="flex h-5 items-center rounded border border-border/70 bg-muted px-1.5 font-mono text-[9px] text-muted-foreground">⌘</kbd>
              <kbd className="flex h-5 items-center rounded border border-border/70 bg-muted px-1.5 font-mono text-[9px] text-muted-foreground">K</kbd>
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {/* System status pill */}
            <div className="hidden items-center gap-1.5 rounded-full border border-success/20 bg-success/10 px-3 py-1 sm:flex">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
              <span className="text-[10px] font-medium text-success">All systems operational</span>
            </div>

            {/* Dark / Light Theme Toggle */}
            <Button
              variant="outline"
              size="icon"
              className="h-9 w-9 border-border/60 text-muted-foreground hover:text-foreground"
              title={isDark ? "Switch to Light Mode (Wheat & Brown)" : "Switch to Dark Mode (Black & Gray)"}
              onClick={() => setIsDark((d) => !d)}
            >
              {isDark ? <Sun className="h-4 w-4 text-amber-500" /> : <Moon className="h-4 w-4 text-foreground" />}
            </Button>

            {/* Notifications */}
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 text-muted-foreground hover:text-foreground"
                onClick={() => setNotifOpen((o) => !o)}
              >
                <Bell className="h-4 w-4" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
              </Button>

              {notifOpen && (
                <div className="absolute right-0 top-12 z-50 w-80 animate-scale-in overflow-hidden rounded-2xl border border-border/60 bg-popover shadow-2xl">
                  <div className="flex items-center justify-between border-b border-border/50 px-4 py-3">
                    <span className="text-sm font-semibold">Notifications</span>
                    <Badge className="bg-primary/15 text-primary text-xs">3 new</Badge>
                  </div>
                  <div className="divide-y divide-border/40">
                    {[
                      { icon: Activity, title: "Agent Aria is offline", time: "2m ago", type: "warn" },
                      { icon: TrendingUp, title: "New milestone: 1,000 calls handled", time: "1h ago", type: "success" },
                      { icon: Zap, title: "Knowledge base re-embedded", time: "2h ago", type: "info" },
                    ].map((n, i) => (
                      <div key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-muted/30 cursor-pointer">
                        <div className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg ${
                          n.type === "warn" ? "bg-destructive/15 text-destructive"
                          : n.type === "success" ? "bg-success/15 text-success"
                          : "bg-primary/15 text-primary"
                        }`}>
                          <n.icon className="h-4 w-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="text-sm font-medium">{n.title}</div>
                          <div className="text-xs text-muted-foreground">{n.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-border/50 px-4 py-2.5">
                    <button className="text-xs font-medium text-primary hover:underline">View all notifications</button>
                  </div>
                </div>
              )}
            </div>

            {/* Quick create */}
            <Link to="/app/create">
              <Button size="sm" className="h-9 gap-1.5 bg-primary text-primary-foreground font-medium shadow-md transition">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">New Agent</span>
              </Button>
            </Link>

            {/* Avatar */}
            <Avatar className="h-9 w-9 cursor-pointer ring-2 ring-border/50 transition hover:ring-primary/40">
              <AvatarFallback className="bg-surface-2 border border-border text-xs font-semibold text-foreground">
                JD
              </AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 md:p-8">
          <Outlet />
        </main>
      </div>

      {/* Click-away for notifications */}
      {notifOpen && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setNotifOpen(false)}
        />
      )}
    </div>
  );
}
