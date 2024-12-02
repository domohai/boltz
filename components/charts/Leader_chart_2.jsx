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


const LeaderChart2 = () => {
  const [salesData, setSalesData] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('/api/leader/chart');
      const data = await response.json();
      if (data.ok) {
        const formattedData = data.stats.map(item => ({
          ...item,
          cost: (item.cost / 1000000).toFixed(3) // Convert to millions VND
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
    fetchData();
  }, []);

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
        <Line type="monotone" dataKey="cost" stroke="red" />
      </LineChart>
    </ResponsiveContainer>
  );
};


export default LeaderChart2;

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-4 bg-slate-900 flex flex-col gap-4 rounded-md">
        <p className="text-lg">{label}</p>
        <p className="text-sm text-red-400">
          Tiền cước:
          <span className="ml-2">{payload[0].value}.000 ₫</span>
        </p>
      </div>
    );
  }
};