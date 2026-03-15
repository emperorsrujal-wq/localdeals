"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { month: 'Jan', Basic: 4000, Pro: 2400, Enterprise: 2400 },
  { month: 'Feb', Basic: 3000, Pro: 1398, Enterprise: 2210 },
  { month: 'Mar', Basic: 2000, Pro: 9800, Enterprise: 2290 },
  { month: 'Apr', Basic: 2780, Pro: 3908, Enterprise: 2000 },
  { month: 'May', Basic: 1890, Pro: 4800, Enterprise: 2181 },
  { month: 'Jun', Basic: 2390, Pro: 3800, Enterprise: 2500 },
];

export function RevenueChart() {
  return (
    <div className="h-96 w-full bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Revenue by Subscription Tier</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
            <Tooltip 
              cursor={{ fill: 'transparent' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
            />
            <Bar dataKey="Basic" stackId="a" fill="#93c5fd" radius={[0, 0, 4, 4]} />
            <Bar dataKey="Pro" stackId="a" fill="#3b82f6" />
            <Bar dataKey="Enterprise" stackId="a" fill="#1d4ed8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-center space-x-6">
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-blue-300 mr-2"></span>
          <span className="text-sm text-gray-500">Basic Tier</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
          <span className="text-sm text-gray-500">Pro Tier</span>
        </div>
        <div className="flex items-center">
          <span className="w-3 h-3 rounded-full bg-blue-700 mr-2"></span>
          <span className="text-sm text-gray-500">Enterprise</span>
        </div>
      </div>
    </div>
  );
}
