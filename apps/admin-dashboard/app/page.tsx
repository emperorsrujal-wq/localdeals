'use client';

import React, { useState } from 'react';

interface KPI {
  label: string;
  value: string;
  change: string;
  icon: string;
}

export default function DashboardPage() {
  const kpis: KPI[] = [
    {
      label: 'Total Users',
      value: '2,543',
      change: '+12%',
      icon: '👥',
    },
    {
      label: 'Total Businesses',
      value: '423',
      change: '+8%',
      icon: '🏪',
    },
    {
      label: 'Active Ads',
      value: '1,247',
      change: '+23%',
      icon: '📢',
    },
    {
      label: 'Monthly Revenue',
      value: '$12,543',
      change: '+15%',
      icon: '💰',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-50">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-800/50">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">LocalDeals</h1>
              <p className="text-sm text-gray-400">Admin Dashboard</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-400">Welcome, Admin</p>
              <button className="text-xs text-red-500 hover:text-red-400">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {kpis.map((kpi) => (
            <div
              key={kpi.label}
              className="rounded-lg border border-gray-700 bg-gray-800 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">{kpi.label}</p>
                  <p className="mt-2 text-2xl font-bold">{kpi.value}</p>
                </div>
                <div className="text-3xl">{kpi.icon}</div>
              </div>
              <p className="mt-2 text-xs text-green-500">{kpi.change} from last month</p>
            </div>
          ))}
        </div>

        {/* Charts Placeholder */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
            <h2 className="mb-4 text-lg font-semibold">User Growth</h2>
            <div className="flex h-64 items-center justify-center text-gray-400">
              Chart Coming Soon
            </div>
          </div>

          <div className="rounded-lg border border-gray-700 bg-gray-800 p-6">
            <h2 className="mb-4 text-lg font-semibold">Revenue Trend</h2>
            <div className="flex h-64 items-center justify-center text-gray-400">
              Chart Coming Soon
            </div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <NavCard
            title="Pending Businesses"
            count="8"
            icon="📋"
            href="/dashboard/businesses"
          />
          <NavCard
            title="Flagged Content"
            count="12"
            icon="⚠️"
            href="/dashboard/moderation"
          />
          <NavCard
            title="User Reports"
            count="5"
            icon="🚩"
            href="/dashboard/users"
          />
        </div>
      </main>
    </div>
  );
}

interface NavCardProps {
  title: string;
  count: string;
  icon: string;
  href: string;
}

function NavCard({ title, count, icon, href }: NavCardProps) {
  return (
    <a
      href={href}
      className="rounded-lg border border-gray-700 bg-gray-800 p-6 hover:bg-gray-700 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400">{title}</p>
          <p className="mt-2 text-2xl font-bold">{count}</p>
        </div>
        <div className="text-4xl">{icon}</div>
      </div>
      <p className="mt-4 text-xs text-blue-400">View →</p>
    </a>
  );
}
