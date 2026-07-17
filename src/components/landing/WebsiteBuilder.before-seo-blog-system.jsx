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

const builderSteps = [
  { id: "business", label: "Business", icon: Building2 },
  { id: "brand", label: "Brand", icon: Palette },
  { id: "images", label: "Images", icon: ImageIcon },
  { id: "services", label: "Services", icon: Scissors },
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
  const [googleSigningIn, setGoogleSigningIn] = useState(false);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const [saveMessage, setSaveMessage] = useState("");
  const [uploadingImage, setUploadingImage] = useState("");

  const [websiteMedia, setWebsiteMedia] = useState({
    hero: null,
    about: null,
    gallery: [],
  });

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

  const scrollToMyWebsites = () => {
    document
      .getElementById("my-websites")
      ?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
  };

  const getProjectPayload = (userId) => ({
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
    website_media: websiteMedia,
    hosting_option: hostingOption,
    status: "draft",
  });

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

  const openProject = (project) => {
    setCurrentProjectId(project.id);

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

                <div className="mt-6 rounded-xl border border-amber-400/20 bg-amber-400/5 p-4">
                  <p className="text-sm leading-6 text-amber-100">
                    Publishing workflow is being prepared. Save your website
                    now and continue editing it from My Websites.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={saveWebsite}
                  disabled={saving || googleSigningIn}
                  className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-purple-600 px-5 py-3.5 font-bold text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving || googleSigningIn ? (
                    <Loader2 size={18} className="animate-spin" />
                  ) : (
                    <Save size={18} />
                  )}

                  {googleSigningIn
                    ? "Opening Google..."
                    : saving
                    ? "Saving website..."
                    : currentProjectId
                    ? "Save Changes"
                    : user
                    ? "Save Website"
                    : "Continue with Google"}
                </button>

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
                <header
                  className={`flex items-center justify-between border-b border-slate-100 bg-white ${
                    previewMode === "desktop"
                      ? "px-8 py-5"
                      : "px-4 py-4"
                  }`}
                >
                  <p
                    className="text-lg font-extrabold"
                    style={{ color: formData.primaryColor }}
                  >
                    {formData.businessName || "Your Business"}
                  </p>

                  <div className="flex items-center gap-4">
                    {previewMode === "desktop" && (
                      <div className="flex gap-5 text-xs font-semibold text-slate-500">
                        <span>Services</span>
                        <span>About</span>
                        <span>Contact</span>
                      </div>
                    )}

                    <span
                      className="rounded-full px-4 py-2 text-xs font-bold text-white"
                      style={{
                        backgroundColor: formData.primaryColor,
                      }}
                    >
                      BOOK NOW
                    </span>
                  </div>
                </header>

                <section
                  className={`text-center ${heroClass} ${
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
                  className={`bg-white ${
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
                  className={`bg-slate-50 ${
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
                  className={`bg-white ${
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

                <footer className="bg-slate-950 px-5 py-8 text-center text-white">
                  <p className="font-bold">
                    {formData.businessName || "Your Business"}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
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
