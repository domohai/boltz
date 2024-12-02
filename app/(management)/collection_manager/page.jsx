"use client";
import LeaderChart from "@components/charts/Leader_chart";
import LeaderChart2 from "@components/charts/Leader_chart_2";
import { useState, useEffect, useMemo } from 'react';
import { useSession } from 'next-auth/react';

const page = () => {
  const { data: session, status } = useSession();
  const collection_point_id = useMemo(() => session?.user?.collection_point_id, [session, status]);
  // const collection_point_id = 2;
  console.log('Collection point id: '. collection_point_id);

  const [statusStats, setStatusStats] = useState({
    'Chờ xử lý': { count: 0, cost: 0 },
    'Đã tiếp nhận': { count: 0, cost: 0 },
    'Đang vận chuyển': { count: 0, cost: 0 },
    'Đã tới kho': { count: 0, cost: 0 },
    'Đã trả hàng': { count: 0, cost: 0 }
  });

const fetchStatusStats = async () => {
  if (!session || !collection_point_id) {
    console.log("Session or collection_point_id not available yet");
    return;
  }
    try {
      const response = await fetch(`/api/collection_manager/stats?collection_point_id=${collection_point_id}`);
      const data = await response.json();
      if (data.ok) {
        const newStats = { ...statusStats };
        data.stats.forEach(stat => {
          if (newStats[stat.status]) {
            newStats[stat.status].count = stat.count;
            newStats[stat.status].cost = stat.total_cost;
          }
        });
        setStatusStats(newStats);
        console.log(newStats)
      }
    } catch (error) {
      console.error('Error fetching status stats:', error);
    }
  };

useEffect(() => {
    if (collection_point_id) {
      fetchStatusStats();
    } else {
      console.log('Collection point id not available yet');
    }
  }, [collection_point_id]);
  
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
                  {Object.entries(statusStats).map(([status, stats]) => (
                    <tr key={status}>
                      <td>{status}</td>
                      <td>{stats.count}</td>
                      <td>{stats.cost.toLocaleString('vi-VN')}đ</td>
                      {/* <td>0đ</td> */}
                    </tr>
                  ))}
                </tbody>
                </table>
            </div>
        </div>
        
        <p className="mt-4">Biểu đồ số liệu các ngày trong tháng</p>
      </div>
    </div>
  )
};

export default page;