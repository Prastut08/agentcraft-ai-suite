import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { toast } from "sonner";

export const Route = createFileRoute("/app/settings")({
  component: Settings,
});

function Settings() {
  const { user } = useAuth();
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    businessName: "",
    website: "",
    email: "",
    phone: "",
    address: "",
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
            address: info.address || "",
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
      await setDoc(
        doc(db, "users", user.uid),
        {
          businessName: form.businessName,
          businessInfo: {
            businessName: form.businessName,
            website: form.website,
            email: form.email,
            phone: form.phone,
            phoneNumber: form.phone,
            address: form.address,
          },
        },
        { merge: true },
      );
      toast.success("Business profile saved successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save changes. Please try again.");
    } finally {
      setSaving(false);
    }
  };

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
                <Input
                  value={form.businessName}
                  onChange={(e) =>
                    setForm({ ...form, businessName: e.target.value })
                  }
                  placeholder="E.g., Bright Dental"
                />
              </F>
              <F label="Website">
                <Input
                  value={form.website}
                  onChange={(e) =>
                    setForm({ ...form, website: e.target.value })
                  }
                  placeholder="https://example.com"
                />
              </F>
              <F label="Email">
                <Input
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="contact@example.com"
                />
              </F>
              <F label="Phone">
                <Input
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  placeholder="+1 (555) 000-0000"
                />
              </F>
              <div className="md:col-span-2">
                <F label="Address">
                  <Input
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    placeholder="123 Main St, City, State"
                  />
                </F>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <Button onClick={handleSave} disabled={saving}>
                {saving ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="mt-6">
          <Card className="glass p-6">
            <div className="py-8 text-center text-sm text-muted-foreground">
              No team members yet
            </div>
            <Button className="mt-4">Invite teammate</Button>
          </Card>
        </TabsContent>

        <TabsContent value="api" className="mt-6">
          <Card className="glass p-6">
            <div className="rounded-xl border border-border/60 p-4 font-mono text-sm">
              <div className="flex items-center justify-between">
                <span>No API key generated</span>
                <Button size="sm" variant="outline">
                  Generate new key
                </Button>
              </div>
            </div>
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
                <div className="text-xs text-muted-foreground">
                  Require 2FA for all admins
                </div>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">SSO / SAML</div>
                <div className="text-xs text-muted-foreground">
                  Enterprise plan only
                </div>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">Session timeout</div>
                <div className="text-xs text-muted-foreground">
                  Auto sign-out after 30 min
                </div>
              </div>
              <Switch defaultChecked />
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="audit" className="mt-6">
          <Card className="glass p-6">
            <div className="py-8 text-center text-sm text-muted-foreground">
              No activity yet
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
