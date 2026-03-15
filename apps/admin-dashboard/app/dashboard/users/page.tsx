import { UserTable } from '../../../components/tables/UserTable';

export default function UsersPage() {
  return (
    <div className="flex-1 overflow-auto">
      <main className="flex-1 pb-8">
        <div className="bg-white shadow">
          <div className="px-4 py-6 sm:px-6 lg:mx-auto lg:max-w-6xl lg:px-8 border-b border-gray-200">
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                  User Management
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  Manage active consumers, warning histories, and review reported accounts.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <UserTable />
        </div>
      </main>
    </div>
  );
}
