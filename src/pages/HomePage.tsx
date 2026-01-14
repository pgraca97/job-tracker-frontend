import { Link } from "react-router"

export function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-gray-900">React Vite Starter</h1>
      <p className="mt-4 text-gray-600">
        Template with React Router, TanStack Query, Axios, Tailwind & Biome
      </p>
      <nav className="mt-6 space-x-4">
        <Link to="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <Link to="/example" className="text-blue-600 hover:underline">
          Example Page
        </Link>
      </nav>
    </div>
  )
}
