import { NavLink as RouterNavLink } from "react-router-dom";

type NavLinkProps = {
  to: string;
  label: string;
  matchPaths?: string[];
};

export function NavLink({ to, label, matchPaths = [] }: NavLinkProps) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) => {
        const isMatchedPath = matchPaths.some((path) =>
          window.location.pathname.startsWith(path)
        );
        const active = isActive || isMatchedPath;
        return `block px-4 py-2 rounded-md text-sm font-medium transition-colors ${
          active
            ? "bg-blue-600 text-white"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`;
      }}
    >
      {label}
    </RouterNavLink>
  );
}