# Ô Dù Đại Phát production repair notes

Bản này được sửa từ archive `o-du-dai-phat-final-merged-best-repaired.tar`.

Các điểm đã chỉnh:
- Chuẩn hóa event tracking chính: `call_click`, `zalo_click`, `quote_cta_click`, `quote_submit`.
- Bọc tracking GA/GTM bằng guard an toàn để không crash khi chưa cấu hình GA/GTM.
- Sửa helper Zalo: mobile ưu tiên `zalo://conversation?phone=0349596898`, desktop/fallback dùng `https://zalo.me/0349596898`.
- Form báo giá không phụ thuộc bắt buộc vào email API/Formspree/Resend: submit sẽ copy nội dung, mở Zalo, vẫn gửi API nền nếu cấu hình.
- Form vẫn hiển thị nội dung để khách copy thủ công, có nút mở Zalo và nút gọi ngay.
- Sticky mobile giữ 3 nút: Gọi ngay / Zalo / Báo giá, có tracking và tự ẩn gần form.
- Thêm `next-env.d.ts` để source Next.js có type reference đầy đủ.
- Kiểm tra ảnh local `/images/...`: không phát hiện reference ảnh local bị thiếu.

Lưu ý deploy:
- Archive gốc không có lockfile. Nên tạo lockfile bằng `pnpm install` hoặc `npm install` trong môi trường deploy có mạng ổn định.
- Nếu muốn nhận lead qua email/API, cấu hình `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL` hoặc `FORMSPREE_ENDPOINT`.
- GA/GTM là tùy chọn: `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_GTM_ID`.
