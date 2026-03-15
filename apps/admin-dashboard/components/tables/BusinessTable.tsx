"use client";

import { useState } from "react";
import { CheckCircle, XCircle, Eye, MoreHorizontal } from "lucide-react";

export interface Business {
  id: string;
  name: string;
  owner: string;
  email: string;
  status: "Pending" | "Approved" | "Suspended";
  appliedDate: string;
}

const mockBusinesses: Business[] = [
  {
    id: "b1",
    name: "John's Pizza & Subs",
    owner: "John Doe",
    email: "john@pizza.com",
    status: "Pending",
    appliedDate: "2026-03-14",
  },
  {
    id: "b2",
    name: "Green Valley Farm",
    owner: "Sarah Jenkins",
    email: "sarah@greenvalley.com",
    status: "Approved",
    appliedDate: "2026-03-12",
  },
  {
    id: "b3",
    name: "Elite Fitness Gym",
    owner: "Mike Tyson",
    email: "mike@elitefit.com",
    status: "Approved",
    appliedDate: "2026-03-10",
  },
  {
    id: "b4",
    name: "Sketchy Auto Sales",
    owner: "Don Shady",
    email: "don@sketchy.com",
    status: "Suspended",
    appliedDate: "2026-03-01",
  },
];

export function BusinessTable() {
  const [businesses, setBusinesses] = useState<Business[]>(mockBusinesses);

  const handleApprove = (id: string) => {
    setBusinesses(prev =>
      prev.map(b => (b.id === id ? { ...b, status: "Approved" } : b))
    );
  };

  const handleReject = (id: string) => {
    setBusinesses(prev =>
      prev.map(b => (b.id === id ? { ...b, status: "Suspended" } : b))
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
                    Business Name
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Owner
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Status
                  </th>
                  <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                    Applied
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span className="sr-only">Actions</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {businesses.map((business) => (
                  <tr key={business.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {business.name}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <div className="text-gray-900">{business.owner}</div>
                      <div className="text-gray-500">{business.email}</div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      <span className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                        business.status === 'Approved' ? 'bg-green-100 text-green-800' :
                        business.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {business.status}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {business.appliedDate}
                    </td>
                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <div className="flex justify-end gap-2">
                        {business.status === 'Pending' && (
                          <>
                            <button onClick={() => handleApprove(business.id)} className="text-green-600 hover:text-green-900" title="Approve">
                              <CheckCircle className="h-5 w-5" />
                            </button>
                            <button onClick={() => handleReject(business.id)} className="text-red-600 hover:text-red-900" title="Reject">
                              <XCircle className="h-5 w-5" />
                            </button>
                          </>
                        )}
                        <button className="text-gray-400 hover:text-gray-500" title="View Details">
                          <Eye className="h-5 w-5" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-500" title="More Actions">
                          <MoreHorizontal className="h-5 w-5" />
                        </button>
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
