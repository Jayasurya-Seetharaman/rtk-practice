import { useNavigate } from "react-router-dom";

export function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <h1 className="text-6xl font-bold text-gray-300">404</h1>
      <p className="text-lg text-gray-600">Page not found</p>
      <p className="text-sm text-gray-400">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <button
        onClick={() => navigate("/")}
        className="mt-4 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
      >
        Go to Home
      </button>
    </div>
  );
}