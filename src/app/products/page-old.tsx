import { Suspense } from 'react'
import { ProductGrid } from '@/components/products/product-grid'
import { ProductFilters } from '@/components/products/product-filters'
import { ProductSearch } from '@/components/products/product-search'

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string; sort?: string }>
}) {
  const params = await searchParams
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Our Products</h1>
          <p className="mt-2 text-gray-600">
            Discover amazing products with AI-powered recommendations
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <ProductSearch />
        </div>

        <div className="lg:grid lg:grid-cols-4 lg:gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <ProductFilters />
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <Suspense fallback={<ProductGridSkeleton />}>
              <ProductGrid 
                category={params.category}
                search={params.search}
                sort={params.sort}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  )
}

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="animate-pulse">
          <div className="h-64 bg-gray-200 rounded-lg"></div>
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        </div>
      ))}
    </div>
  )
}
