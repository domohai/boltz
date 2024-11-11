'use client';

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

const salesData = [
  {
    name: 'Jan',
    revenue: 4000,

  },
  {
    name: 'Feb',
    revenue: 3000,

  },
  {
    name: 'Mar',
    revenue: 9800,

  },
  {
    name: 'Apr',
    revenue: 3908,

  },
  {
    name: 'May',
    revenue: 4800,

  },
  {
    name: 'Jun',
    revenue: 3800,

  },

  {
    name: 'July',
    revenue: 3800,

  },

  {
    name: 'August',
    revenue: 3800,

  },

  {
    name: 'September',
    revenue: 3800,

  },

  {
    name: 'October',
    revenue: 3800,

  },

  {
    name: 'November',
    revenue: 3800,

  },

  {
    name: 'December',
    revenue: 3800,
  },
];

const LeaderChart2 = () => {
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
        <Line type="monotone" dataKey="revenue" stroke="#3b82f6" />
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
        <p className="text-sm text-blue-400">
          Revenue:
          <span className="ml-2">${payload[0].value}</span>
        </p>
      </div>
    );
  }
};