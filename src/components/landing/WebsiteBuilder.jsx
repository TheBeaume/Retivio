import React, { useEffect, useState } from "react";
import {
  getCurrentWebsiteBuilderUser,
  signInWebsiteBuilderWithGoogle,
  getWebsiteBuilderProjects,
  createWebsiteBuilderProject,
  updateWebsiteBuilderProject,
  deleteWebsiteBuilderProject,
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
} from "lucide-react";

const templates = [
  {
    id: "luxury",
    name: "Luxury",
    description: "Dark, elegant and premium",
  },
  {
    id: "modern",
    name: "Modern",
    description: "Clean and conversion focused",
  },
  {
    id: "minimal",
    name: "Minimal",
    description: "Calm, soft and professional",
  },
];

const builderSteps = [
  { id: "business", label: "Business", icon: Building2 },
  { id: "brand", label: "Brand", icon: Palette },
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

  const [formData, setFormData] = useState({
    businessName: "Your Salon",
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

          if (draft?.hostingOption) {
            setHostingOption(draft.hostingOption);
          }

          setCurrentProjectId(null);
          setActiveStep("business");
          setSaveMessage(
            "Your website draft has been restored. Save it to your Retivio account when ready."
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

  const getProjectPayload = (userId) => ({
    user_id: userId,
    business_name: formData.businessName.trim() || "Your Salon",
    tagline: formData.tagline.trim() || null,
    about: formData.about.trim() || null,
    phone: formData.phone.trim() || null,
    whatsapp: formData.whatsapp.trim() || null,
    city: formData.city.trim() || null,
    address: formData.address.trim() || null,
    primary_color: formData.primaryColor,
    template: formData.template,
    services,
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
      businessName: project.business_name || "Your Salon",
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
      businessName: "Your Salon",
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
        name: "New Service",
        description: "Describe your service here.",
      },
    ]);
  };

  const removeService = (id) => {
    setServices((current) =>
      current.filter((service) => service.id !== id)
    );
  };

  const selectedTemplate =
    templates.find(
      (template) => template.id === formData.template
    ) || templates[0];

  const isLuxury = formData.template === "luxury";
  const isMinimal = formData.template === "minimal";

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
            Build a website your salon can be proud of.
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-400">
            Add your business details, choose your style and preview a
            professional salon website instantly.
          </p>
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
                  Tell us about your salon
                </h2>

                <div className="mt-7 space-y-5">
                  <Field
                    label="Business name"
                    name="businessName"
                    value={formData.businessName}
                    onChange={handleChange}
                    placeholder="Your salon name"
                  />

                  <Field
                    label="Tagline"
                    name="tagline"
                    value={formData.tagline}
                    onChange={handleChange}
                    placeholder="Your business tagline"
                  />

                  <div>
                    <label className="mb-2 block text-sm font-semibold text-slate-300">
                      About your salon
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
                  {templates.map((template) => (
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

                <NextButton onClick={() => setActiveStep("services")} />
              </div>
            )}

            {activeStep === "services" && (
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-purple-400">
                  Salon services
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  Add your key services
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
                <header className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-8">
                  <p
                    className="text-lg font-extrabold"
                    style={{ color: formData.primaryColor }}
                  >
                    {formData.businessName || "Your Salon"}
                  </p>

                  <div className="flex items-center gap-4">
                    {previewMode === "desktop" && (
                      <div className="hidden gap-5 text-xs font-semibold text-slate-500 md:flex">
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
                  className={`px-6 py-20 text-center sm:px-10 sm:py-24 ${heroClass}`}
                >
                  <p
                    className="text-xs font-bold uppercase tracking-[0.28em]"
                    style={{ color: formData.primaryColor }}
                  >
                    Welcome to
                  </p>

                  <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-6xl">
                    {formData.businessName || "Your Salon"}
                  </h2>

                  <p
                    className={`mx-auto mt-5 max-w-xl text-base leading-7 sm:text-lg ${mutedTextClass}`}
                  >
                    {formData.tagline ||
                      "Beauty, care and confidence"}
                  </p>

                  <button
                    type="button"
                    className="mt-8 rounded-full px-7 py-3.5 font-bold text-white"
                    style={{
                      backgroundColor: formData.primaryColor,
                    }}
                  >
                    Book an appointment
                  </button>
                </section>

                <section className="bg-white px-5 py-14 sm:px-8 sm:py-16">
                  <div className="text-center">
                    <p
                      className="text-xs font-bold uppercase tracking-[0.22em]"
                      style={{ color: formData.primaryColor }}
                    >
                      Our expertise
                    </p>

                    <h3 className="mt-3 text-3xl font-extrabold">
                      Services designed around you
                    </h3>
                  </div>

                  <div
                    className={`mt-9 grid gap-4 ${
                      previewMode === "desktop"
                        ? "sm:grid-cols-3"
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
                          {service.name || "Salon Service"}
                        </h4>

                        <p className="mt-2 text-sm leading-6 text-slate-600">
                          {service.description ||
                            "Describe your salon service."}
                        </p>
                      </div>
                    ))}
                  </div>
                </section>

                <section className="bg-slate-50 px-5 py-14 text-center sm:px-8 sm:py-16">
                  <p
                    className="text-xs font-bold uppercase tracking-[0.22em]"
                    style={{ color: formData.primaryColor }}
                  >
                    About us
                  </p>

                  <h3 className="mt-3 text-3xl font-extrabold">
                    Beauty with care and expertise
                  </h3>

                  <p className="mx-auto mt-5 max-w-2xl leading-7 text-slate-600">
                    {formData.about}
                  </p>
                </section>

                <section className="bg-white px-5 py-14 sm:px-8">
                  <div className="text-center">
                    <h3 className="text-3xl font-extrabold">
                      Visit or contact us
                    </h3>
                  </div>

                  <div
                    className={`mt-8 grid gap-3 ${
                      previewMode === "desktop"
                        ? "sm:grid-cols-3"
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
                      value={formData.address || "Salon address"}
                      color={formData.primaryColor}
                    />
                  </div>
                </section>

                <footer className="bg-slate-950 px-5 py-8 text-center text-white">
                  <p className="font-bold">
                    {formData.businessName || "Your Salon"}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    Professional salon website powered by Retivio
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
          <section className="mt-10 rounded-3xl border border-white/10 bg-slate-900 p-5 sm:p-7">
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
