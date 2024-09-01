"use client";

import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Bell, Search, ChevronDown } from "lucide-react";

const donutData = [
  { name: "Active", value: 40, color: "hsl(152, 82%, 47%)" },
  { name: "Idle", value: 60, color: "hsl(30, 100%, 60%)" },
  { name: "Storage", value: 21, color: "hsl(0, 100%, 70%)" },
];

const lineData = [
  { name: "18/05", value: 100 },
  { name: "19/05", value: 120 },
  { name: "20/05", value: 110 },
  { name: "21/05", value: 130 },
  { name: "22/05", value: 140 },
  { name: "23/05", value: 135 },
  { name: "24/05", value: 150 },
];

const alertData = [
  { alert: "Power Cuts", count: 15 },
  { alert: "Antenna Cuts", count: 4 },
  { alert: "Panic", count: 0 },
];

const notifications = [
  {
    id: "KBL 175G",
    time: "10/02/2023 14:21",
    location: "Kariobangi Depot",
    color: "bg-red-500",
  },
  {
    id: "KBL 115G",
    time: "10/02/2023 14:19",
    location: "ACC MSA",
    color: "bg-red-500",
  },
  {
    id: "KBL 165G",
    time: "10/02/2023 14:17",
    location: "Mombasa Depot",
    color: "bg-green-500",
  },
  {
    id: "KBO 165G",
    time: "10/02/2023 14:17",
    location: "Mtwapa Depot",
    color: "bg-orange-500",
  },
];

export default function Dashboard() {
  return (
    <div className="bg-gray-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Assets status</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-3xl font-bold"
                  >
                    121
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md">
              Current status
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Fleet mileage</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md">
              Movement
            </button>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Total Violations</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-3xl font-bold"
                  >
                    1320
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md">
              Violations
            </button>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Licenses</h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-3xl font-bold"
                  >
                    600
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">Alerts summary</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Alert</th>
                  <th className="text-right">Count</th>
                </tr>
              </thead>
              <tbody>
                {alertData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.alert}</td>
                    <td className="text-right">{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 text-right">
              <strong>Total: 19</strong>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-4">
              Assets Service Summary
            </h2>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={donutData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {donutData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-3xl font-bold"
                  >
                    1320
                  </text>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </main>
      {/* <aside className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Hi David, welcome.</h2>
        <h3 className="text-lg font-medium mb-2">RECENT NOTIFICATIONS</h3>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index} className="mb-4 flex items-start">
              <div
                className={`w-2 h-2 rounded-full mt-2 mr-2 ${notification.color}`}
              ></div>
              <div>
                <p className="font-medium">{notification.id}</p>
                <p className="text-sm text-gray-500">{notification.time}</p>
                <p className="text-sm text-gray-500">{notification.location}</p>
              </div>
            </li>
          ))}
        </ul>
      </aside> */}
    </div>
  );
}
