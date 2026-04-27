"use client";

import { getZaloWebUrl } from "@/lib/zalo";
import { siteData } from "@/lib/site-data";
import { trackConversionEvent } from "@/lib/analytics";

type Props = {
  productSlug: string;
  productName: string;
};

export function VideoConversionCTA({ productSlug, productName }: Props) {
  function track(ctaType: "call" | "zalo" | "quote") {
    trackConversionEvent({
      event: "video_conversion_click",
      productSlug,
      productName,
      ctaType,
      source: "video_conversion"
    });
  }

  return (
    <div className="video-conversion-actions">
      <a
        href={`tel:${siteData.phone}`}
        className="button button-primary"
        onClick={() => track("call")}
      >
        Gọi ngay
      </a>

      <a
        href={getZaloWebUrl(siteData.phone)}
        target="_blank"
        rel="noreferrer"
        className="button button-secondary"
        onClick={() => track("zalo")}
      >
        Nhắn Zalo
      </a>

      <a
        href="/bao-gia"
        className="button"
        onClick={() => track("quote")}
      >
        Nhận báo giá
      </a>
    </div>
  );
}
