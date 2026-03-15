import { BusinessTable } from '../../../components/tables/BusinessTable';

export default function BusinessesPage() {
  return (
    <div className="flex-1 overflow-auto">
      <main className="flex-1 pb-8">
        <div className="bg-white shadow">
          <div className="px-4 py-6 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8 border-b border-gray-200">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                  Business Approvals
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all registered businesses, including their current verification and subscription status.
                </p>
              </div>
              <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto"
                >
                  Export CSV
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <BusinessTable />
        </div>
      </main>
    </div>
  );
}
