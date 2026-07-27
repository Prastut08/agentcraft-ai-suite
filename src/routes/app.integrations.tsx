import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Puzzle } from "lucide-react";

export const Route = createFileRoute("/app/integrations")({
  component: Integrations,
});

const items: { name: string; cat: string; connected: boolean }[] = [];

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
        {items.length === 0 ? (
          <Card className="glass col-span-full flex flex-col items-center justify-center p-8 text-center">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
              <Puzzle className="h-5 w-5" />
            </div>
            <div className="mt-3 font-medium">No integrations connected</div>
            <div className="text-xs text-muted-foreground">
              Connect tools to extend your agent's capabilities.
            </div>
          </Card>
        ) : (
          items.map((i) => (
            <Card key={i.name} className="glass p-4">
              <div className="flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-primary">
                  <Puzzle className="h-5 w-5" />
                </div>
                {i.connected ? (
                  <Badge className="bg-success/20 text-success">
                    Connected
                  </Badge>
                ) : (
                  <Badge variant="outline">Available</Badge>
                )}
              </div>
              <div className="mt-3 font-medium">{i.name}</div>
              <div className="text-xs text-muted-foreground">{i.cat}</div>
              <Button
                size="sm"
                variant={i.connected ? "outline" : "default"}
                className="mt-3 w-full"
              >
                {i.connected ? "Manage" : "Connect"}
              </Button>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
