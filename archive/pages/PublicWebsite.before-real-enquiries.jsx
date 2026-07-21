import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import {
  BookOpen,
  Loader2,
  MapPin,
  MessageCircle,
  Phone,
  Menu,
  X,
} from "lucide-react";
import { getPublishedWebsiteBySlug } from "../services/websiteBuilderProjectService";

const businessTypes = {
  salon: {
    expertise: "Our expertise",
    sectionTitle: "Services designed around you",
    aboutTitle: "Beauty with care and expertise",
  },
  fashion: {
    expertise: "Explore our world",
    sectionTitle: "Collections with character",
    aboutTitle: "Fashion with a distinct point of view",
  },
  jewellery: {
    expertise: "Our craftsmanship",
    sectionTitle: "Jewellery made to be remembered",
    aboutTitle: "Crafted with beauty and intention",
  },
  cafe: {
    expertise: "From our menu",
    sectionTitle: "Made to enjoy",
    aboutTitle: "A place made for good moments",
  },
  professional: {
    expertise: "What we do",
    sectionTitle: "Professional solutions for your needs",
    aboutTitle: "Experience you can rely on",
  },
};

function PublicWebsite() {
  const { slug, postSlug } = useParams();
  const location = useLocation();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let active = true;

    async function loadWebsite() {
      setLoading(true);

      const { data, error } =
        await getPublishedWebsiteBySlug(slug);

      if (!active) return;

      if (error || !data) {
        setNotFound(true);
        setProject(null);
      } else {
        setProject(data);
        setNotFound(false);
      }

      setLoading(false);
    }

    loadWebsite();

    return () => {
      active = false;
    };
  }, [slug]);

  const media = useMemo(
    () => project?.website_media || {},
    [project]
  );

  const siteSettings = useMemo(
    () => media.siteSettings || {},
    [media]
  );

  const blogSettings = useMemo(
    () => media.blogSettings || {},
    [media]
  );

  const blogPosts = useMemo(
    () =>
      Array.isArray(media.blogPosts)
        ? media.blogPosts
        : [],
    [media]
  );

  const legalContent = useMemo(
    () => media.legalContent || {},
    [media]
  );

  const gallery = Array.isArray(media.gallery)
    ? media.gallery
    : [];

  const services = Array.isArray(project?.services)
    ? project.services
    : [];

  const page = useMemo(() => {
    if (location.pathname.endsWith("/terms")) return "terms";
    if (location.pathname.endsWith("/privacy")) return "privacy";
    if (postSlug) return "post";
    if (location.pathname.endsWith("/blog")) return "blog";
    return "home";
  }, [location.pathname, postSlug]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant",
    });

    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!project) return;

    const title =
      siteSettings.seoTitle ||
      `${project.business_name} | ${project.business_type}`;

    document.title = title;

    let description = document.querySelector(
      'meta[name="description"]'
    );

    if (!description) {
      description = document.createElement("meta");
      description.name = "description";
      document.head.appendChild(description);
    }

    description.content =
      siteSettings.metaDescription ||
      project.tagline ||
      project.about ||
      "";
  }, [project, siteSettings]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-white">
        <Loader2 className="animate-spin text-slate-700" />
      </main>
    );
  }

  if (notFound || !project) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-5 text-center text-white">
        <div>
          <h1 className="text-3xl font-extrabold">
            Website not found
          </h1>

          <p className="mt-3 text-slate-400">
            This website is unavailable or has not been published.
          </p>
        </div>
      </main>
    );
  }

  const color = project.primary_color || "#7e22ce";
  const base = `/site/${slug}`;
  const businessType = project.business_type || "salon";

  const business =
    businessTypes[businessType] || businessTypes.salon;

  const templateStyle =
    String(project.template || "").includes("luxury") ||
    ["fashion-editorial", "jewellery-luxe", "cafe-dark", "business-premium"].includes(
      project.template
    )
      ? "luxury"
      : String(project.template || "").includes("minimal") ||
        ["fashion-soft", "jewellery-minimal", "cafe-soft"].includes(
          project.template
        )
      ? "minimal"
      : "modern";

  const heroClass =
    templateStyle === "luxury"
      ? "bg-slate-950 text-white"
      : templateStyle === "minimal"
      ? "bg-stone-50 text-slate-950"
      : "bg-slate-50 text-slate-950";

  const mutedTextClass =
    templateStyle === "luxury"
      ? "text-slate-300"
      : "text-slate-600";

  const whatsappUrl = project.whatsapp
    ? `https://wa.me/${String(project.whatsapp).replace(
        /\D/g,
        ""
      )}`
    : null;

  const phoneUrl = project.phone
    ? `tel:${String(project.phone).replace(/[^+\d]/g, "")}`
    : null;

  const currentPost = blogPosts.find(
    (post) => post.slug === postSlug
  );

  const secondaryAbout =
    businessType === "salon"
      ? "Every experience is designed with personal care, attention to detail and a commitment to helping you look and feel your best."
      : businessType === "fashion"
      ? "We believe personal style should feel expressive, confident and uniquely yours. Every collection is selected with character and intention."
      : businessType === "jewellery"
      ? "Our approach combines refined design, meaningful details and craftsmanship created to celebrate life's most memorable moments."
      : businessType === "cafe"
      ? "From fresh flavours to a welcoming atmosphere, we create a place where good food and warm conversations naturally come together."
      : "We combine practical thinking, professional experience and a clear understanding of client priorities to deliver dependable solutions.";

  const promise =
    businessType === "salon"
      ? "Care, confidence and beautiful experiences."
      : businessType === "fashion"
      ? "Style that feels personal and memorable."
      : businessType === "jewellery"
      ? "Timeless beauty made meaningful."
      : businessType === "cafe"
      ? "Fresh flavours and moments worth sharing."
      : "Clear thinking. Reliable service. Meaningful results.";

  const ctaTitle =
    businessType === "salon"
      ? "Ready to feel your best?"
      : businessType === "fashion"
      ? "Find a style that feels like you."
      : businessType === "jewellery"
      ? "Discover jewellery made to be remembered."
      : businessType === "cafe"
      ? "Come in, get comfortable and stay awhile."
      : "Let's talk about what you need.";

  const ctaLabel =
    businessType === "salon"
      ? "Book your appointment"
      : businessType === "fashion"
      ? "Explore collection"
      : businessType === "jewellery"
      ? "Explore collection"
      : businessType === "cafe"
      ? "Visit us today"
      : "Contact us";

  const whyItems = [
    {
      title:
        businessType === "cafe"
          ? "Fresh & Thoughtful"
          : "Quality First",
      description:
        businessType === "cafe"
          ? "Fresh favourites prepared with care and attention."
          : "We focus on quality in every detail of the experience.",
    },
    {
      title:
        businessType === "professional"
          ? "Clear Communication"
          : "Personal Experience",
      description:
        businessType === "professional"
          ? "Straightforward communication and dependable support."
          : "Every customer experience is approached with personal care.",
    },
    {
      title:
        businessType === "fashion"
          ? "Curated Style"
          : businessType === "jewellery"
          ? "Meaningful Details"
          : "Trusted Service",
      description:
        businessType === "fashion"
          ? "Collections selected with individuality and modern style."
          : businessType === "jewellery"
          ? "Refined details designed to make every piece memorable."
          : "Friendly, reliable service designed to build lasting trust.",
    },
  ];

  const reviews = [
    {
      quote:
        "The experience felt thoughtful from beginning to end. Professional, welcoming and genuinely impressive.",
      name: "Happy Customer",
    },
    {
      quote:
        "Beautiful attention to detail and excellent service. I would happily recommend them to others.",
      name: "Regular Customer",
    },
    {
      quote:
        "A wonderful experience and a team that truly cares about quality. Definitely worth visiting again.",
      name: "Local Customer",
    },
  ];

  const LegalPage = ({ title, content }) => (
    <main className="min-h-screen bg-white px-5 py-16 text-slate-950">
      <article className="mx-auto max-w-3xl">
        <a
          href={base}
          className="text-sm font-bold"
          style={{ color }}
        >
          ← Back to home
        </a>

        <h1 className="mt-8 text-4xl font-extrabold">
          {title}
        </h1>

        <div className="mt-8 whitespace-pre-wrap text-sm leading-8 text-slate-600">
          {content}
        </div>
      </article>
    </main>
  );

  if (page === "terms") {
    return (
      <LegalPage
        title="Terms & Conditions"
        content={legalContent.terms}
      />
    );
  }

  if (page === "privacy") {
    return (
      <LegalPage
        title="Privacy Policy"
        content={legalContent.privacy}
      />
    );
  }

  if (page === "post") {
    if (!currentPost) {
      return (
        <main className="min-h-screen bg-white px-5 py-16">
          <div className="mx-auto max-w-3xl">
            <a
              href={`${base}/blog`}
              className="font-bold"
              style={{ color }}
            >
              ← Back to blog
            </a>

            <h1 className="mt-8 text-4xl font-extrabold">
              Article not found
            </h1>
          </div>
        </main>
      );
    }

    return (
      <main className="min-h-screen bg-white px-5 py-16 text-slate-950">
        <article className="mx-auto max-w-3xl">
          <a
            href={`${base}/blog`}
            className="text-sm font-bold"
            style={{ color }}
          >
            ← Back to blog
          </a>

          <h1 className="mt-8 text-4xl font-extrabold sm:text-5xl">
            {currentPost.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-500">
            {currentPost.metaDescription}
          </p>

          <div className="mt-10 whitespace-pre-wrap leading-8 text-slate-700">
            {currentPost.content}
          </div>
        </article>
      </main>
    );
  }

  if (page === "blog") {
    return (
      <main className="min-h-screen bg-white px-5 py-16 text-slate-950">
        <div className="mx-auto max-w-6xl">
          <a
            href={base}
            className="text-sm font-bold"
            style={{ color }}
          >
            ← Back to home
          </a>

          <div className="mt-10 text-center">
            <BookOpen
              className="mx-auto"
              style={{ color }}
            />

            <h1 className="mt-5 text-4xl font-extrabold">
              {blogSettings.title || "Latest from our blog"}
            </h1>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {blogPosts.map((post) => (
              <a
                key={post.id}
                href={`${base}/blog/${post.slug}`}
                className="rounded-2xl border border-slate-200 p-6 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <h2 className="text-xl font-extrabold">
                  {post.title || "Untitled article"}
                </h2>

                <p className="mt-4 text-sm leading-6 text-slate-600">
                  {post.metaDescription ||
                    post.content?.slice(0, 150)}
                </p>

                <p
                  className="mt-5 text-sm font-bold"
                  style={{ color }}
                >
                  Read article
                </p>
              </a>
            ))}
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-white text-slate-950">
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-5">
          <div className="flex min-h-[72px] items-center justify-between">
            <a
              href={`${base}#home`}
              className="min-w-0 truncate text-xl font-extrabold"
              style={{ color }}
            >
              {project.business_name}
            </a>

            <div className="hidden items-center gap-5 lg:flex">
              <nav className="flex gap-7 text-sm font-semibold text-slate-600">
                <a href={`${base}#home`}>Home</a>
                <a href={`${base}#about`}>About</a>
                <a href={`${base}#services`}>Services</a>

                {blogSettings.enabled && (
                  <a href={`${base}/blog`}>Blog</a>
                )}

                <a href={`${base}#contact`}>Contact</a>
              </nav>

              <a
                href={`${base}#contact`}
                className="rounded-full px-5 py-2.5 text-sm font-bold text-white"
                style={{ backgroundColor: color }}
              >
                BOOK NOW
              </a>
            </div>

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen((current) => !current)
              }
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 lg:hidden"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
            >
              {mobileMenuOpen ? (
                <X size={22} />
              ) : (
                <Menu size={22} />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <nav className="border-t border-slate-100 py-4 lg:hidden">
              <div className="flex flex-col gap-1">
                {[
                  ["Home", `${base}#home`],
                  ["About", `${base}#about`],
                  ["Services", `${base}#services`],
                  ["Contact", `${base}#contact`],
                ].map(([label, href]) => (
                  <a
                    key={label}
                    href={href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                  >
                    {label}
                  </a>
                ))}

                {blogSettings.enabled && (
                  <a
                    href={`${base}/blog`}
                    className="rounded-xl px-4 py-3 text-sm font-bold text-slate-700 hover:bg-slate-50"
                  >
                    Blog
                  </a>
                )}

                <a
                  href={`${base}#contact`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mt-2 rounded-xl px-4 py-3 text-center text-sm font-bold text-white"
                  style={{ backgroundColor: color }}
                >
                  BOOK NOW
                </a>
              </div>
            </nav>
          )}
        </div>
      </header>

      <section
        id="home"
        className={`scroll-mt-24 px-5 py-16 text-center sm:px-10 sm:py-24 ${heroClass}`}
      >
        {media.hero?.url && (
          <div className="mx-auto mb-8 max-w-5xl overflow-hidden rounded-3xl">
            <img
              src={media.hero.url}
              alt={`${project.business_name} hero`}
              className="h-64 w-full object-cover sm:h-[460px]"
            />
          </div>
        )}

        <p
          className="text-xs font-bold uppercase tracking-[0.28em]"
          style={{ color }}
        >
          Welcome to
        </p>

        <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-extrabold tracking-tight sm:text-6xl">
          {project.business_name}
        </h1>

        <p
          className={`mx-auto mt-5 max-w-xl text-base leading-7 sm:text-lg ${mutedTextClass}`}
        >
          {project.tagline}
        </p>

        <a
          href={
            businessType === "fashion" ||
            businessType === "jewellery"
              ? `${base}#services`
              : `${base}#contact`
          }
          className="mt-8 inline-flex rounded-full px-7 py-3.5 font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {businessType === "fashion"
            ? "Explore collection"
            : businessType === "jewellery"
            ? "Explore jewellery"
            : businessType === "cafe"
            ? "View our menu"
            : businessType === "professional"
            ? "Get in touch"
            : "Book an appointment"}
        </a>
      </section>

      <section
        id="services"
        className="scroll-mt-24 bg-white px-5 py-16 sm:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p
              className="text-xs font-bold uppercase tracking-[0.22em]"
              style={{ color }}
            >
              {business.expertise}
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              {business.sectionTitle}
            </h2>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {services.map((service, index) => (
              <article
                key={service.id || index}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-6"
              >
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-extrabold text-white"
                  style={{ backgroundColor: color }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {service.name}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-24 bg-slate-50 px-5 py-16 sm:px-10 sm:py-20"
      >
        <div className="mx-auto grid max-w-5xl gap-10 md:grid-cols-2 md:items-center md:gap-12">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.22em]"
              style={{ color }}
            >
              About us
            </p>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
              {business.aboutTitle}
            </h2>

            <p className="mt-5 leading-7 text-slate-600">
              {project.about}
            </p>

            <p className="mt-4 leading-7 text-slate-600">
              {secondaryAbout}
            </p>
          </div>

          {media.about?.url ? (
            <div className="overflow-hidden rounded-3xl bg-slate-200">
              <img
                src={media.about.url}
                alt={`${project.business_name} about`}
                className="h-72 w-full object-cover sm:h-[430px]"
              />
            </div>
          ) : (
            <div
              className="rounded-3xl p-8 text-white"
              style={{ backgroundColor: color }}
            >
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
                Our promise
              </p>

              <p className="mt-5 text-3xl font-extrabold leading-tight">
                {promise}
              </p>

              <p className="mt-5 text-sm leading-6 text-white/80">
                We focus on quality, thoughtful service and experiences
                that give people a reason to return.
              </p>
            </div>
          )}
        </div>
      </section>

      {gallery.length > 0 && (
        <section className="bg-white px-5 py-16 sm:px-8 sm:py-20">
          <div className="text-center">
            <p
              className="text-xs font-bold uppercase tracking-[0.22em]"
              style={{ color }}
            >
              Gallery
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              A glimpse of our world
            </h2>
          </div>

          <div className="mx-auto mt-10 grid max-w-6xl grid-cols-2 gap-3 md:grid-cols-3">
            {gallery.map((image, index) => (
              <div
                key={`${image.url}-${index}`}
                className="overflow-hidden rounded-2xl bg-slate-100"
              >
                <img
                  src={image.url}
                  alt={`${project.business_name} gallery ${index + 1}`}
                  className="h-40 w-full object-cover sm:h-60"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="bg-white px-5 py-16 sm:px-8 sm:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p
              className="text-xs font-bold uppercase tracking-[0.22em]"
              style={{ color }}
            >
              Why choose us
            </p>

            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              An experience built around you
            </h2>

            <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
              Thoughtful service, consistent quality and attention to
              the details that matter.
            </p>
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {whyItems.map((item, index) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-100 bg-slate-50 p-6"
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-extrabold text-white"
                  style={{ backgroundColor: color }}
                >
                  {index + 1}
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {item.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-5 py-16 text-white sm:px-8 sm:py-20">
        <div className="text-center">
          <p
            className="text-xs font-bold uppercase tracking-[0.22em]"
            style={{ color }}
          >
            What people say
          </p>

          <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
            Experiences worth sharing
          </h2>
        </div>

        <div className="mx-auto mt-10 grid max-w-5xl gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.quote}
              className="rounded-2xl border border-white/10 bg-white/5 p-6"
            >
              <p
                className="text-lg tracking-widest"
                style={{ color }}
              >
                ★★★★★
              </p>

              <p className="mt-5 text-sm leading-7 text-slate-300">
                “{review.quote}”
              </p>

              <p className="mt-5 text-sm font-bold text-white">
                {review.name}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section
        className="px-5 py-16 text-center text-white sm:px-10 sm:py-20"
        style={{ backgroundColor: color }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/70">
          Ready when you are
        </p>

        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-extrabold tracking-tight sm:text-5xl">
          {ctaTitle}
        </h2>

        <p className="mx-auto mt-5 max-w-xl leading-7 text-white/80">
          Connect with {project.business_name} and take the next step
          today.
        </p>

        <a
          href={`${base}#contact`}
          className="mt-8 inline-flex rounded-full bg-white px-7 py-3.5 font-bold text-slate-950"
        >
          {ctaLabel}
        </a>
      </section>

      <section
        id="contact"
        className="scroll-mt-24 bg-white px-5 py-16 sm:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p
              className="text-xs font-bold uppercase tracking-[0.22em]"
              style={{ color }}
            >
              Contact
            </p>

            <h2 className="mt-3 text-3xl font-extrabold">
              Visit or contact us
            </h2>

            <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
              We would love to hear from you. Call, message or visit us.
            </p>
          </div>

          <div className="mt-9 grid gap-3 md:grid-cols-3">
            <ContactCard
              icon={Phone}
              label="Call us"
              value={project.phone}
              href={phoneUrl}
              color={color}
            />

            <ContactCard
              icon={MessageCircle}
              label="WhatsApp"
              value={project.whatsapp}
              href={whatsappUrl}
              color={color}
              external
            />

            <ContactCard
              icon={MapPin}
              label={project.city || "Location"}
              value={project.address}
              color={color}
            />
          </div>
        </div>
      </section>

      {siteSettings.contactFormEnabled && (
        <section className="border-t border-slate-100 bg-slate-50 px-5 py-16 sm:px-8">
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <p
                className="text-xs font-bold uppercase tracking-[0.22em]"
                style={{ color }}
              >
                Send an enquiry
              </p>

              <h2 className="mt-3 text-3xl font-extrabold">
                How can we help?
              </h2>

              <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600">
                Send your details and a message. The business can
                respond to your enquiry directly.
              </p>
            </div>

            <form
              onSubmit={(event) => event.preventDefault()}
              className="mt-8 space-y-3"
            >
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
              />

              <input
                type="email"
                placeholder="Email address"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
              />

              <input
                type="tel"
                placeholder="Phone number"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
              />

              <textarea
                rows={5}
                placeholder="Your message"
                className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none"
              />

              <button
                type="submit"
                className="w-full rounded-xl px-5 py-3.5 font-bold text-white"
                style={{ backgroundColor: color }}
              >
                Send enquiry
              </button>
            </form>
          </div>
        </section>
      )}

      <footer className="bg-slate-950 px-5 py-10 text-center text-white">
        <p className="font-bold">
          {project.business_name}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-5 text-sm text-slate-400">
          <a href={base}>Home</a>

          {blogSettings.enabled && (
            <a href={`${base}/blog`}>Blog</a>
          )}

          {siteSettings.privacyEnabled && (
            <a href={`${base}/privacy`}>
              Privacy Policy
            </a>
          )}

          {siteSettings.termsEnabled && (
            <a href={`${base}/terms`}>
              Terms & Conditions
            </a>
          )}
        </div>

        <p className="mt-6 text-xs text-slate-500">
          Professional business website powered by Retivio
        </p>
      </footer>
    </div>
  );
}

function ContactCard({
  icon: Icon,
  label,
  value,
  href,
  color,
  external = false,
}) {
  const content = (
    <>
      <Icon className="mx-auto" style={{ color }} />

      <p className="mt-4 font-bold">
        {label || "Contact"}
      </p>

      <p className="mt-2 break-words text-sm text-slate-500">
        {value || "Information coming soon"}
      </p>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        className="rounded-2xl border border-slate-200 p-6 text-center transition hover:-translate-y-1 hover:shadow-lg"
      >
        {content}
      </a>
    );
  }

  return (
    <div className="rounded-2xl border border-slate-200 p-6 text-center">
      {content}
    </div>
  );
}

export default PublicWebsite;
