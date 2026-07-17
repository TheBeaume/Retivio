import React, { useEffect, useState } from "react";
import {
  getCurrentWebsiteBuilderUser,
  signInWebsiteBuilderWithGoogle,
  getWebsiteBuilderProjects,
  createWebsiteBuilderProject,
  updateWebsiteBuilderProject,
  deleteWebsiteBuilderProject,
  signOutWebsiteBuilder,
  uploadWebsiteBuilderImage,
} from "../../services/websiteBuilderProjectService";
import {
  Monitor,
  Smartphone,
  Sparkles,
  Phone,
  MapPin,
  MessageCircle,
  Palette,
  Building2,
  Scissors,
  Globe2,
  Check,
  Plus,
  Trash2,
  ArrowRight,
  Save,
  FolderOpen,
  Pencil,
  Loader2,
  Upload,
  Image as ImageIcon,
  Search,
  FileText,
  BookOpen,
  Mail,
  Link,
  Menu,
  X,
} from "lucide-react";

const businessTypes = [
  {
    id: "salon",
    name: "Salon & Beauty",
    itemLabel: "Services",
    itemSingular: "Service",
    expertise: "Our expertise",
    sectionTitle: "Services designed around you",
    heroTagline: "Beauty, care and confidence",
    aboutTitle: "Beauty with care and expertise",
  },
  {
    id: "fashion",
    name: "Fashion & Boutique",
    itemLabel: "Collections",
    itemSingular: "Collection",
    expertise: "Explore our world",
    sectionTitle: "Collections with character",
    heroTagline: "Style created for your individuality",
    aboutTitle: "Fashion with a distinct point of view",
  },
  {
    id: "jewellery",
    name: "Jewellery",
    itemLabel: "Collections",
    itemSingular: "Collection",
    expertise: "Our craftsmanship",
    sectionTitle: "Jewellery made to be remembered",
    heroTagline: "Timeless details. Meaningful elegance.",
    aboutTitle: "Crafted with beauty and intention",
  },
  {
    id: "cafe",
    name: "Cafe & Food",
    itemLabel: "Menu Highlights",
    itemSingular: "Menu Item",
    expertise: "From our menu",
    sectionTitle: "Made to enjoy",
    heroTagline: "Good food, warm moments",
    aboutTitle: "A place made for good moments",
  },
  {
    id: "professional",
    name: "Professional Business",
    itemLabel: "Services",
    itemSingular: "Service",
    expertise: "What we do",
    sectionTitle: "Professional solutions for your needs",
    heroTagline: "Professional service. Clear results.",
    aboutTitle: "Experience you can rely on",
  },
];

const businessDemoData = {
  salon: {
    businessName: "Luna Beauty Studio",
    tagline: "Beauty, care and confidence",
    about:
      "At Luna Beauty Studio, we combine expert care, modern beauty techniques and a warm personal experience to help every client feel confident.",
    address: "12 Beauty Avenue, Your City",
    services: [
      {
        id: 1,
        name: "Hair Styling",
        description: "Modern cuts, styling and professional hair care designed around you.",
      },
      {
        id: 2,
        name: "Skin & Beauty",
        description: "Professional beauty treatments for a fresh and radiant look.",
      },
      {
        id: 3,
        name: "Bridal Services",
        description: "Elegant bridal beauty experiences created for your special day.",
      },
    ],
  },
  fashion: {
    businessName: "Élan Boutique",
    tagline: "Style created for your individuality",
    about:
      "Élan Boutique brings together expressive silhouettes, curated collections and modern style for people who believe fashion should feel personal.",
    address: "28 Fashion Street, Your City",
    services: [
      {
        id: 1,
        name: "New Arrivals",
        description: "Discover our latest curated styles and statement pieces.",
      },
      {
        id: 2,
        name: "Signature Collection",
        description: "Distinctive fashion created for confident everyday expression.",
      },
      {
        id: 3,
        name: "Occasion Edit",
        description: "Elegant pieces selected for celebrations and memorable moments.",
      },
    ],
  },
  jewellery: {
    businessName: "Aurelle Jewels",
    tagline: "Timeless details. Meaningful elegance.",
    about:
      "Aurelle Jewels celebrates timeless craftsmanship through refined jewellery designed to become part of your most meaningful moments.",
    address: "7 Heritage Market, Your City",
    services: [
      {
        id: 1,
        name: "Signature Jewellery",
        description: "Refined jewellery created with timeless elegance and detail.",
      },
      {
        id: 2,
        name: "Bridal Collection",
        description: "Statement pieces designed for unforgettable wedding celebrations.",
      },
      {
        id: 3,
        name: "Everyday Elegance",
        description: "Beautiful jewellery made to elevate your everyday style.",
      },
    ],
  },
  cafe: {
    businessName: "The Warm Cup",
    tagline: "Good food, warm moments",
    about:
      "The Warm Cup is a welcoming neighbourhood cafe serving comforting flavours, fresh favourites and good moments worth sharing.",
    address: "15 Market Lane, Your City",
    services: [
      {
        id: 1,
        name: "Craft Coffee",
        description: "Freshly prepared coffee made for slow mornings and good conversations.",
      },
      {
        id: 2,
        name: "Cafe Favourites",
        description: "Comforting dishes and fresh flavours prepared with care.",
      },
      {
        id: 3,
        name: "Sweet Moments",
        description: "Desserts and treats made to complete your cafe experience.",
      },
    ],
  },
  professional: {
    businessName: "Northline Consulting",
    tagline: "Professional service. Clear results.",
    about:
      "Northline Consulting provides practical, reliable and professional solutions focused on helping clients move forward with clarity and confidence.",
    address: "42 Business District, Your City",
    services: [
      {
        id: 1,
        name: "Business Consulting",
        description: "Practical guidance designed around your business priorities.",
      },
      {
        id: 2,
        name: "Strategy & Planning",
        description: "Clear strategies and structured plans focused on meaningful results.",
      },
      {
        id: 3,
        name: "Professional Support",
        description: "Reliable ongoing support for your evolving business needs.",
      },
    ],
  },
};

const templates = [
  {
    id: "luxury",
    businessType: "salon",
    name: "Salon Noir",
    description: "Dark, elegant and premium",
    style: "luxury",
  },
  {
    id: "modern",
    businessType: "salon",
    name: "Beauty Modern",
    description: "Clean and conversion focused",
    style: "modern",
  },
  {
    id: "minimal",
    businessType: "salon",
    name: "Soft Studio",
    description: "Calm, soft and professional",
    style: "minimal",
  },
  {
    id: "fashion-editorial",
    businessType: "fashion",
    name: "Editorial",
    description: "Bold fashion and boutique presentation",
    style: "luxury",
  },
  {
    id: "fashion-modern",
    businessType: "fashion",
    name: "Modern Boutique",
    description: "Clean collections and strong branding",
    style: "modern",
  },
  {
    id: "fashion-soft",
    businessType: "fashion",
    name: "Soft Atelier",
    description: "Warm, minimal and curated",
    style: "minimal",
  },
  {
    id: "jewellery-luxe",
    businessType: "jewellery",
    name: "Jewellery Luxe",
    description: "Premium and timeless presentation",
    style: "luxury",
  },
  {
    id: "jewellery-modern",
    businessType: "jewellery",
    name: "Modern Jewel",
    description: "Clean and refined product storytelling",
    style: "modern",
  },
  {
    id: "jewellery-minimal",
    businessType: "jewellery",
    name: "Pure Elegance",
    description: "Soft luxury with minimal details",
    style: "minimal",
  },
  {
    id: "cafe-dark",
    businessType: "cafe",
    name: "Roast House",
    description: "Rich and atmospheric cafe style",
    style: "luxury",
  },
  {
    id: "cafe-modern",
    businessType: "cafe",
    name: "Fresh Table",
    description: "Bright and modern food presentation",
    style: "modern",
  },
  {
    id: "cafe-soft",
    businessType: "cafe",
    name: "Warm Corner",
    description: "Calm, friendly and welcoming",
    style: "minimal",
  },
  {
    id: "business-premium",
    businessType: "professional",
    name: "Executive",
    description: "Premium professional presence",
    style: "luxury",
  },
  {
    id: "business-modern",
    businessType: "professional",
    name: "Business Modern",
    description: "Clear, credible and conversion focused",
    style: "modern",
  },
  {
    id: "business-minimal",
    businessType: "professional",
    name: "Professional Minimal",
    description: "Simple, confident and trustworthy",
    style: "minimal",
  },
];


function generateProfessionalTerms(businessName, contactEmail) {
  const name = businessName?.trim() || "This Business";
  const email =
    contactEmail?.trim() ||
    "the contact details available on this website";

  return `Terms & Conditions

Effective date: ${new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}

Welcome to ${name}. These Terms & Conditions govern your access to and use of this website, its content, enquiry facilities and any services or information made available through it.

1. ACCEPTANCE OF TERMS

By accessing, browsing or using this website, you acknowledge that you have read, understood and agreed to these Terms & Conditions. If you do not agree with these terms, you should discontinue use of the website.

2. WEBSITE INFORMATION

We aim to keep the information presented on this website accurate, useful and up to date. However, service descriptions, availability, pricing, offers, business hours and other information may be updated or changed without prior notice.

Information on this website is provided for general business and customer information purposes. Where specific confirmation is required, customers should contact ${name} directly before making a decision or visiting the business.

3. SERVICES AND ENQUIRIES

Submitting an enquiry, contact form, booking request or WhatsApp message does not automatically create a confirmed appointment, reservation or contractual commitment.

A service, appointment or request is considered confirmed only when ${name} communicates confirmation directly to the customer.

Service availability may depend on staff availability, operating hours, location, stock, scheduling requirements and other business circumstances.

4. PRICING AND PAYMENTS

Prices displayed on the website, where applicable, may be indicative and may change from time to time.

Additional requirements, customised services, taxes, delivery costs or other charges may apply depending on the nature of the service or product.

Customers should confirm the final price directly with ${name} before completing a purchase or receiving a service.

5. CUSTOMER RESPONSIBILITIES

Customers are responsible for providing accurate contact, booking and enquiry information.

You agree not to use this website to submit false, misleading, unlawful, abusive or fraudulent information.

You must not attempt to damage, disrupt, reverse engineer, overload or gain unauthorised access to this website or its related systems.

6. INTELLECTUAL PROPERTY

Unless otherwise stated, the business name, branding, website text, graphics, photographs, design elements and other original content displayed on this website belong to ${name} or are used with appropriate permission.

Website content may not be copied, reproduced, republished, commercially distributed or misrepresented without appropriate permission.

7. THIRD-PARTY SERVICES

This website may provide links or connections to third-party services such as WhatsApp, maps, social media platforms, payment services or external websites.

${name} does not control every third-party platform and is not responsible for the independent privacy practices, availability, content or policies of those services.

8. WEBSITE AVAILABILITY

We aim to maintain a reliable website experience. However, uninterrupted or error-free access cannot be guaranteed.

The website may occasionally be unavailable because of maintenance, technical issues, hosting interruptions, security updates or circumstances beyond reasonable control.

9. LIMITATION OF LIABILITY

To the maximum extent permitted by applicable law, ${name} will not be liable for indirect, incidental or consequential losses resulting solely from the use of, or inability to access, this website.

Nothing in these Terms is intended to exclude any right or liability that cannot legally be excluded under applicable law.

10. CHANGES TO THESE TERMS

These Terms & Conditions may be updated when business practices, services, website features or legal requirements change.

The latest version published on this website will apply from its stated effective date.

11. GOVERNING REQUIREMENTS

Use of this website is subject to applicable laws and regulations. Any dispute should first be raised directly with ${name} so that a reasonable resolution can be attempted.

12. CONTACT

For questions regarding these Terms & Conditions, contact ${name} at ${email}.

By continuing to use this website, you agree to these Terms & Conditions.`;
}

