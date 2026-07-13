import SEO from "../components/SEO";
import Navbar from "../components/landing/Navbar";
import Footer from "../components/landing/Footer";

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Retivio"
        description="Learn how Retivio collects, uses and protects account, business and website builder information."
        canonical="/privacy-policy"
      />

      <Navbar />

      <main className="min-h-screen bg-slate-50 px-5 py-16 sm:px-6">
        <article className="mx-auto max-w-4xl rounded-3xl border border-slate-200 bg-white p-7 shadow-sm sm:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-purple-700">
            Privacy
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-slate-950">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-slate-500">
            Effective date: 13 July 2026
          </p>

          <PrivacySection title="Overview">
            This Privacy Policy explains how Retivio collects, uses and
            protects information when you use our business software, website
            builder and related digital services.
          </PrivacySection>

          <PrivacySection title="Information We Collect">
            We may collect account information such as your name and email,
            business information you provide, customer and appointment records
            entered into Retivio, website builder project details, uploaded
            images and technical or usage information used to operate and
            improve the service.
          </PrivacySection>

          <PrivacySection title="Google Sign-In">
            When you choose Google Sign-In, authentication information may be
            processed through Google and our authentication infrastructure.
            Retivio may receive basic account information such as your name,
            email address and account identifier needed to create and secure
            your Retivio account.
          </PrivacySection>

          <PrivacySection title="Website Builder and Uploaded Images">
            The Website Builder may store business details, website content,
            template selections, services and images you upload. Uploaded
            images may be stored in cloud storage and displayed through public
            image URLs when required for website previews or published website
            content.
          </PrivacySection>

          <PrivacySection title="How We Use Information">
            We use information to provide Retivio features, save and restore
            projects, authenticate users, operate customer and appointment
            tools, provide support, maintain security and improve platform
            performance.
          </PrivacySection>

          <PrivacySection title="Service Providers">
            Retivio may use third-party technology providers for cloud
            infrastructure, authentication, hosting, analytics and contact
            form delivery. These providers may process limited information as
            required to provide their services.
          </PrivacySection>

          <PrivacySection title="Data Security">
            We use authentication, database access controls and other
            reasonable technical measures designed to protect user data.
            However, no internet-based service can guarantee absolute
            security.
          </PrivacySection>

          <PrivacySection title="Data Retention and Deletion">
            We may retain information while your account or projects remain
            active and as reasonably required to operate the service. You may
            contact us to request account or personal data deletion, subject
            to applicable legal and operational requirements.
          </PrivacySection>

          <PrivacySection title="Your Responsibilities">
            Business users are responsible for ensuring they have an
            appropriate legal basis or permission to enter customer
            information and upload content to Retivio.
          </PrivacySection>

          <PrivacySection title="Changes to This Policy">
            We may update this Privacy Policy as Retivio develops or legal and
            operational requirements change. The effective date will be
            updated when revisions are published.
          </PrivacySection>

          <PrivacySection title="Contact">
            For privacy questions or data requests, contact
            {" "}
            <strong>retivio.support@gmail.com</strong>.
          </PrivacySection>
        </article>
      </main>

      <Footer />
    </>
  );
}

function PrivacySection({ title, children }) {
  return (
    <section className="mt-9">
      <h2 className="text-2xl font-bold text-slate-950">{title}</h2>
      <p className="mt-3 leading-8 text-slate-600">{children}</p>
    </section>
  );
}
