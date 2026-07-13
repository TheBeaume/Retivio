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

export async function getPublishedWebsiteBySlug(slug) {
  return await supabase
    .from("website_builder_projects")
    .select("*")
    .eq("public_slug", slug)
    .eq("status", "published")
    .single();
}

function loadWebsiteBuilderImage(file) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    const objectUrl = URL.createObjectURL(file);

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(image);
    };

    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      reject(new Error("Unable to process this image."));
    };

    image.src = objectUrl;
  });
}

function canvasToWebP(canvas, quality) {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Unable to compress this image."));
          return;
        }

        resolve(blob);
      },
      "image/webp",
      quality
    );
  });
}

async function compressWebsiteBuilderImage(
  file,
  category = "general"
) {
  const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
  ];

  if (!allowedTypes.includes(file.type)) {
    throw new Error(
      "Only JPG, PNG and WebP images are supported."
    );
  }

  if (file.size > 12 * 1024 * 1024) {
    throw new Error("Original image must be 12 MB or smaller.");
  }

  const image = await loadWebsiteBuilderImage(file);

  const maxDimension =
    category === "hero"
      ? 1920
      : category === "about"
      ? 1400
      : 1200;

  let width = image.naturalWidth || image.width;
  let height = image.naturalHeight || image.height;

  if (width > maxDimension || height > maxDimension) {
    const scale = Math.min(
      maxDimension / width,
      maxDimension / height
    );

    width = Math.round(width * scale);
    height = Math.round(height * scale);
  }

  let canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;

  let context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Image compression is not supported.");
  }

  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, 0, 0, width, height);

  const targetSize = 450 * 1024;
  let quality = 0.82;
  let blob = await canvasToWebP(canvas, quality);

  while (blob.size > targetSize && quality > 0.5) {
    quality -= 0.08;
    blob = await canvasToWebP(canvas, quality);
  }

  while (
    blob.size > targetSize &&
    canvas.width > 700 &&
    canvas.height > 700
  ) {
    const nextWidth = Math.round(canvas.width * 0.85);
    const nextHeight = Math.round(canvas.height * 0.85);

    const resizedCanvas = document.createElement("canvas");
    resizedCanvas.width = nextWidth;
    resizedCanvas.height = nextHeight;

    const resizedContext = resizedCanvas.getContext("2d");

    if (!resizedContext) {
      break;
    }

    resizedContext.imageSmoothingEnabled = true;
    resizedContext.imageSmoothingQuality = "high";
    resizedContext.drawImage(
      canvas,
      0,
      0,
      nextWidth,
      nextHeight
    );

    canvas = resizedCanvas;
    quality = 0.7;
    blob = await canvasToWebP(canvas, quality);
  }

  const originalName =
    file.name.replace(/\.[^/.]+$/, "") || "website-image";

  return new File(
    [blob],
    `${originalName}.webp`,
    {
      type: "image/webp",
      lastModified: Date.now(),
    }
  );
}

export async function uploadWebsiteBuilderImage(
  userId,
  file,
  category = "general"
) {
  try {
    const compressedFile =
      await compressWebsiteBuilderImage(file, category);

    const safeCategory = String(category)
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "-");

    const filePath = `${userId}/${safeCategory}/${Date.now()}-${Math.random()
      .toString(36)
      .slice(2)}.webp`;

    const { error } = await supabase.storage
      .from(WEBSITE_MEDIA_BUCKET)
      .upload(filePath, compressedFile, {
        cacheControl: "31536000",
        contentType: "image/webp",
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
        size: compressedFile.size,
        type: compressedFile.type,
      },
      error: null,
    };
  } catch (error) {
    return {
      data: null,
      error:
        error instanceof Error
          ? error
          : new Error("Unable to process image."),
    };
  }
}

export async function deleteWebsiteBuilderImage(path) {
  if (!path) {
    return { data: null, error: null };
  }

  return await supabase.storage
    .from(WEBSITE_MEDIA_BUCKET)
    .remove([path]);
}