function generateProfessionalPrivacy(businessName, contactEmail) {
  const name = businessName?.trim() || "This Business";
  const email =
    contactEmail?.trim() ||
    "the contact details available on this website";

  return `Privacy Policy

Effective date: ${new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })}

${name} respects your privacy. This Privacy Policy explains how information may be collected, used and protected when you visit this website, submit an enquiry or communicate with the business through available contact options.

1. INFORMATION YOU PROVIDE

We may receive information that you voluntarily provide through this website or related communication channels.

This may include your name, email address, phone number, enquiry details, appointment or service preferences and any other information you choose to include in a message.

2. CONTACT AND ENQUIRY INFORMATION

When you use a contact or enquiry form, the information you submit may be used to respond to your request, provide information about services, manage customer communication and follow up where reasonably necessary.

Please avoid submitting unnecessary sensitive personal information through general website contact forms.

3. AUTOMATIC AND TECHNICAL INFORMATION

Like many websites, limited technical information may be processed when you access the website.

This may include browser type, device information, approximate location based on network information, referring pages, pages visited and basic website usage information.

Such information may be used for website security, performance, analytics and service improvement.

4. HOW INFORMATION MAY BE USED

Information may be used to:

• Respond to enquiries and customer requests.
• Provide information about products or services.
• Manage appointments or service-related communication.
• Improve website content and customer experience.
• Maintain website security and prevent misuse.
• Comply with applicable legal obligations.
• Maintain appropriate business records.

5. LEGAL AND RESPONSIBLE PROCESSING

Personal information will be handled for legitimate business purposes, customer communication, service delivery, consent-based activities or legal compliance, as applicable.

We do not intend to use personal information in a manner that is unrelated to the purpose for which it was reasonably provided.

6. INFORMATION SHARING

${name} does not sell personal information as part of its normal business operations.

Information may be shared with service providers where reasonably necessary to operate the website, manage communication, provide technical infrastructure or deliver requested services.

Information may also be disclosed where required by law, regulation, legal process or a valid request from an authorised public authority.

7. THIRD-PARTY PLATFORMS

The website may connect visitors to services such as WhatsApp, maps, social media platforms or other third-party websites.

When you choose to use an external platform, that platform may process information according to its own privacy policy and terms.

We encourage visitors to review the privacy practices of third-party services they use.

8. DATA SECURITY

Reasonable technical and organisational measures may be used to protect information against unauthorised access, misuse, alteration or loss.

However, no internet transmission or electronic storage system can guarantee absolute security.

9. DATA RETENTION

Information may be retained for as long as reasonably necessary to respond to enquiries, provide services, maintain business records, resolve disputes or comply with legal obligations.

Information that is no longer reasonably required may be deleted, anonymised or securely archived, subject to applicable requirements.

10. YOUR CHOICES AND RIGHTS

Depending on applicable law, you may have rights regarding access, correction or deletion of certain personal information.

You may contact ${name} if you believe information provided by you is inaccurate or if you wish to raise a privacy-related request.

Certain information may need to be retained where required for legal, security or legitimate business purposes.

11. CHILDREN'S PRIVACY

This website is intended for general business and customer information.

We do not knowingly seek to collect unnecessary personal information from children through general enquiry forms.

A parent or guardian who believes a child has submitted personal information may contact us to raise a request.

12. POLICY UPDATES

This Privacy Policy may be updated to reflect changes in website features, business practices, technology or applicable requirements.

The latest version displayed on this website will apply from the effective date stated above.

13. CONTACT

For privacy-related questions or requests, contact ${name} at ${email}.

By using this website or voluntarily submitting information, you acknowledge the practices described in this Privacy Policy.`;
}

const builderSteps = [
  { id: "business", label: "Business", icon: Building2 },
  { id: "brand", label: "Brand", icon: Palette },
  { id: "images", label: "Images", icon: ImageIcon },
  { id: "services", label: "Services", icon: Scissors },
  { id: "seo", label: "SEO & Pages", icon: Search },
  { id: "blog", label: "Blog", icon: BookOpen },
  { id: "publish", label: "Publish", icon: Globe2 },
];

