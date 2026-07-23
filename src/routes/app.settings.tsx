import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/app/settings")({
  component: Settings,
});

function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your business, team, and platform preferences.
        </p>
      </div>

      <Tabs defaultValue="profile">
        <TabsList>
          <TabsTrigger value="profile">Business Profile</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
          <TabsTrigger value="notifs">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="audit">Audit Logs</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="mt-6">
          <Card className="glass p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <F label="Business name">
                <Input defaultValue="Bright Dental" />
              </F>
              <F label="Website">
                <Input defaultValue="https://brightdental.com" />
              </F>
              <F label="Email">
                <Input defaultValue="hello@brightdental.com" />
              </F>
              <F label="Phone">
                <Input defaultValue="+1 (415) 555 0100" />
              </F>
              <div className="md:col-span-2">
                <F label="Address">
                  <Input defaultValue="123 Market St, San Francisco, CA" />
                </F>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button>Save changes</Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <Card className="glass p-6">
            <div className="space-y-3">
              {[
                { n: "Jamie Doe", e: "jamie@brightdental.com", r: "Owner" },
                { n: "Alex Rivera", e: "alex@brightdental.com", r: "Admin" },
                { n: "Priya Shah", e: "priya@brightdental.com", r: "Agent Manager" },
              ].map((m) => (
                <div
                  key={m.e}
                  className="flex items-center justify-between rounded-xl border border-border/60 p-3"
                >
                  <div>
                    <div className="font-medium">{m.n}</div>
                    <div className="text-xs text-muted-foreground">{m.e}</div>
                  </div>
                  <Badge variant="outline">{m.r}</Badge>
                </div>
              ))}
            </div>
            <Button className="mt-4">Invite teammate</Button>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-6">
          <Card className="glass p-6">
            <div className="rounded-xl border border-border/60 p-4 font-mono text-sm">
              <div className="flex items-center justify-between">
                <span>vf_live_••••••••••••••7c2a</span>
                <Button size="sm" variant="outline">
                  Reveal
                </Button>
              </div>
            </div>
            <Button className="mt-4" variant="outline">
              Generate new key
            </Button>
          </Card>
        </TabsContent>

        <TabsContent value="notifs" className="mt-6">
          <Card className="glass p-6 space-y-4">
            {[
              "Notify me when an agent goes offline",
              "Daily summary email",
              "SMS on missed VIP calls",
              "Slack alert for escalations",
            ].map((n) => (
              <div
                key={n}
                className="flex items-center justify-between border-b border-border/40 pb-3 last:border-0 last:pb-0"
              >
                <span className="text-sm">{n}</span>
                <Switch defaultChecked />
              </div>
            ))}
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <Card className="glass p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Two-factor auth</div>
                <div className="text-xs text-muted-foreground">Require 2FA for all admins</div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">SSO / SAML</div>
                <div className="text-xs text-muted-foreground">Enterprise plan only</div>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Session timeout</div>
                <div className="text-xs text-muted-foreground">Auto sign-out after 30 min</div>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="mt-6">
          <Card className="glass p-6">
            <div className="space-y-2 font-mono text-xs">
              {[
                "2026-12-18 09:14 — jamie@… deployed agent 'Aria'",
                "2026-12-18 08:52 — alex@… updated phone number +1 415 555 0100",
                "2026-12-17 22:03 — system re-embedded knowledge base",
                "2026-12-17 15:41 — priya@… invited teammate maya@brightdental.com",
              ].map((l) => (
                <div key={l} className="rounded-md bg-muted/40 px-3 py-2">
                  {l}
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function F({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <Label className="text-xs uppercase text-muted-foreground">{label}</Label>
      {children}
    </div>
  );
}
