export type GuideVideo = {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  youtubeId: string;
  uploadDate?: string;
  category: "su-dung" | "sua-chua" | "bao-duong" | "loi-thuong-gap";
  productSlug?: string;
  projectSlug?: string;
  featured?: boolean;
};

// CÁCH THÊM VIDEO MỚI:
// 1. Copy một khối video bên dưới.
// 2. Đổi id cho không trùng.
// 3. youtubeId phải đúng ID video YouTube.
// 4. youtubeUrl phải là link YouTube gốc dạng watch: https://www.youtube.com/watch?v=VIDEO_ID.
// 5. title phải đúng theo video thật để tránh lệch title giữa thumbnail, iframe và JSON-LD.
// 6. description nên mô tả đúng nội dung video. Với VideoObject hiện tại, description được dùng đồng bộ theo title.
// 7. Nếu biết ngày đăng thật trên YouTube, thêm uploadDate dạng YYYY-MM-DD. Nếu không chắc thì bỏ trống.
// 8. Nếu video thuộc một sản phẩm cụ thể, điền productSlug. Nếu không chắc thì có thể bỏ trống.
// 9. Không map video theo index, không reorder array nếu không có lý do rõ ràng.

export const guideVideos: GuideVideo[] = [
  {
    id: "nvsOkquKtpY",
    title: "Hướng dẫn đổ bê tông vào khuôn đế dù lệch tâm 2m5x2m5 | Ô Dù Đại Phát",
    description: "Hướng dẫn đổ bê tông vào khuôn đế dù lệch tâm 2m5x2m5 | Ô Dù Đại Phát",
    youtubeUrl: "https://www.youtube.com/watch?v=nvsOkquKtpY",
    youtubeId: "nvsOkquKtpY",
    category: "su-dung",
    featured: true
  },
  {
    id: "5SDy-07HjZg",
    title: "Ô DÙ ĐẠI PHÁT hướng dẫn thay áo dù lệch tâm 2m5x2m5 đúng kỹ thuật",
    description: "Ô DÙ ĐẠI PHÁT hướng dẫn thay áo dù lệch tâm 2m5x2m5 đúng kỹ thuật",
    youtubeUrl: "https://www.youtube.com/watch?v=5SDy-07HjZg",
    youtubeId: "5SDy-07HjZg",
    category: "sua-chua",
    productSlug: "du-lech-tam-3mx3m-tay-don-bay",
    featured: true
  },
  {
    id: "9a4lgnE9evM",
    title: "Hướng Dẫn Thay Mái Dù Lệch Tâm 3x3 Khung Nhôm",
    description: "Hướng Dẫn Thay Mái Dù Lệch Tâm 3x3 Khung Nhôm",
    youtubeUrl: "https://www.youtube.com/watch?v=9a4lgnE9evM",
    youtubeId: "9a4lgnE9evM",
    category: "sua-chua",
    productSlug: "du-lech-tam-tron-3m-quay-tay",
    featured: true
  },
  {
    id: "fAky6EKJR20",
    title: "Cách thay dây dù cho Ô lệch tâm 2m5x2m5 chỉnh nghiêng bị đứt | Ô dù Đại Phát",
    description: "Cách thay dây dù cho Ô lệch tâm 2m5x2m5 chỉnh nghiêng bị đứt | Ô dù Đại Phát",
    youtubeUrl: "https://www.youtube.com/watch?v=fAky6EKJR20",
    youtubeId: "fAky6EKJR20",
    category: "sua-chua",
    featured: true
  },
  {
    id: "GZh28wgKbVs",
    title: "Ô Dù Đại Phát Hướng Dẫn Thay Dây Dù Lệch Tâm 3m x 3m Khung Hợp Kim Nhôm Cao Cấp",
    description: "Ô Dù Đại Phát Hướng Dẫn Thay Dây Dù Lệch Tâm 3m x 3m Khung Hợp Kim Nhôm Cao Cấp",
    youtubeUrl: "https://www.youtube.com/watch?v=GZh28wgKbVs",
    youtubeId: "GZh28wgKbVs",
    category: "sua-chua",
    featured: true
  }
];
