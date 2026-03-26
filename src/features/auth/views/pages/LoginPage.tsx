import { Navigate } from "react-router-dom";
import { useAuthVM } from "../../viewmodels/useAuthVM";

export const LoginPage = () => {
  const { isAuthenticated, isLoading, login } = useAuthVM();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin h-8 w-8 border-4 border-blue-600 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (isAuthenticated) return <Navigate to="/" replace />;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-sm bg-white rounded-xl shadow-lg p-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">RTK Practice</h1>
          <p className="text-sm text-gray-500 mt-2">
            Sign in to access your dashboard
          </p>
        </div>

        <button
          onClick={login}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          Log in with Okta
        </button>

        <p className="text-xs text-gray-400 text-center mt-6">
          Secured by Okta Identity Provider
        </p>
      </div>
    </div>
  );
};