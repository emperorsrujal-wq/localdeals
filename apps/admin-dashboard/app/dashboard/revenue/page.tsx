import { RevenueChart } from '../../../components/charts/RevenueChart';
import { SummaryCards } from '../../../components/dashboard/SummaryCards';

export default function RevenuePage() {
  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <main className="flex-1 pb-8">
        <div className="bg-white shadow">
          <div className="px-4 py-6 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8 border-b border-gray-200">
            <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
              Revenue & Analytics
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              Overview of your platform's financial performance.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
          <SummaryCards />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <RevenueChart />
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Churn Rate</h3>
                <p className="text-sm text-gray-500 mb-6">Percentage of active businesses that have cancelled their subscriptions this month.</p>
                <div className="text-5xl font-bold text-gray-900 py-4 border-b border-gray-100">
                  2.4%
                </div>
              </div>
              
              <div className="mt-6">
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                >
                  Generate Financial Report
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
