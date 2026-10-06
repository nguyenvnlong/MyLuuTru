# 📝 MyLuuTru — Offline-First Todo

[![HTML5](https://img.shields.io/badge/HTML5-markup-orange?logo=html5&logoColor=white)](https://developer.mozilla.org/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-styles-blue?logo=css3&logoColor=white)](https://developer.mozilla.org/docs/Web/CSS)
[![Vanilla JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-yellow?logo=javascript&logoColor=black)](https://developer.mozilla.org/docs/Web/JavaScript)
[![No dependencies](https://img.shields.io/badge/dependencies-none-brightgreen)](#-ch%E1%BA%A1y-d%E1%BB%B1-%C3%A1n-%E1%BB%9F-local)

[![🚀 Live Demo](https://img.shields.io/badge/🚀-Live%20Demo-2563eb?style=for-the-badge)](https://www.google.com/search?q=https%3A%2F%2F%3Cthay-link-github-pages-cua-ban-vao-day%3E)

> **Lưu ý:** Hãy thay liên kết Live Demo ở trên bằng URL GitHub Pages sau khi triển khai dự án.

## ✨ Giới thiệu

**MyLuuTru** là ứng dụng quản lý công việc theo hướng **Offline-First**, giúp bạn ghi lại và theo dõi các việc cần làm ngay trên trình duyệt. Dữ liệu được lưu cục bộ bằng LocalStorage, nên có thể sử dụng mà không cần backend.

Ứng dụng hiện hỗ trợ giao diện sáng/tối, lọc công việc, mức độ ưu tiên và thời hạn. **Tìm kiếm thời gian thực là tính năng dự kiến, chưa được triển khai trong phiên bản hiện tại.**

## 🧰 Kỹ năng & công nghệ

| Công nghệ / kỹ năng | Ứng dụng |
| --- | --- |
| **HTML5** | Cấu trúc biểu mẫu và danh sách công việc |
| **CSS3** | Giao diện responsive, chủ đề sáng/tối và nhãn ưu tiên |
| **Vanilla JavaScript (ES6+)** | Xử lý tương tác và cập nhật giao diện |
| **LocalStorage API** | Lưu công việc và tùy chọn giao diện trên trình duyệt |
| **GitHub Copilot Agent Mode** | Hỗ trợ quy trình phát triển và chỉnh sửa mã |
| **Model Context Protocol (MCP)** | Kết nối công cụ trong quy trình làm việc với AI |

## ✅ Tính năng chính

- ➕ Thêm và xóa công việc.
- ☑️ Đánh dấu công việc đã hoàn thành hoặc chưa hoàn thành.
- 🎚️ Lọc danh sách theo tất cả, chưa hoàn thành hoặc đã hoàn thành.
- 🚦 Chọn mức độ ưu tiên **Cao**, **Trung bình** hoặc **Thấp**, với nhãn màu trực quan.
- 📅 Đặt **thời hạn (Due Date)** cho từng công việc.
- 💾 Tự động lưu danh sách bằng LocalStorage để giữ dữ liệu khi tải lại trang.
- 🌗 Chuyển đổi giao diện sáng/tối và ghi nhớ lựa chọn.
- 📱 Bố cục responsive cho màn hình nhỏ.
- 🔎 **Tìm kiếm thời gian thực — dự kiến bổ sung; hiện chưa có trong ứng dụng.**

## 🏁 Chạy dự án ở local

Không cần cài đặt thư viện hoặc công cụ build.

1. Tải xuống hoặc clone repository:

   ```bash
   git clone https://github.com/nguyenvnlong/MyLuuTru.git
   ```

2. Mở thư mục `MyLuuTru`.
3. Mở `index.html` trực tiếp trong trình duyệt.

Bạn cũng có thể chạy một máy chủ tĩnh local từ thư mục dự án:

```bash
py -m http.server 8000
```

Sau đó truy cập [http://localhost:8000](http://localhost:8000).

## 🗂️ Cấu trúc thư mục

```text
MyLuuTru/
├── index.html   # Cấu trúc trang và biểu mẫu
├── styles.css   # Giao diện, chủ đề và responsive
├── app.js       # Tương tác, lưu trữ và hiển thị công việc
└── README.md    # Tài liệu dự án
```
