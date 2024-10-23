import { Link } from "@nextui-org/link";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-[100px]">
      <div className="flex justify-between max-w-7xl mx-auto flex-wrap">
        {/* Left Column */}
        <div className="flex-1 p-2 min-w-[450px] mr-[20px]">
          <h4 className="text-lg font-bold mb-2">TỔNG CÔNG TY CỔ PHẦN BOLTZ</h4>
          <p>BOLTZ là doanh nghiệp hàng đầu cung cấp dịch vụ chuyển phát nhanh hàng hóa, bưu kiện trong nước, quốc tế tại Việt Nam.</p>
          <p>📄 Giấy chứng nhận Đăng ký Kinh doanh số: meow meow</p>
          <p>📄 Giấy phép bưu chính số: meow meow</p>
          <p>📄 Văn bản xác nhận hoạt động bưu chính số: meow meow meow</p>
        </div>

        {/* Middle Column */}
        <div className="flex-1 p-2 min-w-[200px]">
          <h4 className="text-lg font-bold mb-2">Về BoltZ</h4>
          <Link href="#" className="block mb-2">Giới thiệu</Link>
          <Link href="#" className="block mb-2">Tin tức</Link>
          <Link href="#" className="block mb-2">Mạng lưới bưu cục</Link>
          <Link href="#" className="block mb-2">Tuyển dụng</Link>
          <Link href="#" className="block mb-2">Kết nối API</Link>
        </div>

        {/* Middle Column 2 */}
        <div className="flex-1 p-2 min-w-[200px]">
          <h4 className="text-lg font-bold mb-2">Hỗ trợ khách hàng</h4>
          <Link href="#" className="block mb-2">Chat online với CSKH</Link>
          <Link href="#" className="block mb-2">Hướng dẫn sử dụng dịch vụ</Link>
          <Link href="#" className="block mb-2">Câu hỏi thường gặp</Link>
          <Link href="#" className="block mb-2">Chính sách bảo mật</Link>
        </div>

        {/* Right Column */}
        <div className="flex-1 p-2 min-w-[250px]">
          <h4 className="text-lg font-bold mb-2">Thông tin liên hệ</h4>
          <p>📍 VP giao dịch: 144 Xuân Thủy, Cầu Giấy, Hà Nội</p>
          <p>📧 boltz_company@vnu.edu.vn</p>
          <p>📞 19001234</p>
        </div>
      </div>

      <div className="bg-gray-900 text-center py-2 text-xs">
        <p>&copy; {new Date().getFullYear()} BoltZ. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
