import SEO from "../components/SEO";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

export default function Terms() {
  return (
    <>
      <SEO
        title="Terms & Conditions | Retivio"
        description="Read the terms and conditions for using Retivio, including the Retivio Website Builder and business software services."
        canonical="/terms"
      />

      <Navbar />

      <main className="min-h-screen bg-slate-50 px-5 py-16 sm:px-6">
        <article className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
            Legal
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950">
            Terms & Conditions
          </h1>

          <p className="mt-4 text-sm text-slate-500">
            Effective date: 13 July 2026
          </p>

          <LegalSection title="Acceptance of Terms">
            By accessing or using Retivio, you agree to these Terms &
            Conditions. If you do not agree with these terms, please do not
            use our services.
          </LegalSection>

          <LegalSection title="Retivio Services">
            Retivio provides business software and digital tools including
            customer management, appointments, follow-ups, reporting,
            business growth tools and a website builder. Features may change
            as the platform develops.
          </LegalSection>

          <LegalSection title="User Accounts">
            You are responsible for providing accurate account information,
            maintaining the security of your account and all activity carried
            out through your account. Google Sign-In or other authentication
            methods may be used to access selected Retivio services.
          </LegalSection>

          <LegalSection title="Website Builder">
            The Retivio Website Builder allows users to create, preview and
            save website projects. Website creation, hosting, publishing and
            custom domain features may have separate limits, availability or
            pricing.
          </LegalSection>

          <LegalSection title="User Content and Uploaded Images">
            You retain responsibility for business information, text, images
            and other content you upload to Retivio. You must have the
            necessary rights or permission to use that content. You must not
            upload unlawful, infringing, harmful or misleading material.
          </LegalSection>

          <LegalSection title="Acceptable Use">
            You must not misuse Retivio, attempt to disrupt the platform,
            bypass security controls, access another user's data without
            permission or use the service for unlawful activities.
          </LegalSection>

          <LegalSection title="Third-Party Services">
            Retivio may rely on third-party infrastructure, authentication,
            hosting, analytics, email or other technology providers. Their
            availability and processing may be subject to their own terms and
            policies.
          </LegalSection>

          <LegalSection title="Beta and Service Changes">
            Some Retivio features may be offered in beta or active
            development. Features may be updated, modified, limited or removed
            as we improve the platform.
          </LegalSection>

          <LegalSection title="Limitation of Liability">
            Retivio is provided on an "as is" and "as available" basis. To the
            extent permitted by applicable law, Retivio is not responsible for
            indirect business losses, lost opportunities or losses resulting
            from interruptions, user error or third-party services.
          </LegalSection>

          <LegalSection title="Changes to These Terms">
            We may update these Terms when our services, legal requirements or
            business practices change. The effective date on this page will be
            updated when material revisions are published.
          </LegalSection>

          <LegalSection title="Contact">
            Questions about these Terms can be sent to
            {" "}
            <strong>retivio.support@gmail.com</strong>.
          </LegalSection>
        </article>
      </main>

      <Footer />
    </>
  );
}

function LegalSection({ title, children }) {
  return (
    <section className="mt-9">
      <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
      <p className="mt-3 leading-8 text-slate-600">{children}</p>
    </section>
  );
}
