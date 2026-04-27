import { guideVideos } from "@/lib/video-data";

export type ParsedYoutubeRssVideo = {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  youtubeId: string;
  uploadDate?: string;
};

export type ProductYoutubeVideo = ParsedYoutubeRssVideo;

const YOUTUBE_RSS =
  "https://www.youtube.com/feeds/videos.xml?channel_id=UCJQQMfeG9xoCoYHqMD8e4JQ";

export function getYoutubeId(url: string) {
  const match = url.match(/v=([^&]+)/);
  return match ? match[1] : "";
}

export function getYoutubeThumbnail(url: string) {
  const id = getYoutubeId(url);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : "";
}

export function getYoutubeEmbedUrl(url: string) {
  const id = getYoutubeId(url);
  return id ? `https://www.youtube.com/embed/${id}` : "";
}

function getXmlTagValue(xml: string, tag: string) {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i"));
  return match ? match[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim() : "";
}

function getXmlAttr(xml: string, tag: string, attr: string) {
  const match = xml.match(
    new RegExp(`<${tag}[^>]*${attr}="([^"]+)"`, "i")
  );
  return match ? match[1] : "";
}

function getEntries(xml: string) {
  return xml.match(/<entry[\s\S]*?<\/entry>/g) || [];
}

function parseYoutubeRss(xml: string): ParsedYoutubeRssVideo[] {
  const videos: ParsedYoutubeRssVideo[] = [];

  for (const entry of getEntries(xml)) {
    const youtubeId = getXmlTagValue(entry, "yt:videoId");
    const title = getXmlTagValue(entry, "title");
    const published = getXmlTagValue(entry, "published");
    const description =
      getXmlTagValue(entry, "media:description") || title;
    const link = getXmlAttr(entry, "link", "href");

    if (!youtubeId || !title) continue;

    videos.push({
      id: youtubeId,
      title,
      description,
      youtubeUrl: link || `https://www.youtube.com/watch?v=${youtubeId}`,
      youtubeId,
      uploadDate: published || undefined
    });
  }

  return videos;
}

export async function getChannelVideos(): Promise<ProductYoutubeVideo[]> {
  try {
    const res = await fetch(YOUTUBE_RSS, {
      next: { revalidate: 3600 }
    });

    if (!res.ok) return [];

    const xml = await res.text();
    return parseYoutubeRss(xml);
  } catch {
    return [];
  }
}

export async function getProductVideos(product: any, limit = 3) {
  const videos = await getChannelVideos();

  if (!videos.length) {
    return guideVideos.slice(0, limit);
  }

  return videos.slice(0, limit);
}
