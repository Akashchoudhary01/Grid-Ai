import Link from "next/link";
import { redirect } from "next/navigation";
import {
    BookMarked,
    BookOpen,
    FileText,
    Layers,
    MessageSquare,
    ShieldCheck,
    Zap,
    type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { authRoutes, getSession } from "@/features/auth";
import { cn } from "@/lib/utils";

/* ----------------------------- Content ----------------------------- */

const brand = { name: "Codebook" };

const navLinks = [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how-it-works" },
];

const hero = {
    title: "Ask your books anything.",
    description:
        "Upload a book, ask a question in plain language, and get an answer with the exact passage it came from.",
    primaryCta: "Start chatting",
    secondaryCta: "See how it works",
};

type Feature = {
    icon: LucideIcon;
    title: string;
    description: string;
    className?: string;
};

const features: Feature[] = [
    {
        icon: BookMarked,
        title: "Every answer shows its source",
        description:
            "Answers link back to the page and passage they came from, so you can check the book instead of taking our word for it.",
        className: "lg:col-span-4",
    },
    {
        icon: MessageSquare,
        title: "Follow-up questions",
        description: "Keep the conversation going without repeating yourself.",
        className: "lg:col-span-2",
    },
    {
        icon: Layers,
        title: "One library",
        description: "Keep all your books together and ask across any of them.",
        className: "lg:col-span-2",
    },
    {
        icon: Zap,
        title: "Ready quickly",
        description: "Books are processed in the background while you wait.",
        className: "lg:col-span-2",
    },
    {
        icon: ShieldCheck,
        title: "Private to you",
        description: "Your books and chats stay in your account.",
        className: "lg:col-span-2",
    },
];

const steps = [
    { title: "Upload a book", description: "Add your file. We prepare it for chat in the background." },
    { title: "Ask a question", description: "Type it the way you would ask a friend who has read the book." },
    { title: "Check the source", description: "Read the answer, then open the passage behind it." },
];

const cta = {
    title: "Your next read is a conversation.",
    description: "Create an account, upload a book, and ask your first question.",
    button: "Create your account",
};

/* ---------------------------- Components --------------------------- */

function Container({ className, ...props }: React.ComponentProps<"div">) {
    return <div className={cn("mx-auto w-full max-w-6xl px-6", className)} {...props} />;
}

function SectionHeading({ title, description }: { title: string; description?: string }) {
    return (
        <div className="mb-12 max-w-xl">
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                {title}
            </h2>
            {description && <p className="mt-3 text-muted-foreground">{description}</p>}
        </div>
    );
}

function LandingHeader() {
    return (
        <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur">
            <Container className="flex h-16 items-center justify-between">
                <Link href="/" className="flex items-center gap-2 font-heading text-lg font-semibold">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <BookOpen className="size-4" />
                    </span>
                    {brand.name}
                </Link>
                <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
                    {navLinks.map((link) => (
                        <a key={link.href} href={link.href} className="transition-colors hover:text-foreground">
                            {link.label}
                        </a>
                    ))}
                </nav>
                <div className="flex items-center gap-2">
                    <Button
                        size="sm"
                        variant="ghost"
                        className="hidden sm:inline-flex"
                        nativeButton={false}
                        render={<Link href={authRoutes.login} />}
                    >
                        Sign in
                    </Button>
                    <Button size="sm" nativeButton={false} render={<Link href={authRoutes.login} />}>
                        Get started
                    </Button>
                </div>
            </Container>
        </header>
    );
}

/** A sample conversation that shows what the product does. */
function ChatPreview() {
    return (
        <div className="relative">
            <div className="rounded-2xl border bg-card shadow-sm">
                <div className="flex items-center gap-2 border-b px-4 py-3 text-sm">
                    <FileText className="size-4 text-muted-foreground" />
                    <span className="font-medium">The Long Winter</span>
                    <span className="text-muted-foreground">Sample book</span>
                </div>

                <div className="space-y-4 p-4 sm:p-5">
                    <div className="flex justify-end">
                        <p className="max-w-[85%] rounded-2xl rounded-br-sm bg-primary px-4 py-2.5 text-sm text-primary-foreground">
                            Why does the family leave the farm before the first snow?
                        </p>
                    </div>

                    <div className="max-w-[92%] space-y-3">
                        <p className="rounded-2xl rounded-bl-sm bg-muted px-4 py-3 text-sm leading-relaxed">
                            They run low on grain and fuel, and the narrator expects the roads to close within
                            days. Staying would mean going through winter without supplies.
                            <span className="ml-1.5 inline-flex items-center rounded-md border bg-background px-1.5 py-0.5 text-xs font-medium">
                                p. 142
                            </span>
                        </p>

                        <blockquote className="border-l-2 border-primary/60 bg-muted/50 py-2 pl-4 pr-3">
                            <p className="font-serif text-sm italic leading-relaxed text-muted-foreground">
                                Short passage from the book appears here, so you can read it in context.
                            </p>
                            <footer className="mt-1.5 text-xs text-muted-foreground">
                                Chapter 7, page 142
                            </footer>
                        </blockquote>
                    </div>
                </div>

                <div className="border-t p-3">
                    <div className="rounded-xl border bg-background px-4 py-2.5 text-sm text-muted-foreground">
                        Ask a follow-up question
                    </div>
                </div>
            </div>
        </div>
    );
}

function HeroSection() {
    return (
        <section>
            <Container className="grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:gap-16">
                <div>
                    <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
                        {hero.title}
                    </h1>
                    <p className="mt-6 max-w-md text-lg text-muted-foreground">{hero.description}</p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button size="lg" nativeButton={false} render={<Link href={authRoutes.login} />}>
                            {hero.primaryCta}
                        </Button>
                        <Button
                            size="lg"
                            variant="outline"
                            nativeButton={false}
                            render={<a href="#how-it-works" />}
                        >
                            {hero.secondaryCta}
                        </Button>
                    </div>
                </div>
                <ChatPreview />
            </Container>
        </section>
    );
}

function FeaturesSection() {
    return (
        <section id="features" className="scroll-mt-16 border-t">
            <Container className="py-20">
                <SectionHeading
                    title="Read with a book that talks back"
                    description="Everything is built around one thing: getting a trustworthy answer from the book you already have."
                />
                <div className="grid gap-4 lg:grid-cols-6">
                    {features.map(({ icon: Icon, title, description, className }, i) => (
                        <div
                            key={title}
                            className={cn(
                                "rounded-2xl border p-6",
                                i === 0 ? "bg-primary text-primary-foreground" : "bg-card",
                                className,
                            )}
                        >
                            <Icon
                                className={cn(
                                    "mb-6 size-6",
                                    i === 0 ? "text-primary-foreground" : "text-primary",
                                )}
                            />
                            <h3 className="font-heading text-lg font-semibold">{title}</h3>
                            <p
                                className={cn(
                                    "mt-2 max-w-md text-sm leading-relaxed",
                                    i === 0 ? "text-primary-foreground/80" : "text-muted-foreground",
                                )}
                            >
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}

function StepsSection() {
    return (
        <section id="how-it-works" className="scroll-mt-16 border-t bg-muted/40">
            <Container className="py-20">
                <SectionHeading title="From file to answer in three steps" />
                <ol className="grid gap-10 md:grid-cols-3 md:gap-8">
                    {steps.map(({ title, description }, i) => (
                        <li key={title} className="flex gap-5 md:block">
                            <span className="font-heading text-5xl font-semibold leading-none text-primary/30 md:text-6xl">
                                {i + 1}
                            </span>
                            <div className="md:mt-5">
                                <h3 className="font-heading text-lg font-semibold">{title}</h3>
                                <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                                    {description}
                                </p>
                            </div>
                        </li>
                    ))}
                </ol>
            </Container>
        </section>
    );
}

function CtaSection() {
    return (
        <section className="border-t">
            <Container className="py-20">
                <div className="flex flex-col items-start justify-between gap-8 rounded-3xl bg-primary px-8 py-12 text-primary-foreground sm:px-12 md:flex-row md:items-center">
                    <div className="max-w-lg">
                        <h2 className="font-heading text-3xl font-semibold tracking-tight text-balance">
                            {cta.title}
                        </h2>
                        <p className="mt-3 text-primary-foreground/80">{cta.description}</p>
                    </div>
                    <Button
                        size="lg"
                        variant="secondary"
                        nativeButton={false}
                        render={<Link href={authRoutes.login} />}
                    >
                        {cta.button}
                    </Button>
                </div>
            </Container>
        </section>
    );
}

function LandingFooter() {
    return (
        <footer className="border-t">
            <Container className="flex flex-col items-center justify-between gap-2 py-8 text-sm text-muted-foreground sm:flex-row">
                <span className="font-heading font-medium text-foreground">{brand.name}</span>
                <span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
            </Container>
        </footer>
    );
}

/* ------------------------------ Page ------------------------------- */

export default async function HomePage() {
    const session = await getSession();

    if (session) {
        redirect(authRoutes.dashboard);
    }

    return (
        <div className="flex min-h-svh flex-col bg-background">
            <LandingHeader />
            <main className="flex-1">
                <HeroSection />
                <FeaturesSection />
                <StepsSection />
                <CtaSection />
            </main>
            <LandingFooter />
        </div>
    );
}