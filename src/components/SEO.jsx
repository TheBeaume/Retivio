import { Helmet } from "react-helmet-async";

const SITE_URL = "https://retivio.in";

const DEFAULT_TITLE = "Retivio | AI-Powered Salon CRM";

const DEFAULT_DESCRIPTION =
  "Retivio is an AI-powered Salon CRM designed for salons and spas to manage customers, appointments, billing, WhatsApp follow-ups, marketing, loyalty programs and business growth.";

const DEFAULT_IMAGE = `${SITE_URL}/og-image.jpg`;

const DEFAULT_KEYWORDS =
  "Salon CRM, Salon Management Software, Salon Software India, Beauty Salon CRM, Spa CRM, AI Salon CRM, Salon Appointment Software, Salon Billing Software, Salon POS, Salon Customer Management, Salon WhatsApp CRM, Salon Marketing Software, Salon Loyalty Software, Retivio";

export default function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  canonical = "/",
  keywords = DEFAULT_KEYWORDS,
  image = DEFAULT_IMAGE,
  type = "website",
  jsonLd = null,
  breadcrumbs = null,
}) {
  const canonicalUrl = `${SITE_URL}${canonical}`;

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Retivio",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    image: DEFAULT_IMAGE,
    description: DEFAULT_DESCRIPTION,
    brand: {
      "@type": "Brand",
      name: "Retivio",
    },
    publisher: {
      "@type": "Organization",
      name: "Retivio",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo512.png`,
      },
    },
  };

  return (
    <Helmet>

      <html lang="en" />

      <title>{title}</title>

      <meta charSet="utf-8" />

      <meta name="description" content={description} />

      <meta name="keywords" content={keywords} />

      <meta name="author" content="Retivio" />

      <meta name="robots" content="index,follow,max-image-preview:large" />

      <meta name="theme-color" content="#6D28D9" />

      <meta name="viewport" content="width=device-width, initial-scale=1" />

      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}

      <meta property="og:site_name" content="Retivio" />

      <meta property="og:type" content={type} />

      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />

      <meta property="og:url" content={canonicalUrl} />

      <meta property="og:image" content={image} />

      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}

      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={title} />

      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}

      <script type="application/ld+json">
        {JSON.stringify(defaultSchema)}
      </script>

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
{breadcrumbs && (
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: `${SITE_URL}${item.url}`,
      })),
    })}
  </script>
)}

    </Helmet>
  );
}
