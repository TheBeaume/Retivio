import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function useBusinessSettings() {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    async function loadSettings() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      const { data } = await supabase
        .from("business_settings")
        .select("*")
        .eq("user_id", user.id)
        .single();

      setSettings(data || {});
    }

    loadSettings();
  }, []);

  return settings;
}
