'use client';
import { useState, useEffect } from 'react';
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

const LeaderChart = () => {
  const [parcelData, setParcelData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/leader/chart');
      const data = await response.json();
      if (data.ok) {
        const formattedData = data.stats.map(item => ({
          ...item,
          count: item.count // Use count from parcel stats
        }));
        setParcelData(formattedData);
      } else {
        console.error('Failed to fetch chart data:', data.message);
      }
    } catch (error) {
      console.error('Error fetching chart data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={parcelData}
        margin={{
          right: 30,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="blue" name="Số lượng đơn hàng" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LeaderChart;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-lg">{label}</p>
        <p className="text-sm text-blue-400">
          Đơn hàng:
          <span className="ml-2">{payload[0].value} đơn</span>
        </p>
      </div>
    );
  }
};