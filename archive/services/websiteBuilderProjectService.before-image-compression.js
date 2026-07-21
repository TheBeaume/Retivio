import { supabase } from "../lib/supabase";

const WEBSITE_MEDIA_BUCKET = "website-builder-media";

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

export async function updateWebsiteBuilderProject(
  id,
  userId,
  project
) {
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

export async function uploadWebsiteBuilderImage(
  userId,
  file,
  category = "general"
) {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.type)) {
    return {
      data: null,
      error: new Error(
        "Only JPG, PNG and WebP images are supported."
      ),
    };
  }

  if (file.size > 5 * 1024 * 1024) {
    return {
      data: null,
      error: new Error("Image must be 5 MB or smaller."),
    };
  }

  const extension =
    file.name.split(".").pop()?.toLowerCase() || "jpg";

  const safeCategory = String(category)
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "-");

  const filePath = `${userId}/${safeCategory}/${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}.${extension}`;

  const { error } = await supabase.storage
    .from(WEBSITE_MEDIA_BUCKET)
    .upload(filePath, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    return { data: null, error };
  }

  const { data } = supabase.storage
    .from(WEBSITE_MEDIA_BUCKET)
    .getPublicUrl(filePath);

  return {
    data: {
      url: data.publicUrl,
      path: filePath,
    },
    error: null,
  };
}

export async function deleteWebsiteBuilderImage(path) {
  if (!path) {
    return { data: null, error: null };
  }

  return await supabase.storage
    .from(WEBSITE_MEDIA_BUCKET)
    .remove([path]);
}
