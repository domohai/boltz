import LeaderChart from "@/components/charts/Leader_chart";
import LeaderChart2 from "@components/charts/Leader_chart_2";
import LeaderChart3 from "@components/charts/Leader_chart_3";
import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";

const LeaderPage = () => {
    // Đức Hải
    // tham khảo: https://refine.dev/blog/next-ui-react-admin-panel/#what-is-refine
    // https://recharts.org/en-US/guide/getting-started
    // charts components should be put inside components/charts folder
    // preview can be assess via the sidebar in Management UI
    return (
        <div className="p-4 bg-gray-100 min-h-screen">
          <h1 className="text-2xl font-bold mb-4">Thống kê</h1>
    
          {/* Radio Buttons for Selection */}
          <div className="flex items-center gap-4 mb-4">
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
          </div>
    
          {/* Dropdown for Chọn điểm TK and Chọn điểm GD */}
          <div className="flex gap-4 mb-4">
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
          </div>
    
          {/* Buttons for Metrics */}
          <div className="flex flex-wrap gap-4 mb-4">
            <button className="px-4 py-2 bg-white rounded-full shadow">Số lượng đơn hàng</button>
            <button className="px-4 py-2 bg-white rounded-full shadow">Số lượng tiền cước</button>
            <button className="px-4 py-2 bg-white rounded-full shadow">Số lượng nhân viên</button>
            <button className="px-4 py-2 bg-white rounded-full shadow">Số lượng điểm GD</button>
          </div>

          <div className="flex gap-4">
            <Card className="w-48">
              <CardHeader className="text-sm font-medium">
                Tổng đơn hàng
              </CardHeader>
              <CardBody className="text-2xl font-bold">1,234</CardBody>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  +20.1% so với tháng trước
                </p>
              </CardFooter>
            </Card>
            <Card className="w-48">
              <CardHeader className="text-sm font-medium">
                Tổng tiền cước
              </CardHeader>
              <CardBody className="text-2xl font-bold">₫45,678,000</CardBody>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  +15.2% so với tháng trước
                </p>
                </CardFooter>
            </Card>
          </div>
    
          <div className="flex flex-col gap-6 p-4">
            {/* First Card */}
            <div className="bg-blue-200 p-6 rounded-lg shadow-lg">
              <div className="text-lg font-bold mb-2">Biểu đồ thống kê đơn hàng</div>
              <div className="h-80">
                <LeaderChart />
              </div>
            </div>
            {/* Second Card */}
            <div className="bg-blue-200 p-6 rounded-lg shadow-lg">
              <div className="text-lg font-bold mb-2">Biểu đồ thống kê tiền cước</div>
              <div className="h-80">
                <LeaderChart2 />
              </div>
            </div>
            
            {/* Third Card */}
            <div className="bg-blue-200 p-6 rounded-lg shadow-lg">
              <div className="flex mt-4">
                {/* Chart Section */}
                <div className="w-1/2">
                  <LeaderChart3 />
                </div>
                
                {/* Table Section */}
                <div className="w-1/2 ml-4">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="text-left font-semibold pb-2">Trạng thái</th>
                        <th className="text-left font-semibold pb-2">Số lượng</th>
                        <th className="text-left font-semibold pb-2">Tiền cước</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-blue-300">
                        <td className="py-2">Chờ xử lý</td>
                        <td className="py-2">00</td>
                        <td className="py-2">00</td>
                      </tr>
                      <tr className="border-b border-blue-300">
                        <td className="py-2">Đã tiếp nhận</td>
                        <td className="py-2">00</td>
                        <td className="py-2">00</td>
                      </tr>
                      <tr className="border-b border-blue-300">
                        <td className="py-2">Đang vận chuyển</td>
                        <td className="py-2">00</td>
                        <td className="py-2">00</td>
                      </tr>
                      <tr className="border-b border-blue-300">
                        <td className="py-2">Đã tới kho</td>
                        <td className="py-2">00</td>
                        <td className="py-2">00</td>
                      </tr>
                      <tr className="border-b border-blue-300">
                        <td className="py-2">Đã trả hàng</td>
                        <td className="py-2">00</td>
                        <td className="py-2">00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              <p className="mt-4 text-gray-700">Biểu đồ số liệu các ngày trong tháng</p>
            </div>
          </div>
        </div>
    );  
}

export default LeaderPage;
