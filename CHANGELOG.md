# Changelog

## Step 2 - Dark Mode, Filter và checkpoint recovery

### Thêm mới
- Thêm nút chuyển đổi giao diện giữa chế độ sáng và tối.
- Hiển thị biểu tượng và văn bản trên nút chuyển đổi theme:
  - sáng: `🌙 Deep Mode`
  - tối: `☀️ Light Mode`
- Hỗ trợ theo dõi thiết lập người dùng bằng `localStorage` để giữ nguyên lựa chọn sau khi reload trang.
- Nếu chưa có lựa chọn thủ công, ứng dụng sẽ tự động áp dụng theo `prefers-color-scheme` của hệ điều hành.
- Thêm bộ lọc cho danh sách công việc:
  - Tất cả
  - Chưa hoàn thành
  - Đã hoàn thành
- Khi không có mục nào phù hợp với bộ lọc hiện tại, hiển thị thông báo rỗng tương ứng.

### Cập nhật
- Giữ nguyên cơ chế CSS variables để quản lý màu sắc theo theme mà không cần hardcode màu ở nhiều nơi.
- `未完成:N 項` luôn hiển thị tổng số công việc chưa hoàn thành trên toàn bộ danh sách, không bị ảnh hưởng bởi bộ lọc hiện tại.
- Thêm xử lý hiển thị trạng thái active cho nút filter đang được chọn.

### Khôi phục checkpoint
- Thực hành khôi phục trạng thái checkpoint bằng cách thực hiện commit trống để lưu mốc thời gian của bước 2 trên GitHub.
- Xác nhận quy trình commit và push để đồng bộ mã nguồn lên repository.

### Ghi chú
- Phần này được ghi lại để theo dõi tiến độ của Step 2 và làm căn cứ cho các bước sau.
