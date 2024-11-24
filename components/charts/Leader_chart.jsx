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
    parcel: 4000,

  },
  {
    name: 'Feb',
    parcel: 3000,

  },
  {
    name: 'Mar',
    parcel: 9800,

  },
  {
    name: 'Apr',
    parcel: 3908,

  },
  {
    name: 'May',
    parcel: 4800,

  },
  {
    name: 'Jun',
    parcel: 3800,

  },

  {
    name: 'July',
    parcel: 3800,

  },

  {
    name: 'August',
    parcel: 3800,

  },

  {
    name: 'September',
    parcel: 3800,

  },

  {
    name: 'October',
    parcel: 3800,

  },

  {
    name: 'November',
    parcel: 3800,

  },

  {
    name: 'December',
    parcel: 3800,
  },
];

const LeaderChart = () => {
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
        <Line type="monotone" dataKey="parcel" stroke="blue" />
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