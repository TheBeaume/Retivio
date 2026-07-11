import React from "react";
import { Save } from "lucide-react";

const defaultSettings = {
  companyName: "Pravi Technology",
  senderName: "",
  website: "",
  signature: "Regards,\nPravi Technology",
};

function PraviSettings() {
  const [settings, setSettings] = React.useState(defaultSettings);

  React.useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("pravi_settings") || "null"
      );

      if (saved) {
        setSettings({ ...defaultSettings, ...saved });
      }
    } catch {
      setSettings(defaultSettings);
    }
  }, []);

  const updateField = (field, value) => {
    setSettings((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const saveSettings = () => {
    localStorage.setItem(
      "pravi_settings",
      JSON.stringify(settings)
    );

    window.dispatchEvent(new Event("pravi-settings-updated"));
    alert("Settings saved.");
  };

  const fieldClass =
    "w-full bg-gray-950 border border-white/10 text-white placeholder:text-gray-500 rounded-xl px-4 py-3 outline-none focus:border-purple-500 transition";

  return (
    <div>
      <p className="text-sm text-purple-400">
        PRAVI SETTINGS
      </p>

      <h2 className="text-3xl md:text-4xl font-bold mt-2">
        Settings
      </h2>

      <p className="text-gray-400 mt-2">
        Manage your business and outreach identity.
      </p>

      <div className="bg-gray-900 border border-white/10 rounded-2xl p-5 md:p-6 mt-8 max-w-3xl">
        <h3 className="text-xl font-bold">
          Business Identity
        </h3>

        <div className="grid md:grid-cols-2 gap-4 mt-5">
          <div>
            <label className="text-sm text-gray-400">
              Company Name
            </label>

            <input
              value={settings.companyName}
              onChange={(e) =>
                updateField("companyName", e.target.value)
              }
              className={`${fieldClass} mt-2`}
            />
          </div>

          <div>
            <label className="text-sm text-gray-400">
              Sender Name
            </label>

            <input
              value={settings.senderName}
              onChange={(e) =>
                updateField("senderName", e.target.value)
              }
              placeholder="Your name"
              className={`${fieldClass} mt-2`}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-400">
              Website
            </label>

            <input
              value={settings.website}
              onChange={(e) =>
                updateField("website", e.target.value)
              }
              placeholder="Website URL"
              className={`${fieldClass} mt-2`}
            />
          </div>

          <div className="md:col-span-2">
            <label className="text-sm text-gray-400">
              Default Signature
            </label>

            <textarea
              value={settings.signature}
              onChange={(e) =>
                updateField("signature", e.target.value)
              }
              className={`${fieldClass} mt-2 h-32 resize-none`}
            />
          </div>
        </div>

        <button
          onClick={saveSettings}
          className="mt-5 bg-purple-600 hover:bg-purple-500 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2"
        >
          <Save size={18} />
          Save Settings
        </button>
      </div>
    </div>
  );
}

export default PraviSettings;
