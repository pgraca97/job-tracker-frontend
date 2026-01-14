import { Link } from "react-router"

export function ExamplePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-gray-900">Example Page</h1>
      <Link to="/" className="mt-4 inline-block text-blue-600 hover:underline">
        ← Back to Home
      </Link>
    </div>
  )
}
