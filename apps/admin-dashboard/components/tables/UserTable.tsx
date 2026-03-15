"use client";

import { useState } from "react";
import { Ban, Mail, AlertOctagon } from "lucide-react";

export interface User {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  status: "Active" | "Banned" | "Warning";
  reports: number;
}

const mockUsers: User[] = [
  {
    id: "u1",
    name: "Alex Smith",
    email: "alex@example.com",
    joinedDate: "2026-01-15",
    status: "Active",
    reports: 0,
  },
  {
    id: "u2",
    name: "Jane Doe",
    email: "jane@example.com",
    joinedDate: "2026-02-10",
    status: "Warning",
    reports: 2,
  },
  {
    id: "u3",
    name: "Spammy McSpamface",
    email: "spam@scam.com",
    joinedDate: "2026-03-01",
    status: "Banned",
    reports: 14,
  },
  {
    id: "u4",
    name: "Regular Joe",
    email: "joe@example.com",
    joinedDate: "2025-11-20",
    status: "Active",
    reports: 0,
  },
];

export function UserTable() {
  const [users, setUsers] = useState<User[]>(mockUsers);

  const handleBan = (id: string) => {
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, status: "Banned" } : u))
    );
  };

  const handleWarn = (id: string) => {
    setUsers(prev =>
      prev.map(u => (u.id === id ? { ...u, status: "Warning" } : u))
    );
  };

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
          <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
            <table className="min-w-full divide-y divide-gray-300">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                    User
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Reports
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Joined
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-500">
                            <span className="text-sm font-medium leading-none text-white">{user.name.charAt(0)}</span>
                          </span>
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">{user.name}</div>
                          <div className="text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        user.status === 'Active' ? 'bg-green-100 text-green-800' :
                        user.status === 'Warning' ? 'bg-orange-100 text-orange-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.reports > 0 ? (
                        <span className="inline-flex items-center text-red-600 font-medium">
                          <AlertOctagon className="w-4 h-4 mr-1" />
                          {user.reports}
                        </span>
                      ) : (
                        <span className="text-gray-400">0</span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {user.joinedDate}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex justify-end gap-2">
                        {user.status !== 'Banned' && (
                          <>
                            <button onClick={() => handleWarn(user.id)} className="text-orange-600 hover:text-orange-900 bg-orange-50 p-1.5 rounded" title="Send Warning">
                              <Mail className="h-4 w-4" />
                            </button>
                            <button onClick={() => handleBan(user.id)} className="text-red-600 hover:text-red-900 bg-red-50 p-1.5 rounded" title="Ban User">
                              <Ban className="h-4 w-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
