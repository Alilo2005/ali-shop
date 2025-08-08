import Link from 'next/link'
import Image from 'next/image'
import { 
  ArrowUpIcon, 
  ArrowDownIcon,
  EyeIcon,
  ShoppingCartIcon,
  UsersIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline'

// Mock data - in real app this would come from your database/API
const stats = [
  {
    name: 'Total Revenue',
    value: '$45,231.89',
    change: '+20.1%',
    changeType: 'positive' as const,
    icon: CurrencyDollarIcon,
  },
  {
    name: 'Orders',
    value: '2,345',
    change: '+15.3%',
    changeType: 'positive' as const,
    icon: ShoppingCartIcon,
  },
  {
    name: 'Customers',
    value: '1,234',
    change: '+5.2%',
    changeType: 'positive' as const,
    icon: UsersIcon,
  },
  {
    name: 'Page Views',
    value: '12,345',
    change: '-2.1%',
    changeType: 'negative' as const,
    icon: EyeIcon,
  },
]

const recentOrders = [
  {
    id: 'ORD-001',
    customer: 'John Doe',
    email: 'john@example.com',
    amount: '$299.99',
    status: 'Processing',
    date: '2024-01-15',
  },
  {
    id: 'ORD-002',
    customer: 'Jane Smith',
    email: 'jane@example.com',
    amount: '$149.99',
    status: 'Shipped',
    date: '2024-01-14',
  },
  {
    id: 'ORD-003',
    customer: 'Bob Johnson',
    email: 'bob@example.com',
    amount: '$89.99',
    status: 'Delivered',
    date: '2024-01-13',
  },
]

const topProducts = [
  {
    name: 'Premium Wireless Headphones',
    sales: 145,
    revenue: '$43,455',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=64&h=64&fit=crop',
  },
  {
    name: 'Smart Fitness Watch',
    sales: 89,
    revenue: '$22,251',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=64&h=64&fit=crop',
  },
  {
    name: 'Organic Cotton T-Shirt',
    sales: 203,
    revenue: '$6,090',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=64&h=64&fit=crop',
  },
]

function StatCard({ stat }: { stat: typeof stats[0] }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <stat.icon className="h-8 w-8 text-gray-600" />
        </div>
        <div className="ml-4 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">
              {stat.name}
            </dt>
            <dd className="flex items-baseline">
              <div className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </div>
              <div className={`ml-2 flex items-baseline text-sm font-semibold ${
                stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.changeType === 'positive' ? (
                  <ArrowUpIcon className="self-center flex-shrink-0 h-4 w-4" />
                ) : (
                  <ArrowDownIcon className="self-center flex-shrink-0 h-4 w-4" />
                )}
                <span className="sr-only">
                  {stat.changeType === 'positive' ? 'Increased' : 'Decreased'} by
                </span>
                {stat.change}
              </div>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  )
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome back! Here&apos;s what&apos;s happening with your store today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.name} stat={stat} />
        ))}
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Recent Orders
              </h3>
              <Link
                href="/dashboard/orders"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200">
              {recentOrders.map((order) => (
                <li key={order.id} className="px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {order.customer}
                        </p>
                        <div className="ml-2 flex-shrink-0">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'Shipped' ? 'bg-blue-100 text-blue-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-500">{order.email}</p>
                      <div className="mt-1 flex items-center justify-between">
                        <p className="text-sm text-gray-500">
                          {order.id} • {order.date}
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                          {order.amount}
                        </p>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Top Products
              </h3>
              <Link
                href="/dashboard/products"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View all
              </Link>
            </div>
          </div>
          <div className="flow-root">
            <ul className="divide-y divide-gray-200">
              {topProducts.map((product) => (
                <li key={product.name} className="px-6 py-4">
                  <div className="flex items-center">
                    <Image
                      className="h-10 w-10 rounded-lg object-cover"
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                    />
                    <div className="ml-4 flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500">
                        {product.sales} sales
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">
                        {product.revenue}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Quick Actions
          </h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/dashboard/products/new"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-lg bg-indigo-500 flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Add Product</p>
                <p className="text-sm text-gray-500">Create a new product</p>
              </div>
            </Link>

            <Link
              href="/dashboard/orders"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-lg bg-green-500 flex items-center justify-center">
                  <ShoppingCartIcon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">View Orders</p>
                <p className="text-sm text-gray-500">Manage your orders</p>
              </div>
            </Link>

            <Link
              href="/dashboard/customers"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-lg bg-purple-500 flex items-center justify-center">
                  <UsersIcon className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Customers</p>
                <p className="text-sm text-gray-500">View customer data</p>
              </div>
            </Link>

            <Link
              href="/dashboard/analytics"
              className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <div className="flex-shrink-0">
                <div className="h-10 w-10 rounded-lg bg-orange-500 flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <span className="absolute inset-0" aria-hidden="true" />
                <p className="text-sm font-medium text-gray-900">Analytics</p>
                <p className="text-sm text-gray-500">View performance</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
