"use client";

import LeaderChart from "@/components/charts/Leader_chart";
import LeaderChart2 from "@components/charts/Leader_chart_2";

const page = () => {
  // Đức Hải
  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Thống kê</h1>

      {/* Radio Buttons for Selection */}
      {/* <div className="flex items-center gap-4 mb-4">
        <label className="flex items-center gap-2">
          <input type="radio" name="location" className="accent-blue-500" />
          <span>Toàn quốc</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="location" className="accent-gray-500" />
          <span>Điểm TK</span>
        </label>
        <label className="flex items-center gap-2">
          <input type="radio" name="location" className="accent-gray-500" />
          <span>Điểm GD</span>
        </label>
        <select className="px-4 py-2 bg-white rounded-full shadow ml-auto">
          <option>Thời gian thống kê</option>
          <option>Tháng này</option>
          <option>Tháng trước</option>
        </select>
      </div> */}

      {/* Dropdown for Chọn điểm TK and Chọn điểm GD */}
      {/* <div className="flex gap-4 mb-4">
        <select className="px-4 py-2 bg-white rounded-full shadow">
          <option>Chọn điểm TK</option>
          <option>Điểm 1</option>
          <option>Điểm 2</option>
        </select>
        <select className="px-4 py-2 bg-white rounded-full shadow">
          <option>Chọn điểm GD</option>
          <option>Điểm 1</option>
          <option>Điểm 2</option>
        </select>
      </div> */}

      {/* Buttons for Metrics */}
      <div className="flex flex-wrap gap-4 mb-4">
        <button className="px-4 py-2 bg-white rounded-full shadow">Số lượng đơn hàng</button>
        <button className="px-4 py-2 bg-white rounded-full shadow">Số lượng tiền cước</button>
        {/* <button className="px-4 py-2 bg-white rounded-full shadow">Số lượng nhân viên</button> */}
        <button className="px-4 py-2 bg-white rounded-full shadow">Số lượng điểm GD</button>
      </div>

      {/* Chart Section */}
      <div className="bg-blue-200 p-6 rounded-lg shadow">
        <h2 className="text-lg font-bold mb-2">Biểu đồ thống kê</h2>
        <div className="h-80">
          <LeaderChart />
        </div>
        
        <div className="flex mt-4">
            <div className="w-1/2">
                <LeaderChart2 />
            </div>
            <div className="w-1/2 ml-4">
                <table className="w-full">
                <thead>
                    <tr>
                    <th className="text-left">Trạng thái</th>
                    <th className="text-left">Số lượng</th>
                    <th className="text-left">Tiền cước</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>Chờ xử lý</td><td>00</td><td>00</td></tr>
                    <tr><td>Đã tiếp nhận</td><td>00</td><td>00</td></tr>
                    <tr><td>Đang vận chuyển</td><td>00</td><td>00</td></tr>
                    <tr><td>Đã tới kho</td><td>00</td><td>00</td></tr>
                    <tr><td>Đã trả hàng</td><td>00</td><td>00</td></tr>
                </tbody>
                </table>
            </div>
        </div>
        
        <p className="mt-4">Biểu đồ số liệu các ngày trong tháng</p>
      </div>
    </div>
  );  
}

export default page