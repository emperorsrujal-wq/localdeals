import { 
  Users, 
  Building2, 
  Megaphone, 
  DollarSign, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";

const stats = [
  {
    name: "Total Users",
    value: "2,543",
    change: "+12%",
    trend: "up",
    icon: Users,
  },
  {
    name: "Total Businesses",
    value: "423",
    change: "+8%",
    trend: "up",
    icon: Building2,
  },
  {
    name: "Active Ads",
    value: "1,247",
    change: "+23%",
    trend: "up",
    icon: Megaphone,
  },
  {
    name: "Monthly Revenue",
    value: "$12,543",
    change: "-2%",
    trend: "down",
    icon: DollarSign,
  },
];

export function SummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;
        return (
          <div
            key={item.name}
            className="relative overflow-hidden rounded-lg bg-white p-5 shadow-sm border border-gray-100"
          >
            <dt>
              <div className="absolute rounded-md bg-blue-50 p-3">
                <Icon className="h-6 w-6 text-blue-600" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">
                {item.name}
              </p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-1 sm:pb-2">
              <p className="text-2xl font-semibold text-gray-900">
                {item.value}
              </p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  item.trend === "up" ? "text-green-600" : "text-red-600"
                }`}
              >
                {item.trend === "up" ? (
                  <ArrowUpRight className="h-4 w-4 flex-shrink-0 self-center text-green-500" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 flex-shrink-0 self-center text-red-500" />
                )}
                <span className="sr-only">
                  {item.trend === "up" ? "Increased by" : "Decreased by"}
                </span>
                {item.change}
              </p>
            </dd>
          </div>
        );
      })}
    </div>
  );
}
