export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full mx-auto mb-4 animate-spin" />
        <h2 className="text-2xl font-bold text-white mb-2 animate-pulse">
          Loading Ali Shop
        </h2>
        <p className="text-white/60 animate-pulse">
          Please wait while we prepare your experience...
        </p>
      </div>
    </div>
  )
}