export default function WebsiteBuilder() {
  const [activeStep, setActiveStep] = useState("business");
  const [previewMode, setPreviewMode] = useState("desktop");
  const [user, setUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [currentProjectId, setCurrentProjectId] = useState(null);
  const [hostingOption, setHostingOption] = useState("retivio");
  const [saving, setSaving] = useState(false);
  const [previewMobileMenuOpen, setPreviewMobileMenuOpen] =
    useState(false);
  const [publishing, setPublishing] = useState(false);
  const [currentProjectStatus, setCurrentProjectStatus] =
    useState("draft");
  const [publicSlug, setPublicSlug] = useState("");
  const [googleSigningIn, setGoogleSigningIn] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [saveMessage, setSaveMessage] = useState("");
  const [uploadingImage, setUploadingImage] = useState("");

  const [websiteMedia, setWebsiteMedia] = useState({
    hero: null,
    about: null,
    gallery: [],
  });

  const [siteSettings, setSiteSettings] = useState({
    seoTitle: "",
    metaDescription: "",
    keywords: "",
    contactEmail: "",
    contactFormEnabled: true,
    termsEnabled: true,
    privacyEnabled: true,
    sitemapEnabled: true,
  });

  const [blogSettings, setBlogSettings] = useState({
    enabled: true,
    title: "Latest from our blog",
  });

  const [blogPosts, setBlogPosts] = useState([]);

  const [legalContent, setLegalContent] = useState({
    terms: generateProfessionalTerms("Your Business", ""),
    privacy: generateProfessionalPrivacy("Your Business", ""),
  });

  const [previewPage, setPreviewPage] = useState("home");

  const [formData, setFormData] = useState({
    businessName: "Your Business",
    businessType: "salon",
    tagline: "Beauty, care and confidence",
    about:
      "We create beautiful experiences with expert care, modern techniques and a passion for helping every client feel confident.",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    city: "Your City",
    address: "Your salon address",
    primaryColor: "#7e22ce",
    template: "luxury",
  });

  const [services, setServices] = useState([
    {
      id: 1,
      name: "Hair Styling",
      description: "Cuts, styling and hair care designed around you.",
    },
    {
      id: 2,
      name: "Skin & Beauty",
      description: "Professional beauty care for a fresh, radiant look.",
    },
    {
      id: 3,
      name: "Bridal Services",
      description: "Elegant bridal beauty experiences for your special day.",
    },
  ]);

  useEffect(() => {
    initializeBuilder();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const initializeBuilder = async () => {
    const { user: currentUser } =
      await getCurrentWebsiteBuilderUser();

    setUser(currentUser || null);

    let draftRestored = false;

    if (currentUser) {
      const savedDraft = localStorage.getItem(
        "retivioWebsiteBuilderDraft"
      );

      if (savedDraft) {
        try {
          const draft = JSON.parse(savedDraft);

          if (draft?.formData) {
            setFormData((current) => ({
              ...current,
              ...draft.formData,
            }));
          }

          if (Array.isArray(draft?.services)) {
            setServices(draft.services);
          }

          if (draft?.websiteMedia) {
            setWebsiteMedia((current) => ({
              ...current,
              ...draft.websiteMedia,
              gallery: Array.isArray(draft.websiteMedia.gallery)
                ? draft.websiteMedia.gallery
                : [],
            }));
          }

          if (draft?.hostingOption) {
            setHostingOption(draft.hostingOption);
          }

          if (draft?.legalContent) {
            setLegalContent((current) => ({
              ...current,
              ...draft.legalContent,
            }));
          }

          if (draft?.siteSettings) {
            setSiteSettings((current) => ({
              ...current,
              ...draft.siteSettings,
            }));
          }

          if (draft?.blogSettings) {
            setBlogSettings((current) => ({
              ...current,
              ...draft.blogSettings,
            }));
          }

          if (Array.isArray(draft?.blogPosts)) {
            setBlogPosts(draft.blogPosts);
          }

          setCurrentProjectId(null);
          setActiveStep("images");
          setSaveMessage(
            "Your website draft has been restored. You can now upload website images."
          );

          draftRestored = true;
        } catch (error) {
          console.error(
            "Website draft restore error:",
            error
          );

          localStorage.removeItem(
            "retivioWebsiteBuilderDraft"
          );
        }
      }

      await loadProjects(currentUser.id);
    }

    if (!draftRestored) {
      setSaveMessage("");
    }

    setLoadingProjects(false);
  };

  const loadProjects = async (userId) => {
    const { data, error } =
      await getWebsiteBuilderProjects(userId);

    if (error) {
      console.error("Website project load error:", error);
      return;
    }

    setProjects(data || []);
  };

  const signOutBuilder = async () => {
    const { error } = await signOutWebsiteBuilder();

    if (error) {
      console.error("Website builder sign out error:", error);
      alert(error.message || "Unable to sign out.");
      return;
    }

    setUser(null);
    setProjects([]);
    setCurrentProjectId(null);
    setSaveMessage("You have been signed out.");
    setActiveStep("business");
  };

  const navigatePreview = (sectionId) => {
    setPreviewPage("home");
    setPreviewMobileMenuOpen(false);

    window.setTimeout(() => {
      document
        .getElementById(`builder-preview-${sectionId}`)
        ?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    }, 0);
  };

  const scrollToMyWebsites = () => {
    document
      .getElementById("my-websites")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const getProjectPayload = (
    userId,
    overrides = {}
  ) => ({
    user_id: userId,
    business_name: formData.businessName.trim() || "Your Business",
    business_type: formData.businessType || "salon",
    tagline: formData.tagline.trim() || null,
    about: formData.about.trim() || null,
    phone: formData.phone.trim() || null,
    whatsapp: formData.whatsapp.trim() || null,
    city: formData.city.trim() || null,
    address: formData.address.trim() || null,
    primary_color: formData.primaryColor,
    template: formData.template,
    services,
    website_media: {
      ...websiteMedia,
      siteSettings,
      blogSettings,
      blogPosts,
      legalContent,
    },
    hosting_option: hostingOption,
    status: currentProjectStatus,
    public_slug: publicSlug || null,
    ...overrides,
  });

  const createPublicSlug = (businessName, projectId) => {
    const base =
      businessName
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 60) || "website";

    return `${base}-${String(projectId).slice(0, 8)}`;
  };

  const continueWithGoogle = async () => {
    if (!formData.businessName.trim()) {
      alert("Please enter your business name.");
      setActiveStep("business");
      return;
    }

    localStorage.setItem(
      "retivioWebsiteBuilderDraft",
      JSON.stringify({
        formData,
        services,
        websiteMedia,
        siteSettings,
        blogSettings,
        blogPosts,
        legalContent,
        hostingOption,
      })
    );

    setGoogleSigningIn(true);

    const { error } = await signInWebsiteBuilderWithGoogle();

    if (error) {
      console.error("Google sign in error:", error);
      alert(error.message || "Unable to continue with Google.");
      setGoogleSigningIn(false);
    }
  };

  const saveWebsite = async () => {
    setSaveMessage("");

    if (!formData.businessName.trim()) {
      alert("Please enter your business name.");
      setActiveStep("business");
      return;
    }

    const authProviders =
      user?.app_metadata?.providers || [];

    const signedInWithGoogle =
      user?.app_metadata?.provider === "google" ||
      authProviders.includes("google") ||
      user?.identities?.some(
        (identity) => identity.provider === "google"
      );

    if (!user || !signedInWithGoogle) {
      await continueWithGoogle();
      return;
    }

    setSaving(true);

    try {
      const payload = getProjectPayload(user.id);

      const result = currentProjectId
        ? await updateWebsiteBuilderProject(
            currentProjectId,
            user.id,
            payload
          )
        : await createWebsiteBuilderProject(payload);

      if (result.error) {
        console.error("Website save error:", result.error);
        alert(result.error.message || "Unable to save website.");
        return;
      }

      if (result.data?.id) {
        setCurrentProjectId(result.data.id);
      }

      localStorage.removeItem(
        "retivioWebsiteBuilderDraft"
      );

      await loadProjects(user.id);

      setSaveMessage(
        currentProjectId
          ? "Website changes saved."
          : "Website project saved successfully to your Retivio account."
      );
    } finally {
      setSaving(false);
    }
  };

  const publishWebsite = async () => {
    setSaveMessage("");

    if (!formData.businessName.trim()) {
      alert("Please enter your business name.");
      setActiveStep("business");
      return;
    }

    const authProviders =
      user?.app_metadata?.providers || [];

    const signedInWithGoogle =
      user?.app_metadata?.provider === "google" ||
      authProviders.includes("google") ||
      user?.identities?.some(
        (identity) => identity.provider === "google"
      );

    if (!user || !signedInWithGoogle) {
      await continueWithGoogle();
      return;
    }

    setPublishing(true);

    try {
      let projectId = currentProjectId;
      let slug = publicSlug;

      if (!projectId) {
        const createResult =
          await createWebsiteBuilderProject(
            getProjectPayload(user.id, {
              status: "draft",
              public_slug: null,
            })
          );

        if (createResult.error) {
          console.error(
            "Website create before publish error:",
            createResult.error
          );
          alert(
            createResult.error.message ||
              "Unable to prepare website for publishing."
          );
          return;
        }

        projectId = createResult.data.id;
        setCurrentProjectId(projectId);
      }

      if (!slug) {
        slug = createPublicSlug(
          formData.businessName,
          projectId
        );
      }

      const publishResult =
        await updateWebsiteBuilderProject(
          projectId,
          user.id,
          getProjectPayload(user.id, {
            status: "published",
            public_slug: slug,
          })
        );

      if (publishResult.error) {
        console.error(
          "Website publish error:",
          publishResult.error
        );
        alert(
          publishResult.error.message ||
            "Unable to publish website."
        );
        return;
      }

      setCurrentProjectStatus("published");
      setPublicSlug(slug);

      localStorage.removeItem(
        "retivioWebsiteBuilderDraft"
      );

      await loadProjects(user.id);

      setSaveMessage(
        "Website published successfully. Your public website is live."
      );
    } finally {
      setPublishing(false);
    }
  };

  const openProject = (project) => {
    setCurrentProjectId(project.id);
    setCurrentProjectStatus(project.status || "draft");
    setPublicSlug(project.public_slug || "");

    setFormData({
      businessName: project.business_name || "Your Business",
      businessType: project.business_type || "salon",
      tagline: project.tagline || "",
      about: project.about || "",
      phone: project.phone || "",
      whatsapp: project.whatsapp || "",
      city: project.city || "",
      address: project.address || "",
      primaryColor: project.primary_color || "#7e22ce",
      template: project.template || "luxury",
    });

    setServices(
      Array.isArray(project.services)
        ? project.services
        : []
    );

    const savedMedia = project.website_media || {};

    setWebsiteMedia({
      hero: savedMedia.hero || null,
      about: savedMedia.about || null,
      gallery: Array.isArray(savedMedia.gallery)
        ? savedMedia.gallery
        : [],
    });

    setSiteSettings((current) => ({
      ...current,
      ...(savedMedia.siteSettings || {}),
    }));

    setBlogSettings((current) => ({
      ...current,
      ...(savedMedia.blogSettings || {}),
    }));

    setBlogPosts(
      Array.isArray(savedMedia.blogPosts)
        ? savedMedia.blogPosts
        : []
    );

    setLegalContent({
      terms:
        savedMedia.legalContent?.terms ||
        generateProfessionalTerms(
          project.business_name || "Your Business",
          savedMedia.siteSettings?.contactEmail || ""
        ),
      privacy:
        savedMedia.legalContent?.privacy ||
        generateProfessionalPrivacy(
          project.business_name || "Your Business",
          savedMedia.siteSettings?.contactEmail || ""
        ),
    });

    setPreviewPage("home");

    setHostingOption(project.hosting_option || "retivio");
    setSaveMessage("");
    setActiveStep("business");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const createNewWebsite = () => {
    setCurrentProjectId(null);
    setCurrentProjectStatus("draft");
    setPublicSlug("");
    setFormData({
      businessName: "Your Business",
      businessType: "salon",
      tagline: "Beauty, care and confidence",
      about:
        "We create beautiful experiences with expert care, modern techniques and a passion for helping every client feel confident.",
      phone: "+91 98765 43210",
      whatsapp: "+91 98765 43210",
      city: "Your City",
      address: "Your salon address",
      primaryColor: "#7e22ce",
      template: "luxury",
    });

    setServices([
      {
        id: 1,
        name: "Hair Styling",
        description:
          "Cuts, styling and hair care designed around you.",
      },
      {
        id: 2,
        name: "Skin & Beauty",
        description:
          "Professional beauty care for a fresh, radiant look.",
      },
      {
        id: 3,
        name: "Bridal Services",
        description:
          "Elegant bridal beauty experiences for your special day.",
      },
    ]);

    setWebsiteMedia({
      hero: null,
      about: null,
      gallery: [],
    });

    setSiteSettings({
      seoTitle: "",
      metaDescription: "",
      keywords: "",
      contactEmail: "",
      contactFormEnabled: true,
      termsEnabled: true,
      privacyEnabled: true,
      sitemapEnabled: true,
    });

    setBlogSettings({
      enabled: true,
      title: "Latest from our blog",
    });

    setBlogPosts([]);

    setLegalContent({
      terms: generateProfessionalTerms("Your Business", ""),
      privacy: generateProfessionalPrivacy("Your Business", ""),
    });

    setPreviewPage("home");

    setHostingOption("retivio");
    setSaveMessage("");
    setActiveStep("business");
  };

  const removeProject = async (project) => {
    if (!user) return;

    const confirmed = window.confirm(
      `Delete ${project.business_name || "this website"}?`
    );

    if (!confirmed) return;

    const { error } = await deleteWebsiteBuilderProject(
      project.id,
      user.id
    );

    if (error) {
      alert(error.message || "Unable to delete website.");
      return;
    }

    if (currentProjectId === project.id) {
      createNewWebsite();
    }

    await loadProjects(user.id);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const uploadWebsiteImage = async (event, category) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    if (!user) {
      alert("Please sign in with Google before uploading images.");
      return;
    }

    setUploadingImage(category);

    try {
      const { data, error } = await uploadWebsiteBuilderImage(
        user.id,
        file,
        category
      );

      if (error) {
        console.error("Image upload error:", error);
        alert(error.message || "Unable to upload image.");
        return;
      }

      setWebsiteMedia((current) => {
        if (category === "gallery") {
          return {
            ...current,
            gallery: [...current.gallery, data].slice(0, 6),
          };
        }

        return {
          ...current,
          [category]: data,
        };
      });

      setSaveMessage("Image uploaded. Save website to keep changes.");
    } finally {
      setUploadingImage("");
    }
  };

  const removeWebsiteImage = (category, index = null) => {
    setWebsiteMedia((current) => {
      if (category === "gallery") {
        return {
          ...current,
          gallery: current.gallery.filter(
            (_, itemIndex) => itemIndex !== index
          ),
        };
      }

      return {
        ...current,
        [category]: null,
      };
    });
  };

  const resetTermsToProfessional = () => {
    setLegalContent((current) => ({
      ...current,
      terms: generateProfessionalTerms(
        formData.businessName,
        siteSettings.contactEmail
      ),
    }));
  };

  const resetPrivacyToProfessional = () => {
    setLegalContent((current) => ({
      ...current,
      privacy: generateProfessionalPrivacy(
        formData.businessName,
        siteSettings.contactEmail
      ),
    }));
  };

  const updateLegalContent = (type, value) => {
    setLegalContent((current) => ({
      ...current,
      [type]: value,
    }));
  };

  const handleSiteSettingChange = (event) => {
    const { name, value, type, checked } = event.target;

    setSiteSettings((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBlogSettingChange = (event) => {
    const { name, value, type, checked } = event.target;

    setBlogSettings((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const addBlogPost = () => {
    setBlogPosts((current) => [
      ...current,
      {
        id: Date.now(),
        title: "",
        slug: "",
        metaDescription: "",
        content: "",
      },
    ]);
  };

  const updateBlogPost = (id, field, value) => {
    setBlogPosts((current) =>
      current.map((post) => {
        if (post.id !== id) return post;

        const updatedPost = {
          ...post,
          [field]: value,
        };

        if (field === "title" && !post.slug) {
          updatedPost.slug = value
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "");
        }

        return updatedPost;
      })
    );
  };

  const removeBlogPost = (id) => {
    setBlogPosts((current) =>
      current.filter((post) => post.id !== id)
    );
  };

  const updateService = (id, field, value) => {
    setServices((current) =>
      current.map((service) =>
        service.id === id
          ? { ...service, [field]: value }
          : service
      )
    );
  };

  const addService = () => {
    setServices((current) => [
      ...current,
      {
        id: Date.now(),
        name: `New ${selectedBusiness.itemSingular}`,
        description: `Describe your ${selectedBusiness.itemSingular.toLowerCase()} here.`,
      },
    ]);
  };

  const removeService = (id) => {
    setServices((current) =>
      current.filter((service) => service.id !== id)
    );
  };

  const selectedBusiness =
    businessTypes.find(
      (business) => business.id === formData.businessType
    ) || businessTypes[0];

  const filteredTemplates = templates.filter(
    (template) => template.businessType === formData.businessType
  );

  const selectedTemplate =
    templates.find(
      (template) => template.id === formData.template
    ) || filteredTemplates[0] || templates[0];

  const isLuxury = selectedTemplate.style === "luxury";
  const isMinimal = selectedTemplate.style === "minimal";

  const handleBusinessTypeChange = (event) => {
    const businessType = event.target.value;

    const firstTemplate =
      templates.find(
        (template) => template.businessType === businessType
      ) || templates[0];

    const demo =
      businessDemoData[businessType] ||
      businessDemoData.salon;

    setFormData((current) => ({
      ...current,
      businessName: demo.businessName,
      businessType,
      tagline: demo.tagline,
      about: demo.about,
      address: demo.address,
      template: firstTemplate.id,
    }));

    setServices(
      demo.services.map((service) => ({ ...service }))
    );

    setSaveMessage("");
  };

  const heroClass = isLuxury
    ? "bg-slate-950 text-white"
    : isMinimal
    ? "bg-stone-100 text-slate-950"
    : "bg-white text-slate-950";

  const mutedTextClass = isLuxury
    ? "text-slate-300"
    : "text-slate-600";

  return (
    <section className="min-h-screen bg-slate-950 py-12 text-white sm:py-16">
      <div className="mx-auto max-w-[1500px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-purple-400/20 bg-purple-500/10 px-4 py-2 text-sm font-semibold text-purple-300">
            <Sparkles size={16} />
            Retivio Website Builder
          </div>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight sm:text-5xl">
            Build a website your business can be proud of.
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Add your business details, choose your style and preview a
            professional business website instantly.
          </p>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/80 p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {user ? (
              <>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white">
                    Website Builder account
                  </p>
                  <p className="mt-1 truncate text-sm text-slate-400">
                    Signed in as {user.email}
                  </p>
                </div>

                <div className="flex flex-col gap-2 sm:flex-row">
                  <button
                    type="button"
                    onClick={scrollToMyWebsites}
                    className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-purple-500/50"
                  >
                    <FolderOpen size={17} />
                    My Websites
                  </button>

                  <button
                    type="button"
                    onClick={signOutBuilder}
                    className="rounded-xl border border-white/10 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-white/20 hover:text-white"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <p className="text-sm font-bold text-white">
                    Save and manage your websites
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Sign in securely with Google to save projects and continue editing later.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={continueWithGoogle}
                  disabled={googleSigningIn}
                  className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-slate-950 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {googleSigningIn ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Globe2 size={18} />
                  )}

                  {googleSigningIn
                    ? "Opening Google..."
                    : "Sign in with Google"}
                </button>
              </>
            )}
          </div>
        </div>

        <div className="mt-10 overflow-x-auto">
          <div className="mx-auto flex min-w-max justify-center gap-2">
            {builderSteps.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setActiveStep(id)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                  activeStep === id
                    ? "border-purple-500 bg-purple-600 text-white"
                    : "border-white/10 bg-slate-900 text-slate-400 hover:border-white/20"
                }`}
              >
                <Icon size={17} />
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 xl:grid-cols-[400px_minmax(0,1fr)]">
          <div className="rounded-3xl border border-white/10 bg-slate-900 p-5 sm:p-6">
            {activeStep === "business" && (
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-400">
                  Business details
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  Tell us about your business
                </h2>

                <div className="mt-7 space-y-5">
                  <Field
                    label="Business name"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Your business name"
                  />

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-300">
                      Business type
                    </label>

                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleBusinessTypeChange}
                      className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-purple-500"
                    >
                      {businessTypes.map((business) => (
                        <option key={business.id} value={business.id}>
                          {business.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <Field
                    label="Tagline"
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleChange}
                    placeholder="Your business tagline"
                  />

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-300">
                      About your business
                    </label>

                    <textarea
                      name="about"
                      value={formData.about}
                      onChange={handleChange}
                      rows={5}
                      className="w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-purple-500"
                    />
                  </div>

                  <Field
                    label="Phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />

                  <Field
                    label="WhatsApp"
                    name="whatsapp"
                    value={formData.whatsapp}
                    onChange={handleChange}
                  />

                  <Field
                    label="City"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />

                  <Field
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                  />
                </div>

                <NextButton onClick={() => setActiveStep("brand")} />
              </div>
            )}

            {activeStep === "brand" && (
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-400">
                  Brand & design
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  Choose your website style
                </h2>

                <div className="mt-7 space-y-3">
                  {filteredTemplates.map((template) => (
                    <button
                      key={template.id}
                      type="button"
                      onClick={() =>
                        setFormData((current) => ({
                          ...current,
                          template: template.id,
                        }))
                      }
                      className={`w-full rounded-xl border p-4 text-left transition ${
                        formData.template === template.id
                          ? "border-purple-500 bg-purple-500/10"
                          : "border-white/10 bg-slate-950 hover:border-white/20"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="font-bold">{template.name}</p>
                          <p className="mt-1 text-sm text-slate-400">
                            {template.description}
                          </p>
                        </div>

                        {formData.template === template.id && (
                          <Check
                            size={19}
                            className="text-purple-400"
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6">
                  <label className="mb-2 block text-sm font-semibold text-slate-300">
                    Brand color
                  </label>

                  <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-slate-950 p-4">
                    <input
                      type="color"
                      name="primaryColor"
                      value={formData.primaryColor}
                      onChange={handleChange}
                      className="h-12 w-14 cursor-pointer border-0 bg-transparent"
                    />

                    <div>
                      <p className="font-semibold">
                        Primary website color
                      </p>
                      <p className="mt-1 text-sm text-slate-500">
                        {formData.primaryColor}
                      </p>
                    </div>
                  </div>
                </div>

                <NextButton onClick={() => setActiveStep("images")} />
              </div>
            )}

            {activeStep === "images" && (
              <div>
                <div className="flex items-center gap-2 text-purple-400">
                  <ImageIcon size={18} />
                  <p className="text-sm font-bold uppercase tracking-[0.18em]">
                    Website images
                  </p>
                </div>

                <h2 className="mt-3 text-2xl font-bold">
                  Add images to your website
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Upload your hero, about and gallery images. JPG, PNG and WebP images up to 5 MB are supported.
                </p>

                <div className="mt-7 space-y-4">
                  <WebsiteImageField
                    title="Hero image"
                    image={websiteMedia.hero}
                    uploading={uploadingImage === "hero"}
                    onUpload={(event) =>
                      uploadWebsiteImage(event, "hero")
                    }
                    onRemove={() => removeWebsiteImage("hero")}
                  />

                  <WebsiteImageField
                    title="About image"
                    image={websiteMedia.about}
                    uploading={uploadingImage === "about"}
                    onUpload={(event) =>
                      uploadWebsiteImage(event, "about")
                    }
                    onRemove={() => removeWebsiteImage("about")}
                  />

                  <div className="rounded-xl border border-white/10 bg-slate-950 p-4">
                    <p className="font-bold text-white">
                      Gallery images
                    </p>

                    <p className="mt-2 text-sm text-slate-400">
                      Add up to 6 images to your website gallery.
                    </p>

                    {websiteMedia.gallery.length > 0 && (
                      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3">
                        {websiteMedia.gallery.map((image, index) => (
                          <div
                            key={`${image.url}-${index}`}
                            className="relative"
                          >
                            <img
                              src={image.url}
                              alt={`Gallery ${index + 1}`}
                              className="h-24 w-full rounded-lg object-cover"
                            />

                            <button
                              type="button"
                              onClick={() =>
                                removeWebsiteImage("gallery", index)
                              }
                              className="absolute right-1 top-1 rounded-md bg-slate-950/80 p-1 text-white"
                              aria-label={`Remove gallery image ${index + 1}`}
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}

                    {websiteMedia.gallery.length < 6 && (
                      <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-purple-500/40 bg-purple-500/10 px-4 py-3 font-semibold text-purple-300">
                        {uploadingImage === "gallery" ? (
                          <Loader2 size={17} className="animate-spin" />
                        ) : (
                          <Upload size={17} />
                        )}

                        {uploadingImage === "gallery"
                          ? "Uploading..."
                          : "Add gallery image"}

                        <input
                          type="file"
                          accept="image/jpeg,image/png,image/webp"
                          onChange={(event) =>
                            uploadWebsiteImage(event, "gallery")
                          }
                          disabled={uploadingImage === "gallery"}
                          className="hidden"
                        />
                      </label>
                    )}
                  </div>
                </div>

                <NextButton onClick={() => setActiveStep("services")} />
              </div>
            )}

            {activeStep === "services" && (
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-400">
                  {selectedBusiness.itemLabel}
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  Add your key {selectedBusiness.itemLabel.toLowerCase()}
                </h2>

                <div className="mt-7 space-y-4">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className="rounded-xl border border-white/10 bg-slate-950 p-4"
                    >
                      <div className="flex items-start gap-3">
                        <div className="flex-1 space-y-3">
                          <input
                            value={service.name}
                            onChange={(event) =>
                              updateService(
                                service.id,
                                "name",
                                event.target.value
                              )
                            }
                            className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2.5 font-semibold text-white outline-none focus:border-purple-500"
                          />

                          <textarea
                            value={service.description}
                            onChange={(event) =>
                              updateService(
                                service.id,
                                "description",
                                event.target.value
                              )
                            }
                            rows={3}
                            className="w-full resize-none rounded-lg border border-white/10 bg-slate-900 px-3 py-2.5 text-sm text-slate-300 outline-none focus:border-purple-500"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => removeService(service.id)}
                          className="rounded-lg border border-white/10 p-2.5 text-slate-500 transition hover:border-red-500/30 hover:text-red-400"
                          aria-label="Remove service"
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={addService}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-purple-500/40 bg-purple-500/5 px-4 py-3 font-semibold text-purple-300 transition hover:bg-purple-500/10"
                >
                  <Plus size={18} />
                  Add service
                </button>

                <NextButton onClick={() => setActiveStep("seo")} />
              </div>
            )}

            {activeStep === "seo" && (
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-400">
                  SEO & website pages
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  Help customers find and trust your website
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Add search information and choose the professional pages
                  your website should include.
                </p>

                <div className="mt-7 space-y-5">
                  <BuilderTextField
                    label="SEO title"
                    name="seoTitle"
                    value={siteSettings.seoTitle}
                    onChange={handleSiteSettingChange}
                    placeholder={`${formData.businessName} | ${selectedBusiness.itemLabel}`}
                  />

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-300">
                      Meta description
                    </label>

                    <textarea
                      name="metaDescription"
                      value={siteSettings.metaDescription}
                      onChange={handleSiteSettingChange}
                      rows={4}
                      maxLength={180}
                      placeholder="Describe your business for search engines..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500"
                    />

                    <p className="mt-2 text-xs text-slate-500">
                      {siteSettings.metaDescription.length}/180 characters
                    </p>
                  </div>

                  <BuilderTextField
                    label="SEO keywords"
                    name="keywords"
                    value={siteSettings.keywords}
                    onChange={handleSiteSettingChange}
                    placeholder="salon in chandigarh, bridal makeup, hair styling"
                  />

                  <BuilderTextField
                    label="Contact email"
                    name="contactEmail"
                    value={siteSettings.contactEmail}
                    onChange={handleSiteSettingChange}
                    placeholder="hello@yourbusiness.com"
                  />

                  <div className="space-y-3">
                    <BuilderToggle
                      icon={Mail}
                      title="Contact form"
                      description="Allow visitors to send enquiries from your website."
                      name="contactFormEnabled"
                      checked={siteSettings.contactFormEnabled}
                      onChange={handleSiteSettingChange}
                    />

                    <BuilderToggle
                      icon={FileText}
                      title="Terms & Conditions"
                      description="Include a professional Terms page."
                      name="termsEnabled"
                      checked={siteSettings.termsEnabled}
                      onChange={handleSiteSettingChange}
                    />

                    <BuilderToggle
                      icon={FileText}
                      title="Privacy Policy"
                      description="Include a Privacy Policy page."
                      name="privacyEnabled"
                      checked={siteSettings.privacyEnabled}
                      onChange={handleSiteSettingChange}
                    />

                    <BuilderToggle
                      icon={Search}
                      title="XML sitemap"
                      description="Prepare sitemap information for search engines."
                      name="sitemapEnabled"
                      checked={siteSettings.sitemapEnabled}
                      onChange={handleSiteSettingChange}
                    />
                  </div>

                  {siteSettings.termsEnabled && (
                    <LegalPageEditor
                      title="Terms & Conditions content"
                      description="A professional version is prepared automatically. You can manually edit every line."
                      value={legalContent.terms}
                      onChange={(value) =>
                        updateLegalContent("terms", value)
                      }
                      onReset={resetTermsToProfessional}
                    />
                  )}

                  {siteSettings.privacyEnabled && (
                    <LegalPageEditor
                      title="Privacy Policy content"
                      description="A detailed professional policy is prepared automatically and remains fully editable."
                      value={legalContent.privacy}
                      onChange={(value) =>
                        updateLegalContent("privacy", value)
                      }
                      onReset={resetPrivacyToProfessional}
                    />
                  )}
                </div>

                <NextButton onClick={() => setActiveStep("blog")} />
              </div>
            )}

            {activeStep === "blog" && (
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-400">
                  Blog & content
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  Build long-term search visibility
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Publish useful articles around your services, expertise
                  and customer questions.
                </p>

                <div className="mt-7">
                  <BuilderToggle
                    icon={BookOpen}
                    title="Enable blog"
                    description="Add a blog section to this website."
                    name="enabled"
                    checked={blogSettings.enabled}
                    onChange={handleBlogSettingChange}
                  />
                </div>

                {blogSettings.enabled && (
                  <div className="mt-5 space-y-5">
                    <BuilderTextField
                      label="Blog section title"
                      name="title"
                      value={blogSettings.title}
                      onChange={handleBlogSettingChange}
                      placeholder="Latest from our blog"
                    />

                    <div className="space-y-4">
                      {blogPosts.map((post, index) => (
                        <div
                          key={post.id}
                          className="rounded-xl border border-white/10 bg-slate-950 p-4"
                        >
                          <div className="flex items-center justify-between gap-3">
                            <p className="font-bold text-white">
                              Blog post {index + 1}
                            </p>

                            <button
                              type="button"
                              onClick={() => removeBlogPost(post.id)}
                              className="rounded-lg border border-white/10 p-2 text-slate-500 transition hover:border-red-500/30 hover:text-red-400"
                              aria-label="Remove blog post"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>

                          <div className="mt-4 space-y-3">
                            <input
                              value={post.title}
                              onChange={(event) =>
                                updateBlogPost(
                                  post.id,
                                  "title",
                                  event.target.value
                                )
                              }
                              placeholder="Post title"
                              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2.5 text-white outline-none placeholder:text-slate-600 focus:border-purple-500"
                            />

                            <input
                              value={post.slug}
                              onChange={(event) =>
                                updateBlogPost(
                                  post.id,
                                  "slug",
                                  event.target.value
                                )
                              }
                              placeholder="post-url-slug"
                              className="w-full rounded-lg border border-white/10 bg-slate-900 px-3 py-2.5 text-white outline-none placeholder:text-slate-600 focus:border-purple-500"
                            />

                            <textarea
                              value={post.metaDescription}
                              onChange={(event) =>
                                updateBlogPost(
                                  post.id,
                                  "metaDescription",
                                  event.target.value
                                )
                              }
                              rows={2}
                              maxLength={180}
                              placeholder="SEO meta description"
                              className="w-full resize-none rounded-lg border border-white/10 bg-slate-900 px-3 py-2.5 text-sm text-white outline-none placeholder:text-slate-600 focus:border-purple-500"
                            />

                            <textarea
                              value={post.content}
                              onChange={(event) =>
                                updateBlogPost(
                                  post.id,
                                  "content",
                                  event.target.value
                                )
                              }
                              rows={7}
                              placeholder="Write your blog article..."
                              className="w-full resize-y rounded-lg border border-white/10 bg-slate-900 px-3 py-2.5 text-sm leading-6 text-white outline-none placeholder:text-slate-600 focus:border-purple-500"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={addBlogPost}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-dashed border-purple-500/40 bg-purple-500/5 px-4 py-3 font-semibold text-purple-300 transition hover:bg-purple-500/10"
                    >
                      <Plus size={18} />
                      Add blog post
                    </button>
                  </div>
                )}

                <NextButton onClick={() => setActiveStep("publish")} />
              </div>
            )}

            {activeStep === "publish" && (
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-400">
                  Publish website
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  Choose how you want to launch
                </h2>

                <p className="mt-3 text-sm leading-6 text-slate-400">
                  Your website can be prepared for different hosting
                  providers. You are not locked to one platform.
                </p>

                <div className="mt-7 space-y-4">
                  <PublishOption
                    title="Retivio assisted setup"
                    description="We help prepare the website and guide you through domain and hosting setup."
                    recommended
                    selected={hostingOption === "retivio"}
                    onClick={() => setHostingOption("retivio")}
                  />

                  <PublishOption
                    title="Use my own hosting"
                    description="Host the website with your preferred compatible hosting provider."
                    selected={hostingOption === "own-hosting"}
                    onClick={() => setHostingOption("own-hosting")}
                  />

                  <PublishOption
                    title="Get website files"
                    description="Prepare your website project for independent deployment."
                    selected={hostingOption === "website-files"}
                    onClick={() => setHostingOption("website-files")}
                  />
                </div>

                {currentProjectStatus === "published" &&
                  publicSlug && (
                    <div className="mt-6 rounded-xl border border-emerald-400/20 bg-emerald-400/5 p-4">
                      <p className="text-sm font-bold text-emerald-300">
                        Your website is live
                      </p>

                      <a
                        href={`/site/${publicSlug}`}
                        target="_blank"
                        rel="noreferrer"
                        className="mt-2 flex items-center gap-2 break-all text-sm text-emerald-100 hover:text-white"
                      >
                        <Link size={16} />
                        {`${window.location.origin}/site/${publicSlug}`}
                      </a>
                    </div>
                  )}

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <button
                    type="button"
                    onClick={saveWebsite}
                    disabled={
                      saving ||
                      publishing ||
                      googleSigningIn
                    }
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-950 px-5 py-3.5 font-bold text-white transition hover:border-purple-500/50 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {saving ? (
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                    ) : (
                      <Save size={18} />
                    )}

                    {saving
                      ? "Saving..."
                      : currentProjectId
                      ? "Save Changes"
                      : "Save Draft"}
                  </button>

                  <button
                    type="button"
                    onClick={publishWebsite}
                    disabled={
                      saving ||
                      publishing ||
                      googleSigningIn
                    }
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3.5 font-bold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {publishing || googleSigningIn ? (
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                    ) : (
                      <Globe2 size={18} />
                    )}

                    {googleSigningIn
                      ? "Opening Google..."
                      : publishing
                      ? "Publishing..."
                      : currentProjectStatus === "published"
                      ? "Update Live Website"
                      : user
                      ? "Publish Website"
                      : "Continue with Google"}
                  </button>
                </div>

                {!user && (
                  <p className="mt-3 text-center text-xs leading-5 text-slate-400">
                    Sign in securely with Google to save your website and
                    continue editing it later. No password required.
                  </p>
                )}

                {saveMessage && (
                  <p className="mt-3 text-center text-sm font-semibold text-emerald-400">
                    {saveMessage}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="min-w-0 rounded-3xl border border-white/10 bg-slate-900 p-4 sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-white">
                  Live website preview
                </p>
                <p className="mt-1 text-sm text-slate-400">
                  {selectedTemplate.name} website
                </p>
              </div>

              <div className="inline-flex w-fit rounded-xl border border-white/10 bg-slate-950 p-1">
                <PreviewButton
                  active={previewMode === "desktop"}
                  onClick={() => setPreviewMode("desktop")}
                  label="Desktop preview"
                >
                  <Monitor size={18} />
                </PreviewButton>

                <PreviewButton
                  active={previewMode === "mobile"}
                  onClick={() => setPreviewMode("mobile")}
                  label="Mobile preview"
                >
                  <Smartphone size={18} />
                </PreviewButton>
              </div>
            </div>

            <div className="mt-5 overflow-auto rounded-2xl bg-slate-950 p-3 sm:p-5">
              <div
                className={`mx-auto overflow-hidden rounded-xl bg-white text-slate-950 shadow-2xl transition-all duration-300 ${
                  previewMode === "mobile"
                    ? "max-w-[390px]"
                    : "w-full"
                }`}
              >
                <header className="relative border-b border-slate-100 bg-white">
                  <div
                    className={`flex items-center justify-between ${
                      previewMode === "desktop"
                        ? "px-8 py-5"
                        : "px-4 py-4"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => navigatePreview("home")}
                      className="min-w-0 truncate text-left text-lg font-extrabold"
                      style={{ color: formData.primaryColor }}
                    >
                      {formData.businessName || "Your Business"}
                    </button>

                    {previewMode === "desktop" ? (
                      <div className="flex items-center gap-4">
                        <nav className="flex gap-5 text-xs font-semibold text-slate-500">
                          <button
                            type="button"
                            onClick={() => navigatePreview("home")}
                            className="transition hover:text-slate-950"
                          >
                            Home
                          </button>

                          <button
                            type="button"
                            onClick={() => navigatePreview("about")}
                            className="transition hover:text-slate-950"
                          >
                            About
                          </button>

                          <button
                            type="button"
                            onClick={() => navigatePreview("services")}
                            className="transition hover:text-slate-950"
                          >
                            Services
                          </button>

                          {blogSettings.enabled && (
                            <button
                              type="button"
                              onClick={() => {
                                setPreviewMobileMenuOpen(false);
                                setPreviewPage("blog");
                              }}
                              className="transition hover:text-slate-950"
                            >
                              Blog
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => navigatePreview("contact")}
                            className="transition hover:text-slate-950"
                          >
                            Contact
                          </button>
                        </nav>

                        <button
                          type="button"
                          onClick={() => navigatePreview("contact")}
                          className="rounded-full px-4 py-2 text-xs font-bold text-white"
                          style={{
                            backgroundColor: formData.primaryColor,
                          }}
                        >
                          BOOK NOW
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          setPreviewMobileMenuOpen(
                            (current) => !current
                          )
                        }
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-800"
                        aria-label={
                          previewMobileMenuOpen
                            ? "Close preview navigation"
                            : "Open preview navigation"
                        }
                        aria-expanded={previewMobileMenuOpen}
                      >
                        {previewMobileMenuOpen ? (
                          <X size={20} />
                        ) : (
                          <Menu size={20} />
                        )}
                      </button>
                    )}
                  </div>

                  {previewMode === "mobile" &&
                    previewMobileMenuOpen && (
                      <nav className="absolute left-0 right-0 top-full z-40 border-t border-slate-100 bg-white p-3 shadow-xl">
                        <div className="flex flex-col gap-1">
                          <button
                            type="button"
                            onClick={() => navigatePreview("home")}
                            className="rounded-lg px-4 py-3 text-left text-sm font-bold text-slate-700 hover:bg-slate-50"
                          >
                            Home
                          </button>

                          <button
                            type="button"
                            onClick={() => navigatePreview("about")}
                            className="rounded-lg px-4 py-3 text-left text-sm font-bold text-slate-700 hover:bg-slate-50"
                          >
                            About
                          </button>

                          <button
                            type="button"
                            onClick={() => navigatePreview("services")}
                            className="rounded-lg px-4 py-3 text-left text-sm font-bold text-slate-700 hover:bg-slate-50"
                          >
                            Services
                          </button>

                          {blogSettings.enabled && (
                            <button
                              type="button"
                              onClick={() => {
                                setPreviewMobileMenuOpen(false);
                                setPreviewPage("blog");
                              }}
                              className="rounded-lg px-4 py-3 text-left text-sm font-bold text-slate-700 hover:bg-slate-50"
                            >
                              Blog
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => navigatePreview("contact")}
                            className="rounded-lg px-4 py-3 text-left text-sm font-bold text-slate-700 hover:bg-slate-50"
                          >
                            Contact
                          </button>

                          <button
                            type="button"
                            onClick={() => navigatePreview("contact")}
                            className="mt-2 rounded-xl px-4 py-3 text-sm font-bold text-white"
                            style={{
                              backgroundColor:
                                formData.primaryColor,
                            }}
                          >
                            BOOK NOW
                          </button>
                        </div>
                      </nav>
                    )}
                </header>

                {previewPage === "home" && (
                  <>
                <section
                  id="builder-preview-home"
                  className={`scroll-mt-24 text-center ${heroClass} ${
                    previewMode === "desktop"
                      ? "px-10 py-24"
                      : "px-5 py-14"
                  }`}
                >
                  {websiteMedia.hero?.url && (
                    <div className="mx-auto mb-8 max-w-5xl overflow-hidden rounded-3xl">
                      <img
                        src={websiteMedia.hero.url}
                        alt={`${formData.businessName || "Business"} hero`}
                        className={`w-full object-cover ${
                          previewMode === "desktop"
                            ? "h-[460px]"
                            : "h-64"
                        }`}
                      />
                    </div>
                  )}

                  <p
                    className="text-xs font-bold uppercase tracking-[0.28em]"
                    style={{ color: formData.primaryColor }}
                  >
                    Welcome to
                  </p>

                  <h2 className={`mx-auto mt-5 max-w-3xl font-extrabold tracking-tight ${
                    previewMode === "desktop"
                      ? "text-6xl"
                      : "text-3xl"
                  }`}>
                    {formData.businessName || "Your Business"}
                  </h2>

                  <p
                    className={`mx-auto mt-5 max-w-xl leading-7 ${mutedTextClass} ${
                    previewMode === "desktop"
                      ? "text-lg"
                      : "text-sm"
                  }`}
                  >
                    {formData.tagline ||
                      selectedBusiness.heroTagline}
                  </p>

                  <button
                    type="button"
                    onClick={() =>
                      navigatePreview(
                        formData.businessType === "fashion" ||
                          formData.businessType === "jewellery"
                          ? "services"
                          : "contact"
                      )
                    }
                    className="mt-8 rounded-full px-7 py-3.5 font-bold text-white"
                    style={{
                      backgroundColor: formData.primaryColor,
                    }}
                  >
                    {formData.businessType === "fashion"
                      ? "Explore collection"
                      : formData.businessType === "jewellery"
                      ? "Explore jewellery"
                      : formData.businessType === "cafe"
                      ? "View our menu"
                      : formData.businessType === "professional"
                      ? "Get in touch"
                      : "Book an appointment"}
                  </button>
                </section>

                <section
                  id="builder-preview-services"
                  className={`scroll-mt-24 bg-white ${
                    previewMode === "desktop"
                      ? "px-8 py-16"
                      : "px-5 py-12"
                  }`}
                >
                  <div className="text-center">
                    <p
                      className="text-xs font-bold uppercase tracking-[0.22em]"
                      style={{ color: formData.primaryColor }}
                    >
                      {selectedBusiness.expertise}
                    </p>

                    <h3 className="mt-3 text-3xl font-extrabold">
                      {selectedBusiness.sectionTitle}
                    </h3>
                  </div>

                  <div
                    className={`mt-9 grid gap-4 ${
                      previewMode === "desktop"
                        ? "grid-cols-3"
                        : "grid-cols-1"
                    }`}
                  >
                    {services.map((service, index) => (
                      <div
                        key={service.id}
                        className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                      >
                        <div
                          className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-extrabold text-white"
                          style={{
                            backgroundColor: formData.primaryColor,
                          }}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        <h4 className="mt-5 text-lg font-bold">
                          {service.name ||
                            selectedBusiness.itemSingular}
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {service.description ||
                            `Describe your ${selectedBusiness.itemSingular.toLowerCase()}.`}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section
                  id="builder-preview-about"
                  className={`scroll-mt-24 bg-slate-50 ${
                    previewMode === "desktop"
                      ? "px-10 py-20"
                      : "px-5 py-14"
                  }`}
                >
                  <div
                    className={`mx-auto max-w-5xl ${
                      previewMode === "desktop"
                        ? "grid grid-cols-2 items-center gap-12"
                        : "space-y-8"
                    }`}
                  >
                    <div>
                      <p
                        className="text-xs font-bold uppercase tracking-[0.22em]"
                        style={{ color: formData.primaryColor }}
                      >
                        About us
                      </p>

                      <h3
                        className={`mt-4 font-extrabold tracking-tight ${
                          previewMode === "desktop"
                            ? "text-4xl"
                            : "text-3xl"
                        }`}
                      >
                        {selectedBusiness.aboutTitle}
                      </h3>

                      <p className="mt-5 leading-7 text-slate-600">
                        {formData.about}
                      </p>

                      <p className="mt-4 leading-7 text-slate-600">
                        {formData.businessType === "salon"
                          ? "Every experience is designed with personal care, attention to detail and a commitment to helping you look and feel your best."
                          : formData.businessType === "fashion"
                          ? "We believe personal style should feel expressive, confident and uniquely yours. Every collection is selected with character and intention."
                          : formData.businessType === "jewellery"
                          ? "Our approach combines refined design, meaningful details and craftsmanship created to celebrate life's most memorable moments."
                          : formData.businessType === "cafe"
                          ? "From fresh flavours to a welcoming atmosphere, we create a place where good food and warm conversations naturally come together."
                          : "We combine practical thinking, professional experience and a clear understanding of client priorities to deliver dependable solutions."}
                      </p>
                    </div>

                    {websiteMedia.about?.url ? (
                      <div className="overflow-hidden rounded-3xl bg-slate-200">
                        <img
                          src={websiteMedia.about.url}
                          alt={`${formData.businessName || "Business"} about`}
                          className={`w-full object-cover ${
                            previewMode === "desktop"
                              ? "h-[430px]"
                              : "h-72"
                          }`}
                        />
                      </div>
                    ) : (
                    <div
                      className="rounded-3xl p-7 text-white"
                      style={{
                        backgroundColor: formData.primaryColor,
                      }}
                    >
                      <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
                        Our promise
                      </p>

                      <p
                        className={`mt-5 font-extrabold leading-tight ${
                          previewMode === "desktop"
                            ? "text-3xl"
                            : "text-2xl"
                        }`}
                      >
                        {formData.businessType === "salon"
                          ? "Care, confidence and beautiful experiences."
                          : formData.businessType === "fashion"
                          ? "Style that feels personal and memorable."
                          : formData.businessType === "jewellery"
                          ? "Timeless beauty made meaningful."
                          : formData.businessType === "cafe"
                          ? "Fresh flavours and moments worth sharing."
                          : "Clear thinking. Reliable service. Meaningful results."}
                      </p>

                      <p className="mt-5 text-sm leading-6 text-white/80">
                        We focus on quality, thoughtful service and experiences
                        that give people a reason to return.
                      </p>
                    </div>
                    )}
                  </div>
                </section>

                {websiteMedia.gallery.length > 0 && (
                  <section
                    className={`bg-white ${
                      previewMode === "desktop"
                        ? "px-8 py-20"
                        : "px-5 py-14"
                    }`}
                  >
                    <div className="text-center">
                      <p
                        className="text-xs font-bold uppercase tracking-[0.22em]"
                        style={{ color: formData.primaryColor }}
                      >
                        Gallery
                      </p>

                      <h3
                        className={`mt-3 font-extrabold ${
                          previewMode === "desktop"
                            ? "text-4xl"
                            : "text-3xl"
                        }`}
                      >
                        A glimpse of our world
                      </h3>
                    </div>

                    <div
                      className={`mx-auto mt-10 grid max-w-6xl gap-3 ${
                        previewMode === "desktop"
                          ? "grid-cols-3"
                          : "grid-cols-2"
                      }`}
                    >
                      {websiteMedia.gallery.map((image, index) => (
                        <div
                          key={`${image.url}-${index}`}
                          className="overflow-hidden rounded-2xl bg-slate-100"
                        >
                          <img
                            src={image.url}
                            alt={`${formData.businessName || "Business"} gallery ${index + 1}`}
                            className={`w-full object-cover ${
                              previewMode === "desktop"
                                ? "h-60"
                                : "h-40"
                            }`}
                          />
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                <section
                  className={`bg-white ${
                    previewMode === "desktop"
                      ? "px-8 py-20"
                      : "px-5 py-14"
                  }`}
                >
                  <div className="text-center">
                    <p
                      className="text-xs font-bold uppercase tracking-[0.22em]"
                      style={{ color: formData.primaryColor }}
                    >
                      Why choose us
                    </p>

                    <h3
                      className={`mt-3 font-extrabold ${
                        previewMode === "desktop"
                          ? "text-4xl"
                          : "text-3xl"
                      }`}
                    >
                      An experience built around you
                    </h3>

                    <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-600">
                      Thoughtful service, consistent quality and attention to
                      the details that matter.
                    </p>
                  </div>

                  <div
                    className={`mt-10 grid gap-4 ${
                      previewMode === "desktop"
                        ? "grid-cols-3"
                        : "grid-cols-1"
                    }`}
                  >
                    {[
                      {
                        title:
                          formData.businessType === "cafe"
                            ? "Fresh & Thoughtful"
                            : "Quality First",
                        description:
                          formData.businessType === "cafe"
                            ? "Fresh favourites prepared with care and attention."
                            : "We focus on quality in every detail of the experience.",
                      },
                      {
                        title:
                          formData.businessType === "professional"
                            ? "Clear Communication"
                            : "Personal Experience",
                        description:
                          formData.businessType === "professional"
                            ? "Straightforward communication and dependable support."
                            : "Every customer experience is approached with personal care.",
                      },
                      {
                        title:
                          formData.businessType === "fashion"
                            ? "Curated Style"
                            : formData.businessType === "jewellery"
                            ? "Meaningful Details"
                            : "Trusted Service",
                        description:
                          formData.businessType === "fashion"
                            ? "Collections selected with individuality and modern style."
                            : formData.businessType === "jewellery"
                            ? "Refined details designed to make every piece memorable."
                            : "Friendly, reliable service designed to build lasting trust.",
                      },
                    ].map((item, index) => (
                      <div
                        key={item.title}
                        className="rounded-2xl border border-slate-100 bg-slate-50 p-6"
                      >
                        <div
                          className="flex h-11 w-11 items-center justify-center rounded-full text-sm font-extrabold text-white"
                          style={{
                            backgroundColor: formData.primaryColor,
                          }}
                        >
                          {index + 1}
                        </div>

                        <h4 className="mt-5 text-lg font-bold">
                          {item.title}
                        </h4>

                        <p className="mt-3 text-sm leading-6 text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section
                  className={`bg-slate-950 text-white ${
                    previewMode === "desktop"
                      ? "px-8 py-20"
                      : "px-5 py-14"
                  }`}
                >
                  <div className="text-center">
                    <p
                      className="text-xs font-bold uppercase tracking-[0.22em]"
                      style={{ color: formData.primaryColor }}
                    >
                      What people say
                    </p>

                    <h3
                      className={`mt-3 font-extrabold ${
                        previewMode === "desktop"
                          ? "text-4xl"
                          : "text-3xl"
                      }`}
                    >
                      Experiences worth sharing
                    </h3>
                  </div>

                  <div
                    className={`mx-auto mt-10 grid max-w-5xl gap-4 ${
                      previewMode === "desktop"
                        ? "grid-cols-3"
                        : "grid-cols-1"
                    }`}
                  >
                    {[
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
                    ].map((review) => (
                      <div
                        key={review.quote}
                        className="rounded-2xl border border-white/10 bg-white/5 p-6"
                      >
                        <p
                          className="text-lg tracking-widest"
                          style={{ color: formData.primaryColor }}
                        >
                          ★★★★★
                        </p>

                        <p className="mt-5 text-sm leading-7 text-slate-300">
                          “{review.quote}”
                        </p>

                        <p className="mt-5 text-sm font-bold text-white">
                          {review.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section
                  className={`text-center text-white ${
                    previewMode === "desktop"
                      ? "px-10 py-20"
                      : "px-5 py-14"
                  }`}
                  style={{
                    backgroundColor: formData.primaryColor,
                  }}
                >
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-white/70">
                    Ready when you are
                  </p>

                  <h3
                    className={`mx-auto mt-4 max-w-3xl font-extrabold tracking-tight ${
                      previewMode === "desktop"
                        ? "text-5xl"
                        : "text-3xl"
                    }`}
                  >
                    {formData.businessType === "salon"
                      ? "Ready to feel your best?"
                      : formData.businessType === "fashion"
                      ? "Find a style that feels like you."
                      : formData.businessType === "jewellery"
                      ? "Discover jewellery made to be remembered."
                      : formData.businessType === "cafe"
                      ? "Come in, get comfortable and stay awhile."
                      : "Let's talk about what you need."}
                  </h3>

                  <p className="mx-auto mt-5 max-w-xl leading-7 text-white/80">
                    Connect with {formData.businessName || "our business"} and
                    take the next step today.
                  </p>

                  <button
                    type="button"
                    className="mt-8 rounded-full bg-white px-7 py-3.5 font-bold text-slate-950"
                  >
                    {formData.businessType === "salon"
                      ? "Book your appointment"
                      : formData.businessType === "fashion"
                      ? "Explore collection"
                      : formData.businessType === "jewellery"
                      ? "Explore collection"
                      : formData.businessType === "cafe"
                      ? "Visit us today"
                      : "Contact us"}
                  </button>
                </section>

                <section
                  id="builder-preview-contact"
                  className={`scroll-mt-24 bg-white ${
                    previewMode === "desktop"
                      ? "px-8 py-16"
                      : "px-5 py-12"
                  }`}
                >
                  <div className="text-center">
                    <p
                      className="text-xs font-bold uppercase tracking-[0.22em]"
                      style={{ color: formData.primaryColor }}
                    >
                      Contact
                    </p>

                    <h3 className="mt-3 text-3xl font-extrabold">
                      Visit or contact us
                    </h3>

                    <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
                      We would love to hear from you. Call, message or visit us.
                    </p>
                  </div>

                  <div
                    className={`mt-9 grid gap-3 ${
                      previewMode === "desktop"
                        ? "grid-cols-3"
                        : "grid-cols-1"
                    }`}
                  >
                    <ContactCard
                      icon={Phone}
                      label="Call us"
                      value={formData.phone || "Phone number"}
                      color={formData.primaryColor}
                    />

                    <ContactCard
                      icon={MessageCircle}
                      label="WhatsApp"
                      value={
                        formData.whatsapp || "WhatsApp number"
                      }
                      color={formData.primaryColor}
                    />

                    <ContactCard
                      icon={MapPin}
                      label={formData.city || "Location"}
                      value={formData.address || "Business address"}
                      color={formData.primaryColor}
                    />
                  </div>
                </section>

                {siteSettings.contactFormEnabled && (
                  <section
                    className={`border-t border-slate-100 bg-slate-50 ${
                      previewMode === "desktop"
                        ? "px-8 py-16"
                        : "px-5 py-12"
                    }`}
                  >
                    <div className="mx-auto max-w-2xl">
                      <div className="text-center">
                        <p
                          className="text-xs font-bold uppercase tracking-[0.22em]"
                          style={{ color: formData.primaryColor }}
                        >
                          Send an enquiry
                        </p>

                        <h3 className="mt-3 text-3xl font-extrabold">
                          How can we help?
                        </h3>

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
                          className="w-full rounded-xl px-5 py-3 font-bold text-white"
                          style={{
                            backgroundColor: formData.primaryColor,
                          }}
                        >
                          Send enquiry
                        </button>
                      </form>

                      {siteSettings.contactEmail && (
                        <p className="mt-4 text-center text-xs text-slate-500">
                          Contact email: {siteSettings.contactEmail}
                        </p>
                      )}
                    </div>
                  </section>
                )}
                  </>
                )}

                {previewPage === "blog" && (
                  <section
                    className={`min-h-[600px] bg-white ${
                      previewMode === "desktop"
                        ? "px-8 py-16"
                        : "px-5 py-12"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setPreviewPage("home")}
                      className="text-sm font-bold"
                      style={{ color: formData.primaryColor }}
                    >
                      ← Back to home
                    </button>

                    <div className="mt-10 text-center">
                      <p
                        className="text-xs font-bold uppercase tracking-[0.22em]"
                        style={{ color: formData.primaryColor }}
                      >
                        Blog
                      </p>

                      <h3 className="mt-3 text-4xl font-extrabold">
                        {blogSettings.title || "Latest from our blog"}
                      </h3>

                      <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-600">
                        Useful articles, business updates and helpful
                        information for our customers.
                      </p>
                    </div>

                    {blogPosts.length ? (
                      <div
                        className={`mt-10 grid gap-5 ${
                          previewMode === "desktop"
                            ? "grid-cols-3"
                            : "grid-cols-1"
                        }`}
                      >
                        {blogPosts.map((post) => (
                          <article
                            key={post.id}
                            className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                          >
                            <p
                              className="text-xs font-bold uppercase"
                              style={{
                                color: formData.primaryColor,
                              }}
                            >
                              Article
                            </p>

                            <h4 className="mt-3 text-xl font-extrabold">
                              {post.title || "Untitled article"}
                            </h4>

                            <p className="mt-4 text-sm leading-6 text-slate-600">
                              {post.metaDescription ||
                                post.content?.slice(0, 150) ||
                                "Article description will appear here."}
                            </p>

                            <p
                              className="mt-5 text-sm font-bold"
                              style={{
                                color: formData.primaryColor,
                              }}
                            >
                              Read article
                            </p>
                          </article>
                        ))}
                      </div>
                    ) : (
                      <div className="mt-10 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
                        <BookOpen
                          size={30}
                          className="mx-auto text-slate-400"
                        />

                        <p className="mt-4 font-bold text-slate-700">
                          Your blog is ready.
                        </p>

                        <p className="mt-2 text-sm text-slate-500">
                          Add blog posts in the Blog step to preview them here.
                        </p>
                      </div>
                    )}
                  </section>
                )}

                {previewPage === "terms" && (
                  <LegalPreviewPage
                    title="Terms & Conditions"
                    content={legalContent.terms}
                    color={formData.primaryColor}
                    onBack={() => setPreviewPage("home")}
                  />
                )}

                {previewPage === "privacy" && (
                  <LegalPreviewPage
                    title="Privacy Policy"
                    content={legalContent.privacy}
                    color={formData.primaryColor}
                    onBack={() => setPreviewPage("home")}
                  />
                )}

                <footer className="bg-slate-950 px-5 py-8 text-center text-white">
                  <p className="font-bold">
                    {formData.businessName || "Your Business"}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center justify-center gap-4 text-xs text-slate-400">
                    <button
                      type="button"
                      onClick={() => setPreviewPage("home")}
                      className="hover:text-white"
                    >
                      Home
                    </button>

                    {blogSettings.enabled && (
                      <button
                        type="button"
                        onClick={() => setPreviewPage("blog")}
                        className="hover:text-white"
                      >
                        Blog
                      </button>
                    )}

                    {siteSettings.privacyEnabled && (
                      <button
                        type="button"
                        onClick={() => setPreviewPage("privacy")}
                        className="hover:text-white"
                      >
                        Privacy Policy
                      </button>
                    )}

                    {siteSettings.termsEnabled && (
                      <button
                        type="button"
                        onClick={() => setPreviewPage("terms")}
                        className="hover:text-white"
                      >
                        Terms & Conditions
                      </button>
                    )}
                  </div>

                  <p className="mt-4 text-xs text-slate-500">
                    Professional business website powered by Retivio
                  </p>
                </footer>
              </div>
            </div>

            <div className="mt-5 rounded-xl border border-purple-500/20 bg-purple-500/10 p-4">
              <p className="text-sm font-semibold text-purple-200">
                Live preview active. Every change appears instantly.
              </p>
            </div>
          </div>
        </div>

        {user && (
          <section
            id="my-websites"
            className="mt-10 scroll-mt-24 rounded-3xl border border-white/10 bg-slate-900 p-5 sm:p-7"
          >
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="flex items-center gap-2 text-purple-400">
                  <FolderOpen size={19} />
                  <p className="text-sm font-bold uppercase tracking-[0.18em]">
                    My Websites
                  </p>
                </div>

                <h2 className="mt-3 text-2xl font-bold">
                  Continue your website projects
                </h2>
              </div>

              <button
                type="button"
                onClick={createNewWebsite}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-slate-950 px-5 py-3 font-semibold text-white transition hover:border-purple-500/50"
              >
                <Plus size={18} />
                New Website
              </button>
            </div>

            {loadingProjects ? (
              <div className="mt-8 flex items-center gap-3 text-slate-400">
                <Loader2 size={18} className="animate-spin" />
                Loading websites...
              </div>
            ) : projects.length === 0 ? (
              <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-slate-950 p-8 text-center">
                <p className="font-semibold text-white">
                  No saved websites yet
                </p>
                <p className="mt-2 text-sm text-slate-500">
                  Design your website and use Save Website in the Publish step.
                </p>
              </div>
            ) : (
              <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {projects.map((project) => (
                  <div
                    key={project.id}
                    className={`rounded-2xl border bg-slate-950 p-5 ${
                      currentProjectId === project.id
                        ? "border-purple-500"
                        : "border-white/10"
                    }`}
                  >
                    <div
                      className="h-2 w-14 rounded-full"
                      style={{
                        backgroundColor:
                          project.primary_color || "#7e22ce",
                      }}
                    />

                    <h3 className="mt-5 text-xl font-bold text-white">
                      {project.business_name || "Untitled Website"}
                    </h3>

                    <p className="mt-2 text-sm text-slate-400">
                      {project.template || "luxury"} template
                    </p>

                    <p className="mt-1 text-xs text-slate-600">
                      Status: {project.status || "draft"}
                    </p>

                    <div className="mt-5 flex gap-2">
                      <button
                        type="button"
                        onClick={() => openProject(project)}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-purple-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-purple-500"
                      >
                        <Pencil size={16} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => removeProject(project)}
                        className="rounded-xl border border-white/10 px-3 py-2.5 text-slate-400 transition hover:border-red-500/30 hover:text-red-400"
                        aria-label="Delete website"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  placeholder = "",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-300">
        {label}
      </label>

      <input
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500"
      />
    </div>
  );
}

function BuilderTextField({
  label,
  name,
  value,
  onChange,
  placeholder = "",
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-300">
        {label}
      </label>

      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-white outline-none transition placeholder:text-slate-600 focus:border-purple-500"
      />
    </div>
  );
}


function LegalPageEditor({
  title,
  description,
  value,
  onChange,
  onReset,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-slate-950 p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="font-bold text-white">{title}</p>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {description}
          </p>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex-shrink-0 rounded-lg border border-purple-500/30 bg-purple-500/10 px-3 py-2 text-xs font-bold text-purple-300"
        >
          Reset professional version
        </button>
      </div>

      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={18}
        className="mt-5 w-full resize-y rounded-xl border border-white/10 bg-slate-900 px-4 py-3 text-sm leading-7 text-slate-200 outline-none focus:border-purple-500"
      />

      <p className="mt-2 text-xs leading-5 text-slate-500">
        Fully editable. Review the content for your specific business and
        local requirements before publishing.
      </p>
    </div>
  );
}

function LegalPreviewPage({
  title,
  content,
  color,
  onBack,
}) {
  return (
    <section className="min-h-[650px] bg-white px-5 py-12 sm:px-8 sm:py-16">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={onBack}
          className="text-sm font-bold"
          style={{ color }}
        >
          ← Back to home
        </button>

        <h2 className="mt-8 text-4xl font-extrabold text-slate-950">
          {title}
        </h2>

        <div className="mt-8 whitespace-pre-line text-sm leading-7 text-slate-600">
          {content}
        </div>
      </div>
    </section>
  );
}

function BuilderToggle({
  icon: Icon,
  title,
  description,
  name,
  checked,
  onChange,
}) {
  return (
    <label className="flex cursor-pointer items-start justify-between gap-4 rounded-xl border border-white/10 bg-slate-950 p-4">
      <div className="flex gap-3">
        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-purple-500/10 text-purple-300">
          <Icon size={18} />
        </div>

        <div>
          <p className="font-bold text-white">{title}</p>
          <p className="mt-1 text-sm leading-5 text-slate-400">
            {description}
          </p>
        </div>
      </div>

      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="mt-2 h-5 w-5 accent-purple-600"
      />
    </label>
  );
}

function NextButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3.5 font-bold text-white transition hover:bg-purple-500"
    >
      Continue
      <ArrowRight size={18} />
    </button>
  );
}

function PreviewButton({
  active,
  onClick,
  label,
  children,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg p-2.5 transition ${
        active
          ? "bg-purple-600 text-white"
          : "text-slate-400"
      }`}
      aria-label={label}
    >
      {children}
    </button>
  );
}

function ContactCard({ icon: Icon, label, value, color }) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <Icon size={19} style={{ color }} />

      <p className="mt-3 text-xs font-bold uppercase text-slate-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}

function WebsiteImageField({
  title,
  image,
  uploading,
  onUpload,
  onRemove,
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-slate-950 p-4">
      <p className="font-bold text-white">{title}</p>

      {image?.url ? (
        <div className="mt-4">
          <img
            src={image.url}
            alt={title}
            className="h-44 w-full rounded-xl object-cover"
          />

          <button
            type="button"
            onClick={onRemove}
            className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-red-400"
          >
            <Trash2 size={16} />
            Remove image
          </button>
        </div>
      ) : (
        <label className="mt-4 inline-flex cursor-pointer items-center gap-2 rounded-xl border border-purple-500/40 bg-purple-500/10 px-4 py-3 font-semibold text-purple-300">
          {uploading ? (
            <Loader2 size={17} className="animate-spin" />
          ) : (
            <Upload size={17} />
          )}

          {uploading ? "Uploading..." : "Upload image"}

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={onUpload}
            className="hidden"
          />
        </label>
      )}
    </div>
  );
}

function PublishOption({
  title,
  description,
  recommended = false,
  selected = false,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border bg-slate-950 p-4 text-left transition ${
        selected
          ? "border-purple-500 ring-1 ring-purple-500/30"
          : "border-white/10 hover:border-purple-500/50"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-bold text-white">{title}</p>

          <p className="mt-2 text-sm leading-6 text-slate-400">
            {description}
          </p>
        </div>

        {recommended && (
          <span className="rounded-full bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-300">
            Recommended
          </span>
        )}
      </div>
    </button>
  );
}
