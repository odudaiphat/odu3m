import type { Metadata } from "next";
import { BaseSchemas, BreadcrumbJsonLd, JsonLd } from "@/components/schema";
import { SiteShell } from "@/components/site-shell";
import { Breadcrumbs, Button, Container, SectionTitle } from "@/components/ui";
import { YoutubeGallery } from "@/components/youtube-gallery";
import { guideVideos } from "@/lib/video-data";
import { getYoutubeEmbedUrl, getYoutubeId, getYoutubeThumbnail, getYoutubeWatchUrl } from "@/lib/youtube";
import { siteData } from "@/lib/site-data";
import { getZaloWebUrl } from "@/lib/zalo";

export const metadata: Metadata = {
  title: "Video hướng dẫn sử dụng & sửa chữa ô dù ngoài trời | Ô Dù Đại Phát",
  description:
    "Xem video hướng dẫn sử dụng, bảo dưỡng và xử lý lỗi thường gặp cho ô dù ngoài trời, dù lệch tâm, dù quán cafe.",
  alternates: {
    canonical: "/huong-dan"
  },
  openGraph: {
    title: "Video hướng dẫn sử dụng & sửa chữa ô dù ngoài trời",
    description:
      "Tổng hợp video hướng dẫn thao tác, bảo dưỡng và xử lý lỗi thường gặp cho ô dù ngoài trời, dù lệch tâm.",
    url: `${siteData.domain}/huong-dan`,
    type: "website",
    images: [
      {
        url: siteData.socialImage,
        width: 1200,
        height: 630,
        alt: "Video hướng dẫn sử dụng ô dù ngoài trời Ô Dù Đại Phát"
      }
    ]
  }
};

type VideoObjectSchema = {
  "@context": "https://schema.org";
  "@type": "VideoObject";
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate?: string;
  embedUrl: string;
  contentUrl: string;
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
};

function getVideoSchemas(): VideoObjectSchema[] {
  return guideVideos.flatMap((video) => {
    const youtubeId = getYoutubeId(video.youtubeUrl, video.youtubeId);
    if (!youtubeId) return [];

    const schema: VideoObjectSchema = {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: video.title,
      description: video.title,
      thumbnailUrl: getYoutubeThumbnail(video.youtubeUrl, video.youtubeId),
      embedUrl: getYoutubeEmbedUrl(video.youtubeUrl, video.youtubeId),
      contentUrl: getYoutubeWatchUrl(video.youtubeUrl, video.youtubeId),
      publisher: {
        "@type": "Organization",
        name: siteData.brandName,
        logo: {
          "@type": "ImageObject",
          url: `${siteData.domain}/favicon.svg`
        }
      }
    };

    if (video.uploadDate) {
      schema.uploadDate = video.uploadDate;
    }

    return [schema];
  });
}

export default function GuideVideoPage() {
  const videoSchemas = getVideoSchemas();

  return (
    <SiteShell>
      <BaseSchemas />
      <BreadcrumbJsonLd
        items={[
          { name: "Trang chủ", url: "/" },
          { name: "Hướng dẫn sử dụng", url: "/huong-dan" }
        ]}
      />
      {videoSchemas.length > 0 ? <JsonLd data={videoSchemas} /> : null}

      <section className="page-hero">
        <Container>
          <Breadcrumbs
            items={[
              { label: "Trang chủ", href: "/" },
              { label: "Hướng dẫn sử dụng" }
            ]}
          />
          <SectionTitle
            eyebrow="Video hướng dẫn"
            title="Video hướng dẫn sử dụng & sửa chữa ô dù ngoài trời"
            subtitle="Tổng hợp video hướng dẫn thao tác, bảo dưỡng và xử lý lỗi thường gặp cho ô dù ngoài trời, dù lệch tâm. Xem trước để sử dụng đúng cách và chọn mẫu phù hợp hơn."
            align="left"
            as="h1"
          />
          <div className="page-actions">
            <Button href={getZaloWebUrl(siteData.phone)} external variant="primary">
              Gửi ảnh qua Zalo
            </Button>
            <Button href="/bao-gia">Nhận báo giá</Button>
          </div>
        </Container>
      </section>

      <YoutubeGallery
        videos={guideVideos}
        title="Xem video hướng dẫn ngay trên website"
        subtitle="Bấm vào thumbnail để phát video trực tiếp trên trang, không chuyển sang YouTube."
      />

      <section className="section section-soft">
        <Container>
          <div className="mini-cta-box">
            <strong>Cần hỗ trợ thêm?</strong>
            <p>
              Gửi ảnh hoặc video hiện trạng qua Zalo để Ô Dù Đại Phát tư vấn nhanh mẫu dù, cách dùng hoặc phương án xử lý phù hợp.
            </p>
            <Button href={getZaloWebUrl(siteData.phone)} external variant="primary">
              Nhắn Zalo {siteData.phoneDisplay}
            </Button>
          </div>
        </Container>
      </section>
    </SiteShell>
  );
}
