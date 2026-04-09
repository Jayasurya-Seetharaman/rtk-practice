import { useNavigate } from "react-router-dom";
import { useAuthVM } from "../../../features/auth/viewmodels/useAuthVM";
import { useOktaActions } from "../../../features/auth/viewmodels/useOktaActions";

export function Header() {
  const { user } = useAuthVM();
  const { logout } = useOktaActions();
  const navigate = useNavigate();

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-6">
      <button
        onClick={() => navigate("/")}
        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
      >
        Home
      </button>
      <div className="flex items-center gap-4">
        {user && (
          <span className="text-sm text-gray-600">{user.name}</span>
        )}
        <button
          onClick={logout}
          className="text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
        >
          Logout
        </button>
      </div>
    </header>
  );
}