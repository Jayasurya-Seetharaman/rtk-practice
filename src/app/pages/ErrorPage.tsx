import { useNavigate } from "react-router-dom";

type ErrorPageProps = {
  error?: string;
  onRetry?: () => void;
};

export function ErrorPage({ error, onRetry }: ErrorPageProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      <div className="text-5xl">⚠️</div>
      <h1 className="text-2xl font-bold text-gray-800">Something went wrong</h1>
      {error && (
        <p className="text-sm text-red-500 bg-red-50 px-4 py-2 rounded-md max-w-md text-center">
          {error}
        </p>
      )}
      <div className="flex gap-3 mt-4">
        {onRetry && (
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        )}
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-200 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-300 transition-colors"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}