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
    cost: 4.001,

  },
  {
    name: 'Feb',
    cost: 3.002,

  },
  {
    name: 'Mar',
    cost: 9.805,

  },
  {
    name: 'Apr',
    cost: 3.908,

  },
  {
    name: 'May',
    cost: 4.806,

  },
  {
    name: 'Jun',
    cost: 3.808,

  },

  {
    name: 'July',
    cost: 3.802,

  },

  {
    name: 'August',
    cost: 3.801,

  },

  {
    name: 'September',
    cost: 3.805,

  },

  {
    name: 'October',
    cost: 3.807,

  },

  {
    name: 'November',
    cost: 3.809,

  },

  {
    name: 'December',
    cost: 3.801,
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