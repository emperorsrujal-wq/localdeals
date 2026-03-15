import { SummaryCards } from '../../components/dashboard/SummaryCards';
import { RecentActivity } from '../../components/dashboard/RecentActivity';

export default function DashboardOverview() {
  return (
    <div className="flex-1 overflow-auto">
      <main className="flex-1 pb-8">
        <div className="bg-white shadow">
          <div className="px-4 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8">
            <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
              <div className="min-w-0 flex-1">
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center">
                      <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                        Dashboard Overview
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-lg font-medium leading-6 text-gray-900">
              Weekly Overview
            </h2>
            <div className="mt-2">
              <SummaryCards />
            </div>
            
            <div className="mt-8 grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="bg-white rounded-lg shadow-sm border border-gray-100 mt-6 p-5 h-64 flex items-center justify-center">
                <span className="text-gray-400 font-medium">[ Revenue Chart Placeholder ]</span>
              </div>
              <RecentActivity />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
