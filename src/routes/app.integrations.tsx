import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Puzzle } from "lucide-react";

export const Route = createFileRoute("/app/integrations")({
  component: Integrations,
});

const items = [
  { name: "Twilio", cat: "Telephony", connected: true },
  { name: "Vapi", cat: "Telephony", connected: true },
  { name: "Retell AI", cat: "Telephony", connected: false },
  { name: "ElevenLabs", cat: "Voice", connected: true },
  { name: "OpenAI", cat: "AI Model", connected: true },
  { name: "Google Calendar", cat: "Calendar", connected: true },
  { name: "Microsoft Outlook", cat: "Calendar", connected: false },
  { name: "HubSpot", cat: "CRM", connected: false },
  { name: "Salesforce", cat: "CRM", connected: false },
  { name: "Zapier", cat: "Automation", connected: true },
  { name: "Slack", cat: "Messaging", connected: true },
  { name: "WhatsApp", cat: "Messaging", connected: false },
  { name: "Google Drive", cat: "Storage", connected: true },
  { name: "Dropbox", cat: "Storage", connected: false },
  { name: "Notion", cat: "Knowledge", connected: false },
  { name: "Stripe", cat: "Payments", connected: true },
  { name: "Webhook API", cat: "Developer", connected: true },
];

function Integrations() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Integrations</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Connect your favorite tools — your agent uses them mid-call.
        </p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((i) => (
          <Card key={i.name} className="glass p-4">
            <div className="flex items-start justify-between">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                <Puzzle className="h-5 w-5" />
              </div>
              {i.connected ? (
                <Badge className="bg-success/20 text-success">Connected</Badge>
              ) : (
                <Badge variant="outline">Available</Badge>
              )}
            </div>
            <div className="mt-3 font-medium">{i.name}</div>
            <div className="text-xs text-muted-foreground">{i.cat}</div>
            <Button size="sm" variant={i.connected ? "outline" : "default"} className="mt-3 w-full">
              {i.connected ? "Manage" : "Connect"}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
