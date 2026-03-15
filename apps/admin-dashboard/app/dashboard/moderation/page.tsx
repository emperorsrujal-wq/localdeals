"use client";

import { useState } from "react";
import { AlertTriangle, Check, Trash2, Edit2 } from "lucide-react";

export interface FlaggedItem {
  id: string;
  business: string;
  title: string;
  reason: string;
  confidence: number;
  reportedDate: string;
  imageUrl: string;
  status: "Pending" | "Resolved";
}

const mockQueue: FlaggedItem[] = [
  {
    id: "f1",
    business: "Sketchy Auto Sales",
    title: "100% Guaranteed Approval No Credit Check",
    reason: "Misleading claims / Spam terms",
    confidence: 94,
    reportedDate: "2026-03-15",
    imageUrl: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    status: "Pending",
  },
  {
    id: "f2",
    business: "Joe's Discount Liquids",
    title: "Buy 1 Get 3 Free Margaritas",
    reason: "Alcohol promotion violation in restricted state",
    confidence: 88,
    reportedDate: "2026-03-14",
    imageUrl: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    status: "Pending",
  },
];

export default function ModerationPage() {
  const [items, setItems] = useState<FlaggedItem[]>(mockQueue);

  const handleResolve = (id: string) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: "Resolved" } : item))
    );
  };

  return (
    <div className="flex-1 overflow-auto">
      <main className="flex-1 pb-8">
        <div className="bg-white shadow">
          <div className="px-4 py-6 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8 border-b border-gray-200">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
              Content Moderation
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Review flyers flagged by AI or reported by users.
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-8">
          <div className="space-y-6">
            {items.map((item) => (
              <div
                key={item.id}
                className={`flex flex-col md:flex-row bg-white shadow-sm rounded-lg border ${
                  item.status === 'Resolved' ? 'border-green-200 opacity-60' : 'border-red-200'
                } overflow-hidden`}
              >
                <div className="md:w-64 h-48 md:h-auto flex-shrink-0 bg-gray-100 relative">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  {item.status === 'Pending' && (
                    <div className="absolute top-2 left-2 bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full font-bold flex items-center shadow-sm">
                      <AlertTriangle className="w-3 h-3 mr-1" />
                      Flagged
                    </div>
                  )}
                </div>
                
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                      <span className="text-sm text-gray-500">{item.reportedDate}</span>
                    </div>
                    <p className="text-sm font-medium text-blue-600 mb-4">{item.business}</p>
                    
                    <div className="bg-red-50 p-3 rounded text-sm text-red-800 border border-red-100 mb-4">
                      <strong>AI Reason:</strong> {item.reason} 
                      <span className="ml-2 font-mono text-xs bg-red-200 px-1 py-0.5 rounded">
                        Confidence: {item.confidence}%
                      </span>
                    </div>
                  </div>

                  {item.status === 'Pending' ? (
                    <div className="flex gap-3 justify-end mt-4">
                      <button
                        onClick={() => handleResolve(item.id)}
                        className="inline-flex items-center px-3 py-2 border border-green-600 text-green-600 text-sm font-medium rounded-md hover:bg-green-50 focus:outline-none"
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Approve Content
                      </button>
                      <button
                        className="inline-flex items-center px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 focus:outline-none"
                      >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={() => handleResolve(item.id)}
                        className="inline-flex items-center px-3 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none shadow-sm"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete Flyer
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-end mt-4">
                      <span className="text-sm font-bold text-green-600 flex items-center">
                        <Check className="w-4 h-4 mr-1"/> Resolved
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
