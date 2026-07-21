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
  const currentPost = blogPosts.find(
    (post) => post.slug === postSlug
  );

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
            <a href={`${base}/blog`} style={{ color }}>
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
              href={base}
              className="min-w-0 text-xl font-extrabold tracking-tight"
            >
              {project.business_name}
            </a>

            <nav className="hidden items-center gap-7 lg:flex">
              <a
                href={`${base}#home`}
                className="text-sm font-semibold text-slate-600 transition hover:text-slate-950"
              >
                Home
              </a>

              <a
                href={`${base}#about`}
                className="text-sm font-semibold text-slate-600 transition hover:text-slate-950"
              >
                About
              </a>

              <a
                href={`${base}#services`}
                className="text-sm font-semibold text-slate-600 transition hover:text-slate-950"
              >
                Services
              </a>

              {blogSettings.enabled && (
                <a
                  href={`${base}/blog`}
                  className="text-sm font-semibold text-slate-600 transition hover:text-slate-950"
                >
                  Blog
                </a>
              )}

              <a
                href={`${base}#contact`}
                className="text-sm font-semibold text-slate-600 transition hover:text-slate-950"
              >
                Contact
              </a>

              {project.whatsapp && (
                <a
                  href={`https://wa.me/${String(
                    project.whatsapp
                  ).replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                  style={{ backgroundColor: color }}
                >
                  WhatsApp
                </a>
              )}
            </nav>

            <button
              type="button"
              onClick={() =>
                setMobileMenuOpen((current) => !current)
              }
              className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-800 lg:hidden"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={mobileMenuOpen}
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
                    className="rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    {label}
                  </a>
                ))}

                {blogSettings.enabled && (
                  <a
                    href={`${base}/blog`}
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                  >
                    Blog
                  </a>
                )}

                {project.whatsapp && (
                  <a
                    href={`https://wa.me/${String(
                      project.whatsapp
                    ).replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setMobileMenuOpen(false)}
                    className="mt-2 rounded-xl px-4 py-3 text-center text-sm font-bold text-white"
                    style={{ backgroundColor: color }}
                  >
                    Chat on WhatsApp
                  </a>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      <section
        id="home"
        className="scroll-mt-24 px-5 py-24 text-center text-white sm:py-32"
        style={{ backgroundColor: color }}
      >
        <div className="mx-auto max-w-4xl">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-white/70">
            {project.city || project.business_type}
          </p>
          <h1 className="mt-5 text-5xl font-extrabold tracking-tight sm:text-7xl">
            {project.business_name}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-white/80">
            {project.tagline}
          </p>

          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {project.whatsapp && (
              <a
                href={`https://wa.me/${String(
                  project.whatsapp
                ).replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-full bg-white px-6 py-3.5 font-bold text-slate-950 transition hover:bg-slate-100"
              >
                <MessageCircle size={18} />
                WhatsApp us
              </a>
            )}

            {project.phone && (
              <a
                href={`tel:${String(project.phone).replace(
                  /[^+\d]/g,
                  ""
                )}`}
                className="inline-flex min-w-[190px] items-center justify-center gap-2 rounded-full border border-white/30 px-6 py-3.5 font-bold text-white transition hover:bg-white/10"
              >
                <Phone size={18} />
                Call now
              </a>
            )}
          </div>
        </div>
      </section>

      <section
        id="about"
        className="scroll-mt-24 px-5 py-20"
      >
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-extrabold">
            About us
          </h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">
            {project.about}
          </p>
        </div>
      </section>

      <section
        id="services"
        className="scroll-mt-24 bg-slate-50 px-5 py-20"
      >
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-4xl font-extrabold">
            Our services
          </h2>
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.id}
                className="rounded-2xl bg-white p-7 shadow-sm"
              >
                <h3 className="text-xl font-extrabold">
                  {service.name}
                </h3>
                <p className="mt-4 leading-7 text-slate-600">
                  {service.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="contact"
        className="scroll-mt-24 px-5 py-20"
      >
        <div className="mx-auto max-w-5xl text-center">
          <h2 className="text-4xl font-extrabold">
            Visit or contact us
          </h2>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            <ContactItem
              icon={Phone}
              label="Call us"
              value={project.phone}
            />
            <ContactItem
              icon={MessageCircle}
              label="WhatsApp"
              value={project.whatsapp}
            />
            <ContactItem
              icon={MapPin}
              label={project.city}
              value={project.address}
            />
          </div>
        </div>
      </section>

      <footer className="bg-slate-950 px-5 py-10 text-center text-white">
        <p className="font-bold">{project.business_name}</p>
        <div className="mt-5 flex flex-wrap justify-center gap-5 text-sm text-slate-400">
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

function ContactItem({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-6">
      <Icon className="mx-auto text-slate-500" />
      <p className="mt-4 font-bold">{label || "Contact"}</p>
      <p className="mt-2 text-sm text-slate-500">
        {value || "Information coming soon"}
      </p>
    </div>
  );
}

export default PublicWebsite;
