import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Legal",
  description:
    "Privacy Policy, Terms of Service, and Cookie Policy for Vexis Log.",
  alternates: {
    canonical: "/legal",
  },
};

export default function LegalPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-4xl px-6 py-16 md:py-24">
        <div className="mb-10">
          <Link
            href="/"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to Home
          </Link>
          <h1 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight">
            Legal
          </h1>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            This page outlines how Vexis Log handles your data, usage terms, and
            cookie preferences.
          </p>
        </div>

        <div className="space-y-8">
          <section
            id="privacy-policy"
            className="rounded-2xl border border-border bg-card/70 p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold">Privacy Policy</h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
              We collect account details and trading journal data to operate
              core features, improve analytics, and maintain service
              reliability. Your data is used only for platform functionality and
              is never sold to third parties.
            </p>
          </section>

          <section
            id="terms-of-service"
            className="rounded-2xl border border-border bg-card/70 p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold">Terms of Service</h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
              By using Vexis Log, you agree to use the platform lawfully and
              keep your account credentials secure. We may update product
              features over time and reserve the right to suspend accounts that
              violate these terms.
            </p>
          </section>

          <section
            id="cookie-policy"
            className="rounded-2xl border border-border bg-card/70 p-6 md:p-8"
          >
            <h2 className="text-2xl font-semibold">Cookie Policy</h2>
            <p className="mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">
              We use essential cookies for authentication, session stability,
              and security. Optional cookies may be used for analytics to
              understand usage patterns and improve user experience.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
