export function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: "John's Pizza & Subs",
      action: "submitted a new flyer",
      time: "2 hours ago",
      type: "content",
    },
    {
      id: 2,
      user: "Sarah Jenkins",
      action: "signed up as a consumer",
      time: "4 hours ago",
      type: "user",
    },
    {
      id: 3,
      user: "Elite Fitness Gym",
      action: "upgraded to Pro Plan",
      time: "1 day ago",
      type: "revenue",
    },
    {
      id: 4,
      user: "Green Valley Farm",
      action: "was approved",
      time: "1 day ago",
      type: "business",
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 mt-6">
      <div className="px-5 py-4 border-b border-gray-100">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Activity</h3>
      </div>
      <div className="px-5 py-4">
        <div className="flow-root">
          <ul role="list" className="-mb-8">
            {activities.map((activity, activityIdx) => (
              <li key={activity.id}>
                <div className="relative pb-8">
                  {activityIdx !== activities.length - 1 ? (
                    <span
                      className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200"
                      aria-hidden="true"
                    />
                  ) : null}
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white ${
                          activity.type === "revenue"
                            ? "bg-green-500"
                            : activity.type === "user"
                            ? "bg-blue-500"
                            : activity.type === "content"
                            ? "bg-orange-500"
                            : "bg-gray-500"
                        }`}
                      >
                        <span className="text-white text-xs font-medium">
                          {activity.user.charAt(0)}
                        </span>
                      </span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className="text-sm text-gray-500">
                          <span className="font-medium text-gray-900">
                            {activity.user}
                          </span>{" "}
                          {activity.action}
                        </p>
                      </div>
                      <div className="text-right text-sm whitespace-nowrap text-gray-500">
                        <time>{activity.time}</time>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
