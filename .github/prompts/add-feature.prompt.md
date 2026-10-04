---
agent: agent
description: 'Dựa trên GitHub Issue để tự động phát triển tính năng mới và mở Pull Request'
argument-hint: 'featureName=my-feature issueNumber=1'
---

# Nhiệm vụ: Phát triển tính năng mới từ GitHub Issue và mở PR

Bạn cần xử lý repo hiện tại cho issue **#${input:issueNumber}** với tên tính năng là **${input:featureName}**.

Hãy **nghiêm ngặt thực hiện theo trình tự** sau, không bỏ qua bước nào:

## 1. Đọc issue
- Sử dụng GitHub MCP để đọc nội dung issue `#${input:issueNumber}`.
- Tóm tắt yêu cầu tính năng mới, giao diện UI/UX cần thêm/sửa, và logic cần xử lý.

## 2. Lập kế hoạch & Kiểm tra UI/UX
- Phân tích tính tương thích giao diện (Responsive/Styling) trước khi viết code JavaScript mới.
- Liệt kê rõ ràng các file dự định tạo mới hoặc chỉnh sửa (ví dụ: `index.html`, `styles.css`, `app.js`).
- **Dừng lại và hỏi người dùng**:
  "Tôi chưa thay đổi bất kỳ file nào. Vui lòng kiểm tra kế hoạch trên, nếu bạn đồng ý hãy phản hồi '同意' để tôi bắt đầu thực hiện."
- **CHỜ PHẢN HỒI**: Chỉ tiếp tục khi người dùng nhắn "同意".

## 3. Tạo nhánh Git
- Tạo và chuyển sang nhánh mới có tên dạng: `feature/${input:featureName}`

## 4. Chỉnh sửa Mã nguồn
- Thực hiện sửa đổi code để thêm tính năng.
- Tuân thủ nghiêm ngặt các quy tắc lập trình trong `.github/copilot-instructions.md`.

## 5. Hướng dẫn Kiểm thử (Verification)
- Liệt kê từng bước thủ công để người dùng test tính năng mới này trên trình duyệt.

## 6. Commit & Push
- Commit các thay đổi với thông điệp chuẩn hóa: `feat: add feature ${input:featureName} (Closes #${input:issueNumber})`
- Push nhánh `feature/${input:featureName}` lên GitHub.

## 7. Mở Pull Request
- Sử dụng GitHub MCP để tạo PR từ nhánh `feature/${input:featureName}` vào nhánh `main`.
- Tiêu đề PR: `feat: add ${input:featureName}`
- Nội dung PR phải chứa cú pháp `Closes #${input:issueNumber}` và gửi đường link PR cho người dùng.