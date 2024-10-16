import React from "react";
import { Link } from "@nextui-org/react";

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.container}>
        {/* Left Column */}
        <div style={styles.column}>
          <h4 style={styles.heading}>TỔNG CÔNG TY CỔ PHẦN BOLTZ</h4>
          <p>BOLTZ là doanh nghiệp hàng đầu cung cấp dịch vụ chuyển phát nhanh hàng hóa, bưu kiện trong nước, quốc tế tại Việt Nam.</p>
          <p>📄 Giấy chứng nhận Đăng ký Kinh doanh số: meow meow</p>
          <p>📄 Giấy phép bưu chính số: meow meow</p>
          <p>📄 Văn bản xác nhận hoạt động bưu chính số: meow meow meow</p>
        </div>

        {/* Middle Column */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Về BoltZ</h4>
          <Link href="#" style={styles.link}>Giới thiệu</Link>
          <Link href="#" style={styles.link}>Tin tức</Link>
          <Link href="#" style={styles.link}>Mạng lưới bưu cục</Link>
          <Link href="#" style={styles.link}>Tuyển dụng</Link>
          <Link href="#" style={styles.link}>Kết nối API</Link>
        </div>

        {/* Middle Column 2 */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Hỗ trợ khách hàng</h4>
          <Link href="#" style={styles.link}>Chat online với CSKH</Link>
          <Link href="#" style={styles.link}>Hướng dẫn sử dụng dịch vụ</Link>
          <Link href="#" style={styles.link}>Câu hỏi thường gặp</Link>
          <Link href="#" style={styles.link}>Chính sách bảo mật</Link>
        </div>

        {/* Right Column */}
        <div style={styles.column}>
          <h4 style={styles.heading}>Thông tin liên hệ</h4>
          <p>📍 VP giao dịch: 144 Xuân Thủy, Cầu Giấy, Hà Nội</p>
          <p>📧 boltz_company@vnu.edu.vn</p>
          <p>📞 19001234</p>
        </div>
      </div>

      <div style={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} BoltZ. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

// Styles
const styles = {
  footer: {
    backgroundColor: "#222",
    color: "#fff",
    padding: "20px 0",
    width: "100%",
    position: "relative",
    bottom: "0",
  },
  container: {
    display: "flex",
    justifyContent: "space-between",
    maxWidth: "1200px",
    margin: "0 auto",
    flexWrap: "wrap",
  },
  column: {
    flex: "1",
    padding: "10px",
    minWidth: "200px",
  },
  heading: {
    fontSize: "16px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  bottomBar: {
    backgroundColor: "#333",
    textAlign: "center",
    padding: "10px 0",
    fontSize: "12px",
  },
  link: {
    display: 'block', 
    marginBottom: '8px' 
  }
};

export default Footer;
