import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import DashboardLayout from './DashboardLayout';
import DashboardStatsCard from '../components/DashboardStatsCard';
import { fetchBillingInfo } from '../store/slices/dashboardSlice';
import { FiCreditCard, FiDownload, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DashboardBilling() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { billing, loading, error } = useSelector((state) => state.dashboard);
  const { theme } = useSelector((state) => state.ui);

  useEffect(() => {
    if (user) {
      dispatch(fetchBillingInfo());
    }
  }, [dispatch, user]);

  // Mock billing data
  const mockBilling = {
    currentPlan: 'Professional',
    monthlyCost: 99,
    billingCycle: 'Monthly',
    nextBillingDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
    paymentMethod: '**** **** **** 4242',
    totalSpent: 1485,
    invoices: [
      { id: 1, date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), amount: 99, status: 'Paid' },
      { id: 2, date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000), amount: 99, status: 'Paid' },
      { id: 3, date: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000), amount: 99, status: 'Paid' },
      { id: 4, date: new Date(Date.now() - 120 * 24 * 60 * 60 * 1000), amount: 79, status: 'Paid' },
    ],
    usage: {
      estimatesCreated: 15,
      estimatesLimit: 50,
      storageUsed: 2.5,
      storageLimit: 10,
      apiCalls: 5420,
      apiCallsLimit: 10000,
    },
  };

  const displayBilling = billing || mockBilling;

  const getProgressPercentage = (used, limit) => {
    return (used / limit) * 100;
  };

  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
          <p className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
            Manage your subscription and payment information
          </p>
        </div>

        {loading && <LoadingSpinner size="lg" message="Loading billing info..." />}

        {error && (
          <div className={`p-4 rounded-lg mb-6 ${
            theme === 'dark'
              ? 'bg-red-900/20 text-red-400'
              : 'bg-red-50 text-red-600'
          }`}>
            Error: {error}
          </div>
        )}

        {/* Current Plan Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardStatsCard
            icon={FiCreditCard}
            label="Current Plan"
            value={displayBilling.currentPlan}
            color="indigo"
          />
          <DashboardStatsCard
            icon={FiTrendingUp}
            label="Monthly Cost"
            value={`$${displayBilling.monthlyCost}`}
            color="green"
          />
          <DashboardStatsCard
            icon={FiCreditCard}
            label="Total Spent"
            value={`$${displayBilling.totalSpent}`}
            color="blue"
          />
        </div>

        {/* Current Plan & Upgrade */}
        <div
          className={`rounded-lg transition-colors mb-8 p-8 ${
            theme === 'dark'
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold">{displayBilling.currentPlan} Plan</h2>
              <p className={`mt-1 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                Billed {displayBilling.billingCycle.toLowerCase()} • Next billing on{' '}
                {displayBilling.nextBillingDate.toLocaleDateString()}
              </p>
            </div>
            <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              Upgrade Plan
            </button>
          </div>

          {/* Usage Metrics */}
          <div className="space-y-6">
            {/* Estimates */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Estimates Created</span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {displayBilling.usage.estimatesCreated} / {displayBilling.usage.estimatesLimit}
                </span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${
                theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'
              }`}>
                <div
                  className="h-full bg-indigo-600"
                  style={{
                    width: `${getProgressPercentage(
                      displayBilling.usage.estimatesCreated,
                      displayBilling.usage.estimatesLimit
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Storage */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">Storage Used</span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {displayBilling.usage.storageUsed} GB / {displayBilling.usage.storageLimit} GB
                </span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${
                theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'
              }`}>
                <div
                  className="h-full bg-green-600"
                  style={{
                    width: `${getProgressPercentage(
                      displayBilling.usage.storageUsed,
                      displayBilling.usage.storageLimit
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* API Calls */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="font-medium">API Calls</span>
                <span className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                  {displayBilling.usage.apiCalls.toLocaleString()} /{' '}
                  {displayBilling.usage.apiCallsLimit.toLocaleString()}
                </span>
              </div>
              <div className={`h-2 rounded-full overflow-hidden ${
                theme === 'dark' ? 'bg-slate-700' : 'bg-gray-200'
              }`}>
                <div
                  className="h-full bg-blue-600"
                  style={{
                    width: `${getProgressPercentage(
                      displayBilling.usage.apiCalls,
                      displayBilling.usage.apiCallsLimit
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div
          className={`rounded-lg transition-colors mb-8 p-8 ${
            theme === 'dark'
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">Payment Method</h2>
            <button className="px-4 py-2 text-indigo-600 hover:bg-indigo-50 hover:bg-indigo-900/20 rounded-lg transition-colors font-medium">
              Edit
            </button>
          </div>

          <div
            className={`p-4 rounded-lg border-2 border-indigo-600 ${
              theme === 'dark' ? 'bg-slate-700' : 'bg-indigo-50'
            }`}
          >
            <p className="flex items-center gap-2">
              <FiCreditCard size={20} />
              <span className="font-medium">Visa {displayBilling.paymentMethod}</span>
            </p>
          </div>
        </div>

        {/* Invoice History */}
        <div
          className={`rounded-lg transition-colors p-8 ${
            theme === 'dark'
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <h2 className="text-xl font-semibold mb-6">Invoice History</h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className={`border-b ${
                  theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
                }`}>
                  <th className="text-left py-3 px-4 font-semibold">Date</th>
                  <th className="text-left py-3 px-4 font-semibold">Amount</th>
                  <th className="text-left py-3 px-4 font-semibold">Status</th>
                  <th className="text-left py-3 px-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {displayBilling.invoices.map((invoice) => (
                  <tr
                    key={invoice.id}
                    className={`border-b ${
                      theme === 'dark' ? 'border-slate-700' : 'border-gray-200'
                    }`}
                  >
                    <td className="py-3 px-4">{invoice.date.toLocaleDateString()}</td>
                    <td className="py-3 px-4 font-semibold">${invoice.amount}</td>
                    <td className="py-3 px-4">
                      <span className="text-sm font-medium text-green-600 bg-green-100 bg-green-900/30 px-3 py-1 rounded-full">
                        {invoice.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <button className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-medium">
                        <FiDownload size={16} />
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
