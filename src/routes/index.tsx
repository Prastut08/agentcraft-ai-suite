import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Waves, PhoneCall, Bot, Sparkles, Zap, Shield, Globe, ArrowRight,
  Mic, Calendar, Headphones, TrendingUp, Check, PlayCircle,
} from "lucide-react";

export const Route = createFileRoute("/")({
  component: Landing,
});

const agentTypes = [
  { icon: Headphones, name: "AI Receptionist", desc: "Never miss a call" },
  { icon: Calendar, name: "Appointment Scheduler", desc: "Books 24/7" },
  { icon: TrendingUp, name: "Sales Rep", desc: "Qualifies leads" },
  { icon: Bot, name: "Support Agent", desc: "Instant answers" },
];

const features = [
  { icon: Zap, title: "Deploy in minutes", desc: "Guided wizard walks you from business info to a live phone number." },
  { icon: Bot, title: "Trained on your data", desc: "Upload PDFs, FAQs, price lists, or entire websites — your agent learns it all." },
  { icon: PhoneCall, title: "Real phone numbers", desc: "Twilio, Vapi, Retell, Bland, Plivo, Telnyx — bring your own or buy new." },
  { icon: Sparkles, title: "Human-quality voice", desc: "ElevenLabs voices, dozens of accents, adjustable tone, speed, and personality." },
  { icon: Shield, title: "Enterprise ready", desc: "SOC2-grade architecture, audit logs, role-based access, and call recording." },
  { icon: Globe, title: "40+ languages", desc: "Answer, transfer, and follow up in the language your customer speaks." },
];

