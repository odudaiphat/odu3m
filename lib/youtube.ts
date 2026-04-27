export function getYoutubeId(youtubeUrl: string, youtubeId?: string) {
  if (youtubeId?.trim()) return youtubeId.trim();

  try {
    const url = new URL(youtubeUrl);
    const hostname = url.hostname.replace(/^www\./, "");

    if (hostname === "youtu.be") {
      return url.pathname.split("/").filter(Boolean)[0] ?? "";
    }

    if (hostname === "youtube.com" || hostname === "m.youtube.com") {
      if (url.pathname.startsWith("/watch")) {
        return url.searchParams.get("v") ?? "";
      }

      if (url.pathname.startsWith("/shorts/")) {
        return url.pathname.split("/").filter(Boolean)[1] ?? "";
      }

      if (url.pathname.startsWith("/embed/")) {
        return url.pathname.split("/").filter(Boolean)[1] ?? "";
      }
    }
  } catch {
    return "";
  }

  return "";
}

export function getYoutubeThumbnail(youtubeUrl: string, youtubeId?: string) {
  const id = getYoutubeId(youtubeUrl, youtubeId);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

export function getYoutubeEmbedUrl(youtubeUrl: string, youtubeId?: string, autoplay = false) {
  const id = getYoutubeId(youtubeUrl, youtubeId);
  if (!id) return "";

  return `https://www.youtube.com/embed/${id}${autoplay ? "?autoplay=1&rel=0" : "?rel=0"}`;
}

export function getYoutubeWatchUrl(youtubeUrl: string, youtubeId?: string) {
  const id = getYoutubeId(youtubeUrl, youtubeId);
  return id ? `https://www.youtube.com/watch?v=${id}` : youtubeUrl;
}
