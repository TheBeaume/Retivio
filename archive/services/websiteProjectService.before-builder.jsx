import { supabase } from "../lib/supabase";

export async function createWebsiteProject(data) {
  return await supabase
    .from("website_projects")
    .insert([data]);
}