function Landing() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/50 backdrop-blur-xl bg-background/70">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground brand-glow">
              <Waves className="h-5 w-5" />
            </div>
            <span className="text-lg">VoiceForge<span className="text-primary"> AI</span></span>
          </Link>
          <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
            <a href="#features" className="hover:text-foreground">Features</a>
            <a href="#how" className="hover:text-foreground">How it works</a>
            <a href="#pricing" className="hover:text-foreground">Pricing</a>
            <a href="#faq" className="hover:text-foreground">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <Link to="/app/dashboard"><Button variant="ghost" size="sm">Sign in</Button></Link>
            <Link to="/app/create"><Button size="sm">Get started</Button></Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="absolute inset-x-0 top-0 h-[600px]" style={{ background: "var(--gradient-glow)" }} />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="secondary" className="mb-6 rounded-full border border-border px-3 py-1 text-xs">
              <Sparkles className="mr-1.5 h-3 w-3 text-primary" /> Now with GPT-4o realtime voice
            </Badge>
            <h1 className="text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
              Create <span className="gradient-text">AI Voice Employees</span> in minutes
            </h1>
            <p className="mt-6 text-lg text-muted-foreground md:text-xl">
              Build AI receptionists, sales agents, appointment schedulers, customer
              support agents, and custom voice assistants trained specifically for your business.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link to="/app/create">
                <Button size="lg" className="h-12 px-6 text-base">
                  Create your first agent <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="h-12 px-6 text-base">
                <PlayCircle className="mr-2 h-4 w-4" /> Watch 90-sec demo
              </Button>
            </div>
            <p className="mt-4 text-xs text-muted-foreground">No credit card · Free 100 minutes · Cancel anytime</p>
          </div>

          {/* Agent card cluster */}
          <div className="mt-20 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {agentTypes.map((a) => (
              <Card key={a.name} className="glass p-5 transition hover:-translate-y-1 hover:brand-glow">
                <div className="mb-3 grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
                  <a.icon className="h-5 w-5" />
                </div>
                <div className="font-semibold">{a.name}</div>
                <div className="text-sm text-muted-foreground">{a.desc}</div>
                <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
                  <Mic className="h-3 w-3 text-primary" /> Live · avg 1.2s response
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Logos */}
      <section className="border-y border-border/50 bg-surface/40 py-10">
        <div className="mx-auto max-w-6xl px-6">
          <p className="mb-6 text-center text-xs uppercase tracking-widest text-muted-foreground">
            Trusted by teams shipping voice AI
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-4 text-lg font-semibold text-muted-foreground/60">
            <span>Northwind</span><span>Acme Health</span><span>Lumen Realty</span>
            <span>Kaido Motors</span><span>PulseHR</span><span>Fjord Bank</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-7xl px-6 py-24">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="outline" className="mb-4">Platform</Badge>
          <h2 className="text-4xl font-bold md:text-5xl">Everything you need to run a voice workforce</h2>
          <p className="mt-4 text-muted-foreground">One workspace to build, train, deploy, and monitor every AI agent across your business.</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <Card key={f.title} className="glass p-6">
              <div className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-primary/15 text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="border-y border-border/50 bg-surface/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">How it works</Badge>
            <h2 className="text-4xl font-bold md:text-5xl">From idea to live agent in 4 steps</h2>
          </div>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { n: "01", t: "Describe your business", d: "Share your industry, hours, and how you like to sound." },
              { n: "02", t: "Upload knowledge", d: "Drop PDFs, FAQs, or paste a website URL." },
              { n: "03", t: "Design the flow", d: "Pick a voice, tone, and drag-drop your call flow." },
              { n: "04", t: "Go live", d: "Get a phone number and start taking calls." },
            ].map((s) => (
              <div key={s.n} className="relative">
                <div className="mb-4 font-mono text-sm text-primary">{s.n}</div>
                <div className="text-xl font-semibold">{s.t}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { q: "Replaced our answering service in a weekend. Bookings up 34%.", a: "Maya Chen", r: "COO, Bright Dental" },
            { q: "The setup wizard is the best I've used in a decade of SaaS.", a: "Jordan Patel", r: "Founder, Lumen Realty" },
            { q: "Our agent handles 8 languages. Customers can't tell it's AI.", a: "Sofia Alvarez", r: "Head of CX, Fjord Bank" },
          ].map((t) => (
            <Card key={t.a} className="glass p-6">
              <p className="text-base leading-relaxed">"{t.q}"</p>
              <div className="mt-6 text-sm">
                <div className="font-semibold">{t.a}</div>
                <div className="text-muted-foreground">{t.r}</div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-y border-border/50 bg-surface/30 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <Badge variant="outline" className="mb-4">Pricing</Badge>
            <h2 className="text-4xl font-bold md:text-5xl">Simple, usage-based pricing</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { name: "Starter", price: "$49", desc: "For solo operators", features: ["1 agent", "500 min / mo", "1 phone number", "Email support"] },
              { name: "Growth", price: "$199", desc: "Most popular", features: ["5 agents", "3,000 min / mo", "5 phone numbers", "All integrations", "Priority support"], featured: true },
              { name: "Enterprise", price: "Custom", desc: "For scaled teams", features: ["Unlimited agents", "SSO / SAML", "Dedicated infra", "SLA & CSM"] },
            ].map((p) => (
              <Card key={p.name} className={`p-6 ${p.featured ? "border-primary/50 brand-glow bg-primary/5" : "glass"}`}>
                {p.featured && <Badge className="mb-3">Most popular</Badge>}
                <div className="text-sm text-muted-foreground">{p.name}</div>
                <div className="mt-2 flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{p.price}</span>
                  {p.price !== "Custom" && <span className="text-sm text-muted-foreground">/ mo</span>}
                </div>
                <p className="mt-1 text-sm text-muted-foreground">{p.desc}</p>
                <ul className="mt-6 space-y-2 text-sm">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-primary" /> {f}
                    </li>
                  ))}
                </ul>
                <Link to="/app/create" className="mt-6 block">
                  <Button className="w-full" variant={p.featured ? "default" : "outline"}>Start free</Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-6 py-24">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-bold md:text-5xl">Frequently asked questions</h2>
        </div>
        <Accordion type="single" collapsible>
          {[
            ["How long does setup take?", "Most teams have a working agent in 10–15 minutes with our guided wizard."],
            ["Can I use my own phone number?", "Yes — bring numbers from Twilio, Vapi, Retell, Bland, Plivo, Telnyx, or Exotel."],
            ["What languages are supported?", "40+ languages with native accents including English, Spanish, French, German, Hindi, Arabic, Mandarin, Japanese, and more."],
            ["Is my data secure?", "All data is encrypted at rest and in transit. We support SSO, audit logs, and per-workspace isolation."],
            ["Can the agent transfer to a human?", "Yes — configure escalation rules, warm transfers, and after-hours voicemail."],
          ].map(([q, a]) => (
            <AccordionItem key={q} value={q}>
              <AccordionTrigger className="text-left">{q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <Card className="relative overflow-hidden p-12 text-center brand-glow" style={{ background: "var(--gradient-brand)" }}>
          <h2 className="text-3xl font-bold text-brand-foreground md:text-4xl">Your first AI employee starts today</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-foreground/80">Get 100 free minutes when you deploy your first agent. No credit card required.</p>
          <div className="mt-6 flex justify-center">
            <Link to="/app/create">
              <Button size="lg" variant="secondary" className="h-12 px-6">Create your first agent <ArrowRight className="ml-2 h-4 w-4" /></Button>
            </Link>
          </div>
        </Card>
      </section>

      <footer className="border-t border-border/50 py-10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-primary text-primary-foreground">
              <Waves className="h-4 w-4" />
            </div>
            <span>© 2026 VoiceForge AI</span>
          </div>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy</a>
            <a href="#" className="hover:text-foreground">Terms</a>
            <a href="#" className="hover:text-foreground">Security</a>
            <a href="#" className="hover:text-foreground">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
