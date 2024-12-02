'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const LeaderChart2 = () => {
  const { data: session } = useSession();
  const [salesData, setSalesData] = useState([]);
  const collection_point_id = session?.user?.collection_point_id;

  const fetchData = async () => {
    if (!collection_point_id) return;
    
    try {
      const response = await fetch(`/api/collection_manager/chart?collection_point_id=${collection_point_id}`);
      const data = await response.json();
      if (data.ok) {
        const formattedData = data.stats.map(item => ({
          name: item.name,
          cost_src: parseInt(item.src_cost || 0) / 1000000, // Convert to millions VND
          cost_des: parseInt(item.des_cost || 0) / 1000000
        }));
        setSalesData(formattedData);
      } else {
        console.error('Failed to fetch chart data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  useEffect(() => {
    if (collection_point_id) {
      fetchData();
    }
  }, [collection_point_id]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={salesData}
        margin={{
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line 
          type="monotone" 
          dataKey="cost_src" 
          stroke="blue" 
          name="Tiền cước gửi đi"
          activeDot={{ r: 8 }}
        />
        <Line 
          type="monotone" 
          dataKey="cost_des" 
          stroke="red" 
          name="Tiền cước nhận về"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Tiền cước gửi đi:
          <span className="ml-2">{payload[0].value} triệu ₫</span>
        </p>
        <p className="text-sm text-red-400">
          Tiền cước nhận về:
          <span className="ml-2">{payload[1].value} triệu ₫</span>
        </p>
      </div>
    );
  }
  return null;
};

export default LeaderChart2;