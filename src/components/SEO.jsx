import { Helmet } from "react-helmet-async";

const SITE_URL = "https://retivio.in";
const DEFAULT_TITLE = "Retivio | AI-Powered Salon CRM";
const DEFAULT_DESCRIPTION =
  "Retivio is an AI-powered Salon CRM that helps salons and spas manage customers, appointments, WhatsApp follow-ups, loyalty, billing and business growth.";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical = "/",
  keywords = "Salon CRM, Salon Management Software, Salon Software India, Beauty Salon CRM, Spa CRM, AI Salon CRM, Salon Appointment Software, Salon Billing Software, Salon Customer Management, Salon WhatsApp CRM, Salon Marketing Software, Salon Loyalty Software, Retivio",
  image = DEFAULT_IMAGE,
  type = "website",
  jsonLd = null,
}) {
  const canonicalUrl = `${SITE_URL}${canonical}`;

  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{title}</title>

      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <link rel="canonical" href={canonicalUrl} />

      <meta name="robots" content="index, follow" />

      <meta name="author" content="Retivio" />
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content="Retivio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
}
