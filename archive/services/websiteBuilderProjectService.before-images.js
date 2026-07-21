import { supabase } from "../lib/supabase";

export async function signInWebsiteBuilderWithGoogle() {
  return await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${window.location.origin}/website-builder`,
    },
  });
}

export async function getCurrentWebsiteBuilderUser() {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  return { user, error };
}

export async function signOutWebsiteBuilder() {
  return await supabase.auth.signOut();
}

export async function getWebsiteBuilderProjects(userId) {
  return await supabase
    .from("website_builder_projects")
    .select("*")
    .eq("user_id", userId)
    .order("updated_at", { ascending: false });
}

export async function createWebsiteBuilderProject(project) {
  return await supabase
    .from("website_builder_projects")
    .insert(project)
    .select()
    .single();
}

export async function updateWebsiteBuilderProject(id, userId, project) {
  return await supabase
    .from("website_builder_projects")
    .update({
      ...project,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .eq("user_id", userId)
    .select()
    .single();
}

export async function deleteWebsiteBuilderProject(id, userId) {
  return await supabase
    .from("website_builder_projects")
    .delete()
    .eq("id", id)
    .eq("user_id", userId);
}
